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

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** Created CLAUDE.md at the repo root. There was no existing CLAUDE.md, Cursor rules, or Copilot instructions to merge in.

Key points it covers:
- Dev/build/lint/test commands for both backend/ (AdonisJS 7) and frontend/ (React 19 + Vite), including that they run as independent servers in separate terminals
- The subpath-import convention (#models/*, #controllers/*, etc.) and generated-controllers routing pattern
- The dual-guard auth setup (api token guard vs web session guard) and the thin controller → validator → model → transformer → serialize() response flow, including the custom { data: ... } wrapping convention
- That database/schema.ts is auto-generated from migrations and must never be hand-edited
- That the frontend is still the unmodified Vite starter, not yet wired to the backend API
- The exercise context: the backend already exposes /api/v1/auth/login and /api/v1/auth/signup, which is the contract a "login" ticket would integrate against

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
ayudame a configurar el mcp de jira en este proyecto
```

**Qué salió:** He añadido el servidor MCP de Atlassian a nivel de proyecto en .mcp.json (sin secretos — solo la URL; la autenticación es OAuth por navegador).

Para terminar de activarlo:

1. Reinicia o entra en una nueva sesión de Claude Code en este repo (o ejecuta /mcp dentro de la sesión actual) — te pedirá autorizar el acceso vía navegador a tu cuenta de Atlassian (Jira/Confluence).
2. Una vez conectado, prueba con algo como "lista mis tickets en el tablero de Jira" para confirmar que ve tu instancia.
3. Como el fichero no tiene credenciales, es seguro dejarlo en el repo, pero recuerda que no es parte del PR que se entrega — solo docs/harness/comparacion.md y prompts.md van en la entrega, según el enunciado.

¿Quieres que lo pruebe ahora mismo con /mcp o prefieres autorizarlo tú manualmen

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/mcp
```

**Qué salió:**  Authentication successful. Connected to atlassian.

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
vale ahora vamos a crear un harness para este proyecto, primero vamo sa crear un agente pra el commit lee esta url
  para saber las convenciones https://www.conventionalcommits.org/es/v1.0.0/
```

**Qué salió:**  He creado el subagente commit en .claude/agents/commit.md. Lo diseñé a partir de:

- Conventional Commits v1.0.0 (leí la página oficial en español): estructura <type>[scope]: <descripción>, tipos permitidos (feat, fix, build, chore, ci, docs, style, refactor, perf, test), breaking changes con ! o footer BREAKING CHANGE:.
- El estilo real ya usado en este repo (extraído de git log): type(scope): descripción en español, minúsculas, sin punto final, scope = área (backend, frontend) o sesión del ejercicio (s1, slides).

El agente:
- Solo tiene acceso a Bash, Read, Grep, Glob (nada de escritura de código).
- Analiza git status/git diff/git log antes de proponer tipo, scope y descripción.
- Nunca usa git add -A/., detecta posibles secretos, muestra el mensaje propuesto antes de commitear, y respeta las reglas de seguridad del CLAUDE.md raíz (sin --no-verify, sin amend salvo petición explícita, sin push ni operaciones destructivas).

Se invoca con el Agent tool pasando subagent_type: "commit". ¿Quieres que lo probemos ahora contra los cambios pendientes que ya hay en el working tree, o seguimos construyendo el resto del harness primero?

## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
ahora quiero que crees otro agente que se llame priority-ticket que obtenga la lista de tickets prioritarios y selecione el que tenga la fecha mas vieja, obtenga toda la informacion y genere un plan de accion para que el usuario lo valide quiero que el plan este en gherkins usando TDD, verde, rojo , refactor y primero se escribe el test y luego el codigo
```

**Qué salió:**  Creado .claude/agents/priority-ticket.md. Lo aterricé en tu Jira real, no en supuestos:

## Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
ahora quiero que añadas unos hooks, al terminar quiero que alznaes  pretier y revises is tengo algo mas en el package
  tipo lint o algo asi, lo que quiero es que al terminar de generar el codigo siempre se lance el lint + formateador
```

**Qué salió:**  Hook creado y verificado. Resumen de lo que hice:

.claude/hooks/lint-and-format.sh — se dispara en el evento Stop (cuando termino de responder), y para cada proyecto solo actúa si git status detecta cambios reales en esa carpeta:
- backend/: npm run format (prettier, ya configurado) + npm run lint (eslint).
- frontend/: npm run lint (oxlint) — no toqué dependencias, tal como pediste; no hay formateador ahí todavía.
- No bloquea nunca (siempre exit 0) y reporta el resultado como systemMessage visible tras cada turno.

.claude/settings.json — registra el hook Stop apuntando al script.

Efecto colateral que encontré y corregí: la primera pasada de npm run format reescribió backend/database/schema.ts, que tu CLAUDE.md marca explícitamente como auto-generado ("nunca editar a mano"). Lo revertí y añadí database/schema.ts a backend/.prettierignore (que ya existía pero no lo excluía), para que ni este hook ni un npm run format manual vuelvan a tocarlo.

Probado en crudo dos veces: con cambios reales en backend/frontend (corrió y reportó OK) y sin cambios (no-op, exit 0). Como el hook Stop se dispara fuera de este turno, no puedo demostrarlo disparándose ahora mismo dentro de la conversación — si al terminar mi respuesta no ves el mensaje, abre /hooks una vez para que recargue la config (el watcher ya vigilaba .claude/ porque settings.local.json existía desde el inicio de la sesión, así que debería recogerlo solo).

## Prompt 7

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
 /plan
```

**Qué salió:** ---
🧪 Especificación en Gherkin

# language: es
Característica: Login de usuario en el frontend (routing simulado)

  Escenario: Al abrir la aplicación se muestra el login
    Dado que el usuario abre la aplicación
    Entonces ve el formulario de login con un campo de email y un campo de contraseña oculto
    Y no ve el contenido de la pantalla principal por defecto

  Escenario: Login con credenciales válidas
    Dado que el usuario está viendo el formulario de login
    Y el backend responde 200 a POST /api/v1/auth/login con un usuario y un token válidos
    Cuando el usuario rellena email y contraseña y envía el formulario
    Entonces deja de verse el formulario de login
    Y se muestra el contenido de la pantalla principal por defecto

  Escenario: Login con credenciales inválidas
    Dado que el usuario está viendo el formulario de login
    Y el backend responde 400 con { message: "Invalid user credentials" } a POST /api/v1/auth/login
    Cuando el usuario rellena email y contraseña y envíael formulario
    Entonces el formulario de login sigue visible
    Y se muestra el mensaje "Email o contraseñaincorrectos. Inténtalo de nuevo."

🔁 Ciclos TDD

Ciclo A — Cliente API: login con credenciales válidas

- 🔴 ROJO — frontend/src/api/auth.test.ts, test "loginenvía POST a /api/v1/auth/login y devuelve { user, token } cuando el backend responde 200". Mockearglobal.fetch. Falla con Cannot find module'../api/auth'.
  Verificar: cd frontend && npx vitest runsrc/api/auth.test.ts
- 🟢 VERDE — frontend/src/api/auth.ts: export asyncfunction login(email, password) hace fetch POST ydevuelve (await res.json()).data.
- 🔵 REFACTOR — Extraer base URL (import.meta.env.VITE_API_URL ?? ''), tipar el retorno.

Ciclo B — Cliente API: credenciales inválidas

- 🔴 ROJO — Test "login rechaza la promesa con un mensajeckend responde 400". Mock fetch con ok:false, status:400, json: async () => ({message:'Invalid user credentials'}). Falla porque la implementación del Ciclo A resuelve en vez de rechazar.
d frontend && npx vitest run src/api/auth.test.ts
- 🟢 VERDE — if (!res.ok) throw new Error((await res.json()).message ?? 'Error de autenticación').
- 🔵 REFACTOR — Tipar LoginError, evitar doble lectura deres.json().

Ciclo C — Estructura del formulario (email + passwordenmascarado)

- 🔴 ROJO — frontend/src/pages/LoginPage.test.tsx, test"muestra un campo de email y un campo de contraseña oculto". render(<LoginPage onLoginSuccess={() => {}}/>), comprobar type="email" y type="password" vía getByLabelText. Falla con Cannot find module'../pages/LoginPage'.
  Verificar: cd frontend && npx vitest runsrc/pages/LoginPage.test.tsx
- 🟢 VERDE — LoginPage.tsx con <form>, labels + inputs(id="email"/type="email",id="password"/type="password"), botón "Entrar". Sinlógica de envío.
- 🔵 REFACTOR — Nombrar constantes de texto, revisarasociación htmlFor/id.

Ciclo D — Login válido invoca onLoginSuccess

- 🔴 ROJO — Test "al enviar credenciales válidas llama aonLoginSuccess". vi.mock('../api/auth') con loginresuelto; render(<LoginPage onLoginSuccess={mockFn} />); rellenar campos con userEvent, click en "Entrar"; await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1)). Falla porque LoginPage (Ciclo C) no tiene onSubmit.
  Verificar: cd frontend && npx vitest run src/pages/LoginPage.test.tsx
