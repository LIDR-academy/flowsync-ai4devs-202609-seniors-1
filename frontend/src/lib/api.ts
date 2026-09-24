import { createTuyau } from '@tuyau/core/client'
import { registry } from './registry.ts'
import { getToken, notifyUnauthorized } from './token.ts'

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
    afterResponse: [
      (request, _options, response) => {
        // Only a request that carried a token can mean "session expired".
        if (response.status === 401 && request.headers.has('Authorization')) notifyUnauthorized()
      },
    ],
  },
})

export const api = tuyau.api
