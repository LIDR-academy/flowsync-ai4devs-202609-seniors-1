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

**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está
trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas
compartidas pero más en tiempo real y menos rollo que Jira.

Antes de especificar nada, explora el repositorio y dime en 3-5 líneas: qué capabilities
hay ya construidas hoy, y cómo es el modelo de datos actual. No propongas todavía nada
de producto ni de alcance, solo el resumen de lo que ya existe.
```

**Qué salió:** Capabilities ya construidas, modelo de datos actual. Resumen: En una frase: FlowSync hoy es un esqueleto de auth (usuario se registra, entra, ve su perfil, sale) — el dominio de "qué está haciendo cada uno" todavía no tiene ni una tabla.

---

## Prompt 2
**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
Antes de proponer nada de alcance, hazme las 5 preguntas que más reducirían la
incertidumbre sobre el problema, los usuarios y el alcance de este producto.

Una sola ronda: las 5 preguntas de una vez, no vayas soltándolas de una en una.
No bajes a modelo de datos ni a endpoints — esas preguntas son de producto, no
de implementación. Si con mis respuestas te queda algo sin cubrir, no me lo
vuelvas a preguntar: decide tú y márcalo como supuesto.
```

**Qué salió:** Una sola ronda pero con 5 preguntas de cada categoría (Dolor principal, Usuario y alcance, Granuralidad y Actualización) en lugar de 5 preguntas en total. 

---

## Prompt 3
**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
Aquí tienes todas las respuestas, si algo no está en ellas márcalo como supuesto 
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

Y lo que ya está decidido que queda fuera del MVP, por si empujas hacia ahí sin querer:
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** 
Recogido. Recapitulo en corto para confirmar que lo tengo bien, y marco lo que falta como supuesto.

Núcleo del problema: la ronda de "¿en qué estás?" de la daily y las interrupciones ad-hoc existen porque nadie ve el estado sin preguntar. Duele a los pares, no a un manager. La daily no desaparece — solo esa ronda.

Qué es "tiempo real" aquí: frescura del estado de la tarea, consultada cuando el usuario quiere (resumen, no push). Nada de presencia ni chat — lo tengo claro y anotado para no derivar ahí.

MVP: espacio único sin entidad equipo, tarea = título/responsable/estado/fecha, filtrable por estado, edición manual de dos clics, roles planos, sin sprints/backlog/integraciones/comentarios/push/Slack/roles avanzados/analítica.

Supuestos que añado porque no estaban explícitos (no te los voy a volver a preguntar, los dejo marcados en el spec cuando lo escriba):
- Estados de la tarea: 3 estados simples (pendiente / en curso / hecho) — sin estado "bloqueada", porque los bloqueos los sigue resolviendo la daily.
- Cualquier usuario puede crear, editar y reasignar cualquier tarea (coherente con roles planos).
- Las tareas completadas no se archivan ni se borran: quedan visibles, se sacan de la vista con el filtro.
- No hay historial de cambios ni feed de actividad separado — "ver qué se ha movido" es la propia lista, actualizada.
- Una tarea vencida se marca visualmente en la lista (sin escalado ni notificación, porque el push está fuera).

Esto ya lo he guardado como memoria del proyecto para no perderlo entre sesiones. ¿Quieres que pase directamente a montar el spec (con la skill crear-spec-sdd) o prefieres revisar antes algo del recap?

---

## Prompt 4
**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
Con lo que hemos hablado, propón el alcance del MVP en cinco bloques, en este orden:
Problema, Usuarios, Propuesta de valor, Alcance, y NO-alcance.