- 🟢 VERDE — onSubmit llama a login(email, password); en éxito llama a props.onLoginSuccess(result.user).
- 🔵 REFACTOR — Extraer handleSubmit, tipar props {onLoginSuccess: (user: User) => void }.

Ciclo E — Login inválido muestra error y no llama aonLoginSuccess

- 🔴 ROJO — Test "al enviar credenciales inválidas muestra un mensaje de error y no llama a onLoginSuccess". Mocklogin rechaza con new Error('Invalid user credentials'). await screen.findByRole('alert') con texto "Email ocontraseña incorrectos. Inténtalo de nuevo.";expect(mockFn).not.toHaveBeenCalled(). Falla porqueLoginPage (Ciclo D) no captura el rechazo ni renderiza error.
  Verificar: cd frontend && npx vitest runsrc/pages/LoginPage.test.tsx
- 🟢 VERDE — try/catch alrededor de login(...); en catch,setError('Email o contraseña incorrectos. Inténtalo de nuevo.'); renderizar <p role="alert">{error}</p> si hayerror; no llamar a onLoginSuccess.
- 🔵 REFACTOR — Limpiar el error al reintentar el envío.

Ciclo F — App muestra login por defecto (extracción deHomePage)

- 🔴 ROJO — frontend/src/App.test.tsx, test "al abrir la aplicación se ve el login y no el contenido principal". render(<App />); expect(screen.getByLabelText(/email/i)).toBeInTheDocument(); expect(screen.queryByText(/get started/i)).not.toBeInTheDocument(). Falla contra elApp.tsx actual: no existe ningún campo de email, solo el contenido del starter — getByLabelText lanza error de"no encontrado".
  Verificar: cd frontend && npx vitest runsrc/App.test.tsx
