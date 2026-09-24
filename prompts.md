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

**Modelo:** Sonnet
**Herramienta:** Claude Code

```markdown
Antes de definir ningún alcance nuevo para FlowSync, inspecciona el repositorio existente.

Quiero entender únicamente el terreno que ya existe:

 - Qué capacidades de producto están ya construidas.
 - Qué conceptos principales existen actualmente en el modelo de datos.
 - Qué partes relevantes del flujo de tareas ya están implementadas.

No propongas todavía nuevas funcionalidades.
No diseñes endpoints, arquitectura ni cambios de base de datos.
No implementes código.

Crea docs/prd/alcance-mvp-francisco-reyes.md y añade una sección ## El terreno que ya existe con un resumen de 3 a 5 líneas basado exclusivamente en lo que encuentres en el repositorio.
```

**Qué salió:**: aunque lo veo un poco más extenso, lo intento refinar un poco con el prompt 2 pero me quedo con el resultado de este prompt.

```markdown
# Alcance MVP — FlowSync (Francisco Reyes)

## El terreno que ya existe

- **Capacidades construidas:** solo identidad de cuenta. La API expone registro (`POST /api/v1/auth/signup`), login (`POST /api/v1/auth/login`), perfil (`GET /api/v1/account/profile`) y logout (`POST /api/v1/account/logout`), con access tokens opacos; el frontend tiene tres pantallas: `/login`, `/register` y `/profile` (esta última protegida).
- **Modelo de datos:** dos tablas y un único modelo de dominio. `users` (`id`, `full_name` opcional, `email` único, `password`, marcas de tiempo) y `auth_access_tokens` (tokens ligados a un usuario por `tokenable_id`); solo existe el modelo `User`.
- **Flujo de tareas:** no hay nada implementado. No existen tablas, modelos, rutas, controladores ni pantallas de tareas, equipos o proyectos; "gestión de tareas en equipo" aparece solo como descripción en el README y en textos de las pantallas de login y registro.
- **Cobertura de tests:** ninguna todavía; solo existe `backend/tests/bootstrap.ts`, sin ficheros de test.
```


## Prompt 2

**Modelo:** Sonnet
**Herramienta:** Claude Code

```markdown
Te pedi un resumen de 3-5 lineas, necesito que lo adjustes sin perder finalidad del Alcance MVP.
```

**Qué salió:** En este caso lo veo demasiado reducido, con lo que me quedaría con el primero, eso sí, en una fase posterior revisaré el epígrafe de ## El terreno que ya existe porque sigue siendo técnico

```markdown
# Alcance MVP — FlowSync (Francisco Reyes)

## El terreno que ya existe

- **Capacidades construidas:** solo identidad de cuenta: registro, login, perfil y logout con tokens en la API, y pantallas `/login`, `/register` y `/profile` en el frontend.
- **Modelo de datos:** dos tablas, `users` (email, nombre opcional, contraseña) y `auth_access_tokens`; el único modelo de dominio es `User`.
- **Flujo de tareas:** inexistente; no hay tablas, modelos, rutas ni pantallas de tareas, equipos o proyectos, y "tareas en equipo" solo aparece como descripción en el README y en los textos de login y registro.
```

## Prompt 3

**Modelo:** Sonnet
**Herramienta:** Claude Code

```markdown
Partimos de este planteamiento de producto:

«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

Antes de proponer un MVP, hazme exactamente cinco preguntas: las cinco que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance.

Haz una sola ronda de preguntas.

No propongas todavía funcionalidades ni una solución.
No preguntes sobre modelo de datos, endpoints, arquitectura ni detalles de implementación.
No modifiques código.
```

**Qué salió:** salieron las preguntas siguientes:

```markdown
1. ¿Quién sufre el problema primero y quién lo usaría a diario? Necesito saber qué tipo de equipo tienes en mente (tamaño, roles, husos horarios) y si el dolor lo siente quien pierde tiempo en las reuniones o quien necesita saber qué hace cada uno.
2. ¿Qué situación concreta provoca hoy esas reuniones de sincronización? Es decir, qué información buscan cuando se juntan y qué pasa cuando no la tienen. Por ejemplo, si el equipo se entera tarde de que alguien está bloqueado, o si hay trabajo duplicado.
3. ¿Cómo lo resuelven hoy y por qué no les basta? Me refiero a las herramientas o costumbres actuales (chat, standups escritos, Jira, hojas de cálculo, otras). Qué es lo que falla en ellas, y no solo qué usan.
4. ¿Qué significa para ti "más en tiempo real" y "menos rollo que Jira"? Concreta qué frescura de la información sería suficiente y qué esfuerzo sería aceptable para cada persona, y cuáles son las tres cosas de Jira que te parecen más insoportables y que FlowSync no debería tener nunca.
5. ¿Cómo sabrás que el MVP ha funcionado y con quién lo probarías? Qué cambio observable te haría decir "esto sirve" en pocas semanas, y si hay un equipo real dispuesto a usarlo, junto con el tiempo disponible que tienes.

Espero tus respuestas antes de avanzar. No he tocado código.
```

## Prompt 4

**Modelo:** Sonnet
**Herramienta:** Claude Code

```markdownd
Estas son las respuestas de producto ya decididas. Úsalas como fuente de verdad para responder a tus cinco preguntas.

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


Estas funcionalidades quedan fuera del MVP:

- Notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.


Si alguna de tus cinco preguntas no queda cubierta por esta ficha, toma una decisión razonable y márcala explícitamente como supuesto.

Después añade al documento `docs/prd/alcance-mvp-francisco-reyes.md` una sección `## Interrogatorio` que resuma de forma concisa:

- Las cinco preguntas que formulaste.
- La respuesta de producto correspondiente a cada una.
- Los supuestos que hayas tenido que hacer, si los hubiera.

