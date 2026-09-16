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

**Qué salió:** generó un CLAUDE.md de 79 líneas, fiel al backend; el frontend quedó poco cubierto


## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Crea una skill de Claude Code llamada priority-ticket en .claude/skills/priority-ticket/SKILL.md.

Frontmatter:
- name: priority-ticket
- description: Coge el work item de mayor prioridad asignado a mí en Jira (proyecto FLOW) y produce un plan de implementación detallado, sin aplicarlo.

La skill, cuando se invoque, debe hacer lo siguiente:

1. Usar el MCP de Atlassian para buscar en el proyecto FLOW el work item de mayor prioridad asignado al usuario actual y en estado "Por hacer". Leer su resumen, descripción y criterios de aceptación.

2. Enmarcar la tarea con esta estructura antes de planificar:
   - Contexto/Rol: frontend de FlowSync (React 19 + Vite + TypeScript, CSS plano). El backend de auth ya existe y NO se toca.
   - Objetivo: el del ticket, orientado a resultado.
   - Criterios de éxito: "sabrás que terminaste cuando…", derivados de la descripción y de los endpoints reales del backend: POST /api/v1/auth/signup, POST /api/v1/auth/login, GET /api/v1/account/profile, POST /api/v1/account/logout.
   - Restricciones: no tocar el backend; no instalar librerías nuevas sin justificarlo; respetar las convenciones de CLAUDE.md.
   - Recursos: CLAUDE.md y AGENTS.md; el validador real backend/app/validators/user.ts para los campos de los formularios; el cliente tipado Tuyau para llamar a la API.
   - Clarificación: si el ticket no especifica un campo o comportamiento, revisar el validador y los controladores reales del backend antes de asumir.

3. Producir un PLAN de implementación detallado (archivos a crear/tocar, orden, decisiones de diseño, riesgos). NO implementar nada: solo el plan.

Crea únicamente el archivo de la skill; no implementes el ticket todavía.
```

**Qué salió:** funcionó a la primera; creó .claude/skills/priority-ticket/SKILL.md (56 líneas) con el frontmatter, la búsqueda del ticket vía MCP y el encuadre de 6 partes. No lanzó la skill ni implementó nada, como le pedí.



## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Crea una skill de Claude Code llamada commit en .claude/skills/commit/SKILL.md.

Frontmatter:
- name: commit
- description: Crea uno o más commits de git siguiendo la convención de mensajes del repositorio (Conventional Commits en español).

La skill, cuando se invoque, debe hacer lo siguiente:

1. Revisar los cambios del working tree (git status y git diff) y agruparlos en commits lógicos y pequeños (un cambio coherente por commit), en vez de un único commit gigante.

2. Redactar cada mensaje siguiendo la convención real del repo, que es Conventional Commits en español:
   - Formato: "<tipo>(<ámbito>): <descripción en minúscula, en imperativo>".
   - Tipos habituales: feat, fix, docs, chore, refactor, test, style.
   - Ejemplos reales del repo: "fix(backend): repo utilizable tras clone en limpio", "docs(s1): enunciado del ejercicio y plantilla de prompts".
   - Resumen de menos de ~72 caracteres; si hace falta, un cuerpo separado por una línea en blanco explicando el porqué (no el qué).

3. No añadir atribuciones ni firmas automáticas de herramientas salvo que el repo ya las use (no las usa).

4. Antes de ejecutar los commits, mostrarme el plan (qué archivos van en cada uno y con qué mensaje) y esperar mi confirmación. No hacer push.

Crea únicamente el archivo de la skill; no hagas ningún commit ahora.
```

**Qué salió:** funcionó a la primera; skill de commit creada, incluso mejoró lo pedido (evita secretos, sin atribución, sin push).




## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code


```
Crea un subagente de Claude Code llamado adversarial-reviewer en .claude/agents/adversarial-reviewer.md.

Frontmatter:
- name: adversarial-reviewer
- description: Revisor adversarial. Úsalo para revisar con lupa un cambio de código o un plan recién producido; su único objetivo es encontrar cómo se rompe, no aprobarlo.
- tools: Read, Grep, Glob, Bash

Debe ser de solo lectura: no puede editar archivos ni implementar correcciones.

Instrucciones del subagente (cuerpo del archivo):
- Tu único objetivo es INTENTAR ROMPER el cambio o el plan que se te da, no aprobarlo. No felicites ni resumas lo que está bien.
- Busca activamente: casos límite no cubiertos, supuestos falsos sobre el backend (verifica los endpoints y el validador reales en backend/), incumplimientos de las convenciones de CLAUDE.md/AGENTS.md, problemas de seguridad (manejo del token, credenciales, exposición de datos), estados de error no manejados, y cualquier "invención" (rutas, campos o librerías que no existen en el repo).
- Verifica contra el código real: no te fíes de lo que el plan o el cambio afirman; compruébalo leyendo los archivos del repo.
- Devuelve SOLO los hallazgos, en una lista ordenada de más grave a más leve. Cada hallazgo: qué falla, por qué, y el archivo/línea o el punto del plan afectado. Si de verdad no encuentras nada grave, dilo, pero esfuérzate primero en romperlo.
- No edites ningún archivo ni implementes correcciones: solo reporta.

Crea únicamente el archivo del subagente.
```

**Qué salió:** funcionó a la primera; subagente revisor creado, solo lectura y orientado a romper el cambio.



## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code


