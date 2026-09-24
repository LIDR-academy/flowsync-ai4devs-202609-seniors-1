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

**Modelo:** Opus 1M Default
**Herramienta:** Claude Code

```
Trabajaremos una especificación de producto en el archivo docs/prd/alcance-mvp-cgll.md. Primero genera una sección de resumen de 3 a 5 líneas con las capabilities ya construidas en este repo, y el modelo de datos actual. Esto debe ayudar a que durante el resto de la especificación, se respete lo que ya existe.
```

**Qué salió:** 
```
Creé docs/prd/alcance-mvp-cgll.md con la sección "1. El terreno que ya existe" en 4 líneas:

- Qué hay construido: solo la cuenta de usuario. Registro, login con token, ver el perfil propio y logout, con sus tres pantallas en el frontend (registro, login y perfil).
- Qué no hay todavía: nada propio de FlowSync. Faltan equipos, tareas, estados, asignaciones, tiempo real y roles.
- Modelo de datos: dos tablas.
  - users: nombre (opcional), email único, contraseña y fechas de alta y cambio.
  - auth_access_tokens: tokens de sesión ligados a un usuario, que se borran si se borra el usuario.
- Qué implica para el resto: todo lo nuevo se apoya en el usuario que ya existe, sin rehacer el registro ni el login.

Trabajo en una rama nueva, alcance-cgll, que es el nombre que pide el README. Todavía no hay commit. El cambio que ya tenías sin commitear en backend/database/schema.ts pasó a esta rama tal cual. No lo he tocado y no va en la entrega, que según el README solo lleva docs/prd y prompts.md.

Cuando quieras, seguimos con el paso 2: las cinco preguntas, a las que responderás con la ficha de hechos del curso.
```

## Prompt 2

**Modelo:** Opus 1M Default
**Herramienta:** Claude Code

```
Hazme las 5 preguntas que más reducirian la incertidumbre a esta definición de producto: "Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira."; hazlas en una sola ronda.
```

**Qué salió:** 
```
Estas son las cinco preguntas. Las añadí como sección "2. El interrogatorio" en docs/prd/alcance-mvp-cgll.md:

1. ¿Quién la usa y en qué contexto? ¿Cuántas personas tiene un equipo típico? ¿Están repartidas en varias zonas horarias? ¿Quién decide adoptarla: el propio equipo o un responsable?
2. ¿Qué reunión concreta tiene que desaparecer y qué información da hoy? ¿Es la daily? ¿Lo que falta saber es en qué está cada uno ahora, qué ha terminado, quién está bloqueado, o todo eso?
3. ¿Qué significa "tiempo real" para el usuario? Puede ser ver los cambios sin recargar, recibir avisos cuando algo cambia, o solo tener el estado siempre al día porque actualizarlo cuesta segundos.
4. ¿Qué se deja fuera a propósito para ser "menos rollo que Jira"? Por ejemplo flujos configurables, sprints, estimaciones, subtareas o campos personalizados. ¿Qué es lo mínimo que necesita una tarea para ser útil?
5. ¿Cómo sabremos que funciona? ¿Qué lo demostraría: que el equipo cancele la reunión, que cada persona actualice su estado a diario, o que los bloqueos se resuelvan antes? ¿Lo usará un equipo real de prueba o es para una demo?

Pégame entera la ficha de hechos de la lección "Ejercicio FlowSync" y paso a los cinco bloques del alcance (problema, usuarios, propuesta de valor, alcance y NO-alcance).
```

## Prompt 3

**Modelo:** Opus 1M Default
**Herramienta:** Claude Code

```
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
```

**Qué salió:** 
```
Añadí a docs/prd/alcance-mvp-cgll.md el bloque "3. El alcance" con sus cinco partes, basado en la ficha de hechos. En la sección 2 cambié "pendientes" por la referencia a la ficha.

Qué queda dentro (7 cosas, número para la Parte B):
1. Entrar con la cuenta que ya existe: todo usuario registrado forma parte del único espacio compartido.
2. Crear una tarea con solo el título obligatorio; responsable y fecha son opcionales.
3. Cambiar el estado en dos clics entre tres estados fijos: Por hacer, En curso y Hecha.
4. Asignarse una tarea o reasignarla.
5. Ver una lista compartida con todas las tareas, donde las vencidas se ven de un vistazo.
6. Filtrar la lista por estado.
7. Ver los cambios de los demás sin refrescar.

NO-alcance: 16 exclusiones, cada una justificada contra la misma hipótesis: que el equipo deja la ronda de "¿en qué estás?" porque ve el estado actual y actualizarlo cuesta dos clics.

Recortes que pueden chocar con lo que esperabas:
- "Qué se ha movido desde tu última visita": queda fuera, aunque la ficha habla de un "resumen que espera". Lo leí como "sin avisos push", no como una pantalla aparte. Si lo que querías era esa pantalla, reconsidéralo.
- Editar el título o la fecha y borrar tareas: queda fuera. Es la exclusión más dudosa y está marcada en el documento.
- Estado "Bloqueada": queda fuera, porque la ficha dice que el MVP no resuelve la parte de bloqueos de la daily.

Ahora te toca recortar a ti, y después escribir tú las tres líneas de la Parte B, que no he tocado. Cuando cierres, hago el commit y abro el PR.
```

## Prompt 4

**Modelo:** Opus 1M Default
**Herramienta:** Claude Code

```
-Genera nuevamente el bloque 3 considerando lo siguiente: - Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** 
```
Reescribí el bloque 3 en docs/prd/alcance-mvp-cgll.md. Problema, usuarios, propuesta de valor y las 7 cosas de dentro no cambian. Solo reorganicé el NO-alcance:

- Exclusiones decididas por producto (tus 5, al principio y con justificación reforzada):
  - Notificaciones push: interrumpen, y la señal debe ser algo que espera a que la mires.
  - Integración con Slack (nueva): devuelve la conversación al canal donde hoy se pregunta "¿en qué estás?". Además, con el estado en dos sitios, la información se queda vieja antes, que es el riesgo #1.
  - Roles y permisos avanzados: en el MVP los roles son planos y el valor lo cobran los pares, no un responsable.
  - Analítica y reporting: sirven para contar el trabajo, no para hacerlo, y se acercan a la vigilancia. La hipótesis se valida observando la daily, no con un panel.
  - Comentarios en tareas: reintroducen el ida y vuelta, y actualizar pasaría de ser un clic a tener que escribir.
- Otras exclusiones de la ficha de hechos (12): son las mismas de antes. Uní en una sola las integraciones con Git, CI o calendario y la importación desde otro gestor, y quité los recordatorios de vencimiento de la lista general porque ahora van dentro de las notificaciones push.

Quedan 7 cosas dentro y 17 exclusiones. El recorte final y la Parte B siguen siendo tuyos.
```