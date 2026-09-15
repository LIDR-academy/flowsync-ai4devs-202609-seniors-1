# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1 - To create the CLAUDE.md

**Modelo:** Sonnet 5 Hight
**Herramienta:** Claude Code

```
Analiza este repositorio antes de realizar cualquier cambio.

Investiga su estructura, arquitectura y configuración e identifica:

- Los componentes principales del proyecto y la responsabilidad de cada uno.
- El stack y las herramientas utilizadas.
- Los comandos reales disponibles para desarrollo, build, lint, formato y tests.
- Las convenciones y patrones que puedan deducirse del código y la configuración existente.
- Las restricciones importantes que un agente debería respetar al trabajar en este repositorio.
- Qué partes del proyecto actúan como fuente de verdad para entender contratos, validaciones y comportamiento existente.

Después, crea un CLAUDE.md en la raíz del repositorio con instrucciones generales, breves y accionables para futuros agentes.

El CLAUDE.md debe describir cómo trabajar correctamente en este repositorio, no cómo resolver una tarea concreta.

No implementes ninguna funcionalidad ni modifiques código de la aplicación. Limita los cambios a la creación de CLAUDE.md.

No incluyas instrucciones específicas del ticket actual ni asumas convenciones que no puedas justificar a partir del repositorio.
```

**Qué salió:** funcionó a la primera pero hay cosas que podría auto-descubrir sin tener que describir todas las partes de la arquitectura. Aparte, al haberse creado con el estado actual de la rama, convendría mantener sólo lo estático, y no lo que pueda cambiar ej. "Implements auth only so far: signup, login, logout, profile." Como problema principal es que tuve que especificarle en el siguiente prompt que lo hiciera en Español.

**Output:**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

FlowSync is a monorepo for a team task-management app, currently at an early/starter stage:

- `backend/` — AdonisJS 7 API (TypeScript, SQLite via Lucid ORM). Implements auth only so far: signup, login, logout, profile.
- `frontend/` — React 19 + Vite (TypeScript). Still the unmodified Vite scaffold; not yet wired to the backend API.

The two are independent npm projects (separate `package.json`, no workspace tooling) and must be installed/run separately.

## Commands

### Backend (`backend/`)

- `npm run dev` — start the API with HMR on `http://localhost:3333`.
- `npm run build` — production build (`node ace build`).
- `npm run test` — run Japa test suites (`node ace test`). Suites are defined in `adonisrc.ts`: `unit` (`tests/unit/**/*.spec.ts`) and `functional` (`tests/functional/**/*.spec.ts`); run one with `node ace test unit` or `node ace test functional`. No spec files exist yet.
- `npm run lint` — ESLint via `@adonisjs/eslint-config`.
- `npm run format` — Prettier write, using `@adonisjs/prettier-config`.
- `npm run typecheck` — `tsc --noEmit`.
- First-time setup: `cp .env.example .env`, `node ace generate:key`, `node ace migration:run`.
- Schema changes always go through Lucid migrations: `node ace make:migration <name>`, then `node ace migration:run`. Never edit `database/schema.ts` by hand — it's regenerated from migrations and models on every `migration:run`.

### Frontend (`frontend/`)

- `npm run dev` — Vite dev server on `http://localhost:5173`.
- `npm run build` — `tsc -b && vite build`.
- `npm run lint` — `oxlint` (not ESLint).
- `npm run preview` — preview a production build.
- No test script is configured.

Run backend and frontend in separate terminals; the frontend expects the API at `http://localhost:3333` (see `CORS_ORIGIN` in `backend/.env.example`).

## Architecture and conventions (backend)

