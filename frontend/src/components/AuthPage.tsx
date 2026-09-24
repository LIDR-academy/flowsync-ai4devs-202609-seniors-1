import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  return (
    <div className="auth-page">
      <div className="auth-card">
        {mode === 'login' ? (
          <LoginForm onSwitchToSignup={() => setMode('signup')} />
        ) : (
          <SignupForm onSwitchToLogin={() => setMode('login')} />
        )}
      </div>
    </div>
  )
}
