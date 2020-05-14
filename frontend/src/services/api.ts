import axios, { AxiosError } from 'axios'
import Router from 'next/router'
import { LocalStorageService, Tokens } from './LocalStorageService'

const api = axios.create({ baseURL: 'http://localhost:3000/api/' })

api.interceptors.request.use(
  (config) => {
    const { accessToken } = LocalStorageService
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error as AxiosError

    if (response!.status === 401 && config.url === 'api/auth/refresh-token') {
      Router.push('/login')
      return Promise.reject(error)
    }

    if (response!.status === 401 && !(config as any)._retry) {
      ;(config as any)._retry = true
      const res = await api.post('api/auth/refresh-token', {
        refreshToken: LocalStorageService.refreshToken,
      })
      if (res.status === 201) {
        LocalStorageService.setTokens(res.data as Tokens)
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${LocalStorageService.accessToken}`
        return api(config)
      }
    }
    return Promise.reject(error)
  },
)

export const login = async (data: Record<'email' | 'password', string>) => {
  const res = await api.post('auth/login', data)
  return res.data as Tokens
}
