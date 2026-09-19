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

**Modelo:** Haiku 4.5
**Herramienta:** Claude for Windows

```text
En el directorio actual, qué estructura hay que generar para seguir estos pasos:

1. Monta el harness solo en una, con las mismas ocho piezas que monta el mentor en el directo y en su orden: el `CLAUDE.md` de `/init`, el MCP de Atlassian, las skills `/priority-ticket` y `/commit`, el subagente `adversarial-reviewer`, un hook que formatea el frontend con Prettier, las reglas de proceso al final del `CLAUDE.md` y `AGENTS.md` como enlace. Qué hace cada una está en la lección "Ejercicio FlowSync" del Módulo 1. Los prompts los escribes tú. Si el reloj no da, para donde llegues sin saltarte el orden.
2. Crea en tu tablero de Jira el ticket del directo, «Implementar login en el frontend», con el texto que trae la lección, asignado a ti y en «Por hacer».
3. Lánzalo en las dos copias. En la de harness, con `/priority-ticket`; en la pelada, escribiendo a mano la misma instrucción que lleva esa skill. No apliques el plan en ninguna: se comparan los dos planes.
4. Compara, con estas casillas por cada lado: qué archivos propone tocar (contados) · qué convenciones respetó y cuáles no (nombrándolas) · cuántas veces tuviste que intervenir · qué te tocaría arreglar a mano antes de enseñárselo a alguien.
```

**Qué salió:** Generó una lista de 15 archivos con toda la estructura necesaria para ejecutar el ejercicio del harness en FlowSync, y un listado con los pasos a seguir.

La guía fue bastante amplia y detallada.

## Prompt 2

**Modelo:** Haiku 4.5
**Herramienta:** Claude for Windows

```text
Genera la estructura de carpetas y ficheros de agentes, skills y demás
```

**Qué salió:** Me creó los ficheros para que los descargara, pero no generó nada. Tuve que preguntar el motivo, y pasar al IDE de Claude.

## Prompt 3

**Modelo:** Opus 5
**Herramienta:** Claude Code

```text
Revisa la documentación de la carpeta ".\Claude outputs" y genera la estructura de carpetas y ficheros de agentes, skills y demás descritos en ESTRUCTURA_CARPETAS.md
```

**Qué salió:** En este caso los ficheros `CLAUDE.md` y `AGENTS.md`, la carpeta `.claude/` con sus respectivas sub-carpetas de skills, agents y hooks, además de otra carpeta `docs/harness/` para los documentos de salida del ejercicio.

## Prompt 4

**Modelo:** Opus 5
**Herramienta:** Claude Code

```text
Configura el Git hook Prettier
```

**Qué salió:** Creó `.gitattributes`, y actualiazó los ficheros `.githooks/pre-commit` y `AGENTS.md`. Hizo una verificación real.

## Prompt 6

**Modelo:** Opus 5
**Herramienta:** Claude Code

```text
/priority-ticket FLOW-1
```

**Qué salió:** Fichero con el plan de ejecución + Check de convenciones + Riesgos y bloqueos + Decisiones a resolver.

## Prompt 7

**Modelo:** Opus 5
**Herramienta:** Claude Code

```text
Aplica el plan
```

**Qué salió:** Implementación del plan, con implementación realizada y tests ejecutados.
