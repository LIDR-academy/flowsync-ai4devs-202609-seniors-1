# FlowSync — MVP

## Problema

Los equipos remotos pequeños pierden tiempo confirmando en qué está trabajando cada uno. Hoy eso se resuelve con una daily de 15 minutos, y la mitad se va en la ronda de "¿en qué estás?" — no en bloqueos, que sí requieren hablar. Sin visibilidad, dos personas pueden acabar tocando lo mismo sin saberlo: en el equipo de referencia, dos devs perdieron dos días completos por eso. El coste recae en los pares (quien empieza algo duplicado, quien interrumpe para preguntar), no en un manager que necesite reportar hacia arriba.

## Usuarios

Equipos remotos pequeños, 3–10 personas, en husos horarios distintos, sin jerarquía de permisos: todos ven y editan lo mismo. Caso de estudio de referencia: equipo de 6 personas de producto SaaS en 3 husos horarios, que hoy usa un gestor de tareas pesado más una daily por videollamada. No es un cliente real, es el perfil contra el que se diseña.

Fuera de este perfil: organizaciones con jerarquía, necesidad de reportar hacia arriba, o varios equipos que deban verse por separado.

## Propuesta de valor

Una lista de tareas compartida que sustituye —no complementa— al gestor de tareas actual, donde actualizar el propio estado cuesta dos clics y sin campos obligatorios. El beneficio es inmediato para quien lo escribe: esa misma lista es su cola de trabajo, la usa para decidir qué coge a continuación, y de paso deja de recibir interrupciones preguntándole cómo va. El equipo consulta el estado de todos de un vistazo —al llegar por la mañana o volver de una reunión— sin preguntar y sin esperar a la daily. Es frescura del estado de la tarea, no presencia de la persona: nada de indicadores de "conectado ahora".

Éxito: a una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva.

## Alcance

- **Entidad `tasks`**: título, responsable (`owner_id` → `users`), estado, fecha de vencimiento.
- **Lista compartida, único espacio**, filtrable por estado, consumida por todo el equipo por igual.
- **Fecha de vencimiento visible** para detectar de un vistazo qué está fuera de plazo.
- **CRUD mínimo de tareas**: crear, editar (asignar, cambiar estado, fecha), eliminar sobre el andamiaje de auth ya existente.

## NO-alcance (y por qué cada exclusión es intencional, no pendiente)

- **Equipos/proyectos como entidad, visibilidad acotada** — el caso de estudio es un único equipo de 6; modelar multi-equipo antes de validar el primero es construir para un problema que no se ha confirmado. Se documenta como supuesto, no se implementa.
- **Notificaciones push** (ya decidido) — el valor está en el resumen que se consulta cuando se quiere, no en el aviso que interrumpe; una notificación push reintroduce exactamente la interrupción que el producto existe para eliminar.
- **Integración con Slack** (ya decidido) — mismo motivo: es un canal de interrupción, no de consulta bajo demanda.
- **Roles y permisos avanzados** (ya decidido) — con 3–10 personas y roles planos, un sistema de permisos añade fricción de configuración ("menos rollo que Jira" es el requisito explícito) sin que nadie lo haya pedido.
- **Analítica / reporting** (ya decidido) — no hay quién consuma ese reporte: no hay manager en el bucle de valor. Construirlo sería trabajo sin usuario.
- **Comentarios en tareas** (ya decidido) — abre la puerta a que la tarea se convierta en canal de conversación, que es justo lo que Slack/chat ya cubre y lo que el producto quiere evitar duplicar.
- **Derivar estado de señales externas** (Git, PRs, CI, calendario) — exige integraciones y OAuth de terceros; además cambia el producto de "lo que la persona dice que hace" a "lo que un sistema infiere", que es otra categoría de producto y otro riesgo.
- **Sprints, estimaciones, épicas, backlog priorizado** — es exactamente el "rollo de Jira" que el usuario objetivo ya está huyendo; un equipo que los necesite no es el usuario de este MVP.
- **Presencia / "quién está conectado ahora"** — se rechaza a propósito, no por falta de tiempo: es vigilancia, y el producto mide el estado de la tarea, no de la persona.
- **Convivencia con otro gestor de tareas** — FlowSync crea las tareas, no las lee de otro sitio; convivir exige doble actualización, que es como muere esta categoría de producto.
- **Cambio de estado en dos clics** desde la lista, sin flujo de edición aparte.


**Riesgo #1, no un detalle**: si el estado se queda desactualizado, el producto pierde su sentido entero. La única mitigación en el MVP es que actualizar cueste dos clics — no hay plan B de notificaciones o recordatorios porque eso ya está descartado por diseño. De momento se asume este riesgo en el MVP.


---
# Entrega ejercicio

## 1. Los dos números
La IA propone 5 ítems, he dejado una fuera, y he modificado otra

## 2. Tres cosas que dejaste fuera, y por qué cada una

1. Eliminar tarea: "Cambio de estado en dos clics"
2. Acotar CRUD: Crear, Modificar (todos los datos), Eliminar (no estaba)

## 3. La exclusión de la que menos seguro estás

Realmente las dos exclusiones añadidas por mi son las que quizás añadiría, porque no deberían añadir mucho coste pero augmentarían la usabilidad, pero realmente como MVP no serían del todo necesarías y se podrían ajustar después de los primeros usos según el feedback de los usuarios.




