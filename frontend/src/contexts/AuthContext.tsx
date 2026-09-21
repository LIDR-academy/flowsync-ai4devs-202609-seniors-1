import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { api } from '@/lib/api'
import { getToken, setToken } from '@/lib/token'
import { toFormError, type FormError } from '@/lib/apiErrors'
import type { LoginInput, SignupInput, User } from '@/types/auth'

interface AuthContextValue {
  user: User | null
  /** True while a stored token is being validated against GET /account/profile. */
  loading: boolean
  login: (input: LoginInput) => Promise<FormError | null>
  signup: (input: SignupInput) => Promise<FormError | null>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(() => getToken() !== null)

  useEffect(() => {
    if (!getToken()) return
    let cancelled = false
    api.account
      .profile({})
      .safe()
      .then(([result, err]) => {
        if (cancelled) return
        if (err) {
          // Drop the token only when the server rejected it, not on a network blip.
          if (err.kind === 'http' && err.status === 401) setToken(null)
        } else {
          setUser(result.data)
        }
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // The user shown in the protected view always comes from GET /account/profile.
  const startSession = useCallback(async (token: string): Promise<FormError | null> => {
    setToken(token)
    const [result, err] = await api.account.profile({}).safe()
    if (err) {
      setToken(null)
      return toFormError(err)
    }
    setUser(result.data)
    return null
  }, [])

  const login = useCallback(
    async (input: LoginInput) => {
      const [result, err] = await api.auth.login({ body: input }).safe()
      if (err) return toFormError(err)
      return startSession(result.data.token)
    },
    [startSession]
  )

  const signup = useCallback(
    async (input: SignupInput) => {
      const [result, err] = await api.auth.signup({ body: input }).safe()
      if (err) return toFormError(err)
      return startSession(result.data.token)
    },
    [startSession]
  )

  const logout = useCallback(async () => {
    await api.account.logout({}).safe()
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, signup, logout }),
    [user, loading, login, signup, logout]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
