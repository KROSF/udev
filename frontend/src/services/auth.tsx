import React, { useReducer, useEffect, useContext } from 'react'

export interface AuthState {
  user?: object
  accessToken?: string | null
}

enum AuthActionsType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REFRESH = 'REFRESH',
}

export interface ActionsPayload {
  [AuthActionsType.LOGIN]: {
    accesToken?: string | null
  }
  [AuthActionsType.LOGOUT]: undefined
  [AuthActionsType.REFRESH]: {
    accesToken?: string | null
  }
}

export const AuthContext = React.createContext<AuthState>({})

type ActionMap<M extends Record<string, any>> = {
  [K in keyof M]: M[K] extends undefined
    ? { type: K }
    : { type: K; payload: M[K] }
}

export type AuthActions = ActionMap<ActionsPayload>[keyof ActionMap<
  ActionsPayload
>]

const reducer: React.Reducer<AuthState, AuthActions> = (state, action) => {
  switch (action.type) {
    case AuthActionsType.LOGIN:
      return { ...state, accessToken: action.payload.accesToken }
    case AuthActionsType.LOGOUT:
      return { ...state, accessToken: undefined }
    case AuthActionsType.REFRESH:
      return { ...state, accessToken: action.payload.accesToken }
    default:
      return state
  }
}

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useReducer(reducer, {})
  useEffect(() => {
    setState({
      type: AuthActionsType.LOGIN,
      payload: { accesToken: localStorage.getItem('auth') },
    })
  }, [])
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const { user, accessToken } = useContext(AuthContext)

  return {
    isLoggedIn: Boolean(user) && Boolean(accessToken),
    accessToken,
    user,
  }
}
