import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/useAuth'
import { ApiError } from '../api/client'

function fieldMessage(error: ApiError, field: string): string | undefined {
  const message = error.fieldMessage(field)
  if (!message) return undefined
  if (field === 'email' && error.items.some((item) => item.field === 'email' && item.rule === 'database.unique')) {
    return 'Ya existe una cuenta registrada con este email.'
  }
  return message
}

export function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const { signup } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFieldErrors({})
    setGeneralError(null)

    if (password !== passwordConfirmation) {
      setFieldErrors({ passwordConfirmation: 'Las contraseñas no coinciden.' })
      return
    }

    setSubmitting(true)
    try {
      await signup({ fullName, email, password, passwordConfirmation })
    } catch (err) {
      if (err instanceof ApiError) {
        const nextFieldErrors: Record<string, string> = {}
        for (const field of ['fullName', 'email', 'password', 'passwordConfirmation']) {
          const message = fieldMessage(err, field)
          if (message) nextFieldErrors[field] = message
        }
        setFieldErrors(nextFieldErrors)
        setGeneralError(err.generalMessage() ?? (Object.keys(nextFieldErrors).length === 0 ? err.message : null))
      } else {
        setGeneralError('No se pudo conectar con el servidor. Inténtalo de nuevo.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h1>Crea tu cuenta</h1>

      {generalError && (
        <p className="form-error" role="alert">
          {generalError}
        </p>
      )}

      <label className="field">
        <span>Nombre completo (opcional)</span>
        <input
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
        {fieldErrors.fullName && <span className="field-error">{fieldErrors.fullName}</span>}
      </label>

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
      </label>

      <label className="field">
        <span>Contraseña</span>
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={32}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
      </label>

      <label className="field">
        <span>Confirma tu contraseña</span>
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={32}
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />
        {fieldErrors.passwordConfirmation && (
          <span className="field-error">{fieldErrors.passwordConfirmation}</span>
        )}
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>

      <p className="switch-mode">
        ¿Ya tienes cuenta?{' '}
        <button type="button" className="link-button" onClick={onSwitchToLogin}>
          Inicia sesión
        </button>
      </p>
    </form>
  )
}