- 🟢 VERDE — Mover el JSX actual de App.tsx (hero, getstarted, contador, docs/social) tal cual afrontend/src/pages/HomePage.tsx (con sus imports deassets y App.css). Reescribir App.tsx: const[isAuthenticated, setIsAuthenticated] = useState(false); return isAuthenticated ? <HomePage /> : <LoginPageonLoginSuccess={() => {}} /> (callback aún no conectado al estado, a propósito, para dejar el siguiente ciclocon un rojo real).
- 🔵 REFACTOR — Ninguno relevante todavía (se pospone laconexión real del callback al Ciclo G).

Ciclo G — Login válido en App cambia de pantalla de verdad

- 🔴 ROJO — Añadir a App.test.tsx: "tras un login válido se oculta el formulario y aparece el contenido principal". Mock '../api/auth' con login resuelto;render(<App />); rellenar y enviar el formulario; await screen.findByText(/get started/i); expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument(). Fallaporque en el Ciclo F el onLoginSuccess pasado a LoginPage es un no-op: el estado isAuthenticated nunca cambia.
  Verificar: cd frontend && npx vitest run src/App.test.tsx
- 🟢 VERDE — Cambiar en App.tsx: onLoginSuccess={() => setIsAuthenticated(true)}.
- 🔵 REFACTOR — Revisar nombres (isAuthenticated vs. screen), sin cambiar comportamiento.

