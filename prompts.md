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

## Prompt 1

**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

Crea un subagente especializado en analizar una tarea. Busca posibles ambigüedades, indefiniciones, o anticipa posibles problemas o dudas que aparecerán durante el plan o implementación de la tarea.
No realiza cambios, solo mejora la solicitud, y una vez es válida la propone como prompt para iniciar el plan o implementación.

**Tiempo Ejecución:** 2 minutos

**Qué salió:** Generó  .claude/agents/analista-tarea.md Parece válido, aunque repite contexto ya especificado en agents.md

## Prompt 2

**Modelo:** Opus 5 (1M) High
**Herramienta:** Claude Code

subagent_type: "analista-tarea" Crear una página para el registro de nuevos usuarios y inicio de sesion, y otra página protegida a la que solo puedan acceder los usuarios autorizados, que mostrará información del usuario activo. 
En la página inicial se añadirá un enlace a la página protegida y a la página de registro. Una vez registrado, el usuario será redirigido a una pagina protegida (solo accesible para usuarios registrados).
El backend ya existe, tiene un endpoint de autenticación para el registro de nuevos usuarios y no se permite modificar nada del Backend.
Las reglas de validación de nuevos usuarios deben coincidir con las comprobaciones del Backend, y no pueden añadirse reglas adicionales.
En caso de error en el registro se mostrará un mensaje claro, sin detalle técnico de lo que ha fallado.
Se considerará la tarea como completada cuando:
- una petición valida de registro de usuario deje a este validado y se haya redirigido a la página protegida.
	- Una petición invalida de registro de usuario muestre un mensaje de error claro, sin información técnica. Si es un problema de campos incorrectos (campo obligatorio no informado, longitud máxima o mínima de un campo) se indicará el campo que falla y el motivo del error.
	- Un acceso de un usuario no autenticado a la página protegida devuelva un mensaje de error, o sea redirigido a una página de no autorizado.

**Tiempo Ejecución:** 5 minutos

**Qué salió:** 
Puntos abiertos
El agente propone supuestos por defecto para todos (signup y login en páginas separadas, token en localStorage, redirigir a /login en vez de página "no autorizado" dedicada, mostrar solo campos de UserTransformer, VITE_API_URL por env). El único que cambia el alcance de verdad:

AskUserQuestion:
¿Como se verifica que la tareas está copletada? Manual, Tests en frontend (requiere instalar vitest), Tests front + Back (rompe regla de no tocar bckend). Elijo opción manual, para no complicar con los tests.

AskUserQuestion:
Acceso a no autenticado a la página protegida. ¿Redirigir a login, o mantener página dedicada de no autorizado?. Elijo otros: redirigir a login, pero con un mensaje que indique que no estas autorizado, debes inicar sesion.


Implementar en frontend/ (React 19 + Vite). No modificar nada de backend/.

Rutas

/ — home con enlaces a /signup y a /app
/signup — fullName, email, password, passwordConfirmation → POST /api/v1/auth/signup. Éxito: guardar token en localStorage y redirigir a /app
/login — email + password → POST /api/v1/auth/login. Mismo comportamiento en éxito
/app (protegida) — GET /api/v1/account/profile con Authorization: Bearer <token>. Muestra fullName, initials, email, createdAt, updatedAt. Botón de logout (POST /api/v1/account/logout)
Guard de ruta: sin token en localStorage, o 401 del backend → redirigir a /login mostrando "No estás autorizado. Debes iniciar sesión."

Validación cliente — réplica exacta de user.ts, ni una regla más:

email: formato + máx 254
password: 8–32
passwordConfirmation: 8–32 + igual a password
fullName: opcional, sin límites de longitud
Errores

422 → mapear cada field a mensaje claro en español por campo (obligatorio / longitud / formato / email ya registrado). Nunca mostrar rule ni el message crudo de VineJS
unique de email: no validable en cliente, se trata como error de campo del 422
Login fallido (E_INVALID_CREDENTIALS): mensaje genérico, no error de campo
Red / 5xx: mensaje genérico
Config: VITE_API_URL apuntando a http://localhost:3333 (CORS abierto en dev, no hace falta proxy).

Dependencias: React Router es nueva → justificar en el PR.

Verificación: manual en navegador de los 3 criterios de aceptación. No se añade tooling de testing.


## Prompt 3

**Modelo:** Opus 5 (1M) High
**Herramienta:** Claude Code

Resultado prompt anterior era ¿Entro en modo plan con esto?
Confirmo entrar en modo plan. 

**Tiempo Ejecución:** 10 minutos

