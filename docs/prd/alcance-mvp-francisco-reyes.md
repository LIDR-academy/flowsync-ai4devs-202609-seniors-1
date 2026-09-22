# Alcance MVP — FlowSync (Francisco Reyes)

## El terreno que ya existe

Hoy solo existe la identidad de cuenta: cualquiera puede registrarse, iniciar sesión, consultar su perfil y cerrar sesión. El dominio de tareas —crear, ver o cambiar el estado de una tarea, equipos, proyectos— no tiene nada construido; "gestión de tareas en equipo" aparece solo como descripción de intención en el README y en los textos de las pantallas de login y registro. Tampoco hay todavía cobertura de tests. El MVP de tareas se construye desde cero sobre esa identidad ya existente, no sobre nada del dominio de tareas.

## Interrogatorio

Una sola ronda de cinco preguntas sobre el planteamiento inicial. Las respuestas son decisiones de producto ya tomadas.

1. **¿Quién sufre el problema y quién lo usaría a diario?** Los pares, no un lead: no hay reporte hacia arriba. Duele a quien descubre tarde que iba a lo mismo que otro y a quien interrumpe para preguntar. Equipos remotos de 3–10 personas con roles planos; caso de estudio (no un cliente real): equipo SaaS de 6 personas en 3 husos horarios.
2. **¿Qué situación provoca hoy las reuniones de sincronización?** La daily y el «¿en qué estás?» constante por chat: nadie ve el estado sin interrumpir. Ejemplo: dos personas tocaron el mismo módulo la misma semana sin saberlo (dos días perdidos). Solo desaparece esa ronda; la daily y su parte de bloqueos siguen.
3. **¿Cómo lo resuelven hoy y por qué no les basta?** Con un gestor de tareas pesado, una daily de 15 minutos y preguntas por chat; ninguno muestra el estado sin preguntar. FlowSync sustituye al gestor, no convive con él, porque convivir obliga a actualizar dos veces.
4. **¿Qué significan «tiempo real» y «menos rollo que Jira»?** Tiempo real es ver los cambios de estado de las tareas sin refrescar ni preguntar, como un resumen que espera (sin push ni presencia de personas), para no empezar lo que otro ya toca y elegir lo siguiente. Menos rollo es crear una tarea y cambiarle el estado en segundos, sin configuración, campos obligatorios, sprints, estimaciones ni informes. El estado lo teclea quien trabaja la tarea porque esa lista es su cola de trabajo; si se queda vieja, el producto no sirve (riesgo n.º 1).
5. **¿Cómo sabremos que ha funcionado y con quién se prueba?** Tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva. El criterio de validación se plantea sobre un equipo con las características del caso de estudio, y se construye una vertical fina de punta a punta.

**Frontera de producto ya fijada:** un único espacio compartido. Varios equipos, la pertenencia a más de uno y las invitaciones quedan fuera del MVP; no es una interpretación, es una decisión ya tomada en la ficha.

### Supuestos

- El caso de estudio (equipo SaaS de 6 personas en 3 husos horarios) es un ejemplo hipotético para razonar el diseño, no un cliente real ni un equipo ya disponible para probar el producto; el criterio de una semana es una hipótesis a validar, no una medición ya planificada.
- La ficha no da plazos: el tiempo disponible se trata como restricción de alcance (una vertical fina), no como fechas.
- Las «tres cosas insoportables» de un gestor pesado se interpretan como configuración, campos obligatorios y sprints/estimaciones/informes.

## Problema

En los equipos remotos pequeños, saber en qué está cada persona exige una daily de sincronización y un «¿en qué estás?» constante por chat: nadie ve el estado del equipo sin interrumpir a alguien. El coste es real: dos personas tocaron el mismo módulo la misma semana sin saberlo y perdieron dos días. Hoy en el repositorio no existe nada del dominio de tareas, así que el problema se aborda desde cero, sobre la identidad de cuenta ya construida. El riesgo n.º 1 a validar es que la información se quede vieja.

## Usuarios

- **Usuario principal:** los pares de un equipo remoto de 3–10 personas con roles planos, que ven y editan lo mismo. Duelen igual quien descubre tarde que iba a lo mismo que otro y quien interrumpe para preguntar.
- **Primer usuario concreto (caso de estudio, no un cliente real):** equipo de producto SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada.
- **No son usuarios:** un lead o manager que quiera reportes hacia arriba, ni equipos que necesiten sprints, estimaciones o backlog priorizado.

## Propuesta de valor

Abrir una única lista compartida y saber de un vistazo qué está tomado y qué está libre, sin preguntar a nadie y sin refrescar. Se sostiene porque quien actualiza cobra en el momento: esa lista es su cola de trabajo y deja de recibir interrupciones. FlowSync sustituye al gestor de tareas en lugar de convivir con él.

**Hipótesis central a validar:** tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva. La daily no desaparece entera y los bloqueos siguen fuera.

## Alcance

Alcance final: de las 5 capabilities propuestas inicialmente quedan **4** en el MVP (recorte detallado en «Tres líneas»). Se reutiliza sin contarla la identidad de cuenta ya construida (registro, login, logout y perfil); el MVP no la amplía. Las capabilities siguientes comparten una única lista de tareas como superficie común (frontera del espacio compartido fijada en Interrogatorio); esa lista no se cuenta como capability independiente (ver NO-alcance).

1. **C1 — Crear tareas.** Con título, responsable, estado y fecha de vencimiento. Es lo mínimo para saber quién está en qué.
2. **C2 — Cambiar rápidamente el estado de una tarea**, desde la propia lista y sin campos obligatorios. Es el mecanismo que mantiene la información fresca y cubre el riesgo n.º 1.
3. **C3 — Ver los cambios de estado sin refrescar.** Es lo que aquí significa «tiempo real». Se refiere a las tareas, no a las personas.
4. **C4 — Filtrar las tareas por estado**, para centrarse en lo pendiente.

