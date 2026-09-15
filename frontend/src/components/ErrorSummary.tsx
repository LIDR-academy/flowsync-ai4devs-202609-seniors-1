import type { Ref } from 'react'
import type { ApiError } from '../api/types'
import { Alert } from './Alert'

type ErrorSummaryProps = {
  error: ApiError
  /** Campos que el formulario sí pinta junto a su input. */
  ownFields: string[]
  ref?: Ref<HTMLDivElement>
}

/**
 * Banner de error de un formulario.
 *
 * Además del mensaje general, recoge los errores de campos que este
 * formulario no muestra. Sin esto, si el backend rechazara un campo que no
 * tiene input asociado, el usuario pulsaría Enviar y no vería nada.
 */
export function ErrorSummary({ error, ownFields, ref }: ErrorSummaryProps) {
  const orphans = Object.entries(error.fields)
    .filter(([field]) => !ownFields.includes(field))
    .map(([, message]) => message)

  return (
    <Alert ref={ref}>
      {error.message}
      {orphans.length > 0 && (
        <ul className="alert-list">
          {orphans.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
    </Alert>
  )
}
