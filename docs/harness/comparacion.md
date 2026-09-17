# Comparación: con harness vs. sin harness

**Ticket lanzado (idéntico en ambas copias):**

> Implementar login en el frontend
>
> Descripción
>
> quiero que crees una pantalla de login, el backend ya tiene la logica es solo la parte visual.
> quiero al cja de usernmane y que sea un email y la de password que al escribir salgan asteriscos.
> si es correcto el login redirigue a la pantalla si no se queda donde esta /login y muestra que
> login incorrecto

En la copia con harness llegó vía MCP de Atlassian + skill `/plan` (el agente `priority-ticket` lo trajo de Jira). En la copia sin harness se pegó tal cual, a mano, como primer mensaje.

## Parte A

### Qué archivos tocó, contados

**Con harness — 11 archivos de feature:**
- Nuevos (7): `frontend/src/App.test.tsx`, `frontend/src/api/auth.ts`, `frontend/src/api/auth.test.ts`, `frontend/src/pages/LoginPage.tsx`, `frontend/src/pages/LoginPage.test.tsx`, `frontend/src/pages/HomePage.tsx`, `frontend/src/setupTests.ts`
- Modificados (4): `frontend/src/App.tsx`, `frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig.app.json`
- Efecto colateral fuera de la feature: `backend/.prettierignore` y `backend/package.json` (ver "convenciones", más abajo)

**Sin harness — 7 archivos de feature:**
- Nuevos (5): `frontend/src/lib/auth.ts`, `frontend/src/lib/RequireAuth.tsx`, `frontend/src/pages/LoginPage.tsx`, `frontend/src/pages/LoginPage.css`, `frontend/src/pages/HomePage.tsx`
- Modificados (2): `frontend/src/App.tsx`, `frontend/package.json` (+ lockfiles)
- Efecto colateral fuera de la feature: `backend/package-lock.json` tocado (ruido de reinstalación, pese a que el ticket dice explícitamente "el backend ya tiene la lógica, es solo la parte visual")

### Qué convenciones respetó y cuáles no

**Con harness:**
- ✅ No tocó el backend de forma sustantiva (el único cambio real, `.prettierignore`, fue para *proteger* una convención, no para violarla — ver abajo).
- ✅ No introdujo dependencias de routing: mantuvo el cambio de pantalla con estado de React (`useState`), en vez de traer `react-router-dom` sin que el ticket lo pidiera.
- ✅ Siguió TDD estricto (rojo-verde-refactor, documentado en 7 ciclos A–G en el plan) antes de escribir código de producción.
- ✅ Preguntó y dejó constancia de las ambigüedades del ticket (persistencia de sesión, texto de error, routing real vs. simulado, diseño) antes de implementar, en vez de asumirlas en silencio.
- ⚠️ **Violación real, autocorregida:** `CLAUDE.md` dice explícitamente que `database/schema.ts` es auto-generado y "nunca se edita a mano". El primer hook de Prettier que se configuró lo reformateó igualmente en su primera pasada. Se detectó y se revirtió en el mismo turno, y se añadió `database/schema.ts` a `backend/.prettierignore` para que no vuelva a pasar — pero el incumplimiento sí ocurrió una vez.

**Sin harness:**
- No había ninguna convención escrita en ningún archivo — no hay `CLAUDE.md`, ni AGENTS.md, ni nada. Esa ausencia es la respuesta, y vale como tal.
- Sin una convención que lo frenara, **añadió una dependencia nueva sin preguntar** (`react-router-dom`) para resolver algo que el ticket no pedía.
- **Asumió alcance no solicitado:** implementó rutas protegidas (`RequireAuth.tsx`, redirección a `/login`) cuando el ticket solo hablaba de una pantalla de login con dos estados (correcto/incorrecto), sin mencionar rutas ni navegación protegida en ningún momento.
- **Cero tests.** No existe ni un solo archivo `*.test.tsx`/`*.test.ts` en esta copia.
- Persiste el token en `localStorage` (sesión persistente entre recargas) — una decisión de producto real que nadie validó, ni el ticket ni tú.

### Cuántas veces tuviste que intervenir

- **Con harness:** 1 vez — aprobar el plan generado por `/plan` antes de que empezara a escribir código (aprobación, no corrección).
- **Sin harness:** 1 vez — corregirlo cuando confundió el `README.md` del propio ejercicio del curso (que describe la mecánica de "Parte A: generar plan, no aplicarlo") con una instrucción para esta tarea, y se detuvo a preguntar si debía solo planear en vez de implementar.

### Qué te tocaría arreglar a mano antes de enseñarle esto a alguien del equipo

- **Con harness:** nada bloqueante. Revisar que el hook de lint/format no vuelva a tocar archivos generados (ya mitigado con `.prettierignore`).
- **Sin harness:** decidir si de verdad quieres routing real con `react-router-dom` (dependencia no pedida) o simplificarlo; añadir cobertura de tests desde cero; confirmar si la persistencia en `localStorage` es la decisión correcta o revertirla, ya que nadie la pidió.

## Parte B — las tres líneas

1. **Piezas montadas y cuál costó más:** memoria (`CLAUDE.md` vía `/init`, rápido), MCP de Atlassian (rápido una vez resuelto el OAuth), skill/subagente de commit (rápido, basado en Conventional Commits), subagente `priority-ticket` con Jira + plan en Gherkin/TDD (la más elaborada). La que más costó de lo esperado fue el **hook de lint+format**: en su primera ejecución reformateó `database/schema.ts`, un archivo que el propio `CLAUDE.md` marca como intocable, y hubo que revertirlo y ajustar `.prettierignore` para que no volviera a pasar.

2. **La primera diferencia que vi entre las dos salidas:** la copia sin harness se paró a mitad de camino confundiendo el `README.md` del ejercicio del curso con una instrucción para la tarea real, y me preguntó si debía solo generar un plan. Me di cuenta al ver ese mensaje de confirmación explícito pidiéndome elegir entre "solo plan" o "implementar" — algo que la copia con harness nunca planteó, porque desde el primer turno tenía `CLAUDE.md` como fuente de verdad clara sobre qué es este proyecto y qué se espera de una tarea aquí.

3. **Algo que dejé escrito en el harness y que el agente no cumplió igualmente:** `CLAUDE.md` dice, literalmente, que `database/schema.ts` "es auto-generado — nunca editarlo a mano". El hook de Prettier que yo mismo configuré para que se disparara al terminar cada turno lo reformateó de todas formas en su primera ejecución real. Un archivo de instrucciones sube la probabilidad de que algo se respete, no la garantiza — y aquí se vio exactamente dónde se cae esa probabilidad: en una herramienta automática que yo mismo añadí sin comprobar primero que respetaba esa regla.
