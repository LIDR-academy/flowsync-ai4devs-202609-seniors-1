# Alcance MVP — FlowSync

## PARTE A

### 1. El terreno que ya existe

- **Capabilities construidas:** solo gestión de cuenta de usuario — registro (nombre opcional, email único, contraseña con confirmación), login con token de acceso, consulta del perfil propio y logout. En el frontend hay tres pantallas (registro, login, perfil) con rutas protegidas/públicas.
- **Lo que NO existe todavía:** nada del dominio de FlowSync — ni equipos, ni tareas, ni estados, ni asignaciones, ni actividad o tiempo real. No hay roles ni relación entre usuarios.
- **Modelo de datos actual:** dos tablas. `users` (id, full_name opcional, email único, password hasheada, created_at, updated_at) y `auth_access_tokens` (tokens opacos ligados a un usuario, con expiración y último uso; se borran en cascada con el usuario).
- **Implicación para la especificación:** el usuario individual con cuenta es la única entidad sobre la que construir; todo lo demás (equipo, tarea, estado de trabajo) es nuevo y debe apoyarse en esa identidad sin rehacer el registro/login.

### 2. El interrogatorio

1. **¿Quién la usa y en qué contexto exacto?** ¿Cuántas personas tiene un equipo típico, cómo de distribuidas en zonas horarias están, y quién decide adoptarla (el propio equipo o un responsable)?
2. **¿Qué reunión o ritual concreto debe desaparecer, y qué información da hoy esa reunión?** ¿Es el daily/stand-up? ¿Lo que falta saber es "en qué está cada uno ahora", "qué ha terminado", "quién está bloqueado", o todo?
3. **¿Qué significa "tiempo real" para el usuario?** ¿Ver los cambios al instante sin recargar, recibir avisos cuando algo cambia, o solo que el estado esté siempre al día porque actualizarlo cuesta segundos?
4. **¿Qué es "menos rollo que Jira": qué se deja fuera a propósito?** ¿Nada de flujos configurables, sprints, estimaciones, jerarquías de tareas, campos personalizados? ¿Cuál es lo mínimo que tiene una tarea para ser útil?
5. **¿Cómo sabremos que funciona?** ¿Qué señal validaría el MVP: que el equipo cancele la reunión, que cada persona actualice su estado a diario, que se resuelvan antes los bloqueos? ¿Y lo usa un equipo real piloto o es para demo?

_Respuestas: la ficha de hechos del ejercicio ("Ejercicio FlowSync", Módulo 2), aplicada en el bloque 3._

### 3. El alcance

#### Problema

En un equipo remoto nadie ve en qué está cada uno sin interrumpir a alguien. La mitad de la daily de 15 minutos se va en la ronda de "¿en qué estás?", y durante el día la misma pregunta se repite por chat. Cuando esa información no llega, dos personas empiezan lo mismo sin saberlo. El caso de referencia: dos personas tocaron el mismo módulo la misma semana y se perdieron dos días.

#### Usuarios

Equipos remotos pequeños (3–10 personas) con roles planos: todos ven y editan lo mismo. El valor lo cobran los pares, no un responsable: quien iba a empezar algo que otro ya tenía y quien interrumpe para preguntar. No hay reporte hacia arriba. El caso de estudio es un equipo de 6 personas de producto SaaS, repartidas en 3 husos horarios, con un gestor de tareas pesado y una daily por videollamada.

#### Propuesta de valor

Una lista compartida de tareas que el equipo usa de verdad para trabajar, no solo para informar. Cambiarle el estado a una tarea cuesta dos clics, y los demás ven el cambio sin refrescar ni preguntar. Con eso cada persona puede decidir dos cosas: no empezar algo que otro ya está tocando y elegir lo siguiente sabiendo qué está libre. Quien escribe su estado también sale ganando en el momento: esa lista es su propia cola de trabajo y, además, deja de recibir interrupciones.

**Hipótesis a validar:** tras una semana de uso real, el equipo elimina la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva.
**Riesgo #1:** que el estado se quede viejo. Solo se mitiga haciendo que actualizarlo sea casi gratis, no obligando a nadie.

#### Alcance (dentro)

Propuesto por la IA:

~~1. **Entrar al espacio con la cuenta que ya existe.** Se reutilizan el registro y el login actuales. Todo usuario registrado forma parte del único espacio compartido.~~
~~2. **Crear una tarea en segundos.** Solo el título es obligatorio. El responsable y la fecha de vencimiento son opcionales.~~
~~3. **Cambiar el estado en dos clics desde la lista.** Hay tres estados fijos: *Por hacer*, *En curso* y *Hecha*.~~
~~4. **Asignarse una tarea o reasignarla desde la lista.** Así es como alguien dice "esto es mío" antes de empezar.~~
~~5. **Una lista compartida con todas las tareas del espacio.** Cada tarea muestra título, responsable, estado y fecha. Las vencidas se ven de un vistazo.~~
~~6. **Filtrar la lista por estado.** Sirve para centrarse en lo que queda por hacer.~~
~~7. **Ver los cambios de los demás sin refrescar.** La lista, si está abierta, se mantiene al día sola.~~


Refinado por mi:

