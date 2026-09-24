import { useCallback, useEffect, useState, type ReactNode } from 'react'
import {
  type ApiUser,
  fetchProfile,
  login as apiLogin,
  logout as apiLogout,
  signup as apiSignup,
} from '../api/auth'
import { AuthContext, type AuthStatus } from './auth-context'

const TOKEN_STORAGE_KEY = 'flowsync.token'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [user, setUser] = useState<ApiUser | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY))

  // Solo valida la sesión persistida al montar: login/signup ya traen el user
  // en su respuesta, así que no deben disparar esta re-validación de nuevo.
  useEffect(() => {
    if (!token) {
      setStatus('guest')
      return
    }

    fetchProfile(token)
      .then((profile) => {
        setUser(profile)
        setStatus('authenticated')
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        setToken(null)
        setUser(null)
        setStatus('guest')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo debe correr al montar, ver comentario arriba
  }, [])

  const login = useCallback(async (input: Parameters<typeof apiLogin>[0]) => {
    const { token: newToken, user: newUser } = await apiLogin(input)
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken)
    setToken(newToken)
    setUser(newUser)
    setStatus('authenticated')
  }, [])

  const signup = useCallback(async (input: Parameters<typeof apiSignup>[0]) => {
    const { token: newToken, user: newUser } = await apiSignup(input)
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken)
    setToken(newToken)
    setUser(newUser)
    setStatus('authenticated')
  }, [])

  const logout = useCallback(async () => {
    if (token) {
      await apiLogout(token).catch(() => {
        // Si el token ya no es válido en el servidor, igual limpiamos la sesión local.
      })
    }
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken(null)
    setUser(null)
    setStatus('guest')
  }, [token])

  return <AuthContext value={{ status, user, login, signup, logout }}>{children}</AuthContext>
}
