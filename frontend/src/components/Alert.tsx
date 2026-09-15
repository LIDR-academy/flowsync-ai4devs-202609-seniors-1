import type { ReactNode, Ref } from 'react'

type AlertProps = {
  children: ReactNode
  /**
   * `error` interrumpe al lector de pantalla (role="alert"); `info` solo lo
   * anuncia cuando termina lo que esté leyendo (role="status").
   */
  tone?: 'error' | 'info'
  /** Permite enfocar el aviso tras un envío fallido, para anunciarlo y hacer scroll. */
  ref?: Ref<HTMLDivElement>
}

export function Alert({ children, tone = 'error', ref }: AlertProps) {
  return (
    <div
      ref={ref}
      // tabIndex -1: enfocable por código, pero fuera del orden de tabulación.
      tabIndex={-1}
      role={tone === 'error' ? 'alert' : 'status'}
      className={tone === 'error' ? 'alert alert-error' : 'alert'}
    >
      {children}
    </div>
  )
}
