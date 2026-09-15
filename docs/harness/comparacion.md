# Comparación: misma tarea con harness y sin harness

**Ticket:** FLOW-5 — Registro de nuevo usuario desde la web
**Modelo/herramienta:** Claude Code (mismo en ambas)
**Prompt:** idéntico palabra por palabra en las dos copias (ver `prompts.md`)
**Un solo intento por copia, sin reintentos.**

**Harness montado (solo en una copia):**
- `CLAUDE.md` en la raíz — 2 reglas: (1) las validaciones de cualquier formulario se leen de `backend/app/validators/user.ts` como fuente de verdad; (2) `backend/` es de solo lectura.
- `.claude/settings.json` — hook `PostToolUse` con matcher `Edit|Write` que ejecuta `cd frontend && npm run lint && npx tsc -b`.

## Comparación

| | Sin harness | Con harness |
|---|---|---|
| **Archivos tocados** | 3 (`App.tsx`, `App.css`, `SignupForm.tsx`) | 5 (`App.tsx`, `App.css`, `signup/SignupForm.tsx`, `signup/validation.ts`, `signup/api.ts`) |
| **Organización** | un archivo plano, constantes locales | carpeta `src/signup/`, validación y API separadas, constantes exportadas |
| **Regla 1 — leer el validador** | **cumplida sin tenerla escrita**: 254 / 8 / 32 correctos | cumplida: 254 / 8 / 32 correctos, cita el archivo en su resumen |
| **Regla 2 — no tocar `backend/`** | **cumplida sin tenerla escrita** | cumplida; enuncia la prohibición literalmente en su resumen |
| **`fullName`** (campo que el ticket no menciona) | enviado como `null` | enviado como `null` |
| **`passwordConfirmation`** (campo que el ticket no menciona) | duplica la clave en silencio; el usuario nunca confirma | añade un tercer campo real y avisa del cambio respecto al requerimiento |
| **Intervenciones** | **0** | **0** |

*(`backend/package-lock.json` y `frontend/package-lock.json` aparecen modificados en ambas copias: son del `npm install` del setup, no del agente. Verificado con `git diff --stat backend/`.)*

### Qué habría que arreglar a mano antes de enseñarlo al equipo

- **Sin harness:** el `passwordConfirmation` duplicado es el problema serio — satisface la API mintiendo sobre el contrato. Hay que convertirlo en un campo real.
- **Ambas:** sin tests. Ninguna comprobación automática verifica que el `8` sea el número correcto — `tsc` valida tipos, no valores, y `oxlint` tampoco lo mira. Los límites quedan duplicados entre `validators/user.ts` y el frontend; a la primera vez que cambien, el cliente miente.
- **Ambas:** ninguna se probó en navegador, solo con `curl`.
- **Ambas:** quedó un usuario de prueba en la base de datos local.

## Parte B

**1. Qué piezas monté y cuál costó más de lo esperado.**
`CLAUDE.md` (2 reglas) y un hook `PostToolUse` en `.claude/settings.json`. El rato se me fue en el `CLAUDE.md`, y no por escribirlo: mi primera versión copiaba los límites (8, 32, 254) dentro del archivo. Eso duplica el dato y además le da la respuesta al agente, así que no mide nada. Reescribirlo para que forzara un comportamiento — "abre el validador y úsalo como fuente de verdad" — en vez de repetir un número fue lo que costó. También lo coloqué primero en `backend/`, donde no se carga al arrancar.

**2. La primera diferencia que vi y dónde estaba mirando.**
En el resumen de cada corrida, comparando cómo resolvieron `passwordConfirmation`, un campo que el backend exige y que mi ticket no menciona. La copia pelada envía la misma clave dos veces sin decírselo al usuario; la del harness añadió un tercer campo. Lo confirmé abriendo `signup/api.ts` y `SignupForm.tsx`. Lo que **no** vi fue diferencia en lo que mi harness sí pretendía forzar: las dos acertaron 254 / 8 / 32 y ninguna tocó `backend/`. La pelada fue a leer el validador por su cuenta, sin que nadie se lo pidiera.

**3. Algo que dejé escrito en el harness y que aun así no pasó.**
El hook. Está en `.claude/settings.json`, versionado, y **no tengo ninguna evidencia de que llegara a ejecutarse**: no vi salida de `oxlint` ni de `tsc` entre las ediciones del agente. Puede que corriera en silencio al pasar en verde, o puede que no se disparara nunca; el caso es que monté media pieza de harness y no sé si actuó. Y aunque hubiera corrido, ya sabía de antes que no habría cazado el error que me importaba: si el agente hubiera puesto `minLength={6}`, `tsc` lo da por bueno (6 es un `number` válido) y `oxlint` no mira reglas de negocio. Un hook en verde no dice que esté bien.

**Sobre las dos reglas del `CLAUDE.md`:** las dos se cumplieron, pero no puedo afirmar que se cumplieran *por* estar escritas — la copia sin ellas hizo lo mismo. Con una sola corrida por lado tampoco puedo distinguir si la diferencia de estructura (`src/signup/` frente a archivo plano) la causó el harness o simplemente el no-determinismo del modelo. Lo más honesto que puedo decir es que este ticket concreto no llegó a ejercer ninguna de mis dos reglas.
