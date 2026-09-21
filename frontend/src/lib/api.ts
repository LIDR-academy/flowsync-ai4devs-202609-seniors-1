import { createTuyau } from '@tuyau/core/client'
import { registry } from './registry.ts'
import { getToken } from './token.ts'

const tuyau = createTuyau({
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3333',
  registry,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getToken()
        if (token) request.headers.set('Authorization', `Bearer ${token}`)
      },
    ],
  },
})

export const api = tuyau.api
