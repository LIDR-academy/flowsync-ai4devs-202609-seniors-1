# Alcance MVP de FlowSync

## 0. El terreno que ya existe

- **Capacidades construidas:** solo autenticación. Registro, login con token de acceso, ver el perfil propio y logout. No hay nada de tareas, equipos, estados ni tiempo real.
- **Modelo de datos:** usuarios (email, nombre completo, contraseña) y sus tokens de acceso. Nada más.
- **Frontend:** tres pantallas (login, registro y perfil) con rutas protegidas.
- **Consecuencia:** todo lo que es FlowSync está por construir. Lo que ya existe es la identidad de cada usuario, y se reutiliza tal cual.

## 1. Problema

Hoy, en un equipo remoto pequeño, nadie ve en qué está cada uno sin interrumpir a alguien. Eso tiene dos costes:

- **La ronda de "¿en qué estás?"** se come la mitad de la daily de 15 minutos y se repite a lo largo del día por Slack.
- **Se duplica trabajo porque la información llega tarde.** En el caso de estudio, dos personas tocaron el mismo módulo la misma semana sin saberlo y se perdieron dos días.

La parte de bloqueos de la daily es un problema real, pero este MVP no la resuelve.

## 2. Usuarios

- **Quién:** los miembros de un equipo remoto de 3 a 10 personas, todos al mismo nivel. Sin lead ni manager que consuma informes.
- **Caso de estudio:** un equipo de 6 personas de un producto SaaS, repartido en 3 husos horarios, con un gestor de tareas pesado y daily por videollamada.
- **Cobran el valor dos perfiles:** el que está a punto de empezar algo que otro ya tiene entre manos, y el que tendría que interrumpir a alguien para preguntar.

## 3. Propuesta de valor

Una única lista de tareas del equipo, que es a la vez tu cola de trabajo y el estado de todos:

- Cambiar una tarea de estado cuesta segundos, sin salir de la lista ni abrir un formulario.
- Los cambios de los demás aparecen solos.
- Al llegar por la mañana ves qué está en curso, de quién es y qué está libre. Así no empiezas lo que otro ya está tocando y eliges lo siguiente sin preguntar.

Quien la actualiza también gana en el momento: es la lista que mira para decidir qué coge, y deja de recibir el "¿cómo va?".

## 4. Alcance

1. **Lista compartida:** todos los registrados ven y actualizan la misma lista de tareas, en un único espacio.
2. **Crear una tarea con solo el título**, en segundos. Quedártela al crearla y ponerle fecha de vencimiento son opcionales. La fecha está porque la ficha la pone como uno de los cuatro datos de una tarea: se ve en la lista, pero no se destaca ni se filtra por ella.
3. **Cambiar el estado de una tarea sin salir de la lista ni abrir un formulario**, en segundos, con tres estados fijos: pendiente, en curso y hecha.
4. **Quedarte una tarea libre o soltarla.** Una tarea sin responsable se considera libre, y "me la quedo" es una sola acción: te la asigna y la pasa a en curso a la vez, que es justo lo que evita que dos personas empiecen lo mismo. Solo puedes asignártela a ti.
5. **Borrar una tarea**, para que las que nadie va a hacer no se queden en la lista como pendientes y libres, ensuciando la señal de qué está libre. Una errata se corrige borrando y creando de nuevo.
6. **Filtrar la lista por estado**, para centrarse en lo pendiente.
7. **Ver los cambios de los demás sin refrescar ni preguntar.**

El registro y el login ya están construidos. Se reutilizan y no cuentan como alcance.

> **Hallazgo:** la primera versión del punto 3 decía "en dos clics", y al discutirlo apareció la tentación de fijar un kanban con arrastrar y soltar. Las dos cosas son diseño de interacción, no producto. Aquí se queda el requisito (actualizar cuesta segundos, sin formulario), y el gesto concreto se decide en diseño.

## 5. NO-alcance

La hipótesis a validar es que, a la semana de uso, el equipo cancela la ronda de "¿en qué estás?" porque el estado se ve de un vistazo y la gente lo mantiene al día. Cada exclusión se justifica contra esa hipótesis.

