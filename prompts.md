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

**Modelo:** Opus 5 x Max
**Herramienta:** Claude Code

```
i want to create an AGENTS.md file for this project; since Claude Code doesnt read AGENTS.md file, we will also create a CLAUDE.md that will reference/symlink the AGENTS.md file, so if tomorrow we decide to use other AI the switch is easy

follow these conventions:
1. Memoria: CLAUDE.md y AGENTS.md

Archivos de contexto persistente que el agente lee al inicio de cada sesión (el .editorconfig de los agentes). AGENTS.md es el estándar cross-tool (OpenAI ago-2025; gobernado por la Linux Foundation desde dic-2025; leído por 20+ herramientas). ⚠ Claude Code NO lee AGENTS.md nativamente: lee CLAUDE.md; se enlazan con una línea @AGENTS.md o un symlink, para no duplicar

can use these as guidelines and as result example:
/Users/Rodrigo/Documents/*/AGENTS.md
/Users/Rodrigo/Documents/*/CLAUDE.md
/Users/Rodrigo/Documents/*/CLAUDE.md
/Users/Rodrigo/Documents/*/CLAUDE.md
/Users/Rodrigo/Documents/*/CLAUDE.md
/Users/Rodrigo/Documents/*/AGENTS.md
```

("*" es el nombre del proyecto; se ha quitado por privacidad)

**Qué salió:** CLAUDE.md y AGENTS.md; un par de cosas que cree que debería saber y propuestas que tal vez quiera ajustar.

## Prompt 2

**Modelo:** Opus 5 x Max
**Herramienta:** Claude Code

```
i want to create this, the "adversarial-reviewer"
it will be a subagent which we will invoke using a slash command after a task is completed and before creating the PR

created the AGENTS.md and CLAUDE.md in another session; this comes from there: When you add the skills/subagent/hook later, add a "where the automation lives" line to AGENTS.md so non-Claude tools know to read .claude/skills/*/SKILL.md manually.

Agentes especializados con su propio contexto y permisos, definidos en .claude/agents/*.md. Sirven para no contaminar la conversación principal y para paralelizar. Built-in: Explore, Plan, general-purpose. El ejemplo de este curso es uno de revisión adversarial, adversarial-reviewer: su único objetivo es intentar romper el cambio, no aprobarlo

go
```

**Qué salió:** subagente en `.claude/agents/adversarial-reviewer.md`, skill `/adversarial-review` (fork al subagente) en `.agents/skills/adversarial-review/SKILL.md` (symlink en `.claude/skills/`) y dos líneas nuevas en `AGENTS.md → Process`.

## Prompt 3

**Modelo:** Opus 5 x Max
**Herramienta:** Claude Code

```
looks good; will other AI besides Claude be able to find and use this? i see it within a .claude folder
```

**Qué salió:** comenta cómo funcionan los folders y los agents discovery para otras IAs. Propone cambios para que sean visibles para todos.

## Prompt 4

**Modelo:** Opus 5 x Max
**Herramienta:** Claude Code

```
1+2, then fill the blank in Prompt 4/qué salió
```

**Qué salió:** skill movida a `.agents/skills/` con symlink desde `.claude/skills/`, línea en el SKILL.md apuntando al agente, `AGENTS.md` actualizado; de paso quitó el Prompt 2 duplicado y puso el texto real en este Prompt 4.

## Prompt 5

**Modelo:** Opus 5 x Max
**Herramienta:** Claude Code

```
here's a skill i usually use: /Users/Rodrigo/Downloads/pr
i want to create something like it for flowsync; use that one as guide and output example, adjusted for the particularities of this project
```

**Qué salió:** skill `/pr` en `.agents/skills/pr/SKILL.md` (symlink en `.claude/skills/`) con la misma estructura que la de Bitbucket, adaptada a GitHub/`gh`, fork → upstream, base `sN/start`, títulos en español, la regla de "dos archivos y ni uno más" del entregable y el Jira personal (`FLOW`); probó en seco los comandos del skill y una línea nueva en `AGENTS.md → Process`.

## Prompt 6

**Modelo:** Opus 5 x Max
**Herramienta:** Claude Code

```
get this ticket from Jira: https://rodlimco.atlassian.net/browse/FLOW-8
draft an action plan
```

**Qué salió:** leyó FLOW-8 por el MCP de Atlassian (solo título, sin descripción: lo avisó) y, en modo plan, leyó `AGENTS.md`, el contrato de la API y el starter del frontend antes de proponer. Plan de 11 archivos, todos en `frontend/` (7 nuevos, 4 modificados), sin dependencias nuevas ni cambios en el backend: `api/client.ts` + `api/types.ts`, `features/auth/{authAPI,useSession,useLogin}.ts`, `LoginPage.tsx/.css`, y reescritura de `App.tsx`/`App.css`, `index.css` (token `--danger`) e `index.html`. Incluye restaurar sesión al recargar y logout; deja fuera signup, router y tests (Vitest cuando haga falta), con cada decisión y su alternativa en una tabla. Añade checklist de convenciones para `comparacion.md`, verificación manual contra el backend y el cierre con `/adversarial-review` + `/pr to origin`. Al aprobar el plan preguntó antes de tocar código, porque el ejercicio dice no aplicarlo.
