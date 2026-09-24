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

## Prompt 1 - Con Harness

\plan

**Modelo:** Opus 5 1M xHigh
**Herramienta:** Claude Code

Trabajas en el frontend de FlowSync: React 19 + Tailwind + shadcn/ui.
Implementa el login y el registro consumiendo el backend de auth ya existente.
Sabes que terminaste cuando:
    - El registro llama a POST /api/v1/auth/signup y el login a POST /api/v1/auth/login.
    - Tras login exitoso, redirige a una vista protegida que consuma GET /api/v1/account/profile.
    - Credenciales inválidas o email ya registrado muestran un mensaje claro, no un error genérico."
No toques el backend — el auth ya existe. No instales una librería de formularios sin justificarlo.
Usa los componentes de shadcn/ui. Convenciones en AGENTS.md.
Si el ticket no especifica un campo del formulario, revisa el validador real del backend antes de asumir.
Si tienes alguna duda, pregunta antes de implementar

**Qué salió:** 

Lanzó 3 subagentes para explorar backend auth endpoints,, frontend structure and docs and repo conventions

Four decisions before I write the plan:
1) hadcn/ui and Tailwind aren't installed. How should I set them up? Run the shadcn CLI
2) hadcn's <Form> component is built on react-hook-form + zod. Your prompt says no form library without justification. Which way? react-hook-form + zod
3) No router is installed. The ticket needs a redirect to a protected view after login.=> react-router v7
4) Where should the access token live? Backend tokens are configured with no expiry.  => localStorage. Session survives a page reload, which is what people expect from a login. Readable by any XSS on the origin — acceptable for this exercise, and the usual choice for a bearer-token SPA with no refresh flow.

Here is Claude's plan:
                    
### Login y registro en el frontend de FlowSync

#### Context

El backend de auth ya está completo y estable (`backend/start/routes.ts:18-37`): signup, login,
perfil y logout funcionan y están cubiertos por validadores VineJS. Lo que no existe es el
frontend: `frontend/src/` son todavía los 4 ficheros de la plantilla de Vite (contador, logos y
enlaces), y `frontend/package.json:12-24` solo declara `react` y `react-dom`.

No hay Tailwind, ni shadcn/ui, ni router, ni cliente HTTP, ni estado de auth. El ticket asume
shadcn/ui, así que montarlo forma parte del trabajo, no es un paso previo opcional.

El objetivo: pantallas de login y registro que consuman el auth existente, con una vista
protegida detrás que lea el perfil, y con errores que digan lo que ha pasado de verdad —
credenciales inválidas y email duplicado son mensajes distintos, no un "algo ha ido mal".

**No se toca `backend/`.**

---

#### Contrato real del backend (verificado, no asumido)

Base: `http://localhost:3333`. CORS en dev refleja cualquier origen (`backend/config/cors.ts:21`,
`origin: app.inDev ? true : []`), así que Vite en 5173 llama directo sin proxy.

Toda respuesta serializada va envuelta en `data` (`backend/providers/api_provider.ts:18`, `wrap: 'data'`).

##### `POST /api/v1/auth/signup`

Campos exactos de `backend/app/validators/user.ts:12-17` — esto resuelve la duda del ticket sobre
qué campos lleva el formulario:

| Campo | Regla | Nota |
|---|---|---|
| `fullName` | `vine.string().nullable()` | **La clave debe venir siempre.** `.nullable()` permite `null`, no permite omitirla. |
| `email` | email, maxLength 254, `unique({table:'users'})` | |
| `password` | string, **minLength 8, maxLength 32** | |
| `passwordConfirmation` | mismas reglas + `sameAs('password')` | Nombre camelCase literal, **no** `password_confirmation`. |

→ `200 { "data": { "user": {...}, "token": "oat_..." } }`
→ `422 { "errors": [{ "message": "The email has already been taken", "rule": "database.unique", "field": "email" }] }`

##### `POST /api/v1/auth/login`

`email` (email, maxLength 254) + `password` (`vine.string()`, **sin reglas de longitud en login**).

→ `200 { "data": { "user": {...}, "token": "oat_..." } }`
→ **`400`** `{ "errors": [{ "message": "Invalid user credentials" }] }` — ojo: **400, no 401**, y
   sin `field` ni `rule`. Mismo error para email desconocido y contraseña mala.

##### `GET /api/v1/account/profile` (auth)

`Authorization: Bearer <token>` → `200 { "data": { id, fullName, email, createdAt, updatedAt, initials } }`
(los 6 campos de `backend/app/transformers/user_transformer.ts:6-13`; `initials` es un getter
calculado, útil para el avatar). Sin token o token inválido → `401 { "errors": [{ "message": "Unauthorized access" }] }`.

##### `POST /api/v1/account/logout` (auth)

Bajo `/account`, **no** `/auth`. Devuelve `200 { "message": "..." }` **sin envolver en `data`**.

El token (`data.token`) es un string ya liberado, se devuelve una sola vez y **no caduca**
(`backend/app/models/user.ts:8`, `DbAccessTokensProvider.forModel(User)` sin `expiresIn`).

---

#### Dependencias nuevas

`AGENTS.md:23` exige justificarlas en el PR. Lista cerrada, con su motivo:

