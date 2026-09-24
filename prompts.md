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


## Prompt 1 — Análisis del repositorio

Herramienta: Claude Code
Modelo: Sonnet 5 (Alto)

Analiza el repositorio FlowSync completo antes de proponer ningún cambio.

Quiero que inspecciones el código existente y me devuelvas:

1. Las capacidades funcionales que ya existen.
2. El modelo de datos actual, únicamente a nivel conceptual.
3. Qué funcionalidades ya están implementadas y por tanto no tendría sentido volver a especificar como nuevas en un MVP.

No propongas nuevas funcionalidades.
No diseñes endpoints.
No diseñes arquitectura.
No escribas código.
No modifiques ningún archivo.

Termina con un resumen de entre 3 y 5 líneas describiendo el terreno funcional que ya existe.



## Prompt 2 — Cinco preguntas

Herramienta: Claude
Modelo: Sonnet 5

Estamos definiendo el MVP de FlowSync a partir de esta idea:

"Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira."

Antes de proponer ninguna solución, hazme exactamente las CINCO preguntas que más reduzcan la incertidumbre sobre:

- el problema,
- los usuarios,
- el valor esperado,
- las fronteras del producto,
- y el alcance del MVP.

Solo quiero una ronda de cinco preguntas.

No propongas todavía funcionalidades.
No diseñes modelo de datos.
No diseñes endpoints.
No diseñes arquitectura.
No bajes a implementación.


## Prompt 3 — Respuestas de producto

Herramienta: Claude
Modelo: Sonnet 5

Estas son las respuestas y hechos de producto ya decididos.

Utilízalos como fuente de verdad para responder a tus cinco preguntas anteriores.

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

Además, ya está decidido que queda FUERA del MVP:

- notificaciones push
- integración con Slack
- roles/permisos avanzados
- analítica/reporting
- comentarios en tareas

No hagas una nueva ronda de preguntas.

No propongas todavía el alcance del MVP.

Responde únicamente a las cinco preguntas que acabas de hacer utilizando estos hechos.

Si alguna pregunta no queda completamente respondida por la información anterior, toma una decisión razonable y márcala explícitamente como SUPUESTO.

Al final devuelve una sección separada llamada "Supuestos" con todos los supuestos que hayas tenido que introducir. Si no has necesitado ninguno, indícalo explícitamente.

## Prompt 4 — Propuesta inicial del MVP

Herramienta: Claude
Modelo: Sonnet 5

Con el conocimiento que ya tienes del repositorio y utilizando exclusivamente los hechos de producto anteriores, propón el alcance inicial del MVP de FlowSync.

Quiero exactamente estos cinco bloques y en este orden:

Problema
Usuarios
Propuesta de valor
Alcance
NO-alcance
Sé agresivo recortando el MVP.

En "Alcance":

- Enumera individualmente cada capacidad funcional que propones incluir.
- Cada número debe representar una capacidad distinta.
- No agrupes varias capacidades diferentes dentro de un mismo número.
- Necesito poder contar exactamente cuántas capacidades funcionales propones.

En "NO-alcance":

- Enumera individualmente cada exclusión.
- Justifica cada exclusión explicando qué hipótesis del producto NO ayuda a validar.
- No utilices como justificación "no hay tiempo", "es difícil" o "se puede hacer después".

Respeta además estas restricciones:

- No inventes restricciones de permisos: en el MVP todos ven y editan lo mismo.
- No diseñes modelo de datos.
- No incluyas tablas.
- No incluyas endpoints.
- No incluyas arquitectura.
- No incluyas diagramas técnicos.
- No incluyas clases.
- No elijas tecnologías.
- No describas implementación.
- No escribas historias de usuario.
- No escribas requisitos técnicos.

Estamos escribiendo un documento de producto, no una especificación técnica.

Prefiere una vertical funcional pequeña y completa de extremo a extremo frente a varias capacidades parcialmente construidas.

No modifiques ningún archivo del repositorio. Devuelve únicamente la propuesta.


## Prompt 5 — Crítica de mi recorte

Herramienta: Claude
Modelo: Sonnet 5

Voy a realizar mi propio recorte sobre tu propuesta inicial de 7 capacidades.

Mi alcance provisional final es:

Crear una tarea con título, responsable, estado inicial y fecha de vencimiento.
Ver una lista compartida de tareas con título, responsable, estado y fecha de vencimiento visibles.
Cambiar rápidamente el estado de cualquier tarea, sin restricciones de permisos entre miembros del espacio.
Filtrar las tareas por estado para centrarse en el trabajo pendiente.
Identificar de un vistazo las tareas cuya fecha de vencimiento haya pasado.
Ver en la lista los cambios de estado realizados por otras personas sin tener que refrescar manualmente la página.
He excluido de tu alcance inicial:

- Editar el título, responsable o fecha de vencimiento de una tarea después de crearla.

Además, mantengo fuera:

- notificaciones push
- integración con Slack u otros chats
- roles y permisos avanzados
- analítica/reporting
- comentarios en tareas
- múltiples equipos o espacios
- presencia o indicadores de "conectado ahora"
- derivar estado desde Git/PR/CI/calendario
- sprints, estimaciones, épicas y backlog priorizado
- eliminar tareas

La autenticación no la considero NO-alcance porque ya existe en el producto y está descrita en el terreno existente.

No amplíes el MVP ni propongas funcionalidades nuevas.

Quiero que critiques exclusivamente este recorte buscando:

Alguna capacidad incluida que no sea necesaria para validar la hipótesis principal.
Alguna capacidad excluida cuya ausencia haga imposible validar la hipótesis principal.
Contradicciones entre los hechos de producto y este alcance.
Alguna exclusión cuya justificación no pueda defenderse en términos de hipótesis del producto.
Especialmente, cuestiona si excluir la edición posterior de título, responsable y vencimiento rompe algún escenario imprescindible del MVP.

No propongas arquitectura.
No propongas endpoints.
No propongas modelo de datos.
No propongas implementación.

Devuélveme únicamente las objeciones concretas que encuentres. Si una decisión es coherente, no propongas ampliarla por conveniencia.