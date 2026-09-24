# FlowSync — Alcance del MVP

**Autor:** EM · **Fecha:** 2026-09-23

> Documento de producto: no lleva modelo de datos, endpoints ni arquitectura.
> El punto de partida técnico está en [`punto-partida-mvp-EM.md`](./punto-partida-mvp-EM.md).


## 1. Problema

En un equipo remoto pequeño, **saber en qué está trabajando otra persona cuesta interrumpirla**.
La información existe, pero solo dentro de la cabeza de quien hace el trabajo, y el único canal
para sacarla es preguntar — que es exactamente el coste que se quiere evitar.

Eso se paga dos veces:

- **En la daily.** La ronda de "¿en qué estás?" se come la mitad de los 15 minutos, todos los
  días, en tres husos horarios.
- **En trabajo duplicado.** Dos personas del equipo tocaron el mismo módulo la misma semana
  porque una empezó sin que la otra lo supiera. Dos días perdidos.

**La daily no desaparece, y conviene decirlo sin adornos.** Desaparece la ronda de estado. La
parte de bloqueos sigue haciendo falta y este MVP no la resuelve.

**Cómo sabremos que está resuelto:** a una semana de uso real, el equipo cancela la ronda de
"¿en qué estás?" y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.



## 2. Usuarios

**Para quién es.** Equipos remotos de 3 a 10 personas, repartidos en varios husos horarios, con
roles planos: en el MVP todos ven y editan lo mismo.

**Quién cobra el valor: los pares, no un lead.** No hay reporte hacia arriba y a un manager esto
le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y a quien interrumpe
a otro para preguntarle cómo va. Esta decisión, sola, elimina del alcance toda la rama de informes,
métricas y permisos.

**Quien escribe y quien lee son la misma persona.** Es la condición que sostiene el producto: si
actualizar el estado solo beneficiara a los demás, nadie lo haría. Quien lo escribe cobra en el
momento — esa misma lista es su cola de trabajo y deja de recibir interrupciones.

**Primer usuario (caso de estudio, no cliente real).** Equipo de 6 personas de producto SaaS, en
3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada.
Nada de lo que hay aquí está validado con usuarios reales todavía.

**Quién NO es usuario.** Cualquier equipo que necesite sprints, estimaciones, épicas, backlog
priorizado o informes. No es que llegue más tarde: no es nuestro usuario.



## 3. Propuesta de valor

**Ver en qué está cada uno sin preguntar a nadie, y mantenerlo al día en pocos clics.**

**Del lado de quien lee.** Una lista compartida que se mira cuando uno quiere: llego por la mañana,
o vuelvo de una reunión, y veo el estado del equipo de un vistazo. Es un resumen que espera, no un
aviso que interrumpe. "Tiempo real" aquí significa una cosa concreta y pequeña: que los cambios
aparezcan **sin refrescar y sin preguntar**. No es chat, ni videollamada, ni edición simultánea.

**Del lado de quien escribe.** Dos clics sobre una lista que ya tiene abierta. Sin campos
obligatorios, sin decidir sprint ni estimación, sin flujos que configurar. Eso es lo único que
significa "menos rollo que Jira": crear una tarea y cambiarle el estado en segundos.

**Es el estado de la tarea, no el de la persona.** Nada de "quién está conectado ahora" ni
indicadores de actividad. Eso es vigilancia, y se rechaza a propósito: cambiaría quién cobra el
valor y convertiría la herramienta en algo que se mira hacia abajo, no entre pares.

**Es donde se hace el trabajo, no donde se cuenta.** FlowSync sustituye al gestor de tareas; no lee
las tareas de otro sitio. Convivir con el gestor actual exigiría doble actualización, que es
exactamente como muere esta categoría de producto.

**La decisión que cambia** es concreta: no empezar algo que otra persona ya está tocando, y elegir
lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo
real no valdría lo que cuesta.

**El riesgo número uno** es que la lista se quede vieja: si pasa, el producto pierde el sentido
entero. No es un detalle de implementación, es lo que hay que validar. La mitigación no es obligar
a nadie ni recordárselo: es que actualizar cueste dos clics y que quien actualiza salga ganando.



## 4. Alcance


1. **Un espacio único compartido**, encima de las cuentas que ya existen. Quien tiene cuenta, entra
   y ve lo mismo que los demás.
2. **Crear una tarea en segundos**: título, responsable, estado y fecha de vencimiento. Lo único
   inevitable es el título; el resto se puede dejar en blanco y rellenar después.
3. **Corregir y reasignar**: cambiar título, estado, responsable o fecha, y borrar una tarea. Sin esto la
   lista se llena de basura en una semana y el riesgo número uno se cumple solo.
4. **La lista compartida como pantalla principal**: quién lleva qué, en qué estado está y qué se ha
   pasado de plazo. La fecha de vencimiento existe solo para eso — ver lo vencido de un vistazo —
   y no para planificar.
5. **Filtrar por estado y por responsable, combinables a la vez.** Es el filtro que responde
   literalmente a la pregunta que se quiere eliminar: "¿en qué está Ana?" deja de ser una
   interrupción y pasa a ser un clic. Y combinado con el estado, contesta la otra mitad — qué hay
   pendiente y quién lo tiene — sin leerse la lista entera.

### Supuestos

- **Tres estados: pendiente, en curso y hecha.** "En curso" es el que responde a la pregunta del
  problema; los otros dos son el mínimo para que "en curso" signifique algo.
