import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import {
  Home,
  ForgotPassword,
  Validate,
  Post,
  Tag,
  User,
  New,
  Login,
  Register,
  ResetPassword,
  ResetPasswordWithCode,
  Settings,
  Search,
} from '../pages'
import { RouteProps } from 'react-router'
import { useAuth } from '../services/auth'

export const routes = {
  home: '/',
  new: '/new',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  register: '/register',
  login: '/login',
  validate: (query?: { email: string }) =>
    query
      ? (`/validate?email=${query.email}` as '/validate?email={email}')
      : '/validate',
  validateWithCode: '/validate/:code',
  resetPasswordWithCode: '/reset-password/:code',
  post: '/:post',
  tag: (name?: string) => (name ? (`/t/${name}` as '/t/{name}') : '/t/:tag'),
  user: (username?: string | number | null) =>
    username ? (`/u/${username}` as '/u/{username}') : '/u/:username',
  settings: '/settings',
  search: (q?: string) =>
    q ? (`/search?q=${q}` as '/search?q={q}') : '/search',
} as const

const PrivateRoute = (props: RouteProps) => {
  const { isUserLoggedIn } = useAuth()
  return isUserLoggedIn ? <Route {...props} /> : <Navigate to={routes.home} />
}

const RedirectOnLogged = (props: RouteProps) => {
  const { isUserLoggedIn } = useAuth()
  return isUserLoggedIn ? <Navigate to={routes.home} /> : <Route {...props} />
}

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.search()} element={<Search />} />
      <PrivateRoute path={routes.new} element={<New />} />
      <PrivateRoute path={routes.settings} element={<Settings />} />
      <RedirectOnLogged path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path={routes.resetPassword} element={<ResetPassword />} />
      <Route
        path={routes.resetPasswordWithCode}
        element={<ResetPasswordWithCode />}
      />
      <Route path={routes.post} element={<Post />} />
      <Route path={routes.forgotPassword} element={<ForgotPassword />} />
      <Route path={routes.validate()} element={<Validate />} />
      <Route path={routes.validateWithCode} element={<Validate />} />
      <Route path={routes.tag()} element={<Tag />} />
      <Route path={routes.user()} element={<User />} />
    </Routes>
  )
}

export default RoutesComponent
