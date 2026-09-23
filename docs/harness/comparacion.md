# Comparación: con harness vs. sin harness

**Encargo lanzado (idéntico en ambas copias):** "Implementar login en el frontend" — ver `prompts.md`, Prompt 1.

**Inicio:** 2026-09-16 11:13:36
**Fin (reloj de 45 min):** 2026-09-16 11:58:36
**Duración real de cada corrida:** con harness 7 min 6 s (426 s) · sin harness 11 min 26 s (686 s). Las dos terminaron muy por debajo del límite de 45 min.

**Método:** cada copia se lanzó como un agente Claude Code independiente, sin memoria de esta conversación ni del otro agente, cada uno confinado a su propia carpeta. El encargo (Prompt 1 de `prompts.md`) se les entregó palabra por palabra idéntico.

**Harness montado** (solo en `flowsync-ai4devs-202609-seniors-1`):
1. `CLAUDE.md` en la raíz — orienta antes: convenciones del proyecto y prohibiciones.
2. `.claude/settings.json` con hook `PostToolUse` sobre `Edit|Write` que corre `npm run lint` (oxlint) en `frontend/` — comprueba después.

`flowsync-sin-harness` es una copia idéntica del proyecto en el mismo commit, sin ninguna de las dos piezas.

---

## Parte A: la comparación

### 1. Qué archivos tocó (contados, verificado con `git status`, sin contar las piezas del harness que yo ya había puesto)

| | Con harness | Sin harness |
|---|---|---|
| Archivos creados | 10 (`api/client.ts`, `api/auth.ts`, `auth/AuthContext.ts`, `auth/AuthProvider.tsx`, `auth/useAuth.ts`, `components/LoginForm.tsx`+`.css`, `pages/HomePage.tsx`+`.css`, `.claude/launch.json`) | 10 (`api/client.ts`, `api/auth.ts`, `auth/AuthContext.tsx`, `auth/useAuth.ts`, `pages/LoginPage.tsx`+`.css`, `pages/DashboardPage.tsx`+`.css`, `.env.example`, `.claude/launch.json`) |
| Archivos modificados | 3 (`App.tsx`, `App.css`, `main.tsx`) | 4 (`App.tsx`, `App.css`, `.gitignore`, **+4 archivos de `backend/.adonisjs/**` con diff residual de fin de línea CRLF/LF, sin cambio de contenido**) |
| Total | 13 | 13 sustantivos + 4 residuales en `backend/` |

Diferencia real: la copia **con harness** terminó con `backend/` completamente limpio (`git status` no muestra nada bajo `backend/`). La copia **sin harness** también intentó revertir sus cambios accidentales en `backend/.adonisjs/**` con `git checkout`, pero **el revert no se aplicó del todo**: quedaron 4 archivos marcados como modificados (ruido de CRLF/LF, sin cambio de contenido real, verificado con `git diff`). El agente incluso lo reportó como resuelto en su resumen y no lo estaba.

### 2. Qué convenciones del proyecto respetó y cuáles no (nombrándolas una a una)

**Con harness** (convenciones definidas en `CLAUDE.md`):
- [x] TypeScript estricto, sin `any` — `npm run build` (tsc) pasa limpio
- [x] Componentes funcionales con hooks, sin clases
- [x] Un componente por archivo, PascalCase
- [x] Llamadas a la API centralizadas en `frontend/src/api/`
- [x] Maneja estado de error y de carga en formularios
- [x] No inventó rutas de backend inexistentes (verificado contra `backend/start/routes.ts` con `curl`)
- [x] No tocó `backend/` — confirmado con `git status`, cero diffs
- [x] No instaló dependencias nuevas — no agregó `react-router`, usa switch condicional en `App.tsx`
- [x] No guardó la contraseña en texto plano — solo el token en `localStorage`

**Sin harness:**
- No había ningún `CLAUDE.md` ni regla escrita — esa es la respuesta y vale. Pero el agente **sí encontró contexto no controlado**: leyó el `README.md` del repo (que existe en ambas copias porque venía del `cp -R`, no es parte del harness que monté) y ese README menciona que esta copia "no debía tocarse" como parte del ejercicio de comparación. El agente lo señaló explícitamente y decidió implementar de todas formas porque la instrucción venía directo del usuario. **Dato importante:** la copia "pelada" nunca estuvo 100% pelada — el README preexistente ya filtraba información de proceso que un CLAUDE.md normalmente daría.
- Sin ninguna regla de "no instalar dependencias", igual decidió por su cuenta no meter `react-router` (mismo criterio que la copia con harness) — aquí las dos salidas **no se separaron**, que también es un dato: ese punto del encargo no distingue con o sin harness.
- Sin la regla explícita "no tocar backend/", terminó dejando 4 archivos de `backend/.adonisjs/**` con diffs residuales (ver punto 1) — la copia con harness no tuvo ese problema.

