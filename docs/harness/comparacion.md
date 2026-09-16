# Comparación: con harness vs sin harness — FLOW-1

Mismo ticket (FLOW-1, «Diseño y conexión de autenticación y perfil de usuario»), mismo
prompt, mismo modelo (Opus 5, 1M context, high effort), misma base de partida
(`e908449`, rama `s1/start`). Lo único distinto es el harness.

**Dos avisos de método, antes de leer nada:**

1. **Este archivo lo escribió el lado con harness.** Las casillas que son juicio tuyo o
 que solo tú puedes contabilizar están marcadas y vacías. Lo que sí está lleno son
 hechos comprobables contra los dos árboles de trabajo.
2. **Las dos ejecuciones no son un A/B limpio.** El enunciado del ejercicio decía que en
 la copia pelada solo se pidiera un *plan*, y el prompt que se lanzó pedía implementar.
 El lado sin harness detectó esa contradicción y se paró a preguntar; hubo que
 insistirle para que ejecutara (está documentado en `prompts.md`, «Prompt 6 -ejecutado
 sin harness-»). Eso condiciona la casilla 3.

---

## La comparación

### Casilla 1 — Qué archivos tocó, contados


|                                     | Con harness                                 | Sin harness                                            |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| **Archivos tocados en `frontend/`** | **34**                                      | **17**                                                 |
| — de ellos, archivos de prueba      | 7                                           | 0                                                      |
| — de ellos, código y configuración  | 27                                          | 17                                                     |
| **Líneas**                          | +1717 / −308 (+1674 / −307 sin el lockfile) | +631 en archivos nuevos, +101 / −304 en los rastreados |
| **Commits**                         | 7                                           | 0 — todo en el árbol de trabajo, sin `git add`         |
| `backend/`                          | no tocado                                   | no tocado                                              |


Los dos coinciden en el esqueleto: `src/lib/` para el cliente de API, `src/auth/` para la
sesión y los guardas, `src/pages/` para las tres pantallas, `react-router` 7, token en
`localStorage` bajo la clave `flowsync.token`, y los dos borraron los assets de la demo de
Vite.

Dónde se separan, archivo por archivo:


|                   | Con harness                                                                                                                      | Sin harness                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Cliente de API    | `lib/api-client.ts` + `lib/api-messages.ts` (traducción) + `lib/auth-api.ts` (las 4 llamadas tipadas) + `lib/session-storage.ts` | `lib/api.ts`, un solo archivo de 64 líneas                               |
| Guardas           | `auth/RequireAuth.tsx` y `auth/GuestOnly.tsx`, uno por archivo                                                                   | `auth/RouteGuards.tsx`, los dos juntos                                   |
| Formularios       | `pages/FormField.tsx` compartido + `lib/form-validation.ts` + `lib/form-errors.ts`                                               | validación y maquetado repetidos dentro de cada página                   |
| Estilos           | reescribe `src/App.css` y añade tokens de error a `src/index.css`                                                                | borra `src/App.css`, añade `pages/auth.css`, **no toca `src/index.css`** |
| Paquete           | `react-router`                                                                                                                   | `react-router-dom`                                                       |
| Config de entorno | nota en `frontend/README.md`                                                                                                     | **`frontend/.env.example`** (esto el lado con harness no lo hizo)        |
| Pruebas           | 7 archivos, 29 pruebas                                                                                                           | ninguna                                                                  |
| `index.html`      | `lang="es"` y `<title>FlowSync</title>`                                                                                          | sin tocar: sigue en `lang="en"` y `<title>frontend</title>`              |


### Casilla 2 — Qué convenciones respetó y cuáles no, una a una

#### Sin harness: **no había ninguna convención escrita en ninguna parte.**

Esta es la respuesta, y es literal. Lo verifiqué contra el árbol de la base común
(`git ls-tree -r e908449`): en esa copia no existe `CLAUDE.md`, ni `AGENTS.md`, ni
`.claude/agents/`, ni hooks, ni `.editorconfig`. Su `frontend/package.json` **no tiene
script `test` ni `typecheck`** — los añadió el commit del harness (`925d826`), no la base.
Tampoco había un solo archivo de prueba del que copiar la forma. Lo único escrito que
existía en los dos lados es `.oxlintrc.json` con dos reglas, y lo respeta.

