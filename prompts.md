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

---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Antes de empezar, una regla para toda esta sesión: estamos construyendo un documento de producto (alcance del MVP de FlowSync), no un documento técnico. No quiero que el documento crezca con modelos de datos detallados, diagramas de arquitectura, endpoints, casos de uso ni requisitos numerados. Si en algún momento te ves proponiendo ese nivel de detalle, detente y avísame.

Primera tarea: necesito saber qué existe ya en este proyecto. No propongas nada nuevo, no sugieras mejoras y no empieces a especificar el MVP. Solo explora el código y dime:

1. Qué capabilities están ya construidas y funcionando de punta a punta (qué puede hacer hoy un usuario con esto), y cuáles están a medias o solo como andamiaje.
2. Cómo es el modelo de datos actual, a nivel de entidades principales y cómo se relacionan, sin listar campos ni tipos.

Devuélvemelo como un resumen de 3 a 5 líneas en lenguaje de producto, que yo pueda pegar tal cual en la sección "El terreno que ya existe". Si hay algo que no puedas confirmar leyendo el código, márcalo como duda en lugar de suponerlo.

 Documenta los hallazgos en el documento alcance-mvp-roas.md
```

**Qué salió:** funcionó a la primera; escribió el tramo 1 en `docs/prd/alcance-mvp-roas.md` y marcó como duda si las sesiones caducan.

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Ahora vamos a definir el alcance del MVP de FlowSync. La idea de partida es esta:

«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

No propongas nada todavía. Antes, hazme las cinco preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Reglas:

- Una sola ronda de cinco preguntas. No habrá segunda ronda.
- Nada sobre modelo de datos, endpoints, arquitectura ni tecnología. Solo producto.
- Ordénalas de mayor a menor impacto en lo que acabaríamos construyendo.
- Ten en cuenta lo que ya existe en el proyecto (solo cuentas de usuario aisladas, sin concepto de equipo).

Cuando te conteste, no vuelvas a preguntar. Si algo queda sin cubrir, decides tú y lo marcas explícitamente como SUPUESTO.
```

**Qué salió:** cinco preguntas en una sola ronda, ordenadas por impacto, sin bajar a nivel técnico.

---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Estas son las respuestas del producto, ya decididas. No las discutas ni amplíes; úsalas como base.

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

Ya decidido que queda FUERA del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

Si alguna de tus preguntas no queda cubierta, decide tú y márcalo como SUPUESTO. No propongas el alcance todavía: solo confirma, en una lista corta, qué supuestos has tomado.
```

**Qué salió:** lanzado en el mismo mensaje que el Prompt 4; devolvió la lista de supuestos.

---

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Reglas de alcance para lo que queda de sesión:

- El MVP es lo mínimo que demuestra una sola cosa: que el equipo puede dejar de hacer la ronda de "¿en qué estás?" porque ve el estado de las tareas de un vistazo. Todo lo que no sea imprescindible para demostrar eso queda fuera.
- Céntrate únicamente en lo que describe la ficha. No añadas funcionalidades que no aparezcan en ella, aunque te parezcan útiles o "casi gratis".
- Si se te ocurre algo que aportaría valor, no lo metas en el MVP: anótalo en una lista aparte llamada "Pasos siguientes", con una línea por idea y sin desarrollarla.
- Ante la duda entre incluir o no algo, déjalo fuera. Prefiero un MVP que se quede corto a uno que crezca.
- Nada de modelo de datos, endpoints, arquitectura ni casos de uso.

Si alguna de tus preguntas no queda cubierta por la ficha, decide tú con el criterio más mínimo posible y márcalo como SUPUESTO. No propongas el alcance todavía: solo devuélveme, en una lista corta, los supuestos que has tomado.
```

**Qué salió:** lanzado junto al Prompt 3; se respondió en una sola lista de supuestos.

---

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Estas son las respuestas del producto, ya decididas. No las discutas ni amplíes; úsalas como base.

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

Ya decidido que queda FUERA del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

