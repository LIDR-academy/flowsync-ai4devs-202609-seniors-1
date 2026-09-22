# FlowSync — Alcance MVP

## 1. El terreno que ya existe

FlowSync hoy es un esqueleto de autenticación: signup, login, logout y perfil, sobre AdonisJS + React. No hay ni una pieza del dominio "tareas compartidas": ninguna entidad de tarea, equipo o proyecto, solo `users` y sus tokens de acceso. Todo el modelo de trabajo compartido está por construir desde cero.

## 2. El interrogatorio

Cinco preguntas, una sola ronda, sin bajar a modelo de datos ni endpoints. Las respuestas vinieron de la ficha de hechos de la lección "Ejercicio FlowSync", no inventadas.

1. ¿Qué pasa hoy sin FlowSync? ¿Qué decisión o bloqueo se retrasa por no tener esa visibilidad?
2. ¿Quién abre la app activamente — cada persona actualizando su propio estado, o un lead consultando el de los demás? ¿Hay roles distintos?
3. ¿Qué significa "tiempo real" en la práctica: cambios visibles al instante, presencia de quién está conectado, o solo "más al día que una hoja Excel"?
4. ¿Qué es exactamente lo que sobra de Jira? ¿Esto sustituye a la herramienta actual o convive con ella para una sola cosa?
5. ¿Un equipo pequeño o varios equipos/proyectos desde el día uno? ¿Hace falta gestión de tareas "de verdad" (asignar, priorizar, mover) o solo visibilidad de estado?

## 3. El alcance, en cinco bloques

### Problema

Los equipos remotos pierden tiempo y coordinación por falta de visibilidad, no por falta de reuniones: la daily se come media sesión (7-8 minutos de 15) en una ronda de "¿en qué estás?" que nadie mira fuera de ese momento. Sin esa visibilidad, dos personas pueden tocar el mismo módulo la misma semana sin saberlo — ya ha pasado, costó dos días de trabajo duplicado.

### Usuarios

Equipos remotos pequeños (3-10 personas), roles planos: todos ven y editan lo mismo, no hay jerarquía ni vista de manager, porque no hay reporte hacia arriba que resolver. Caso de estudio: equipo de 6 personas de producto SaaS en 3 husos horarios, hoy con un gestor de tareas pesado y una daily de 15 minutos por videollamada.

### Propuesta de valor

Sustituir la ronda de "¿en qué estás?" de la daily por un vistazo a una lista siempre al día: cada persona escribe su propio estado en dos clics porque esa misma lista es su cola de trabajo, no un reporte para otros. La frescura viene de que a quien lo escribe le compensa escribirlo, no de vigilancia ni de avisos.

### Alcance (dentro del MVP)

1. Crear una tarea con título, responsable y fecha de vencimiento.
2. Cambiar el estado de una tarea en dos clics, sin campos ni pasos intermedios.
3. Listar las tareas del espacio compartido.
4. Filtrar el listado por estado, para centrarse en lo pendiente.
5. Ver de un vistazo qué tareas están vencidas.

### NO-alcance (fuera, y por qué)

- **Actualización automática del listado sin refresco manual** — fuera, porque "recargo y veo lo nuevo" ya cierra el mismo ciclo de valor (llego por la mañana o vuelvo de una reunión y veo qué se ha movido) sin construir nada de infraestructura en tiempo real; si el equipo sigue mirando el listado igual de a menudo con un simple refresco, el push-sin-recargar no era lo que faltaba.
- **Más de un equipo, o personas en varios equipos** — fuera, porque valida primero si el vistazo compartido resuelve el dolor en un equipo; meter varios equipos ahora duplica el modelo de datos sin añadir señal sobre si esto funciona. Se anota como supuesto, no se construye.
- **Indicadores de presencia ("quién está conectado ahora")** — fuera a propósito: el estado es de la tarea, no de la persona. Es una decisión de producto, no una limitación técnica: eso es vigilancia y no ayuda a decidir qué hacer a continuación.
- **Notificaciones push o avisos** — fuera, porque la propuesta de valor es un resumen que espera a que lo mires, no una interrupción; una notificación reintroduce justo el ruido que esto quiere quitar.
- **Derivar el estado de Git/PRs, CI o calendario** — fuera, porque tecleado por la persona en segundos ya cierra el ciclo de valor completo; automatizarlo es otro producto, con integraciones y OAuth de terceros que no aportan nada a validar si el vistazo compartido cambia el comportamiento del equipo.
- **Sprints, estimaciones, épicas, backlog priorizado, informes** — fuera, porque es literalmente el "rollo de Jira" que este producto existe para evitar; construirlo mata la propuesta de valor en vez de probarla.
- **Roles o permisos diferenciados** — fuera, porque no hay reporte hacia arriba que gestionar en el caso validado; la autenticación que ya existe (todos con la misma capacidad) es suficiente.
- **La parte de bloqueos de la daily** — fuera del MVP explícitamente: la daily no desaparece entera, solo la ronda de estado. Resolver bloqueos compartidos es un problema distinto, sin validar todavía.

---

# Parte B — las tres líneas

1. **Los dos números:** la IA propuso **6** capacidades dentro del alcance; después de tu recorte quedan **5**. *(Si sigues recortando más, actualiza este número.)*
2. **Tres cosas que dejaste fuera y por qué:** *(pendiente — tu recorte, no el de la IA)*
3. **La exclusión de la que menos seguro estás, y qué tendría que pasar para que entrara:** *(pendiente — tu recorte, no el de la IA)*
