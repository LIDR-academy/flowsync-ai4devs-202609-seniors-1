import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth-context'

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'long',
  timeStyle: 'short',
})

function formatDate(value: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : dateFormatter.format(date)
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // RequireAuth garantiza que hay sesión antes de montar esta página.
  if (!user) return null

  function handleLogout() {
    // Navegamos ANTES de cerrar la sesión. Si lo hiciéramos al revés, el
    // cambio a "anónimo" ocurriría con esta página aún montada y el guard
    // redirigiría a /login con el aviso de "no estás autorizado", después de
    // un cierre de sesión perfectamente deliberado.
    navigate('/', { replace: true })
    logout()
  }

  return (
    <main className="page">
      <h1>Mi perfil</h1>

      <div className="profile-header">
        <div className="avatar" aria-hidden="true">
          {user.initials}
        </div>
        <p className={user.fullName ? 'profile-name' : 'profile-name profile-name-empty'}>
          {user.fullName ?? 'Sin nombre'}
        </p>
      </div>

      <dl className="profile-data">
        <dt>Email</dt>
        <dd>{user.email}</dd>

        <dt>Iniciales</dt>
        <dd>{user.initials}</dd>

        <dt>Cuenta creada</dt>
        <dd>{formatDate(user.createdAt)}</dd>

        <dt>Última actualización</dt>
        <dd>{formatDate(user.updatedAt)}</dd>
      </dl>

      <div className="profile-actions">
        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
        <Link className="button" to="/">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
