export type ApiErrorItem = {
  message: string
  rule?: string
  field?: string
}

export class ApiError extends Error {
  status: number
  items: ApiErrorItem[]

  constructor(status: number, items: ApiErrorItem[]) {
    super(items[0]?.message ?? 'No se pudo completar la solicitud.')
    this.status = status
    this.items = items
  }

  fieldMessage(field: string): string | undefined {
    return this.items.find((item) => item.field === field)?.message
  }

  generalMessage(): string | undefined {
    return this.items.find((item) => !item.field)?.message
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

export async function apiFetch<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    const items: ApiErrorItem[] = body?.errors ?? [{ message: 'No se pudo completar la solicitud.' }]
    throw new ApiError(response.status, items)
  }

  return body as T
}
