import type { ApiError } from './registry'

export interface FormError {
  /** Message for the whole form (credentials, network, unexpected). */
  form?: string
  /** Messages keyed by backend field name (422 validation). */
  fields: Record<string, string>
}

interface TuyauLikeError {
  kind?: string
  status?: number
  response?: unknown
}

/** Translate a Tuyau error into user-facing messages. */
export function toFormError(err: unknown): FormError {
  const e = err as TuyauLikeError
  if (e.kind === 'network') {
    return {
      form: 'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.',
      fields: {},
    }
  }

  const body = e.response as Partial<ApiError> | undefined
  if (e.status === 422 && Array.isArray(body?.errors)) {
    const fields: Record<string, string> = {}
    for (const item of body.errors) {
      if (item.field && !fields[item.field]) fields[item.field] = validationMessage(item)
    }
    return { fields }
  }
  if (e.status === 400 || e.status === 401) {
    return { form: 'Correo o contraseña incorrectos.', fields: {} }
  }
  return { form: 'Ha ocurrido un error inesperado. Inténtalo de nuevo.', fields: {} }
}

function validationMessage(item: { message: string; rule?: string }): string {
  switch (item.rule) {
    case 'required':
      return 'Este campo es obligatorio.'
    case 'email':
      return 'Introduce un correo electrónico válido.'
    case 'database.unique':
    case 'unique':
      return 'Ya existe una cuenta con este correo.'
    case 'minLength':
      return 'Debe tener al menos 8 caracteres.'
    case 'maxLength':
      return 'Has superado la longitud máxima permitida (32 caracteres).'
    case 'sameAs':
      return 'Las contraseñas no coinciden.'
    default:
      return item.message
  }
}