- **Varios equipos o espacios, y gente en más de uno:** fuera, porque con un solo equipo de 6 ya se comprueba si la ronda desaparece. Queda como supuesto.
- **Roles y permisos (ni básicos ni avanzados):** fuera, porque los roles son planos por decisión de producto: todos ven y editan lo mismo. La jerarquía no ayuda a validar que la lista sustituye a la ronda.
- **Presencia ("quién está conectado") e indicadores de actividad:** fuera a propósito. El estado es de la tarea, no de la persona, y lo otro es vigilancia.
- **Notificaciones push, por email o recordatorios de vencimiento:** fuera, porque la señal es un resumen que espera, no un aviso que interrumpe. Interrumpir es justo el dolor que queremos quitar.
- **Chat o comentarios en las tareas:** fuera, porque "tiempo real" no es conversación, y un hilo reabre el canal de interrupciones.
- **Derivar el estado de Git, PRs, CI o el calendario:** fuera, porque es otro producto, con integraciones y OAuth de terceros. Lo que hay que validar es si la gente actualiza el estado a mano cuando hacerlo cuesta segundos.
- **Integración con Slack:** fuera, porque avisar en Slack vuelve a meter la señal en el canal que interrumpe, y es una integración de terceros con OAuth. Hay que validar que el equipo va a mirar la lista, no que la lista le escriba.
- **Importar o sincronizar con otro gestor:** fuera, porque FlowSync sustituye al gestor, no convive con él. Convivir obliga a actualizar dos veces y así muere esta categoría.
- **Sprints, estimaciones, épicas y backlog priorizado:** fuera por renuncia explícita. Un equipo que necesite eso no es nuestro usuario.
- **Analítica y reporting:** fuera, porque el valor lo cobran los pares y no hay reporte hacia arriba. Una métrica de productividad no ayuda a validar que la ronda desaparece, y convierte la lista en un sitio donde se cuenta el trabajo en vez de hacerlo.
- **Asignar una tarea a otra persona** (recorte propio): fuera, porque no ayuda a validar que cada uno declara en qué está. Asignar a otros es decidir por alguien, que se acerca al rol de lead que la ficha descarta; con "me la quedo" basta.
- **Editar una tarea** (recorte propio, mejora futura): fuera, porque con solo título, responsable y fecha, borrar y crear de nuevo cuesta segundos. Volverá a hacer falta en cuanto la tarea tenga descripción o adjuntos, que también están fuera.
- **Ver solo las tuyas** (recorte propio, mejora futura): fuera, porque con 6 personas la lista del equipo filtrada por estado se lee de un vistazo, y tus tareas se reconocen por el responsable. Tiene sentido cuando la lista crezca.
- **Filtrar por quién creó la tarea:** fuera, porque con roles planos importa quién la tiene ahora, no quién la escribió. Ninguna de las dos decisiones del MVP (no empezar lo que otro toca, coger algo libre) depende del creador, y mirarlo acerca la lista a contar el trabajo.
- **Estados o flujos configurables:** fuera, porque configurar es el "rollo de Jira". Tres estados fijos bastan para saber quién está en qué.
- **Descripción larga, subtareas, etiquetas, prioridad y adjuntos:** fuera, porque cada campo añade fricción al actualizar, y que la gente actualice es el riesgo número 1.
- **Marcar una tarea como bloqueada:** fuera, porque la parte de bloqueos de la daily sigue existiendo y este MVP no pretende resolverla.
- **Destacar las tareas vencidas** (recorte propio): fuera, porque no ayuda a validar que el equipo ve en qué está cada uno. Plazos y retrasos responden a otra pregunta, qué priorizar o qué no llegó a tiempo, y ese no es el dolor que ataca el MVP.
- **Resaltar qué ha cambiado desde tu última visita** (recorte propio, mejora futura): fuera, porque no ayuda a validar que el equipo deja la ronda de "¿en qué estás?". Al volver ya ves el estado actual, y eso basta para decidir qué coges. Resaltar los cambios ahorraría repasar la lista entera para deducir qué se ha movido, así que es la primera mejora de eficiencia a considerar después del MVP.
- **Historial o registro de actividad por persona:** fuera, porque para decidir qué coger basta el estado actual. El historial sirve para contar el trabajo, no para hacerlo.
- **App móvil nativa:** fuera, porque el caso de uso es llegar al puesto o volver de una reunión, y la web cubre ese momento.

### Supuestos

- El espacio es único, y cualquiera que se registra entra en él y lo ve todo. Vale para el caso de estudio, pero no para producción.
- El riesgo número 1 es que la información se quede vieja. La mitigación es que actualizar cueste segundos sin salir de la lista, no obligar a nadie.

## Las tres líneas

1. La IA propuso **9** cosas dentro; tras mi recorte quedaron **7**, y tres de ellas (quedarse una tarea, borrar y filtrar) adelgazadas respecto a la propuesta.
2. Tres cosas que dejé fuera:
   - **Asignar una tarea a otra persona** fuera, porque no ayuda a validar que cada uno declara en qué está. Asignar a otros es decidir por alguien, que es el rol de lead que este equipo no tiene; con "me la quedo" la decisión la toma quien va a hacer la tarea.
   - **Resaltar qué ha cambiado desde tu última visita** fuera, porque no ayuda a validar que el equipo deja la ronda de "¿en qué estás?". Para decidir qué cojo basta el estado actual, que ya veo al volver. Saber qué se movió me ahorraría tiempo, pero no cambia la decisión: es la primera mejora de eficiencia después del MVP.
   - **Ver solo las tuyas** fuera, porque no ayuda a validar que cada uno ve en qué están los demás; de hecho lo esconde. Con 6 personas la lista del equipo filtrada por estado se lee de un vistazo, y mis tareas las reconozco por el responsable.
3. La exclusión de la que menos seguro estoy es **destacar las tareas vencidas**. La ficha de hechos pedía la fecha precisamente para ver de un vistazo qué se ha pasado de plazo, y al recortarlo la dejo como un campo que se apunta pero que la lista no aprovecha. Entraría si, en la semana de uso, la daily sigue gastando tiempo en "¿esto cuándo sale?" o "esto se nos ha pasado": sería la señal de que ver en qué está cada uno no basta sin ver también qué va tarde.
