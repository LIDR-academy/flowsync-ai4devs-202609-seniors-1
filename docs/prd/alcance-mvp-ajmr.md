# Alcance del MVP — FlowSync

> Ejercicio del Módulo 2 · Adam Márquez (AJMR) · 23 sep 2026

---

## 1 · El terreno que ya existe

**Lo único construido hoy es la autenticación, de punta a punta.** Una persona puede crear su
cuenta, entrar, ver sus datos y salir. Hay sesión, y hay pantallas que no se ven sin haber entrado.

**El modelo de datos solo conoce personas y sesiones. No existe ninguna entidad de dominio: ni
tarea, ni estado, ni equipo, ni asignación.**

FlowSync es hoy **una cáscara con puerta**: sabe quién eres y no te deja pasar sin credenciales,
pero **no hay nada dentro**. Todo el producto está por definir.

Dos consecuencias para el alcance:

- **La identidad ya está resuelta.** No hay que especificar registro, login ni gestión de usuarios:
  existen. Cualquier alcance que los incluya está repitiendo trabajo hecho.
- **Las personas ya existen como entidad**, así que «responsable de una tarea» tiene a qué apuntar
  desde el primer día.

> 📌 **Anotado, porque es el error que la lección avisa y lo cometí.** La primera versión de este
> tramo listaba las rutas de la API y las columnas de la tabla de usuarios. Es información correcta y
> **no pinta nada en un documento de producto**: se deriva del código y envejece a la primera. Lo
> detecté al pasar la propia checklist de autoevaluación —*"ni una tabla ni un endpoint"*— y lo subí
> de nivel.
>
> **La deriva no empieza en el alcance. Empieza describiendo el terreno**, donde parece rigor.

---

## 2 · El interrogatorio

Una sola ronda, cinco preguntas, sin bajar a modelo de datos ni a endpoints:

1. **Un episodio concreto** en que no saber en qué trabajaba otro rompió algo — qué costó.
2. *"Más en tiempo real"*: ¿**ver sin refrescar**, **recibir avisos**, o **saber quién está
   conectado**? ¿Cuál resuelve el dolor y cuáles NO quieres?
3. **¿Quién teclea el estado, cuándo, y qué gana al hacerlo?** Si la respuesta es *"porque el equipo
   lo necesita"*, el MVP se muere en dos semanas.
4. **¿Sustituye al gestor de tareas o convive con él?** Si convive, ¿quién actualiza los dos?
5. **¿Cómo sabrás en un mes si funcionó?** Algo observable: qué reunión deja de existir.

Respondidas con la ficha de hechos del producto. **Sin supuestos declarados por la IA:** la ficha
cubrió las cinco.

---

## 3 · El alcance

### Problema

Nadie ve en qué trabaja el equipo sin **interrumpir a alguien**. La consulta se resuelve hoy de dos
formas, y las dos cuestan: la ronda de *"¿en qué estás?"* de la daily, que se lleva la mitad de los
15 minutos, y el goteo de preguntas por chat.

El coste no es la molestia: es **el trabajo duplicado**. Dos personas tocaron el mismo módulo la
misma semana porque una empezó sin que la otra lo supiera. **Dos días perdidos.**

### Usuarios

Equipos remotos de **3–10 personas**, con roles planos: todos ven y editan lo mismo.

**Quien cobra el valor son los pares, no un lead.** No hay reporte hacia arriba; a un manager le
daría igual. Duele a quien descubre tarde que iba a lo mismo que otro, y a quien interrumpe para
preguntar.

*Caso de estudio: equipo de 6 personas de producto SaaS en 3 husos horarios, hoy con un gestor de
tareas pesado y una daily de 15 minutos.*

### Propuesta de valor

**Una lista compartida donde el estado del trabajo se ve de un vistazo y se actualiza en dos clics.**

Se sostiene porque **quien escribe el estado cobra en el momento**: esa misma lista es su cola de
trabajo —la mira para decidir qué coge— y de paso deja de recibir interrupciones preguntándole cómo
va. Si el beneficio fuera solo para los demás, nadie lo escribiría.

**Sustituye al gestor de tareas, no convive con él.** Convivir exigiría doble actualización, que es
como muere esta categoría.

