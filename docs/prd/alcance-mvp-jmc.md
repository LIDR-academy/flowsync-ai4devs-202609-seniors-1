# Alcance MVP — FlowSync

Punto de partida, el párrafo tal cual llegó:

> «I need FlowSync as a remote teams management tool preventing alignement meetings.
> Something like shared task in real time and not like Jira.»

---

## Tramo 1 · El terreno que ya existe

- **Capabilities construidas: solo identidad.** Registro con email y contraseña, login que emite un access token opaco, logout que lo revoca y lectura del propio perfil. Cuatro endpoints bajo `/api/v1`, nada más.
- **Modelo de datos: dos tablas y ninguna de dominio.** `users` (email único, `full_name` opcional, contraseña, timestamps) y `auth_access_tokens`. No existe equipo, ni tarea, ni proyecto, ni estado, ni asignación, ni relación entre personas: hoy dos usuarios registrados no comparten absolutamente nada.
- **Frontend: tres pantallas.** Registro, login y perfil, con guardas de ruta y el token en `localStorage`. La pantalla de perfil muestra los datos de uno mismo; no hay ninguna vista de equipo.
- **Tiempo real: cero infraestructura.** No hay WebSockets, ni SSE, ni transmit, ni siquiera polling. La API es REST síncrona sobre un SQLite en fichero, pensado para un solo proceso de desarrollo.
- **Consecuencia para el alcance.** De lo que describe el párrafo no hay nada construido; lo único reaprovechable es "quién eres". Todo lo demás —la noción de equipo, la de trabajo en curso y la de propagación en vivo— es MVP, no iteración.

---

## Tramo 2 · El interrogatorio

Cinco preguntas, una sola ronda, todas a nivel de producto.

1. **¿Qué reunión concreta desaparece, en qué equipo, y quién tiene autoridad para cancelarla?**
   "Evitar reuniones de alineamiento" no es medible. El daily de 15 minutos, la weekly de planning y los "¿en qué estás?" sueltos de Slack son tres productos distintos. Sin la reunión nombrada no hay forma de saber si el MVP funcionó.

2. **El "en qué está trabajando cada uno", ¿lo teclea la persona o se deduce de lo que ya hace?**
   Si es a mano, le estás pidiendo a alguien mantener un estado al día para ahorrarse una reunión de 15 minutos: hay que saber por qué lo haría. Si se deduce (commits, PRs, calendario, foco), el producto es otro y el riesgo también.

3. **Cuando lo que sirve al que lee choca con lo que sirve al que escribe, ¿quién gana?**
   ¿El usuario principal es el compañero que quiere no interrumpir, o el lead que quiere ver el estado del equipo? La misma pantalla es "transparencia" para uno y "vigilancia" para el otro, y si se equivoca el equipo deja de actualizarla en dos semanas.

4. **¿Esto sustituye la herramienta de tareas que el equipo ya usa, o vive al lado?**
   Y si vive al lado: ¿qué es exactamente lo que no puede duplicar —backlog, estimaciones, sprints, tickets de cliente— y qué pasa cuando el mismo trabajo está en los dos sitios?

5. **¿La gente solapa horario o está repartida en husos?**
   "Tiempo real" solo vale si hay alguien mirando cuando ocurre. En un equipo asíncrono lo que hace falta no es un canal en vivo sino un resumen que aguante ocho horas de desfase; conviene saberlo antes de construir el canal.

### Respuestas

Ficha de hechos, tal cual llegó.

1. **Qué reunión.** «El objetivo es disminuir el numero de daily catch ups a uno cada dos dias, como minimo y solo dos reuniones a la semana como maximo.»
2. **Quién mantiene el dato.** «En el MVP cada persona introduce en lo que esta trabajando cada vez que cambie de tarea. Si el MVP es exitoso futuras versions se integraran con Jira, este punto esta fuera del alcance del MVP»
3. **Para quién optimizamos.** «El usuario principal es el compañero que quiere no interrumpir»
4. **Convivencia.** «La herramienta ha de vivir al lado, backlog, estimaciones, sprints, tickets de cliente no se deben duplicar. El elemento a mostrar en la app es la tarea, creadas a mano en el MVP.»
5. **Sincronía del equipo.** «El equipo es distribuido pero con unas core hours de 11 AM a 5PM horario de Madrid.»

