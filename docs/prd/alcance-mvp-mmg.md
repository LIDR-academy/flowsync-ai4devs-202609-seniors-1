# Alcance del MVP de FlowSync

> Propuesta generada por la IA (Claude Code, Opus 5.5) a partir de la ficha de hechos. El recorte final y la Parte B son del autor.

## 1. El terreno que ya existe

FlowSync hoy solo tiene cuentas: registro con email, contraseña y nombre opcional, login, perfil y logout, con sesión por token. El único dato de negocio es la persona usuaria. No hay tareas, ni espacios, ni equipos, ni estados. Lo que se defina aquí se apoya en "quién soy" (ya resuelto) y no reespecifica nada existente.

## 2. El interrogatorio

Una sola ronda de cinco preguntas: qué duele hoy, quién cobra el valor, qué significa "tiempo real", de dónde sale el estado y por qué se sostiene, y qué es "menos rollo que Jira" y cómo se mide el éxito. Se respondieron con la ficha de hechos del producto, sin inventar nada. Lo que la ficha no cubría se declara abajo como supuesto.

**Supuestos que decidió la IA** (revisar: aquí se cuelan los huecos):

- **S1. Una instancia por equipo.** Hay un único espacio compartido y el registro está abierto, así que cualquiera que se registre ve y edita todas las tareas. Se asume que cada equipo despliega su propia instancia privada; control de acceso al espacio, no.
- **S2. Solo el título es obligatorio.** Estado por defecto "Por hacer"; responsable opcional. Sin responsable = tarea libre.
- **S3. Tres estados fijos:** Por hacer · En curso · Hecha. No configurables.
- **S4. Un solo responsable por tarea.**
- **S5. Última visita privada.** Para enseñar "qué se ha movido", se recuerda cuándo miró cada persona por última vez, y eso solo lo ve ella. No es presencia: nadie más lo ve.
- **S6. Ediciones a la vez: gana la última.** Si dos personas cambian la misma tarea a la vez, gana la última escritura, sin aviso de conflicto.

## 3. El alcance

### Problema

En un equipo remoto nadie ve en qué está cada uno sin interrumpir a alguien. Se paga de dos formas: la ronda de "¿en qué estás?", que se come la mitad de la daily, y el "¿cómo vas?" constante por chat. Cuando falla, dos personas descubren tarde que iban a lo mismo (caso real: mismo módulo, misma semana, dos días perdidos).

### Usuarios

Pares de equipos remotos pequeños (3–10 personas), con roles planos y sin reporte hacia arriba. No es un producto para managers. Caso de estudio: equipo SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos.

### Propuesta de valor

Una lista de tareas compartida que es a la vez tu cola de trabajo y el estado del equipo. Actualizarla cuesta dos clics sobre una lista que ya tienes abierta, así que quien escribe cobra en el momento (decide qué coge y deja de recibir preguntas). Quien llega ve qué se ha movido y qué está libre sin preguntar a nadie.

**Hipótesis que el MVP debe validar:**

