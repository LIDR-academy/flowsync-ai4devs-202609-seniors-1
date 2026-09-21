## Resumen del estado actual

FlowSync tiene hoy únicamente el esqueleto de autenticación: en el backend existen `User` y `AuthAccessToken` (tokens opacos vía `DbAccessTokensProvider`) como único modelo de datos, sin ninguna entidad de dominio (no hay equipos, proyectos, tareas ni relaciones entre usuarios). Las rutas expuestas bajo `/api/v1` cubren solo el ciclo de auth: `POST /auth/signup`, `POST /auth/login`, `GET /account/profile` y `POST /account/logout`, todas servidas por transformers (`UserTransformer`) y validadas con VineJS. El frontend replica ese alcance: páginas de login, registro y perfil, con `auth-provider` gestionando el token en `localStorage` y rehidratación contra `/account/profile`, pero sin ninguna pantalla ni componente de gestión de tareas. No existen tests (`tests/unit` y `tests/functional` aún no están creados). En conjunto, el MVP de "gestión de tareas en equipo" parte de cero en cuanto a dominio: todo el trabajo de tareas, equipos y colaboración está por diseñar e implementar.

## Problema

La ronda de "¿en qué estás?" dentro de la daily se come la mitad de esos 15 minutos, y fuera de ese momento nadie ve en qué anda el equipo sin interrumpir a alguien por chat. Ya ha costado caro: dos personas tocaron el mismo módulo la misma semana sin saberlo — dos días perdidos. No es "falta de comunicación" en general (los bloqueos ya se resuelven bien en la daily); es específicamente la falta de visibilidad de quién está en qué entre sincronizaciones.

## Usuarios

Equipos remotos pequeños (3-10 personas), roles planos: todos ven y editan lo mismo, nadie tiene vista de "reporte hacia arriba". Cobra el valor quien evita pisarse o ser interrumpido — un par, no un manager. Caso de estudio de referencia: equipo de 6 personas de producto SaaS repartido en 3 husos horarios.

## Propuesta de valor

Ver el estado del equipo de un vistazo, sin preguntar y sin esperar a la daily, para no empezar algo que otro ya está tocando y para elegir lo siguiente sabiendo qué está libre. Se sostiene porque actualizar cuesta dos clics sobre una lista que la propia persona ya usa como su cola de trabajo: no es "informar a otros", es su propia herramienta, que de paso informa.

Riesgo principal a validar: si la información se queda vieja, el producto pierde el sentido. La mitigación de diseño es mantener el coste de actualizar en dos clics, nunca obligatorio. Criterio de éxito a una semana de uso real: el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva.

## Alcance

- Un único espacio de trabajo compartido por todo el equipo.
- Tareas con título, responsable, estado y fecha de vencimiento.
- Cualquiera crea o edita una tarea y se la asigna a sí mismo o a otro.

## NO-alcance (y por qué se recorta)

- **Multi-equipo / multi-espacio** — el caso de estudio es un equipo único; soportar varios duplica modelo (pertenencia, aislamiento) antes de validar que el espacio único resuelve el problema. Queda como supuesto anotado, no como huella técnica sin usar.
- **Notificaciones push** — la propuesta de valor es "resumen que espera", no "aviso que interrumpe"; construirlo iría contra la premisa del producto, no es solo cuestión de tiempo.
- **Presencia / "quién está conectado"** — es vigilancia, no frescura de tarea. Se rechaza por decisión de producto, no por prisa.
- **Integraciones para derivar estado (Git/PR, CI, calendario)** — cada una es su propio proyecto de OAuth y mantenimiento; teclear el estado a mano en segundos ya resuelve el problema sin esa complejidad.
- **Roles y permisos** — con 3-10 personas y sin jerarquía, no hay nadie para quien construir un permiso: no hay usuario que lo necesite en este MVP.
- **Comentarios en tareas** — abriría una superficie de chat que compite con el propio Slack que se quiere evitar; el objetivo es estado, no conversación.
- **Analítica / reporting** — no hay quién lo consuma; el usuario objetivo son los pares, no un manager pidiendo métricas.
- **Sprints, estimaciones, épicas, backlog priorizado** — es justo el "rollo de Jira" que se quiere evitar; un equipo que necesite ese nivel de planificación no es el usuario de este MVP.
- **Convivir con otro gestor de tareas** — mantener dos fuentes de verdad mata la frescura por duplicidad de actualización; FlowSync sustituye, no complementa.

- **El estado se ve actualizado al entrar o volver a la vista, sin necesidad de preguntar (frescura, no aviso que interrumpe).** - Parece un alcance redundante sin en las dos primeras ya indicamos que tenemos un espacio único y compartido por todos, donde están las tareas.
- **Lista de tareas filtrable por estado.** - Puede ser útil, pero para una prueba inicial no es requisito indispensable. Tendría más sentido con un sistema ya probado con más volumen de tareas, para mejorar la visibilidad.
- **Cambiar el estado de una tarea en dos clics, sin campos obligatorios extra.** - He modificado el último alcance para que en vez de ser "Cualquiera crea una tarea", que sea "Cualquiera crea o edita una tarea". De este modo, es irrelevante que sean 2 clics, y de hecho el concepto en sí no tiene sentido si no se ha creado previamente la tarea. Si la tarea no existe requerirá más de 2 clics, y si ya existe puede bastar con uno si sólo debe cambiar el estado. Lo importante es que sea sencillo, no que sean 2 clics.

## PARTE B

1. La IA propuso 6 puntos en Alcance y 9 puntos en No-Alcance.
2. Tres exclusiones concretas:
- **El estado se ve actualizado al entrar o volver a la vista, sin necesidad de preguntar** - Esto fuera, porque es redundante con respecto a otros Alcances, al tener ya un espacio único y compartido donde están las tareas.
- **Lista de tareas filtrable por estado** - Fuera, porque si bien puede ser útil, para una prueba piloto no habrá un exceso de tareas, con lo que de momento no es necesario poder filtrar para testear su utilidad.
- **Cambiar el estado de una tarea en 2 clics** -Fuera, ya que el onjetivo es que sea sencillo y rápido, y con la definición que tiene ya lo es. Es indiferente que sea un clic, dos o tres, no aporta nada.
3. **Lista de tareas filtrable por estado** - Si bien es innecesaria en este nivel parece una tarea muy simple que con muy poco esfuerzo puede dar mayor visibilidad y claridad. Pero por otro lado, dependiendo de cómo se diseñe lo que entra en Alcance, puede no ser necesario, si por ejemplo se ubican las tareas en columnas por estados. Le vería más sentido si hubiese muchísimas tareas, pero en un equipo de 3-6 tampoco creo que sea un problema.