### 3. Cuántas veces tuviste que intervenir (corregir, aclarar, repetir el encargo, pararlo en seco)

| | Con harness | Sin harness |
|---|---|---|
| Intervenciones mías (yo, el humano) | 0 — lancé el ticket una vez y dejé correr | 0 — lancé el ticket una vez y dejé correr |
| Autocorrecciones del propio agente (reportadas) | 3 | 4 |

No intervine en ninguna de las dos corridas mientras trabajaban (ambas corrieron sin supervisión en background). Las autocorrecciones fueron del agente sobre sí mismo:
- **Con harness:** error de coordenadas de click en el navegador (corregido usando `ref` de accesibilidad), un `launch.json` con argumentos de `npm` mal ordenados, y el revert de archivos de `backend/` regenerados por error (sí funcionó).
- **Sin harness:** warning de oxlint por regla de Fast Refresh, colisión de puerto/servidor con el proyecto hermano (sirvió el proyecto equivocado por compartir nombre `"frontend"` y puerto 5173 en el `launch.json` de nivel superior), backend de prueba equivocado (tuvo que crear usuario nuevo), y el revert incompleto de `backend/` (intentado, no logrado del todo).

⚠ Nota sobre el punto 2 de la tabla: la colisión de puerto que sufrió la copia sin harness fue un problema de **mi configuración de entorno** (un único `launch.json` compartido a nivel de `AI4Devs 2026/`, no por repo), no algo inherente a tener o no harness. Lo dejo anotado para no atribuirle a la falta de harness un problema que en realidad causé yo al preparar el entorno.

### 4. Qué te tocaría arreglar a mano antes de enseñárselo a alguien de tu equipo

**Con harness:**
- Nada estructural. Revisaría el mensaje de error genérico del login (agrupa 400/401 en un solo texto) por si el equipo quiere distinguir "usuario no existe" de "contraseña incorrecta".
- Borrar el usuario de prueba que quedó en la BD local de desarrollo.

**Sin harness:**
- Los mismos dos puntos de arriba, más: limpiar los 4 archivos de `backend/.adonisjs/**` que quedaron con diff residual (`git checkout -- backend/`).
- Decidir un nombre único de pantalla principal entre las dos copias si en algún momento se van a fusionar (`HomePage` vs `DashboardPage` — puramente cosmético, pero hay que elegir uno).
- Revisar que `.env.example` del frontend (que esta copia sí creó y la otra no) sea la convención que el equipo quiere adoptar también en la copia con harness.

---

## Parte B: las tres líneas

1. **Qué piezas montaste y cuál te costó más de lo esperado.**
   Monté dos: `CLAUDE.md` (orienta antes, con convenciones y prohibiciones) y un hook `PostToolUse` en `.claude/settings.json` que debía correr `npm run lint` automáticamente tras cada `Edit`/`Write` (comprueba después). La que me costó más fue la segunda, y no por escribirla — el YAML/JSON en sí fue rápido — sino porque **no tengo forma confirmada de verificar que realmente se disparó** durante la corrida del agente (el resumen del agente solo dice que corrió `npm run lint` él mismo al final, algo que la copia sin ninguna pieza de "comprueba después" también hizo por iniciativa propia). Monté el chequeo automático y no puedo asegurar que cambió algo.

2. **La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla.**
   No fue nada del código de login en sí — fue comparar los dos `git status --porcelain` lado a lado justo después de que terminaran los dos agentes. La copia con harness quedó con `backend/` completamente limpio; la copia sin harness tenía 4 archivos de `backend/.adonisjs/**` marcados como modificados (ruido de fin de línea, sin cambio real), a pesar de que el propio agente sin harness reportó en su resumen que los había revertido. Tuve que correr `git diff` sobre esos 4 archivos para confirmar que era solo ruido de CRLF y no contenido real.

3. **Algo que dejaste escrito en el harness y que el agente no cumplió igualmente.**
   Esto conecta con la línea 1: escribí un hook para que el linter corriera automático tras cada edición, pensado para pillar errores de formato/estilo en tiempo real sin que el agente tuviera que acordarse de hacerlo. No tengo evidencia de que el hook se haya disparado ni una sola vez — solo sé que al final el `lint` pasaba limpio, igual que en la copia que nunca tuvo esa pieza. Un archivo de instrucciones sube la probabilidad de que algo pase, pero un hook mal verificado no garantiza nada, y este es exactamente el punto donde se me cae la certeza.
