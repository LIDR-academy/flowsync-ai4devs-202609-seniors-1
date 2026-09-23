# Alcance del MVP de FlowSync

## 1. El terreno que ya existe

- **Lo que funciona de punta a punta:** hoy FlowSync solo gestiona la cuenta personal. Un usuario puede registrarse (email, contraseña y nombre opcional), iniciar sesión, ver su perfil (nombre, email, iniciales y fecha de alta) y cerrar sesión.
- **Lo que no existe:** no hay nada del producto en sí: ni tareas, ni equipos, ni estados de trabajo, ni actividad compartida. Tampoco se puede editar el perfil, recuperar la contraseña ni invitar a otra persona.
- **Lo que está a medias o es solo andamiaje:** hay un segundo mecanismo de inicio de sesión (sesión de navegador) configurado pero sin usar, y la estructura de tests está declarada pero vacía.
- **Modelo de datos:** la única entidad de negocio es el **Usuario**, que puede tener varias sesiones abiertas (se borran con él). Los usuarios no se relacionan entre sí: cada cuenta vive aislada y no hay ningún concepto de equipo.
- **Dudas:** no he podido confirmar si las sesiones caducan. No hay caducidad configurada, así que parece que no, pero no lo he probado. Tampoco hay datos de ejemplo precargados.

## 2. El interrogatorio

1. **¿Qué es exactamente lo que alguien quiere saber de sus compañeros: el estado de cada persona o el de las tareas?**
   El de la **tarea**, no el de la persona. Hace falta ver quién está en qué, para no empezar algo que otro ya está tocando, y qué está libre, para elegir lo siguiente.
2. **¿Quién mantiene esa información al día, y cuánto esfuerzo está dispuesto a poner?**
   Lo teclea quien hace la tarea, en dos clics sobre una lista ya abierta, sin campos obligatorios. Se sostiene porque esa lista es su propia cola de trabajo.
3. **¿Cómo es el equipo tipo y cómo se forma?**
   Equipos remotos de 3 a 10 personas, con roles planos y un único espacio compartido. El caso de estudio es un equipo SaaS de 6 personas repartidas en 3 husos horarios.
4. **¿Qué significa "tiempo real" para ellos?**
   Ver los cambios de estado de las tareas sin refrescar ni preguntar. Es un resumen que espera, no un aviso que interrumpe: no es chat, ni presencia, ni notificaciones.
5. **¿Qué reemplaza FlowSync y cómo sabremos que funciona?**
   Sustituye al gestor de tareas pesado y a la ronda de "¿en qué estás?" de la daily, pero no a la parte de bloqueos. Funciona si en una semana el equipo cancela esa ronda y nadie pide que vuelva.

### Supuestos

- **SUPUESTO 1:** toda persona que se registra entra directamente en el único espacio compartido, sin invitaciones ni aprobación.
- **SUPUESTO 2:** hay tres estados fijos y no configurables: *Pendiente*, *En curso* y *Hecha*.
- **SUPUESTO 3:** el responsable es opcional y es una sola persona. Una tarea sin responsable está libre, y cogerla consiste en asignársela uno mismo.
- **SUPUESTO 4:** solo el título es obligatorio. El responsable puede quedar vacío.
- **SUPUESTO 5 (retirado en el recorte):** la fecha de vencimiento sale del MVP, así que ya no hay tareas vencidas que distinguir.
- **SUPUESTO 6:** "ver qué se ha movido" se resuelve con la lista al día, que se actualiza sola. No hay vista de cambios desde la última visita ni historial.
- **SUPUESTO 7:** después de crear una tarea solo se cambian su estado y su responsable. El título no se edita, y las tareas no se borran ni se archivan.
- **SUPUESTO 8:** un único equipo por instalación. Tener varios equipos separados, o una persona en más de uno, no se construye.

## 3. El alcance

### Problema

En un equipo remoto nadie ve en qué está cada uno sin interrumpir a alguien. La mitad de la daily de 15 minutos se va en la ronda de "¿en qué estás?", y el chat se llena de esa misma pregunta. Aun así, dos personas pueden acabar trabajando en lo mismo sin saberlo: en el caso de estudio, dos personas tocaron el mismo módulo la misma semana y se perdieron dos días.

### Usuarios

Los miembros de un equipo remoto pequeño (3–10 personas), todos al mismo nivel. El valor lo cobran los pares: quien va a coger trabajo nuevo y quien deja de recibir interrupciones. No hay lead ni manager como usuario, porque nadie reporta hacia arriba.

### Propuesta de valor

Una única lista de tareas del equipo que es, a la vez, la cola de trabajo de cada uno. Con abrirla basta para saber quién está en qué, y qué está libre, sin preguntar y sin refrescar. Actualizarla cuesta dos clics, y quien la actualiza cobra en el momento: la usa para decidir qué coge y deja de recibir el "¿cómo va?".

### Alcance

- **Un espacio compartido.** Quien se registra con la cuenta que ya existe entra directamente en el espacio común y ve las tareas de todo el equipo. No hay invitaciones ni equipos que crear.
- **Crear una tarea escribiendo solo el título.** El responsable es opcional.
- **Cambiar el estado desde la propia lista, en dos clics.** Hay tres estados: *Pendiente*, *En curso* y *Hecha*.
- **Asignar o cambiar el responsable,** incluido asignársela uno mismo para coger una tarea libre.
- **Una sola lista del equipo.** De cada tarea se ve qué es, quién la lleva y en qué estado está, y queda claro qué está libre.
- **La lista refleja los cambios de los demás sin refrescar.**