Nota de cobertura: no se añade un ciclo aparte para"credenciales inválidas en App" porque ya queda cubiertopor la combinación de Ciclo E (LoginPage no invocaonLoginSuccess en fallo) + Ciclo G (App solo cambia depantalla cuando se invoca onLoginSuccess) — un test adicional en ese punto pasaría sin motivar ningún códigonuevo, lo cual violaría la regla de "un test que pasa a la primera no prueba nada".

⚠️ Prerrequisitos y riesgos

- Paso 0 (instalación de Vitest + Testing Library + jsdom) pendiente de tu aprobación.
- Backend debe estar arrancado (cd backend && npm run dev) solo para verificación manual E2E; los tests automáticos mockean fetch/../api/auth.
- No hay usuario de prueba conocido en la base de datos para la verificación manual — habría que crear uno vía POST /api/v1/auth/signup o semilla.

❓ Preguntas abiertas (ya resueltas por ti, dejo constancia)

- ¿Router real o simulado? → Simulado con estado de React. Resuelto.
- ¿Texto del error? → "Email o contraseña incorrectos.Inténtalo de nuevo." Resuelto.
- ¿Persistencia de sesión? → Solo en memoria. Resuelto.
- ¿Requisitos de diseño? → Ninguno, se reutiliza el HTML/CSS actual sin tocar. Resuelto.

---

Resumen: voy a construir un login simulado (sin routerreal) que por defecto se muestra al abrir la app, llama a POST /api/v1/auth/login, y en éxito reemplaza la pantalla por el contenido actual del starter (ahora HomePage) mientras que en fallo se queda en el login mostrando"Email o contraseña incorrectos. Inténtalo de nuevo.", todo en memoria y sin cambios visuales — siguiendo TDD estricto rojo-verde-refactor (Ciclos A-G arriba).¿Apruebas este plan (incluido el Paso 0 de instalar Vitest/Testing L


## Prompt 8

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
implementa
```

**Qué salió:**  Implementación completa y verificada. Resumen:

Bug real encontrado y corregido durante la verificación: el contrato de error del backend no es { message: "..." } como asumía el plan inicial, sino { errors: [{ message: "..." }] } (lo comprobé con curl contra el backend real, no solo leyendo código). Corregido en auth.ts y en su test antes de darlo por bueno.

Archivos creados/modificados (frontend/):
- src/api/auth.ts + auth.test.ts — cliente de login, con la URL absoluta al backend (http://localhost:3333, vía VITE_API_URL si se define) porque frontend y backend corren en puertos distintos y una ruta relativa no habría funcionado nunca en real.
- src/pages/LoginPage.tsx + test — formulario con email/password enmascarado, error role="alert" con el texto acordado.
- src/pages/HomePage.tsx — contenido del starter de Vite extraído tal cual (sin tocar diseño).
- src/App.tsx — estado isAuthenticated en memoria, sin router.
- vite.config.ts, tsconfig.app.json, package.json — Vitest + Testing Library configurados.

Verificación:
- ✅ 7/7 tests unitarios en verde, siguiendo rojo→verde→refactor real (te fui mostrando cada rojo).
- ✅ npx tsc -b limpio, npm run lint limpio, npm run build correcto.
- ✅ Backend real probado con curl: creé un usuario de prueba (harness-demo@example.com / secret123) vía /auth/signup, confirmé login correcto (200) y login con contraseña incorrecta (400, formato de error real).
- ⚠️ No verifiqué en navegador real — no tengo herramienta de automatización de navegador disponible en esta sesión. Los dos dev servers que ya tenías corriendo (puertos 3333 y 5173) siguen vivos con HMR, así que deberían haber recogido los cambios solos. Te recomiendo abrir http://localhost:5173 tú mismo y probar con ese usuario para confirmarlo visualmente antes de darlo por cerrado.

No he hecho commit ni tocado Jira — dime si quieres que continúe con eso, o que arregle algo del comportamiento.

⏺ Ran 2 stop hooks
  ⎿  Stop hook error: Failed with non-blocking status code: bash: .claude/hooks/lint-and-format.sh: No such file or directory
