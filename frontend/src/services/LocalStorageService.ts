import jwtDecode from 'jwt-decode'
import { User, api } from './api'

export type Tokens = {
  accessToken: string
  refreshToken: string
}

export class LocalStorageService {
  private static _user?: User
  public static setTokens({ accessToken, refreshToken }: Tokens): void {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    this.setUser()
  }

  public static get accessToken() {
    return localStorage.getItem('accessToken') || undefined
  }

  public static get refreshToken() {
    return localStorage.getItem('refreshToken') || undefined
  }

  public static clearTokens(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this._user = undefined
  }

  public static get isUserLoggedIn() {
    if (!!this.accessToken && !!this.refreshToken) {
      const { exp } = jwtDecode<{ exp: number }>(this.accessToken)
      return Date.now() <= exp * 1000
    }
    return false
  }

  public static get user() {
    if (!this._user) {
      this.setUser()
    }
    return this._user
  }

  private static setUser() {
    if (this.isUserLoggedIn && this.accessToken) {
      const { id } = jwtDecode<{ id: number }>(this.accessToken)
      api.get<User>(`users/${id}`).then((res) => {
        this._user = res.data
      })
    }
  }
}
