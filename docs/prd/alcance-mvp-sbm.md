**PARTE A: el alcance**

**El terreno que ya existe (3-5 líneas).** 
- Solo hay auth: signup, login, logout y perfil bajo /api/v1, con tokens opacos.
- Solo dos tablas: users (email, fullName, password) y auth_access_tokens.
- Backend: modelo User, UserTransformer, validadores; respuestas en { data }.
- Frontend: login, registro y perfil con AuthProvider, cliente en lib/api.ts y shadcn.
- No hay tests ni tareas, equipos o proyectos: el núcleo de FlowSync está por hacer.

**El interrogatorio.** 
1. ¿Cada persona muestra solo una tarea actual, o hace falta una lista con estados (pendiente, en curso, hecha)?
2. ¿Las tareas se crean en FlowSync o ya existen en Jira/GitHub y solo se enlazan?
3. ¿Hay un solo equipo o varios? ¿Cómo se entra en uno: invitación, código o todos ven a todos?
4. ¿"Tiempo real" significa aviso instantáneo (WebSocket/SSE) o basta refrescar cada pocos segundos?
5. ¿Cómo se evita un estado obsoleto: caduca solo, marca "inactivo" o depende de que el usuario lo cambie?

**El alcance en cinco bloques.**

1. Problema.
- En equipos remotos nadie ve en qué está cada uno sin interrumpir a alguien (Slack, chat, daily).
- La ronda de "¿en qué estás?" se come la mitad de la daily de 15 minutos.
- Dos personas empiezan lo mismo sin saberlo. En el caso de estudio se perdieron dos días.
- El gestor de tareas actual es tan pesado que no se mantiene al día, y por eso no sirve para esto.

2. Usuarios.
- Equipos remotos pequeños (3–10 personas), repartidos en varios husos horarios.
- Roles planos: todos ven y editan lo mismo. El valor lo reciben los compañeros, no un manager.
- Caso de estudio: equipo SaaS de 6 personas en 3 husos, con un gestor pesado y daily por vídeo.
- Supuesto: un único espacio compartido por instalación. Todos los usuarios registrados son el equipo.

3. Propuesta de valor.
- Ver de un vistazo quién está en qué y qué está libre, sin preguntar y sin recargar la página.
- Sirve para decidir: no empezar lo que otro ya está tocando y elegir lo siguiente que está libre.
- Quien lo actualiza también gana: la lista es su propia cola de trabajo y deja de recibir preguntas.
- Actualizar cuesta dos clics, sin campos obligatorios. Si cuesta más, el estado se queda viejo.
- Sustituye al gestor de tareas, no convive con él: la doble actualización mata esta categoría.

4. Alcance (una vertical fina de punta a punta).
- Entrar al espacio compartido con la cuenta que ya existe (registro, login y logout ya construidos).
- Crear una tarea escribiendo solo el título. Responsable y vencimiento son opcionales y se editan en línea.
- Cambiar el estado en un clic entre tres valores fijos: Pendiente · En curso · Hecha.
- Asignarse o reasignar una tarea a cualquier miembro del espacio.
- Una sola lista del equipo: título, responsable, estado y vencimiento, con lo vencido resaltado.

- Éxito: a la semana de uso real el equipo cancela la ronda de "¿en qué estás?" y nadie pide recuperarla.

5. NO-alcance
Recortado por IA:
- Notificaciones push y avisos: el caso es un resumen que espera, no un aviso que interrumpe.
- Integración con Slack, Git/PRs, CI o calendario: exige OAuth de terceros y es otro producto.
- Roles y permisos: con roles planos en equipos de 3–10 personas no hay nada que proteger.
- Varios equipos o espacios, invitaciones, gente en más de un equipo: queda como supuesto, no se construye.
- Comentarios en tareas: convierten la tarea en un chat y no ayudan a saber quién está en qué.
- Analítica, informes, historial de actividad: nadie los consume, porque no hay reporte hacia arriba.
- Sprints, estimaciones, épicas, prioridades, backlog ordenado: un equipo que los necesite no es nuestro usuario.
- Presencia ("quién está conectado", última actividad): el estado es de la tarea, no de la persona. Eso sería vigilancia.
- Estados configurables o flujos personalizados: tres estados fijos bastan para saber quién está en qué.
- Descripción, etiquetas, subtareas y adjuntos: más campos frenan la actualización, y ese es el riesgo #1.
- Marcar "qué ha cambiado desde tu última visita": ya lo resuelve la lista en vivo con el filtro. Se deja para validar después.
- Bloqueos: siguen en la daily. Este MVP no los resuelve y no pretende hacerlo.
- Caducidad automática de estados viejos: se mitiga haciendo que actualizar sea barato, no obligando ni adivinando.
Recortado por mi:
- Filtrar la lista por estado para centrarse en lo pendiente o en lo que está en curso.
- Los cambios de otros aparecen en la lista abierta sin recargar: es el "tiempo real" del producto.

**Parte B: las tres líneas**

**Los dos números. Cuántas cosas propuso la IA meter dentro del alcance, y cuántas quedaron dentro después de tu recorte**

Propuso sólo 7 (ademas indico el criterio de exito, que no considero alcance). Recorte 2 de ellas

**Tres cosas que dejaste fuera, y por qué cada una**

Solo deje 2 cosas fuera:
- Filtrar la lista por estado para centrarse en lo pendiente o en lo que está en curso: Aunque formaba parte de las respuestas de producto, creo que se puede validar el mismo sin ese filtrado e implementarlo en una siguiente iteracion de desarrollo. Se pueden localizar las tareas en cualquier estado aunque sin filtro sea un poco mas trabajoso
- Los cambios de otros aparecen en la lista abierta sin recargar: es el "tiempo real" del producto: Tambien creo que se puede validar el producto sin la recarga automatica, se puede obligar al usuario a tener que hacer esta recarga y cuando tengamos el visto bueno al MVP, implementar la recarga automática 

**La exclusión de la que menos seguro estás, y qué tendría que pasar para que entrara. Lo que interesa es qué dos cosas se contradecían: lo que te pedían contra lo que veías, lo barato contra lo que valida, lo que enamora contra lo que se puede sostener.**
No sabría elegir, creo que ambas exclusiones son funcionalidades muy deseables para el producto, pero que podemos validar la primera iteracion sin ellas