- `tailwindcss` + `@tailwindcss/vite` — sistema de estilos, requisito del ticket.
- `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, `@radix-ui/react-slot`,
  `@radix-ui/react-label` — dependencias directas de los componentes shadcn/ui que se instalan.
- `react-router` (v7) — la vista protegida necesita URL propia y redirección real.
- `react-hook-form`, `zod`, `@hookform/resolvers` — el componente `<Form>` de shadcn/ui está
  construido sobre ellos; usarlos es lo que hace que los errores por campo del backend se puedan
  pintar en el campo correcto vía `setError`.

Nada más.

---

#### Fase 1 — Montar el terreno

1. **shadcn CLI.** Desde `frontend/`:
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button input label card alert form sonner
   ```
   El CLI escribe `components.json`, el setup de Tailwind, el alias `@/*` en `tsconfig.app.json` y
   `vite.config.ts`, y `src/lib/utils.ts` con `cn()`.

   > **Riesgo conocido:** el proyecto va en Vite 8.1 / TypeScript 6.0 / `@vitejs/plugin-react` 6,
   > por delante de lo que el CLI suele asumir. Si `init` falla o deja configs a medias: revertir
   > lo que haya tocado y montarlo a mano — `@tailwindcss/vite` en `vite.config.ts:6` (plugins),
   > `paths: { "@/*": ["./src/*"] }` + `baseUrl: "."` en `tsconfig.app.json`, `resolve.alias` con
   > `node:path` en `vite.config.ts` (`@types/node` ya está), y copiar los componentes desde
   > ui.shadcn.com. **Verificar el alias con un import `@/lib/utils` antes de seguir.**

2. **Limpiar la plantilla.** Borrar `frontend/src/App.css`. Vaciar `frontend/src/index.css` y
   dejar solo `@import "tailwindcss";` + los tokens `@theme` que ponga shadcn.
   Crítico: `src/index.css:53-63` fija `#root { width: 1126px; border-inline: ... }` — si sobrevive,
   cualquier layout a pantalla completa se renderiza dentro de una columna de 1126px con bordes.

3. **`tsconfig.app.json`: añadir `"strict": true`.** Hoy no está (verificado, líneas 2-24: no hay
   `strict` ni `extends`), así que `strictNullChecks` está apagado. Los componentes de shadcn y los
   tipos inferidos de zod se escriben asumiendo strict. Son 4 ficheros de plantilla que se van a
   borrar igualmente, así que el coste de activarlo es ahora o nunca.

   Dos restricciones del tsconfig a respetar al escribir código:
   `verbatimModuleSyntax: true` → los imports de tipos van como `import type { ... }`.
   `erasableSyntaxOnly: true` → prohibidos los `enum` y las propiedades de parámetro.

4. **`frontend/.env.example`** (y `.env` local) con `VITE_API_URL=http://localhost:3333`.
   Es la primera variable de entorno del frontend; el código usa
   `import.meta.env.VITE_API_URL ?? 'http://localhost:3333'`.

---

#### Fase 2 — Núcleo: cliente, errores y sesión

##### `src/lib/api.ts`

Envoltorio mínimo sobre `fetch`. Es la pieza que hace posible el criterio de los mensajes claros:
normaliza las **tres formas de error distintas** del backend en un único objeto.

```ts
export type ApiFieldError = { message: string; rule?: string; field?: string }

export class ApiError extends Error {
  status: number
  errors: ApiFieldError[]
}
```

- Inyecta `Content-Type: application/json` y, si hay token, `Authorization: Bearer <token>`.
- Si `!res.ok`, lee el body y lanza `ApiError` con `status` y `errors` (siempre array, vacío si el
  body no trae `errors`).
- Un fallo de red lanza `ApiError` con `status: 0` → "No se pudo conectar con el servidor".
- Desenvuelve `data` en las respuestas correctas; logout se trata aparte porque no viene envuelto.

Funciones expuestas: `signup()`, `login()`, `getProfile()`, `logout()`.

##### `src/lib/auth-errors.ts` — el corazón del criterio de aceptación

Traduce un `ApiError` en (a) errores por campo para `setError` de react-hook-form y (b) un mensaje
de formulario. Reglas, derivadas del contrato real:

| Caso | Qué llega | Qué se muestra |
|---|---|---|
| Login con credenciales malas | `400`, `errors[0].message = "Invalid user credentials"`, sin `field` | Alert en el formulario: **"Email o contraseña incorrectos."** |
| Email ya registrado | `422`, `field: "email"`, `rule: "database.unique"` | Error **bajo el campo email**: **"Ese email ya está registrado. ¿Quieres iniciar sesión?"** con enlace a `/login` |
| Otros errores de validación | `422` con `field` | `setError(field, message)` — cada mensaje en su campo |
| Token inválido/ausente | `401` | Limpiar sesión y redirigir a `/login` |
| Red caída | `status: 0` | "No se pudo conectar con el servidor. Inténtalo de nuevo." |

Los mensajes del backend vienen en inglés; para estos dos casos conocidos se mapean a un texto en
castellano (el resto del repo está en castellano). Para cualquier otro `field` error se usa el
`message` del backend tal cual, que ya es específico — nunca un texto genérico.

##### Sesión — tres ficheros, no uno