- **H1.** Si el estado del equipo se ve de un vistazo, el equipo cancela la ronda de "¿en qué estás?".
- **H2 (riesgo #1).** Si actualizar cuesta dos clics y la lista es la propia cola de trabajo, el estado no se queda viejo sin obligar a nadie.
- **H3.** Ver qué está cogido y qué está libre evita empezar algo que otra persona ya está tocando.

**Éxito:** a una semana de uso real, el equipo cancela la ronda y nadie pide que vuelva.

### Alcance (lo que entra)

1. **Crear una tarea escribiendo solo el título**, en segundos, y poder corregir sus campos después.
2. **Una lista única compartida** con título, responsable y estado de cada tarea.
3. **Cambiar el estado desde la propia lista**, en dos clics como mucho, entre los tres estados fijos.
4. **Coger una tarea o asignarla.** Sin responsable significa libre, y se distingue a simple vista.
5. **Marcar qué ha cambiado desde tu última visita**: el resumen que espera ("llego por la mañana y veo qué se ha movido").

Todo sobre las cuentas que ya existen: cualquier persona registrada ve y edita todo (S1).

### NO-alcance (lo que no entra, y por qué)

Recortado por el autor sobre la propuesta de la IA:

- **Ver los cambios de los demás sin recargar.** El caso central es "llego o vuelvo de una reunión y veo qué se ha movido", y eso lo cubre la marca de última visita al abrir la lista. La actualización en vivo es lo más caro de construir y no ayuda a validar H1–H3 más que una lista fresca al abrirla.
- **Fecha de vencimiento y tareas vencidas.** Dice qué va tarde, no quién está en qué ni qué está libre, así que no toca H1–H3. Además es un campo más al crear y actualizar, que va contra H2.
- **Filtrar por estado.** Con 3–10 personas, la lista cabe en una pantalla. Filtrar mejora la lectura de una lista larga, pero no cambia si el estado del equipo se ve de un vistazo (H1).

Propuesto como fuera desde el principio:

- **Notificaciones push o por email.** La señal es un resumen que espera, no un aviso que interrumpe. Un aviso reproduce justo la interrupción que se quiere quitar y no aporta nada a H1.
- **Integración con Slack.** Slack es donde hoy vive el "¿en qué estás?". Llevar el estado allí lo devuelve al canal que interrumpe y abre un segundo sitio donde mirar.
- **Roles y permisos.** Los equipos son de 3–10 pares con roles planos, y la jerarquía no es parte del problema. No toca ninguna hipótesis.
- **Analítica, informes y cuadros de mando.** No hay reporte hacia arriba y al manager le da igual. Medir el equipo no ayuda a que el equipo se coordine.
- **Comentarios en tareas.** Convierten la tarea en conversación, y eso es otro producto (chat). Además, la conversación sobre bloqueos sigue en la daily a propósito.
- **Presencia: quién está conectado, última actividad por persona, indicadores de "escribiendo".** El estado es de la tarea, no de la persona. Es vigilancia y se rechaza por principio, no por coste.
- **Marcar una tarea como bloqueada o gestionar bloqueos.** La parte de bloqueos de la daily se queda. Resolverla es otra hipótesis, y meterla diluiría la medición de H1.
- **Varios equipos o espacios, invitaciones, gente en más de un equipo.** Un espacio único basta para validar H1–H3 con un equipo; queda como supuesto (S1).
- **Estado sacado de Git/PRs, CI o calendario.** Es otro producto, con integraciones y OAuth de terceros. H2 se valida precisamente con estado tecleado a mano.
- **Importar o sincronizar con Jira u otro gestor.** FlowSync sustituye, no convive: la doble actualización es como muere esta categoría y contaminaría H2.
- **Sprints, estimaciones, épicas, prioridades, backlog ordenado.** Son renuncias explícitas: cada uno es un campo o una decisión más antes de poder mover una tarea, y eso va contra H2. Quien lo necesite no es nuestro usuario.
- **Estados o flujos configurables.** Configurar es justo el "rollo de Jira"; tres estados fijos bastan para saber quién está en qué.
- **Descripción, etiquetas, subtareas, adjuntos, prioridad.** No cambian la respuesta a "quién está en qué ni qué está libre", y cada campo más hace que crear y actualizar sea más lento.
- **Varias personas por tarea (pairing).** Complica la pregunta "¿está libre?" sin ayudar a validar H3 en su forma más simple.
- **Recordatorios para actualizar o avisos de "tarea sin tocar en N días".** La mitigación elegida para H2 es que actualizar sea barato, no obligar. Un recordatorio escondería si H2 se cumple por sí sola.
- **Detectar automáticamente posible trabajo duplicado.** Es tentador por el episodio, pero primero hay que validar que basta con ver la lista (H3). La detección es inteligencia sobre un dato que aún no sabemos si se mantiene.
- **Historial completo de cada tarea.** La marca de "cambiado desde tu última visita" responde a "qué se ha movido". Un historial es auditoría, no coordinación.
- **Borrar o archivar tareas.** "Hecha" más el filtro por estado ya limpian la vista. Borrar abre deshacer y confirmaciones sin tocar ninguna hipótesis.
- **Edición simultánea del mismo contenido.** "Tiempo real" es ver cambios de estado, no coeditar (S6).
- **App móvil nativa y modo sin conexión.** La lista se usa en el puesto de trabajo, al llegar o al volver de una reunión.

### Incoherencias detectadas en la ficha

- **"Sin campos obligatorios" frente a "una tarea necesita título, responsable, estado y fecha".** Se resuelve con S2: solo el título es obligatorio. Si el responsable fuera obligatorio, no existiría "tarea libre" y H3 perdería la mitad.
- **"Tiempo real sin refrescar" frente a "resumen que espera, no aviso".** Se resolvió recortando la actualización en vivo. Pero ojo: la ficha define "tiempo real" exactamente como "ver los cambios sin refrescar", y el pitch original pide "más en tiempo real". Con este recorte, el MVP ofrece frescura al abrir, no tiempo real. Es una desviación consciente de la ficha, no un malentendido, y hay que poder defenderla ante quien la escribió.
- **El recorte contradice la ficha en otros dos puntos.** La ficha pide fecha de vencimiento ("qué se ha pasado de plazo") y filtrar por estado ("centrarse en lo pendiente"). Ambos salen del MVP. Si "Hecha" no se puede filtrar ni borrar, la lista crece con tareas terminadas y la vista de un vistazo (H1) se degrada con el uso: a unas semanas de uso real, el filtro puede dejar de ser prescindible.
- **"Espacio único" frente al registro abierto que ya existe.** Hoy cualquiera puede registrarse, así que en un despliegue compartido gente ajena vería las tareas del equipo. S1 lo aparca, pero es un hueco real si alguien lo despliega abierto.
- **La métrica de éxito no mide el riesgo #1.** "Cancelan la ronda" es el resultado final, pero no avisa de que el estado se está quedando viejo hasta que ya ha fallado. Falta una señal temprana de H2, por ejemplo qué parte de las tareas "En curso" se han tocado en los últimos días.

---

## Parte B: las tres líneas

1. **Los dos números:** la IA propuso 8 cosas dentro del alcance → quedaron 5.
2. **Tres cosas que dejé fuera, y por qué** (qué hipótesis no ayuda a validar):
   - **Fecha de vencimiento:** la fecha no es necesaria porque es para ver qué se ha pasado de plazo, y el objetivo del tablero es entender en qué se está trabajando, no en qué se va a trabajar ni analizar vencimientos.
   - **Ver los cambios sin recargar:** para el MVP no es necesario. El objetivo es entender en qué está cada uno; que sea automático es un deseo y no aporta al objetivo principal.
   - **Filtro por estado:** en un principio no se justifica por la cantidad de personas. Además, sin filtro la lista da una foto de cómo termina y arranca el día.
3. **La exclusión de la que menos seguro estoy, y qué tendría que pasar para que entrara:** la fecha de vencimiento. De alguna manera sirve para entender si la tarea está retrasada y podría hacerse alguna acción correctiva: sumar recursos, dividir la tarea, etc. Si dentro de la daily puede ser un punto importante, no la excluiría. Si es solo entender "en qué se está", sobra. Si a partir del vencimiento de la fecha se van a tomar decisiones, debería estar presente. No está claro si esa fecha es arbitraria, si salió de la planning o si se calcula según la complejidad de la tarea. Lo que choca: la ficha pide la fecha, pero su uso natural (sumar recursos, dividir tareas) es de gestión, y el producto renuncia a propósito a ser una herramienta de gestión: es para uso interno del equipo, entre pares.
