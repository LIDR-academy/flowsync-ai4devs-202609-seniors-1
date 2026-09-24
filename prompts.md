# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.


## Prompt 1

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
Antes de realizae cualquier cambio, analiza la estrucctura actual del proyecto y determina qué
funcionalidades, componentes, rutas,modelos, servicios y configuraciones ya existen y puedan reutilizarse. Dado el
contexto anterior, genera un resumen de lo encontrado, indicando brevemente para qué sirve cada elemento relevante
y como se relaciona con el proyecto actual, el objetivo es garantizar no duplicar funcionalidades, conocer el
estado actual del proyecto y construir el MVP unicamente con lo faltante. De momento no realices ninguna
modificación,eliminacion o sugerencias de nuevas implementaciones.
```

**Qué salió:** funcionó a la primera. Inventario correcto y el hallazgo útil: de tareas no hay
absolutamente nada construido, solo el vertical de autenticación. Avisó por su cuenta de que el
ejercicio del módulo es de producto, no de implementación.

## Prompt 2

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
El contexto que requiero para este proyecto es tener una herramienta que permita tener visibilidad de
todas las actividades en las que se encuentra el equipo remoto, se requiere poder tener la informacion en tiempo
real, lo que no se requiere es que sean reuniones de sincronización y que no sea tan complejo como en jira, el
objetivo es garantizar el trabajo en tiempo real de cada colaborador del equipo de manera agil. Me podrías
realizar 5 preguntas que nos ayuden para llegar al MVP, sin llegar a niveles de desarrollo, y que se pueda acotar.
```

**Qué salió:** las cinco preguntas en una sola ronda y sin bajar al modelo de datos. Se negó a
responderlas por su cuenta y pidió la ficha de hechos, que era lo correcto.

## Prompt 3

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
Las respuestas son las siguientes: - Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias., considera que lo siguiente queda fuera del alcance: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** el alcance en cinco bloques con nueve cosas dentro. No cayó en tablas ni endpoints.
Marcó por su cuenta los tres candidatos más flojos para que el recorte siguiente fuera mío.

## Prompt 4

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
Te comparto el recorte, para que que me ayudes a escribirlo dentro de los archivos que me mencionas: 1. Problema

En un equipo remoto pequeño, saber en qué está trabajando otra persona cuesta una interrupción. Hoy eso se paga de dos formas: una ronda diaria de "¿en qué estás?" que se come la mitad de los quince minutos de la daily, y un goteo constante de preguntas por chat el resto del día. El coste no es solo el tiempo: la información llega tarde. Dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, y se perdieron dos días.

El problema no es que falte un gestor de tareas. Es que el estado del trabajo del equipo solo existe dentro de la cabeza de cada uno, y la única forma de leerlo es preguntando.

2. Usuarios

Equipos remotos de 3 a 10 personas, repartidos en varios husos horarios, que hoy arrastran un gestor de tareas más pesado de lo que necesitan y una daily por videollamada.

El valor lo cobran los pares, no un lead. No hay reporte hacia arriba: a un manager esta herramienta le daría igual. Duele a los dos desarrolladores que descubren tarde que iban a lo mismo, y a quien tiene que interrumpir a otro para saber cómo va.


3. Propuesta de valor

Una lista compartida del trabajo del equipo que se mantiene fresca sola, porque actualizarla le conviene a quien la actualiza.

Quien escribe el estado cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y a cambio deja de recibir preguntas sobre cómo va. Si el beneficio fuera solo para los demás, nadie la escribiría.

Quien la lee llega por la mañana, o vuelve de una reunión, y ve qué se ha movido sin preguntar a nadie. Es un resumen que espera, no un aviso que interrumpe.

Las dos decisiones que cambia, y son las únicas que justifican el esfuerzo: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si lo único que produjera fuera la sensación de estar informado, el tiempo real no valdría lo que cuesta.

4. Alcance

Nueve cosas dentro:

1. Un espacio único compartido: todo el que entra ve y edita la misma lista.
2. Crear una tarea con título, responsable, estado y fecha campo obligatorio más.
3. Tres estados fijos, iguales para todos y sin pantalla de configuración.
4. Cambiar el estado desde la propia lista, sin abrir la tar.
5. Asignar o reasignar responsable desde la propia lista, incluido cogerse una tarea libre.
6. Filtrar la lista por estado, para centrarse en lo pendien
8. La lista se actualiza sola cuando alguien cambia algo: sir.

Omitir la creación de las cuentas

Los tres estados que se debe considerar son pendiente, en curso y finalizada, los usuarios solo pueden asignarse a si mismos, al menos que tengan un rol de administrador.

Solo pueden modificar la lista, aquellos que cuenten con una sesión creada


5. NO-alcance

Cada exclusión, con lo que deja de validar:
- Entidad "equipo" y espacios múltiples — fuera, porque no ayuda a validar que un equipo deja de preguntarse en qué anda cada uno. Un solo equipo basta para saberlo, y modelar varios contamina todo lo dem
- Notificaciones push — fuera, y no solo por coste: la señal que pide el caso es un resumen que espera, no un aviso que interrumpe. Empujar avisos
  construiría justo la interrupción que el producto quiere e
- Integración con Slack — fuera, porque llevaría el estado de vuelta al canal donde hoy se pierde entre mensajes. Si la lista solo funciona cuando
  Slack la reenvía, no ha funcionado.
- Comentarios en tareas — fuera, porque la conversación no es la decisión que queremos cambiar. Nadie evita un solape leyendo un hilo.
- Analítica y reporting — fuera, porque no hay nadie arriba ncionalidad de un producto distinto, con un compradordistinto.
- Sprints, estimaciones, épicas y backlog priorizado — fueran equipo que los necesita no es nuestro usuario, y meterlosnos convierte en lo que el usuario está huyendo.
- Derivar el estado de Git, CI o calendario — fuera, porque iones, OAuth de terceros y adivinación. Además haría trampacon el riesgo principal, que es precisamente si la gente teclea o no.
- Presencia y actividad de personas — fuera por decisión delestado es de la tarea, no de la persona. Saber quién estáconectado es vigilancia, y la rechazamos.
- Subtareas, dependencias, etiquetas, prioridades, búsqueda,ambios — fuera en bloque, porque cada uno añade un campo quedecidir al crear una tarea, y el MVP se sostiene sobre que crear una tarea no obligue a decidir nada.
- Convivir con el gestor de tareas actual — fuera. FlowSync s de otro sitio. Convivir exigiría doble actualización, que es exactamente como muere esta categoría de producto.
```

**Qué salió:** escribió los dos ficheros. El pegado llegó con trozos cortados (varias líneas del
NO-alcance se quedaron a medias) y los reconstruyó a partir de su propia respuesta anterior en vez
de preguntar. Avisó de que el rol de administrador que metí en el recorte contradice la ficha de
hechos, que dice roles planos y sin jerarquía de permisos.
