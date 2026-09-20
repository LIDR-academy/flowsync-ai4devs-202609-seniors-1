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

**Modelo:** Opus 5 (xhigh)
**Herramienta:** Claude Code

```
I need FlowSync as a remote teams management tool preventing alignement meetings. Something like shared task in real time and not like Jira.
```

**Qué salió:** el agente leyó el repo antes de especificar nada y devolvió el terreno existente (tramo 1) mas las cinco preguntas (tramo 2), sin bajar a endpoints ni a modelo de datos.

---

## Prompt 2

**Modelo:** Opus 5 (xhigh)
**Herramienta:** Claude Code

```
Decisiones sobre las preguntas citadas

¿Qué reunión concreta desaparece, en qué equipo, y quién tiene autoridad para cancelarla? El objetivo es disminuir el numero de daily catch ups a uno cada dos dias, como minimo y solo dos reuniones a la semana como maximo.

El "en qué está trabajando cada uno", ¿lo teclea la persona o se deduce de lo que ya hace? En el MVP cada persona introduce en lo que esta trabajando cada vez que cambie de tarea. Si el MVP es exitoso futuras versions se integraran con Jira, este punto esta fuera del alcance del MVP

Cuando lo que sirve al que lee choca con lo que sirve al que escribe, ¿quién gana? El usuario principal es el compañero que quiere no interrumpir

¿Esto sustituye la herramienta de tareas que el equipo ya usa, o vive al lado? La herramienta ha de vivir al lado, backlog, estimaciones, sprints, tickets de cliente no se deben duplicar. El elemento a mostrar en la app es la tarea, creadas a mano en el MVP.

¿La gente solapa horario o está repartida en husos? El equipo es distribuido pero con unas core hours de 11 AM a 5PM horario de Madrid.

Construye una version inicial del Tramo 3 · El alcance en cinco bloques
```

**Qué salió:** cinco bloques con siete elementos dentro y doce fuera, cada exclusión justificada; se quedó en producto sin bajar a tablas ni endpoints.

---

## Prompt 3

**Modelo:** Opus 5 (xhigh)
**Herramienta:** Claude Code (`/agents`)

```
crea un subagente que revise el documento  docs/prd/alcance-mvp-jmc.md para buscar incogruencias, cosas no definidas correctamente y me de un resumen en la pantalla. No modifiques nada en el fichero, yo estoy haciendo una revision por mi lado.
```

**Qué salió:** el wizard de `/agents` ya no existe; se creó `.claude/agents/prd-reviewer.md` a mano (read-only) y se lanzó sobre el documento.

---

## Prompt 4

**Modelo:** Opus 5 (xhigh)
**Herramienta:** Claude Code

```
Decisiones sobre las cuestiones en la version actual del documento:

Supuesto que no está cerrado y conviene cerrar: un único equipo de tamaño squad, entre cinco y diez personas. Si el equipo real son cuarenta, la pantalla única del alcance de abajo deja de sostenerse: El MVP se enfoca en una squad para probar su validez. Un rollout a equipos mas amplios puede pasar en futuras fases pero esta fuera del alcance

El tablero se actualiza solo mientras está abierto, sin recargar. Con seis horas de solape, es la diferencia entre ir a mirar el tablero y tenerlo puesto en un lado de la pantalla. Este punto debe estar fuera del alcance, sera un punto en futuras versiones si el MVP es un exito. Actualmente solo elimina la necesidad de refrescar la pantalla.

Pegar el enlace al ticket que ya existe, si la persona quiere. Un enlace, no una integración. Honra el «vivir al lado» sin duplicar ni un campo. Este punto tiene que estar fuera del alcance. Dado lo reducido del equipo con una linea por tarea los integrantes tienen que ser capaces de saber a que corresponde en Jira. Si el MVP es un exito la integracion con Jira proporcionara esta info.

Marcar esa tarea como bloqueada, con una línea de motivo. El bloqueo es la única razón por la que un catch-up deja de ser opcional. Si no se ve en el tablero, la reunión diaria vuelve sola. Esto esta fuera del alcance. Si la tare esta bloqueada ya no estoy trabajando en ella. Elimina del alcance cualquier referencia a este punto. Esto puede ser implementado en futuras versiones como parte de la integracion con Jira

Actualiza el documento con estos cambios
```

**Qué salió:** alcance de 7 a 4 elementos; hubo que reparar dos justificaciones del NO-alcance que se apoyaban en el tablero en vivo, ya excluido.

---

## Prompt 5

**Modelo:** Opus 5 (xhigh)
**Herramienta:** Claude Code

```
Resuelve las siguientes incongruencias

La cifra de éxito contradice tu propia respuesta. [...] Tienes que elegir el umbral: ¿2 o ≤3?. El objetivo es tener 3 o menos reuniones, 3 es el exito minimo, 2 seria el deseado.

Nada de lo que queda dentro produce esa métrica. [...] Para medir esto la aplicacion tendria que tener una opcion de inidicar skipped daily, solo disponible para el team lead que lleve un historico de esto y permita medir el exito de la app.

El "desde ayer" necesita un histórico que el punto 2 acaba de abolir. [...] Ese sustituye es en la pantalla el modelo de datos debe mantener el historico

El "desde ayer" y el resumen asíncrono excluido son la misma cosa. [...] El punto 4 es el que sobra
```

(Los cuatro hallazgos citados van abreviados con `[...]`; el texto completo de cada uno es el que devolvió el subagente `prd-reviewer` en el Prompt 3.)

**Qué salió:** aplicado, pero la opción de "daily saltada" rompía dos exclusiones que el documento ya afirmaba (el lead no tenía superficie propia; no había roles ni permisos) y hubo que reescribirlas en vez de añadir el punto sin más.