- **Sin entidad "equipo".** Un espacio único y compartido. Varios equipos separados, o gente en más
  de uno, se anota aquí y no se construye.
- **Sin invitaciones.** Cualquiera que se registre entra al espacio compartido.
- **El equipo de 6 personas es un caso de estudio**, no un cliente con el que se haya hablado.
- **La parte de bloqueos de la daily sigue existiendo.** El MVP no la toca.


## 5. NO-alcance

### Duda técnica
  
- **Sync en tiempo real, los cambios aparecen solos sin refrescar**, Fuera por duda técnica de si el
  stack tecnológico lo permite hacer con coste y complejidad justificable.


### Se rechaza por principio, no por tiempo

- **Presencia, "quién está conectado" e indicadores de actividad.** Fuera, porque no ayuda a validar
  que el estado de la *tarea* basta para no interrumpir a nadie — y porque convierte la herramienta
  en vigilancia, que es el producto contrario al que quieren los pares.
- **Notificaciones push y avisos.** Fuera, porque no ayuda a validar que un resumen que espera
  sustituye a la ronda de la daily. Un aviso que interrumpe es el problema disfrazado de solución.

### Es otro producto

- **Deducir el estado de Git, PRs, CI o calendario.** Fuera, porque no ayuda a validar que la gente
  mantiene su propio estado al día cuando cuesta dos clics — que es justo la hipótesis frágil.
  Además arrastra integraciones y OAuth de terceros: otro producto, con otro riesgo.
- **Integración con Slack.** Fuera, porque no ayuda a validar que la lista se consulta sola; empuja
  el producto de vuelta al canal del que se quiere salir.
- **Chat, videollamada y edición simultánea.** Fuera: "tiempo real" aquí es frescura del estado, no
  colaboración sincrónica. No valida nada del problema.

### Es el Jira del que se huye

- **Sprints, estimaciones, épicas y backlog priorizado.** Fuera, porque no ayudan a validar que se
  ve quién está en qué: son herramientas de planificación, y un equipo que las necesita no es
  nuestro usuario.
- **Informes, métricas y analítica.** Fuera, porque el valor lo cobran los pares y no hay reporte
  hacia arriba. No hay nadie a quien sirva ese informe.
- **Roles y permisos.** Fuera, porque con 3-10 personas y roles planos no hay nada que proteger; su
  ausencia no impide cancelar la ronda de la daily.
- **Subtareas, dependencias, etiquetas, proyectos y adjuntos.** Fuera, porque cada campo extra sube
  el coste de crear una tarea, que es precisamente lo que tiene que costar segundos.

### Cabe en el producto, pero no en este MVP

- **Entidad "equipo", varios espacios y pertenencia múltiple.** Fuera, porque no ayuda a validar la
  hipótesis en un equipo piloto de seis personas, que es donde se mide.
- **Comentarios en las tareas.** Fuera, porque no ayudan a validar que el estado, solo, evita la 
  interrupción. Si hace falta hablar, el chat del equipo sigue ahí.
- **Feed de "qué ha cambiado desde ayer".** Fuera, porque las dos decisiones que el producto tiene
  que cambiar — no empezar algo que otro ya toca, y elegir lo siguiente — se responden con el
  estado *actual*, no con el histórico de cómo se llegó a él. Es la exclusión más discutible del
  documento.
- **Búsqueda y vista de tablero.** Fuera, porque con seis personas la lista cabe en una pantalla y
  los filtros por estado y responsable ya la recortan. Un tablero es otra forma de ver lo mismo, no 
  algo que validar.
- **Migrar las tareas del gestor actual.** Fuera, porque el piloto puede arrancar de cero una semana. 
  La migración es un coste de adopción, no una prueba de que el producto funcione.
- **App móvil nativa.** Fuera, porque el momento de uso descrito — llegar por la mañana, volver de una 
  reunión — pasa delante del ordenador.
- **La parte de bloqueos de la daily.** Fuera, y con ella la mitad de la reunión. El MVP recorta la daily,
  no la elimina, y prometer lo segundo sería mentir sobre lo que se está validando.
- **Cambiar el estado desde la propia lista**, sin abrir nada ni rellenar nada. Fuera porque aunque aporte
  valor, no es imprescindible. Se puede abrir la tarea para cambiar el estado.

---

## Parte B — las tres líneas

### 1. Los dos números

La IA propuso **7** cosas dentro del alcance. Después de mi revisión quedan **5**.

### 2. Tres cosas que dejé fuera, y por qué

- **Sync en tiempo real.** Fuera, porque no ayuda a validar que con el control de estado se reduzcan las interrupciones o acorten las Daily. Útil para equipos mayores.

- **Cambiar el estado desde la propia lista**, Es una mejora de usabilidad, pero no ayuda validar la reduccion de interrupciones. Es probable que a medio plazo se quiera reportar infrmación adicinal en cada tarea, y esta funcionalidad perdería sentido.

- **Comentarios en las tareas.** Se busca algo menos pesado que JIRA.

### 3. La exclusión de la que menos seguro estoy

**Sync en tiempo real, los cambios aparecen solos sin refrescar** 

Dejo fuera por no conocer el stack tecnológico a fondo. 
Otros stacks como .Net mediante el uso de SignalR permitirian cumplir este requerimiento sin la complejidad / coste asociado.
