# 4. La comparación

Mismo encargo (Jira FLOW-1: "Nueva pantalla de inicio de sesión") lanzado en dos repos
gemelos:

- **CON HARNESS** -> `flowsync-ai4devs-202609-seniors-1` (tiene `CLAUDE.md` + hooks/skills en `.claude/`)
- **SIN HARNESS** -> `flowsync-sin-harness` (mismo starter, sin `CLAUDE.md` ni hooks)

En ambos casos el backend de auth ya existía (`/api/v1/auth/login`, `/account/profile`,
`/account/logout`) y el encargo era solo de frontend. Se excluye del recuento el cambio en
`backend/package.json` (bloque `allowScripts`): es idéntico en los dos repos y viene del
`npm install` inicial, no del encargo FLOW-1.

## Qué archivos tocó, contados

### Con harness

10 archivos, todos en `frontend/`, ninguna dependencia nueva.

- Nuevos (4):
  - `frontend/src/api/auth.ts`
  - `frontend/src/auth/AuthContext.tsx`
  - `frontend/src/components/LoginForm.tsx`
  - `frontend/src/components/AuthenticatedApp.tsx`
- Modificados (3):
  - `frontend/src/App.tsx`
  - `frontend/src/main.tsx`
  - `frontend/src/App.css`
- Borrados (3, assets del starter que ya no se usaban):
  - `frontend/src/assets/hero.png`
  - `frontend/src/assets/react.svg`
  - `frontend/src/assets/vite.svg`

### Sin harness

15 archivos, todos en `frontend/`, más 1 dependencia nueva (`react-router-dom`).

- Nuevos (9):
  - `frontend/.env.example`
  - `frontend/src/api/client.ts`
  - `frontend/src/auth/api.ts`
  - `frontend/src/auth/AuthContext.tsx`
  - `frontend/src/pages/LoginPage.tsx`
  - `frontend/src/pages/LoginPage.css`
  - `frontend/src/pages/ForgotPasswordPage.tsx`
  - `frontend/src/pages/HomePage.tsx`
  - `frontend/src/pages/HomePage.css`
- Modificados (6):
  - `frontend/package.json` (añade `react-router-dom`)
  - `frontend/package-lock.json`
  - `frontend/src/App.tsx`
  - `frontend/src/App.css`
  - `frontend/src/index.css`
  - `frontend/src/main.tsx`

**Diferencia clave:** el lado sin harness resolvió el ticket con routing real
(`react-router-dom`, tres páginas separadas) y una página de "olvidé mi contraseña" completa.
El lado con harness lo resolvió sin dependencias nuevas, con un solo componente condicional
(login vs. app) y un enlace `mailto:` para el "olvidé mi contraseña". El ticket solo pedía "un
enlace visible", así que ambas cumplen el criterio de aceptación, pero con huella muy distinta.

## Qué convenciones del proyecto respetó y cuáles no

### Con harness (tiene CLAUDE.md documentando convenciones)

- Rutas de la API bajo `/api/v1` (documentadas en CLAUDE.md) -> **RESPETADA**, las usó tal cual.
- Lint de frontend con oxlint, no ESLint -> **RESPETADA**, corrió `npm run lint`.
- Build de frontend `tsc -b && vite build` -> **RESPETADA**, corrió `npm run build` completo.
- Sin framework de test ni Prettier instalados en frontend -> **RESPETADA**, no añadió tests
  ni tocó formato.
- Gotcha de `CORS_ORIGIN` (comentado por defecto en `.env`) -> **NO SE TOCÓ**; no hizo falta
  porque probó contra los puertos por defecto (3333/5173), donde `config/cors.ts` ya deja
  `origin: true` en desarrollo. Ni se violó ni se ejerció la convención documentada.
- Commits Conventional Commits, en minúscula y en español -> **NO APLICA**, no llegó a hacer
  ningún commit.
- Skill de proyecto `.claude/skills/verify` (creada por un `/init` previo) -> **RESPETADA**,
  la invocó explícitamente al final para correr typecheck/lint/build de los dos proyectos.

### Sin harness (no hay CLAUDE.md ni ningún otro documento de convenciones en el repo)

No había ninguna convención de proyecto escrita en ninguna parte (ni CLAUDE.md, ni README de
convenciones, ni CONTRIBUTING) — esa es la respuesta para ese hueco y vale como tal. Lo único
"escrito" son los scripts de `package.json`, heredados del mismo starter que el otro repo:

- Lint de frontend con oxlint -> **RESPETADA a medias**: corrió `npx oxlint` directamente en
  vez de `npm run lint` (mismo resultado, pero se salta el script definido).
- Build de frontend `tsc -b && vite build` -> **NO RESPETADA del todo**: solo corrió
  `npx tsc -b` suelto; nunca ejecutó `npm run build` ni, por tanto, el paso `vite build`.
- Sin framework de test instalado -> **RESPETADA**, no añadió tests.
- "Dos proyectos independientes, cada uno con su propio package-lock" -> **RESPETADA** en
  estructura, pero amplió la superficie del frontend con una dependencia nueva
  (`react-router-dom`) que el starter no traía, sin que el ticket la pidiera.
- Commits Conventional Commits -> **NO APLICA**, tampoco hizo commit.

## Cuántas veces tuviste que intervenir

### Con harness

