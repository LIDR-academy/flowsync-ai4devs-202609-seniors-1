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

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos
sepan en qué está trabajando cada uno sin tener que hacer reuniones
de sincronización. Algo tipo tareas compartidas pero más en tiempo
real y menos rollo que Jira.

Antes de proponer nada, dime en 3-5 líneas: ¿qué capabilities ya
existen en este proyecto y cómo es el modelo de datos actual?
```

**Qué salió:** funcionó a la primera. Exploré migraciones/modelos/rutas del backend y respondí: el proyecto hoy solo tiene auth (tablas `users` y `access_tokens`, endpoints signup/login/logout/profile), cero modelo de dominio de tareas/equipos — se parte de cero en esa parte.

---

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
dame 5 preguntas en una sola ronda, sin bajar al modelo de datos ni endpoint al terminar  documentalo
```

**Qué salió:** funcionó a la primera. Di 5 preguntas de producto (granularidad del "en qué está trabajando", nivel de tiempo real, visibilidad por equipo/proyecto, quién actualiza el estado (manual vs inferido), y qué significa "menos rollo que Jira" en la práctica), sin tocar modelo de datos ni endpoints.

---

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

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
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias.
```

**Qué salió:** no era una pregunta, sino las respuestas a las 5 del Prompt 2, con el alcance del MVP muy delimitado (sin equipos, sin presencia, sin integraciones, sin sprints/backlog; tarea = título/responsable/estado/fecha). Se documenta como input de contexto, sin acción de código todavía.

---

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** más contexto añadido a las fronteras del MVP del Prompt 3 (exclusiones explícitas). Sin acción de código todavía.

---

## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Con todo el contexto anterior (lo que ya existe en el proyecto, las 5 preguntas
y las respuestas de la ficha de hechos), escribe el alcance del MVP de FlowSync
en exactamente 5 bloques, en este orden:

1. Problema
2. Usuarios
3. Propuesta de valor
4. Alcance (qué se construye)
5. NO-alcance (qué se queda fuera)

Sé agresivo recortando: prefiero un MVP delgado y defendible a uno amplio.
En el bloque de NO-alcance, justifica cada exclusión (qué hipótesis de producto
NO ayuda a validar meterla ahora).

No incluyas modelo de datos, endpoints, ni arquitectura — esto es un documento
de producto, no de implementación.
```

**Qué salió:** funcionó a la primera. Documento de 5 bloques: problema (ronda "¿en qué estás?" de la daily + episodio de trabajo duplicado), usuarios (equipos remotos 3-10, roles planos), propuesta de valor (ver estado sin preguntar, decide qué coger, se sostiene porque también sirve a quien lo escribe), alcance (tarea con 4 campos, cambio de estado en 2 clics, lista filtrable, espacio único, se apoya en auth existente) y NO-alcance con justificación por exclusión (multi-equipo, presencia, push, integraciones externas, permisos avanzados, sprints/backlog/informes, comentarios, analítica) — cada una atada a qué hipótesis no ayuda a validar. Sin modelo de datos ni endpoints, como se pidió.

---

## Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
mueve a no alcance este punto Cambiar el estado de una tarea en dos clics, sin campos obligatorios adicionales. documentalo en el mvp yen prompts
```

**Qué salió:** funcionó a la primera. Moví el bullet de "Alcance" a "NO-alcance" en `docs/prd/alcance-mvp-ach.md`, con justificación añadida (el MVP cubre la edición estándar de la tarea incluido el estado; una interacción dedicada de cambio rápido no valida por sí sola la adopción, se justifica después si hace falta).

---

## Prompt 7

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
tu cual dudarias en meter y el porque, dimelo aqui en el chat de forma sencilla
```

**Qué salió:** funcionó a la primera. Propuso "notificaciones push" como la exclusión más dudosa: se descarta por ir contra la forma de señal decidida (resumen que se consulta, no aviso que interrumpe), pero el propio riesgo #1 del producto (que la info se quede vieja) depende de que la gente entre sola a mirar el resumen — un aviso mínimo sería la mitigación más obvia a ese riesgo, y se descarta por principio sin probarla.

---

## Prompt 8

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
escribelo con mis palabras y añadelo en el mvp
```

**Qué salió:** funcionó a la primera. Reescribió la respuesta del Prompt 7 en primera persona y la metió en `docs/prd/alcance-mvp-ach.md`, sustituyendo el placeholder `[PENDIENTE]` de la sección "La exclusión de la que menos seguro estoy".