---

## Tramo 3 · El alcance en cinco bloques

### Problema

Un equipo distribuido con seis horas de solape (11:00-17:00, hora de Madrid) sostiene un catch-up diario cuyo contenido real cabe en tres frases por persona: en qué estoy, desde cuándo, y si estoy atascado. Esa información es diminuta y se pone rancia en cuestión de horas, pero hoy no hay ningún sitio donde leerla: las dos únicas maneras de conseguirla son interrumpir a alguien o esperar a la reunión. El equipo paga entonces cinco cortes de contexto a la semana —todos a la vez, todos a la misma hora— para sincronizar algo que cambia continuamente entre una reunión y la siguiente.

Jira tiene una parte del dato, pero en la granularidad equivocada: el ticket y el sprint no responden a «¿puedo escribirle a esta persona ahora o está metida en algo?». Nadie abre un tablero de sprint para averiguar eso.

### Usuarios

Una sola persona, en dos momentos distintos del día: el miembro del equipo que quiere saber en qué anda el resto sin interrumpir, y ese mismo miembro declarando su tarea cuando la cambia. No son dos perfiles, son dos gestos del mismo.

El lead entra como uno más, con una sola excepción: es quien deja constancia de que un catch-up se ha saltado. Esa es toda su superficie propia en el MVP, y el límite es deliberado, no un olvido: en cuanto el producto se optimiza para el que supervisa, el que escribe empieza a escribir para la supervisión y el dato deja de describir la realidad. Por eso lo que el lead registra es el comportamiento del grupo —nos hemos reunido o no—, nunca el de una persona.

La unidad de prueba es una sola squad, de cinco a diez personas. No es una limitación provisional a la espera de datos: es donde se juega la validez del MVP, y la pantalla única del alcance de abajo está dimensionada para eso. Llevarlo a equipos más amplios es una fase posterior y solo si esta funciona.

### Propuesta de valor

Saber en qué está cada uno ahora mismo, en tres segundos, sin interrumpir a nadie y sin abrir Jira, a cambio de un gesto de dos segundos cada vez que cambias de tarea.

La apuesta entera está en esa proporción. Escribir tiene que costar menos que la reunión que sustituye: si actualizar cuesta más de unos segundos, la gente lo abandona en dos semanas, el tablero empieza a mentir y el equipo vuelve al daily con toda la razón. Todo lo que entra en el alcance protege ese lado de la balanza; casi todo lo que se queda fuera, lo rompía.

Se sabe si funcionó con una sola cifra: los catch-ups que el equipo celebra a la semana. Tres o menos es el éxito mínimo y dos es el objetivo; cuatro o más es un MVP fallido, por bien que se vea el tablero. Y esa cifra no se estima a ojo ni se reconstruye del calendario: la produce el propio producto, porque alguien marca cada daily que el equipo decide saltarse. Cualquier otra métrica es decorativa.

### Alcance

Cuatro cosas dentro. La propuesta inicial traía siete; el recorte de producto dejó tres en pie, y la revisión del documento añadió una que no había propuesto nadie.

