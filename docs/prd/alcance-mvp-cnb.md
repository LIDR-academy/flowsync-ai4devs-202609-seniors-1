# FlowSync — Alcance MVP

### Problema

Lo que duele hoy es la ronda de "¿en qué estás?" de la daily (se come la mitad de los 15 minutos) y las interrupciones constantes por chat para preguntar en qué va cada uno. Nadie ve el estado del equipo sin interrumpir a alguien. Episodio concreto que lo motiva: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera — dos días perdidos. El valor lo cobran los pares (los propios devs), no un lead ni un manager: no hay reporte hacia arriba en esta épica.

### Usuarios objetivo

Equipos remotos pequeños (3–10 personas), roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos. Caso de estudio (no cliente real): equipo de 6 personas de producto SaaS en 3 husos horarios, que hoy usa un gestor de tareas pesado y hace daily de 15 minutos por videollamada.

### Qué cambia y qué no

La daily **no desaparece entera** — sigue existiendo la parte de bloqueos, que esta épica no resuelve. Lo que desaparece es la ronda de "¿en qué estás?".

### Propuesta de MVP

- **Espacio único compartido**: no existe la entidad "equipo" en el producto. Varios equipos separados, o gente en más de uno, queda fuera del MVP (se documenta como supuesto, no se construye).
- **Tarea**: título, responsable, estado y fecha de vencimiento — nada más. Sin sprints, estimaciones, épicas, backlog priorizado ni informes.
- Cualquier persona crea una tarea y le cambia el estado en segundos, sin campos obligatorios ni flujos de configuración ("menos rollo que Jira").
- La lista de tareas se filtra por estado, para centrarse en lo pendiente.
- El estado es de la **tarea**, no de la persona: no hay indicadores de presencia ni de "quién está conectado ahora" — eso es vigilancia y se rechaza a propósito.

### Por qué se sostiene (incentivo de adopción)

Actualizar el estado cuesta dos clics sobre una lista ya abierta, sin decidir sprint ni estimación. Quien lo teclea cobra el beneficio en el momento: esa misma lista es su cola de trabajo, la usa para decidir qué coge a continuación, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no se sostendría.

### Riesgo principal

Que la información se quede vieja: si nadie actualiza el estado, el producto pierde el sentido. Es el riesgo #1 a validar, no un detalle secundario. La mitigación de producto es que actualizar cueste dos clics, sin obligar a nadie.

### Criterio de éxito

Que el equipo deje de hacer la ronda de "¿en qué estás?" de la daily porque el estado se ve de un vistazo. A una semana de uso real: el equipo cancela esa ronda y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.

### Fuera de alcance del MVP (y por qué)

- **Entidad "equipo" y visibilidad multi-equipo**. El caso de estudio es un único equipo compartiendo un espacio; modelar varios equipos añade una capa de pertenencia y visibilidad que nadie ha pedido todavía. Se documenta como supuesto, no se construye.
- **Jerarquía de roles y permisos avanzados**. El equipo objetivo tiene roles planos: todos ven y editan igual. Añadir permisos es trabajo de ingeniería que ningún usuario de este caso pidió, y complica el flujo de "dos clics" del que depende la adopción.
- **Notificaciones push e integración con Slack**. El diseño rechaza explícitamente el aviso que interrumpe, a favor del resumen que se consulta. Una notificación push o un mensaje de Slack reproducirían exactamente la interrupción que el producto existe para eliminar.
- **Comentarios en tareas**. Abre una superficie de conversación (un hilo) que no es el problema a resolver — el objetivo es ver el estado de un vistazo, no discutir dentro de la tarea. Es la puerta de entrada a un chat encubierto dentro del gestor de tareas.
- **Sprints, estimaciones, épicas, backlog priorizado, informes/analítica**. Es exactamente la categoría de producto (gestor de tareas pesado) que este MVP sustituye, no imita. Un equipo que necesite eso no es el usuario objetivo de esta épica.
- **Derivar el estado de integraciones externas (Git/PRs, CI, calendario)**. Exige OAuth e integraciones de terceros — es "otro producto", en palabras del propio análisis. Además, que el estado se teclee a mano es lo que mantiene el coste de actualización en dos clics, predecible y sin fricción de configuración.
- **Indicadores de presencia o actividad de la persona** ("quién está conectado ahora"). Se rechaza a propósito por ser vigilancia. El estado que se comparte es el de la tarea, nunca el de la persona.
- **Convivencia o sincronización con otro gestor de tareas**. La doble actualización (mantener el estado en dos sitios) es, según el propio análisis, la causa de muerte de esta categoría de producto. FlowSync sustituye al gestor existente, no convive con él.

### Principio de alcance

Construir una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto: una capability terminada vale más que tres a medias.

## PARTE B:

- Los 2 numeros: 9 propuestas, 4 recortadas
- Tres cosas que dejaste fuera:
  - Notificacion push: para este proyecto no es necesario avisar al cliente cuando una tarea es movida, simpemente cada X tiempo se refresca, no es necesaria una inmediatez de milisegundos.
  - Indicadores de presencia o actividad de la persona: de momento se sabe en que se esta trabajando que es lo importante, quien lo estas trabajando puede ser una segunda version.
  - Comentarios en las tareas: Nice to have, Estaria bien tener los comentarios, pero no es parte del core principal, se puede dejar para mas adelante sin afectar al funcionamiento del MVP.
- La exclusion de la que menos segura estas: De la atualizacion y sincroniacion con otro gestor de tareas, ya que si el otro gestor usado que es Jira dice una cosa y el nuevo gestor FlowSync otra, puede ser muy lioso, pero al final para un MVP no he visto necesario una sincronizacion muy rapida, no pasaria nada si una tarea tarda mucho en actualizarse. Ya que siempre se puede mirar Jira en caso de duda. Que tendria que tener para que entrase? en el caso de que nadie fuese a mirar Jira o se conviritiese en el unico gestior que tenemos.