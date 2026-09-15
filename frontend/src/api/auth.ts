import { apiFetch } from './client'

export type ApiUser = {
  id: number
  fullName: string | null
  email: string
  createdAt: string
  updatedAt: string
  initials: string
}

type AuthPayload = {
  token: string
  user: ApiUser
}

export type SignupInput = {
  fullName: string
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginInput = {
  email: string
  password: string
}

export function signup(input: SignupInput) {
  return apiFetch<{ data: AuthPayload }>('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  }).then((res) => res.data)
}

export function login(input: LoginInput) {
  return apiFetch<{ data: AuthPayload }>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  }).then((res) => res.data)
}

export function fetchProfile(token: string) {
  return apiFetch<{ data: ApiUser }>('/api/v1/account/profile', {}, token).then((res) => res.data)
}

export function logout(token: string) {
  return apiFetch<{ message: string }>(
    '/api/v1/account/logout',
    { method: 'POST' },
    token,
  )
}