`src/auth/auth-context.ts` (el `createContext` + tipos), `src/auth/AuthProvider.tsx` (el componente)
y `src/auth/useAuth.ts` (el hook). Separados a propósito: `.oxlintrc.json:6` activa
`react/only-export-components`, y mezclar hook y componente en un fichero lo dispara.

El provider mantiene `{ user, token, status, login, signup, logout }`:

- Token en **`localStorage`** bajo una clave constante; se lee en el arranque.
- Si hay token al montar, `status: 'loading'` y se llama a `GET /account/profile` para rehidratar
  `user`. Si responde `401`, se borra el token y se pasa a `'anonymous'`. Esto es lo que hace que
  un token caducado o revocado (p. ej. tras logout en otra pestaña) no deje la app en un limbo.
- `login`/`signup` guardan token + user y devuelven; la redirección la hace la página.
- `logout` llama a `POST /account/logout` (best-effort, ignora el fallo) y limpia siempre el estado local.

---

#### Fase 3 — Rutas y pantallas

`src/main.tsx`: `<BrowserRouter>` → `<AuthProvider>` → `<App />`.
`src/App.tsx`: se reemplaza entero por la tabla de rutas.

```
/login      → LoginPage      (si ya hay sesión, redirige a /dashboard)
/signup     → SignupPage     (idem)
/dashboard  → <ProtectedRoute><DashboardPage /></ProtectedRoute>
/           → redirige según estado de sesión
*           → redirige a /
```

**`src/components/ProtectedRoute.tsx`** — mientras `status === 'loading'` pinta un spinner (sin esto
hay un parpadeo hacia `/login` en cada recarga); si `anonymous`, `<Navigate to="/login" replace />`
guardando la ruta de origen en `state` para volver tras el login.

**Esquemas zod** en `src/lib/schemas.ts`, **espejo del validador real**, no inventados:

```ts
export const loginSchema = z.object({
  email: z.string().email('Introduce un email válido').max(254),
  password: z.string().min(1, 'Introduce tu contraseña'),   // login no valida longitud
})

export const signupSchema = z.object({
  fullName: z.string().trim().optional(),                    // opcional en UI...
  email: z.string().email('Introduce un email válido').max(254),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(32, 'Máximo 32 caracteres'),
  passwordConfirmation: z.string(),
}).refine(v => v.password === v.passwordConfirmation, {
  message: 'Las contraseñas no coinciden',
  path: ['passwordConfirmation'],
})
```

> Al enviar signup: `fullName: values.fullName?.trim() || null`. **La clave se manda siempre**,
> aunque el campo esté vacío — si se omite, VineJS responde 422 `required`.

**`LoginPage` / `SignupPage`** — `<Card>` centrada, `<Form>` de shadcn con `zodResolver`,
`<FormField>` por campo, `<Button disabled={isSubmitting}>` y un `<Alert variant="destructive">`
arriba para el error de formulario. Enlace cruzado entre ambas. Tras éxito,
`navigate(from ?? '/dashboard', { replace: true })`.

**`DashboardPage`** — es la vista protegida que cierra el criterio: muestra los datos que devuelve
`GET /api/v1/account/profile` (`fullName`, `email`, `initials` en el avatar, `createdAt` formateado)
y un botón de logout. El perfil ya lo trae el provider al rehidratar; la página lo consume del
contexto en vez de repetir la llamada.

---

#### Ficheros

**Nuevos:** `src/lib/api.ts`, `src/lib/auth-errors.ts`, `src/lib/schemas.ts`,
`src/auth/{auth-context.ts,AuthProvider.tsx,useAuth.ts}`, `src/components/ProtectedRoute.tsx`,
`src/pages/{LoginPage,SignupPage,DashboardPage}.tsx`, `frontend/.env.example`,
más `components.json`, `src/lib/utils.ts` y `src/components/ui/*` que genera el CLI.

**Modificados:** `frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig.app.json`,
`frontend/src/main.tsx`, `frontend/src/App.tsx`, `frontend/src/index.css`.

**Borrado:** `frontend/src/App.css`.

---

#### Verificación

Backend en una terminal (`cd backend && npm run dev` → 3333), frontend en otra
(`cd frontend && npm run dev` → 5173). No hay seeders ni usuario de prueba en
`backend/database/`, así que el primer usuario se crea desde el propio registro.

1. `npm run build` en `frontend/` — `tsc -b` tiene que pasar con `strict` activado.
2. `npm run lint` (oxlint) sin errores.
3. **Registro correcto** → 200, aterriza en `/dashboard`, se ven nombre y email reales.
4. **Recargar `/dashboard`** → sigue dentro (token de localStorage + rehidratación del perfil).
5. **Registro con el mismo email** → mensaje bajo el campo email: "Ese email ya está registrado",
   no un error genérico. Verificable contra:
   ```bash
   curl -i -X POST localhost:3333/api/v1/auth/signup -H 'Content-Type: application/json' \
     -d '{"fullName":null,"email":"ada@example.com","password":"secret12","passwordConfirmation":"secret12"}'
   ```
   (segunda ejecución → 422 `database.unique`).
6. **Login con contraseña incorrecta** → alert "Email o contraseña incorrectos", y en la pestaña de
   red se confirma que la respuesta fue **400**, no 401.