- **Layering**: `start/routes.ts` → controllers (`app/controllers/`) → validators (`app/validators/`, VineJS) → models (`app/models/`, Lucid) → transformers (`app/transformers/`) for response shaping. Controllers stay thin: validate input, call the model, serialize the result.
- **Import paths**: use the Node.js subpath imports defined in `backend/package.json` (`#controllers/*`, `#models/*`, `#validators/*`, `#transformers/*`, `#middleware/*`, `#database/*`, `#start/*`, `#config/*`, etc.) instead of relative paths across top-level folders.
- **Routing**: grouped and prefixed (e.g. `/api/v1/auth/*`, `/api/v1/account/*` behind `middleware.auth()`), referencing controllers through the generated `#generated/controllers` registry rather than importing controller classes directly in `routes.ts`.
- **Responses**: use `serialize()` from `HttpContext` (custom `ApiSerializer` in `providers/api_provider.ts`), which wraps payloads in `{ data: ... }`. Shape what a client sees through a `BaseTransformer` subclass (`pick()` the allowed fields), not by returning models/rows directly.
- **Validation**: request payloads are validated with VineJS validators in `app/validators/`; these are the source of truth for accepted input shape and constraints (e.g. password length, email uniqueness), not the controller code.
- **Auth**: token-based via `@adonisjs/auth` access tokens (`User.accessTokens`), applied per-route with the named `auth` middleware from `start/kernel.ts`.
- **File naming**: snake_case filenames for TS modules (`access_tokens_controller.ts`, `user_transformer.ts`), matching AdonisJS conventions.
- **Database**: SQLite (`better-sqlite3`) via Lucid. `database/migrations/` is the real source of truth for the schema; `database/schema.ts` is a generated mirror used for typing and must not be hand-edited.
- **Tuyau** (`@tuyau/core`) generates a typed API client/registry into `backend/.adonisjs/client/` on `node ace build`/dev boot — this is meant to back a typed frontend client later, but the frontend does not consume it yet.

## Architecture and conventions (frontend)

- Plain Vite + React + TypeScript scaffold — no router, state management, or API client has been chosen yet. Don't assume conventions (e.g. folder structure for components/pages) that aren't in the code; introduce them deliberately if a task requires them.
- Linting is `oxlint`, configured in `.oxlintrc.json` (react, typescript, oxc plugins). Don't reach for ESLint config here.

## Constraints

- Don't hand-edit `backend/database/schema.ts` — change `database/migrations/` and/or the model, then run `node ace migration:run` to regenerate it.
- Don't commit `.env` files; only `.env.example` files are tracked (root `.gitignore` enforces this).
- Node's subpath imports (`#xxx/*`) are the backend's real module boundaries — respect them, don't bypass with deep relative paths.
- This repo is a training exercise starting point (branch `s1/start`): the backend only has auth endpoints and the frontend is an unmodified scaffold, so don't assume features exist beyond what's actually implemented.

## Source of truth

- API contracts (request/response shape): `backend/app/validators/*.ts` (input) and `backend/app/transformers/*.ts` (output) — not assumptions from the model or route names.
- Available endpoints: `backend/start/routes.ts`.
- Database schema: `backend/database/migrations/*.ts` (authoritative), mirrored (generated, read-only) in `backend/database/schema.ts`.
- Auth/session behavior: `backend/config/auth.ts`, `backend/config/session.ts`, and `backend/app/middleware/*.ts`.
```

## Prompt 2 - To create the CLAUDE.md in Spanish

**Modelo:** Sonnet 5 Hight
**Herramienta:** Claude Code

```
Analiza este repositorio antes de realizar cualquier cambio.

Investiga su estructura, arquitectura y configuración e identifica:

- Los componentes principales del proyecto y la responsabilidad de cada uno.
- El stack y las herramientas utilizadas.
- Los comandos reales disponibles para desarrollo, build, lint, formato y tests.
- Las convenciones y patrones que puedan deducirse del código y la configuración existente.
- Las restricciones importantes que un agente debería respetar al trabajar en este repositorio.
- Qué partes del proyecto actúan como fuente de verdad para entender contratos, validaciones y comportamiento existente.

Después, crea un CLAUDE.md en la raíz del repositorio con instrucciones generales, breves y accionables para futuros agentes.

El CLAUDE.md debe describir cómo trabajar correctamente en este repositorio, no cómo resolver una tarea concreta.

No implementes ninguna funcionalidad ni modifiques código de la aplicación. Limita los cambios a la creación de CLAUDE.md.

No incluyas instrucciones específicas del ticket actual ni asumas convenciones que no puedas justificar a partir del repositorio.

