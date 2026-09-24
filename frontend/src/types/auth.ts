export interface User {
  id: number
  fullName: string | null
  email: string
  initials: string
  createdAt: string
  updatedAt: string | null
}

export interface AuthResult {
  user: User
  token: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface SignupInput {
  fullName: string | null
  email: string
  password: string
  passwordConfirmation: string
}