No propongas todavía el alcance final del MVP.
No incluyas modelo de datos, endpoints, arquitectura ni detalles de implementación.
No modifiques código.
```

**Qué salió:** salieron las respuestas y supuestos siguientes (donde yo el último supuesto lo dejaría fuera):

```markdown
## Interrogatorio

Una sola ronda de cinco preguntas sobre el planteamiento inicial («que los equipos remotos sepan en qué está trabajando cada uno sin reuniones de sincronización»). Las respuestas son decisiones de producto ya tomadas.

1. **¿Quién sufre el problema y quién lo usaría a diario?**
   Los pares, no un lead: no hay reporte hacia arriba y a un manager le daría igual. Duele a quien descubre tarde que iba a lo mismo que otro y a quien interrumpe a alguien para preguntarle cómo va. Equipos remotos pequeños (3–10 personas) con roles planos: todos ven y editan lo mismo. Caso de estudio (no un cliente real): equipo de producto SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada. Las fronteras son un único espacio compartido; varios equipos separados o personas en más de uno quedan fuera.

2. **¿Qué situación provoca hoy las reuniones de sincronización?**
   La daily y el «¿en qué estás?» constante por chat: nadie ve el estado del equipo sin interrumpir a alguien. Episodio concreto: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, con dos días perdidos. Lo que desaparece es solo la ronda de «¿en qué estás?», que hoy consume la mitad de los 15 minutos; la daily no desaparece entera y la parte de bloqueos sigue sin resolverse en este MVP.

3. **¿Cómo lo resuelven hoy y por qué no les basta?**
   Con un gestor de tareas pesado, la daily por videollamada y preguntas por chat. No basta porque el estado no se ve sin preguntar. FlowSync sustituye al gestor de tareas, no convive con él: crea sus propias tareas y no lee las de otro sitio, porque convivir exigiría una doble actualización, que es como muere esta categoría.

4. **¿Qué significan «más en tiempo real» y «menos rollo que Jira»?**
   - *Tiempo real:* ver los cambios de estado de las tareas sin refrescar ni preguntar. No es chat, videollamada ni edición simultánea. Es frescura, no presencia: el estado es de la tarea, no de la persona, sin indicadores de conexión ni de actividad (se rechaza como vigilancia). Es un resumen que espera, no un aviso que interrumpe (sin notificaciones push): llegar por la mañana o volver de una reunión y ver qué se ha movido. Debe cambiar decisiones concretas: no empezar algo que otro ya está tocando y elegir lo siguiente sabiendo qué está libre; si solo aportara «sentirse informado», no valdría lo que cuesta.
   - *Esfuerzo y frescura:* el estado lo teclea quien hace la tarea, en segundos, sin derivarlo de Git, CI ni calendario. Se sostiene porque son dos clics sobre una lista ya abierta, sin campos obligatorios ni decisiones de sprint o estimación, y porque quien lo escribe cobra al momento: esa lista es su cola de trabajo y deja de recibir interrupciones. Si la información se queda vieja, el producto pierde el sentido: es el riesgo n.º 1 a validar.
   - *Menos rollo:* crear una tarea y cambiarle el estado en segundos, sin flujos de configuración. Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes.

5. **¿Cómo sabremos que ha funcionado y con quién se prueba?**
   Para el usuario, éxito es dejar de hacer la ronda de «¿en qué estás?» porque el estado del equipo se ve de un vistazo. Criterio a una semana de uso real: el equipo cancela esa ronda y nadie pide que vuelva; si la siguen haciendo igual, no funcionó. Se prueba con el equipo del caso de estudio. Sobre cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto; mejor una capability terminada que tres a medias.

### Supuestos

Los que había que fijar porque la ficha de producto no los cubría:

- **Sin equipo real disponible:** el caso de estudio no es un cliente real, así que el criterio de la semana de uso se toma como hipótesis de validación futura y no como una medición ya planificada con un equipo concreto.
- **Sin calendario:** la ficha no da plazos; el tiempo disponible se trata como restricción de alcance (una vertical fina), no como fechas.
- **«Las tres cosas insoportables» de un gestor pesado:** se interpretan como los flujos de configuración, los campos obligatorios y la carga de sprints, estimaciones, épicas, backlog e informes, que la ficha rechaza expresamente.
- **Herramienta actual del caso de estudio:** la ficha habla de un «gestor de tareas pesado» sin nombrarlo; no se asume que sea Jira aunque el planteamiento inicial lo use como referencia.
- **Un único espacio compartido:** varios equipos separados o personas en más de uno quedan fuera del MVP y se documentan como supuesto, no se construyen.
```

## Prompt 5

**Modelo:** Sonnet
**Herramienta:** Claude Code

```markdownd
Continúa trabajando sobre `docs/prd/alcance-mvp-francisco-reyes.md`.

A partir de:

- el terreno que ya existe;
- el interrogatorio realizado;
- las respuestas de producto ya decididas;
- y los supuestos declarados;

propón ahora el alcance inicial del MVP de FlowSync.

Añade al documento, después del interrogatorio, exactamente estos cinco bloques:

## Problema
## Usuarios
## Propuesta de valor
## Alcance
## NO-alcance

Sé agresivo recortando el MVP.

En `Alcance`, enumera de forma explícita y separada cada capability de producto que propones incluir, de forma que después pueda contar cuántas has propuesto.

En `NO-alcance`, enumera también explícitamente las exclusiones y justifica cada una desde producto: explica qué hipótesis del producto no ayuda a validar o por qué no es necesaria para validar el valor central.

Respeta las decisiones y fronteras de producto ya recogidas en el documento.

No modifiques ni reescribas las secciones `El terreno que ya existe` ni `Interrogatorio`.

