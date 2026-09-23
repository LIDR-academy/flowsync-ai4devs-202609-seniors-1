# FlowSync — Alcance del MVP

## 1. Problema

En un equipo remoto pequeño, saber en qué está trabajando otra persona cuesta una
interrupción. Hoy eso se paga de dos formas: una ronda diaria de "¿en qué estás?" que se
come la mitad de los quince minutos de la daily, y un goteo constante de preguntas por chat
el resto del día. El coste no es solo el tiempo: la información llega tarde. Dos personas
del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo
supiera, y se perdieron dos días.

El problema no es que falte un gestor de tareas. Es que el estado del trabajo del equipo
solo existe dentro de la cabeza de cada uno, y la única forma de leerlo es preguntando.

## 2. Usuarios

Equipos remotos de 3 a 10 personas, repartidos en varios husos horarios, que hoy arrastran
un gestor de tareas más pesado de lo que necesitan y una daily por videollamada.

El valor lo cobran los pares, no un lead. No hay reporte hacia arriba: a un manager esta
herramienta le daría igual. Duele a los dos desarrolladores que descubren tarde que iban a
lo mismo, y a quien tiene que interrumpir a otro para saber cómo va.

## 3. Propuesta de valor

Una lista compartida del trabajo del equipo que se mantiene fresca sola, porque actualizarla
le conviene a quien la actualiza.

Quien escribe el estado cobra en el momento: esa misma lista es su cola de trabajo, la mira
para decidir qué coge, y a cambio deja de recibir preguntas sobre cómo va. Si el beneficio
fuera solo para los demás, nadie la escribiría.

Quien la lee llega por la mañana, o vuelve de una reunión, y ve qué se ha movido sin
preguntar a nadie. Es un resumen que espera, no un aviso que interrumpe.

Las dos decisiones que cambia, y son las únicas que justifican el esfuerzo: no empezar algo
que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si lo único
que produjera fuera la sensación de estar informado, el tiempo real no valdría lo que cuesta.

## 4. Alcance

Siete cosas dentro:

1. Un espacio único compartido: todo el que entra ve y edita la misma lista.
2. Crear una tarea con título, responsable, estado y fecha de vencimiento, sin ningún campo
   obligatorio más.
3. Tres estados fijos, iguales para todos y sin pantalla de configuración: pendiente, en
   curso y finalizada.
4. Cambiar el estado desde la propia lista, sin abrir la tarea ni navegar a otro sitio.
5. Asignarse una tarea a uno mismo desde la propia lista, incluido cogerse una tarea libre.
   Asignar a otra persona queda reservado a un rol de administrador.
6. Filtrar la lista por estado, para centrarse en lo pendiente.
7. La lista se actualiza sola cuando alguien cambia algo: sin refrescar y sin preguntar.

La cuenta y la sesión ya existen en el proyecto: no se construyen y no cuentan como alcance.
Solo puede modificar la lista quien tenga una sesión iniciada.

Desviación consciente de los hechos de partida, y la dejo escrita aquí en vez de esconderla: la
ficha dice roles planos, sin jerarquía de permisos. El punto 5 introduce un rol de administrador
para asignar a terceros. Es el único punto del alcance que no se apoya en los hechos, y el primero
que quitaría si alguien lo discute.

Riesgo número uno, y va dentro del alcance, no en una nota al pie: si la información se
queda vieja, el producto pierde el sentido entero. La mitigación elegida es que actualizar
cueste dos clics, no obligar a nadie. Eso es exactamente lo que el MVP existe para validar.

Criterio de éxito a una semana de uso real: que el equipo cancele la ronda de "¿en qué
estás?" de la daily y nadie pida que vuelva. La daily no desaparece entera — la parte de
bloqueos sigue, y este MVP no la resuelve.

## 5. NO-alcance

Cada exclusión, con lo que deja de validar:

- **Entidad "equipo" y espacios múltiples** — fuera, porque no ayuda a validar que un equipo
  deja de preguntarse en qué anda cada uno. Un solo equipo basta para saberlo, y modelar
  varios contamina todo lo demás desde el primer día.
- **Marca visual de lo vencido** — fuera, porque la fecha ya se ve en la lista. Resaltarla no
  cambia ninguna de las dos decisiones que el producto existe para cambiar.
- **Editar y borrar tareas** — fuera, porque una tarea mal escrita no impide ver quién está
  en qué. Se puede dar por finalizada y crear otra.
- **Notificaciones push** — fuera, y no solo por coste: la señal que pide el caso es un
  resumen que espera, no un aviso que interrumpe. Empujar avisos construiría justo la
  interrupción que el producto quiere eliminar.
- **Integración con Slack** — fuera, porque llevaría el estado de vuelta al canal donde hoy
  se pierde entre mensajes. Si la lista solo funciona cuando Slack la reenvía, no ha
  funcionado.
- **Comentarios en tareas** — fuera, porque la conversación no es la decisión que queremos
  cambiar. Nadie evita un solape leyendo un hilo.
- **Analítica y reporting** — fuera, porque no hay nadie arriba a quien reportar. Es la
  funcionalidad de un producto distinto, con un comprador distinto.
- **Sprints, estimaciones, épicas y backlog priorizado** — fuera por renuncia explícita. Un
  equipo que los necesita no es nuestro usuario, y meterlos nos convierte en aquello de lo
  que el usuario está huyendo.
- **Derivar el estado de Git, CI o calendario** — fuera, porque es otro producto:
  integraciones, OAuth de terceros y adivinación. Además haría trampa con el riesgo
  principal, que es precisamente si la gente teclea o no.
- **Presencia y actividad de personas** — fuera por decisión deliberada, no por coste. El
  estado es de la tarea, no de la persona. Saber quién está conectado es vigilancia, y la
  rechazamos.
- **Subtareas, dependencias, etiquetas, prioridades, búsqueda, adjuntos e historial de
  cambios** — fuera en bloque, porque cada uno añade un campo que decidir al crear una
  tarea, y el MVP se sostiene sobre que crear una tarea no obligue a decidir nada.
- **Convivir con el gestor de tareas actual** — fuera. FlowSync crea las tareas, no lee las
  de otro sitio. Convivir exigiría doble actualización, que es exactamente como muere esta
  categoría de producto.

---

# Las tres líneas

**1. Los dos números.** La IA propuso meter dentro **9** cosas. Después de mi recorte quedaron
**7**. Además de quitar dos, añadí una condición que la IA no había puesto: asignar a otra
persona exige rol de administrador.

**2. Tres cosas fuera, y por qué.**

- Editar y borrar tareas, porque no ayuda a validar que el equipo deja de preguntarse en qué
  anda cada uno: una tarea con el título mal puesto sigue diciendo quién la tiene y en qué
  estado va.
- La marca visual de lo vencido, porque no ayuda a validar que alguien evita empezar algo que
  otro ya está tocando. La fecha ya está en la lista; pintarla de rojo es cosmética.
- Asignar tareas a otras personas, que la IA había metido dentro y yo dejé solo en
  autoasignación, porque no ayuda a validar que la lista se mantenga fresca: quien mejor sabe
  en qué está una persona es esa persona, y repartir trabajo desde fuera es la coordinación
  que este MVP no promete resolver.

**3. La exclusión de la que menos seguro estoy.** Editar y borrar tareas. Si en la semana de
prueba la lista se llena de tareas duplicadas o mal creadas que ya no se pueden quitar, deja
de ser fiable y es practicamente  todo el producto. Entraría en cuanto
alguien vuelva a preguntar.