**Qué salió:** 
Investigación completa. Hallazgos que cambian el diseño respecto al análisis inicial:

Todas las respuestas van envueltas en { data: ... } (api_provider.ts:18, wrap: 'data') — excepto logout, que devuelve { message } plano
Signup devuelve 200, no 201
Credenciales inválidas → 400 { errors: [{ message }] }; no autenticado → 401 { errors: [{ message: "Unauthorized access" }] }
Errores 422 traen meta: { min: 8 } → se puede construir el mensaje de longitud sin hardcodear números
force_json_response_middleware fuerza JSON siempre; no hace falta negociar Accept
⚠️ En dev, un 500 devuelve JSON de Youch con stack traces → razón de peso para no volcar nunca el body del error en la UI
⚠️ fullName es nullable(), no optional(): la clave debe ir siempre en el payload (con null si está vacía), u omitirla da error de "required"

Dos decisiones de arquitectura antes de escribir el plan:

- Agents pide justificar nuevas dependencias. ¿Como resolver el routing? > react-router-dom (recomendado). Router mínimo propio. 
Selecciono opcion recomendada (novato en el stack)

- Validación en el cliente antes de enviar, o solo la del backend. Opciones espejo + bakendmanda. Solo backend. Otras.
Selecciono solo backend.


## Prompt 4

**Modelo:** Opus 5 (1M) High
**Herramienta:** Claude Code

Continua plan...

**Tiempo Ejecución:** 20 minutos
**Qué salió:** 
Plan, con notas para el PR:

Notas para el PR
react-router-dom es la única dependencia nueva; AGENTS.md exige justificarla. Motivo: rutas declarativas, <Navigate> y guard limpio; la alternativa era un router casero sobre history.pushState.
Token en localStorage: única opción razonable contra una API de Bearer tokens sin flujo de cookies. Es legible por cualquier script inyectado; la alternativa (cookie httpOnly) exigiría tocar el backend, que está fuera de alcance. Reconocerlo explícitamente.
CORS solo abierto en dev (cors.ts:21 origin: app.inDev ? true : []). Arrancar el backend con NODE_ENV=production hace fallar todas las peticiones. Mencionarlo en troubleshooting.

## Prompt 5

**Modelo:** Opus 5 (1M) High
**Herramienta:** Claude Code

Accept this plan > Yes and auto-accept

solicita permisos instalar router react, build, execute...

**Tiempo Ejecución:** 20 minutos
**Qué salió:**  

Hecho > Resultado corrcto
14 ficheros nuevos en frontend/, cero cambios en backend/.

API — types.ts, errors.ts, client.ts, auth.ts
Sesión — storage.ts, auth-context.ts, AuthProvider.tsx, RequireAuth.tsx
UI — Alert.tsx, FormField.tsx, ErrorSummary.tsx
Páginas — HomePage, SignupPage, LoginPage, ProfilePage

Verificado
Una corrección al plan
Lo que no he podido verificar

## Prompt 6

**Modelo:** Opus 5 (1M) High
**Herramienta:** Claude Code

/context

**Tiempo Ejecución:** 
**Qué salió:**  16% (161.7k)


## Prompt 7

**Modelo:** Opus 5 (1M) High
**Herramienta:** Claude Code

/commit-message  

**Tiempo Ejecución:** 2 minutos
**Qué salió:**  

feat(frontend): añade registro, inicio de sesión y perfil protegido

Implementa el flujo de autenticación completo contra la API existente,
sin modificar el backend.

- Rutas /, /signup, /login y /profile con react-router-dom; /profile
  queda tras un guard que redirige a /login con aviso de no autorizado.
- El token se persiste en localStorage y se valida contra
  /account/profile al arrancar, manteniendo la sesión entre recargas.
- Los formularios no validan en cliente: las reglas las impone solo el
  backend, de modo que no puedan divergir de las de VineJS. Por eso los
  <form> llevan noValidate, que desactiva la validación nativa.
- api/errors.ts traduce los errores a castellano leyendo únicamente
  field, rule y meta, y nunca el mensaje del backend. Así no puede
  filtrarse detalle técnico, ni siquiera el volcado con traza de pila
  que Youch devuelve ante un 500 en desarrollo.
- Los límites de longitud salen de meta.min/meta.max, no están escritos
  en el frontend, para que sigan al backend si cambian.

Los errores de campo se asocian a su input con aria-invalid y
aria-describedby; el banner del formulario es el único con role="alert",
para no solapar anuncios cuando fallan varios campos a la vez.

Añade react-router-dom como única dependencia nueva: aporta rutas
declarativas y redirecciones; la alternativa era un router propio sobre
history.pushState.