0 correcciones. Un único prompt ("Implementa el JIRA FLOW-1") y, ya con el trabajo terminado,
una pregunta de seguimiento sin corregir nada ("cómo pruebo el cambio que acabas de hacer?").
No hubo que aclarar el encargo, repetirlo ni pararlo.

### Sin harness

1 intervención real + 1 pregunta de seguimiento. A mitad de las pruebas en el navegador
(probando el formulario ya con Chrome) tuve que interrumpir la ejecución en curso
("[Request interrupted by user]") y relanzarla con "Continúa" para que siguiera. Al terminar,
igual que en el otro lado, cerré con una pregunta de seguimiento ("cómo pruebo el formulario?").
No hubo que corregir el resultado ni repetir el encargo, pero sí hubo que parar y reanudar la
ejecución una vez.

## Qué te tocaría arreglar a mano antes de enseñarle esto a alguien del equipo

### Con harness

- No hay ningún commit hecho: falta trocear y redactar el/los commits en Conventional
  Commits, en español, como marca CLAUDE.md.
- El enlace "¿Has olvidado tu contraseña?" es un `mailto:soporte@flowsync.app` inventado, no
  un flujo de recuperación real: cumple el criterio de aceptación de forma literal, pero
  habría que confirmar con el equipo si un mailto vale o hace falta una pantalla real.
- No existe pantalla de registro: para poder loguearse hay que crear el usuario a mano
  (vía curl contra `/api/v1/auth/signup`) antes de poder probar el login.
- Las pruebas end-to-end que hizo Claude (scripts de Playwright) vivían en su scratchpad
  temporal, no en el repo: no queda ninguna prueba automatizada reutilizable; si se quiere
  cobertura permanente hay que escribirla (Japa en backend, o Vitest/Playwright en frontend).

### Sin harness

- Quedó un usuario de prueba real en la base de datos de desarrollo
  (`prueba@flowsync.dev` / `password123`, en `backend/tmp/db.sqlite3`) sin limpiar: hay que
  borrarlo a mano antes de compartir el entorno o la DB con nadie.
- La contraseña de ese usuario de prueba quedó impresa en texto plano en el resumen final
  del chat: revisar antes de compartir capturas o el log de la sesión.
- Se añadió `react-router-dom` y tres páginas nuevas (Home, Login, ForgotPassword) para un
  ticket que solo pedía una pantalla de login: hay que decidir si el equipo quiere ese
  alcance mayor o si conviene recortarlo antes de mandarlo a review.
- El build de producción nunca se verificó completo (solo `tsc -b`, nunca `npm run build`
  con `vite build`): falta confirmar que el bundle final compila limpio.
- No se corrió ninguna comprobación de backend (typecheck/lint) aunque no se tocó backend;
  no hay evidencia explícita de que nada se rompió ahí.
- Durante las pruebas visuales se usaron puertos no estándar (3334/5180 en vez de 3333/5173)
  por conflictos de puerto, y se creó un `.env.local` temporal que luego se borró: conviene
  revisar que no quede ningún residuo de esa configuración.
- Tampoco hay ningún commit hecho.

## 🅱 Parte B: las tres líneas

**1. Piezas montadas, y la que costó más de lo esperado.**
Del `/init` salieron tres piezas: `CLAUDE.md`, `.claude/skills/verify/SKILL.md` y
`.claude/settings.json`. Para las dos primeras bastó un `Write` cada una. La que se llevó el
rato de verdad fue `settings.json` — el hook `PostToolUse` que pasa `prettier --write` a los
archivos de backend al guardarlos. Antes de escribirlo hubo que: comprobar que `prettier`
existía en `backend/node_modules/.bin`, construir a mano el JSON de `tool_input` que Claude
Code le pasa a un hook `PostToolUse` para probar el comando en crudo, y crear un archivo de
prueba mal formateado (`tmp_hooktest.ts`) para confirmar en vivo que el hook lo reformateaba
antes de darlo por bueno. Las otras dos piezas fueron redactar y ya; esta hubo que verificarla.

**2. La primera diferencia entre las dos salidas, y dónde estaba mirando cuando la vi.**
La vi con un `git status --short` en cada repo, antes de abrir ningún archivo: el lado sin
harness traía `frontend/package.json` y `frontend/package-lock.json` modificados (una
dependencia nueva) y una carpeta `frontend/src/pages/` nueva; el lado con harness no tocaba
ningún manifiesto de dependencias y metía sus archivos en `frontend/src/components/`. No hizo
falta abrir nada todavía — ya en la lista de archivos tocados se notaba que un lado había
instalado algo y organizado el código en páginas con router, y el otro no.

**3. Algo que dejé escrito en el harness que el agente no cumplió igual.**
En `CLAUDE.md`, en "Gotchas", dejé anotado: "`CORS_ORIGIN` is commented out... set it to
`http://localhost:5173` or frontend requests to the API will be blocked." El agente que
implementó FLOW-1 en ese mismo repo no tocó esa variable ni la mencionó en ningún momento de
la sesión — lo comprobé buscando "cors" en su transcript completo: cero apariciones. Le salió
bien porque probó contra los puertos por defecto (3333/5173), donde `config/cors.ts` ya deja
pasar cualquier origen en modo desarrollo. Pero el gotcha que dejé escrito explícitamente para
evitar justo ese bloqueo no llegó a leerse ni a aplicarse: funcionó por las circunstancias del
puerto, no porque el agente hubiera seguido la instrucción escrita.
