# FlowSync — estado actual del proyecto

## Capacidades implementadas

El proyecto solo tiene construido el **onboarding y la sesión de usuario**. No hay ninguna funcionalidad de tareas, equipos ni tiempo real todavía — la promesa de producto ("que los equipos remotos sepan en qué está trabajando cada uno") no tiene ni una sola pieza de dominio construida.

1. **Registro (`POST /api/v1/auth/signup`)** — crea un usuario con nombre opcional, email y contraseña, valida email único y confirmación de contraseña, y devuelve el usuario más un access token ya emitido (login automático tras registrarse).
2. **Login (`POST /api/v1/auth/login`)** — verifica email + contraseña contra el hash guardado y devuelve el usuario más un nuevo access token opaco.
3. **Perfil (`GET /api/v1/account/profile`)** — devuelve los datos del usuario autenticado (requiere token). Es también el endpoint que el frontend usa para rehidratar la sesión al recargar la página.
4. **Logout (`POST /api/v1/account/logout`)** — revoca el access token actual del usuario autenticado.

En el frontend esto se traduce en tres pantallas (`login`, `register`, `profile`) más los guards de ruta (`ProtectedRoute` / `PublicOnlyRoute`) y un `AuthProvider` que guarda el token en `localStorage` y lo valida contra `/account/profile` al arrancar. No hay ninguna otra pantalla ni navegación más allá de esas tres.

## Modelo de datos

Solo existen dos tablas, ambas del subsistema de autenticación de AdonisJS — no hay ninguna entidad de dominio (tarea, equipo, proyecto, estado, etc.):

**`users`**
| Columna | Tipo | Notas |
|---|---|---|
| `id` | integer | PK autoincremental |
| `full_name` | string | nullable |
| `email` | string(254) | único, obligatorio |
| `password` | string | hash, obligatorio |
| `created_at` / `updated_at` | timestamp | |

**`auth_access_tokens`**
| Columna | Tipo | Notas |
|---|---|---|
| `id` | integer | PK |
| `tokenable_id` | integer | FK → `users.id`, `ON DELETE CASCADE` |
| `type`, `name`, `hash`, `abilities` | string/text | metadatos del token opaco |
| `created_at` / `updated_at` / `last_used_at` / `expires_at` | timestamp | |

No hay relaciones 1:N ni N:N definidas más allá de `user → tokens`. Cualquier concepto de "tarea", "equipo" o "estado de trabajo" está completamente por diseñar.