```
Configura un hook de Claude Code en este proyecto que formatee automáticamente con Prettier los archivos del frontend cada vez que el agente los edite.

Requisitos:
- Debe ser un hook PostToolUse que se dispare tras las herramientas Edit y Write.
- Solo debe actuar sobre archivos dentro de frontend/ (por ejemplo .ts, .tsx, .css, .json bajo frontend/). Debe ignorar los cambios en backend/ y en cualquier otra ruta.
- Debe ejecutar Prettier sobre el archivo editado (por ejemplo con `npx prettier --write` sobre la ruta del archivo). Ten en cuenta que el frontend no tiene Prettier instalado como dependencia todavía: usa npx.
- Configúralo en el archivo .claude/settings.json del proyecto (NO en mi configuración global de usuario).
- Estamos en Windows con PowerShell; asegúrate de que el comando del hook funcione en este entorno (si hace falta un pequeño script auxiliar, créalo dentro de .claude/ y documéntalo).

Cuando termines, explícame brevemente qué configuraste y cómo comprobar que el hook se dispara. No formatees nada todavía.
```

**Qué salió:** funcionó a la primera; configuró el hook (script .ps1 + settings.json) y detectó por su cuenta que faltaba pwsh, usando powershell.exe para no fallar en Windows.



## Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Añade una sección "## Reglas de proceso" al FINAL del archivo CLAUDE.md existente (no reescribas el resto del archivo, solo añade al final). Debe recoger cómo se debe trabajar en este repositorio, aprovechando el harness ya montado:

- Empieza siempre por el ticket: usa la skill /priority-ticket para coger el ticket de mayor prioridad de Jira, enmarcarlo y producir un plan. No empieces a codificar sin un plan.
- Planifica antes de tocar código: primero un mapa (qué archivos, en qué orden, decisiones y riesgos) → aprobación del usuario → ejecución en pasos pequeños y reversibles, con commits intermedios.
- Tras un cambio relevante, lanza el subagente adversarial-reviewer para intentar romperlo antes de darlo por terminado; corrige lo que encuentre.
- Para commitear, usa la skill /commit (Conventional Commits en español, commits pequeños, confirmación previa, nunca push).
- No toques el backend salvo que el ticket lo pida explícitamente; no instales librerías nuevas en el frontend sin justificarlo.
- No edites archivos autogenerados (database/schema.ts, backend/.adonisjs/, #generated/*, etc.).
- El formateo del frontend con Prettier es automático (hook PostToolUse): no hace falta ejecutarlo a mano.
- Ante ambigüedad, verifica contra el código real (validadores, controladores, rutas) antes de asumir; si sigue sin estar claro, pregunta en vez de inventar.

Añade solo esa sección al final de CLAUDE.md; no cambies nada más.
```




## Prompt 7

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Crea un archivo AGENTS.md en la raíz del repo que funcione como enlace a CLAUDE.md, la única fuente de verdad de convenciones y reglas de proceso del proyecto. Que sea corto: una nota indicando que las convenciones están en CLAUDE.md, e importando su contenido con la sintaxis @CLAUDE.md para que una herramienta que lea AGENTS.md obtenga lo mismo. No dupliques el contenido de CLAUDE.md; solo apunta/importa.
```


## Prompt 8

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

​```
/priority-ticket
​```

**Qué salió:** cogió FLOW-5 de Jira y generó el plan sin implementar



## Prompt 9

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Busca el work item de mayor prioridad asignado a mí en el proyecto Jira FLOW y produce un plan de implementación detallado, sin aplicarlo. El resultado debe ser siempre un plan, nunca código.

Paso 1 — Buscar el ticket en Jira (MCP de Atlassian):
1. Usa el MCP de Atlassian para identificar al usuario actual (cuenta de Jira autenticada).
2. Busca en el proyecto FLOW los work items asignados a ese usuario con estado "Por hacer".
3. De ese conjunto, selecciona el de mayor prioridad. Si hay empate, prioriza por fecha de creación más antigua.
4. Lee del ticket seleccionado: resumen, descripción completa y criterios de aceptación (si están en un campo separado o dentro de la descripción).
Si no hay ningún ticket asignado en "Por hacer", indícalo y detente: no inventes un ticket.

Paso 2 — Enmarcar la tarea con esta estructura:
- Contexto/Rol: frontend de FlowSync (React 19 + Vite + TypeScript, CSS plano). El backend de autenticación ya existe en backend/ y no se toca en esta tarea.
- Objetivo: el del ticket, reformulado orientado a resultado.
- Criterios de éxito: frases "sabrás que terminaste cuando…", derivadas de la descripción del ticket y del contrato real de los endpoints existentes: POST /api/v1/auth/signup, POST /api/v1/auth/login, GET /api/v1/account/profile (requiere auth), POST /api/v1/account/logout (requiere auth).
- Restricciones: no modificar nada bajo backend/; no instalar librerías nuevas en frontend/ sin justificar por qué las existentes no bastan.
- Recursos: el validador real backend/app/validators/user.ts (fuente de verdad para los campos de los formularios); el cliente tipado de Tuyau (backend/.adonisjs/client/registry/*) para llamar a la API con tipos correctos.
- Clarificación: si el ticket no especifica un campo, validación o comportamiento, revisa el validador y los controladores reales del backend antes de asumir.

Paso 3 — Producir un plan de implementación detallado: archivos a crear/tocar (con motivo), orden de implementación, decisiones de diseño (con su razón) y riesgos/puntos abiertos. No escribas ni edites código; solo el plan.
```

**Qué salió:**