1. **Un equipo, con entrada por invitación.** Ni organizaciones, ni proyectos, ni jerarquía: se entra por un enlace y ya estás dentro. La única distinción entre personas es quién hace de lead, y existe únicamente por el punto 4.
2. **Declarar mi tarea actual a mano, en una línea.** Escribirla, cambiarla o dejarla vacía. La nueva sustituye a la anterior **en la pantalla**: no hay lista, hay una sola tarea en curso por persona, y esa restricción es medio producto — obliga a que el gesto sea escribir una frase, no gestionar una cola. Sustituir no es borrar: lo anterior deja de verse, pero no se destruye. En el MVP nadie lo lee, y aun así es la materia prima de la versión siguiente.
3. **El tablero del equipo.** Cada persona, su tarea actual y desde cuándo la tiene. Una pantalla, sin filtros ni configuración. El «desde cuándo» no es decorativo: es lo que delata un tablero rancio en lugar de disimularlo.
4. **Marcar un catch-up como saltado, y el recuento que sale de eso.** Solo el lead, una pulsación, y queda registrado. Es el único instrumento de medida del MVP, y es lo que impide confundir el éxito con un equipo que se reúne menos mirando un tablero vacío. Cuenta reuniones que no ocurrieron, no personas.

Ese punto 4 abre una decisión que antes no hacía falta tomar y que sigue abierta: **quién es el lead y quién lo designa.**

### NO-alcance

Quince cosas fuera, cada una con su porqué. Las tres primeras son el segundo recorte, el que se hizo sobre la propuesta ya recortada.

1. **Marcar una tarea como bloqueada, con un motivo.** Fuera, porque si estoy bloqueado ya no estoy trabajando en esa tarea: lo que el equipo necesita ver es que he cambiado a otra cosa, y eso lo dice el propio cambio de tarea sin añadir ni un campo. Un estado de bloqueo es una segunda forma de contar lo mismo, y de las dos solo una se mantiene al día. Si más adelante hace falta el motivo del atasco, llega con la integración con Jira.
2. **Que el tablero se actualice solo, en vivo, sin recargar.** Fuera, porque hoy lo único que aporta es ahorrarse pulsar F5, y eso no ayuda a validar ni que la gente mantiene su tarea al día ni que el equipo se reúne menos. Es la primera mejora de la versión siguiente si el MVP acierta, no una condición para probarlo.
3. **Pegar el enlace al ticket que ya existe.** Fuera, porque en una squad de cinco a diez personas, con una línea escrita por la propia persona, el equipo sabe a qué ticket corresponde sin que nadie se lo diga. No ayuda a validar nada y cobra un campo más justo en el momento de escribir. La integración con Jira lo resuelve gratis si el MVP acierta.
4. **Integración con Jira.** Fuera, porque no ayuda a validar que la gente mantiene su estado al día: si el dato lo trae un conector, lo que pruebas es el conector y la hipótesis del producto se queda sin probar. Es, eso sí, lo primero que entra si el MVP acierta.
5. **Backlog, sprints, estimaciones y tickets de cliente.** Fuera, porque nada de eso se discute en un catch-up diario. Duplicarlo convierte esto en el Jira que el equipo quería evitar, y añade un segundo sitio donde el estado puede estar mal.
6. **Panel de lead, métricas de equipo y cualquier informe de productividad.** Fuera, con la única excepción del recuento de dailies saltadas. Medir a las personas no ayuda a validar que el compañero deja de interrumpir, y sí garantiza que el equipo empiece a escribir para el informe. La diferencia está en el sujeto: el recuento mide al producto, no a quien lo usa.
7. **Comentarios, hilos, chat o menciones.** Fuera, porque el equipo ya tiene dónde hablar. Si la conversación se muda aquí, lo que acabas midiendo es la adopción de un segundo Slack, no si el estado compartido sustituye a la reunión.
8. **Notificaciones push, correos o bot de Slack.** Fuera, porque el MVP se juega precisamente en que la gente vaya a mirar el tablero por su cuenta durante las core hours. Si hay que empujarle el dato a Slack para que alguien lo lea, lo que has descubierto es que el tablero no se mira, y eso hay que dejarlo ver, no taparlo.
9. **Roles, permisos y administración de miembros.** Fuera, salvo la marca mínima de quién hace de lead, que el recuento de dailies saltadas obliga a tener. Ni jerarquía, ni altas y bajas gestionadas, ni nadie que pueda expulsar a nadie: eso resuelve un problema de escala que una squad con un enlace de invitación todavía no tiene.
10. **Varios equipos, organizaciones o proyectos, y el rollout a equipos más amplios.** Fuera, porque el MVP se valida en una squad real, no en muchas. Extenderlo es una fase posterior con su propia decisión detrás; construirlo ahora es coste sin hipótesis.
11. **Consultar el histórico: navegarlo, buscar en él o sacar informes semanales.** Fuera, porque lo que sustituye al daily es el «ahora», no el archivo. Que las tareas anteriores no se destruyan no significa que haya dónde mirarlas: el archivo sirve a la retrospectiva, que es otra reunión, otro usuario y otro producto.
12. **Etiquetas, prioridades, fechas de entrega, subtareas y adjuntos.** Fuera, porque cada campo es un impuesto cobrado en el peor momento posible, justo cuando la persona está cambiando de tarea y tiene prisa. El riesgo número uno del MVP es que no escriba.
13. **Detección automática de actividad o presencia (en línea / ausente).** Fuera, porque responde a otra pregunta —¿está disponible?— y no a la del producto —¿en qué está?—. Además reintroduce por la puerta de atrás la sensación de vigilancia que la decisión sobre el usuario principal se está cuidando de evitar.
14. **El «desde ayer» y cualquier resumen asíncrono de lo ocurrido fuera del solape.** Fuera, y son la misma cosa con dos nombres: un digest de lo que pasó mientras no mirabas. Con seis horas comunes el tablero tiene su oportunidad limpia, y si no funciona ahí, un resumen no lo arregla. El precio se acepta a sabiendas: quien se incorpora a las once ve el presente, no lo que ocurrió antes de que llegara.
15. **Aplicación móvil.** Fuera, porque durante las core hours la gente está delante del ordenador. El móvil no cambia en nada si el dato está fresco.

