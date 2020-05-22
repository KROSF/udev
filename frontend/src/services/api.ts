import axios, { AxiosError } from 'axios'
import Router from 'next/router'
import { LocalStorageService, Tokens } from './LocalStorageService'

export const api = axios.create({ baseURL: 'http://localhost:3000/api/' })

api.interceptors.request.use(
  (config) => {
    const { accessToken } = LocalStorageService
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    if (!!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error as AxiosError

    if (response!.status === 401 && config.url === 'auth/refresh-token') {
      Router.push('/login')
      return Promise.reject(error)
    }

    if (response!.status === 401 && !(config as any)._retry) {
      ;(config as any)._retry = true
      const res = await api.post('auth/refresh-token', {
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

export const refreshToken = async () => {
  const { refreshToken, isUserLoggedIn } = LocalStorageService
  if (!!refreshToken && !isUserLoggedIn) {
    const res = await api.post('auth/refresh-token', { refreshToken })
    LocalStorageService.setTokens(res.data as Tokens)
  }
}

export const logOut = async () => {
  await api.get('auth/revoke-token')
  LocalStorageService.clearTokens()
}

export const signUp = async (
  data: Record<'name' | 'username' | 'email' | 'password', string>,
) => {
  await api.post('auth/register', data)
}

export const validateEmail = async ({ code }: Record<'code', string>) => {
  const res = await api.get<{ message: string }>(`auth/active/${code}`)
  return res.data
}

export const resendVerificationCode = async (data: Record<'email', string>) => {
  await api.put('auth/resend-active-account', data)
}

export const forgotPassword = async (data: Record<'email', string>) => {
  const res = await api.post('auth/forgot-password', data)
  return res.data
}

export const resetPassword = async ({
  code,
  password,
}: Record<'code' | 'password', string>) =>
  api.put(`auth/reset-password/${code}`, { password })

export type NewPostDTO = {
  title: string
  tags: string
  body: string
  publish: boolean
}

export const newPost = async (data: NewPostDTO) => {
  const res = await api.post('posts', data)
  return res.data
}

export interface RootImages {
  uploaded: string[]
}
export const sendFiles = async (files: File[]) => {
  const fd = new FormData()
  files.forEach((file) => {
    fd.append('files[]', file, file.name)
  })
  const res = await api.post<RootImages>('images', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data.uploaded
}

export interface RootPost {
  data: Post[]
}

export interface Post {
  body: string
  comments: string
  created_at: string
  id: string
  is_draft: boolean
  is_published: boolean
  likes: { user_id: string; post_id: string }[]
  published_at?: string
  tags: Tag[]
  title: string
  updated_at: string
  url: string
  cover_url?: string
  user: User
  user_id: string
}

export interface Tag {
  created_at: string
  id: string
  name: string
  updated_at: string
}

export interface User {
  avatar: any
  created_at: string
  email: string
  github_username: any
  id: number
  name: string
  stackoverflow_url: any
  status: boolean
  token_version: number
  twitter_username: any
  updated_at: string
  username: string
  verified: boolean
}

export const posts = async () => {
  const res = await api.get<RootPost>('posts')
  return res.data.data
}

export const post = async (id: string) => {
  const res = await api.get<Post>(`posts/${id}`)
  return res.data
}
