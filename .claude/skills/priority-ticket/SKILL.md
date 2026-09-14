---
name: priority-ticket
description: Busca el ticket más prioritario asignado a mí y pendiente, lo lee y propone un plan de implementación para FlowSync sin aplicarlo. Solo lee el gestor de tickets.
# Solo se lanza a mano: su hook sigue activo el resto de la sesión y no debe registrarse sin querer.
disable-model-invocation: true
allowed-tools: Read Grep Glob mcp__atlassian__getAccessibleAtlassianResources mcp__atlassian__searchJiraIssuesUsingJql mcp__atlassian__getJiraIssue
# Jira en solo lectura: lista blanca en .claude/hooks/jira-readonly.sh, que debe coincidir con las
# herramientas de Atlassian de allowed-tools.
# PENDIENTE: los hooks de una skill siguen activos el resto de la sesión. Cuando exista
# /enrich-ticket (que sí escribe en Jira), este hook la bloquearía si se usan en la misma sesión.
hooks:
  PreToolUse:
    - matcher: "mcp__atlassian__.*"
      hooks:
        - type: command
          command: '"$CLAUDE_PROJECT_DIR"/.claude/hooks/jira-readonly.sh'
---

# Priority ticket

Busca el ticket más prioritario que tengo asignado y pendiente, entiéndelo y propón un plan para
implementarlo en este repositorio. **No implementes nada**: el resultado es solo el plan.

## Reglas

- Solo lectura. No crees, edites, comentes ni cambies de estado ningún ticket, y no edites ficheros
  del repositorio.
- No inventes lo que el ticket no dice. Si algo es ambiguo, apúntalo en «Dudas y riesgos».

## 1. Encontrar el ticket

Criterios, en este orden:

1. Asignado a mí.
2. En estado pendiente («Por hacer»).
3. Mayor prioridad primero.
4. A igual prioridad, el que esté más arriba en el tablero.

Coge el primero. Si no hay ninguno, dilo y para. Si hay otros con la misma prioridad que el
elegido, nómbralos en una línea (clave y título).

## 2. Leer el ticket

Lee el ticket entero: descripción, criterios de aceptación, comentarios y enlaces. Si enlaza a
documentos externos (Confluence u otros), no los abras: lístalos en «Dudas y riesgos» como contexto
que no se ha leído.

## 3. Explorar el código

Antes de proponer nada:

- Repasa las convenciones de `AGENTS.md` que afecten al ticket.
- Localiza en `backend/` y `frontend/` el código que toca (rutas, controllers, validators,
  transformers, componentes). Cita rutas reales y comprueba si un fichero existe antes de proponer
  crearlo.

## 4. Entregar el plan

Usa este formato:

```markdown
## <CLAVE>: <título>

Prioridad · estado · enlace

**Resumen:** qué pide el ticket, en dos o tres líneas.

**Criterios de aceptación:** los del ticket. Si no tiene, dilo.

**Archivos (N en total)**

| Acción | Ruta | Por qué |
|---|---|---|
| crear / modificar | `ruta/real` | ... |

**Convenciones que aplica:** cada una con el nombre que tiene en `AGENTS.md` y dónde se aplica.

**Pasos:** numerados, en orden de ejecución.

**Verificación:** comandos exactos (lint, typecheck, test, build) y comprobación manual.

**Dudas y riesgos:** lo que necesita una decisión humana antes de empezar.
```

## Cómo hacerlo en Jira

Esta sección es lo único que cambia si el gestor de tickets deja de ser Jira (junto con
`allowed-tools` y el hook del frontmatter).

1. `getAccessibleAtlassianResources` para obtener el `cloudId`. Si hay más de un sitio, pregúntame
   cuál.
2. `searchJiraIssuesUsingJql` con esta búsqueda, que aplica los criterios del paso 1:

   ```
   assignee = currentUser() AND statusCategory = "To Do" ORDER BY priority DESC, Rank ASC
   ```

3. `getJiraIssue` con el ticket elegido, pidiendo también los comentarios.
