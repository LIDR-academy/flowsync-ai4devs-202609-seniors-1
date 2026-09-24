import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/useAuth'
import { ApiError } from '../api/client'

function describeLoginError(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 400) {
      return 'El email o la contraseña no son correctos.'
    }
    return error.generalMessage() ?? error.message
  }
  return 'No se pudo conectar con el servidor. Inténtalo de nuevo.'
}

export function LoginForm({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login({ email, password })
    } catch (err) {
      setError(describeLoginError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h1>Inicia sesión</h1>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label className="field">
        <span>Contraseña</span>
        <input
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Entrando…' : 'Entrar'}
      </button>

      <p className="switch-mode">
        ¿No tienes cuenta?{' '}
        <button type="button" className="link-button" onClick={onSwitchToSignup}>
          Regístrate
        </button>
      </p>
    </form>
  )
}
