/**
 * Persistencia del access token.
 *
 * Se guarda en `localStorage` porque la API autentica con `Authorization:
 * Bearer` y no con cookies de sesión: no hay alternativa sin tocar el backend.
 * Implica que cualquier script inyectado en la página podría leerlo; la
 * defensa sería una cookie `httpOnly`, que exigiría un cambio de backend.
 *
 * Todos los accesos van envueltos: `localStorage` lanza si el navegador tiene
 * el almacenamiento bloqueado, y perder el token no debe tumbar la aplicación.
 */

const TOKEN_KEY = 'flowsync.token'

export function readToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function writeToken(token: string): void {
  try {
    window.localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // Sin persistencia la sesión no sobrevive a una recarga, pero la
    // navegación actual sigue funcionando con el token en memoria.
  }
}

export function clearToken(): void {
  try {
    window.localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Nada que hacer.
  }
}
