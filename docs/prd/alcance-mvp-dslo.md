# Alcance MVP FlowSync

## 1. El terreno que ya existe

Resumen: FlowSync hoy es, en la práctica, un esqueleto de autenticación completo (signup, login, logout, perfil, persistencia de sesión) construido sobre AdonisJS 7 + React 19, con un modelo de datos reducido a users y auth_access_tokens. No existe todavía ninguna pieza del dominio de "gestión de tareas en equipo" — ni tareas, ni equipos, ni proyectos — así que el terreno ya cubierto es puramente el de identidad/sesión, y cualquier MVP de producto (tareas, equipos, asignaciones) se diseña sobre terreno completamente virgen, sin riesgo de duplicar funcionalidad existente.


## 2. Interrogatorio

### Preguntas

Aquí van las cinco preguntas, una por cada eje de incertidumbre:

Problema — Cuando hoy hacéis una reunión de sync, ¿qué pregunta concreta se está respondiendo ahí que hoy no se puede responder de otra forma (por Slack, por el tablero de tareas, etc.)? Necesito saber qué información específica se pierde sin la reunión, no solo que "hay que sincronizar".
Usuarios — ¿Quién necesita FlowSync más: la persona que reporta en qué está trabajando, o la persona que necesita saber en qué están trabajando los demás (un lead, un PM, el resto del equipo entre sí)? Y ¿de qué tamaño y tipo de equipo estamos hablando (2-5 personas, 15, varios equipos)?
Valor esperado — Si FlowSync funciona, ¿qué deja de pasar o qué empieza a pasar que hoy no pasa? (por ejemplo: "cancelamos el daily", "detectamos antes que alguien está bloqueado", "dejamos de preguntar '¿en qué estás?' por Slack"). Necesito la métrica o señal concreta que diría "esto está funcionando".
Fronteras del producto — Cuando dices "menos rollo que Jira", ¿a qué te refieres exactamente: a que no gestiona backlog/sprints/prioridades y solo muestra el estado actual de cada uno, o a que sí gestiona tareas pero con una UI/flujo mucho más ligero? Es decir, ¿FlowSync sustituye a la herramienta de gestión de tareas del equipo, o vive al lado de ella?
Alcance del MVP — Si tuvieras que validar la idea con el escenario más pequeño posible, ¿cuál sería: un equipo real usándolo en su día a día durante semanas, una demo con datos de prueba, o algo intermedio? Y en ese escenario mínimo, ¿qué es lo único que un usuario tiene que poder hacer para que consideres la prueba un éxito?


### Respuestas

1. **Problema** — La sincronización responde principalmente a dos preguntas: “¿alguien ya está trabajando en esto que yo estoy a punto de empezar?” y “¿qué está libre para que yo lo coja a continuación?”. Sin una vista compartida y actualizada del estado de las tareas, estas preguntas se resuelven esperando a la daily o interrumpiendo a otra persona por chat. El coste ya se ha materializado en trabajo duplicado: dos personas modificaron el mismo módulo durante la misma semana y se perdieron dos días. El objetivo no es eliminar la daily completa, sino su ronda de “¿en qué estás?”.

2. **Usuarios** — El valor lo reciben los pares, no un responsable o manager. Quien actualiza una tarea utiliza la misma lista como cola de trabajo y reduce las interrupciones que recibe; quien consulta el estado evita empezar trabajo ya ocupado y puede decidir qué abordar a continuación. El usuario objetivo son equipos remotos pequeños, de 3 a 10 personas, con roles planos y sin jerarquía de permisos. El caso de estudio de referencia es un equipo de producto SaaS de seis personas distribuido en tres husos horarios.

3. **Valor esperado** — La decisión que debe cambiar es concreta: evitar empezar algo que otra persona ya está trabajando y poder escoger lo siguiente sabiendo qué está libre. El criterio de éxito tras una semana de uso real es que el equipo elimine la ronda de “¿en qué estás?” de la daily y nadie solicite recuperarla. Si continúan haciéndola igual, el producto no ha funcionado. El principal riesgo a validar es que la información quede desactualizada y pierda utilidad.