Sé agresivo recortando: prefiero un MVP fino y defendible a uno amplio. El bloque de
NO-alcance es tan importante como el de Alcance — justifica cada exclusión, no te
limites a listarlas.
```

**Qué salió:** Genera una buena primera propuesta con la descripción del problema claro, los usuarios destino y una propuesta de valor razonable. Además, tiene un alcance bastante razonable para la primera iteración y sobre todo un no-alcance todavía más razonable con hasta 11 puntos. Empieza a sugerir aterrizar a historias de usuario. Pongo solo alcance y no alcance.

4. Alcance

- Un espacio de trabajo único y compartido por todos los usuarios autenticados (reutiliza el auth que ya existe, no se toca).
- Tareas con: título, responsable, estado (pendiente / en curso / hecho), fecha de vencimiento.
- Crear tarea, cambiar su estado, reasignar responsable — cualquier usuario, sobre cualquier tarea.
- Lista de tareas filtrable por estado.
- Marca visual de tarea vencida (fecha pasada), sin lógica adicional.
- "Tiempo real" = el estado está fresco cuando entras a mirar la lista, no un stream en vivo ni polling.

5. NO-alcance

- Notificaciones push / integración Slack — convertirían el resumen que se consulta por decisión propia en una interrupción, justo lo que se quiere eliminar.
- Indicadores de presencia ("quién está conectado") — es vigilancia, no frescura de tarea; rechazado a propósito, no por olvido.
- Chat, videollamada, edición simultánea — el problema es visibilidad de estado, no comunicación en vivo; añadirlo sería resolver un problema distinto.
- Comentarios en tareas — abriría una segunda vía de conversación que compite con la daily/el chat existente; el MVP no es un canal de discusión.
- Roles y permisos avanzados — el equipo objetivo es plano; construir jerarquía es coste sin nadie que lo pida.
- Sprints, estimaciones, épicas, backlog priorizado, analítica/reporting — es exactamente la complejidad de Jira que este usuario rechaza; si la necesita, no es nuestro usuario.
- Historial de cambios / feed de actividad — la lista filtrable ya responde "qué se ha movido"; un histórico aparte es alcance de auditoría, no de este problema.
- Múltiples equipos/organizaciones, o gente en más de un equipo — no está validado que haga falta, y exige una entidad completa (equipo/org) antes de saber si el espacio único funciona.
- Resolución de bloqueos — sigue siendo la parte de la daily que no se toca; ya se decidió no modelar un estado "bloqueada".
- Derivar estado desde Git/PRs/CI/calendario — exige integraciones y OAuth de terceros: es otro producto, y rompe la premisa de que lo escribe quien lo vive, en dos clics.
- Archivado/borrado de tareas completadas — no aporta a validar si el equipo deja de hacer la ronda de la daily; se pospone.

---

## Prompt 5
**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
 ¿Por qué no está en el alcance el archivado o borrado de las tareas completadas? Justifica mejor por qué es buena idea dejarlo fuera del alcance para el MVP.
```

**Qué salió:** Justificación con razones sólidas y planteamiento de candidato natural a v2 después del mvp. Esta es la salida:

Buena pregunta, la justificación que di antes era floja. Razones más sólidas, apoyadas en tus propios criterios de esta conversación:

- El filtro ya resuelve el problema que el archivado dice resolver. El objetivo de archivar sería "que la lista no se llene de ruido". Pero filtrar por estado ya saca las tareas hechas de la vista que importa (pendiente/en curso). Archivar sería construir una segunda solución para un problema que el Alcance ya cubre.
- A la escala de validación, el problema ni existe. El criterio de éxito es una semana de uso real con un equipo de 6-10 personas. Eso son, como mucho, unas pocas decenas de tareas completadas. No hay volumen que archivar ni nada que "se acumule" en ese horizonte — es resolver un problema que aparecería (si acaso) meses después de validar la hipótesis, no dentro de ella.
- No es una acción de dos clics, es una decisión de producto nueva. Roles planos significa que cualquiera archivaría o borraría el trabajo de cualquiera. Eso obliga a decidir: ¿se puede deshacer?, ¿quién puede borrar el trabajo de otro?, ¿borrado duro o soft-delete? Son preguntas que no tienen respuesta obvia y añaden fricción exactamente donde dijiste que no debía haberla.
- No beneficia a quien haría el clic. Tu propio criterio para justificar por qué la actualización de estado se sostiene fue: "si el beneficio fuera solo para los demás, no lo escribiría". Archivar es tidiness para el espacio compartido, no una acción que ayude a la persona a decidir qué coge a continuación — es limpieza, no señal.
- Compite con el riesgo #1 que ya asumiste. Dijiste que el riesgo a validar es que el estado se quede desactualizado, y que la mitigación es que actualizar cueste dos clics y nada más. Añadir una tarea de mantenimiento (archivar/borrar) es exactamente el tipo de fricción extra que pone en peligro esa mitigación, sin aportar nada a la pregunta que este MVP quiere responder.