No incluyas arquitectura, endpoints, tablas o esquemas de base de datos, ni detalles de implementación.

No modifiques código de la aplicación.

Todavía no hagas mi recorte final del MVP. Esta debe ser tu propuesta inicial, que revisaré después.
```

**Qué salió:** salieron el resto de puntos del alcance con las capabilities: 5, y no alcance: 17. Falta nuestro recorte.

```markdown
## Problema

En los equipos remotos pequeños, saber en qué está cada persona exige una daily de sincronización y un «¿en qué estás?» constante por chat: nadie ve el estado del equipo sin interrumpir a alguien. El coste es real: dos personas tocaron el mismo módulo la misma semana sin saberlo y perdieron dos días. Hoy en el repositorio no existe nada del dominio de tareas, así que el problema se aborda desde cero, sobre la identidad de cuenta ya construida. El riesgo n.º 1 a validar es que la información se quede vieja.

## Usuarios

- **Usuario principal:** los pares de un equipo remoto de 3–10 personas con roles planos, que ven y editan lo mismo. Duelen igual quien descubre tarde que iba a lo mismo que otro y quien interrumpe para preguntar.
- **Primer usuario concreto (caso de estudio, no un cliente real):** equipo de producto SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada.
- **No son usuarios:** un lead o manager que quiera reportes hacia arriba, ni equipos que necesiten sprints, estimaciones o backlog priorizado.

## Propuesta de valor

Abrir una única lista compartida y saber de un vistazo qué está tomado y qué está libre, sin preguntar a nadie y sin refrescar. Se sostiene porque quien actualiza cobra en el momento: esa lista es su cola de trabajo y deja de recibir interrupciones. FlowSync sustituye al gestor de tareas en lugar de convivir con él.

**Hipótesis central a validar:** tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva. La daily no desaparece entera y los bloqueos siguen fuera.

## Alcance

Propuesta inicial, sujeta a revisión. Se reutiliza sin contarla la identidad de cuenta ya construida (registro, login, logout y perfil); el MVP no la amplía. Capabilities nuevas propuestas: **5**.

1. **C1 — Crear una tarea.** Con título y responsable, un estado inicial por defecto y una fecha de vencimiento opcional. Es lo mínimo para saber quién está en qué.
2. **C2 — Cambiar el estado de una tarea en dos clics**, desde la propia lista y sin campos obligatorios. Es el mecanismo que mantiene la información fresca y el riesgo n.º 1.
3. **C3 — Lista única compartida.** Todas las personas del equipo ven y editan las mismas tareas, con responsable, estado y vencimiento visibles, y resaltando lo que se ha pasado de plazo.
4. **C4 — Ver los cambios de estado sin refrescar ni preguntar.** Es lo que aquí significa «tiempo real». Se refiere a las tareas, no a las personas.
5. **C5 — Filtrar la lista por estado**, para centrarse en lo pendiente. Es la capability más recortable: si hay que reducir más, sale primero.

Supuestos nuevos de esta propuesta, que no cubría la ficha de producto:

- Solo el título y el responsable son necesarios para crear una tarea. La ficha define la tarea con título, responsable, estado y fecha; dejo el estado con valor inicial y el vencimiento opcional para respetar «sin campos obligatorios».
- Los estados son un conjunto fijo y muy corto (por ejemplo pendiente, en curso y hecha), no configurable.
- Cada tarea tiene una única persona responsable.
- Para el caso de estudio, quien se registra entra en el único espacio compartido. El control de acceso queda fuera.

## NO-alcance

Cada exclusión indica qué hipótesis del producto no ayudaría a validar o por qué no hace falta para validar el valor central.

1. **Notificaciones push.** La señal es un resumen que espera, no un aviso. Validar el valor es consultar y ver, no interrumpir; un aviso contradice la hipótesis.
2. **Integración con Slack.** El producto debe ser donde se trabaja y no convivir con nada. Integrar valida otra hipótesis (distribución) y añade dependencias de terceros.
3. **Roles y permisos.** Son pares con roles planos; una jerarquía no ayuda a validar que el estado visible sustituye la ronda.
4. **Analítica y reportes.** No hay un lector hacia arriba. La hipótesis es de pares, y medir uso o rendimiento no cambia si cancelan la ronda.
5. **Comentarios en tareas.** El estado ya responde a «¿en qué estás?»; los comentarios convierten la lista en un chat, que rechazamos como forma de tiempo real.
6. **Presencia e indicadores de actividad de personas.** Es vigilancia y se rechaza a propósito: el estado es de la tarea, no de la persona.
7. **Derivar el estado desde Git/PRs, CI o calendario.** Es otro producto, con integraciones y OAuth de terceros. La hipótesis es que el estado tecleado en dos clics se sostiene; derivarlo no valida eso.
8. **Importar tareas de otro gestor o convivir con él.** Convivir exige doble actualización, que es como muere la categoría. FlowSync crea sus tareas y sustituye al gestor.
9. **Varios equipos, pertenencia a más de uno, invitaciones y administración del equipo.** El MVP es un único espacio, y la hipótesis se valida con un solo equipo.
10. **Sprints, estimaciones, épicas, backlog priorizado e informes.** Renuncia explícita: un equipo que necesite eso no es nuestro usuario y contradice «menos rollo que Jira».
11. **Estados y flujos configurables.** Un conjunto fijo basta para saber quién está en qué; configurar es justo el rollo que se quiere evitar.
12. **Atributos extra de tarea (prioridad, etiquetas, subtareas, adjuntos, descripción larga), búsqueda, ordenación y vistas alternativas.** No hacen falta para saber quién está en qué ni qué está libre.
13. **Editar, reasignar y borrar tareas.** No ayuda a validar la hipótesis y es la exclusión con más coste de usabilidad: una tarea mal creada (título o responsable equivocado) no se puede corregir. Conviene revisarla.
14. **Resumen de «qué ha cambiado desde tu última visita».** La lista en vivo, con su filtro por estado, ya muestra el estado del equipo. El histórico de cambios no es necesario para validar la hipótesis, pero es la exclusión más cercana a la forma de señal decidida, así que también conviene revisarla.
15. **Chat, videollamada y edición simultánea.** «Tiempo real» aquí es ver cambios de estado, no colaborar en directo.
16. **Resolver bloqueos.** La daily conserva esa parte; validar que desaparece la ronda de estado no requiere abordarla.
17. **Gestión de cuenta adicional (editar perfil, recuperar contraseña, verificar email).** La identidad ya construida basta para el caso de estudio y no toca ninguna hipótesis del producto.
```

## Prompt 6

**Modelo:** Sonnet
**Herramienta:** Claude Code

```markdownd
He revisado tu propuesta inicial de MVP y voy a aplicar mi propio recorte de producto.