Si alguna de tus preguntas no queda cubierta, decide tú y márcalo como SUPUESTO. No propongas el alcance todavía: solo confirma, en una lista corta, qué supuestos has tomado.
```

**Qué salió:** relanzado solo, con el mismo texto que el Prompt 3. Devolvió la lista de supuestos, y añadió el SUPUESTO 8 (un único equipo), que la ficha pide anotar y se había pasado.

---

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Ahora sí, propón el alcance del MVP. Escríbelo directamente en docs/prd/alcance-mvp-XX.md (sustituye XX por mis iniciales: RA).

El documento tiene tres tramos, en este orden:

1. El terreno que ya existe: pega el resumen de 3-5 líneas que hicimos al principio.
2. El interrogatorio: tus cinco preguntas, cada una con su respuesta en una o dos líneas sacada de la ficha, y al final la lista de SUPUESTOS que tomaste.
3. El alcance, en cinco bloques: Problema · Usuarios · Propuesta de valor · Alcance · NO-alcance.

Reglas para el tramo 3:
- Sé agresivo recortando. El alcance incluye solo lo imprescindible para que el equipo pueda cancelar la ronda de "¿en qué estás?". Si algo no es necesario para eso, va al NO-alcance.
- Cada exclusión del NO-alcance lleva una justificación de una línea: por qué no hace falta para validar la hipótesis, o por qué ya está decidido que queda fuera.
- Ten en cuenta lo que ya existe: hoy solo hay cuentas aisladas, así que el alcance debe decir, en lenguaje de producto, cómo pasan a compartir un espacio único, de la forma más mínima posible.
- Las ideas que aporten valor pero no sean imprescindibles van en una lista final "Pasos siguientes", una línea cada una, sin desarrollar.
- Cada bloque es breve: prosa o viñetas cortas, sin subapartados.
- Prohibido: modelo de datos, tablas, endpoints, arquitectura, diagramas, casos de uso y requisitos numerados. Si necesitas ese nivel de detalle para explicar algo, súbelo a lenguaje de producto o déjalo fuera, y avísame de qué has quitado.

Cuando termines, dime en tres líneas qué has dejado fuera que te haya costado más dejar fuera.
```

**Qué salió:** escribió los tres tramos en `docs/prd/alcance-mvp-RA.md`. El alcance quedó en 7 cosas, con 21 exclusiones justificadas y 7 pasos siguientes. Para recortar más, endureció el SUPUESTO 7 (título y fecha ya no se editan).

---

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Los dos números. Cuántas cosas propuso la IA meter dentro del alcance, y cuántas quedaron dentro después de tu recorte. Tal cual salieron, sin redondear ni explicar.

Tres cosas que dejaste fuera, y por qué cada una. El porqué tiene una forma concreta: qué hipótesis del producto no ayuda a validar. "No da tiempo" no vale, porque no es una decisión de producto: es una excusa de calendario, y mañana deja de ser cierta.

La exclusión de la que menos seguro estás, y qué tendría que pasar para que entrara. Lo que interesa es qué dos cosas se contradecían: lo que te pedían contra lo que veías, lo barato contra lo que valida, lo que enamora contra lo que se puede sostener.

⚠ Ninguna de las tres tiene respuesta correcta. La tercera es mejor cuanto más incómoda: un "no supe decidir esta" honesto vale más que un alcance cerrado con seguridad fingida.

📌 Si la IA te discutió una decisión tuya y tenía razón, apúntalo aunque no lo pida ninguna de las tres. No es lo mismo que te proponga una funcionalidad de más que te señale una incoherencia: que el documento pida algo que él mismo prohíbe, o prometa algo que su propio alcance impide cumplir. Eso segundo es un fallo tuyo, y es lo más valioso que saca del rato.
```

**Qué salió:** no escribió la Parte B: propuso candidatas a recortar y señaló cuatro incoherencias del documento.

---

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
puedes integrar para la cumplir con la parte b
```

**Qué salió:** la IA hizo el recorte (7 → 6: fuera la fecha de vencimiento y el filtro por estado) y escribió la Parte B. Tanto el recorte como la redacción de la Parte B son de la IA, a petición mía.

