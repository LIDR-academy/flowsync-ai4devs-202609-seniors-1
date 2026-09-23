/**
 * Traducción de los errores de la API a mensajes que puede ver un usuario.
 *
 * INVARIANTE DEL MÓDULO: de la respuesta del backend solo se leen `field`,
 * `rule` y `meta`. El `message` que envía el backend NUNCA se propaga.
 *
 * Es lo que garantiza que no se filtre detalle técnico: los mensajes del
 * backend vienen en inglés y con jerga de validación, y ante un error 500 en
 * desarrollo el cuerpo de la respuesta es un volcado de Youch con la traza de
 * pila completa. Como aquí solo se leen campos estructurales y todo el texto
 * visible son literales de este fichero, no hay ninguna vía por la que algo
 * así pueda llegar a la pantalla.
 */

import type { ApiError } from './types'

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/* -------------------------------------------------------------------------- */
/* Etiquetas de campo                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Etiqueta de cada campo con su género, para que los mensajes concuerden
 * ("el email es obligatorio" / "la contraseña es obligatoria").
 */
const FIELD_LABELS: Record<string, { label: string; feminine: boolean }> = {
  fullName: { label: 'el nombre completo', feminine: false },
  email: { label: 'el email', feminine: false },
  password: { label: 'la contraseña', feminine: true },
  passwordConfirmation: { label: 'la confirmación de la contraseña', feminine: true },
}

const UNKNOWN_FIELD = { label: 'este campo', feminine: false }

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

/* -------------------------------------------------------------------------- */
/* Mapa (campo, regla) -> mensaje                                              */
/* -------------------------------------------------------------------------- */

/**
 * Construye el mensaje de un error de campo a partir de la regla de VineJS
 * que ha fallado. Los límites de longitud salen de `meta`, no están escritos
 * aquí, para que sigan al backend si algún día cambian.
 *
 * Las reglas posibles en signup/login son: `required`, `email`, `minLength`,
 * `maxLength`, `sameAs` y `database.unique` (ojo: lleva un punto en el nombre).
 */
function messageForRule(field: string, rule: string, meta: Record<string, unknown>): string {
  const { label, feminine } = FIELD_LABELS[field] ?? UNKNOWN_FIELD
  const o = feminine ? 'a' : 'o'

  switch (rule) {
    case 'required':
      return capitalize(`${label} es obligatori${o}.`)

    case 'email':
      return 'El email no tiene un formato válido. Ejemplo: nombre@dominio.com'

    case 'minLength': {
      const min = asNumber(meta.min)
      if (min === null) break
      return capitalize(`${label} debe tener al menos ${min} caracteres.`)
    }

    case 'maxLength': {
      const max = asNumber(meta.max)
      if (max === null) break
      return capitalize(`${label} no puede superar los ${max} caracteres.`)
    }

    case 'sameAs':
      return field === 'passwordConfirmation'
        ? 'Las dos contraseñas no coinciden.'
        : capitalize(`${label} no coincide con el campo correspondiente.`)

    case 'database.unique':
      return field === 'email'
        ? 'Ya existe una cuenta con este email. Inicia sesión o usa otro email.'
        : capitalize(`${label} ya está en uso.`)
  }

  // Regla desconocida, o `meta` sin el número que esperábamos.
  return capitalize(`${label} no es válid${o}.`)
}

/* -------------------------------------------------------------------------- */
/* Errores sin campo asociado                                                  */
/* -------------------------------------------------------------------------- */

export const NETWORK_ERROR: ApiError = {
  kind: 'network',
  status: 0,
  fields: {},
  message: 'No se ha podido conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.',
}

export const SERVER_ERROR: ApiError = {
  kind: 'server',
  status: 0,
  fields: {},
  message: 'El servidor ha tenido un problema. Inténtalo de nuevo más tarde.',
}

export const UNKNOWN_ERROR: ApiError = {
  kind: 'unknown',
  status: 0,
  fields: {},
  message: 'Ha ocurrido un error inesperado. Inténtalo de nuevo.',
}

/* -------------------------------------------------------------------------- */
/* Normalización                                                               */
/* -------------------------------------------------------------------------- */

/** Extrae los errores solo si el cuerpo tiene la forma `{ errors: [...] }`. */
function extractIssues(payload: unknown): Record<string, unknown>[] {
  if (!isRecord(payload)) return []
  if (!Array.isArray(payload.errors)) return []
  return payload.errors.filter(isRecord)
}

/**
 * Convierte una respuesta de error de la API en un `ApiError` listo para pintar.
 *
 * Distingue las tres formas que produce el backend:
 * - 422 `{ errors: [{ rule, field, meta }] }` -> errores por campo
 * - 400/401 `{ errors: [{ message }] }`       -> mensaje general, sin campo
 * - 5xx (volcado de Youch en desarrollo)       -> mensaje genérico, cuerpo ignorado
 */
export function normalizeError(status: number, payload: unknown): ApiError {
  if (status === 422) {
    const fields: Record<string, string> = {}

    for (const issue of extractIssues(payload)) {
      if (typeof issue.field !== 'string' || typeof issue.rule !== 'string') continue
      // VineJS corta en el primer fallo de cada campo (bail), así que aquí
      // no hay riesgo de pisar un mensaje anterior del mismo campo.
      fields[issue.field] = messageForRule(
        issue.field,
        issue.rule,
        isRecord(issue.meta) ? issue.meta : {},
      )
    }

    if (Object.keys(fields).length === 0) {
      // Un 422 del que no hemos podido sacar ni un campo utilizable.
      return { ...UNKNOWN_ERROR, status }
    }

    return {
      kind: 'validation',
      status,
      fields,
      message: 'Revisa los datos del formulario.',
    }
  }

  if (status === 400) {
    return {
      kind: 'credentials',
      status,
      fields: {},
      message: 'El email o la contraseña no son correctos.',
    }
  }

  if (status === 401) {
    return {
      kind: 'unauthorized',
      status,
      fields: {},
      message: 'Tu sesión ha caducado. Vuelve a iniciar sesión.',
    }
  }

  if (status === 404) {
    return {
      kind: 'server',
      status,
      fields: {},
      message: 'No se ha encontrado el recurso solicitado.',
    }
  }

  if (status >= 500) {
    return { ...SERVER_ERROR, status }
  }

  return { ...UNKNOWN_ERROR, status }
}
