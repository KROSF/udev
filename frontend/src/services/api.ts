import { api } from './auth'
import { Tokens } from './TokenStore'

export const login = async (data: Record<'email' | 'password', string>) => {
  const res = await api.post<Tokens>('auth/login', data)
  return res.data
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
  cover_url?: string
  images?: string[]
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
  uri: Uri
  hasMore: boolean
  total: number
  perPage: number
  pageCount: number
  pageSelector: string
  currentPage: number
  next: any
  previous: any
  segment: number
  data: Post[]
}

export interface Uri {}

export interface Post {
  id: number
  title: string
  body: string
  user_id: string
  likes: Like[]
  url: string
  cover_url: string | null
  comments: number
  is_draft: boolean
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
  tags: Tag[]
  user: User
}

export interface Like {
  post_id: string
  user_id: string
}

export interface Tag {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface User {
  bio: string | null
  created_at: string
  email: string
  github_username: string | null
  id: number
  location: string | null
  name: string
  twitter_username: string | null
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

export const addDiscussion = async ({
  id,
  ...data
}: {
  id: string | number
  content: string
  discussion_id?: string | number | null
}) => {
  const res = await api.post(`posts/${id}/discussions`, data)
  return res.data
}

export interface RootDiscussions {
  data: Discussion[]
}

export interface Discussion {
  children: Discussion[]
  content: string
  created_at: string
  discussion_id: string | null
  id: string
  updated_at: string
  user: User
  user_id: string
}

export type UpdateUserPayoad = {
  name?: string
  username?: string
  location: string | null
  github_username: string | null
  twitter_username: string | null
  bio: string | null
}

export const updateUser = async (
  id: string | number,
  data: UpdateUserPayoad,
) => {
  const res = await api.put<User>(`users/${id}`, data)
  return res.data
}

export const deletePost = async (id: string | number) => {
  await api.delete(`posts/${id}`)
}

export const likePost = async (id: string | number) => {
  const res = await api.post(`posts/${id}/like`)
  return res.data
}
