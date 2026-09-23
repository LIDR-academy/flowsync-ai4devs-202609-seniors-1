# Alcance del MVP — FlowSync

## 0. El terreno que ya existe

FlowSync hoy es un esqueleto de autenticación: una persona puede registrarse, iniciar sesión, ver su propio perfil y cerrar sesión. El modelo de datos tiene un único modelo, `User` (email, contraseña, nombre), sin ninguna tabla ni relación relacionada con tareas, estados o trabajo en curso. El dominio de "qué está haciendo cada uno" no existe todavía en ninguna forma — se construye desde cero, sin nada que reconciliar salvo reutilizar la autenticación ya montada.

## 1. Problema

En equipos remotos pequeños, nadie ve en qué está trabajando cada uno sin preguntar. Eso genera dos costes: la ronda de "¿en qué estás?" que se come media daily, y colisiones de trabajo por falta de visibilidad (episodio real: dos personas tocando el mismo módulo la misma semana, dos días perdidos). El dolor es entre pares, no un problema de reporting hacia un manager.

## 2. Usuarios

Equipos remotos de producto/ingeniería, 3-10 personas, roles planos: todos ven lo mismo, sin jerarquía. Caso de estudio (no cliente real): equipo de 6 personas en 3 husos horarios que hoy usa un gestor de tareas pesado más una daily de 15 minutos por videollamada.

## 3. Propuesta de valor

Ver el estado del trabajo del equipo de un vistazo, sin preguntar y sin esperar a la daily — y actualizarlo cuesta dos clics porque cada persona ya usa esa misma lista para decidir qué hace. Sustituye la ronda de estado de la daily; no sustituye la conversación de bloqueos.

## 4. Alcance

- Un espacio de trabajo único y compartido por todos los usuarios autenticados (reutiliza el auth que ya existe, no se toca).
- Tareas con tres campos: título, responsable, estado (pendiente / en curso / hecho).
- El responsable se fija al crear la tarea (el creador lo nombra, puede ser él mismo o un compañero) y no cambia después.
- Solo el responsable de una tarea puede cambiar su estado. Cualquier usuario puede ver el estado de todas las tareas.
- Lista de tareas filtrable por estado. Las tareas hechas no se archivan ni se borran: quedan visibles, y el filtro es lo que las saca de la vista activa.
- "Tiempo real" = el estado está fresco cuando entras a mirar la lista, no un stream en vivo ni polling.

## 5. NO-alcance

- **Fecha de vencimiento / marca de tarea vencida** — responde "¿qué se nos ha pasado de plazo?", una pregunta de gestión de plazos distinta a la que este MVP valida ("¿en qué está cada uno ahora?"). Ningún criterio de éxito depende de ella; quitarla no rompe nada y ahorra un campo obligatorio de creación.
- **Reasignar responsable de una tarea ajena** — no está evidenciado en ningún caso de uso descrito; la coordinación real ("le encargo esto a Bob") ya queda cubierta al nombrar el responsable en la creación. Permitir tocar el trabajo de otro después rompe la autogestión que sostiene todo el mecanismo.
- **Notificaciones push / integración Slack** — convertirían el resumen que se consulta por decisión propia en una interrupción, justo lo que se quiere eliminar.
- **Indicadores de presencia ("quién está conectado")** — es vigilancia, no frescura de tarea; rechazado a propósito.
- **Chat, videollamada, edición simultánea** — el problema es visibilidad de estado, no comunicación en vivo.
- **Comentarios en tareas** — abriría una segunda vía de conversación que compite con la daily/el chat existente.
- **Roles y permisos avanzados** — el equipo objetivo es plano; construir jerarquía es coste sin nadie que lo pida.
- **Sprints, estimaciones, épicas, backlog priorizado, analítica/reporting** — es la complejidad de Jira que este usuario rechaza explícitamente.
- **Historial de cambios / feed de actividad** — la lista filtrable ya responde "qué se ha movido".
- **Múltiples equipos/organizaciones, o gente en más de un equipo** — no validado que haga falta; añade una entidad completa antes de saber si el espacio único funciona.
- **Resolución de bloqueos** — sigue siendo la parte de la daily que no se toca.
- **Derivar estado desde Git/PRs/CI/calendario** — exige integraciones y OAuth de terceros; rompe la premisa de que lo escribe quien lo vive, en dos clics.
- **Archivado/borrado de tareas completadas** — no mueve la aguja del criterio de éxito a la escala de una semana de validación; añade fricción y decisiones (¿quién puede borrar el trabajo de quién?) sin beneficio para quien haría la acción.

**Criterio de éxito:** a una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.

## Parte B: las tres líneas

1. **Los dos números.** La propuesta inicial traía 11 cosas en el Alcance (espacio compartido, campo título, campo responsable, campo estado, campo fecha de vencimiento, crear tarea, cambiar estado de cualquier tarea, reasignar responsable de cualquier tarea, lista filtrable, marca de vencida, definición de tiempo real). Tras el recorte quedaron 8.

2. **Tres cosas que dejé fuera:**
   - **Fecha de vencimiento y su marca de tarea vencida**: responde a "¿qué se ha pasado de plazo?", una pregunta distinta a la que este MVP valida ("¿en qué está cada uno ahora?"). Ningún criterio de éxito depende de ella, y la ficha nunca la conecta con la hipótesis que dice sostener.
   - **Reasignar responsable de una tarea ajena**: no está evidenciado en ningún caso de uso de la ficha; la coordinación real ("le encargo esto a Bob") ya la cubre nombrar el responsable al crear la tarea. Permitirlo después rompe la autogestión que sostiene la actualización de estado.
   - **Archivado/borrado de tareas completadas**: el filtro por estado ya saca las tareas hechas de la vista activa; archivar sería una segunda solución para un problema que el propio Alcance ya resuelve, y a la escala de una semana de validación el volumen ni existe.

3. **La exclusión de la que menos seguro estoy**: que solo el responsable de una tarea pueda cambiar su estado, y que por tanto nadie más pueda tocarla en su lugar. Lo que se contradice ahí es tener una única fuente de verdad por tarea (nadie pisa el campo de otro, la fiabilidad del estado no se negocia) contra la realidad operativa de un equipo real: si el responsable está de baja o de vacaciones, su tarea se queda congelada y nadie más puede moverla. Entraría si, durante la semana de validación, ese bloqueo aparece de verdad como fricción — no antes, porque hoy es un supuesto sin evidencia, igual que lo era permitir la reasignación.

   📌 La ficha de hechos pedía explícitamente "fecha de vencimiento" como campo de la tarea, pero esa misma ficha nunca la conecta con la hipótesis que dice validar (la ronda de "¿en qué estás?" de la daily). Es una incoherencia dentro de la propia ficha, no una funcionalidad de más propuesta por la IA: pedía un campo que su propio criterio de éxito no necesitaba.