4. **Fronteras del producto** — FlowSync sustituye al gestor de tareas para este tipo de equipo; no convive con él ni importa tareas de otros sistemas. Quedan fuera sprints, estimaciones, épicas, backlog priorizado e informes. El MVP funciona sobre un único espacio compartido, sin gestión de múltiples equipos. “Tiempo real” significa que los cambios del estado de las tareas aparecen sin necesidad de refrescar o preguntar, no que se muestre la presencia o actividad de las personas. La información se consulta cuando el usuario la necesita y no genera notificaciones que lo interrumpan.

5. **Alcance del MVP** — La validación requiere una semana de uso real por un equipo. El usuario debe poder trabajar sobre una lista compartida, consultar de un vistazo título, responsable, estado y fecha de vencimiento de las tareas, filtrar por estado y actualizar rápidamente su estado. El MVP debe ser una vertical pequeña pero completa de extremo a extremo. El éxito se produce si esa información permite eliminar la ronda de “¿en qué estás?” de la daily.

### Supuestos

- **Validación real frente al caso de estudio:** el equipo de seis personas y tres husos horarios descrito en los hechos se utiliza como referencia para diseñar el producto, pero no se afirma que sea un cliente real disponible para la prueba. Se asume que el criterio de una semana de uso real deberá validarse con algún equipo real que cumpla aproximadamente el perfil objetivo.


IA propuso: 7
Después de mi recorte: 6

## 3. Alcance del MVP

### Problema

Los equipos remotos pequeños pierden tiempo y pueden duplicar trabajo porque no disponen de una vista suficientemente actualizada de quién está trabajando en qué. El MVP pretende comprobar si esa visibilidad puede eliminar la ronda de “¿en qué estás?” de la daily, no sustituir la reunión completa.

### Usuarios

Equipos remotos pequeños, de 3 a 10 personas, con roles planos y sin jerarquía de permisos. El valor se produce entre pares: quien mantiene actualizadas las tareas utiliza la misma lista como cola de trabajo y reduce interrupciones; quien consulta la lista evita iniciar trabajo ya ocupado y puede decidir qué abordar a continuación.

### Propuesta de valor

Permitir que cualquier miembro del equipo vea de un vistazo el estado actual del trabajo compartido y pueda decidir qué empezar y qué evitar sin preguntar a otra persona ni esperar a una reunión.

La hipótesis se considerará validada si, tras una semana de uso real, el equipo deja de hacer la ronda de “¿en qué estás?” de la daily y nadie pide recuperarla.

### Alcance

1. **Crear una tarea** con título, responsable, estado inicial y fecha de vencimiento.

2. **Ver una lista compartida de tareas** con título, responsable, estado y fecha de vencimiento visibles de forma conjunta.

3. **Cambiar rápidamente el estado de cualquier tarea**, sin restricciones de permisos entre miembros del espacio.

4. **Editar una tarea existente**, pudiendo corregir o actualizar su título, responsable y fecha de vencimiento para mantener fiable la información compartida.

5. **Filtrar las tareas por estado** para centrarse en el trabajo pendiente.

6. **Ver los cambios de estado realizados por otras personas sin refrescar manualmente la página**, manteniendo fresca la información compartida.

### NO-alcance

- **Notificaciones push** — no ayudan a validar si una señal que el usuario consulta cuando la necesita puede sustituir la ronda de “¿en qué estás?”. Además, introducirían una nueva interrupción cuando el producto pretende reducirlas.

- **Integración con Slack u otros chats** — no ayuda a validar si mantener el estado directamente en FlowSync es suficiente para reducir las preguntas entre compañeros. Introducir otra fuente externa desviaría la validación hacia la integración.

- **Roles y permisos avanzados** — no ayudan a validar la hipótesis principal porque el valor se produce entre pares y el MVP parte deliberadamente de roles planos donde todos pueden ver y editar lo mismo.

- **Analítica y reporting** — no ayudan a validar si la visibilidad actual del trabajo reduce la ronda de sincronización. Responden principalmente a necesidades de seguimiento o gestión que no forman parte del usuario objetivo.