En corto: archivar no mueve la aguja de "¿el equipo dejó de hacer la ronda de la daily?", y sí introduce fricción y decisiones nuevas. Es candidato natural a v2, cuando (si) el volumen real de tareas completadas demuestre que hace falta.

---

## Prompt 6
**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
En el bloque de Alcance incluiste "reasignar responsable — cualquier usuario, sobre cualquier tarea", pero en las respuestas proporcionadas no aparece nada sobre ello. La ficha dice que el estado "lo teclea la persona que hace la tarea",lo cual apunta a autogestión, no a que unas personas muevan el trabajo de otras.

Justifica por qué esto tiene que estar en el alcance del MVP y no fuera: ¿qué hipótesis del producto ayuda a validar? ¿Por qué no basta con que cada persona solo cree y actualice sus propias tareas, sin tocar las de nadie más?
```

**Qué salió:** Lo intenta justificar y no aguanta, lo saca del alcance. Esta es la respuesta: 

Tienes razón, y al repasarlo no aguanta. Voy a intentar justificarlo honestamente y explico por qué falla.

La única hipótesis que este MVP valida es: "si el equipo ve el estado de las tareas sin preguntar, deja de hacer la ronda de la daily". Para eso hacen falta dos cosas: visibilidad (ver el estado de todos) y autoactualización barata (dos clics, quien hace la tarea la teclea). Reasignar el trabajo de otra persona no aparece en esa cadena causal en ningún punto.

Busqué una hipótesis que lo sostuviera y no la encontré:
- El episodio que motiva el producto (dos personas tocando el mismo módulo) se resuelve con visibilidad — verlo a tiempo — no con la capacidad de quitarle la tarea a alguien.
- "Elegir lo siguiente sabiendo qué está libre" tampoco lo pide: "libre" ahí es una tarea en estado pendiente, no una tarea sin dueño que haya que reclamar. El campo responsable es obligatorio desde la creación, así que siempre hay alguien asignado — no hay hueco de "sin asignar" que reasignar.
- Lo único que tus respuestas describen sobre quién toca qué es "el estado lo teclea la persona que hace la tarea" — autogestión del propio trabajo, no gestión del trabajo ajeno.

¿Por qué no basta con "cada uno crea y actualiza lo suyo"? Basta. Crear una tarea y nombrar como responsable a otra persona ya cubre la coordinación real que describiste ("le encargo esto a Bob") — eso pasa una vez, al crear, no es "reasignación" como capacidad aparte. Lo que sobra es la idea de que cualquiera pueda cambiar después el responsable de una tarea que no es suya: eso no resuelve el dolor original, y abre una pregunta que tus respuestas no responden (¿qué pasa si le quito a Bob una tarea que ya empezó?) sin que haya un beneficio que la justifique.

Lo saco del Alcance. La línea correcta queda:

- Crear tarea (con responsable asignado en ese momento), y cambiar el estado de las tareas propias.

Si más adelante aparece un caso real donde haga falta reasignar, se añade con esa evidencia — no antes.
---

## Prompt 7
**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
¿Solo el dueño de una tarea puede cambiar su estado? ¿O cualquier usuario puede cambiar el estado de cualquier tarea? Justifica la respuesta para ver qué hay en el alcance y que no, teniendo en cuenta como hemos hablado que sea coherente con la autogestión que buscamos en la herramienta.
```

**Qué salió:** Argumentación muy sólida, además declara los riesgos como las bajas/vacaciones para revisarlo en el v2. Esta es la respuesta:

Solo el responsable puede cambiar el estado de su propia tarea. Cualquiera puede ver el estado de todas, pero editarlo está restringido al dueño. Y no es una excepción a "roles planos" — es la misma decisión aplicada con coherencia.

Por qué se ancla directamente en lo que dijiste: "el estado lo teclea la persona que hace la tarea" no es una preferencia de estilo, es la definición del mecanismo. Si cualquiera pudiera tocar el estado de la tarea de otro, ya no sería la persona que hace la tarea quien lo teclea — sería otra cosa, y esa frase dejaría de describir el producto.

