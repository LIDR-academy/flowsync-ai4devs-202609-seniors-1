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

**Modelo:** Sonnet5
**Herramienta:** Claude Code

```
Revisa el proyecto lidr-flowsync-ai4devs  y explora tod su contenido, tanto de frontend como de backend y sus configuraciones. No cambies nada. Obtén qué framework es cada carpetas, comandos de test/lint/build configurados en cada package.json, e identifica 3-5 convenciones, las más importantes para respetar, considerando migrations, validators y transformers.
```

**Qué salió:** Funcionó a la primera, devuelve info del framework, los scripts de backend y frontend y convenciones clave a respetar.

## Prompt 2

**Modelo:** Sonnet5
**Herramienta:** Claude Code

```
Con los descubrimientos que has hecho escribe un AGENTS.md en la raíz estructurando las secciones siguiendo las mejores prácticas de estructura de harness.
```

**Qué salió:** Funcionó a la primera, genera un AGENTS.md, que tiene buen aspecto.


## Prompt 3

**Modelo:** Sonnet5
**Herramienta:** Claude Code

```
Necesaito un elemento que compruebe cada archivo que se edite o genere. Configura un hook que cada vez que se edite un archivo corra el linter y los tests que existan en el proyecto.
```

**Qué salió:** Ha generado un archivo con buen aspecto que ha probado y verificado. Ha en contrado un error preexistente en database/schema.ts (da el aviso, pero no lo ha modificado por no haberlo pedido). Pero lo ha creado en el workspace, en un nivel superior al proyecto concreto.

## Prompt 4

**Modelo:** Sonnet5
**Herramienta:** Claude Code

```
Pero necesito que esta configuración sea específica del proyecto, no del workspace superior que contiene varios proyectos
```

**Qué salió:** Lo crea dentro de la carpeta del proyecto. Pero ma da un aviso: Importante — límite que no puedo evitar: al vivir en .claude/settings.json del propio repo, solo se activa en una sesión de Claude Code cuya raíz de proyecto sea proyectos/lidr-flowsync-ai4devs (abrir Claude Code dentro de esa carpeta). Esta sesión actual tiene como raíz la carpeta superior del bootcamp, así que no lo verá disparar aquí — no es algo que pueda probar en vivo desde esta conversación, pero la lógica del script ya está verificada de forma aislada.

## Prompt 5

**Modelo:** Sonnet5
**Herramienta:** Claude Code

```
¿Hay algún aspecto de harness que no hayamos aplicado y que sea importante implementar?
```
**Qué salió:** Me indica que falta enlazar cosas y crear el CLAUDE.md

## Prompt 6

**Modelo:** Sonnet5
**Herramienta:** Claude Code

```
Montemos la pieza de CLAUDE.md y enlacemos los distintos elementos
```
**Qué salió:** Ha encontrado mis apuntes en el workspace y ha montado más piezas de las que faltaban del harness.

## Prompt 7

**Modelo:** Sonnet5
**Herramienta:** Claude Code

```
Ahora conectate a JIRA y procesa el FLOW-1
```
**Qué salió:**Empieza a implementarlo, y al pedirme una autorización le añado un nuevo prompt

## Prompt 8

**Modelo:** Sonnet5
**Herramienta:** Claude Code

```
No implementes el proyecto, genérame en un archivo el plan de implementación
```
**Qué salió:**Deshace los cambios que tenía ya hechos de código y genera el archivo plan-flow-1.md en la raíz del repo.