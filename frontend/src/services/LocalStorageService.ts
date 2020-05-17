import jwtDecode from 'jwt-decode'

export type Tokens = {
  accessToken: string
  refreshToken: string
}

export class LocalStorageService {
  public static setTokens({ accessToken, refreshToken }: Tokens): void {
    accessToken && localStorage.setItem('accessToken', accessToken)
    refreshToken && localStorage.setItem('refreshToken', refreshToken)
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
  }

  public static get isUserLoggedIn() {
    if (!!this.accessToken && !!this.refreshToken) {
      const { exp } = jwtDecode<{ exp: number }>(this.accessToken)
      return Date.now() <= exp * 1000
    }
    return false
  }
}