### Alcance — 4 elementos

| # | Elemento | Por qué entra |
|:-:|---|---|
| **1** | **Crear una tarea** con título y responsable, en un espacio único compartido | Sin esto no hay producto |
| **2** | **Cambiar el estado** de una tarea en dos clics, sin campos obligatorios | Es *"menos rollo que Jira"* hecho carne. Si cuesta más, nadie actualiza y el resto se cae |
| **3** | **Ver la lista del equipo**: quién está en qué, ahora | Es la respuesta que hoy se consigue interrumpiendo |
| **4** | **Que la lista refleje los cambios sin refrescar** | Es el *"tiempo real"* del encargo, acotado a frescura del estado |

> **La IA propuso 6. Quedan 4.** Los dos que salieron están abajo, en el NO-alcance, con su motivo.

### NO-alcance

**Excluido por decisión de producto, con el argumento al lado:**

| Excluido | Por qué |
|---|---|
| **Fecha de vencimiento** en la tarea ⭐ | *Lo pedía la ficha, y aun así sale.* **No ayuda a validar la hipótesis del MVP**, que es si el equipo deja de hacer la ronda de *"¿en qué estás?"*. Saber que algo se pasó de plazo contesta una pregunta distinta —*¿vamos tarde?*— que es la del gestor de tareas al que este producto **renuncia explícitamente** |
| **Filtrar la lista por estado** ⭐ | *También lo pedía la ficha.* Con **3–10 personas** la lista cabe en una pantalla: el filtro resuelve un problema de escala **que este MVP no tiene**. Si al validar la lista no cabe, entonces el filtro tiene datos que lo justifiquen; antes es una función que se añade *"porque toda lista lleva filtro"* |
| **Notificaciones push** | La señal es **resumen que espera, no aviso que interrumpe**. El caso es *"llego por la mañana y veo qué se ha movido"*. Un push convierte la herramienta en otra fuente de interrupciones — **exactamente el problema que viene a resolver** |
| **Indicadores de presencia** (quién está conectado, actividad) | El estado es **de la tarea, no de la persona**. Eso es vigilancia, y se rechaza a propósito. Además no cambia ninguna decisión: saber que alguien está conectado no dice en qué trabaja |
| **Derivar el estado de Git, CI o calendario** | Es **otro producto**: integraciones y OAuth de terceros. Y no valida la hipótesis central, que es si la gente **mantiene el estado a mano cuando cuesta dos clics** |
| **Entidad "equipo"**, varios espacios, gente en más de uno | Un espacio único basta para 3–10 personas. Multi-equipo es **modelo de permisos**, y eso arrastra roles, invitaciones y visibilidad: tres semanas que no contestan si la ronda de la daily desaparece |
| **Sprints, estimaciones, épicas, backlog priorizado, informes** | **Un equipo que necesite eso no es nuestro usuario.** Meterlo sería volverse el gestor pesado del que huimos |
| **Roles y permisos** | Roles planos por diseño. Con 3–10 personas que ya se conocen, el permiso es la confianza |
| **Comentarios en tareas** | Abre la puerta a que FlowSync sea donde se discute. **La discusión ya tiene sitio** (el chat del equipo), y traerla aquí es el primer paso para volver a ser Jira |
| **Analítica y reporting** | El valor es para los pares, no hacia arriba. Un informe solo tiene sentido si hay alguien a quien reportar, **y ese alguien no es nuestro usuario** |
| **Integración con Slack** | Misma razón que el push: interrumpe. Y **antes de integrar hay que saber si la lista sola funciona** |

### Supuesto declarado

Multi-equipo y pertenencia múltiple **quedan anotados como supuesto**, no construidos: se asume que
el primer usuario es un equipo único. Si al validar aparecen equipos solapados, **es un cambio de
modelo, no una feature**.

### Riesgo #1

**Que la información se quede vieja.** Si pasa, el producto pierde el sentido — y se asume. La
mitigación es **que actualizar cueste dos clics**, no obligar a nadie.

### Criterio de éxito

A **una semana de uso real**: que el equipo **cancele la ronda de *"¿en qué estás?"*** de la daily
**y nadie pida que vuelva**. Si la siguen haciendo igual, no funcionó.