### NO-alcance

- **Varios equipos, o una persona en más de uno:** ya decidido que queda fuera. Para validar la hipótesis basta con un solo equipo.
- **Invitaciones o aprobación de altas:** con un solo espacio, registrarse ya es entrar.
- **Roles y permisos:** ya decidido que queda fuera. Todos ven y editan lo mismo.
- **Notificaciones push o avisos:** ya decidido que queda fuera. La señal es un resumen que espera, no una interrupción.
- **Integración con Slack:** ya decidida fuera. Tampoco hace falta para ver el estado de un vistazo.
- **Estado deducido de Git, PRs, CI o calendario:** ya decidido que queda fuera. Es otro producto, con integraciones de terceros.
- **Importar tareas de otro gestor:** FlowSync sustituye al gestor, no lee de él. La hipótesis se valida con tareas creadas aquí.
- **Comentarios en tareas:** ya decidido que queda fuera. No hacen falta para saber quién está en qué.
- **Presencia, "quién está conectado" o indicadores de actividad:** rechazado a propósito, porque es vigilancia. El estado es de la tarea.
- **Chat, videollamada o edición simultánea:** "tiempo real" aquí solo significa estado al día.
- **Sprints, estimaciones, épicas, backlog priorizado:** renuncia explícita. Un equipo que los necesite no es nuestro usuario.
- **Analítica e informes:** ya decidido que queda fuera. Nadie reporta hacia arriba.
- **Resolver bloqueos:** esa parte de la daily sigue existiendo. El MVP solo quiere eliminar la ronda de "¿en qué estás?".
- **Fecha de vencimiento y marcar lo vencido:** la ronda que queremos eliminar pregunta quién está en qué, no qué va con retraso.
- **Filtrar por estado:** con 3–10 personas, la lista entera se abarca de un vistazo.
- **Editar el título de una tarea:** para saber quién está en qué solo hace falta mover el estado y el responsable.
- **Borrar o archivar tareas:** con 3–10 personas, las tareas hechas no tapan la lista durante la prueba.
- **Estados configurables:** tres estados fijos bastan para saber qué está libre, en curso o terminado.
- **Varios responsables por tarea:** con uno basta para saber quién está en qué.
- **Más datos en la tarea (descripción, prioridad, etiquetas, subtareas, adjuntos):** para saber quién está en qué bastan título, responsable y estado. Cada campo más es "rollo".
- **Búsqueda u ordenación:** con 3–10 personas, la lista se abarca de un vistazo.
- **Vista de cambios desde la última visita, o historial:** la lista al día ya responde "qué está pasando ahora", que es lo que cambia la decisión.
- **Editar el perfil o recuperar la contraseña:** no influyen en si el equipo puede cancelar la ronda.

### Pasos siguientes

- Resumen de "qué se ha movido desde tu última visita".
- Filtro de "mis tareas" por responsable.
- Fecha de vencimiento, con lo vencido marcado y editable.
- Filtrar la lista por estado.
- Editar el título de una tarea.
- Archivar tareas hechas.
- Historial de cambios de una tarea.
- Varios espacios de equipo con invitaciones.
- Recuperar la contraseña.

## Parte B: las tres líneas

**1. Los dos números.** La IA propuso 7 cosas dentro del alcance. Después del recorte quedan 6.

**2. Tres cosas que dejé fuera, y por qué:**

- **La fecha de vencimiento y marcar lo vencido,** fuera porque no ayuda a validar que el equipo pueda dejar la ronda de "¿en qué estás?". Esa ronda pregunta quién está en qué, no qué va con retraso.
- **Filtrar por estado,** fuera porque no ayuda a validar que el estado del equipo se vea de un vistazo. Con 3–10 personas, la lista entera ya se abarca sin filtrar.
- **Editar el título de una tarea,** fuera porque no ayuda a validar que nadie empiece algo que otro ya está tocando. Para eso solo cuentan el estado y el responsable.

**3. La exclusión de la que menos seguro estoy:** el resumen de "qué se ha movido desde tu última visita". Chocan lo que pedía la ficha ("llego por la mañana y veo qué se ha movido") y lo barato (una lista que enseña cómo está todo ahora). El estado actual basta para decidir qué coger, pero no dice qué ha cambiado. Entraría si, en la semana de prueba, alguien sigue preguntando en la daily "¿qué ha cambiado desde ayer?".

**📌 Incoherencias que señaló la IA, y tenía razón:**

- **El documento promete algo que su alcance no cumple.** La respuesta 4 del interrogatorio habla de "ver qué se ha movido", pero el alcance solo enseña el estado actual. Queda abierto: es la duda del punto 3.
- **Fechas vencidas que no se podían corregir.** El alcance prometía ver lo vencido, pero el SUPUESTO 7 prohibía editar la fecha: una fecha mal puesta dejaba una tarea vencida para siempre, y eso ensuciaba la señal que el documento llama riesgo #1. Resuelto: la fecha sale del MVP.
- **Tareas que no se pueden borrar.** Una tarea duplicada o creada por error se queda libre y *Pendiente* para siempre, y contamina el "qué está libre". Queda abierto.
- **La ficha dice "sin campos obligatorios", pero el título es obligatorio.** Es una contradicción literal, aunque menor. Se acepta: una tarea sin título no dice en qué está nadie.
