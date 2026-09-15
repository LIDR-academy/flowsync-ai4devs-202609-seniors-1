import { useState } from 'react'
import { useAuth } from '../context/useAuth'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)

  if (!user) return null

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await logout()
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card profile-card">
        <div className="avatar" aria-hidden="true">
          {user.initials}
        </div>
        <h1>{user.fullName || user.email}</h1>
        <p className="profile-email">{user.email}</p>
        <button type="button" onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}
        </button>
      </div>
    </div>
  )
}
