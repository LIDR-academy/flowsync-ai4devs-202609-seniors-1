#!/bin/bash
# Hook PreToolUse de /priority-ticket: deja Jira en solo lectura.
# Claude Code lo ejecuta antes de cada herramienta mcp__atlassian__* y le pasa por la
# entrada estándar un JSON con `tool_name`. Lista blanca: lo que no esté aquí se bloquea,
# también las herramientas nuevas que añada el servidor. Debe coincidir con las herramientas
# de Atlassian de `allowed-tools` en .claude/skills/priority-ticket/SKILL.md.
tool=$(python3 -c 'import json, sys; print(json.load(sys.stdin).get("tool_name", ""))')

case "$tool" in
  mcp__atlassian__getAccessibleAtlassianResources | \
  mcp__atlassian__searchJiraIssuesUsingJql | \
  mcp__atlassian__getJiraIssue)
    exit 0
    ;;
esac

echo "Bloqueado: '${tool:-desconocida}' no está permitida. /priority-ticket solo lee Jira" \
  "(buscar y leer tickets). No intentes modificar Jira por otra vía: termina el plan y" \
  "deja lo que haría falta cambiar en «Dudas y riesgos»." >&2
exit 2
