# Comparación: con harness vs. sin harness — FLOW-1

**Ticket:** FLOW-1 — "Crear en el frontend login y registro de usuario".

**Encargo lanzado, idéntico en ambas copias:**

> Necesito crear un login donde el username sea el nif y la contraseña de al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial. Que no permita que un usuario esté logueado 2 veces en distintas sesiones. Que pueda regenerar la contraseña.

## Piezas de harness montadas en esta copia

- **Orienta antes**: `AGENTS.md` (stack, comandos, convenciones de AdonisJS/Lucid, convenciones de frontend) + `CLAUDE.md` (restricciones de proceso del ejercicio: no tocar `backend/`, no reestructurar `prompts.md`/`README.md`, no hacer push a `upstream`, no desactivar el hook).
- **Comprueba después**: hook `PostToolUse` (`.claude/settings.json` + `.claude/hooks/lint-test.sh`) — corre lint (y tests si existen) del subproyecto correspondiente tras cada edición.

## Parte A — La comparación

| | Con harness | Sin harness |
|---|---|---|
| **Archivos que planea tocar** | 8 (todos en `frontend/`) | ~20 (9 en `backend/` + 11 en `frontend/`) |
| **Convenciones respetadas** | Respeta "no tocar `backend/`" (la única escrita) — marca 3 de los 4 requisitos del ticket como fuera de alcance en vez de implementarlos a medias o simulados | No había ninguna convención escrita en esta copia — implementa los 4 requisitos, incluyendo cambios en `backend/` |
| **Veces que intervine** | 8 prompts en total, pero 6 son construir el propio harness (exploración, `AGENTS.md`, hook, corregir su alcance, `CLAUDE.md`); solo 2 son sobre la tarea real | 3 prompts; 1 se perdió por un problema de cuenta de Jira (el MCP conectó la cuenta de empresa en vez de la personal) — no atribuible al harness |
| **Qué tocaría a mano** | Nada a nivel de plan; no llegué a pedir la implementación, así que no hay código todavía que revisar | Antes de nada, decidiría si de verdad quiero ese alcance de backend — el plan lo da por hecho sin preguntarlo |

**Nota sobre el fallo de Jira en la copia sin harness:** no lo cuento como una diferencia causada por el harness. Es el mismo problema de alcance de `.mcp.json` que la carpeta hermana hereda desde la raíz del workspace — se resolvió desactivando el servidor MCP con `disabledMcpjsonServers` en el `.claude/settings.local.json` de esa copia, no añadiendo ninguna pieza de harness.

**Observación honesta:** la copia sin harness no es un plan descuidado — explora el backend con el mismo nivel de detalle (los mismos endpoints, la misma ausencia de regla de complejidad de password, la misma tabla de tokens) y documenta sus propias suposiciones con cuidado. La diferencia no está en la calidad del razonamiento, está en el **alcance que se permite a sí misma tocar**.

## Parte B — Las tres líneas

**Qué piezas monté y cuál me costó más de lo esperado:**
`AGENTS.md`, `CLAUDE.md` y el hook de lint/test. Lo que más se me fue el rato fue el hook: la primera versión que generó Claude Code se creó a nivel del workspace del bootcamp (afectando a todos mis proyectos, no solo a este repo), y tuve que pedir explícitamente que lo hiciera específico de este proyecto. Pero lo veo más atribuible al entorno que he montado, que es un poco complejo por una razón: quiero poder trabajar en 2 portátiles diferentes de forma indistinta, y lo que tengo se sincroniza y me avisa de cambios en proyectos. Pero me encuentro con conflictos agenos al proyecto.

**La primera diferencia que vi entre las dos salidas, y en qué me fijé para verla:**
El tamaño de los dos planes de implementación: la copia con harness solo toca `frontend/` (8 archivos), la copia sin harness toca también `backend/` (9 archivos más). Me di cuenta comparando directamente el número de archivos listados en cada plan, sin necesidad de abrir código.

**Algo que dejé escrito en el harness y que el agente no cumplió igualmente:**
No tengo un caso confirmado todavía — en esta copia paré en la fase de plan (le pedí explícitamente que no implementara, solo que generara `plan-flow-1.md`), así que no llegué a ver el hook de lint/test disparado sobre código real, ni pude comprobar si alguna convención del `AGENTS.md` se hubiera saltado durante la implementación. Es una casilla que dejo honestamente sin rellenar, no "lo cumplió todo".
