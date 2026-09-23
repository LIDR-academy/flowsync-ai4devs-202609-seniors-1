/**
 * Endpoints de autenticación, tipados uno a uno.
 *
 * Las reglas de validación viven exclusivamente en el backend
 * (`backend/app/validators/user.ts`): aquí no se comprueba nada antes de
 * enviar, para que no exista la posibilidad de divergir de ellas.
 */

import { request } from './client'
import type { ApiResult, AuthPayload, User } from './types'

export type SignupInput = {
  /**
   * El backend declara `fullName` como `nullable()`, no como `optional()`:
   * la clave tiene que viajar siempre en el cuerpo. Si se omite, la petición
   * falla con una regla `required`.
   */
  fullName: string | null
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginInput = {
  email: string
  password: string
}

export function signupRequest(input: SignupInput): Promise<ApiResult<AuthPayload>> {
  return request<AuthPayload>('/api/v1/auth/signup', { method: 'POST', body: input })
}

export function loginRequest(input: LoginInput): Promise<ApiResult<AuthPayload>> {
  return request<AuthPayload>('/api/v1/auth/login', { method: 'POST', body: input })
}

export function profileRequest(token: string): Promise<ApiResult<User>> {
  return request<User>('/api/v1/account/profile', { token })
}

/** Revoca el token en el servidor. Es la única respuesta que no va envuelta en `data`. */
export function logoutRequest(token: string): Promise<ApiResult<{ message: string }>> {
  return request<{ message: string }>('/api/v1/account/logout', {
    method: 'POST',
    token,
    unwrap: false,
  })
}