1. **Entrar al espacio con la cuenta que ya existe.** Se reutilizan el registro y el login actuales. Todo usuario registrado forma parte del único espacio compartido.
2. **Crear una tarea en segundos.** Solo el título es obligatorio. El responsable y la fecha de vencimiento son opcionales.
3. **Un solo tablero compartido con todas las tareas del espacio.** Hay tres estados fijos que se muestran como columnas: *Por hacer*, *En curso* y *Hecha*. Cada tarea muestra título, responsable, y fecha. Las vencidas se ven de un vistazo. 
4. **Cambiar el estado de una tarea arrastrándola a otra columna del tablero.**
5. **Asignarse una tarea o reasignarla en dos clicks desde en el tablero.** Así es como alguien dice "esto es mío" antes de empezar.
6. **Ver los cambios de los demás sin refrescar.** El tablero, si está abierto, se mantiene al día solo.



**Supuestos (no se construyen):** hay un solo espacio y, por tanto, un solo equipo. Nadie pertenece a varios equipos. El equipo abandona su gestor anterior en lugar de usar los dos a la vez.

#### NO-alcance

Criterio común: la hipótesis es que el equipo deja la ronda de "¿en qué estás?" porque ve el estado actual de las tareas y actualizarlo cuesta dos clics. Todo lo que no ayuda a comprobar eso queda fuera.

**Exclusiones decididas por producto:**

- **Notificaciones push (y también correo y recordatorios de vencimiento).** La señal es algo que espera a que la mires, no algo que te interrumpe. Un aviso reintroduce justo la interrupción que se quiere eliminar.
- **Integración con Slack.** Llevar los cambios de estado al chat convierte la lista en otra fuente de avisos y devuelve la conversación al canal donde hoy se pregunta "¿en qué estás?". Además, si el estado vive en dos sitios, la gente acaba actualizando en uno y consultando en otro, y eso acelera el riesgo #1. El valor tiene que demostrarse dentro de la lista, sin ayuda de un canal externo.
- **Roles y permisos avanzados.** En el MVP los roles son planos: todos ven y editan lo mismo. El valor lo cobran los pares, no un responsable, así que la jerarquía añade fricción y no aporta nada a la hipótesis.
- **Analítica y reporting.** No hay reporte hacia arriba y a un manager le da igual. Paneles, métricas de productividad o informes de avance sirven para contar el trabajo, no para hacerlo, y además se acercan a la vigilancia. La hipótesis se valida observando la daily, no con un panel.
- **Comentarios en tareas.** FlowSync no es un chat, y un hilo en la tarea reintroduce el ida y vuelta que se quiere eliminar. También haría que actualizar pasara a significar escribir, cuando debería ser un clic.

**Otras exclusiones derivadas de la ficha de hechos:**

- **La entidad "equipo", varios espacios e invitaciones.** Un equipo piloto cabe en un solo espacio, así que separarlos no ayuda a validar nada. Queda anotado como supuesto.
- **Presencia o "quién está conectado".** El estado es de la tarea, no de la persona. Medir actividad es vigilancia y se rechaza a propósito.
- **Resumen de "qué se ha movido desde tu última visita" e historial de actividad.** Las dos decisiones que importan (qué no empezar y qué coger) se toman sobre el estado actual, no sobre lo que ha pasado.
- **Estado "Bloqueada" y gestión de bloqueos.** La parte de bloqueos de la daily sigue y este MVP no la resuelve. Meterla diluiría la validación de la ronda de "¿en qué estás?".
- **Colaboración simultánea sobre el mismo contenido.** "Tiempo real" aquí significa ver cambios de estado, no editar a la vez.
- **Otras integraciones: estado derivado de Git/PRs, CI o calendario, e importar desde otro gestor o sincronizarse con él.** Serían otro producto, con autorizaciones de terceros. Además, FlowSync sustituye al gestor, no convive con él.
- **Sprints, estimaciones, épicas y backlog priorizado.** Se renuncia a ellos de forma explícita: un equipo que los necesite no es nuestro usuario.
- **Estados o flujos configurables, campos personalizados, descripción, subtareas, etiquetas, prioridad y adjuntos.** Cada campo extra encarece crear y actualizar tareas, y eso ataca directamente el riesgo #1.
- **Filtrar por responsable o fecha, buscar u ordenar a medida.** Una lista de 3–10 personas se lee de un vistazo, y el filtro por estado cubre el caso de centrarse en lo pendiente.
- **Editar el título o la fecha y borrar o archivar tareas.** No ayudan a comprobar que el estado se mantiene al día. Una tarea mal creada se marca como *Hecha* o se vuelve a crear. _(Es el caso más dudoso: se deja fuera a propósito para que el recorte sea agresivo.)_
- **App móvil y modo sin conexión.** El caso de uso es la lista abierta mientras se trabaja en el ordenador.
- **Perfil ampliado (avatar, huso horario, disponibilidad).** Se acerca a la presencia y no aporta a la hipótesis.

## PARTE B

### 1. Los dos números:
- Items del alcance propuestos por la IA: 7
- Items luego de mi recorte: 6

### 2. Tres cosas que dejaste fuera, y por qué cada una:
Solo deje una cosa afuera:
| Item | ¿Por qué? |
| ---------------- | ---------------- |
| *Filtrar la lista por estado.** Sirve para centrarse en lo que queda por hacer | Refiné el item que indicaba una lista a un tablero con cada estado como columna  |

### 3. La exclusión de la que menos seguro estás
Ninguna.
