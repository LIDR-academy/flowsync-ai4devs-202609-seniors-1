/**
 * Cliente HTTP de la API de FlowSync.
 *
 * Es el único sitio del frontend que habla con la red. No lanza excepciones:
 * siempre devuelve un `ApiResult`, de forma que quien llama está obligado a
 * mirar `ok` antes de usar los datos y no puede acabar pintando el mensaje de
 * una excepción cualquiera en la interfaz.
 */

import { NETWORK_ERROR, SERVER_ERROR, isRecord, normalizeError } from './errors'
import type { ApiResult } from './types'

const API_BASE_URL = import.meta.env.VITE_API_URL

if (!API_BASE_URL) {
  // Preferimos romper al arrancar antes que caer a una URL por defecto: un
  // fallo de configuración se convertiría en peticiones fallidas difíciles de
  // diagnosticar.
  throw new Error(
    'Falta la variable de entorno VITE_API_URL. Revisa el fichero frontend/.env',
  )
}

type RequestOptions = {
  method?: 'GET' | 'POST'
  body?: unknown
  token?: string | null
  /**
   * El backend envuelve las respuestas en `{ data: ... }`, salvo logout.
   * Pon `false` para recibir el cuerpo tal cual.
   */
  unwrap?: boolean
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResult<T>> {
  const { method = 'GET', body, token, unwrap = true } = options

  const headers: Record<string, string> = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    // El backend no responde, no hay conexión, o el navegador ha bloqueado la
    // petición por CORS. Para el usuario son el mismo problema.
    return { ok: false, error: NETWORK_ERROR }
  }

  // Intentamos parsear siempre, sin mirar el `Content-Type`: así una respuesta
  // en HTML, vacía o con JSON malformado caen todas en la misma rama.
  let payload: unknown = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    return { ok: false, error: normalizeError(response.status, payload) }
  }

  if (!unwrap) {
    return { ok: true, data: payload as T }
  }

  if (isRecord(payload) && 'data' in payload) {
    return { ok: true, data: payload.data as T }
  }

  // Respuesta correcta pero con una forma que no esperábamos. Devolvemos error
  // en lugar de un `data` indefinido que reventaría más adelante al pintarlo.
  return { ok: false, error: SERVER_ERROR }
}
