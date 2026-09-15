/**
 * Contrato con la API de FlowSync.
 *
 * La forma de `User` es la que expone `UserTransformer` en el backend
 * (`backend/app/transformers/user_transformer.ts`).
 */

export type User = {
  id: number
  fullName: string | null
  email: string
  /** ISO 8601 con offset, p.ej. "2026-09-15T12:34:56.789+02:00". */
  createdAt: string
  updatedAt: string | null
  /** Iniciales calculadas por el backend, siempre en mayúsculas. */
  initials: string
}

/** Cuerpo de las respuestas de `auth/signup` y `auth/login`. */
export type AuthPayload = {
  user: User
  token: string
}

/**
 * Clasificación interna del error. Sirve para decidir lógica
 * (¿borro el token?, ¿pinto errores de campo?), nunca para mostrarse.
 */
export type ApiErrorKind =
  | 'validation' // 422: el backend rechazó campos concretos
  | 'credentials' // 400: email o contraseña incorrectos en login
  | 'unauthorized' // 401: sin token, token inválido o caducado
  | 'network' // fetch falló: backend caído, sin conexión, CORS bloqueado
  | 'server' // 5xx, o una respuesta correcta con forma inesperada
  | 'unknown'

/**
 * Error ya traducido y saneado, listo para la interfaz.
 *
 * `message` y los valores de `fields` son SIEMPRE textos nuestros: nunca
 * contienen nada devuelto por el backend. Ver `api/errors.ts`.
 */
export type ApiError = {
  /** Mensaje general. Seguro de pintar. */
  message: string
  /** Mensaje por campo del formulario. Vacío si el error no es de validación. */
  fields: Record<string, string>
  kind: ApiErrorKind
  /** Código HTTP, o 0 si no llegó a haber respuesta. Solo para depurar. */
  status: number
}

/**
 * Resultado de una llamada a la API.
 *
 * Es una unión discriminada en lugar de excepciones a propósito: obliga a
 * quien llama a mirar `ok` antes de usar los datos, y garantiza que el único
 * texto que puede acabar en pantalla venga de `ApiError`.
 */
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError }
