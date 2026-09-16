# Comparación

Dos planes para el mismo ticket, [FLOW-1 · Login usuario frontend](https://elenapo-lidr.atlassian.net/browse/FLOW-1)
(Story, Medium, To Do), sobre el mismo código de partida (rama `s1/start`).

| | **A — con harness** | **B — sin harness** |
|---|---|---|
| Repo | `flowsync-ai4devs-202609-seniors-1` | `…-sin-harness` |
| Entrada del ticket | MCP de Atlassian, vía `/priority-ticket` | captura de pantalla pegada a mano |
| Convenciones | `AGENTS.md` en contexto | deducidas leyendo el código |
| Modelo · herramienta | Opus 5 · Claude Code | Claude Code |
| Resultado | plan, no aplicado | plan, no aplicado |
| **Archivos** | **7** | **33** |

Ninguno de los dos planes se llegó a ejecutar. Lo que se compara es el plan.

---

# A — Con harness

La búsqueda JQL de la skill (`assignee = currentUser() AND statusCategory = "To Do" ORDER BY
priority DESC, Rank ASC`) devolvió un único ticket, así que el criterio de desempate por
prioridad y por posición en el tablero no se ejerció. El hook de solo lectura aguantó: no se
intentó ninguna escritura en Jira ni se tocó ningún fichero del repo.

## A.1 Archivos que propone tocar

**Plan inicial: 5 seguros + 2 condicionados.** Los 2 condicionados dependían de una duda que el
agente dejó abierta en vez de resolver («¿el formulario tiene que llamar al backend?»).

**Tras responder las dudas: 7 en total** — 4 crear, 3 modificar.

| # | Acción | Ruta | Estado |
|---|---|---|---|
| 1 | crear | `frontend/src/components/LoginForm.tsx` | en el plan inicial |
| 2 | crear | `frontend/src/components/LoginForm.css` | en el plan inicial |
| 3 | modificar | `frontend/src/App.tsx` | en el plan inicial |
| 4 | modificar | `frontend/src/App.css` | en el plan inicial |
| 5 | modificar | `frontend/index.html` | en el plan inicial |
| 6 | crear | `frontend/src/lib/api.ts` | condicionado, activado al responder |
| 7 | crear | `frontend/.env.example` | condicionado, activado al responder |

Las 7 rutas se contrastaron contra el repo antes de proponerlas: `frontend/src/` solo contiene
`App.tsx`, `App.css`, `main.tsx`, `index.css` y `assets/`, así que los 4 «crear» son
efectivamente nuevos y los 3 «modificar» existen.

**Deriva del recuento.** Después del recuento de 7 se decidieron dos cosas más —estado de sesión
post-login y botón de logout— y **el recuento no se rehízo**. Ese trabajo plausiblemente añade un
octavo archivo (un componente de estado autenticado) o engorda `App.tsx` bastante más de lo que
sugiere un «modificar». El número 7 es el último dato limpio, no el final.

**Lo que dejó fuera sin decir que lo dejaba fuera:** `frontend/src/assets/hero.png`, `react.svg`
y `vite.svg` quedan huérfanos al quitar la demo. Los mencionó de pasada («los dejo en disco salvo
que se diga lo contrario») pero no los contó ni propuso borrarlos.

## A.2 Convenciones

Nombradas como aparecen en `AGENTS.md`.

### Respetadas

| Convención | Dónde se ve |
|---|---|
| **Estilo → Frontend** (sin punto y coma, comillas simples) | declarada explícitamente para `LoginForm.tsx` y `App.tsx` |
| **Estilo → Frontend, `verbatimModuleSyntax`** | propuso `import type { FormEvent } from 'react'` |
| **Estilo → Frontend, `erasableSyntaxOnly`** | descartó `enum`, propuso unión de literales para los estados |
| **Estilo → Frontend, `noUnusedLocals`** | detectó por su cuenta que dejar los imports de `reactLogo`/`viteLogo`/`heroImg` en `App.tsx` rompe `npm run build`. Es el acierto más concreto del plan |
| **Estilo → Frontend, oxlint `react/rules-of-hooks`** | todos los `useState` al principio, sin condicionales |
| **Gotchas → No introducir dependencias nuevas sin justificarlas en el PR** | descartó explícitamente react-hook-form, zod, axios y router; `useState` + `fetch` nativo |
| **Respuestas** | sabía que login devuelve `{ data: { user, token } }` por el wrapper de `providers/api_provider.ts`, no plano |
| **Comandos clave → Frontend** | verificación con `npm run lint` y `npm run build`, señalando que el typecheck va dentro del build y que no hay script `typecheck` ni Prettier en frontend |
| **Overview** | backend en 3333, frontend en 5173 en otra terminal |
| Reglas de la skill `priority-ticket` | solo lectura, rutas reales citadas, comprobó existencia antes de proponer crear, listó lo ambiguo en «Dudas y riesgos» en vez de inventarlo |

### No respetadas, o aplicadas a medias

| Qué | Detalle |
|---|---|
| **Decisión de idioma** | propuso cambiar `index.html` de `lang="en"` a `lang="es"` razonando desde el idioma del ticket. La decisión era la contraria: tickets en español, app en inglés. Corregido a mano |
| **Riesgo falso sobre `.env`** | avisó de que `frontend/.gitignore` ignora `*.local` pero no `.env`. Cierto en ese fichero, **irrelevante**: el `.gitignore` raíz ya cubre `**/.env` con excepción `!**/.env.example`. Miró un `.gitignore` y no el otro, y lo publicó como riesgo |
| **Validador equivocado** | al pedirle «la misma validación que el backend» para la contraseña, propuso 8–32 caracteres. Eso es el `signupValidator`; el `loginValidator` (`backend/app/validators/user.ts:23`) solo exige `vine.string()`, sin longitud mínima. Copió el validador de al lado |
| **Estructura de carpetas inventada** | `src/components/` y `src/lib/` no existen en el repo ni los menciona `AGENTS.md`. No incumple nada, pero se presentó con el mismo tono que las convenciones reales, sin marcar que era criterio propio |
| **Variables de entorno** | la convención de `AGENTS.md` («una variable nueva va en `start/env.ts` y en `.env.example`») es de backend. Para el frontend propuso `.env.example` con `VITE_API_URL` pero sin equivalente de validación, y sin decir que estaba extrapolando una regla que no aplica |
| **Decidir vs. preguntar** | entregó el alcance a medias: formulario sin envío, con la llamada a la API como fila condicional. Ocho dudas abiertas para una pantalla de login es demasiado. Con `POST /api/v1/auth/login` ya visible en `start/routes.ts`, «el login llama al login» era asumible declarando el supuesto |

## A.3 Intervenciones

**Del humano: 3.**

1. **Responder las 8 dudas** que el plan dejó abiertas, en bloque. Sin esto el plan no era
   ejecutable: faltaba decidir si había llamada a la API, dónde iba el token, qué pasaba con la
   plantilla de Vite y en qué idioma iba la interfaz.
2. **Corregir dos derivas** dentro de esa misma respuesta: el idioma (`lang="es"` → app en
   inglés) y la plantilla (sustituirla → reutilizarla).
3. **Cambio de rumbo final:** «me he equivocado, no hay que aplicar el plan». No es culpa del
   harness, pero cuenta como intervención.

**Del agente: 1 ronda de preguntas** (`AskUserQuestion`, 2 preguntas), después de las respuestas
del humano. Las dos eran legítimas y ninguna se podía sacar del repo:

- «Utiliza la plantilla de Vite ya configurada» admitía dos lecturas incompatibles —reutilizar
  los estilos quitando la demo, o conservar la demo y meter el formulario dentro— y cada una da
  un diff distinto.
- Sin router no hay «otra página» a la que ir tras el login, así que había que decidir qué ve el
  usuario.

**Lectura.** El reparto está mal: las 8 dudas del turno 1 deberían haber sido 2 o 3 decisiones
tomadas con el supuesto declarado, y las 2 preguntas del turno 2 deberían haber estado en el
turno 1. Preguntó de más al principio y bien pero tarde después.

## A.4 Qué habría que arreglar a mano

1. **El plan consolidado no existe en ningún fichero.** La versión con todas las decisiones
   tomadas solo está repartida por la conversación. Lo único escrito es el plan del turno 1, que
   ya está obsoleto en cuatro puntos.
2. **Corregir la validación de contraseña**: quitar el 8–32 y dejar «requerida», que es lo que
   exige el `loginValidator`. Tal cual está, bloquea a cualquier usuario con contraseña corta
   antes de que salga la petición.
3. **Rehacer el recuento de archivos** incluyendo el estado post-login y el logout.
4. **Dejar por escrito que el alcance creció fuera del ticket.** FLOW-1 no pide llamada a la API,
   ni persistencia, ni logout.
5. **Resolver la contradicción de idioma:** mensaje de error aprobado en español, app en inglés.
6. **Escribir los criterios de aceptación en FLOW-1.** El ticket no tiene ninguno; el plan los
   infirió de cuatro frases de la descripción y nadie ha validado esa inferencia en Jira.
7. **Quitar el riesgo falso del `.gitignore`.**
8. **Asumir que la verificación es manual.** No hay tests ni infraestructura para ponerlos.

---

# B — Sin harness

El ticket entró por captura de pantalla: esa sesión no tenía acceso a Jira. El plan lo dice de
frente, que es lo correcto, pero significa que clave, estado, prioridad y ausencia de comentarios
son transcripción humana, no dato leído.

## B.1 Archivos que propone tocar

**33 en total: 22 crear, 8 modificar, 3 borrar.** De los 22 creados, **8 son de tests** (6
ficheros `*.test.*` más `setup.ts` y `helpers.ts`), así que quedan **25 archivos de producción y
configuración** frente a los 7 del plan A.

**Crear (22)**

| Zona | Archivos |
|---|---|
| Config | `.env.example`, `src/vite-env.d.ts` |
| API | `src/api/client.ts`, `client.test.ts` |
| Auth | `src/auth/types.ts`, `authService.ts`, `authStorage.ts`, `authStorage.test.ts`, `AuthContext.ts`, `AuthProvider.tsx`, `validation.ts`, `validation.test.ts`, `LoginForm.tsx`, `LoginForm.css`, `LoginForm.test.tsx`, `SignedInView.tsx` |
| UI | `src/components/PasswordInput.tsx`, `PasswordInput.css`, `PasswordInput.test.tsx` |
| Tests | `src/App.test.tsx`, `src/test/setup.ts`, `src/test/helpers.ts` |

**Modificar (8):** `package.json`, `vite.config.ts`, `src/App.tsx`, `src/App.css`, `src/main.tsx`,
`src/index.css`, `index.html`, y `package-lock.json` de rebote por las 6 devDependencies nuevas.

**Borrar (3):** `src/assets/hero.png`, `react.svg`, `vite.svg`.

El recuento hay que reconstruirlo: **el plan tal como se pegó está truncado en al menos cinco
puntos** (la fila de `validation.ts` en la tabla, el final de la tabla de «Modificar», el cuerpo
de `types.ts`, el estado de `LoginForm` y el bloque de `main.tsx`). Los 33 salen de cruzar la
tabla con las secciones de detalle y la secuencia de construcción; el original completo no se
tiene.

## B.2 Convenciones

Sin `AGENTS.md` en el repo, el plan **reconstruyó las convenciones leyendo el código**, y las
reconstruyó bien. La diferencia no es la puntería, es que nadie puede verificarlas contra una
fuente escrita: son la lectura del agente, no una regla del proyecto.

### Respetadas

| Convención (nombre del plan B) | Comprobación |
|---|---|
| Sin punto y coma, comillas simples, 2 espacios | correcto para el frontend. Ojo: `.editorconfig` solo existe en `backend/`, así que los 2 espacios los dedujo de la plantilla, no de un config |
| `PascalCase.tsx` con `export default` y CSS hermano | coherente con `App.tsx`/`App.css` |
| Imports relativos, sin alias | correcto: `frontend/tsconfig.app.json` no define `paths` |
| `verbatimModuleSyntax` → `import type` | aplicado a `ComponentProps`, `FormEvent`, `ReactNode`, `User`, `Session` |
| `erasableSyntaxOnly` | explícito: asignación en el constructor de `ApiError`, no parameter properties; sin `enum` |
| `noUnusedLocals` / `noUnusedParameters` | razonó que `include: ["src"]` hace que `tsc -b` compile también los tests, así que los tests tienen que cumplirlo |
| oxlint `react/only-export-components` | separa `AuthContext.ts` (contexto + hook) de `AuthProvider.tsx` (solo componente). Correcto, y con margen: en `.oxlintrc.json` esa regla es `warn`, no `error` |
| Envoltorio `{ data: ... }` | identificado en `providers/api_provider.ts` y desenvuelto en el wrapper |

### Hallazgos técnicos que el plan A no tiene

Verificados uno a uno contra el repo en esta sesión:

- **400, no 401, para credenciales incorrectas.** `E_INVALID_CREDENTIALS` lleva
  `static status = 400` y el mensaje exacto `Invalid user credentials`. El 401 es solo de rutas
  protegidas. El plan A daba por hecho un 401.
- **El `loginValidator` solo exige `vine.string()` en password** (`app/validators/user.ts:23`), sin
  longitud mínima. Es exactamente donde el plan A se equivocó.
- **`convertEmptyStringsToNull: true`** en `config/bodyparser.ts`: `password: ""` llega como `null`
  y devuelve 422 `required`. El plan A ni lo menciona.
- **CSRF desactivado** (`config/shield.ts:33`) y CORS abierto en dev (`config/cors.ts:21`) → no hace
  falta proxy de Vite. Correcto.
- **Sin seeders** en `backend/database/`: hay que crear el usuario con `signup`. Correcto.
- **`frontend/package-lock.json` ya estaba modificado** en el working tree antes de empezar. Miró
  `git status`.
- Mapeo de 422 de VineJS por `field`, y regex de email más laxa que Vine, con el 422 resultante
  pintado bajo el campo. Ese nivel de detalle no aparece en el plan A.
- Rutas citadas con número de línea, y los tres `curl` de verificación del backend.

### No respetadas, o problemáticas

| Qué | Detalle |
|---|---|
| **Su propia convención de CSS hermano** | la enuncia y luego crea `SignedInView.tsx` sin `SignedInView.css`. Incoherencia interna |
| **Alcance** | 33 archivos para un ticket de cuatro requisitos. Contexto de auth, storage con type guard, wrapper de API con `ApiError`/`NetworkError`, vista de sesión iniciada y 6 ficheros de test: nada de eso lo pide FLOW-1. Parte viene de decisiones de la usuaria, pero el plan no marca la frontera entre «lo que pide el ticket» y «lo que se decidió encima» |
| **Borrado de assets** | el paso 9 borra `src/assets/` sin que nadie lo haya pedido. Es destructivo y no está señalado como decisión a confirmar |
| **Cirugía de `index.css`** | quita `width: 1126px`, `border-inline`, `text-align: center`, `code`, `.counter` y tres tokens. Va bastante más allá de «reutilizar la plantilla» |
| **6 devDependencies nuevas** | `vitest`, `jsdom`, `@testing-library/{react,dom,jest-dom,user-event}`. Decisión de la usuaria, pero en el repo con harness esto choca de frente con «Gotchas → No introducir dependencias nuevas sin justificarlas en el PR», y el plan no deja escrita esa justificación |
| **Versiones no verificables** | dice que comprobó `vitest@^5.0.1`, `jsdom@^30.0.1`, `@testing-library/jest-dom@^7.0.1` con `npm view`. Puede ser cierto, pero leyendo el plan no hay forma de saberlo: hay que ejecutarlo |
| **Convenciones de entrega** | sin `AGENTS.md` no sabe que el PR del ejercicio contiene solo `docs/harness/comparacion.md` y `prompts.md`. No es culpa del plan; es exactamente lo que el harness aporta |

## B.3 Intervenciones

**No son observables desde el plan.** A diferencia del caso A, aquí solo se tiene el documento
final, no la conversación, así que el número de turnos no se puede contar sin inventárselo. Lo
que sí deja rastro:

- **4 decisiones cerradas con la usuaria**, listadas en el propio plan: post-login mínimo sin
  router, hacer tests con Vitest, UI en español, y `fetch` nativo sin librerías. Son las mismas
  cuatro familias de duda que en el caso A, así que el agente tampoco pudo resolverlas solo.
- **1 aportación manual estructural:** pegar el ticket por captura, porque no hay acceso a Jira.
  Eso el caso A no lo necesitó.

Mínimo comparable: **4 decisiones + 1 aportación manual**, frente a **8 dudas + 2 preguntas + 1
aportación cero** del caso A. El plan B llegó con menos preguntas abiertas y más decisiones ya
cerradas; parte de eso es mérito del plan y parte es que el humano ya venía de la sesión A.

## B.4 Qué habría que arreglar a mano

1. **Recuperar el plan completo.** Está truncado en al menos cinco puntos; tal como se pegó, no
   es ejecutable de principio a fin.
2. **Verificar el ticket contra Jira.** Entró por captura: clave, estado, prioridad y «sin
   comentarios ni subtareas» son transcripción, no lectura.
3. **Acotar o trocear.** 33 archivos en un solo movimiento no se revisa bien. Como mínimo,
   separar en tres: infraestructura de tests, capa de auth (contexto + storage + cliente HTTP) y
   el formulario que pide FLOW-1.
4. **Confirmar el borrado de `src/assets/` y la cirugía de `index.css`.** Son cambios destructivos
   que el ticket no pide y que el plan da por decididos.
5. **Justificar por escrito las 6 devDependencies** en el PR.
6. **Ejecutar `npm install` y ver qué versiones instala de verdad.** Las del plan hay que
   comprobarlas, no heredarlas.
7. **Poner CSS a `SignedInView.tsx`** o corregir la convención que el plan enuncia.
8. **Abrir el seguimiento del token como ticket**, no como párrafo: logout, validación del token
   al arrancar contra `GET /api/v1/account/profile`, y router. El plan los lista y los deja ahí.
9. **Resolver el idioma.** Este plan decide español; la sesión A decidió inglés. Ver más abajo.

---

# C — Comparación

## C.1 Lado a lado

| Eje | A · con harness | B · sin harness |
|---|---|---|
| Archivos | 7 (4+3) | 33 (22+8+3) |
| Archivos de producción | 7 | 25 |
| Tests | ninguno | 6 ficheros + 2 de infraestructura |
| Dependencias nuevas | 0 | 6 |
| Convenciones citables por nombre | 10, contra `AGENTS.md` | 8, contra su propia lectura del código |
| Errores técnicos detectados | 1 falso (`.gitignore`), 1 real (validador de password) | 0 detectados en esta verificación |
| Rutas con número de línea | no | sí |
| Verificación propuesta | manual | `lint` + `build` + `test` + 3 `curl` + checklist manual |
| Ticket | leído por MCP | pegado por captura |
| Alcance frente a FLOW-1 | ajustado, se queda corto en decisión | muy por encima, sin marcar la frontera |

## C.2 Qué aportó el harness y qué no

**Aportó:**

- **Trazabilidad del ticket.** `/priority-ticket` lo encontró, lo leyó entero y lo citó con clave,
  estado, prioridad y enlace. En B ese eslabón es una captura y la memoria del humano.
- **Convenciones citables.** Poder escribir «Gotchas → No introducir dependencias nuevas sin
  justificarlas en el PR» y señalar el fichero es lo que hace que A no añada ninguna dependencia y
  B añada seis sin justificación escrita. Ambas decisiones pueden ser correctas; solo una es
  auditable.
- **Contención del alcance.** 7 archivos frente a 33. A se quedó dentro de lo que pide el ticket;
  B construyó una capa de autenticación entera.
- **Seguridad de la ejecución.** El hook de solo lectura hizo que la sesión no pudiera escribir en
  Jira ni tocar el repo aunque se le fuera la mano.

**No aportó:**

- **Profundidad técnica.** B es claramente mejor aquí: pilló el 400 vs 401, el
  `convertEmptyStringsToNull`, el CSRF desactivado, y sobre todo el `loginValidator` sin longitud
  mínima —justo donde A se equivocó—. `AGENTS.md` no sustituye a leer el código de verdad, y en A
  se notó que el agente se apoyó en el documento y exploró menos.
- **Decisión.** A abrió 8 dudas donde debía haber declarado supuestos. El harness le dio reglas de
  estilo, no criterio para decidir alcance.
- **Verificación.** B propone tests, comandos y checklist; A se queda en «esto se mira a mano». El
  harness no dice nada sobre cuándo un plan necesita tests.

## C.3 Lo que ninguno de los dos resolvió

**El idioma de la interfaz.** A propuso español, se le corrigió a inglés. B decidió español, con
`lang="es"` y todos los textos en castellano. Misma persona, mismo ticket, decisión opuesta en dos
sesiones. La decisión no vive en ningún fichero del repo, así que cada sesión la vuelve a
preguntar y puede salir distinta. Es el agujero más claro de `AGENTS.md`: tiene una sección de
estilo de código y ninguna de idioma de producto.

**Los criterios de aceptación.** FLOW-1 no tiene. Los dos planes los infirieron de las mismas
cuatro frases y llegaron a lecturas compatibles, pero ninguno los escribió en el ticket. La
siguiente sesión los volverá a inferir.

**La frontera entre ticket y decisión.** Los dos crecieron fuera de FLOW-1 —A hasta el logout, B
hasta un contexto de auth con persistencia— y ninguno marcó en su tabla de archivos qué filas
vienen del ticket y qué filas vienen de una conversación.

## C.4 Cambios que pide este ejercicio en el harness

1. **Sección de producto en `AGENTS.md`:** idioma de la interfaz, y que los tickets van en español
   aunque la app no. Es lo que habría evitado la corrección en A y la divergencia con B.
2. **Regla de decisión en `/priority-ticket`:** exigir que las dudas se entreguen como supuestos
   declarados y que «Dudas y riesgos» quede solo para lo que de verdad bloquea. Ocho dudas en un
   plan de login es una señal de que la skill premia preguntar.
3. **Paso de exploración obligatorio del backend** cuando el ticket toca una pantalla que llama a
   la API: códigos de estado reales y forma de los errores, no la que se supone. Es exactamente la
   diferencia que abrió B.
4. **Criterio de tests en la skill:** decir cuándo un plan tiene que proponerlos. A no los propuso
   porque el frontend no los tiene, que es un argumento circular.
5. **Marcar en la tabla de archivos el origen de cada fila** (ticket / decisión), para que el
   crecimiento de alcance se vea de un vistazo en la revisión.
