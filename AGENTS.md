# AGENTS.md — FlowSync

## Overview
Monorepo: `backend/` (AdonisJS 7, API) + `frontend/` (React 19 + Vite).
Auth con access tokens. SQLite (better-sqlite3) + Lucid ORM.

- Las dos apps son independientes: no hay workspace común. Cada una tiene su propio
  `package.json` y `node_modules`, y los comandos se lanzan desde su directorio.
- Backend en `http://localhost:3333`; frontend en `http://localhost:5173`, en otra terminal.
- El frontend es todavía la plantilla de Vite: sin router, cliente HTTP, gestión de estado ni tests.
- La documentación del repo (README, commits) está en español.

## Stack y convenciones
- **Migration-first**: el esquema se genera. NUNCA editar `database/schema.ts`
  a mano; crear migración y correr `node ace migration:run`. Los modelos extienden
  las clases generadas (`compose(UserSchema, ...)`), así que las columnas no se
  declaran en el modelo. Reglas de mapeo personalizadas en `database/schema_rules.ts`.
- **Transformers**: la salida de la API pasa por un `*Transformer` (BaseTransformer,
  `toObject()` con `this.pick(...)`). No serializar el modelo directo.
- **Respuestas**: `providers/api_provider.ts` añade `ctx.serialize()`, que envuelve todo
  en `{ "data": ... }` y valida la paginación de Lucid. Usarlo en controllers nuevos;
  `serialize.withoutWrapping` si hace falta la forma cruda.
- **Validación**: VineJS en `#validators/*`, con `request.validateUsing(validator)`.
  No validar a mano en el controller.
- **Controllers**: la base usa controllers generados (`#generated/controllers`). En las
  rutas se referencian como `[controllers.X, 'metodo']`, no con imports directos.
- **Imports**: subpath imports de `package.json` (`#models/*`, `#controllers/*`,
  `#validators/*`, `#transformers/*`, `#start/*`, `#config/*`, `#generated/*`...)
  en lugar de rutas relativas.
- **Fechas**: Luxon `DateTime`. `start/validator.ts` convierte las fechas de VineJS a Luxon.
- **Variables de entorno**: se validan en `start/env.ts`. Una variable nueva va ahí y en `.env.example`.
- **Lint/format**: backend con ESLint (`npm run lint`) y Prettier (`npm run format`);
  frontend con oxlint.

## Comandos clave

### Backend (`backend/`)
```bash
npm install
cp .env.example .env && node ace generate:key   # solo la primera vez
node ace migration:run   # aplica migraciones, crea tmp/db.sqlite3 y regenera database/schema.ts
npm run dev              # node ace serve --hmr
npm run test             # node ace test (Japa)
npm run lint             # ESLint
npm run format           # Prettier
npm run typecheck        # tsc --noEmit
npm run build            # node ace build → build/
```

Tests con Japa, suites definidas en `adonisrc.ts`:
- `unit`: `tests/unit/**/*.spec.ts` (timeout 2 s)
- `functional`: `tests/functional/**/*.spec.ts` (timeout 30 s, levanta el servidor HTTP)

Todavía no existe ningún test; solo `tests/bootstrap.ts`. Para ejecutar un subconjunto:
```bash
node ace test functional                              # una suite
node ace test --files tests/functional/auth.spec.ts   # un fichero
node ace test --tests "nombre del test"               # un test por título
node ace test --watch
```

Los tests usan `NODE_ENV=test` y `.env.test` (`SESSION_DRIVER=memory`). Hay plugins para
`apiClient`, `authApiClient` (`.loginAs()`), `sessionApiClient` y aserciones de BD.

Generadores: `node ace make:controller`, `make:migration`, `make:validator`, `make:test`, `make:transformer`.

### Frontend (`frontend/`)
```bash
npm install
npm run dev       # vite
npm run build     # tsc -b && vite build (el typecheck va dentro del build)
npm run lint      # oxlint
```

El frontend no tiene Prettier ni tests configurados.

## Arquitectura del backend

**Ciclo de una petición.** `start/kernel.ts` define dos pilas de middleware. La de servidor
corre siempre: `force_json_response` (fuerza `Accept: application/json`, así que los errores
salen siempre en JSON), container bindings y CORS. La de router corre en rutas registradas:
bodyparser, session, shield, init auth y `silent_auth` (hace `auth.check()` sin bloquear).
Las rutas protegidas añaden el middleware nombrado `middleware.auth()`.

**Rutas.** Todas en `start/routes.ts` bajo el prefijo `/api/v1`:

| Método | Ruta | Controller | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/signup` | `NewAccountController.store` | no |
| POST | `/api/v1/auth/login` | `AccessTokensController.store` | no |
| GET | `/api/v1/account/profile` | `ProfileController.show` | sí |
| POST | `/api/v1/account/logout` | `AccessTokensController.destroy` | sí |

**Autenticación.** El guard por defecto es `api` (`tokensGuard`, tabla `auth_access_tokens`).
Signup y login responden `{ data: { user, token } }`; el cliente manda el token como
`Authorization: Bearer <token>`. Logout borra el token actual. Existe un guard `web` de sesión
que ninguna ruta usa. En desarrollo CORS acepta cualquier origen con `credentials: true`;
en producción la allowlist está vacía.

**Registry de Tuyau.** `backend/package.json` exporta `./registry` y `./data` desde
`.adonisjs/client`. Es la vía prevista para un cliente HTTP tipado desde el frontend
(`@tuyau/core`), aunque el frontend todavía no lo consume.

## Estilo
- Backend: Prettier de AdonisJS (sin punto y coma, comillas simples, 100 columnas) y
  `.editorconfig` con 2 espacios y LF. `.adonisjs/` está excluido de Prettier.
- Frontend: sin punto y coma, comillas simples. oxlint con `react/rules-of-hooks` como error
  y `react/only-export-components` como aviso. TypeScript con `verbatimModuleSyntax`
  (`import type` para tipos), `noUnusedLocals`, `noUnusedParameters` y `erasableSyntaxOnly`
  (sin `enum` ni parameter properties).

## Contexto del ejercicio del curso
- Trabajo sobre un fork: `origin` es el fork personal y `upstream` el repo del curso.
  La rama de partida es `s1/start`.
- El PR de entrega va contra el repo del curso y contiene **solo** `docs/harness/comparacion.md`
  y `prompts.md`. No se mezclan cambios de código ni de configuración en ese PR.
- `prompts.md` recoge los prompts tal cual se lanzaron, sin reescribirlos, con modelo y herramienta.

## Gotchas
- Auth por access tokens (`@adonisjs/auth`); el perfil se sirve por transformer.
- No introducir dependencias nuevas sin justificarlas en el PR.
- `.adonisjs/server/*` y `.adonisjs/client/*` son código generado: no editar a mano. Los regeneran
  los hooks `indexEntities` y `generateRegistry` de `adonisrc.ts` al lanzar `node ace serve`,
  `build` o `test`. Tras añadir un controller o una ruta, relanzar uno de ellos para que aparezca
  en `controllers` y en el registry.