La propuesta inicial de la IA incluía 5 capabilities.

Mi alcance final deja dentro estas capabilities:
  - Crear tareas con título, responsable, estado y fecha de vencimiento.
  - Cambiar rápidamente el estado de una tarea.
  - Ver los cambios de estado sin refrescar.
  - Filtrar las tareas por estado.
    Y dejo fuera esta:
  - Contar la lista única compartida como una capability independiente. La lista compartida sigue formando parte del MVP como superficie común del producto, pero no valida una hipótesis adicional por sí sola: es el contexto necesario para que funcionen las capabilities de crear tareas, actualizar su estado, ver cambios sin refrescar y filtrar por estado.

Estas decisiones son mías. No añadas nuevas capabilities, no recuperes elementos que he excluido y no amplíes de nuevo el alcance.

Actualiza únicamente docs/prd/alcance-mvp-francisco-reyes.md para reflejar este recorte.

En la sección ## Alcance:
  - Deja únicamente las capabilities que he decidido mantener.
  - Exprésalas como capacidades de producto, no como soluciones técnicas.
  - Mantén la redacción concisa.
  - Respeta las decisiones ya fijadas en la ficha de producto.
  - Si detectas una tensión entre dos decisiones ya presentes en la ficha, no la resuelvas inventando comportamiento: señálala como decisión pendiente o supuesto explícito.

En la sección ## NO-alcance:
  - Incluye las capabilities que he decidido excluir.
  - Mantén también las exclusiones de producto ya fijadas por la ficha.
  - Agrupa exclusiones relacionadas cuando ayude a mantener el documento breve.
  - Para cada exclusión o grupo de exclusiones, justifica por qué no ayuda a validar la hipótesis central del producto o por qué no es necesaria para validarla.
  - No uses "no da tiempo" como justificación.
  - No conviertas el NO-alcance en una lista técnica.

No modifiques las secciones ## El terreno que ya existe ni ## Interrogatorio, salvo para corregir contradicciones evidentes con decisiones explícitas de la ficha.

No incluyas:
  - arquitectura;
  - endpoints;
  - tablas o esquemas de base de datos;
  - decisiones de implementación;
  - nombres de tecnologías como solución al problema.

No modifiques código de la aplicación.

Al terminar, indica cuántas capabilities quedaron dentro después de mi recorte, pero no cambies mi decisión.
```

**Qué salió:**: 4 capabilities y 18 exclusiones. Aún así quiero revisar un poco, porque creo que aún sigue habiendo bastante detalle técnico en el terreno que ya existe. 

```markdown
# Alcance MVP — FlowSync (Francisco Reyes)

## El terreno que ya existe

- **Capacidades construidas:** solo identidad de cuenta. La API expone registro (`POST /api/v1/auth/signup`), login (`POST /api/v1/auth/login`), perfil (`GET /api/v1/account/profile`) y logout (`POST /api/v1/account/logout`), con access tokens opacos; el frontend tiene tres pantallas: `/login`, `/register` y `/profile` (esta última protegida).
- **Modelo de datos:** dos tablas y un único modelo de dominio. `users` (`id`, `full_name` opcional, `email` único, `password`, marcas de tiempo) y `auth_access_tokens` (tokens ligados a un usuario por `tokenable_id`); solo existe el modelo `User`.
- **Flujo de tareas:** no hay nada implementado. No existen tablas, modelos, rutas, controladores ni pantallas de tareas, equipos o proyectos; "gestión de tareas en equipo" aparece solo como descripción en el README y en textos de las pantallas de login y registro.
- **Cobertura de tests:** ninguna todavía; solo existe `backend/tests/bootstrap.ts`, sin ficheros de test.

## Interrogatorio

Una sola ronda de cinco preguntas sobre el planteamiento inicial. Las respuestas son decisiones de producto ya tomadas.

1. **¿Quién sufre el problema y quién lo usaría a diario?** Los pares, no un lead: no hay reporte hacia arriba. Duele a quien descubre tarde que iba a lo mismo que otro y a quien interrumpe para preguntar. Equipos remotos de 3–10 personas con roles planos; caso de estudio (no un cliente real): equipo SaaS de 6 personas en 3 husos horarios.
2. **¿Qué situación provoca hoy las reuniones de sincronización?** La daily y el «¿en qué estás?» constante por chat: nadie ve el estado sin interrumpir. Ejemplo: dos personas tocaron el mismo módulo la misma semana sin saberlo (dos días perdidos). Solo desaparece esa ronda; la daily y su parte de bloqueos siguen.
3. **¿Cómo lo resuelven hoy y por qué no les basta?** Con un gestor de tareas pesado, una daily de 15 minutos y preguntas por chat; ninguno muestra el estado sin preguntar. FlowSync sustituye al gestor, no convive con él, porque convivir obliga a actualizar dos veces.
4. **¿Qué significan «tiempo real» y «menos rollo que Jira»?** Tiempo real es ver los cambios de estado de las tareas sin refrescar ni preguntar, como un resumen que espera (sin push ni presencia de personas), para no empezar lo que otro ya toca y elegir lo siguiente. Menos rollo es crear una tarea y cambiarle el estado en segundos, sin configuración, campos obligatorios, sprints, estimaciones ni informes. El estado lo teclea quien trabaja la tarea porque esa lista es su cola de trabajo; si se queda vieja, el producto no sirve (riesgo n.º 1).
5. **¿Cómo sabremos que ha funcionado y con quién se prueba?** Tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva. Se prueba con el equipo del caso de estudio y se construye una vertical fina de punta a punta.