Así que no hay una lista de «respetó / no respetó»: no había nada que respetar. Lo que
sí se puede decir es qué eligió por su cuenta, y dónde eso choca con lo que había
alrededor:

- **Siguió la convención del framework** sin que nadie se lo dijera: componentes en
PascalCase, módulos en kebab-case, ESM, TS estricto. `npm run lint` y `npm run build`
pasan limpios.
- **Dejó restos de la demo.** Borró `App.css` y los assets, pero no tocó `src/index.css`,
que sigue con las reglas `.counter` (línea 99) y `#social .button-icon` (línea 48) de
elementos que ya no existen, y con el `text-align: center` de la plantilla.
- **Eligió `react-router-dom`**, que en la v7 es el alias heredado; el paquete que la
propia v7 documenta es `react-router`. Funciona igual.
- **No arrancó `git`.** Cero commits: el trabajo está solo en el árbol, sin historia ni
mensajes. Como no había modelo de commits escrito, tampoco había nada que incumplir.

#### Con harness: siete convenciones escritas, seis cumplidas

Todas salen de `CLAUDE.md` o de `.claude/ryndem.json`:


| Convención (dónde está escrita)                                                              | ¿Se cumplió?                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identificadores en inglés, comentarios y documentación en español (`language.default: "en"`) | Sí                                                                                                                                                                                                                    |
| Pruebas `*.test.tsx`, nunca `*.spec.ts` (para no disparar `validate-test-names.py`)          | Sí — los 7 archivos son `.test.tsx` / `.test.ts`                                                                                                                                                                      |
| Consultar por rol y nombre accesible, no por clase CSS                                       | Sí — `getByRole` / `getByLabelText` en las 29 pruebas                                                                                                                                                                 |
| Conventional Commits, scope preferentemente omitido, sin trailer `Ticket:`                   | Sí — los 7 commits                                                                                                                                                                                                    |
| No incluir `backend/package-lock.json` en un commit sin mirarlo                              | Sí — sigue modificado y fuera de los 7 commits (y es idéntico al de la copia pelada: es anterior a las dos ejecuciones)                                                                                               |
| `npm run typecheck` completo antes de cerrar un cambio que altera una interfaz               | Sí                                                                                                                                                                                                                    |
| Pedir el subagente `revisor-frontend` al cerrar un cambio                                    | Parcial — se pidió una sola vez, al final, no al cerrar cada commit. Además el subagente **no estaba registrado en la sesión** y hubo que reconstruirlo a mano indicándole que leyera su propio archivo de definición |


Y una que se incumplió de principio a fin: ver la tercera línea de la Parte B.

### Casilla 3 — Cuántas veces tuviste que intervenir