Por qué es necesario para que se sostenga (tu propio argumento del "por qué se sostiene"): dijiste que la persona actualiza su estado porque le sirve a ella — organiza su propia cola y de paso deja de recibir interrupciones. Ese incentivo depende de que sea su declaración. Si Bob pudiera marcar como "hecho" una tarea de Alicia, el campo deja de ser una declaración personal fiable y pasa a ser un campo compartido que cualquiera pisa — exactamente el tipo de cosa que rompe la confianza en que lo que ves está fresco y es cierto.

Por qué reduce, no aumenta, el riesgo #1: el riesgo que marcaste como el más importante es que la información se quede vieja o se vuelva poco fiable. Abrir la edición de estado a cualquiera no evita ese riesgo, lo empeora: introduce la pregunta de quién es la fuente de verdad cuando dos personas pueden escribir sobre el mismo campo. Restringirlo al dueño elimina esa ambigüedad sin coste — no hay que decidir prioridades ni resolver conflictos de escritura.

Por qué no contradice "roles planos, sin jerarquía de permisos": esa frase describe ausencia de niveles (no hay admin/lead con más capacidad que el resto) para las acciones generales — ver todo, crear tareas, filtrar. Restringir la edición del estado al dueño no es un sistema de roles: no hay tabla de permisos, no hay configuración, no hay niveles — es una única regla fija ("edita quien es responsable de la tarea"), tan simple como el resto del alcance. Es lo contrario de "roles y permisos avanzados", no una excepción a ello.

Coherencia con lo que ya cortamos: como el responsable se fija al crear y no se puede reasignar después, la persona que teclea el estado es siempre la misma que aparece como dueña desde el principio. Autoría de la tarea y autoría del estado son la misma persona durante todo el ciclo de vida — no hay costura donde antes había ambigüedad.

Lo dejo como supuesto abierto, no como pregunta: qué pasa si el responsable está de baja/vacaciones y la tarea necesita moverse — no está cubierto en el MVP (es la misma familia de problema que la reasignación, ya excluida). Si aparece como fricción real, se revisa en v2.

---

## Prompt 8
**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
La información proporcionada pide que cada tarea tenga fecha de vencimiento, con una marca visual cuando está vencida. Pero la única hipótesis que este MVP valida es la visibilidad de estado para eliminar la ronda de "¿en qué estás?" de la daily — no la gestión de plazos, que es un problema distinto.

Antes de aceptarlo en el alcance: ¿la fecha de vencimiento ayuda a validar esa hipótesis, o es una funcionalidad que se coló en la ficha por costumbre (todo gestor de tareas tiene fecha) sin que nadie comprobara si hace falta para este MVP concreto? Si la sacas del todo, ¿qué se rompe exactamente del criterio de éxito?
```

**Qué salió:** 

No ayuda a validar esa hipótesis, y se coló por costumbre. Vale la pena mirarlo con la misma vara que usé para la reasignación, aunque esta sí viniera en tu ficha original — que estuviera en tus respuestas no la hace automáticamente necesaria para este MVP.

Repasando qué pregunta responde cada cosa:
- Estado (pendiente/en curso/hecho) responde "¿en qué está cada uno ahora mismo?" — es la pregunta de la ronda de la daily que quieres eliminar.
- Fecha de vencimiento + marca de vencida responde "¿qué se nos ha pasado de plazo?" — es una pregunta de gestión de plazos, no de actividad actual. Es el mismo tipo de pregunta que sprints/estimaciones, que ya excluiste explícitamente.

Busqué una conexión real con la hipótesis y no aguanta:
- El episodio que motiva el producto (trabajo duplicado) se evita viendo estado y responsable, no fechas.
- "Elegir lo siguiente sabiendo qué está libre" lo defines por estado (pendiente = libre), no por vencimiento.
- "Resumen que espera... llego por la mañana y veo qué se ha movido" describe cambios de estado, no plazos vencidos — son señales distintas aunque ambas quepan bajo "vistazo rápido".
- La resolución de bloqueos (que es donde una fecha vencida normalmente importaría — "esto lleva parado, hay un problema") la dejaste explícitamente fuera, resuelta por la daily.

Qué se rompe en el criterio de éxito si lo quitas del todo: nada. El criterio es "el equipo cancela la ronda de '¿en qué estás?' y nadie pide que vuelva". Eso depende de que el estado se vea de un vistazo y esté fresco — no depende en ningún punto de si algo está vencido o no. Puedes borrar el campo entero y la hipótesis se sigue pudiendo validar exactamente igual.

Coste que sí tiene dejarlo: es un cuarto campo obligatorio en la creación de la tarea, en un producto cuya tesis central es fricción mínima. Cada campo que no está tirado directamente por la hipótesis es fricción gratis.

Lo saco del alcance. Tarea queda en tres campos: título, responsable, estado. Fecha de vencimiento (y su marca visual) pasa a NO-alcance: es gestión de plazos, un problema distinto al que este MVP valida, y su ausencia no afecta al criterio de éxito.

## Prompt 9
**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
Actualiza los 5 bloques con los cambios acordados
```

