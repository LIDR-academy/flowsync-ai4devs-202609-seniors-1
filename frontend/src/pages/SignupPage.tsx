import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ApiError } from '../api/types'
import { useAuth } from '../auth/auth-context'
import { ErrorSummary } from '../components/ErrorSummary'
import { FormField } from '../components/FormField'

/** Campos con input propio en esta pantalla. Ver `ErrorSummary`. */
const OWN_FIELDS = ['fullName', 'email', 'password', 'passwordConfirmation']

export default function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const alertRef = useRef<HTMLDivElement>(null)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    setSubmitting(true)
    setError(null)

    const result = await signup({
      // Vacío se envía como null, que es como el backend representa "sin
      // nombre". Mandar "" crearía una cuenta con nombre en blanco. La clave
      // viaja siempre: el campo es nullable, no opcional.
      fullName: fullName.trim() === '' ? null : fullName,
      email,
      password,
      passwordConfirmation,
    })

    if (result.ok) {
      // Sin restaurar `submitting`: el componente se desmonta al navegar.
      navigate('/profile', { replace: true })
      return
    }

    setError(result.error)
    setSubmitting(false)
    alertRef.current?.focus()
  }

  return (
    <main className="page">
      <h1>Crear cuenta</h1>

      {/* noValidate desactiva la validación del navegador: las reglas las pone
          el backend y solo el backend, para que no puedan divergir. */}
      <form noValidate onSubmit={handleSubmit} aria-busy={submitting}>
        {error && <ErrorSummary ref={alertRef} error={error} ownFields={OWN_FIELDS} />}

        <FormField
          id="fullName"
          label="Nombre completo"
          hint="Opcional"
          value={fullName}
          onChange={setFullName}
          error={error?.fields.fullName}
          disabled={submitting}
          autoComplete="name"
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={error?.fields.email}
          disabled={submitting}
          autoComplete="email"
        />
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={setPassword}
          error={error?.fields.password}
          disabled={submitting}
          autoComplete="new-password"
        />
        <FormField
          id="passwordConfirmation"
          label="Repite la contraseña"
          type="password"
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
          error={error?.fields.passwordConfirmation}
          disabled={submitting}
          autoComplete="new-password"
        />

        <button type="submit" className="button-primary" disabled={submitting}>
          {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>

        <p className="form-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </main>
  )
}
