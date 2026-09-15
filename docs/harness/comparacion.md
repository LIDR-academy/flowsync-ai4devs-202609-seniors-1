# Comparación de ejecución — FLOW-2 (Implementar login en el frontend)

## Con harness

Ejecución realizada con Claude Code (harness completo: modo plan, `AskUserQuestion`,
lectura de código vía herramientas, sandbox de Bash, integración con Jira vía MCP de
Atlassian, e intento de verificación visual vía `claude-in-chrome`).

### Archivos modificados

Total: **4 archivos**, todos dentro de `frontend/`.

- `frontend/src/App.tsx` — modificado (125 líneas del scaffold de Vite eliminadas/reescritas; queda como contenedor de estado de sesión que alterna entre `LoginForm` y una vista de confirmación).
- `frontend/src/App.css` — modificado (158 líneas del scaffold eliminadas/reescritas; se quitaron estilos de las secciones `#next-steps`, `#docs`, `#spacer`, `.ticks` y se añadieron estilos para `.login-form`, `.login-error`, `.login-confirmation`).
- `frontend/src/components/LoginForm.tsx` — nuevo (componente de formulario controlado).
- `frontend/src/lib/api.ts` — nuevo (cliente `fetch` para `POST /api/v1/auth/login`, tipos `AuthUser`/`LoginResult` y clase `ApiError`).

No se modificó ningún archivo de `backend/`. Otros cambios presentes en el árbol de
trabajo (`backend/package-lock.json`, `frontend/package-lock.json`, `prompts.md`,
`.claude/`, `.mcp.json`, `CLAUDE.md`) ya existían como pendientes antes de iniciar esta
tarea (confirmado por el `git status` inicial de la sesión) y no fueron tocados durante
esta implementación.

### Convenciones e instrucciones respetadas

- **Fuente de verdad de contratos de API** (regla explícita de `CLAUDE.md`, sección
  "Fuente de verdad"): antes de escribir el cliente del frontend, leí
  `backend/app/validators/user.ts` (`loginValidator`) y
  `backend/app/transformers/user_transformer.ts` para conocer la forma real de
  entrada/salida, en vez de asumirla por el nombre de la ruta o el modelo.
- **Endpoints disponibles vía `backend/start/routes.ts`**: usé exactamente
  `POST /api/v1/auth/login` tal como está registrado ahí, sin inventar rutas.
- **Verificación de forma de errores en la fuente real**: en vez de suponer el formato
  de error, leí el código fuente instalado en `node_modules` de `@adonisjs/auth`
  (`E_INVALID_CREDENTIALS`, status 400), `@vinejs/vine`
  (`ValidationError`, status 422) y `@adonisjs/http-server`
  (`renderValidationErrorAsJSON`) para confirmar que ambos casos devuelven
  `{ errors: [{ message, ... }] }` cuando el cliente negocia `Accept: application/json`.
- **"No asumas convenciones... introdúcelas de forma deliberada si una tarea lo
  requiere"** (`CLAUDE.md`, sección frontend): el scaffold no tenía carpeta
  `components/` ni módulo de acceso a API; los introduje deliberadamente
  (`src/components/LoginForm.tsx`, `src/lib/api.ts`) solo porque esta tarea los
  requería, sin añadir router, gestión de estado global ni otras convenciones no
  solicitadas.
- **"No asumas funcionalidades que no estén realmente implementadas"**
  (`CLAUDE.md`, sección "Restricciones"): no implementé logout, persistencia de
  sesión (`localStorage`) ni refresco de token en el frontend, aunque el backend ya
  expone `logout`, porque el ticket FLOW-2 no lo pedía.
- **Lint del frontend con `oxlint`, no ESLint** (`CLAUDE.md`, sección frontend): corrí
  `npm run lint` (invoca `oxlint`) y pasó sin errores; no añadí configuración de
  ESLint.
- **Build de producción como paso de verificación de tipos**: corrí
  `npm run build` (`tsc -b && vite build`), que pasó sin errores de tipos.
- **No se tocó `backend/database/schema.ts` ni ningún archivo de `backend/`**, en
  línea con que la tarea no requería cambios de esquema ni de API.
- **Regla general de alcance** ("no añadir features más allá de lo pedido"): el
  resultado cubre exactamente los criterios de aceptación del ticket (formulario,
  envío, confirmación visual, mensaje de error, feedback de carga, integración con
  el backend real) y nada más.

