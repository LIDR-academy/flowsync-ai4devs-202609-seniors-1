# Alcance del MVP — FlowSync

## Petición de producto

> «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira»

## 1. El terreno que ya existe

- **Capabilities:** solo gestión de cuenta. Registrarse (email + contraseña, nombre opcional), iniciar sesión, ver tu propio perfil y cerrar sesión; el frontend son esas tres pantallas: login, registro y perfil.
- **Modelo de datos:** dos entidades. Usuario (email único, contraseña, nombre opcional; las iniciales se calculan) y token de acceso (la sesión, ligada a su usuario).
- **No existe:** ni equipo, ni tarea, ni estado, ni actividad, y ningún usuario puede ver a otro; tampoco hay nada en tiempo real.
- **Lectura:** todo lo que pide producto es nuevo; lo aprovechable es la identidad y la sesión. La UI ya promete «tareas» y «equipo» sin nada detrás.

## 2. El interrogatorio

1. **¿Quién es el primer equipo que lo usaría (cuántas personas, qué tipo de trabajo) y quién de ellos necesita saber en qué está cada uno?** Decide el usuario principal y si el producto sirve para coordinarse entre compañeros o para supervisar.

   **Respuesta:** equipos remotos pequeños, de 3 a 10 personas, con roles planos: todos ven y editan lo mismo. El caso de estudio (no un cliente real) es un equipo de 6 de producto SaaS en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada. El valor lo cobran los pares, no un lead: quien descubre tarde que iba a lo mismo que otro y quien interrumpe para preguntar. No hay reporte hacia arriba.

2. **¿Qué obtienen hoy esos equipos de sus reuniones de sincronización que FlowSync tendría que darles sin reunión?** Decide qué significa «en qué está trabajando cada uno», que es el núcleo del producto.

   **Respuesta:** hoy nadie ve el estado del equipo sin interrumpir a alguien. Lo que se sustituye es la ronda de «¿en qué estás?», que se come la mitad de la daily, y el mismo «¿en qué estás?» constante por chat. La daily no desaparece: la parte de bloqueos sigue y este MVP no la resuelve. La decisión que cambia es no empezar algo que otro ya está tocando y elegir lo siguiente sabiendo qué está libre. Episodio del caso: dos personas tocaron el mismo módulo la misma semana; dos días perdidos.

3. **«Más en tiempo real»: ¿a partir de cuánto retraso deja de ser útil saber en qué está alguien?** Decide si el tiempo real entra en el MVP o basta con información al día cuando se consulta.

   **Respuesta:** entra, entendido como ver los cambios de estado de las tareas sin refrescar ni preguntar; no se da un umbral. Es frescura, no presencia: el estado es de la tarea, no de la persona, y «quién está conectado» se rechaza por vigilancia. Es un resumen que espera, no un aviso que interrumpe: «llego por la mañana o vuelvo de una reunión y veo qué se ha movido». Ni chat, ni videollamada, ni edición simultánea, ni notificaciones push.

4. **¿Qué lugar ocupa FlowSync respecto a lo que el equipo ya usa para gestionar su trabajo, y qué parte de Jira es el «rollo» que no hay que repetir?** Decide si construimos gestión de tareas o solo visibilidad, y marca el NO-alcance.

   **Respuesta:** lo sustituye, no convive: FlowSync crea las tareas, porque convivir exige doble actualización. «Menos rollo» es crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Se renuncia a sprints, estimaciones, épicas, backlog priorizado e informes: un equipo que los necesite no es el usuario. Una tarea tiene título, responsable, estado y fecha de vencimiento (para ver qué se ha pasado de plazo), y la lista se filtra por estado. El estado lo teclea quien hace la tarea; derivarlo de Git, CI o calendario queda fuera.

5. **¿Qué tendría que pasar, y en cuánto tiempo, para dar el MVP por validado?** Decide qué estamos validando y, con ello, qué se puede recortar.

   **Respuesta:** tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva; si la siguen haciendo igual, no funcionó. El riesgo #1 es que la información se quede vieja. Se mitiga con que actualizar cueste dos clics, sin obligar a nadie, y con que quien escribe cobre en el momento: esa lista es su cola de trabajo y le ahorra interrupciones. Se construye una vertical fina, usable de punta a punta: una capability terminada antes que tres a medias.

**Fuera del MVP, decidido por producto:** notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting y comentarios en tareas.

### Supuestos

Los marcados «ficha» los fija producto; el resto son decisiones tomadas para huecos que la ficha no cubre.

