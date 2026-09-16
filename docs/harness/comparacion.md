# Monta el harness y mide la diferencia — FlowSync

**Encargo:** FLOW-1 «Registro e inicio de sesión de usuarios», escrito en mi tablero de Jira en
lenguaje de producto, con criterios de aceptación y sin detalle técnico.

**Método:** dos copias hermanas del repo en `s1/start`, idénticas salvo el harness. Mismo prompt
palabra por palabra, mismo modelo (Opus 5 · Máx), misma herramienta (Claude Code en terminal), plan
mode en las dos, sesión sin historial en las dos. Se comparan **los planes**; no se aplicó ninguno.

**Harness montado** (solo en una copia), dos piezas de familias distintas:

| Familia | Pieza |
|---|---|
| Orienta antes | `CLAUDE.md` — 67 líneas: convenciones, reglas de proceso, prohibiciones, gotchas |
| Comprueba después | `.claude/agents/adversarial-reviewer.md` — revisor cuyo encargo es romper el cambio, no aprobarlo |

---

## La comparación

| | **CON harness** | **SIN harness** |
|---|---|---|
| **Archivos que propone tocar** | **24** (16 nuevos + 8 modificados) | **31** (24 nuevos + 6 modificados + 1 borrado) |
| **Subagentes de exploración** | 2 | **3** — uno, *"project docs and conventions"*, buscando convenciones que ahí no existen |
| **Preguntas antes de planificar** | 4 | 4 |
| **Sus 2 preguntas propias** | `fullName` (contrato) · conexión :5173→:3333 (integración) | idioma de la UI · qué hacer con la plantilla de Vite (producto) |
| **Trampas del backend documentadas** | 8 | **15** |
| **Decisión sobre CORS** | Proxy de Vite + `VITE_API_URL` | **Sin proxy**: *"producción será otro origen igualmente… un proxy solo escondería los problemas de CORS hasta el despliegue"* |
| **Invocó al `adversarial-reviewer`** | **NO** | n/a |

### 1 · Qué archivos tocó

24 frente a 31. La copia pelada propone una estructura más granular: `api/config.ts`, `api/types.ts`
y `api/client.ts` separados, `routes/` como carpeta propia, cuatro hojas de estilo en vez de una, y
una `NotFoundPage` que la otra no contempla.

**Ninguna de las dos tocó `backend/`**, que era la restricción principal del encargo.

### 2 · Qué convenciones respetó y cuáles no

**El hallazgo incómodo: las respetaron las dos, y la pelada además encontró más.**

Convenciones que yo había escrito en el `CLAUDE.md`:

| Convención escrita en el harness | Con harness | Sin harness |
|---|:-:|:-:|
| `frontend/` usa **oxlint**, no eslint | ✅ | ✅ *(lo dedujo de `package.json`)* |
| **No hay Prettier en `frontend/`** | ✅ | ✅ *(y añadió el estilo a igualar a mano)* |
| No tocar `backend/` | ✅ | ✅ |
| No añadir dependencias sin justificar | ✅ **citando `CLAUDE.md` por su nombre** | ✅ *(la justificó igual, sin que nadie se lo pidiera)* |
| Leer el contrato real antes de construir | ✅ | ✅ |
| No versionar `.env` | ✅ | ✅ |

Los tres huecos que el ticket ocultaba a propósito:

| Hueco | Con harness | Sin harness |
|---|:-:|:-:|
| `passwordConfirmation` obligatorio | ✅ | ✅ |
| `fullName` es `nullable()`, **no `optional()`** → la clave debe viajar siempre | ✅ | ✅ |
| Credenciales inválidas → **400, no 401** | ✅ | ✅ |
| Respuestas envueltas en `data`, salvo `logout` | ✅ | ✅ |
| Asimetría `data.user` (signup/login) vs `data` (profile) | ✅ | ✅ |
| Signup responde **200, no 201** | ✅ | ✅ |

**Y siete trampas que solo encontró la copia PELADA:**

`allowImportingTsExtensions` · `StrictMode` duplica el efecto de bootstrap · `tsc -b` es incremental
· `strict` está **apagado** en `tsconfig.app.json` · CSRF desactivado · el token no caduca · la regla
`react/only-export-components` de oxlint

### 3 · Cuántas veces tuve que intervenir

**Las mismas: 4 preguntas cada una, más un Submit.** Ninguna necesitó corrección ni repetición del
encargo.

### 4 · Qué me tocaría arreglar a mano

