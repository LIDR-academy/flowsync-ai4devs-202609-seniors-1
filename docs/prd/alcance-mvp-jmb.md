# Alcance del MVP de FlowSync

## 1. El terreno que ya existe

- **Cuentas de usuario, completas de punta a punta:** registro (email + contraseña, nombre opcional), login, ver el propio perfil y logout, con pantallas de login, registro y perfil ya hechas.
- **Modelo de datos:** solo existe la persona usuaria (nombre, email, contraseña) y sus sesiones de acceso. No hay equipos, tareas, estados, ni relación alguna entre usuarios.
- **Lo que no hay:** nada colaborativo ni en tiempo real. Hoy cada usuario solo se ve a sí mismo; todo lo que es "FlowSync" está por construir.
- **Implicación para el alcance:** el MVP no vuelve a especificar cuentas ni login; parte de un usuario ya autenticado.

## 2. El interrogatorio

Las cinco preguntas que más reducirían la incertidumbre antes de recortar:

1. **¿Qué duele hoy, en concreto?** ¿Perder tiempo en la daily, no enterarse de que alguien está bloqueado, pisarse trabajo entre dos personas, o que un manager no sepa cómo va el equipo? Cada respuesta lleva a un producto distinto.
2. **¿Quién abre FlowSync y quién lo mantiene al día?** ¿Lo actualiza cada persona sobre sí misma o alguien (lead, PM) reparte el trabajo? Y ¿cuántas personas tiene un equipo típico?
3. **¿Qué significa "en tiempo real" para este usuario?** ¿Ver el cambio de otro al instante sin recargar, recibir un aviso, o simplemente que la información nunca tenga más de unas horas?
4. **¿Qué unidad de información resuelve la pregunta "en qué está cada uno"?** ¿Una tarea con estado, una línea de texto libre tipo "ahora estoy con…", o ambas? ¿Importa el histórico o solo el presente?
5. **¿Qué señal nos diría que el MVP funciona?** ¿Que el equipo cancela la reunión de sincronización, que la usa X días seguidos, que un lead deja de preguntar por Slack…? ¿Y contra qué compite hoy (Slack, Jira, una hoja compartida)?

> Respondidas con la ficha de hechos de la lección "Ejercicio FlowSync"; el alcance de abajo sale de ahí, no de suposiciones.

## 3. El alcance

### Problema

En un equipo remoto nadie ve en qué está cada uno sin interrumpir a alguien. Eso tiene tres costes: la ronda de "¿en qué estás?" se come la mitad de una daily de 15 minutos, el mismo "¿cómo va?" se repite por chat durante el día, y el trabajo se duplica sin que nadie se entere. En el caso de referencia, dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera: dos días perdidos.

Lo que este MVP **no** resuelve: los bloqueos. Esa parte de la daily sigue existiendo.

### Usuarios

- **Equipos remotos pequeños (3–10 personas) de roles planos:** todo el mundo ve y edita lo mismo.
- **Quien se beneficia son los pares, no un lead:** quien va a empezar algo y necesita saber si otra persona ya lo está tocando, y quien deja de recibir preguntas sobre cómo va lo suyo. No hay reporte hacia arriba; a un manager no le aporta nada.
- **Caso de estudio (no es un cliente):** equipo de producto SaaS de 6 personas repartidas en 3 husos horarios. Hoy usan un gestor de tareas pesado y hacen una daily de 15 minutos por videollamada.
- **No es nuestro usuario:** un equipo que necesite sprints, estimaciones o informes.

### Propuesta de valor

Una única lista de tareas compartida que es a la vez **tu cola de trabajo** y **el estado del equipo**. Cambiar el estado de una tarea son dos clics sobre una lista que ya tienes abierta, y los demás ven el cambio sin refrescar la página ni preguntar.

Lo que cambia es una decisión concreta: **no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre.** Quien actualiza también sale ganando en el momento, porque esa lista es la que mira para decidir qué coge, y deja de recibir interrupciones.

Sustituye al gestor de tareas en vez de convivir con él. Convivir obligaría a actualizar en dos sitios, que es como muere esta categoría de producto.

### Alcance (dentro)

Una vertical fina, terminada de punta a punta:

1. **Crear una tarea en segundos.** Solo el título es obligatorio. Por defecto empieza en "pendiente", sin responsable y sin fecha.
2. **Cambiar el estado en dos clics desde la propia lista.** Los estados son tres y fijos (pendiente · en curso · hecha); no se pueden configurar.
3. **Asignar o cambiar el responsable** a cualquier persona del espacio. Asignársela a uno mismo equivale a decir "me la quedo".
5. **Una lista única compartida**: todas las personas con cuenta ven las mismas tareas, con su responsable, su estado y su fecha.
6. **Filtrar la lista por estado**, para centrarse en lo que está pendiente.
7. **Ver sin refrescar** los cambios que hacen otras personas.
8. **Editar y borrar una tarea**, para corregir errores sin ensuciar la lista de todos.

