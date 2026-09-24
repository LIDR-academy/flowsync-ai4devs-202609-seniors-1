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

---


## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Inspecciona el repo (backend + frontend) y revisa las capabilities de lo que hay ya construido y cómo es el modelo de datos actual. De lo que obtengas, genera un resumen de unas 5 líneas como primer bloque del archivo docs/prd/alcance-mvp-inv.md..
```

**Qué salió:** Me devuelve lo solicitado sin salirse del guión: "FlowSync tiene hoy únicamente el esqueleto de autenticación: en el backend existen `User` y `AuthAccessToken` (tokens opacos vía `DbAccessTokensProvider`) como único modelo de datos, sin ninguna entidad de dominio (no hay equipos, proyectos, tareas ni relaciones entre usuarios). Las rutas expuestas bajo `/api/v1` cubren solo el ciclo de auth: `POST /auth/signup`, `POST /auth/login`, `GET /account/profile` y `POST /account/logout`, todas servidas por transformers (`UserTransformer`) y validadas con VineJS. El frontend replica ese alcance: páginas de login, registro y perfil, con `auth-provider` gestionando el token en `localStorage` y rehidratación contra `/account/profile`, pero sin ninguna pantalla ni componente de gestión de tareas. No existen tests (`tests/unit` y `tests/functional` aún no están creados). En conjunto, el MVP de "gestión de tareas en equipo" parte de cero en cuanto a dominio: todo el trabajo de tareas, equipos y colaboración está por diseñar e implementar."

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.

Antes de proponer nada, hazme las 5 preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance de este MVP. Una sola ronda, agrúpalas todas juntas. No bajes a modelo de datos ni a endpoints.
```

**Qué salió:** No se sale de lo solicitado y devuelve exactamente 5 puntos donde no habla de modelo de datos o endpoints. Respuesta:
Antes de tocar nada del código, aquí van las 5 preguntas:

Usuario objetivo: ¿para quién es esto en concreto? Tamaño típico de equipo (¿3-5 personas, 10-15?), ¿todos son perfiles similares (ICs) o también hay un manager/PM que solo mira sin actualizar su propio estado?

Qué significa "tiempo real": ¿hace falta que se entere al instante (push, websockets, notificación) de que alguien cambió de tarea, o es suficiente con que al entrar a la app vea el estado actual de todos sin tener que preguntar por Slack?

Unidad de "en qué está trabajando": ¿es una tarea/ítem concreto con su propio ciclo de vida (como en Jira, aunque más ligero), o algo más parecido a un "estado" tipo texto libre + un flag (bloqueado/en progreso/done) que la persona actualiza sin gestionar un backlog?

A qué sustituye y qué NO debe ser: ¿reemplaza la daily standup, el canal de status en Slack, o ambos? Y lo contrario — ¿qué cosas de una herramienta de tareas tipo Jira quieres que quede explícitamente fuera para que esto no derive ahí (sprints, estimaciones, backlog priorizado, etc.)?

Cómo entra la información: ¿el propio usuario teclea/actualiza su estado manualmente (y con qué frecuencia esperas que lo haga realista — varias veces al día, una vez al arrancar la jornada), o hay alguna integración (calendario, commits, Slack) que infiera parte del estado automáticamente?

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Te paso la ficha de hechos:
- Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
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
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias.
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** Me escribe directamente en el archivo la ficha estructurada en Problemas, Usuarios, Qué decisión habilita, Alcance funcional del MVP, Fuera del MVP, Riesgo Principal, Criterio de éxito y Enfoque de construcción. No entre en detalles de dato, ni modelo.

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
No había pedido aún qeu lo escribieses directamente en el archivo, pero con esa información ya obtenida, Propón el alcance en Problema · Usuarios · Propuesta de valor · Alcance · NO-alcance, agresiva recortando, justificando cada exclusión. Sin tablas, sin endpoints, sin arquitectura.
```

**Qué salió:** Modifica la memoria para no guardar directamente sin confirmación previa. Devuelve el esquema planteado. En el Alcance ha planteado 6 puntos, y en el NO-Alcance 9 puntos.

## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Pásalo al archivo y lo retoco desde allí.
```

**Qué salió:** Mantiene el resumen de estado actual previo y sustituye por lo nuevo lo que rellenó previamente sin pedírselo._
