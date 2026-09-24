import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/useAuth'
import { AuthPage } from './components/AuthPage'
import { ProfilePage } from './components/ProfilePage'
import './App.css'

function AppContent() {
  const { status } = useAuth()

  if (status === 'loading') {
    return (
      <div className="auth-page">
        <p>Cargando…</p>
      </div>
    )
  }

  return status === 'authenticated' ? <ProfilePage /> : <AuthPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
