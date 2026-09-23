import { Link } from 'react-router-dom'
import { useAuth } from '../auth/auth-context'

export default function HomePage() {
  const { status, user } = useAuth()

  return (
    <main className="page page-home">
      <h1>FlowSync</h1>
      {/* Mientras se comprueba un token guardado no afirmamos nada: decir
          "no has iniciado sesión" y corregirlo un instante después se ve como
          un parpadeo de información equivocada. */}
      <p className="lead">
        {status === 'loading'
          ? ' '
          : status === 'authenticated'
            ? `Has iniciado sesión como ${user?.fullName ?? user?.email}.`
            : 'Crea una cuenta o inicia sesión para acceder a tu zona privada.'}
      </p>

      <nav className="home-links" aria-label="Accesos principales">
        <Link className="button button-primary" to="/signup">
          Crear cuenta
        </Link>
        <Link className="button" to="/login">
          Iniciar sesión
        </Link>
        <Link className="button" to="/profile">
          Mi perfil (zona privada)
        </Link>
      </nav>
    </main>
  )
}
