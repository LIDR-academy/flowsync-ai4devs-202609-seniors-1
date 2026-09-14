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

---

## Prompt 1

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
me ayudas a darle cuerpo a las SKILLS? el objetivo es montar un harness para este proyecto. Un harness que contiene:
- AGENTS.md
- skills para el ticket y para el commit. Aqui no se que debe de hacer exactmente priority-ticket.
- un agente para refutar la implementacion del codigo
- un hook para formatear el frontend con Prettier
- rglas del proceso al final de AGENTS y CLAUDE.

Esta escrito en el README la infraestructura del harness pero me falta el contenido. En lugar de decirme que poner, enseñame a entender y a que yo lo haga, como un profesor
```

**Qué salió:** una guía de todas las piezas de golpe, con preguntas; demasiado texto de una vez.

## Prompt 2

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pon una configuracion local para /model y /effort de opus y high por defecto. Para que no use las globales. Y luego los agentes usaran cada uno las suyas, es posible?
```

**Qué salió:** verificó las claves en la documentación y creó `.claude/settings.local.json`; los agentes admiten `model` y `effort` en su frontmatter.

## Prompt 3

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
explicame los elementos del harness uno a uno, no me des tanto texto de golpe
```

**Qué salió:** cambió a una pieza por mensaje, empezando por `CLAUDE.md` / `AGENTS.md`.

## Prompt 4

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
porque anthropic quiere usar un nombre mas estandar para el archivo con las instrucciones base? te hgao otra pregunta, si no existiera AGENTS, los agentew leerian CLAUDE, o nada?
```

**Qué salió:** me corrigió (AGENTS.md es un estándar entre herramientas, no de Anthropic) y propuso un experimento para comprobar qué leen los subagentes.

## Prompt 5

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
si en el modelSettings de claude-personal (la conexion de este repo) tiene dos modelos: fable con xhigh y opus con high, que significa? cual se usa por defecto?
```

**Qué salió:** `modelSettings` guarda el esfuerzo por modelo, no elige modelo; sin clave `model`, se usa el de la cuenta.

## Prompt 6

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
si pusiera instrucciones en CLAUDE no incluidas en AGENTS, que pasaria con los agentes?
```

**Qué salió:** Claude Code las ve, otras herramientas no; lo específico de Claude Code va en `CLAUDE.md`.

## Prompt 7

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
porque CLAUDE es el director de orquesta? es decir el manager de los agentes?
```

**Qué salió:** respuesta a medias; las reglas de proceso van en `CLAUDE.md` porque nombran piezas que solo existen en Claude Code.

## Prompt 8

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
sí, pasamos a la pieza 2
```

**Qué salió:** explicación del MCP de Atlassian.

## Prompt 9

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
espera, antes de seguir, veo que hay dos archivos para settings: settings.json y settings.local.json, qe diferencia hay?
```

**Qué salió:** compartido y commiteado frente a personal e ignorado; el local gana.

## Prompt 10

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
anade el contenido de settings.local a settings y borra settings.local. En este caso quiero que en todos los dispositivos se use el mismo modelo y esfuerzo
```

**Qué salió:** funcionó a la primera.

## Prompt 11

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
ahora quiero anadir esto en settings: 
  "statusLine": {
    "type": "command",
    "command": "/Users/elena.pascual.ext/.claude/statusline-valiria.sh",
    "padding": 0
  }
para poder ver un tag del modelo, esfuerzo actuales, el contexto y lo que queda de mi ventana. Me gustaria que el script invocado statusline-valiria.sh estuviera copiado en algun lugar del repo, pero donde? es un hook? que seria?
```

**Qué salió:** no es un hook sino personalización de la interfaz; copió el script a `.claude/` con ruta `$CLAUDE_PROJECT_DIR`.

## Prompt 12

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
cambia el nombre del script de statusline-valiria.sh a solo statusline.sh
```

**Qué salió:** funcionó a la primera.

## Prompt 13

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
sí, cambia el comentario de VALIRIA también
```

**Qué salió:** funcionó a la primera.

## Prompt 14

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pues imagino que en algun momento me pedira que me identifique, pero no se con que credenciales
```

**Qué salió:** explicación de OAuth con `/mcp`; `.mcp.json` es seguro de commitear.