- **Sin harness: 2.** Primero identificó en el [README.md](http://README.md) del repositorio que no debía ejecutar lo que le había pedido. Estaba equivocado porque **las instrucciones originales son confusas.** Después de pedirle que ignorara eso y si ejecutara el ejercicio, el agente hizo el plan y se paró antes de tocar nada y volvió a preguntar si implementaba o solo planificaba.
- **Con harness: Ninguna**

> Ojo con un matiz que hace ruido en esta casilla: **la parada del lado sin harness no fue
> torpeza, fue el enunciado.** El README de esa copia dice «no apliques el plan en ninguna»
> y el prompt pedía implementar. El lado con harness no se topó con esa contradicción
> porque su README no es el de la copia pelada.

### Casilla 4 — Qué habría que arreglar a mano antes de enseñárselo a alguien del equipo

#### Sin harness — defectos concretos, verificados leyendo el código

1. **`pages/LoginPage.tsx:44-48` — miente sobre el error.** Cualquier fallo que no sea de
 red se muestra como *«El correo o la contraseña no son correctos»*. Un 422, un 500 o un token mal formado le dicen a la persona que se equivocó de contraseña. Comparado con su propio `SignupPage.tsx`, que sí mapea `error.fieldErrors` campo por campo: las dos pantallas no se comportan igual ante el mismo tipo de error.
2. **`lib/api.ts:57` — `return body?.data as T` sin condición.** `POST /account/logout` responde `{ "message": ... }` sin envolver en `data`, así que esa llamada devuelve
 `undefined`. Hoy no rompe nada porque el resultado se descarta, pero el `as T` está mintiendo al compilador y el próximo endpoint sin sobre se lleva el fallo.
3. **`auth/AuthProvider.tsx:42,44-49` — una petición de más en cada login.** El `useEffect` depende de `[token]` (línea 42) y `login()` cambia el token (línea 48), así que después de cada inicio de sesión se dispara un `GET /account/profile` extra con datos que ya tenía en la mano.
4. **`auth/RouteGuards.tsx:9,18` — pantalla en blanco mientras carga.** `if (isLoading)  return null`. Al refrescar con sesión, la persona ve blanco hasta que responde el perfil.
 Además `isLoading` arranca en `true` aunque no haya token (`AuthProvider.tsx:12`), así que también parpadea en `/login`.
5. **Errores sin enlazar a su campo.** No hay `id` en los inputs ni `aria-invalid` / `aria-describedby`: el `<label>` envuelve al input (el nombre accesible funciona), pero
 un lector de pantalla no anuncia el mensaje de error al enfocar el campo.
6. **`localStorage` sin proteger** (`auth/AuthProvider.tsx:10`): en ventana privada o con
 el almacenamiento bloqueado, el acceso lanza y se lleva por delante el arranque.
7. **`src/index.css` con CSS muerto** de la demo borrada, y **`index.html` sin tocar**:
 la pestaña dice «frontend» y `lang="en"` con toda la interfaz en español.
8. **Cero pruebas y cero commits.** No hay nada que revisar en un PR: es un árbol de
 trabajo sucio, sin historia, sin mensajes y sin red de seguridad.

#### Con harness

**Ninguna**

---

## Parte B — Las tres líneas

### 1. Qué piezas montaste, y cuál te costó más de lo que esperabas

- `CLAUDE.md` (raíz)
- `.claude/ryndem.json` — `class: tooling`, `stacks: []`, `language.default: "en"`
- `.claude/settings.json` — hook `PostToolUse` sobre `Write|Edit` + hook `SessionStart`
- `.claude/verify-frontend.sh` — oxlint + `tsc --noEmit` acotado al archivo editado
- `.claude/agents/revisor-frontend.md` — subagente de solo lectura
- `.claude/ensure-standards.sh` + plugin `ryndem-standards@ryndem`
- Vitest sobre jsdom + Testing Library + `src/test-setup.ts` + 2 pruebas de `App`

### 2. La primera diferencia que viste entre las dos salidas, y dónde estabas mirando

La ejecución con harness realizó el trabajo de principio a fin sin mi intervención y sin harness requirió mi intervención en dos ocasiones (en parte por la confusión de las instrucciones).

### 3. Algo que dejaste escrito en el harness y que el agente no cumplió igualmente

**El hook `PostToolUse` no se disparó ni una sola vez en toda la tarea.**

Está escrito negro sobre blanco en dos sitios: `.claude/settings.json` lo engancha sobre
`Write|Edit`, y `CLAUDE.md` lo describe como *«se dispara sola […] No hay que invocarlo ni
recordarlo: corre solo al terminar de editar»*. Esa era la pieza que, según el propio
documento, *«atrapa lo mecánico»*.

No corrió porque **escribí los 34 archivos con `cat > … <<EOF` y scripts de Python desde
Bash**, y el hook solo escucha a las herramientas `Write` y `Edit`. La sesión traía una
instrucción de modo que decía justo eso — hacer los cambios con `sed`, heredocs o scripts
cortos en vez de las herramientas dedicadas — así que las dos reglas escritas se
contradecían y ganó la que no era del repositorio.

El resultado no se notó en el producto, porque acabé corriendo `oxlint` y `tsc -b` a mano
después de cada tanda. Pero eso es exactamente el punto: **la garantía la dio mi criterio,
no el harness.** Si la tanda siguiente se me olvida, nadie avisa. El hook que escribiste
para no tener que confiar en que el agente se acuerde estuvo inerte las tres horas.

Dos secuelas más pequeñas del mismo tipo, ya anotadas arriba: el subagente
`revisor-frontend` **no estaba registrado** en la sesión pese a existir su archivo (hubo
que arrancar un agente genérico y decirle que leyera su propia definición), y los dos
marcadores `<pendiente: …>` que `CLAUDE.md` deja abiertos en «Trampas conocidas» y «Áreas
sensibles» siguen vacíos, aunque esta tarea produjo justo el tipo de hallazgo que pedían.