# FlowSync — alcance del MVP

## PARTE A - PRD

### Problema

La daily de sincronización se come la mitad de sus 15 minutos en la ronda "¿en qué estás?", y aun así el equipo no tiene visibilidad fuera de esa ventana: para saberlo en cualquier otro momento, alguien tiene que interrumpir a otra persona por chat. Esa falta de visibilidad continua ya ha costado tiempo real: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera — dos días perdidos. El dolor es entre pares, no jerárquico: no hay reporte hacia arriba que resolver, a un manager le daría igual.

### Usuarios

Equipos remotos pequeños (3–10 personas) con roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos. Caso de estudio de referencia: un equipo de 6 personas de producto SaaS, repartido en 3 husos horarios, que hoy usa un gestor de tareas pesado más una daily de 15 minutos por videollamada. Un equipo = un espacio compartido; no hay entidad "equipo" ni pertenencia a varios.

### Propuesta de valor

Ver el estado de las tareas del equipo de un vistazo, sin preguntar y sin recargar activamente — es frescura de la tarea, no presencia de la persona. Actualizar el propio estado cuesta dos clics sobre una lista que la persona ya tiene abierta como su cola de trabajo: no es una carga que hace "para los demás", es la misma lista que usa para decidir qué coge a continuación, y de paso deja de recibir interrupciones preguntándole cómo va. La decisión que cambia con esto: no arrancar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. FlowSync sustituye al gestor de tareas actual — no convive con él; conviven exigiría doble actualización, que es como muere esta categoría de producto.

### Alcance

- Crear una tarea con título, responsable, estado y fecha de vencimiento.
- Cambiar el estado de una tarea en segundos, sin campos obligatorios ni flujo de configuración previo.
- Lista de tareas del equipo, filtrable por estado, compartida por todo el espacio.
- Los cambios de estado se ven sin recargar ni preguntar ("tiempo real" = frescura del estado, no chat ni edición simultánea).

### NO-alcance

- **Notificaciones push** — el patrón de consumo es "llego y veo qué se movió", no una interrupción; añadirlas reintroduce el mismo ruido que el producto existe para quitar.
- **Integración con Slack (u otra herramienta)** — la tesis del producto es sustituir al gestor de tareas actual, no convivir con él; convivir implica doble actualización, la muerte de esta categoría.
- **Derivar el estado de señales externas (Git/PRs, CI, calendario)** — es otro producto, con integraciones y OAuth de terceros; no valida la hipótesis central (¿basta con que la persona teclee su estado en dos clics?).
- **Indicadores de presencia / "quién está conectado"** — rechazado explícitamente: es vigilancia, no el problema que se está resolviendo (el estado es de la tarea, no de la persona).
- **Roles y permisos avanzados** — el dolor descrito es entre pares, no jerárquico; no hay reporte hacia arriba ni decisión que unos permisos resuelvan en este MVP.
- **Analítica / reporting** — no hay quién lo consuma: el único perfil al que le podría interesar (un manager) es, según el propio problema, indiferente a esto.
- **Comentarios en tareas** — abre una superficie de conversación que no es el dolor a resolver; el dolor es visibilidad de estado, no discusión sobre la tarea.
- **Sprints, estimaciones, épicas, backlog priorizado** — es justo la complejidad de la que este usuario huye; un equipo que la necesite no es el usuario objetivo.
- **Múltiples equipos / pertenencia a varios equipos** — se anota como supuesto (un único espacio compartido), no se construye: no hay entidad "equipo" en el MVP.
- **Eliminar la ronda de bloqueos de la daily** — el MVP solo ataca la ronda de "¿en qué estás?"; la parte de bloqueos sigue existiendo y prometer que desaparece sería vender de más.

---

## PARTE B

1. IA = 5, resultado final = 4
2. Eliminé del alcance "Acceso plano: cualquier miembro del equipo ve y edita cualquier tarea." porque no considero seguro poder editar cualquier tarea de otros usuarios, además de generar más confusión y ruido si algún miembro del equipo lo hace por error sin querer, es contraproducente porque esto es justo lo que se pretende evitar.
3. Con un cambio en la redacción del punto excluido en el apartado 2, de modo que se acote solo a la visualización de cualquier tarea, sí lo introduciría de nuevo dentro del alcance.