- **Un solo espacio (ficha):** un único espacio compartido, sin entidad «equipo». Varios equipos separados, o personas en más de uno, quedan fuera.
- **Acceso:** quien tiene cuenta está dentro del espacio y lo ve todo; no hay invitaciones. Vale para un piloto de un solo equipo, no para abrirlo a cualquiera.
- **Estados:** Pendiente, En curso y Hecha. Sin «Bloqueada»: los bloqueos siguen en la daily.
- **Campos obligatorios:** solo el título. El responsable es opcional y toda tarea nace Pendiente.
- **«Libre»:** una tarea sin responsable. Se reclama empezándola, que la pasa a En curso y te hace su responsable, o asignándotela; si otro la reclamó antes, sigue siendo suya. Reasignar una tarea con dueño es un traspaso, no un reclamo.
- **Orden de la lista:** En curso arriba, luego Pendiente y Hecha al final, para que quién está en qué se vea sin filtrar.
- **Frescura:** lo que cambia otro aparece en menos de un minuto, y la lista está al día nada más volver a ella; la ficha no da umbral.
- **Plataforma:** web, en el navegador, como lo que ya existe; sin app móvil.
- **Con quién se valida:** el primer usuario es un caso de estudio, pero el criterio exige una semana de uso real. Se valida con un equipo real de 3 a 10 personas que acepte sustituir su ronda por FlowSync durante una semana; el caso de estudio sirve para diseñar, no para validar.

## 3. El alcance

### Problema

Un equipo remoto pequeño no puede saber en qué está cada uno sin interrumpir a alguien. La pregunta «¿en qué estás?» se come la mitad de una daily de 15 minutos y vuelve durante el día por chat. Aun así hay choques: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, y se perdieron dos días. El gestor de tareas pesado que ya usan no lo evita.

### Usuarios

Equipos remotos de 3 a 10 personas, repartidos en varios husos horarios y con roles planos: todos ven y editan lo mismo. El valor lo cobran los pares, no un lead: quien va a coger trabajo y necesita saber qué está libre y qué está tocando otro, y quien hoy interrumpe para preguntar. También quien escribe el estado, porque la lista es su propia cola de trabajo y deja de recibir el «¿cómo va?».

El caso de estudio es un equipo de 6 de producto SaaS en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada. Sirve para diseñar; la validación necesita un equipo real (ver supuestos).

No es para managers que quieren reporte, ni para equipos que necesitan sprints, estimaciones o un backlog priorizado.

### Propuesta de valor

Saber en qué está cada uno sin preguntar a nadie. Una lista de tareas del equipo, al día sin recargar, que dice quién está en qué y qué está libre. Actualizarla son dos clics, sin campos obligatorios, y compensa a quien la actualiza: es su cola de trabajo y le ahorra el «¿cómo va?». Frente al gestor pesado, sin configuración, sprints ni estimaciones; frente a la daily, la ronda de «¿en qué estás?» llega ya respondida.

### Alcance

El MVP existe para validar una sola cosa: que tras una semana de uso real el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva. Es una vertical fina, usable de punta a punta, que reutiliza sin cambios el registro, el inicio y el cierre de sesión que ya existen.

1. **Una lista compartida.** Todo el que tiene cuenta ve la misma lista de tareas. Cada tarea muestra título, responsable y estado, y la lista va ordenada por estado, con lo que está En curso arriba.
2. **Crear una tarea escribiendo solo el título.** El responsable es opcional, y la tarea nace Pendiente.
3. **Cambiar el estado desde la lista en dos clics como máximo:** Pendiente, En curso, Hecha. Empezar una tarea libre te hace su responsable: queda a la vista que alguien la está tocando. Si dos la reclaman casi a la vez, se la queda el primero y el segundo ve que ya tiene dueño.
4. **Editar una tarea:** título y responsable. Asignarse una tarea libre sigue la misma regla, gana el primero; reasignar una que ya tiene dueño es un traspaso deliberado.
5. **La lista se actualiza sola, sin recargar:** lo que cambia otro aparece en menos de un minuto, y al volver a la lista ya está al día.

### NO-alcance