**De ninguna de las dos, nada evidente.** Los dos planes son ejecutables y respetan las
restricciones. La diferencia no está en la corrección, está en el encuadre: el de la copia con
harness es **más corto y más decidido**; el de la pelada es **más exhaustivo y explica más sus
trade-offs** — incluso me corrige en la decisión de CORS con un argumento que yo no había
considerado.

---

# Parte B — las tres líneas

### 1. Qué piezas monté y cuál me costó más de lo que esperaba

Monté dos: el **`CLAUDE.md`** (67 líneas) y el subagente **`adversarial-reviewer`**.

Escribirlas fue rápido, unos 15 minutos, porque ya había explorado el repo. **Lo que me costó el rato
de verdad no fue ninguna pieza: fue el aislamiento del entorno.** Perdí 27 de los 45 minutos en una
corrida que hubo que descartar entera, porque la sesión arrancó con el directorio de trabajo
equivocado —vacío—, salió a buscar el proyecto por el disco y acabó leyendo mis propias notas de
evaluación, incluidas las que marcan los huecos. El agente lo detectó y me lo dijo sin que se lo
preguntara, antes de seguir.

**Lección:** el aislamiento del contexto no es del proyecto, es **del directorio de la sesión**. Dos
copias separadas no sirven de nada si el resto del disco es alcanzable.

### 2. La primera diferencia que vi entre las dos salidas, y en qué me fijé para verla

**En las preguntas que cada una me hizo antes de planificar, no en los planes.** Las dos hicieron
cuatro. Dos coinciden (router y dónde guardar el token). Las otras dos son de naturaleza distinta:

- **Con harness:** *"El backend exige enviar siempre `fullName`, pero acepta null. ¿Qué hacemos en el
  formulario de registro?"* y *"¿Cómo alcanza el frontend (:5173) al backend (:3333)?"*
- **Sin harness:** *"¿En qué idioma escribo los textos que ve el usuario?"* y *"Hoy `App.tsx` es la
  pantalla de plantilla de Vite. ¿Qué hago con ella?"*

Estaba mirando la barra de preguntas de las dos terminales en paralelo. Una me devolvía ambigüedad
**del contrato**; la otra, ambigüedad **de producto**. Ambas legítimas, pero solo una me obligaba a
decidir algo que el ticket no podía responder por sí solo.

### 3. Algo que dejé escrito en el harness y que el agente no cumplió igualmente

**El subagente `adversarial-reviewer`.** Lo declaré con
`description: "Úsalo SIEMPRE después de implementar o modificar código, antes de darlo por
terminado"`, y **el plan no lo menciona ni una vez**. Su sección de verificación son los pasos
manuales de siempre: `npm run lint`, `npm run build` y un recorrido a mano.

Admite una defensa parcial —en plan mode todavía no se ha implementado nada, así que el *"después de
implementar"* aún no había llegado—, pero la pieza tampoco aparece **en el plan de verificación**,
que es donde le tocaba estar. La mitad «comprueba después» de mi harness, en esta corrida, **no se
activó sola**. Escribir un revisor no lo pone en el circuito.

---

# Lo que realmente aprendí

**La hipótesis con la que llegué era que el harness haría que el agente descubriera el contrato real
en vez de inventárselo. Los datos no la sostienen: las dos copias lo descubrieron, y la pelada
encontró siete trampas más.**

La lectura honesta es que **escribí en el `CLAUDE.md` las convenciones equivocadas**. Todo lo que
puse —oxlint en vez de eslint, que no hay Prettier en el frontend, migration-first— **era deducible
leyendo `package.json` y el código**. Un agente competente con tiempo llega solo. Escribirlo le
ahorró exploración, no le dio conocimiento.

**Lo que un `CLAUDE.md` sí compra, y yo no aproveché:** lo que *no* está en el código. Por qué se
tomó una decisión, qué se intentó y se descartó, qué está prohibido por acuerdo de equipo y no por
restricción técnica, qué parte del sistema es frágil por razones que no se ven en el diff.

La copia pelada llegó a las mismas conclusiones **gastando más**: tres subagentes en vez de dos, y
uno de ellos —*"Explore project docs and conventions"*— buscando documentación que ahí no existe. El
harness no cambió *qué* se sabe; cambió *cuánto cuesta saberlo*. En un repo pequeño y limpio como
este, ese ahorro es marginal y se pierde en el ruido.

**La prueba de verdad es un legacy grande con convenciones implícitas — que es exactamente mi día a
día, y no era este proyecto.**