### NO-alcance (fuera, y por qué)

- **Varios equipos, gente en más de uno, o una entidad "equipo".** Fuera, porque para validar si ver el estado sustituye la ronda de la daily basta con un solo equipo. *Supuesto del PRD:* hay un espacio único y todas las personas con cuenta forman el equipo.
- **Invitaciones, roles y permisos.** Fuera, porque los roles son planos y cualquiera puede registrarse con la cuenta que ya existe. El control de acceso no ayuda a validar la hipótesis.
- **Presencia: quién está conectado, indicadores de actividad.** Fuera a propósito: el estado pertenece a la tarea, no a la persona. Medir actividad es vigilancia, y no ayuda a decidir qué coger.
- **Notificaciones push, por email o dentro de la app.** Fuera, porque la señal tiene que esperar a que la mires, no interrumpirte. Una notificación reintroduce precisamente la interrupción que queremos quitar.
- **Resumen de "qué se ha movido desde tu última visita".** Fuera, porque la lista filtrada por estado ya responde a qué está libre y qué está cogido, que es la decisión que importa. Un resumen de cambios sirve para sentirse informado, no para decidir.
- **Chat o comentarios en las tareas.** Fuera, porque convertiría FlowSync en otro canal de conversación, y eso no ayuda a validar que el estado se entiende sin preguntar.
- **Gestión de bloqueos.** Fuera, porque esa parte de la daily se mantiene y este MVP no pretende sustituirla.
- **Estado derivado de Git, pull requests, CI o calendario.** Fuera, porque es otro producto: exige integraciones y autenticación con terceros. Aquí el estado lo escribe a mano quien hace la tarea.
- **Importar o sincronizar tareas con el gestor actual.** Fuera, porque FlowSync sustituye al gestor, no convive con él. Sincronizar obliga a actualizar en dos sitios.
- **Sprints, estimaciones, épicas, backlog priorizado e informes.** Fuera por renuncia explícita: un equipo que necesite eso no es nuestro usuario, y cada campo más resta a lo de "menos rollo que Jira".
- **Estados o flujos configurables.** Fuera, porque configurar es justo el peso que queremos evitar. Tres estados fijos bastan para saber quién está en qué.
- **Descripción larga, subtareas, etiquetas y adjuntos.** Fuera, porque para saber quién está en qué basta con título, responsable, estado y fecha. Cada campo extra hace más lento actualizar, y actualizar poco es el riesgo número 1.
- **Histórico o auditoría de cambios.** Fuera, porque la decisión se toma sobre el estado actual, no sobre cómo se llegó a él.
- **Filtros por responsable o fecha, búsqueda y orden manual.** Fuera, porque con 3–10 personas la lista se abarca de un vistazo y el filtro por estado cubre el caso de uso.
- **Fecha de vencimiento opcional**, y que se vea de un vistazo qué tareas se han pasado de plazo.** Fuera, porque añade otro campo innecesario

### Riesgo principal y criterio de éxito

- **Riesgo número 1: que la información se quede vieja.** Si pasa, el producto pierde el sentido. No se mitiga obligando a nadie, sino haciendo que actualizar cueste dos clics y que quien actualiza sea el primero en beneficiarse.
- **Criterio tras una semana de uso real:** el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva. Si la siguen haciendo igual, el MVP no funcionó.

### Nota de nivel

"En tiempo real" se ha dejado deliberadamente como comportamiento que ve el usuario ("ver los cambios sin refrescar"). Cómo se consigue técnicamente es una decisión de diseño, no de producto, y no se especifica aquí.

## 4. Las tres líneas

_Esta parte es tuya: vuelve a recortar tú sobre la lista de arriba y rellénala._

1. **Los dos números:** la IA propuso **8** cosas dentro; después de mi recorte quedan **_7_**.
2. **Tres exclusiones:**
   - _Fecha de vencimiento opcional fuera, porque no ayuda al objetivo, que es que nadie comience nada que ya está utilizando el resto y coger algo que está libre lo siguiente.
   - Filtrar por status fuera, porque se puede ordenar la lista para poner primero cosas que no tengan status
   - Asignar o cambiar el responsable fuera, porque puede ir dentro del cambio de status
3. **La exclusión de la que menos seguro estoy, y qué tendría que pasar para que entrara:** _Asignar o cambiar el responsable_