- **«Qué se ha movido»: cuándo cambió cada tarea, historial o feed de actividad** (recorte propio). No ayuda a validar que la ronda desaparece: la ronda pregunta en qué está cada uno ahora, y eso ya lo dice el estado actual de la lista. Saber qué cambió desde ayer es comodidad.
- **Filtrar por estado** (recorte propio). No ayuda a validar que la ronda desaparece: lo que la sustituye es ver de un vistazo quién está en qué, y eso ya lo da la lista ordenada por estado. Filtrar es para una siguiente etapa, cuando la lista crezca.
- **Fecha de vencimiento y vencidas** (recorte propio). No ayuda a validar que la ronda desaparece: la ronda pregunta quién está en qué, no qué llega tarde. Sin las vencidas, la fecha sería un campo más que rellenar sin uso. La ficha de producto la pedía.
- **Actualización al instante.** Basta con menos de un minuto: no empezar lo que otro ya está tocando aguanta ese retraso en un equipo de 3 a 10 personas. Lo que impide que dos reclamen la misma tarea no es la velocidad, sino que gane el primero.
- **Avisos: notificaciones push o email.** FlowSync es un resumen que espera, no un aviso que interrumpe. Además, si la gente reacciona a avisos no sabremos si mira la lista, que es justo lo que hay que validar.
- **Integraciones: Slack, Git/PRs, CI, calendario, sincronizar o importar desde Jira u otro gestor.** La lista tiene que ser el único sitio donde se lee y se escribe el estado; un segundo canal es la doble actualización que mata esta categoría. Derivar el estado es otro producto, y lo que hay que validar es que teclearlo en dos clics basta.
- **Presencia: quién está conectado, última actividad, indicadores de actividad.** Es vigilancia y se rechaza a propósito: el estado es de la tarea, no de la persona.
- **Conversación: comentarios, menciones, chat, videollamada, edición simultánea.** FlowSync enseña el estado de las tareas, no es un sitio para hablar: la conversación sigue en su chat, y comentar no responde a «¿en qué estás?».
- **Planificación: sprints, estimaciones, épicas, backlog priorizado, informes y analítica.** Cada una añade una decisión antes de poder actualizar, y el coste de actualizar es el riesgo #1. Nadie consume informes hacia arriba, y el equipo que necesita esto no es el usuario.
- **Bloqueos: estado «Bloqueada» o su seguimiento.** Siguen en la daily y este MVP no los resuelve. Meterlos mezclaría el criterio de éxito, que es que desaparezca la ronda, no la daily.
- **Más campos en la tarea: descripción, prioridad, etiquetas, adjuntos, subtareas, dependencias.** Una tarea es título, responsable y estado, y cada campo más encarece crear y actualizar. El detalle del trabajo sigue en documentos y chat.
- **Otras vistas: búsqueda, orden a medida, vistas guardadas, tablero, filtro por persona.** Con 3 a 10 personas la lista cabe en una pantalla, y el orden por estado basta para ver primero lo que se está tocando.
- **Borrar tareas.** Una tarea equivocada se edita o se marca Hecha. Con roles planos, borrar permitiría a cualquiera perder el trabajo de otro, y no ayuda a validar nada.
- **Roles, permisos, invitaciones y control de acceso al espacio.** El valor es entre pares y el piloto es un solo equipo en su propio espacio: basta con que quien tiene cuenta esté dentro.
- **Varios equipos, o personas en más de uno.** Un solo espacio basta para validar con un equipo; varios obligan a decidir pertenencias que no tocan la hipótesis.
- **App móvil.** La lista vive abierta en el navegador, junto al trabajo; el móvil no cambia lo que hay que validar.
- **Recuperar contraseña y el resto de gestión de cuenta.** Con 3 a 10 personas, una contraseña perdida se resuelve a mano durante el piloto.

## Parte B: las tres líneas

1. **Los dos números:** la IA propuso 8 cosas dentro (las 7 de su alcance más «qué se ha movido», que planteó como supuesto) y tras mi recorte quedan 5. Recorté 4 y recuperé una, la actualización automática, al ver que costaba poco.
2. **Tres cosas que dejé fuera:**
   - «Qué se ha movido» fuera, porque no ayuda a validar que el equipo deja la ronda de «¿en qué estás?»: la ronda pregunta en qué está cada uno ahora, y eso ya lo responde el estado actual de la lista.
   - Filtrar por estado fuera, porque no ayuda a validar que el equipo ve de un vistazo quién está en qué: con 3 a 10 personas y la lista ordenada por estado, lo que se está tocando ya sale arriba sin filtrar.
   - La fecha de vencimiento fuera, porque no ayuda a validar que la gente deja de preguntar «¿en qué estás?»: responde a otra pregunta, «¿llegamos a tiempo?», y cada campo más encarece crear y mantener tareas.
3. **La exclusión de la que menos seguro estoy:** la fecha de vencimiento, porque producto la pedía expresamente. Entraría si durante la semana de piloto la ronda no desaparece porque se sigue preguntando por plazos, o si el equipo empieza a apuntar fechas en el título de las tareas. No fue la única duda: la actualización automática estuvo fuera y volvió. La saqué por lo que creía que costaba, no porque no ayudara a validar, y por eso el recorte no aguantó (ver hallazgo): en cuanto vi que era barata, entró, porque acorta la ventana en la que dos pueden coger la misma tarea.

## Hallazgo

La conversación solo bajó a arquitectura una vez: la actualización automática se discutió en sockets y peticiones periódicas, no en producto. Subida de nivel, la pregunta era cuánto retraso aguanta la decisión de no empezar lo que otro ya está tocando; en el alcance quedó la respuesta, menos de un minuto, y no el cómo.