### Supuestos

- El caso de estudio no es un cliente real: el criterio de una semana es una hipótesis a validar, no una medición ya planificada.
- La ficha no da plazos: el tiempo disponible se trata como restricción de alcance (una vertical fina), no como fechas.
- Las «tres cosas insoportables» de un gestor pesado se interpretan como configuración, campos obligatorios y sprints/estimaciones/informes.
- Un único espacio compartido: varios equipos separados o personas en más de uno quedan fuera del MVP (decisión de producto, anotada aquí como supuesto).

## Problema

En los equipos remotos pequeños, saber en qué está cada persona exige una daily de sincronización y un «¿en qué estás?» constante por chat: nadie ve el estado del equipo sin interrumpir a alguien. El coste es real: dos personas tocaron el mismo módulo la misma semana sin saberlo y perdieron dos días. Hoy en el repositorio no existe nada del dominio de tareas, así que el problema se aborda desde cero, sobre la identidad de cuenta ya construida. El riesgo n.º 1 a validar es que la información se quede vieja.

## Usuarios

- **Usuario principal:** los pares de un equipo remoto de 3–10 personas con roles planos, que ven y editan lo mismo. Duelen igual quien descubre tarde que iba a lo mismo que otro y quien interrumpe para preguntar.
- **Primer usuario concreto (caso de estudio, no un cliente real):** equipo de producto SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada.
- **No son usuarios:** un lead o manager que quiera reportes hacia arriba, ni equipos que necesiten sprints, estimaciones o backlog priorizado.

## Propuesta de valor

Abrir una única lista compartida y saber de un vistazo qué está tomado y qué está libre, sin preguntar a nadie y sin refrescar. Se sostiene porque quien actualiza cobra en el momento: esa lista es su cola de trabajo y deja de recibir interrupciones. FlowSync sustituye al gestor de tareas en lugar de convivir con él.

**Hipótesis central a validar:** tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva. La daily no desaparece entera y los bloqueos siguen fuera.

## Alcance

Alcance decidido tras revisar la propuesta inicial de 5 capabilities. Se reutiliza sin contarla la identidad de cuenta ya construida (registro, login, logout y perfil); el MVP no la amplía. Las capabilities siguientes comparten una única lista de tareas como superficie común (ver supuesto del espacio compartido en Interrogatorio); esa lista no se cuenta como capability independiente (ver NO-alcance). Capabilities dentro del MVP: **4**.

1. **C1 — Crear tareas.** Con título, responsable, estado y fecha de vencimiento. Es lo mínimo para saber quién está en qué.
2. **C2 — Cambiar rápidamente el estado de una tarea**, desde la propia lista y sin campos obligatorios. Es el mecanismo que mantiene la información fresca y cubre el riesgo n.º 1.
3. **C3 — Ver los cambios de estado sin refrescar.** Es lo que aquí significa «tiempo real». Se refiere a las tareas, no a las personas.
4. **C4 — Filtrar las tareas por estado**, para centrarse en lo pendiente.

Supuestos nuevos de esta propuesta, que no cubría la ficha de producto:

- Solo el título y el responsable son necesarios para crear una tarea. La ficha define la tarea con título, responsable, estado y fecha; dejo el estado con valor inicial y el vencimiento opcional para respetar «sin campos obligatorios».
- Los estados son un conjunto fijo y muy corto (por ejemplo pendiente, en curso y hecha), no configurable.
- Cada tarea tiene una única persona responsable.
- Para el caso de estudio, quien se registra entra en el único espacio compartido. El control de acceso queda fuera.

## NO-alcance

Cada exclusión indica qué hipótesis del producto no ayudaría a validar o por qué no hace falta para validar el valor central.

