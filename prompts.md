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

**Modelo:** Opus 5.5 Max
**Herramienta:** Claude Code

```
Here’s the initial message from product:  

«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira»

we are going to leave our final decisions in docs/prd/alcance-rl-.md; file doesnt exist, create it

there's a prompts.md file; as final step of every answer you give i want you to update that file; at the bottom there's an example (Prompt 1) on how to log prompts.  Update Prompt 1 with this very same prompt, and keep the structure.

We are gonna work through out the whole session with Opus 5.5. at Max
```

**Qué salió:** creó la rama `alcance-rl` y `docs/prd/alcance-mvp-rl.md` con la petición de producto; usó el nombre que exige el README en vez del literal `alcance-rl-.md`.

## Prompt 2

**Modelo:** Opus 5.5 Max
**Herramienta:** Claude Code

```
summarize what's already built and the current data model in 3-5 lines
```

**Qué salió:** 4 líneas en la sección 1 del alcance, sacadas de leer migraciones, modelo, rutas y pantallas (no solo el CLAUDE.md).

## Prompt 3

**Modelo:** Opus 5.5 Max
**Herramienta:** Claude Code

```
ask me the five questions that would most reduce uncertainty
one round only, dont go to "binary level"; no data models nor endpoints
```

**Qué salió:** 5 preguntas abiertas de producto en la sección 2 del alcance, cada una con lo que decide; sin respuestas inventadas.

## Prompt 4

**Modelo:** Opus 5.5 Max
**Herramienta:** Claude Code

````
here's the answers:


```
- Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una 
capability terminada a tres a medias.
```


despite being in spanish, we continue speaking in english 

if you encounter anything not covered here, you make a decision but flag it as supposal 

and heads up: there's also a word on what will be out of the MVP:

```
Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```
````

**Qué salió:** respuestas resumidas bajo cada pregunta de la sección 2, la lista «fuera del MVP» de producto y 9 supuestos (1 de la ficha, 8 decididos para huecos); aún sin los cinco bloques del alcance.

## Prompt 5

**Modelo:** Opus 5.5 Max
**Herramienta:** Claude Code

```
write the scope in five blocks, cut aggressively, justify each exclusion
i personally want "what moved" out; sounds more like a nice-to-have rather than actual value for the MVP
```

**Qué salió:** sección 3 con los cinco bloques: 7 capabilities dentro y 15 exclusiones justificadas. La IA había propuesto 8 dentro (contando «qué se ha movido», del prompt 4); tras mi recorte quedan 7.

## Prompt 6

**Modelo:** Opus 5.5 Max
**Herramienta:** Claude Code

```
point 6: let's take filter by status too; the core idea is to be able to see in a glance who's working on what; filtering by status sounds good for a next stage

point 7: this would include a socket or something like that, too much complexity for an MVP. user's will have to manually refresh for now. Even Jira works like so today

point 5: not all too sure but sounds also a lot like a candidate for dropping
```

**Qué salió:** fuera el filtro, la actualización automática y las vencidas, y con ellas la fecha de vencimiento: quedan 4 de las 8 que propuso la IA. Añadió dos supuestos (lista ordenada por estado; si dos reclaman la misma tarea, gana el primero) y rebatió mis argumentos de los sockets y de Jira, aunque aplicó el recorte.

## Prompt 7

**Modelo:** Opus 5.5 Max
**Herramienta:** Claude Code

```
point 7, if feasible without much hustle, we can bring it
real approach, not a unicorns and roses world
that would avoid 2 people claiming the same task
```

**Qué salió:** vuelve la actualización sola (menos de un minuto, y al día al volver a la lista): la IA la ve barata sin sockets, pidiendo la lista cada ~30 s. Me corrigió: eso no evita que dos reclamen la misma tarea, solo acorta la ventana; lo evita que gane el primero, regla que pasó al alcance. Quedan 5 de 8.

## Prompt 8

**Modelo:** Opus 5.5 Max
**Herramienta:** Claude Code

```
write part B, the three lines
```

**Qué salió:** Parte B debajo del alcance: 8 → 5; fuera «qué se ha movido», el filtro por estado y la fecha de vencimiento; la menos segura es la fecha, con las señales del piloto que la harían entrar.

## Prompt 9

**Modelo:** Opus 5.5 Max
**Herramienta:** Claude Code

```
add to third point the back and forth with point 7 (the live update)
then add the finding line, then commit and open the PR
```

**Qué salió:** añadió la ida y vuelta de la actualización automática a la línea 3 y el hallazgo, hizo el commit y abrió el PR contra `s2/start` del repo del curso. El revisor adversarial vio que la Parte B nombraba el mecanismo (sockets, cada medio minuto) y contradecía el hallazgo, y que editar el responsable se saltaba «gana el primero»; lo corrigió en un segundo commit.