### Convenciones o instrucciones no cumplidas completamente

- **Verificación end-to-end real del flujo**: `CLAUDE.md` da por sentado que se puede
  ejecutar `npm run dev` en backend y frontend en terminales separadas para probar la
  integración. El sandbox de Bash de esta sesión bloqueó tanto el `listen` del backend
  (`EPERM` al abrir el puerto 3333) como las conexiones salientes de Bash a
  `localhost` (`Operation not permitted`), y la extensión `claude-in-chrome` no estaba
  conectada. Por lo tanto, **no llegué a verificar visualmente el login en el
  navegador**; la verificación se quedó en lint + build de tipos, y en pedir al
  usuario que arrancara los servidores y probara manualmente. Al cierre de esta
  ejecución, el usuario confirmó que los había arrancado, pero la comprobación visual
  en el navegador no se completó dentro de esta sesión.
- **No se corrió `npm run typecheck` del backend** ni se relanzó su test suite (aunque
  no se modificó ese proyecto, tampoco se confirmó explícitamente que siguiera
  compilando tras el trabajo de la sesión).
- **Tuyau (`@tuyau/core`)**: `CLAUDE.md` menciona que este cliente tipado "está pensado
  para alimentar más adelante un cliente tipado en el frontend, pero el frontend
  todavía no lo consume". Usé `fetch` nativo en su lugar, lo cual es consistente con
  el estado descrito ("todavía no lo consume"), pero no adopté la infraestructura ya
  prevista para este propósito.
- **Convención de variables de entorno del frontend**: introduje
  `import.meta.env.VITE_API_URL` con fallback a `http://localhost:3333`, pero no creé
  un `frontend/.env.example` documentando esa variable, a diferencia del patrón que sí
  sigue `backend/.env.example`.

### Intervenciones del usuario durante la implementación

Se necesitaron **3 intervenciones explícitas** del usuario para completar la tarea:

1. Confirmar qué ticket implementar, tras comprobar que **FLOW-1 no existe** en el
   proyecto Jira `FLOW` y que el único ticket pendiente era **FLOW-2** (pregunta vía
   `AskUserQuestion`; el usuario eligió "Sí, usar FLOW-2").
2. Aprobar el plan de implementación completo antes de escribir código (flujo de modo
   plan → `ExitPlanMode`; el usuario aprobó el plan tal como se presentó, sin pedir
   cambios).
3. Decidir cómo verificar el login end-to-end una vez confirmado que el sandbox no
   permite abrir ni conectar a puertos locales (pregunta vía `AskUserQuestion`; el
   usuario eligió arrancar backend y frontend en sus propias terminales).

Adicionalmente, tras esas 3 intervenciones, la extensión `claude-in-chrome` resultó no
estar conectada, lo que impidió completar la verificación visual automatizada; esto se
reportó al usuario al final de la ejecución sin que mediara una nueva pregunta
estructurada, dejando la comprobación manual pendiente de su parte.

### Aspectos a revisar o corregir manualmente antes de enseñarlo a un equipo

- **Verificación visual pendiente**: nadie ha confirmado todavía, dentro de esta
  sesión, que el formulario funcione realmente contra el backend real en un
  navegador (éxito, error de credenciales, estado de carga). Esto debería
  verificarse manualmente antes de dar la tarea por terminada.
- **Manejo de errores múltiples**: `lib/api.ts` solo lee `errors[0].message`; si el
  backend devuelve varios errores de validación a la vez (p. ej. email inválido y
  password vacío), el usuario final solo verá el primero.
- **Errores de red no diferenciados**: un fallo de `fetch` por red caída, CORS o
  timeout no se distingue de un error de negocio; se mostraría igualmente el mensaje
  genérico `'No se pudo iniciar sesión'` capturado en el `catch` de `LoginForm.tsx`.
- **Sin persistencia de sesión**: recargar la página después de iniciar sesión
  vuelve a mostrar el formulario de login, porque el estado vive solo en memoria de
  React (`useState` en `App.tsx`). Es una decisión deliberada de alcance, pero
  conviene que el equipo la valide explícitamente como aceptable para este ticket.
- **Sin vía de logout en la UI**: una vez logueado, no hay forma de volver al
  formulario desde la interfaz (solo recargando la página), aunque el backend ya
  expone `POST /api/v1/account/logout`.