1. **Contar la lista única compartida como capability independiente.** Sigue formando parte del MVP como superficie común para crear tareas, cambiar su estado, verlas sin refrescar y filtrarlas por estado, pero por sí sola no valida una hipótesis adicional: es el contexto necesario para que funcionen esas capabilities, no una capability propia.
2. **Notificaciones push.** La señal es un resumen que espera, no un aviso. Validar el valor es consultar y ver, no interrumpir; un aviso contradice la hipótesis.
3. **Integración con Slack.** El producto debe ser donde se trabaja y no convivir con nada. Integrar valida otra hipótesis (distribución) y añade dependencias de terceros.
4. **Roles y permisos.** Son pares con roles planos; una jerarquía no ayuda a validar que el estado visible sustituye la ronda.
5. **Analítica y reportes.** No hay un lector hacia arriba. La hipótesis es de pares, y medir uso o rendimiento no cambia si cancelan la ronda.
6. **Comentarios en tareas.** El estado ya responde a «¿en qué estás?»; los comentarios convierten la lista en un chat, que rechazamos como forma de tiempo real.
7. **Presencia e indicadores de actividad de personas.** Es vigilancia y se rechaza a propósito: el estado es de la tarea, no de la persona.
8. **Derivar el estado desde Git/PRs, CI o calendario.** Es otro producto, con integraciones y OAuth de terceros. La hipótesis es que el estado tecleado en dos clics se sostiene; derivarlo no valida eso.
9. **Importar tareas de otro gestor o convivir con él.** Convivir exige doble actualización, que es como muere la categoría. FlowSync crea sus tareas y sustituye al gestor.
10. **Varios equipos, pertenencia a más de uno, invitaciones y administración del equipo.** El MVP es un único espacio, y la hipótesis se valida con un solo equipo.
11. **Sprints, estimaciones, épicas, backlog priorizado e informes.** Renuncia explícita: un equipo que necesite eso no es nuestro usuario y contradice «menos rollo que Jira».
12. **Estados y flujos configurables.** Un conjunto fijo basta para saber quién está en qué; configurar es justo el rollo que se quiere evitar.
13. **Atributos extra de tarea (prioridad, etiquetas, subtareas, adjuntos, descripción larga), búsqueda, ordenación y vistas alternativas.** No hacen falta para saber quién está en qué ni qué está libre.
14. **Editar, reasignar y borrar tareas.** No ayuda a validar la hipótesis y es la exclusión con más coste de usabilidad: una tarea mal creada (título o responsable equivocado) no se puede corregir. Conviene revisarla.
15. **Resumen de «qué ha cambiado desde tu última visita».** La lista en vivo, con su filtro por estado, ya muestra el estado del equipo. El histórico de cambios no es necesario para validar la hipótesis, pero es la exclusión más cercana a la forma de señal decidida, así que también conviene revisarla.
16. **Chat, videollamada y edición simultánea.** «Tiempo real» aquí es ver cambios de estado, no colaborar en directo.
17. **Resolver bloqueos.** La daily conserva esa parte; validar que desaparece la ronda de estado no requiere abordarla.
18. **Gestión de cuenta adicional (editar perfil, recuperar contraseña, verificar email).** La identidad ya construida basta para el caso de estudio y no toca ninguna hipótesis del producto.
```

## Prompt 7

**Modelo:** Sonnet
**Herramienta:** Claude Code

```markdownd
Revisa `docs/prd/alcance-mvp-francisco-reyes.md` y déjalo listo como documento final de alcance.

Mantén las decisiones de producto ya tomadas y el recorte final de 5 capabilities propuestas inicialmente a 4 capabilities finales. No vuelvas a ampliar ni a replantear el MVP.

Haz estas correcciones:

- En `El terreno que ya existe`, elimina detalles técnicos innecesarios como endpoints concretos, nombres de tablas, campos de base de datos y nombres internos de implementación. Déjalo como un resumen breve, de 3 a 5 líneas, centrado en qué capacidades de producto existen hoy y qué dominio falta por construir.
- Revisa `Interrogatorio` y `Supuestos` para que ninguna decisión ya fijada por la ficha aparezca como supuesto. En particular, el espacio único compartido es una frontera de producto ya decidida.
- No presentes el equipo del caso de estudio como un cliente real ni como un equipo real ya disponible para validar.
- Mantén exactamente las 4 capabilities finales ya decididas.
- La lista única compartida sigue formando parte del MVP como superficie común, pero no debe contarse como capability independiente.
- Elimina contradicciones heredadas de la propuesta inicial, como tratar la fecha de vencimiento como opcional si el alcance final ya la incluye como parte de la tarea.
- Elimina supuestos innecesarios sobre valores por defecto, nombres concretos de estados o decisiones de implementación que no estén fijadas por la ficha de producto.
- Mantén las exclusiones fijadas explícitamente por la ficha y también las exclusiones adicionales que formen parte de mi recorte, pero no presentes estas últimas como si vinieran originalmente dadas por la ficha.
- Agrupa exclusiones relacionadas cuando ayude a mantener el documento conciso.
- Cada exclusión o grupo de exclusiones debe tener una justificación de producto: qué hipótesis no ayuda a validar o por qué no es necesaria para validar el valor central.
- No uses “no da tiempo” como justificación.

Al final del documento añade una sección `## Tres líneas` con este contenido, respetando exactamente mis decisiones:

1. `5 → 4`

2. Tres exclusiones que decidí mantener fuera:
   - **Integración con Slack:** no ayuda a validar si FlowSync, por sí mismo, consigue que el equipo vea el estado del trabajo sin tener que preguntar. Introduce otra hipótesis distinta: que el valor dependa de llevar la información a una herramienta externa.
   - **Analítica/reporting:** no ayuda a validar el valor entre pares. La hipótesis no es si un manager puede medir al equipo, sino si las personas pueden coordinarse mejor viendo el estado de las tareas.
   - **Comentarios en tareas:** no ayuda a validar si basta con mantener visible y fresco el estado de la tarea. Añade una capa de conversación que se acerca a chat, cuando el producto quiere reducir interrupciones y no convertirse en otro canal de comunicación.

3. La exclusión de la que menos seguro estoy es el **resumen de “qué ha cambiado desde tu última visita”**.

   La tensión que veo es que, por un lado, el MVP quiere ser mínimo y una lista actualizada puede ser suficiente para saber en qué está cada persona. Por otro, la ficha dice que uno de los momentos clave es llegar por la mañana o volver de una reunión y entender qué se ha movido, y una lista con el estado actual puede no explicar qué cambió mientras no estabas.

   La reconsideraría y la incluiría en el MVP si, al probarlo, vemos que los usuarios siguen necesitando preguntar qué cambió mientras estaban fuera aunque la lista esté actualizada, porque eso significaría que el estado actual no basta para validar la promesa de coordinación asíncrona.

No elijas otras exclusiones por mí y no cambies mis argumentos.

