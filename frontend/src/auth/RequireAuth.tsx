import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth-context'

/** Aviso que ve quien intenta entrar en una página protegida sin sesión. */
export const UNAUTHORIZED_NOTICE = 'No estás autorizado. Debes iniciar sesión.'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth()

  // Mientras se comprueba un token guardado no redirigimos: si lo hiciéramos,
  // recargar una página protegida con sesión válida pasaría un instante por
  // /login antes de volver.
  if (status === 'loading') {
    return (
      <main className="page">
        <p role="status">Comprobando tu sesión…</p>
      </main>
    )
  }

  if (status === 'anonymous') {
    // `replace` evita que el intento fallido quede en el historial, para que
    // "Atrás" desde /login no rebote otra vez contra la página protegida.
    return <Navigate to="/login" replace state={{ notice: UNAUTHORIZED_NOTICE }} />
  }

  return <>{children}</>
}