- **Comentarios en tareas** — no ayudan a validar la frescura del estado de las tareas. Añadirían una superficie de conversación cuando el producto pretende comprobar si el estado estructurado es suficiente.

- **Múltiples equipos, espacios o pertenencia a varios equipos** — no ayudan a validar el comportamiento de un único equipo remoto compartiendo su trabajo. El MVP se limita deliberadamente a un espacio compartido.

- **Presencia e indicadores de “conectado ahora”** — no ayudan a validar si el estado de la tarea permite decidir qué trabajo está ocupado o libre. Además, convertirían una señal sobre el trabajo en una señal sobre la actividad de las personas.

- **Obtención automática del estado desde Git, pull requests, CI o calendario** — no ayuda a validar si actualizar manualmente el estado es suficientemente barato y útil para que el propio usuario mantenga fresca la información.

- **Sprints, estimaciones, épicas y backlog priorizado** — no ayudan a validar si conocer el estado actual del trabajo elimina la necesidad de preguntar “¿en qué estás?”. Introducirían hipótesis de planificación distintas de la que se quiere probar.

- **Eliminar tareas** — no ayuda directamente a validar la hipótesis principal. Los errores o cambios en la información pueden corregirse mediante edición, sin introducir otra operación en la vertical mínima.

- **Resaltado específico de tareas vencidas** — no ayuda directamente a validar si conocer quién está trabajando en qué evita colisiones y reduce la ronda de sincronización. La fecha de vencimiento sigue formando parte de la tarea y permanece visible; lo que se excluye es únicamente una capacidad adicional de señalización visual del vencimiento.


## Parte B — Las tres líneas

### 1. Los dos números

IA propuso: 7  
Después de mi recorte quedaron: 6

### 2. Tres cosas que dejé fuera y por qué

1. **Resaltado específico de tareas vencidas**  
   Lo dejé fuera porque no ayuda a validar directamente si conocer quién está trabajando en qué evita colisiones y permite eliminar la ronda de “¿en qué estás?”. La fecha de vencimiento sigue visible; lo que no necesito validar todavía es una señalización visual adicional.

2. **Comentarios en tareas**  
   Los dejé fuera porque no ayudan a validar si el estado estructurado de las tareas es suficiente para conocer el trabajo en curso sin interrumpir a otros miembros del equipo. Introducirían una hipótesis distinta: que FlowSync debe ser también un espacio de conversación.

3. **Obtención automática del estado desde Git, pull requests, CI o calendario**  
   La dejé fuera porque impediría validar uno de los riesgos principales del producto: que mantener manualmente el estado resulte suficientemente barato y útil para que los propios usuarios lo mantengan actualizado. Automatizarlo probaría las integraciones, no ese comportamiento.

### 3. Exclusión sobre la que tengo más dudas

**El resaltado específico de las tareas vencidas.**

Lo dejo fuera porque la hipótesis principal se centra en conocer quién está trabajando en qué y mantener suficientemente fresco ese estado como para evitar trabajo duplicado y reducir la ronda de “¿en qué estás?”. La fecha sigue estando disponible en la lista.

Sin embargo, existe una tensión: la fecha de vencimiento se incluyó precisamente para poder detectar rápidamente qué trabajo se ha pasado de plazo. Mostrar solo la fecha puede no ofrecer la misma capacidad de reconocerlo “de un vistazo” que un indicador específico.

Lo incorporaría si durante el uso real observamos que los usuarios no detectan con suficiente facilidad las tareas vencidas viendo únicamente sus fechas, o si esa dificultad afecta a su decisión sobre qué trabajo abordar.


### Incoherencia detectada durante el recorte

Inicialmente excluí la edición posterior de título, responsable y fecha de vencimiento. La revisión de la IA señaló una incoherencia: mantener fiable el responsable es necesario para que la lista refleje quién está trabajando realmente en una tarea, y excluir simultáneamente edición y eliminación dejaba sin mecanismo de corrección los datos erróneos u obsoletos.

Acepté la objeción y reincorporé la edición al alcance. Para mantener el recorte de seis capacidades, excluí en su lugar el resaltado específico de tareas vencidas.