---

**Nota de nivel.** Tres puntos tiraron del documento hacia la arquitectura. «Una sola tarea en curso por persona» y «sustituir no es borrar» se quedaron como promesa —qué ve el equipo, y qué no se pierde— sin que el documento diga en ninguna parte cómo se guarda: esa frase es la que pedía a gritos y la que no le toca escribir. El tercero, «el tablero se actualiza solo», se resolvió por exclusión: la discusión de transporte en vivo contra refresco manual desapareció en cuanto el punto salió del alcance, que es la forma más barata de no tenerla.

**Los números del recorte: siete elementos propuestos dentro, tres supervivientes al recorte de producto, y uno añadido después por la revisión —el recuento de dailies saltadas, que no estaba en ninguna lista—. Cuatro dentro, quince fuera.**

---

## Parte B · Las tres líneas

La IA propuso **7** puntos como parte del alcance y yo mantuve **4**

**Marcar la tarea como bloqueada con motivo**, agrega complejidad al MVP, pasos manuales, puede reducir la integridad de datos y duplica una informacion en Jira, puede ser parte de siguientes versiones. **Que el tablero se actualice solo, en vivo**, agrega complejidad para evitar un refresco manual de la pantalla. **Pegar el enlace al ticket que ya existe**: agrega acciones en la aplicacion para una tarea que se podra resolver con la integracion a Jira si el MVP es un exito

**Marcar la tarea como bloqueada con motivo** puede ser una informacion complementaria que ayuda al exito en el uso del MVP. La principal razon para eliminarla  es la necesidad del usuario de definir el bloqueo, accion duplicada en Jira. Eso puede orignar datos incongruentes. Al mismo tiempo dota de mas valor la aplicacion y no ver los bloqueos puede ser la clave para el fracaso del MVP. El riesgo de incongruencia puede ser aceptable si la integracion con Jira se hace inmediatamente del MVP. 