**Qué salió:** 

1. Problema

En equipos remotos pequeños, nadie ve en qué está trabajando cada uno sin preguntar. Eso genera dos costes: la ronda de "¿en qué estás?" que se come media daily, y colisiones de trabajo por falta de visibilidad (episodio real: dos personas tocando el mismo módulo la misma semana, dos días perdidos). El dolor es entre pares, no un problema de reporting hacia un manager.

2. Usuarios

Equipos remotos de producto/ingeniería, 3-10 personas, roles planos: todos ven lo mismo, sin jerarquía. Caso de estudio (no cliente real): equipo de 6 personas en 3 husos horarios que hoy usa un gestor de tareas pesado más una daily de 15 minutos por videollamada.

3. Propuesta de valor

Ver el estado del trabajo del equipo de un vistazo, sin preguntar y sin esperar a la daily — y actualizarlo cuesta dos clics porque cada persona ya usa esa misma lista para decidir qué hace. Sustituye la ronda de estado de la daily; no sustituye la conversación de bloqueos.

4. Alcance

- Un espacio de trabajo único y compartido por todos los usuarios autenticados (reutiliza el auth que ya existe, no se toca).
- Tareas con tres campos: título, responsable, estado (pendiente / en curso / hecho).
- El responsable se fija al crear la tarea (el creador lo nombra, puede ser él mismo o un compañero) y no cambia después.
- Solo el responsable de una tarea puede cambiar su estado. Cualquier usuario puede ver el estado de todas las tareas.
- Lista de tareas filtrable por estado.
- "Tiempo real" = el estado está fresco cuando entras a mirar la lista, no un stream en vivo ni polling.

5. NO-alcance

- Fecha de vencimiento / marca de tarea vencida — responde "¿qué se nos ha pasado de plazo?", una pregunta de gestión de plazos distinta a la que este MVP valida ("¿en qué está cada uno ahora?"). Ningún criterio de éxito depende de ella; quitarla no rompe nada y ahorra un campo obligatorio de creación.
- Reasignar responsable de una tarea ajena — no está evidenciado en ningún caso de uso descrito; la coordinación real ("le encargo esto a Bob") ya queda cubierta al nombrar el responsable en la creación. Permitir tocar el trabajo de otro después rompe la autogestión que sostiene todo el mecanismo.
- Notificaciones push / integración Slack — convertirían el resumen que se consulta por decisión propia en una interrupción, justo lo que se quiere eliminar.
- Indicadores de presencia ("quién está conectado") — es vigilancia, no frescura de tarea; rechazado a propósito.
- Chat, videollamada, edición simultánea — el problema es visibilidad de estado, no comunicación en vivo.
- Comentarios en tareas — abriría una segunda vía de conversación que compite con la daily/el chat existente.
- Roles y permisos avanzados — el equipo objetivo es plano; construir jerarquía es coste sin nadie que lo pida.
- Sprints, estimaciones, épicas, backlog priorizado, analítica/reporting — es la complejidad de Jira que este usuario rechaza explícitamente.
- Historial de cambios / feed de actividad — la lista filtrable ya responde "qué se ha movido".
- Múltiples equipos/organizaciones, o gente en más de un equipo — no validado que haga falta; añade una entidad completa antes de saber si el espacio único funciona.
- Resolución de bloqueos — sigue siendo la parte de la daily que no se toca.
- Derivar estado desde Git/PRs/CI/calendario — exige integraciones y OAuth de terceros; rompe la premisa de que lo escribe quien lo vive, en dos clics.
- Archivado/borrado de tareas completadas — no mueve la aguja del criterio de éxito a la escala de una semana de validación; añade fricción y decisiones (¿quién puede borrar el trabajo de quién?) sin beneficio para quien haría la acción.
