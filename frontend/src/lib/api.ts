import { createTuyau } from '@tuyau/core/client'
import { registry } from './registry.ts'

const tuyau = createTuyau({
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3333',
  registry,
})

export const api = tuyau.api
