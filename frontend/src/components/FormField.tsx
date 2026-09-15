type FormFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  /** Mensaje de error de este campo, ya traducido. */
  error?: string
  hint?: string
  disabled?: boolean
  autoComplete?: string
}

export function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  error,
  hint,
  disabled,
  autoComplete,
}: FormFieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  // Se describe con el error si lo hay, y si no con la pista. No se acumulan:
  // cuando hay un error es lo único relevante que anunciar.
  const describedBy = error ? errorId : hint ? hintId : undefined

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        // Con `undefined` el atributo no se emite; solo aparece cuando falla.
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
      />
      {/* El mensaje no lleva aria-live: lo anuncia el banner del formulario.
          Si cada campo lo llevara, un error múltiple dispararía varios
          anuncios simultáneos y se solaparían. */}
      {error ? (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      ) : hint ? (
        <p className="field-hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
