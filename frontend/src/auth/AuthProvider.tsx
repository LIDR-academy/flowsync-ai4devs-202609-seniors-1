import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { loginRequest, logoutRequest, profileRequest, signupRequest } from '../api/auth'
import type { LoginInput, SignupInput } from '../api/auth'
import type { ApiResult, AuthPayload, User } from '../api/types'
import { AuthContext } from './auth-context'
import type { AuthStatus } from './auth-context'
import { clearToken, readToken, writeToken } from './storage'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Inicializador perezoso: si no hay token guardado no hay nada que
  // comprobar, así que arrancamos ya en `anonymous` y el guard puede redirigir
  // en el primer render sin mostrar ninguna pantalla intermedia.
  const [status, setStatus] = useState<AuthStatus>(() =>
    readToken() ? 'loading' : 'anonymous',
  )

  // Al arrancar con un token guardado, lo validamos contra el servidor antes
  // de dar la sesión por buena. Mientras tanto el estado es `loading` y el
  // guard espera, de modo que la URL nunca pasa por /login teniendo sesión.
  useEffect(() => {
    const token = readToken()
    if (!token) return

    let cancelled = false

    void (async () => {
      const result = await profileRequest(token)
      if (cancelled) return

      if (result.ok) {
        setUser(result.data)
        setStatus('authenticated')
        return
      }

      // Solo tiramos el token si el servidor dice que no vale. Un fallo de red
      // o un backend caído no deben cerrarle la sesión a nadie.
      if (result.error.kind === 'unauthorized') {
        clearToken()
      }
      setUser(null)
      setStatus('anonymous')
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const acceptSession = useCallback((payload: AuthPayload) => {
    writeToken(payload.token)
    setUser(payload.user)
    setStatus('authenticated')
  }, [])

  const signup = useCallback(
    async (input: SignupInput): Promise<ApiResult<AuthPayload>> => {
      const result = await signupRequest(input)
      if (result.ok) acceptSession(result.data)
      return result
    },
    [acceptSession],
  )

  const login = useCallback(
    async (input: LoginInput): Promise<ApiResult<AuthPayload>> => {
      const result = await loginRequest(input)
      if (result.ok) acceptSession(result.data)
      return result
    },
    [acceptSession],
  )

  const logout = useCallback(() => {
    const token = readToken()

    // El cierre local es inmediato y no depende del servidor: si la petición
    // falla (token ya caducado, backend caído) la sesión debe cerrarse igual.
    clearToken()
    setUser(null)
    setStatus('anonymous')

    if (token) void logoutRequest(token)
  }, [])

  const value = useMemo(
    () => ({ status, user, signup, login, logout }),
    [status, user, signup, login, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