Todas las peticiones en el contexto de este repositorio van a ser en Español, por lo que necesito que generes todos los artefactos en Español.
```

**Qué salió:** funcionó bien aunque podría mejorarse.

**Output:**: Current `CLAUDE.md`

## Prompt 3 - To create the hook

**Modelo:** Sonnet 5 Hight
**Herramienta:** Claude Code

```
Configura una pieza del harness que estoy construyendo que valide automáticamente los cambios realizados en el frontend después de editar código.

Usa un hook de Claude Code para esta validación.

Antes de configurarlo, revisa la configuración existente del proyecto y los scripts disponibles en frontend/package.json para decidir qué comprobaciones son apropiadas.

El hook debe utilizar únicamente herramientas que ya existan en el proyecto y debe ayudar a detectar errores de linting, TypeScript o build introducidos por los cambios.

No implementes ninguna funcionalidad de producto ni modifiques el backend.
```

**Qué salió:** (opcional, una línea) se crea el script inline para el hook. En lugar de pedirle de nuevo que lo genere, le pido un refactor en la siguiente iteración.

**Output:**

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path // empty' | { read -r f; case \"$f\" in *frontend/*) OUT=$(cd frontend && npm run lint 2>&1 && npm run build 2>&1); ec=$?; if [ $ec -ne 0 ]; then echo \"$OUT\" >&2; exit 2; fi ;; esac; }",
            "timeout": 120,
            "statusMessage": "Validating frontend (lint + typecheck + build)..."
          }
        ]
      }
    ]
  }
}
```

## Prompt 4 - To refactor the hook via custom script

**Modelo:** Sonnet 5 Hight
**Herramienta:** Claude Code

```
Refactoriza el hook de validación que acabas de crear para separar la lógica del comando de la configuración.

Mueve la lógica del hook a un script dentro de `.claude/scripts/` y deja `.claude/settings.json` únicamente con la configuración necesaria para invocar ese script.

El comportamiento debe mantenerse igual:

- Solo debe ejecutar validaciones cuando el archivo editado pertenezca a `frontend/`.
- Debe ejecutar los scripts existentes de lint y build del frontend.
- Si alguna validación falla, debe devolver el error a Claude Code.
- Si todo pasa correctamente, no debe generar ruido innecesario.
- No añadas nuevas dependencias.
- No modifiques código de la aplicación.

Después verifica que la configuración JSON sea válida y que el script funcione correctamente.
```

**Qué salió:** se refactoriza generando el script por un lado y el settings.json por otro. Yo afinaría el statusMessage.

**Output:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/scripts/validate-frontend.sh",
            "timeout": 120,
            "statusMessage": "Validating frontend (lint + typecheck + build)..."
          }
        ]
      }
    ]
  }
}
```

`.claude/scripts/validate-frontend.sh`:
```
#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

file_path=$(jq -r '.tool_input.file_path // empty')