El documento final no debe contener endpoints, tablas o esquemas de base de datos, arquitectura ni detalles de implementación.

Mantén el documento conciso y no modifiques ningún archivo de código.
```

**Qué salió:** alcance final revisado:

```markdown
# Alcance MVP — FlowSync (Francisco Reyes)

## El terreno que ya existe

Hoy solo existe la identidad de cuenta: cualquiera puede registrarse, iniciar sesión, consultar su perfil y cerrar sesión. El dominio de tareas —crear, ver o cambiar el estado de una tarea, equipos, proyectos— no tiene nada construido; "gestión de tareas en equipo" aparece solo como descripción de intención en el README y en los textos de las pantallas de login y registro. Tampoco hay todavía cobertura de tests. El MVP de tareas se construye desde cero sobre esa identidad ya existente, no sobre nada del dominio de tareas.

## Interrogatorio

Una sola ronda de cinco preguntas sobre el planteamiento inicial. Las respuestas son decisiones de producto ya tomadas.

1. **¿Quién sufre el problema y quién lo usaría a diario?** Los pares, no un lead: no hay reporte hacia arriba. Duele a quien descubre tarde que iba a lo mismo que otro y a quien interrumpe para preguntar. Equipos remotos de 3–10 personas con roles planos; caso de estudio (no un cliente real): equipo SaaS de 6 personas en 3 husos horarios.
2. **¿Qué situación provoca hoy las reuniones de sincronización?** La daily y el «¿en qué estás?» constante por chat: nadie ve el estado sin interrumpir. Ejemplo: dos personas tocaron el mismo módulo la misma semana sin saberlo (dos días perdidos). Solo desaparece esa ronda; la daily y su parte de bloqueos siguen.
3. **¿Cómo lo resuelven hoy y por qué no les basta?** Con un gestor de tareas pesado, una daily de 15 minutos y preguntas por chat; ninguno muestra el estado sin preguntar. FlowSync sustituye al gestor, no convive con él, porque convivir obliga a actualizar dos veces.
4. **¿Qué significan «tiempo real» y «menos rollo que Jira»?** Tiempo real es ver los cambios de estado de las tareas sin refrescar ni preguntar, como un resumen que espera (sin push ni presencia de personas), para no empezar lo que otro ya toca y elegir lo siguiente. Menos rollo es crear una tarea y cambiarle el estado en segundos, sin configuración, campos obligatorios, sprints, estimaciones ni informes. El estado lo teclea quien trabaja la tarea porque esa lista es su cola de trabajo; si se queda vieja, el producto no sirve (riesgo n.º 1).
5. **¿Cómo sabremos que ha funcionado y con quién se prueba?** Tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva. El criterio de validación se plantea sobre un equipo con las características del caso de estudio, y se construye una vertical fina de punta a punta.

**Frontera de producto ya fijada:** un único espacio compartido. Varios equipos, la pertenencia a más de uno y las invitaciones quedan fuera del MVP; no es una interpretación, es una decisión ya tomada en la ficha.

### Supuestos

- El caso de estudio (equipo SaaS de 6 personas en 3 husos horarios) es un ejemplo hipotético para razonar el diseño, no un cliente real ni un equipo ya disponible para probar el producto; el criterio de una semana es una hipótesis a validar, no una medición ya planificada.
- La ficha no da plazos: el tiempo disponible se trata como restricción de alcance (una vertical fina), no como fechas.
- Las «tres cosas insoportables» de un gestor pesado se interpretan como configuración, campos obligatorios y sprints/estimaciones/informes.

## Problema

En los equipos remotos pequeños, saber en qué está cada persona exige una daily de sincronización y un «¿en qué estás?» constante por chat: nadie ve el estado del equipo sin interrumpir a alguien. El coste es real: dos personas tocaron el mismo módulo la misma semana sin saberlo y perdieron dos días. Hoy en el repositorio no existe nada del dominio de tareas, así que el problema se aborda desde cero, sobre la identidad de cuenta ya construida. El riesgo n.º 1 a validar es que la información se quede vieja.

## Usuarios

- **Usuario principal:** los pares de un equipo remoto de 3–10 personas con roles planos, que ven y editan lo mismo. Duelen igual quien descubre tarde que iba a lo mismo que otro y quien interrumpe para preguntar.
- **Primer usuario concreto (caso de estudio, no un cliente real):** equipo de producto SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada.
- **No son usuarios:** un lead o manager que quiera reportes hacia arriba, ni equipos que necesiten sprints, estimaciones o backlog priorizado.

## Propuesta de valor

Abrir una única lista compartida y saber de un vistazo qué está tomado y qué está libre, sin preguntar a nadie y sin refrescar. Se sostiene porque quien actualiza cobra en el momento: esa lista es su cola de trabajo y deja de recibir interrupciones. FlowSync sustituye al gestor de tareas en lugar de convivir con él.

**Hipótesis central a validar:** tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva. La daily no desaparece entera y los bloqueos siguen fuera.

## Alcance

Alcance final: de las 5 capabilities propuestas inicialmente quedan **4** en el MVP (recorte detallado en «Tres líneas»). Se reutiliza sin contarla la identidad de cuenta ya construida (registro, login, logout y perfil); el MVP no la amplía. Las capabilities siguientes comparten una única lista de tareas como superficie común (frontera del espacio compartido fijada en Interrogatorio); esa lista no se cuenta como capability independiente (ver NO-alcance).

1. **C1 — Crear tareas.** Con título, responsable, estado y fecha de vencimiento. Es lo mínimo para saber quién está en qué.
2. **C2 — Cambiar rápidamente el estado de una tarea**, desde la propia lista y sin campos obligatorios. Es el mecanismo que mantiene la información fresca y cubre el riesgo n.º 1.
3. **C3 — Ver los cambios de estado sin refrescar.** Es lo que aquí significa «tiempo real». Se refiere a las tareas, no a las personas.
4. **C4 — Filtrar las tareas por estado**, para centrarse en lo pendiente.