## Prompt 15

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pone conectado
```

## Prompt 16

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
una skill tb tiene frontmatter, los agentes tb no? y los hooks, tb deben de llevar frontmatter?
```

**Qué salió:** skills y agentes sí, hooks no; corrigió una pista anterior (`allowed-tools` preaprueba, no restringe).

## Prompt 17

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pero si las pongo en settings seran para todas las skills no? lo que quiero es que de momento solo la skill priority-ticket no pueda escribir, unicamente leer
```

**Qué salió:** propuso un subagente de solo lectura con `context: fork`.

## Prompt 18

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
hacer un agente para esta skill de momento me parece overkill, no hay manera de acotar una skill?
```

**Qué salió:** dijo primero que los hooks no se documentaban para skills; lo corrigió en el siguiente prompt.

## Prompt 19

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
y una skill con hook pretooluse? podemos usar allowed-tools, disallowed-tools y el hook, que piensas?
```

**Qué salió:** el hook en la skill funciona pero dura toda la sesión; `disallowed-tools` no existe en skills.

## Prompt 20

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
no, en esa sesión no voy a escribir en Jira
```

## Prompt 21

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pero en el futuro probablemente tenga otra skill que sea /enrich-us o /enrich-ticket, que si escribiran en jira
```

**Qué salió:** tres opciones con su coste (hook + disciplina, subagente, regla `ask` global).

## Prompt 22

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
A por ahora, y lo reviso cuando haga enrich-ticket
```

## Prompt 23

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
lista blanca, es decir, lo unico que puede hacer en jira
```

## Prompt 24

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
1. Get issue type y ver los de mayor priorirdad, luego get issue. Mi duda es, si hay varios tickets con prioridad alta, cual coger?
2. De mpomento confluence no
3. Si, deberia de coincidir con la de allowed-tools. Si no coincidieran, se bloquearian las herramientas que la skill tiene que usar
```

## Prompt 25

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
yo veo estos nombres de tools [Image #2] no los que tu dices
```

**Qué salió:** `/mcp` muestra títulos legibles y `/context` los nombres internos; la etiqueta `read-only` ayuda a elegir.

## Prompt 26

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
mcp__atlassian__getJiraIssue, mcp__atlassian__getJiraProjectIssueTypesMetadata, mcp__atlassian__getConfluenceSpaces, mcp__atlassian__getTransitionsForJiraIssue.
```

## Prompt 27

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
mcp__atlassian__getAccessibleAtlassianResources, mcp__atlassian__atlassianUserInfo
```

## Prompt 28

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
mcp__atlassian__searchJiraIssuesUsingJql
```

## Prompt 29

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
el orden del tablero
```

## Prompt 30

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
prioridad primero y rank para desempatar. No se hacer skills, necesito que la hagas
```

**Qué salió:** escribió `SKILL.md` y `.claude/hooks/jira-readonly.sh`; hook probado, skill sin probar porque Jira no tenía tickets.

## Prompt 31

Enviado mientras Claude trabajaba en el prompt 30.

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
ademas, que no necesito saber jql porque le herramienta de tickets es irrelevvante para mi, hoy puede ser jira, manana linear
```

**Qué salió:** los criterios quedaron en términos neutros y lo específico de Jira en una sección aparte.

## Prompt 32

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
creo que en prompts solo debo apuntar los prompts de implementacion del ticket, no de montaje del arnes
```

**Qué salió:** citó `prompts.md` y el README: los prompts del montaje también cuentan.

## Prompt 33

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
vale, apunta los prompts
```

**Qué salió:** apuntó los 33 prompts de la sesión en este fichero.

## Prompt 34

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
podemos poner un hook para que se vayan apuntando los hooks automaticamente?
```

**Qué salió:** lo interrumpí mientras consultaba la documentación: había escrito «hooks» en vez de «prompts».

## Prompt 35

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
podemos poner un hook para que se vayan apuntando los prompts automaticamente?
```

**Qué salió:** sí, con `UserPromptSubmit`; propuso ponerlo en `settings.local.json`.

## Prompt 36

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
prefiero en settings.json, la copia pelada ya esta hecha y necesito settings.json sincronizado con mis otros equipos
```

**Qué salió:** creó `.claude/hooks/log-prompt.py` y lo registró en `settings.json`.

## Prompt 37

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
haz commit y push. En la proxima sesion creare una skill para hacer commits pas profesional
```
