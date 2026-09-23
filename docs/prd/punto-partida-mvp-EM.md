# FlowSync — el terreno que ya existe

**Fecha:** 2026-09-23 · **Rama base:** `s2/start`

Punto de partida antes de especificar nada: qué capabilities hay construidas y cómo es el
modelo de datos actual.

## Lo que hay construido

**Todo lo que existe es autenticación. De "gestión de tareas en equipo" no hay absolutamente nada.**

**Backend** (AdonisJS 7 + Lucid + SQLite, `:3333`) — 4 endpoints bajo `/api/v1`:

| Método | Ruta | Auth |
|---|---|---|
| POST | `/auth/signup` | no |
| POST | `/auth/login` | no |
| GET | `/account/profile` | sí |
| POST | `/account/logout` | sí |

Auth por access tokens opacos (`Authorization: Bearer`), validación con VineJS, y toda respuesta
envuelta en `{ data: ... }` vía transformer + `serialize()`. Password hasheada con scrypt.
**Cero tests** (`tests/` solo tiene `bootstrap.ts`).

**Frontend** (React 19 + Vite, `:5173`) — 3 pantallas: login, registro y perfil. Guards de ruta
(`protected` / `public-only`), token en `localStorage` rehidratado contra `/account/profile` al
arrancar, errores del backend traducidos a castellano por campo. UI con shadcn/ui + Tailwind v4.
Sin runner de tests.

En la práctica: **puedes registrarte, entrar, ver tu nombre/email/fecha de alta y salir.** Nada más.

## Modelo de datos actual

Dos tablas, ambas de infraestructura de auth. Ninguna entidad de dominio.

**`users`**

| Columna | Tipo | Notas |
|---|---|---|
| `id` | increments | PK |
| `full_name` | string | nullable |
| `email` | string(254) | not null, **unique** |
| `password` | string | not null, hash scrypt, nunca se serializa |
| `created_at` / `updated_at` | timestamp | `updated_at` nullable |

**`auth_access_tokens`**

| Columna | Tipo | Notas |
|---|---|---|
| `id` | increments | PK |
| `tokenable_id` | integer | **FK → `users.id`**, `ON DELETE CASCADE` |
| `type`, `name`, `hash`, `abilities` | string/text | `name` nullable |
| `created_at`, `updated_at`, `last_used_at`, `expires_at` | timestamp | los dos últimos nullable |

Una sola relación en todo el esquema (`users` 1—N `auth_access_tokens`), y es puramente técnica.
El modelo `User` no declara ninguna relación de negocio: solo el provider de tokens y un getter
`initials` calculado.

**No existe:** tarea, equipo, workspace, proyecto, estado, asignación, comentario, actividad,
notificación, ni ninguna tabla pivote. El dominio entero está por definir — que es justo el terreno
en blanco sobre el que hay que recortar el alcance.
