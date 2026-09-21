import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <p className="p-8 text-center text-muted-foreground">Cargando…</p>
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}

export function PublicOnlyRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="p-8 text-center text-muted-foreground">Cargando…</p>
  }
  if (user) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