*(La daily no desaparece entera: la parte de bloqueos sigue, y este MVP no la resuelve.)*

---

# Parte B — las tres líneas

## 1 · Los dos números

**La IA propuso 6 elementos dentro del alcance. Quedaron 4.**

## 2 · Tres cosas que dejé fuera, y por qué

**Aviso de honestidad primero:** la mayoría del NO-alcance de arriba **venía ya decidido en la ficha
de hechos** (push, presencia, Slack, sprints, permisos, comentarios, reporting). Eso no lo recorté
yo: lo acepté. **Las dos primeras de abajo sí son recortes míos, y van contra lo que la ficha
pedía.**

**1. Fecha de vencimiento en la tarea.** *La ficha la pedía explícitamente.* Sale porque **no ayuda
a validar la hipótesis del MVP**: si el equipo cancela la ronda de *"¿en qué estás?"*. Una fecha de
vencimiento contesta una pregunta distinta —*¿vamos tarde?*— y esa es la del gestor de tareas al que
este producto renuncia por escrito. Si entra, el producto empieza a parecerse a lo que dice sustituir.

**2. Filtrar la lista por estado.** *También la pedía la ficha.* Sale porque **resuelve un problema
de escala que este MVP no tiene**: con 3–10 personas la lista cabe en una pantalla. Para validar la
hipótesis hace falta que la lista se lea de un vistazo — y si se lee de un vistazo, filtrar sobra.
Si al validar resulta que no cabe, el filtro tendrá datos que lo justifiquen; ahora sería añadirlo
*"porque toda lista lleva filtro"*.

**3. La entidad «equipo» y los espacios múltiples.** Queda como **supuesto declarado, no
construido**. Sale porque no es una funcionalidad: **es un modelo de permisos**, y arrastra roles,
invitaciones y visibilidad. Son semanas de trabajo que **no contestan si la ronda de la daily
desaparece**, que es lo único que este MVP tiene que averiguar.

## 3 · La decisión de la que menos seguro estoy

**Mantener el tiempo real** — y es una **inclusión**, no una exclusión, lo cual ya dice algo.

Lo mantuve **porque es el diferenciador**: es el *"más en tiempo real"* del encargo original, lo que
separa a FlowSync de una lista compartida cualquiera.

**Y ese es exactamente el problema.** La contradicción es entre **lo que enamora y lo que valida**:

- **Lo que enamora:** es la parte que hace que el producto suene a producto.
- **Lo que valida:** la decisión que la ficha dice que debe cambiar es *"no empezar algo que otra
  persona ya está tocando"*. **Esa decisión se toma al abrir la pantalla, no mirándola en vivo.**
  Nadie elige qué coger viendo una lista actualizarse; la abre, mira y elige.

Si eso es cierto, **bastaría con que la lista esté fresca al cargar**, y el tiempo real es lo más
caro de construir del alcance sin ser lo que contesta la pregunta.

**Qué tendría que pasar para que saliera:** que al validar con el equipo de 6 personas, nadie note
la diferencia entre una lista que se actualiza sola y una que se actualiza al recargar. Si el
criterio de éxito —cancelar la ronda de la daily— se cumple igual con las dos, **el tiempo real se
cae y hay que reconocerlo**.

Lo dejo dentro sabiendo que **lo defiendo con un argumento de producto y lo dudo con un argumento de
validación**, y que el segundo es el que manda en un MVP.

---

## 📌 Extra: dónde falló la IA, y no fue proponiendo de más

No me discutió ninguna decisión ni me señaló ninguna incoherencia. **Falló por el lado contrario:
fue demasiado obediente con la ficha.**

Los dos elementos que recorté —fecha de vencimiento y filtro— **estaban en el alcance propuesto
únicamente porque la ficha los pedía**, con la justificación *"pedido explícitamente"*. Eso no es una
justificación de producto: es una cita.

**Una ficha de hechos no es una lista de requisitos.** Es material en bruto, y parte de recortar es
sacar cosas que el propio cliente pidió. La IA trató lo pedido como decidido — **el mismo error que
cometería un equipo que confunde escuchar al usuario con obedecerle**.
