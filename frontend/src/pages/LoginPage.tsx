import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isRecord } from '../api/errors'
import type { ApiError } from '../api/types'
import { useAuth } from '../auth/auth-context'
import { Alert } from '../components/Alert'
import { ErrorSummary } from '../components/ErrorSummary'
import { FormField } from '../components/FormField'

/**
 * El validador de login del backend también comprueba el formato y la
 * longitud del email, así que esta pantalla puede recibir errores por campo
 * (422), no solo el fallo genérico de credenciales (400).
 */
const OWN_FIELDS = ['email', 'password']

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const alertRef = useRef<HTMLDivElement>(null)

  // El aviso llega desde el guard en el estado de navegación. Se copia a
  // estado de React en el primer render, antes de que el efecto de abajo
  // borre la fuente.
  const [notice] = useState<string | null>(() => {
    const state: unknown = location.state
    return isRecord(state) && typeof state.notice === 'string' ? state.notice : null
  })

  // React Router guarda ese estado en la entrada del historial, y el navegador
  // lo restaura al recargar: sin limpiarlo, el aviso reaparecería en cada F5.
  const cleared = useRef(false)
  useEffect(() => {
    if (cleared.current) return
    cleared.current = true
    if (location.state) {
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.pathname, location.state, navigate])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    setSubmitting(true)
    setError(null)

    const result = await login({ email, password })

    if (result.ok) {
      navigate('/profile', { replace: true })
      return
    }

    setError(result.error)
    setSubmitting(false)
    alertRef.current?.focus()
  }

  return (
    <main className="page">
      <h1>Iniciar sesión</h1>

      <form noValidate onSubmit={handleSubmit} aria-busy={submitting}>
        {/* El aviso del guard se oculta en cuanto hay un error del formulario,
            para no apilar dos mensajes que compiten por la atención. */}
        {notice && !error && <Alert tone="info">{notice}</Alert>}
        {error && <ErrorSummary ref={alertRef} error={error} ownFields={OWN_FIELDS} />}

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
          autoComplete="current-password"
        />

        <button type="submit" className="button-primary" disabled={submitting}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </button>

        <p className="form-footer">
          ¿No tienes cuenta? <Link to="/signup">Crea una</Link>
        </p>
      </form>
    </main>
  )
}
