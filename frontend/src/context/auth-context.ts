import { createContext } from 'react'
import type { ApiUser, LoginInput, SignupInput } from '../api/auth'

export type AuthStatus = 'loading' | 'authenticated' | 'guest'

export type AuthContextValue = {
  status: AuthStatus
  user: ApiUser | null
  login: (input: LoginInput) => Promise<void>
  signup: (input: SignupInput) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