7. **Contraseña de 7 caracteres en registro** → error de cliente antes de salir la petición.
8. **Borrar el token de localStorage y recargar `/dashboard`** → redirige a `/login`.
9. **Manipular el token a un valor inválido y recargar** → el 401 del perfil limpia la sesión y
   manda a `/login`, sin pantalla en blanco.
10. **Logout** → vuelve a `/login` y `/dashboard` ya no es accesible.
11. Parar el backend e intentar login → "No se pudo conectar con el servidor".

En el PR: justificar el bloque de dependencias nuevas, como pide `AGENTS.md:23`.```

**Output final:**  

Aquí el output: 

Done. Login and registro are implemented and verified end-to-end against the real backend.                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                    
  What shipped                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                    
  Core — src/lib/: api.ts (fetch wrapper that normalises the backend's three different error shapes into one ApiError), auth-errors.ts (maps those to user-facing messages), schemas.ts (zod, mirroring the backend validator), token-storage.ts.                                                                   
                                                                                                                                                                                                                                                                                                                    
  Session — src/auth/ split into context / provider / hook (oxlint's only-export-components complains if you merge them). Token in localStorage, rehydrated on boot against /account/profile; only a 401 clears it, so a network blip doesn't log you out.                                                          
                                                                                                                                                                                                                                                                                                                    
  Screens — LoginPage, SignupPage, DashboardPage, plus ProtectedRoute and AuthLayout. Routes: /login, /signup, /dashboard, with / and * redirecting by session state.                                                                                                                                               
                                                                                                                                                                                                                                                                                                                    
  The field question you flagged      
I checked backend/app/validators/user.ts rather than assuming. Signup needs four fields: fullName (nullable, not optional — the key must always be sent, so an empty input sends null), email, password (8–32), and passwordConfirmation (camelCase, sameAs). Login takes only email + password, with no length   
  rules.                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                    
  Error messages — verified in the browser                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                    
  ┌────────────────────────────────┬─────────────────────┬───────────────────────────────────────────────────────────────────────┐                                                                                                                                                                                  
  │              Case              │       Backend       │                                 Shown                                 │                                                                                                                                                                                  
  ├────────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────────────┤                                                                                                                                                                                  
  │ Wrong password / unknown email │ 400 (not 401)       │ "Email o contraseña incorrectos."                                     │                                                                                                                                                                                  
  ├────────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────────────┤                                                                                                                                                                                  
  │ Email ya registrado            │ 422 database.unique │ "Ese email ya está registrado." under the email field + link to login │                                                                                                                                                                                  
  ├────────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────────────┤                                                                                                                                                                                  
  │ Password de 7 caracteres       │ —                   │ Blocked client-side, no request fired                                 │                                                                                                                                                                                  
  ├────────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────────────┤                                                                                                                                                                                  
  │ Token manipulado               │ 401                 │ Session cleared → /login, no blank screen                             │                                                                                                                                                                                  
  ├────────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────────────┤                                                                                                                                                                                  
  │ Backend caído                  │ —                   │ "No se pudo conectar con el servidor."                                │                                                                                                                                                                                  
  └────────────────────────────────┴─────────────────────┴───────────────────────────────────────────────────────────────────────┘                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                     
  Full flow verified in Chrome: signup → dashboard, login → dashboard, reload keeps session, logout returns to /login and /dashboard becomes unreachable. Console clean. npm run lint and npm run build both pass (the one warning is inside shadcn's own generated button.tsx).                                    
                                                                                                                                                                                                                                                                                                                    
  I also fixed a bug I found while testing: the "Inicia sesión" link lingered after the duplicate-email error cleared.                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                    
  Three things you should know                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                    
  Your prompt assumed shadcn/ui existed — it didn't. The frontend was a bare Vite starter: no Tailwind, no shadcn, no router. I set all of it up. The CLI also needed Tailwind and the @/ alias to exist before init would run.                                                                                     
                                                                                                                                                                                                                                                                                                                    
  Current shadcn is v4 / Base UI, not Radix. Two consequences that differ from the approved plan: @shadcn/form is now an empty deprecated stub, so there is no <Form>/<FormField> — I used @shadcn/field (presentational, library-agnostic) wired to react-hook-form directly. And the dependencies are             
  @base-ui/react + a cn package, not @radix-ui/* + clsx/tailwind-merge. shadcn, cn and @fontsource-variable/geist are genuine build deps here — src/index.css imports from them.                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    
  I enabled strict: true in tsconfig.app.json (it was off) and had to drop baseUrl — TypeScript 6 errors on it as deprecated; paths alone works under moduleResolution: bundler. I also added .env to .gitignore, which the Vite template didn't cover, so only .env.example is tracked.                            
                                                                                                                                                                                                                                                                                                                    
  Backend untouched. For the PR, AGENTS.md:23 wants the new dependencies justified — the list is Tailwind + the shadcn runtime, react-router for the protected route, and react-hook-form/zod/@hookform/resolvers per your choice. Both dev servers are stopped; two test users (ada+1789543075@example.com,        
  grace.hopper.9142@example.com, password secret12) are left in the local SQLite DB if you want to poke at it.                                                                                                                                                                                                              


## Prompt 2 - Sin harness

\plan

**Modelo:** Opus 5 1M xHigh
**Herramienta:** Claude Code

Trabajas en el frontend de FlowSync: React 19 + Tailwind + shadcn/ui.
Implementa el login y el registro consumiendo el backend de auth ya existente.
Sabes que terminaste cuando:
    - El registro llama a POST /api/v1/auth/signup y el login a POST /api/v1/auth/login.
    - Tras login exitoso, redirige a una vista protegida que consuma GET /api/v1/account/profile.
    - Credenciales inválidas o email ya registrado muestran un mensaje claro, no un error genérico."
No toques el backend — el auth ya existe. No instales una librería de formularios sin justificarlo.
Usa los componentes de shadcn/ui.
Si el ticket no especifica un campo del formulario, revisa el validador real del backend antes de asumir.
Si tienes alguna duda, pregunta antes de implementar

**Qué salió:** 

Lanzó 2 subagentes para explorar backend auth contract, and frontend scaffolding

Three decisions before I write the plan:
1) shadcn's <Form> component is built on react-hook-form + zod + @hookform/resolvers. The ticket says not to install a form library without justification. Which way? react-hook-form + zod
2) The backend issues opaque Bearer access tokens (no cookies). Where should the frontend keep the token? => localStorage.
3) Reaching a protected view needs routing. The scaffold has no router at all — currently App.tsx is the Vite demo page. =>react-router v7
4) What should the protected view show, and what happens to the existing Vite demo landing page? => Profile card, remove demo

Here is Claude's plan:

Login + Registro en el frontend de FlowSync                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                         
   Contexto                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                         
   El backend de auth (AdonisJS 7) ya está terminado y no se toca. El frontend, en cambio,                                                                                                                                                                                                               
   es un scaffold de npm create vite intacto: 5 archivos en src/, sin router, sin                                                                                                                                                                                                                        
   Tailwind, sin shadcn/ui, sin cliente HTTP, sin tests y sin alias @/*. No hay una sola                                                                                                                                                                                                                 
   línea que llame a la API.                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                         
   El objetivo es cerrar el circuito de autenticación de punta a punta: registro, login,                                                                                                                                                                                                                 
   y una vista protegida que consuma el perfil. El criterio que más trabajo da no es                                                                                                                                                                                                                     
   llamar a los endpoints — es el tercero: credenciales inválidas y email duplicado                                                                                                                                                                                                                      
   tienen que dar un mensaje claro, y el backend devuelve esos dos casos con formas y                                                                                                                                                                                                                    
   códigos de estado distintos, así que hace falta una capa de mapeo de errores de verdad.                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                         
   Contrato real del backend (verificado en el código, no asumido)           

   Base: http://localhost:3333. CORS en dev es origin: true, CSRF desactivado → no hace                                                                                                                                                                                                                  
   falta proxy de Vite ni token XSRF.                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                         
   POST /api/v1/auth/signup                                                                                                                                                                                                                                                                              
     { fullName: string|null, email: string, password: string, passwordConfirmation: string }                                                                                                                                                                                                            
     200 → { data: { user: {...}, token: "oat_…" } }                                                                                                                                                                                                                                                     
     422 → { errors: [ { message, rule, field, meta? } ] }                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                         
   POST /api/v1/auth/login                                                                                                                                                                                                                                                                               
     { email, password }                                                                                                                                                                                                                                                                                 
     200 → { data: { user: {...}, token: "oat_…" } }                                                                                                                                                                                                                                                     
     400 → { errors: [ { message: "Invalid user credentials" } ] }    ← sin rule ni field                                                                                                                                                                                                                
     422 → { errors: [ { message, rule, field } ] }                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                         
   GET  /api/v1/account/profile     Authorization: Bearer oat_…                                                                                                                                                                                                                                          
     200 → { data: { id, fullName, email, createdAt, updatedAt, initials } }   ← sin "user" anidado                                                                                                                                                                                                      
     401 → { errors: [ { message: "Unauthorized access" } ] }                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                         
   POST /api/v1/account/logout      Authorization: Bearer oat_…                                                                                                                                                                                                                                          
     200 → { message: "Logged out successfully" }                      ← sin envoltorio "data"                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                         
   Trampas confirmadas en backend/app/validators/user.ts y en los controladores, que el                                                                                                                                                                                                                  
   ticket no menciona y hay que respetar:                                                  
 
  
   ┌──────────────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────┐                                                                                                                                           
   │                             Detalle                              │                                     Consecuencia                                     │                                                                                                                                           
   ├──────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤                                                                                                                                           
   │ El validador pide passwordConfirmation (camelCase, regla sameAs) │ No es confirmed ni password_confirmation. El ticket no lo pedía: sale del validador. │                                                                                                                                           
   ├──────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤                                                                                                                                           
   │ fullName: vine.string().nullable()                               │ La clave debe ir en el body; el valor puede ser null. Omitirla da error required.    │                                                                                                                                           
   ├──────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤                                                                                                                                           
   │ password: minLength(8).maxLength(32)                             │ El máximo de 32 es fácil de saltarse en el zod del cliente.                          │                                                                                                                                           
   ├──────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤                                                                                                                                           
   │ Email duplicado → rule: "database.unique"                        │ No es "unique". Este es el discriminante del criterio 3.                             │                                                                                                                                           
   ├──────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤                                                                                                                                           
   │ Login inválido → 400, no 401 ni 422                              │ Y el body solo trae message, sin field.                                              │                                                                                                                                           
   ├──────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤                                                                                                                                           
   │ signup responde 200, no 201                                      │ No condicionar el éxito a status === 201.                                            │                                                                                                                                           
   ├──────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤                                                                                                                                           
   │ token es un string pelado                                        │ No es { type, value }. Los tokens no caducan (no hay expiresIn).                     │                                                                                                                                           
   ├──────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤                                                                                                                                           
   │ Sin .trim() en el backend                                        │ Normalizamos en cliente.                                                             │                                                                                                                                           
   └──────────────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────┘                                                                                                                                           
                                                                                                                                                                                                                                                                                                         
   Decisiones ya cerradas con el usuario: react-hook-form + zod, token en                                                                                                                                                                                                                                
   localStorage, react-router v7, y la vista protegida es una tarjeta de perfil                                                                                                                                                                                                                          
   que sustituye a la demo de Vite.                                          

   ▎ Justificación de la librería de formularios (el ticket la exige): el componente                                                                                                                                                                                                                     
   ▎ Form de shadcn/ui es un wrapper de react-hook-form — usar shadcn como pide el                                                                                                                                                                                                                       
   ▎ ticket y no instalar RHF son incompatibles. Añade además setError(field, …), que es                                                                                                                                                                                                                 
   ▎ exactamente el mecanismo para inyectar los errors[].field del 422 en el input                                                                                                                                                                                                                       
   ▎ correcto en vez de soltar un alert genérico.                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                         
   Dependencias a añadir                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                         
   # routing                                                                                                                                                                                                                                                                                             
   react-router                                                                                                                                                                                                                                                                                          
   # estilos (Tailwind v4 vía plugin de Vite; no hay postcss.config que extender)                                                                                                                                                                                                                        
   tailwindcss @tailwindcss/vite                                                                                                                                                                                                                                                                         
   # formularios + validación                                                                                                                                                                                                                                                                            
   react-hook-form zod @hookform/resolvers                                                                                                                                                                                                                                                               
   # shadcn/ui las instala su CLI: class-variance-authority clsx tailwind-merge                                                                                                                                                                                                                          
   #   lucide-react @radix-ui/react-label @radix-ui/react-slot                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                         
   Pasos                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                         
   1. Infraestructura (alias, Tailwind, shadcn)               
   - frontend/tsconfig.app.json: añadir "baseUrl": "." y "paths": { "@/*": ["./src/*"] }.                                                                                                                                                                                                                
   - frontend/vite.config.ts: añadir el plugin @tailwindcss/vite y                                                                                                                                                                                                                                       
     resolve.alias con @ → /src. Ambos son requisito previo de shadcn init.                                                                                                                                                                                                                              
   - frontend/src/index.css: sustituir el CSS de la plantilla por @import "tailwindcss";                                                                                                                                                                                                                 
     más los tokens de tema de shadcn. El archivo actual define :root { font, color, background }                                                                                                                                                                                                        
     y reglas de h1/h2/p/button que chocan con Tailwind — no vale con añadir encima.                                                                                                                                                                                                                     
   - npx shadcn@latest init, y luego                                                                                                                                                                                                                                                                     
     npx shadcn@latest add button input label card form alert.                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                         
   ▎ Riesgo real: el stack es muy nuevo (Vite 8 / TS 6 / oxlint) y la CLI de shadcn podría                                                                                                                                                                                                               
   ▎ no detectar bien el proyecto. Si init falla, los componentes de shadcn son archivos                                                                                                                                                                                                                 
   ▎ copiables: se crean a mano en src/components/ui/ con sus deps de Radix. No es un                                                                                                                                                                                                                    
   ▎ bloqueo, pero es el paso con más probabilidad de fricción.                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                         
   - frontend/.env.example con VITE_API_URL=http://localhost:3333 (y .env igual).                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                         
   2. Capa de API — src/lib/                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                         
   api-client.ts — un único request() que concentra el acceso HTTP:                                                                                                                                                                                                                                      
   - prefija import.meta.env.VITE_API_URL,                                                                                                                                                                                                                                                               
   - pone Content-Type: application/json y Authorization: Bearer <token> si hay token,                                                                                                                                                                                                                   
   - si !res.ok, lanza ApiError { status, errors: ApiFieldError[] } leyendo errors[];                                                                                                                                                                                                                    
   - si el fetch revienta (backend caído), lanza ApiError con status: 0.                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                         
   api-errors.ts — el corazón del criterio 3. Una función que traduce un ApiError                                                                                                                                                                                                                        
   a { formMessage?: string, fieldErrors: Record<string, string> }:      


   ┌─────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────┐                                                                                                                                                                     
   │                           Entrada                           │                             Salida                              │                                                                                                                                                                     
   ├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤                                                                                                                                                                     
   │ status 400 en login                                         │ formMessage: "Email o contraseña incorrectos."                  │                                                                                                                                                                     
   ├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤                                                                                                                                                                     
   │ status 422 + rule === 'database.unique' + field === 'email' │ fieldErrors.email = "Ese email ya está registrado."             │                                                                                                                                                                     
   ├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤                                                                                                                                                                     
   │ status 422, resto de reglas                                 │ mapa rule → mensaje claro en español, colgado de errors[].field │                                                                                                                                                                     
   ├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤                                                                                                                                                                     
   │ status 422 con field desconocido                            │ cae a formMessage (no se pierde el mensaje)                     │                                                                                                                                                                     
   ├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤                                                                                                                                                                     
   │ status 0                                                    │ formMessage: "No se pudo conectar con el servidor."             │                                                                                                                                                                     
   ├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤                                                                                                                                                                     
   │ cualquier otro                                              │ formMessage con el message del backend, o un fallback           │                                                                                                                                                                     
   └─────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────┘                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                         
   Los field del backend (fullName, email, password, passwordConfirmation) coinciden                                                                                                                                                                                                                     
   exactamente con los nombres de campo de RHF, así que form.setError(field, …) funciona                                                                                                                                                                                                                 
   directo — pero hay que validar que el campo existe antes de llamarlo.                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                         
   3. Auth — src/features/auth/                                                                    

Archivos separados a propósito: .oxlintrc.json activa react/only-export-components,                                                                                                                                                                                                                   
   que avisa si un archivo exporta un componente y un hook a la vez.                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                         
   - auth-api.ts — signup(), login(), getProfile(), logout() + tipos                                                                                                                                                                                                                                     
     User, AuthPayload. Único sitio que conoce las rutas y el desempaquetado:                                                                                                                                                                                                                            
     login/signup leen data.user + data.token; profile lee data a secas.                                                                                                                                                                                                                                 
   - schemas.ts — esquemas zod que espejan el validador real:                                                                                                                                                                                                                                            
     email().max(254), password min(8).max(32), passwordConfirmation con                                                                                                                                                                                                                                 
     .refine() de igualdad, y fullName opcional en UI que se envía como                                                                                                                                                                                                                                  
     value.trim() || null.                                                                                                                                                                                                                                                                               
   - auth-context.ts — createContext + tipos, sin componentes.                                                                                                                                                                                                                                           
   - auth-provider.tsx — estado { user, token, status } con                                                                                                                                                                                                                                              
     status: 'loading' | 'authenticated' | 'anonymous'. Al arrancar, si hay token en                                                                                                                                                                                                                     
     localStorage llama a getProfile(); un 401 limpia el token y pasa a anonymous.                                                                                                                                                                                                                       
     Expone login, signup, logout, refreshProfile.                                                                                                                                                                                                                                                       
   - use-auth.ts — el hook, en su propio archivo.                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                         
   Clave flowsync.token en localStorage, con try/catch en lectura y escritura.                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                         
   4. Rutas y páginas                       

- src/routes/protected-route.tsx: si status === 'loading' muestra un esqueleto; si                                                                                                                                                                                                                    
     anonymous, <Navigate to="/login" replace state={{ from: location }} />.                                                                                                                                                                                                                             
   - src/pages/login-page.tsx y signup-page.tsx: Card + Form de shadcn, botón con                                                                                                                                                                                                                        
     estado isSubmitting deshabilitado, y un <Alert variant="destructive"> para el                                                                                                                                                                                                                       
     error de formulario. Tras signup exitoso se guarda el token que ya devuelve el                                                                                                                                                                                                                      
     endpoint y se entra directo al dashboard (sin segundo login).                                                                                                                                                                                                                                       
   - src/pages/dashboard-page.tsx: tarjeta con iniciales, fullName, email, "miembro                                                                                                                                                                                                                      
     desde" (createdAt) y botón de logout. Renderiza lo que vino de                                                                                                                                                                                                                                      
     GET /account/profile y ofrece reintento vía refreshProfile().                                                                                                                                                                                                                                       
   - src/App.tsx: pasa a ser la tabla de rutas (/login, /signup, /dashboard,                                                                                                                                                                                                                             
     / → redirección según status, y un * a /login).                                                                                                                                                                                                                                                     
   - src/main.tsx: envolver en <BrowserRouter> y <AuthProvider>.                                                                                                                                                                                                                                         
   - Borrar src/App.css, src/assets/{hero.png,react.svg,vite.svg} y public/icons.svg.                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                         
   Archivos críticos                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                         
   Modificados: frontend/vite.config.ts, frontend/tsconfig.app.json,                                                                                                                                                                                                                                     
   frontend/src/index.css, frontend/src/main.tsx, frontend/src/App.tsx,                                                                                                                                                                                                                                  
   frontend/package.json.                                                                                                                                                                                                                                                                                
   Nuevos: frontend/components.json, frontend/.env.example, src/lib/{utils,api-client,api-errors}.ts,                                                                                                                                                                                                    
   src/features/auth/*, src/routes/protected-route.tsx, src/pages/*, src/components/ui/*.                                                                                                                                                                                                                
   Sin tocar: todo backend/.                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                         
   Verificación                                 

1. Fijar el contrato de errores con curl antes de escribir el mapeo (el backend no                                                                                                                                                                                                                    
   tiene tests que lo documenten, así que esto no es opcional):                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                         
   cd backend && npm run dev     # migraciones ya corridas, tmp/db.sqlite3 existe                                                                                                                                                                                                                        
   API=http://localhost:3333/api/v1                                                                                                                                                                                                                                                                      
   curl -s -o /dev/null -w '%{http_code}\n' -X POST $API/auth/login \                                                                                                                                                                                                                                    
     -H 'Content-Type: application/json' -d '{"email":"nope@x.com","password":"whatever"}'   # → 400                                                                                                                                                                                                     
   curl -s -X POST $API/auth/signup -H 'Content-Type: application/json' \                                                                                                                                                                                                                                
     -d '{"fullName":"Ada L","email":"ada@example.com","password":"supersecret","passwordConfirmation":"supersecret"}'                                                                                                                                                                                   
   # repetir el mismo signup → 422 con rule "database.unique"                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                         
   2. Flujo en navegador (cd frontend && npm run dev, backend en otra terminal):                                                                                                                                                                                                                         
   - registro con email nuevo → entra al dashboard y se ve el perfil;                                                                                                                                                                                                                                    
   - registro repitiendo el email → "Ese email ya está registrado." bajo el input de email;                                                                                                                                                                                                              
   - login con contraseña mala → "Email o contraseña incorrectos." en el alert;                                                                                                                                                                                                                          
   - login correcto → /dashboard con los datos de GET /account/profile;                                                                                                                                                                                                                                  
   - F5 en /dashboard → sigue dentro (token en localStorage);                                                                                                                                                                                                                                            
   - localStorage.clear() + F5 → rebota a /login;                                                                                                                                                                                                                                                        
   - backend parado → "No se pudo conectar con el servidor.", no una pantalla en blanco.                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                         
   3. Puertas del proyecto:                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                         
   cd frontend && npm run build   # tsc -b: noUnusedLocals y verbatimModuleSyntax son estrictos                                                                                                                                                                                                          
   npm run lint                   # oxlint                        

   verbatimModuleSyntax: true obliga a import type { … } en todos los imports de tipos;                                                                                                                                                                                                                  
   noUnusedLocals/noUnusedParameters tumban el build por una variable suelta.                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                         
   Fuera de alcance                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                         
   Tests del frontend (no hay vitest ni testing-library: sería montar el andamiaje entero),                                                                                                                                                                                                              
   refresh tokens (los del backend no caducan), recuperación de contraseña, y cualquier                                                                                                                                                                                                                  
   cambio en backend/.        

Aquí el output: 

● Listo. Los tres criterios del ticket están implementados y verificados contra el backend real.                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                           
  Criterios de cierre                                                                                                                                                                                                                                                                                      
  - Registro → POST /api/v1/auth/signup, login → POST /api/v1/auth/login (src/features/auth/auth-api.ts).                                                                                                                                                                                                  
  - Tras login, /dashboard está detrás de ProtectedRoute y pinta lo que devuelve GET /api/v1/account/profile. Verificado con recarga completa: el perfil solo puede venir de esa llamada.                                                                                                                  
  - Email duplicado → "Ese email ya está registrado…" bajo el campo email; credenciales inválidas → "Email o contraseña incorrectos." Ninguno es genérico.                                                                                                                                                 
                                                                                                                                                                                                                                                                                                           
  Lo que salió del validador, no del ticket. El registro tiene cuatro campos, no dos: passwordConfirmation (camelCase, regla sameAs) y fullName, que es nullable() pero no optional() — comprobé con curl que omitir la clave da required, así que se envía siempre, como null si está vacío. La contraseña
  tiene tope de 32, no solo mínimo de 8.                                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                                                                           
  Dónde estaba la dificultad real. Los dos casos de error que el ticket junta en una frase el backend los devuelve distinto: credenciales inválidas es 400 con solo message, y email duplicado es 422 con rule: "database.unique" (no "unique"). Por eso src/lib/api-errors.ts es una pieza propia:        
  discrimina por status y por regla, y cuelga cada mensaje del input correcto vía form.setError(). Un field que no exista en el formulario se promociona a error general en vez de perderse.                                                                                                               
                                                                                                                                                                                                                                                                                                           
  Dos desvíos del plan que conviene que sepas:                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                           
  1. La CLI de shadcn se despistó. Creó un directorio literal @/ en la raíz en vez de resolver el alias, importó cn desde "cn" (e instaló ese paquete de npm, que no tiene nada que ver) y no instaló class-variance-authority. Lo corregí: moví los componentes a src/components/ui/, arreglé los imports,
     desinstalé cn y puse las dependencias reales. Era el riesgo que marqué en el plan, y se materializó.                                                                                                                                                                                                  
  2. TypeScript 6 deprecó baseUrl y rompía el build. Los paths ahora se resuelven relativos al tsconfig, sin baseUrl.                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                           
  También: npm instaló react-router v8, no v7 — misma API declarativa, sin cambios en el código.                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                           
  Puertas de calidad: npm run build y npm run lint pasan. Los 2 warnings de oxlint están dentro de los archivos generados por shadcn (buttonVariants, useFormField), no en código mío.                                                                                                                     
                                                                                                                                                                                                                                                                                                           
  Dos apuntes: backend/ está intacto (0 archivos tocados), y dejé usuarios de prueba en backend/tmp/db.sqlite3 (entre ellos raul.demo@flowsync.test / supersecret) — la BD está en .gitignore. No he commiteado nada.