- **Variable de entorno sin documentar**: `VITE_API_URL` no está reflejada en ningún
  `.env.example` del frontend; si el equipo cambia el puerto o despliega en otro
  entorno, puede no ser obvio que existe ese punto de configuración.
- **Texto y diseño de la pantalla de confirmación** ("¡Hola, {nombre}! Has iniciado
  sesión correctamente.") es una interpretación mía del criterio de aceptación
  "confirmación visual de que ha iniciado sesión"; no fue validado con diseño ni con
  el resto del equipo y puede no encajar con el tono o la UI que el equipo tenía en
  mente.
- **No hay pruebas automatizadas nuevas**: el frontend no tiene test runner
  configurado (confirmado en `CLAUDE.md`: "No hay script de test configurado"), así
  que este flujo de login no queda cubierto por ninguna prueba automatizada, solo por
  lint y build de tipos.

## Sin harness

Ejecución realizada con Claude Code sobre esta copia (`flowsync-sin-harness`), que **no
tiene `CLAUDE.md` ni `AGENTS.md`, ni skills, ni subagentes, ni hooks configurados**
(confirmado: no existe ningún archivo `CLAUDE.md`/`AGENTS.md` en el repo, y
`.claude/settings.local.json` solo contiene `{"enabledMcpjsonServers": ["atlassian"]}`).
El MCP de Atlassian sí estaba disponible y fue necesario para leer el ticket en Jira;
el resto de piezas del harness que describe el `README.md` raíz (skills
`/priority-ticket`/`/commit`, subagente `adversarial-reviewer`, hook de Prettier,
reglas de proceso en `CLAUDE.md`) no estaban presentes. Sí se usó el modo plan nativo
de Claude Code (`EnterPlanMode`/`ExitPlanMode`) y `AskUserQuestion`, que son
capacidades del propio Claude Code, no piezas del harness del ejercicio.

### Archivos modificados

Total: **10 archivos** (3 modificados, 3 eliminados, 4 creados; sin contar
`frontend/package-lock.json` y `backend/package-lock.json`, que ya aparecían como
modificados en el `git status` inicial de la sesión, antes de empezar esta tarea, y no
fueron tocados; tampoco cuenta `.mcp.json`, que también era preexistente y no se
modificó).

Modificados:
- `frontend/.gitignore` — se añadió la línea `.env` (el archivo no ignoraba `.env`
  todavía, a diferencia de `backend/.gitignore`).
- `frontend/src/App.tsx` — se quitó el demo del contador de Vite y se reemplazó por un
  render condicional: `LoginForm` si no hay sesión, vista de bienvenida si la hay,
  envuelto en `AuthProvider`.
- `frontend/src/App.css` — se quitaron los estilos del scaffold ya sin uso (`.hero`,
  `#next-steps`, `#docs`, `#next-steps ul`, `#spacer`, `.ticks`) y se dejó únicamente
  `.counter` (reutilizado por el botón de submit, con un estado `:disabled` añadido) y
  `#center`.

Eliminados (assets del scaffold de Vite que quedaron sin ninguna referencia tras el
cambio anterior):
- `frontend/src/assets/hero.png`
- `frontend/src/assets/react.svg`
- `frontend/src/assets/vite.svg`

Creados:
- `frontend/.env.example` (y su copia local `frontend/.env`, ignorada por git) — variable
  `VITE_API_URL=http://localhost:3333/api/v1`.
- `frontend/src/api/authApi.ts` — función `login(email, password)` sobre `fetch` nativo,
  tipos `AuthUser`/`LoginResult`, y mapeo de errores por código de estado.
- `frontend/src/context/AuthContext.tsx` — `AuthProvider` + hook `useAuth()` con estado
  `idle`/`loading`/`error`.
- `frontend/src/components/LoginForm.tsx` y `frontend/src/components/LoginForm.css` —
  formulario controlado y sus estilos.

No se modificó ningún archivo de `backend/`.

### Convenciones e instrucciones respetadas

Al no existir `CLAUDE.md`/`AGENTS.md` en esta copia, no había un documento de
convenciones de ingeniería que seguir; lo que se respetó fue (a) lo que pide
explícitamente el ticket de Jira, y (b) las convenciones que se podían inferir leyendo
el código y la configuración ya existentes:

- **Contrato del backend verificado en el código, no asumido**: antes de escribir el
  cliente del frontend leí `backend/app/controllers/access_tokens_controller.ts`,
  `backend/app/validators/user.ts` (`loginValidator`), `backend/app/models/user.ts`,
  `backend/database/migrations/1761885935168_create_users_table.ts`,
  `backend/config/auth.ts`, `backend/config/cors.ts`, `backend/app/exceptions/handler.ts`
  y `backend/providers/api_provider.ts` (que envuelve las respuestas de éxito en
  `{ data: ... }`), además del código fuente instalado de `@adonisjs/auth` en
  `node_modules` para confirmar que `E_INVALID_CREDENTIALS` responde `400`.
- **Uso exacto de la ruta ya registrada**: `POST /api/v1/auth/login` tal como está en
  `backend/start/routes.ts`, sin inventar variantes.
- **Estilo CSS existente**: `LoginForm.css` sigue el mismo patrón que `App.css`/
  `index.css` (CSS plano con nesting nativo, reutilizando las variables `--accent`,
  `--border`, `--text-h` ya definidas en `:root`), sin introducir CSS-modules ni
  Tailwind.
- **Sin dependencias nuevas**: `frontend/package.json` solo traía `react`/`react-dom`
  antes de esta tarea; no se añadió router, cliente HTTP, gestor de estado ni librería
  de formularios — se usó `fetch` nativo y `useState`/Context, coherente con lo que ya
  había en el proyecto.
- **Patrón de `.gitignore` para variables de entorno**: se replicó en
  `frontend/.gitignore` el mismo criterio que ya usa `backend/.gitignore`
  (`.env` ignorado, `.env.example` versionado).
- **Scripts ya definidos en `package.json`**: la verificación se hizo con
  `npm run lint` (oxlint) y `npm run build` (`tsc -b && vite build`), ambos ya
  configurados en el proyecto; no se introdujo una herramienta de verificación
  distinta.
- **Regla explícita del `README.md` raíz sobre esta copia**: el `README.md` del
  repositorio indica que esta copia ("sin harness") debe usarse solo para comparar
  planes, no para aplicar la implementación, dentro del ejercicio. Antes de tocar
  ningún archivo, se lo señalé al usuario mediante `AskUserQuestion` en lugar de
  implementar directamente o de negarme sin más, y solo se avanzó a escribir código
  tras su confirmación explícita en dos mensajes separados.
- **Alcance ceñido al ticket**: se cubrieron los criterios de aceptación de FLOW-2
  (formulario, envío de credenciales, confirmación visual, mensaje de error
  comprensible, feedback visual durante el envío, integración real con el backend) y
  se excluyó deliberadamente todo lo no pedido (logout, persistencia de sesión,
  pantalla de registro).

### Convenciones o instrucciones no cumplidas completamente

- **`frontend/public/icons.svg` quedó huérfano**: al quitar del `App.tsx` las
  secciones que lo usaban (`#docs`, `#social`), el archivo `frontend/public/icons.svg`
  dejó de tener cualquier referencia en el código, pero no se eliminó (a diferencia de
  los assets de `src/assets/`, que sí se limpiaron). Es una inconsistencia propia: se
  limpió la carpeta `src/assets` pero no el equivalente en `public/`.
- **Verificación end-to-end en navegador no completada dentro de la sesión**: el
  sandbox de Bash de esta sesión bloqueó las conexiones salientes a `localhost`
  (`curl` devolvió `Operation not permitted` tanto para `127.0.0.1` como `::1`), y la
  extensión `claude-in-chrome` no estaba conectada (`tabs_context_mcp` respondió que la
  extensión no está instalada/conectada en esta sesión). La verificación se quedó en
  `tsc -b` + `vite build` + `oxlint`, y se le pidió al usuario que probara manualmente
  tras reiniciar el servidor de frontend (necesario para que Vite recargue la nueva
  variable `VITE_API_URL` de `.env`).
- **`authApi.ts` solo expone el primer error de validación**: si el backend devuelve
  varios errores a la vez (por ejemplo, email inválido y contraseña vacía), el mensaje
  mostrado usa únicamente `errors?.[0]?.message`.
- **Advertencia de lint no resuelta**: `npm run lint` terminó con una advertencia
  (`react/only-export-components` en `AuthContext.tsx`, por exportar juntos el
  componente `AuthProvider` y el hook `useAuth`) que no bloquea el build pero tampoco
  se resolvió ni se documentó como aceptada explícitamente en el código.
- **Sin pruebas automatizadas**: el frontend no tenía test runner configurado antes de
  esta tarea y sigue sin tenerlo; el flujo de login no quedó cubierto por ningún test,
  solo por lint y build de tipos.

### Intervenciones del usuario durante la implementación

Se necesitaron **3 intervenciones explícitas** del usuario:

1. Responder a una pregunta vía `AskUserQuestion` sobre qué hacer con FLOW-2 en esta
   copia "sin harness", dado que el `README.md` raíz indica que aquí solo debía
   generarse un plan y compararlo, no aplicarlo. El usuario respondió (en texto libre,
   no una de las opciones ofrecidas): "Extraer primero el plan y luego te pedire
   implementarlo".
2. Aprobar el plan de implementación (flujo de modo plan → `ExitPlanMode`) antes de
   escribir cualquier archivo.
3. Un segundo mensaje explícito, en un turno de conversación posterior, pidiendo
   ejecutar ese plan ("Implementa el plan..."), aclarando además que el backend y el
   frontend ya estaban corriendo en terminales aparte.

A diferencia de la ejecución con harness, no fue necesario preguntar nada adicional
durante la fase de escritura de código en sí (no hubo, por ejemplo, una pregunta sobre
cómo verificar el resultado): la limitación de verificación se reportó directamente
como texto al usuario al final de la tarea, sin una pregunta estructurada de por medio.

### Aspectos a revisar o corregir manualmente antes de enseñarlo a un equipo

- **Verificación visual pendiente de confirmar**: dentro de esta sesión no se llegó a
  comprobar en un navegador real que el login funcione contra el backend (éxito, error
  de credenciales, estado de carga). Se le pidió al usuario que lo probara
  manualmente tras reiniciar el frontend; no hay constancia, dentro de esta
  documentación, de que esa prueba manual ya se haya hecho.
- **`frontend/public/icons.svg` sin usar**: debería eliminarse o volver a usarse; ahora
  mismo es un asset muerto.
- **Manejo de errores de validación múltiples**: si se quiere mostrar más de un error
  de campo a la vez, `authApi.ts` habría que ampliarlo para no quedarse solo con
  `errors[0]`.
- **Advertencia de `react/only-export-components`**: decidir si se acepta tal cual (es
  un patrón común de React) o si se separa el hook `useAuth` a su propio archivo para
  dejar el lint limpio.
- **Sin persistencia de sesión**: recargar la página después de iniciar sesión vuelve
  a mostrar el formulario, porque el estado vive solo en memoria de React
  (`useState`/Context en `AuthProvider`). Fue una decisión deliberada de alcance,
  documentada como tal en el plan aprobado, pero conviene que el equipo la confirme
  como aceptable.
- **Sin vía de logout en la interfaz**: una vez logueado no hay botón para volver al
  formulario (solo recargando la página), aunque el backend ya expone
  `POST /api/v1/account/logout`; quedó fuera de alcance de FLOW-2 a propósito.
- **Texto de la pantalla de confirmación** ("¡Bienvenido, {nombre o email}!") es una
  interpretación propia del criterio "confirmación visual de que ha iniciado sesión",
  no validada con nadie más.
- **Sin `CLAUDE.md`/`AGENTS.md` en esta copia**: cualquier convención de ingeniería no
  inferible directamente del código (por ejemplo, cómo nombrar carpetas nuevas como
  `src/api` o `src/context`, o si un futuro cliente Tuyau tipado debería reemplazar
  `fetch`) quedó a criterio propio de esta ejecución, sin un documento del proyecto que
  lo confirmara o lo contradijera.

## Comparación

### 1. Archivos tocados

| | Con harness | Sin harness |
|---|---|---|
| Total | **4** | **10** (3 modificados, 3 eliminados, 4 creados) |
| Alcance | Solo dentro de `frontend/src/` (`App.tsx`, `App.css`, `components/LoginForm.tsx`, `lib/api.ts`) | `frontend/src/` + `frontend/.gitignore` + `frontend/.env.example` + 3 assets eliminados de `frontend/src/assets/` |
| Backend | No tocado | No tocado |

### 2. Convenciones respetadas / no respetadas

**Con harness** — respetó: fuente de verdad de contratos de API (`app/validators`, `app/transformers`), endpoints exactos de `start/routes.ts`, "no asumas convenciones... introdúcelas deliberadamente", "no asumas funcionalidades no implementadas", lint con `oxlint` (no ESLint), build de tipos, no tocar `backend/database/schema.ts`. No respetó del todo: la instrucción de arrancar backend y frontend en terminales separadas para probar la integración (no hubo verificación visual en navegador), no relanzó `npm run typecheck` del backend, no documentó `VITE_API_URL` en un `.env.example`.

**Sin harness** (sin `CLAUDE.md`, convenciones inferidas del código) — respetó: contrato leído directamente en el código del backend (controlador, validador, modelo, migración, `config/auth.ts`, `config/cors.ts`), ruta exacta de `start/routes.ts`, estilo CSS ya existente en `App.css`/`index.css`, sin dependencias nuevas, patrón `.gitignore` replicado del backend, y la regla del `README.md` raíz sobre esta copia (plan-only) respetada preguntando al usuario antes de implementar. No respetó del todo: dejó `frontend/public/icons.svg` huérfano (sí limpió `src/assets/` pero no el equivalente en `public/`), no resolvió la advertencia de lint `react/only-export-components`, y tampoco completó la verificación visual en navegador.

### 3. Intervenciones del usuario

Ambas ejecuciones necesitaron **3 intervenciones explícitas**, pero de naturaleza distinta:

- Con harness: elegir FLOW-2 ante la ausencia de FLOW-1 · aprobar el plan · decidir cómo verificar el login cuando el sandbox bloqueó los puertos locales. (Además, un aviso final sobre `claude-in-chrome` desconectada, sin pregunta estructurada de por medio.)
- Sin harness: decidir si procedía implementar pese a la regla "plan-only" del `README.md` raíz de esa copia · aprobar el plan · pedir explícitamente, en un turno posterior, que se ejecutara.

### 4. Qué arreglar a mano antes de enseñarlo a un equipo

Comunes a ambas ejecuciones: verificación visual en navegador sin confirmar, `errors[0]` como único mensaje de error mostrado (sin soporte para varios errores de validación a la vez), sin persistencia de sesión, sin vía de logout en la UI, texto de la pantalla de confirmación no validado con nadie, sin pruebas automatizadas.

Solo con harness: documentar `VITE_API_URL` en un `.env.example` del frontend; confirmar que el backend sigue compilando (`npm run typecheck`) tras la sesión.

Solo sin harness: eliminar o volver a usar `frontend/public/icons.svg` (asset muerto); resolver o aceptar explícitamente la advertencia de lint `react/only-export-components` en `AuthContext.tsx`.

## Tres líneas

1. De las ocho piezas del harness (`CLAUDE.md` vía `/init`, MCP de Atlassian, skills `/priority-ticket`/`/commit`, subagente `adversarial-reviewer`, hook de formateo, reglas de proceso, enlace a `AGENTS.md`), solo se llegó a montar el `CLAUDE.md` y un hook de validación (`PostToolUse` con lint+build del frontend); no hubo tiempo para las skills, el subagente, las reglas de proceso ni el enlace a `AGENTS.md`. El hook fue lo que más costó: el primer intento generó toda la lógica como un one-liner de shell (`jq` + `case`) embebido directamente en `.claude/settings.json`, y hubo que pedir explícitamente un segundo prompt para refactorizarlo y separar la lógica en `.claude/scripts/validate-frontend.sh`.
2. La primera diferencia concreta fue el volumen y alcance de archivos tocados: con harness se quedó en 4 archivos dentro de `frontend/src/`, mientras que sin harness llegó a 10, incluyendo un cambio en `frontend/.gitignore`, un `.env.example` nuevo y la eliminación de 3 assets muertos del scaffold de Vite. Se detectó al comparar las secciones "Archivos modificados" de ambas ejecuciones en este mismo documento.
3. `CLAUDE.md` da por sentado, en su sección de comandos, que backend y frontend se ejecutan en terminales separadas para probar la integración; la ejecución con harness no llegó a verificar visualmente el login en el navegador dentro de la sesión (el sandbox de Bash bloqueó los puertos locales y `claude-in-chrome` no estaba conectada), dejando esa comprobación pendiente del lado del usuario.

> **Nota posterior:** el bloqueo de sandbox sobre `localhost`/puertos locales descrito arriba se corrigió después de estas ejecuciones (se añadieron `allowLocalBinding` y `allowedDomains` en `sandbox.network` de la configuración de Claude Code). El resto de esta comparación sigue reflejando lo observado en el momento de los experimentos.
