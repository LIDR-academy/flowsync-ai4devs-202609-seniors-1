import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Task, TaskInput, TaskUpdateInput } from '../types/task'
import type { AuthResult, LoginInput, SignupInput, User } from '../types/auth'

/**
 * Hand-authored Tuyau registry for the backend's public `/api/v1/tasks` routes and `/api/v1/auth` + `/api/v1/account` routes
 * (see backend/start/routes.ts). The backend already generates a typed registry
 * at backend/.adonisjs/client/registry/, but its response types are inferred via
 * `ReturnType<Controller[...]>`, which pulls in the backend's decorated Lucid
 * model/schema source files. Those files parse under the backend's own
 * `experimentalDecorators` tsconfig, which the frontend project doesn't (and
 * shouldn't) share, so importing that generated file here breaks `tsc -b` with
 * decorator syntax errors. This local registry mirrors the same route
 * shapes/patterns by hand instead, typed against the hand-written `Task` type.
 * Keep it in sync with backend/start/routes.ts if those routes change.
 */

type ApiValidationError = { errors: Array<{ message: string; rule?: string; field?: string }> }

export type ApiError = {
  errors: Array<{ message: string; rule?: string; field?: string; code?: string }>
}

const placeholder: any = {}

export const routes = {
  'tasks.index': {
    methods: ['GET', 'HEAD'],
    pattern: '/api/v1/tasks',
    tokens: [
      { old: '/api/v1/tasks', type: 0, val: 'api', end: '' },
      { old: '/api/v1/tasks', type: 0, val: 'v1', end: '' },
      { old: '/api/v1/tasks', type: 0, val: 'tasks', end: '' },
    ],
    types: placeholder as {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: { data: Task[] }
      errorResponse: unknown
    },
  },
  'tasks.store': {
    methods: ['POST'],
    pattern: '/api/v1/tasks',
    tokens: [
      { old: '/api/v1/tasks', type: 0, val: 'api', end: '' },
      { old: '/api/v1/tasks', type: 0, val: 'v1', end: '' },
      { old: '/api/v1/tasks', type: 0, val: 'tasks', end: '' },
    ],
    types: placeholder as {
      body: TaskInput
      paramsTuple: []
      params: {}
      query: {}
      response: { data: Task }
      errorResponse: ApiValidationError
    },
  },
  'tasks.show': {
    methods: ['GET', 'HEAD'],
    pattern: '/api/v1/tasks/:id',
    tokens: [
      { old: '/api/v1/tasks/:id', type: 0, val: 'api', end: '' },
      { old: '/api/v1/tasks/:id', type: 0, val: 'v1', end: '' },
      { old: '/api/v1/tasks/:id', type: 0, val: 'tasks', end: '' },
      { old: '/api/v1/tasks/:id', type: 1, val: 'id', end: '' },
    ],
    types: placeholder as {
      body: {}
      paramsTuple: [string | number]
      params: { id: string | number }
      query: {}
      response: { data: Task }
      errorResponse: unknown
    },
  },
  'tasks.update': {
    methods: ['PUT'],
    pattern: '/api/v1/tasks/:id',
    tokens: [
      { old: '/api/v1/tasks/:id', type: 0, val: 'api', end: '' },
      { old: '/api/v1/tasks/:id', type: 0, val: 'v1', end: '' },
      { old: '/api/v1/tasks/:id', type: 0, val: 'tasks', end: '' },
      { old: '/api/v1/tasks/:id', type: 1, val: 'id', end: '' },
    ],
    types: placeholder as {
      body: TaskUpdateInput
      paramsTuple: [string | number]
      params: { id: string | number }
      query: {}
      response: { data: Task }
      errorResponse: ApiValidationError
    },
  },
  'tasks.destroy': {
    methods: ['DELETE'],
    pattern: '/api/v1/tasks/:id',
    tokens: [
      { old: '/api/v1/tasks/:id', type: 0, val: 'api', end: '' },
      { old: '/api/v1/tasks/:id', type: 0, val: 'v1', end: '' },
      { old: '/api/v1/tasks/:id', type: 0, val: 'tasks', end: '' },
      { old: '/api/v1/tasks/:id', type: 1, val: 'id', end: '' },
    ],
    types: placeholder as {
      body: {}
      paramsTuple: [string | number]
      params: { id: string | number }
      query: {}
      response: { message: string }
      errorResponse: unknown
    },
  },
  'auth.signup': {
    methods: ['POST'],
    pattern: '/api/v1/auth/signup',
    tokens: [
      { old: '/api/v1/auth/signup', type: 0, val: 'api', end: '' },
      { old: '/api/v1/auth/signup', type: 0, val: 'v1', end: '' },
      { old: '/api/v1/auth/signup', type: 0, val: 'auth', end: '' },
      { old: '/api/v1/auth/signup', type: 0, val: 'signup', end: '' },
    ],
    types: placeholder as {
      body: SignupInput
      paramsTuple: []
      params: {}
      query: {}
      response: { data: AuthResult }
      errorResponse: ApiError
    },
  },
  'auth.login': {
    methods: ['POST'],
    pattern: '/api/v1/auth/login',
    tokens: [
      { old: '/api/v1/auth/login', type: 0, val: 'api', end: '' },
      { old: '/api/v1/auth/login', type: 0, val: 'v1', end: '' },
      { old: '/api/v1/auth/login', type: 0, val: 'auth', end: '' },
      { old: '/api/v1/auth/login', type: 0, val: 'login', end: '' },
    ],
    types: placeholder as {
      body: LoginInput
      paramsTuple: []
      params: {}
      query: {}
      response: { data: AuthResult }
      errorResponse: ApiError
    },
  },
  'account.profile': {
    methods: ['GET'],
    pattern: '/api/v1/account/profile',
    tokens: [
      { old: '/api/v1/account/profile', type: 0, val: 'api', end: '' },
      { old: '/api/v1/account/profile', type: 0, val: 'v1', end: '' },
      { old: '/api/v1/account/profile', type: 0, val: 'account', end: '' },
      { old: '/api/v1/account/profile', type: 0, val: 'profile', end: '' },
    ],
    types: placeholder as {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: { data: User }
      errorResponse: ApiError
    },
  },
  'account.logout': {
    methods: ['POST'],
    pattern: '/api/v1/account/logout',
    tokens: [
      { old: '/api/v1/account/logout', type: 0, val: 'api', end: '' },
      { old: '/api/v1/account/logout', type: 0, val: 'v1', end: '' },
      { old: '/api/v1/account/logout', type: 0, val: 'account', end: '' },
      { old: '/api/v1/account/logout', type: 0, val: 'logout', end: '' },
    ],
    types: placeholder as {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: { message: string }
      errorResponse: ApiError
    },
  },
} as const satisfies Record<string, AdonisEndpoint>

export const registry = {
  routes,
  $tree: {} as {
    tasks: {
      index: (typeof routes)['tasks.index']
      store: (typeof routes)['tasks.store']
      show: (typeof routes)['tasks.show']
      update: (typeof routes)['tasks.update']
      destroy: (typeof routes)['tasks.destroy']
    }
    auth: {
      signup: (typeof routes)['auth.signup']
      login: (typeof routes)['auth.login']
    }
    account: {
      profile: (typeof routes)['account.profile']
      logout: (typeof routes)['account.logout']
    }
  },
}