case "$file_path" in
  *frontend/*) ;;
  *) exit 0 ;;
esac

cd "$PROJECT_ROOT/frontend"

if ! output=$(npm run lint 2>&1 && npm run build 2>&1); then
  echo "$output" >&2
  exit 2
fi
```

## Prompt 5 - Petición para ejecutar la tarea 1

**Modelo:** Sonnet 5 Hight
**Herramienta:** Claude Code

```
Implementa el ticket FLOW-2.
Lee el ticket en Jira usando Atlassian MCP y completa la tarea siguiendo las instrucciones y convenciones disponibles en el repositorio.
Usa el plan mode y askUserQuestion si necesitas alguna clarificar algo.
```

**Qué salió:** Primero un plan y luego implementa el resultado con el harness y el MCP configurado

**Output:**

```markdown
Ready to code?

Here is Claude's plan:

FLOW-2 — Implementar login en el frontend

 Contexto

 El ticket de Jira solicitado (FLOW-1) no existe en el proyecto FLOW; el único ticket pendiente es FLOW-2 "Implementar login en el frontend" (confirmado con el usuario). El backend de FlowSync ya expone autenticación completa (signup, login, logout, profile) pero el frontend sigue siendo el scaffold de Vite sin modificar. Esta tarea conecta el frontend con POST /api/v1/auth/login para que un usuario pueda iniciar sesión.

 Criterios de aceptación del ticket:
 - Formulario de login visible.
 - El usuario introduce credenciales y las envía.
 - Credenciales válidas → confirmación visual de sesión iniciada.
 - Credenciales inválidas → mensaje de error comprensible.
 - Feedback visual mientras se procesa la petición.
 - Debe integrarse con el backend real (no mocks).

 Contrato de API (fuente de verdad: backend/app/validators/user.ts y backend/app/transformers/user_transformer.ts)

 - POST http://localhost:3333/api/v1/auth/login
   - Body: { email: string, password: string }
   - Éxito (200): { data: { user: { id, fullName, email, createdAt, updatedAt, initials }, token: string } } (ver AccessTokensController.store, UserTransformer).
   - Error credenciales inválidas (400, E_INVALID_CREDENTIALS): { errors: [{ message: "Invalid user credentials" }] } (cuando el header Accept negocia a json; confirmado leyendo @adonisjs/auth/build/errors-eDV8ejO0.js).
   - Error de validación (422, VineJS E_VALIDATION_ERROR): { errors: [{ message, rule, field }, ...] } (confirmado en @adonisjs/http-server/build/index.js → renderValidationErrorAsJSON).
   - CORS: backend/config/cors.ts permite cualquier origen en dev (app.inDev → origin: true), así que no hace falta proxy de Vite.
   - Es imprescindible mandar Accept: application/json y Content-Type: application/json en el fetch para que el backend negocie hacia JSON en vez de HTML/redirect.

 Cambios a realizar

 1. frontend/src/lib/api.ts (nuevo)

 Cliente mínimo de auth, sin dependencias nuevas (usa fetch nativo):
 - const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333' (tipado de import.meta.env ya cubierto por types: ["vite/client"] en tsconfig.app.json, no hace falta declarar nada extra).
 - class ApiError extends Error {} para transportar el mensaje legible extraído de errors[0].message.
 - type AuthUser = { id: number; fullName: string | null; email: string; createdAt: string; updatedAt: string; initials: string }
 - type LoginResult = { user: AuthUser; token: string }
 - async function login(email: string, password: string): Promise<LoginResult>:
   - fetch(${API_BASE_URL}/api/v1/auth/login, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email, password }) })
   - Si !res.ok: parsear body JSON, extraer body?.errors?.[0]?.message, lanzar new ApiError(message ?? 'No se pudo iniciar sesión').
   - Si res.ok: parsear { data } y devolver data como LoginResult.

 2. frontend/src/components/LoginForm.tsx (nuevo)

 - Componente controlado con estado local: email, password, status: 'idle' | 'loading' | 'error', errorMessage.
 - Al enviar (onSubmit, con preventDefault): pone status = 'loading', llama a login() de lib/api.ts.
   - Éxito → invoca props.onSuccess(result) (bubbling al padre).
   - Error (ApiError) → status = 'error', guarda err.message para mostrarlo en un elemento con rol de alerta.
 - Botón de submit deshabilitado y con texto "Iniciando sesión…" mientras status === 'loading' (cumple el requisito de feedback visual).
 - Inputs type="email" y type="password", ambos required, con autoComplete="email" / autoComplete="current-password".

 3. frontend/src/App.tsx (editar)

 - Sustituir el contenido del scaffold de Vite (contador, secciones de documentación/social) por la pantalla real de la app, ya que es la primera funcionalidad real:
   - Mantener heroImg para dar identidad visual mínima; eliminar reactLogo/viteLogo y el useState del contador.
   - Estado: const [session, setSession] = useState<LoginResult | null>(null).
   - Si session es null → renderizar <LoginForm onSuccess={setSession} />.
   - Si hay session → renderizar una vista de confirmación simple: "¡Hola, {session.user.fullName ?? session.user.email}!" (cumple el AC de "confirmación visual de que ha iniciado sesión"). No se implementa logout ni persistencia en localStorage: están fuera del alcance de los criterios de aceptación de este ticket.

 4. Estilos

 - Añadir estilos mínimos para el formulario y el mensaje de error en frontend/src/App.css, reutilizando las variables ya definidas en frontend/src/index.css (--accent, --accent-bg, --border, --text, etc.) para mantener coherencia visual con el scaffold existente. Sin nuevas dependencias de UI.

 Fuera de alcance

 - Logout, persistencia de sesión (localStorage/cookies), rutas/router, refresco de token: no los pide el ticket.
 - No se toca el backend (ya cumple el contrato necesario).

 Verificación

 1. cd backend && npm run dev (API en http://localhost:3333; requiere .env ya inicializado y migraciones corridas, asumido ya hecho en este entorno).
 2. cd frontend && npm run dev (Vite en http://localhost:5173).
 3. Con Chrome (herramientas claude-in-chrome): abrir http://localhost:5173, probar:
    - Envío con credenciales inválidas → aparece el mensaje de error del backend.
    - Durante el envío → botón muestra estado de carga/disabled.
    - Envío con credenciales válidas (usar un usuario ya creado vía /api/v1/auth/signup con Bash/curl si no hay ninguno) → aparece la vista de confirmación con el nombre/email del usuario.
 4. cd frontend && npm run lint (oxlint) y npm run build (tsc -b && vite build) para asegurar tipado y lint limpios.
```

Tras mostrar el plan le dije:  Implementa el plan.

Tras levantar el FE y BE, y crear un usuario con:

POST /api/v1/auth/signup

He podido hacer login en la app

## Prompt 6 - Creación de la base de comparación

**Modelo:** Sonnet 5 Hight
**Herramienta:** Claude Code

```
Documenta la ejecución que acabas de realizar para implementar FLOW-2.

Crea `docs/harness/comparacion.md` y añade una sección "Con harness" basada únicamente en lo que realmente ocurrió durante esta ejecución.

Documenta:

- Qué archivos modificaste, indicando el número total y sus rutas.
- Qué convenciones e instrucciones del proyecto respetaste, nombrándolas explícitamente.
- Qué convenciones o instrucciones del proyecto no cumpliste completamente, si las hubo.
- Cuántas intervenciones del usuario fueron necesarias durante la implementación.
- Qué aspectos del resultado considerarías que habría que revisar o corregir manualmente antes de enseñarlo a un equipo.

No inventes información ni completes todavía la comparación con la ejecución sin harness.

No escribas todavía las conclusiones finales que dependan de comparar ambas ejecuciones.

No modifiques ningún archivo de la aplicación.
```

**Qué salió:** Creado el fichero docs/harness/comparacion.md. Debido a limitaciones a nivel de bash dado que tengo configurado el `~/.claude/settings.json` global de mi equpo con limitaciones para el modo sandbox tuve que levantar ambos proyectos en otra terminal.

## Prompt 7 - Ejecución en el proyecto sin harness

**Modelo:** Sonnet 5 Hight
**Herramienta:** Claude Code

```
Implementa el ticket FLOW-2.
Lee el ticket en Jira usando Atlassian MCP y completa la tarea siguiendo las instrucciones y convenciones disponibles en el repositorio.
Usa el plan mode y askUserQuestion si necesitas alguna clarificar algo.
```

**Qué salió:** Primero un plan y luego implementa el resultado sin el harness y el MCP configurado

**Output:**

```markdown
 Ready to code?

 Here is Claude's plan:

 FLOW-2 — Implementar login en el frontend

 Contexto

 Ticket Jira FLOW-2 ("Implementar login en el frontend"): FlowSync necesita una pantalla de login
 en el frontend (React 19 + Vite, frontend/) que se integre con el backend de autenticación que
 ya existe en AdonisJS 7 (backend/). Criterios de aceptación: mostrar formulario, aceptar
 credenciales y enviarlas, confirmación visual si son válidas, mensaje de error comprensible si no
 lo son, feedback visual mientras se procesa, e integración real con el backend.

 Este es el trabajo de solo lectura/planificación para la copia "sin harness" del ejercicio de
 comparación (ver README.md raíz): aquí se entrega el plan, no el código. La implementación se
 pedirá aparte si el usuario lo confirma después de revisar este plan.

 Contrato del backend (ya implementado, verificado en código — no tocar)

 - POST http://localhost:3333/api/v1/auth/login
   - Body: { "email": string, "password": string }
   - Éxito 200: { "data": { "user": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" }, "token": "oat_xxx.yyy" } } (respuesta envuelta en data por el serializer de backend/providers/api_provider.ts)
   - Credenciales inválidas → 400: { "errors": [{ "message": "Invalid user credentials" }] } (sin envoltorio data)
   - Validación fallida (email mal formado, campo vacío) → 422: { "errors": [{ "message", "rule", "field" }] }
 - Guard por defecto es token-based (backend/config/auth.ts, default: 'api'), no cookies/sesión. Peticiones futuras autenticadas deben mandar Authorization: Bearer <token>.
 - CORS ya permite http://localhost:5173 en dev (backend/config/cors.ts, origin: app.inDev ? true : []).
 - No hay endpoints ni tests adicionales que afecten a este ticket; POST /api/v1/account/logout y GET /api/v1/account/profile existen pero no son parte del alcance de FLOW-2 (el ticket es solo login).

 Estado actual del frontend

 frontend/src/ es el scaffold por defecto de Vite (App.tsx con el demo del contador, main.tsx,
 CSS plano con nesting nativo y variables en :root). No hay router, cliente HTTP, gestor de estado,
 librería de formularios, tests, alias de paths, ni .env/import.meta.env — todo esto habría que
 añadirlo desde cero. package.json solo trae react/react-dom como dependencias.

 Decisiones de diseño (minimalistas, sin añadir dependencias que el ticket no pide)

 - Sin librería de routing: el ticket solo pide login + confirmación visual, no navegación entre páginas. Se resuelve con render condicional en App.tsx según el estado de autenticación.
 - Sin librería HTTP: fetch nativo envuelto en una función pequeña, no axios.
 - Sin librería de formularios/validación: inputs controlados con useState, no react-hook-form/zod. La validación real vive en el backend (VineJS); el frontend solo hace required en los inputs y muestra los errores que devuelve el backend.
 - Estado de sesión en memoria (useState/Context), sin persistir en localStorage: el AC no pide "mantener sesión tras recargar", y logout/rutas protegidas quedan fuera de este ticket. Si se recarga la página, se pierde el login — comportamiento aceptable para el alcance actual. Lo señalo explícitamente porque es una decisión de alcance, no un olvido.
 - Nueva variable de entorno VITE_API_URL (con .env.example) apuntando a http://localhost:3333/api/v1, porque no existe proxy de Vite ni convención de env previa.
 - Estilo: seguir el patrón existente de CSS plano con nesting nativo (como App.css/index.css), sin Tailwind/CSS-modules.

 Archivos a crear/modificar

 1. frontend/.env.example (nuevo) — VITE_API_URL=http://localhost:3333/api/v1
 2. frontend/src/api/authApi.ts (nuevo) — función login(email, password):
    - hace fetch(${import.meta.env.VITE_API_URL}/auth/login, { method: 'POST', headers, body })
    - si res.ok, devuelve { user, token } (desde data)
    - si no, parsea { errors } y lanza un error con un mensaje legible (ver mapeo abajo)
 3. frontend/src/context/AuthContext.tsx (nuevo) — AuthProvider + hook useAuth() con { user, token, status: 'idle'|'loading'|'error', error, login, }. login() llama a authApi.login, gestiona los tres estados (idle/loading/success/error) pedidos por el AC.
 4. frontend/src/components/LoginForm.tsx (nuevo) — formulario controlado (email, password), botón submit deshabilitado y con texto "Iniciando sesión…" mientras status === 'loading', mensaje de error visible cuando status === 'error'.
 5. frontend/src/components/LoginForm.css (nuevo, o añadir al App.css existente) — estilos siguiendo el patrón de nesting ya usado.
 6. frontend/src/App.tsx (modificar) — quitar el demo del contador; envolver en AuthProvider; renderizar LoginForm si no hay user, o una vista simple de confirmación ("¡Bienvenido, {fullName ?? email}!") si lo hay.

 Mapeo de errores a mensajes comprensibles

 - 400 (credenciales inválidas) → "Correo o contraseña incorrectos."
 - 422 (validación) → usar errors[0].message si viene, o "Revisa los datos del formulario."
 - Fallo de red / servidor caído → "No se pudo conectar con el servidor. Inténtalo de nuevo."

 Verificación

 1. Backend: cd backend && npm run dev (puerto 3333, migraciones ya corridas).
 2. Frontend: cd frontend && npm run dev (puerto 5173), con frontend/.env copiado desde .env.example.
 3. Manual en navegador:
    - Login con credenciales de un usuario existente (crear uno vía POST /api/v1/auth/signup si hace falta) → ver confirmación visual.
    - Login con credenciales incorrectas → ver mensaje de error.
    - Mientras se envía → ver estado de carga (botón deshabilitado/texto cambiado).
 4. npm run lint en frontend/ (oxlint) para cumplir las reglas existentes (react/rules-of-hooks, etc).
 5. No hay test runner instalado; no se añaden tests automatizados en este alcance salvo que se pida explícitamente (fuera del AC de FLOW-2).

 Explícitamente fuera de alcance

 - Logout, rutas protegidas, persistencia de sesión tras recargar, pantalla de signup — no están en el AC de FLOW-2.
 - Cambios en el backend — el endpoint de login ya existe y funciona.
```

Tras mostrar el plan le dije:  Implementa el plan y recuerda que tengo el backend y frontend levantados en 2 terminales aparte, no necesitas levantarlo.

## Prompt 8 - Creación de la salida del proyecto sin-harness para la comparativa

**Modelo:** Sonnet 5 Hight
**Herramienta:** Claude Code

```
Documenta la ejecución que acabas de realizar para implementar FLOW-2.

Usa `docs/harness/comparacion.md` y añade la sección “Sin harness" basada únicamente en lo que realmente ocurrió durante esta ejecución.

Documenta:

- Qué archivos modificaste, indicando el número total y sus rutas.
- Qué convenciones e instrucciones del proyecto respetaste, nombrándolas explícitamente.
- Qué convenciones o instrucciones del proyecto no cumpliste completamente, si las hubo.
- Cuántas intervenciones del usuario fueron necesarias durante la implementación.
- Qué aspectos del resultado considerarías que habría que revisar o corregir manualmente antes de enseñarlo a un equipo.

No inventes información ni completes todavía la comparación con la ejecución con harness.

No escribas todavía las conclusiones finales que dependan de comparar ambas ejecuciones.

No modifiques ningún archivo de la aplicación.
```

**Qué salió:** Actualizado el fichero docs/harness/comparacion.md.

**Output:**

## Prompt 9 - Comparación ambos proyectos

**Modelo:** Sonnet 5 Hight
**Herramienta:** Claude Code

```
Revisa `docs/harness/comparacion.md` y completa la comparación final del experimento de FLOW-2.

El documento ya contiene las observaciones de las ejecuciones con harness y sin harness. Usa únicamente la información disponible en el documento, el estado actual del repositorio y el historial de esta conversación. No inventes resultados que no hayan sido observados.

Organiza la comparación de forma breve y clara, mostrando lado a lado:

1. Qué archivos tocó cada ejecución, indicando el número total.
2. Qué convenciones del proyecto respetó y cuáles no, nombrándolas explícitamente.
3. Cuántas intervenciones del usuario fueron necesarias en cada ejecución.
4. Qué habría que arreglar manualmente en cada resultado antes de enseñárselo a un equipo.

Después añade una sección `Tres líneas` con:

1. Qué piezas del harness se montaron y cuál costó más de lo esperado, indicando concretamente dónde estuvo la dificultad.
2. La primera diferencia concreta observada entre las dos ejecuciones y dónde se detectó.
3. Una instrucción que estuviera explícitamente escrita en el harness y que la ejecución con harness no cumpliera completamente.

Para la tercera línea, revisa las instrucciones de `CLAUDE.md` y contrástalas con lo que realmente ocurrió en la ejecución con harness. No uses como respuesta un fallo exclusivo de la ejecución sin harness.

Mantén el documento conciso, aproximadamente de una pantalla.

No modifiques código de la aplicación ni ningún otro archivo. Solo modifica `docs/harness/comparacion.md`.
```

**Qué salió:** Actualizado el fichero docs/harness/comparacion.md.

**Output:** Ver fichero prompts.md y docs/harness/comparacion.md para ver el resultado

