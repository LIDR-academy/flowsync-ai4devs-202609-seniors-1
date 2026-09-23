/**
 * Contexto de sesión.
 *
 * Este módulo no contiene JSX a propósito: el provider vive en
 * `AuthProvider.tsx`. Exportar un hook y un componente desde el mismo fichero
 * rompe el refresco en caliente de Vite y dispara la regla
 * `react/only-export-components` de oxlint.
 */

import { createContext, useContext } from 'react'
import type { LoginInput, SignupInput } from '../api/auth'
import type { ApiResult, AuthPayload, User } from '../api/types'

/**
 * `loading` solo ocurre mientras se comprueba contra el servidor un token
 * que ya estaba guardado. Sin token se arranca directamente en `anonymous`.
 */
export type AuthStatus = 'loading' | 'authenticated' | 'anonymous'

export type AuthContextValue = {
  status: AuthStatus
  user: User | null
  /** Devuelve el resultado completo para que el formulario pinte los errores por campo. */
  signup: (input: SignupInput) => Promise<ApiResult<AuthPayload>>
  login: (input: LoginInput) => Promise<ApiResult<AuthPayload>>
  logout: () => void
}

/**
 * Sin valor por defecto: así olvidarse del provider falla de inmediato y con
 * un mensaje claro, en vez de producir un comportamiento extraño.
 */
export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}