Supuestos nuevos de esta propuesta, que no cubría la ficha de producto:

- Cada tarea tiene una única persona responsable.
- El control de acceso a la lista compartida (quién puede unirse a ella) queda fuera del MVP; quien se registra entra directamente en el único espacio compartido.

## NO-alcance

Cada exclusión indica qué hipótesis del producto no ayudaría a validar o por qué no hace falta para validar el valor central. Primero las que ya fija la ficha de producto; después las que añade este recorte, que no vienen dadas por la ficha.

### Ya fijadas por la ficha de producto

1. **Notificaciones push, y presencia o indicadores de actividad de personas.** La ficha define el tiempo real como un resumen que se consulta, sin push ni presencia de personas. Un aviso o un indicador de actividad interrumpe y vigila; la hipótesis es que consultar sin interrumpir basta.
2. **Roles y permisos.** Son pares con roles planos; una jerarquía de acceso no ayuda a validar que el estado visible sustituye la ronda.
3. **Sprints, estimaciones, épicas, backlog priorizado, informes y estados/flujos configurables.** La ficha excluye explícitamente configuración, campos obligatorios, sprints, estimaciones e informes, y descarta como usuario a quien los necesite. Configurar es justo el rollo que el producto quiere evitar.
4. **Varios equipos, pertenencia a más de uno, invitaciones y administración del equipo.** El MVP fija un único espacio compartido; la hipótesis se valida con un solo equipo.
5. **Importar tareas de otro gestor o convivir con él.** La ficha decide que FlowSync sustituye al gestor en vez de convivir con él, porque convivir obliga a actualizar dos veces.
6. **Resolver bloqueos.** La ficha mantiene esa parte en la daily; la hipótesis a validar es que desaparece la ronda de estado, no los bloqueos.

### Exclusiones de este recorte

Decisiones de producto propias, no dadas por la ficha.

1. **Contar la lista única compartida como capability independiente.** Sigue formando parte del MVP como superficie común para crear tareas, cambiar su estado, verlas sin refrescar y filtrarlas por estado, pero por sí sola no valida una hipótesis adicional: es el contexto necesario para que funcionen esas capabilities, no una capability propia.
2. **Integración con Slack.** No ayuda a validar si FlowSync, por sí mismo, consigue que el equipo vea el estado del trabajo sin tener que preguntar. Introduce otra hipótesis distinta: que el valor dependa de llevar la información a una herramienta externa.
3. **Analítica y reportes.** No ayuda a validar el valor entre pares. La hipótesis no es si un manager puede medir al equipo, sino si las personas pueden coordinarse mejor viendo el estado de las tareas.
4. **Comentarios en tareas.** No ayuda a validar si basta con mantener visible y fresco el estado de la tarea. Añade una capa de conversación que se acerca a chat, cuando el producto quiere reducir interrupciones y no convertirse en otro canal de comunicación.
5. **Derivar el estado desde Git/PRs, CI o calendario.** Es otro producto, con integraciones de terceros. La hipótesis es que el estado tecleado en dos clics se sostiene; derivarlo automáticamente no valida eso.
6. **Editar, reasignar y borrar tareas.** No ayuda a validar la hipótesis y es la exclusión con más coste de usabilidad: una tarea mal creada no se puede corregir. Conviene revisarla si el recorte se relaja más adelante.
7. **Atributos extra de tarea (prioridad, etiquetas, subtareas, adjuntos, descripción larga), búsqueda, ordenación y vistas alternativas.** No hacen falta para saber quién está en qué ni qué está libre.
8. **Chat, videollamada y edición simultánea.** «Tiempo real» aquí es ver cambios de estado, no colaborar en directo.
9. **Gestión de cuenta adicional (editar perfil, recuperar contraseña, verificar email).** La identidad ya construida basta para el caso de estudio y no toca ninguna hipótesis del producto de tareas.
10. **Resumen de «qué ha cambiado desde tu última visita».** Es la exclusión menos segura de este recorte: se desarrolla en «Tres líneas».

## Tres líneas

1. `5 → 4`

2. Tres exclusiones que decidí mantener fuera:
   - **Integración con Slack:** no ayuda a validar si FlowSync, por sí mismo, consigue que el equipo vea el estado del trabajo sin tener que preguntar. Introduce otra hipótesis distinta: que el valor dependa de llevar la información a una herramienta externa.
   - **Analítica/reporting:** no ayuda a validar el valor entre pares. La hipótesis no es si un manager puede medir al equipo, sino si las personas pueden coordinarse mejor viendo el estado de las tareas.
   - **Comentarios en tareas:** no ayuda a validar si basta con mantener visible y fresco el estado de la tarea. Añade una capa de conversación que se acerca a chat, cuando el producto quiere reducir interrupciones y no convertirse en otro canal de comunicación.

3. La exclusión de la que menos seguro estoy es el **resumen de «qué ha cambiado desde tu última visita»**.

   La tensión que veo es que, por un lado, el MVP quiere ser mínimo y una lista actualizada puede ser suficiente para saber en qué está cada persona. Por otro, la ficha dice que uno de los momentos clave es llegar por la mañana o volver de una reunión y entender qué se ha movido, y una lista con el estado actual puede no explicar qué cambió mientras no estabas.

   La reconsideraría y la incluiría en el MVP si, al probarlo, vemos que los usuarios siguen necesitando preguntar qué cambió mientras estaban fuera aunque la lista esté actualizada, porque eso significaría que el estado actual no basta para validar la promesa de coordinación asíncrona.
```