Supuestos nuevos de esta propuesta, que no cubría la ficha de producto:

- Cada tarea tiene una única persona responsable.
- El control de acceso a la lista compartida (quién puede unirse a ella) queda fuera del MVP; quien se registra entra directamente en el único espacio compartido.

## NO-alcance

Cada exclusión indica qué hipótesis del producto no ayudaría a validar o por qué no hace falta para validar el valor central. Primero las que ya fija la ficha de producto; después las que añade este recorte, que no vienen dadas por la ficha.

### Ya fijadas por la ficha de producto

1. **Notificaciones push, y presencia o indicadores de actividad de personas.** La ficha define el tiempo real como un resumen que se consulta, sin push ni presencia de personas. Un aviso o un indicador de actividad interrumpe y vigila; la hipótesis es que consultar sin interrumpir basta.
2. **Roles y permisos.** Son pares con roles planos; una jerarquía de acceso no ayuda a validar que el estado visible sustituye la ronda.
3. **Sprints, estimaciones, épicas, backlog priorizado, informes y estados/flujos configurables.** La ficha excluye explícitamente configuración, campos obligatorios, sprints, estimaciones e informes, y descarta como usuario a quien los necesite. Configurar es justo el rollo que el producto quiere evitar.
4. **Varios equipos, pertenencia a más de uno, invitaciones y administración del equipo.** El MVP fija un único espacio compartido; la hipótesis se valida con un solo equipo.
5. **Importar tareas de otro gestor o convivir con él.** La ficha decide que FlowSync sustituye al gestor en vez de convivir con él, porque convivir obliga a actualizar dos veces.
6. **Resolver bloqueos.** La ficha mantiene esa parte en la daily; la hipótesis a validar es que desaparece la ronda de estado, no los bloqueos.

### Exclusiones de este recorte

Decisiones de producto propias, no dadas por la ficha.

1. **Contar la lista única compartida como capability independiente.** Sigue formando parte del MVP como superficie común para crear tareas, cambiar su estado, verlas sin refrescar y filtrarlas por estado, pero por sí sola no valida una hipótesis adicional: es el contexto necesario para que funcionen esas capabilities, no una capability propia.
2. **Integración con Slack.** No ayuda a validar si FlowSync, por sí mismo, consigue que el equipo vea el estado del trabajo sin tener que preguntar. Introduce otra hipótesis distinta: que el valor dependa de llevar la información a una herramienta externa.
3. **Analítica y reportes.** No ayuda a validar el valor entre pares. La hipótesis no es si un manager puede medir al equipo, sino si las personas pueden coordinarse mejor viendo el estado de las tareas.
4. **Comentarios en tareas.** No ayuda a validar si basta con mantener visible y fresco el estado de la tarea. Añade una capa de conversación que se acerca a chat, cuando el producto quiere reducir interrupciones y no convertirse en otro canal de comunicación.
5. **Derivar el estado desde Git/PRs, CI o calendario.** Es otro producto, con integraciones de terceros. La hipótesis es que el estado tecleado en dos clics se sostiene; derivarlo automáticamente no valida eso.
6. **Editar, reasignar y borrar tareas.** No ayuda a validar la hipótesis y es la exclusión con más coste de usabilidad: una tarea mal creada no se puede corregir. Conviene revisarla si el recorte se relaja más adelante.
7. **Atributos extra de tarea (prioridad, etiquetas, subtareas, adjuntos, descripción larga), búsqueda, ordenación y vistas alternativas.** No hacen falta para saber quién está en qué ni qué está libre.
8. **Chat, videollamada y edición simultánea.** «Tiempo real» aquí es ver cambios de estado, no colaborar en directo.
9. **Gestión de cuenta adicional (editar perfil, recuperar contraseña, verificar email).** La identidad ya construida basta para el caso de estudio y no toca ninguna hipótesis del producto de tareas.
10. **Resumen de «qué ha cambiado desde tu última visita».** Es la exclusión menos segura de este recorte: se desarrolla en «Tres líneas».

## Tres líneas

1. `5 → 4`

2. Tres exclusiones que decidí mantener fuera:
   - **Integración con Slack:** no ayuda a validar si FlowSync, por sí mismo, consigue que el equipo vea el estado del trabajo sin tener que preguntar. Introduce otra hipótesis distinta: que el valor dependa de llevar la información a una herramienta externa.
   - **Analítica/reporting:** no ayuda a validar el valor entre pares. La hipótesis no es si un manager puede medir al equipo, sino si las personas pueden coordinarse mejor viendo el estado de las tareas.
   - **Comentarios en tareas:** no ayuda a validar si basta con mantener visible y fresco el estado de la tarea. Añade una capa de conversación que se acerca a chat, cuando el producto quiere reducir interrupciones y no convertirse en otro canal de comunicación.

3. La exclusión de la que menos seguro estoy es el **resumen de «qué ha cambiado desde tu última visita»**.

   La tensión que veo es que, por un lado, el MVP quiere ser mínimo y una lista actualizada puede ser suficiente para saber en qué está cada persona. Por otro, la ficha dice que uno de los momentos clave es llegar por la mañana o volver de una reunión y entender qué se ha movido, y una lista con el estado actual puede no explicar qué cambió mientras no estabas.

   La reconsideraría y la incluiría en el MVP si, al probarlo, vemos que los usuarios siguen necesitando preguntar qué cambió mientras estaban fuera aunque la lista esté actualizada, porque eso significaría que el estado actual no basta para validar la promesa de coordinación asíncrona.
