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

**Modelo:** Opus 5 (1M context), esfuerzo max
**Herramienta:** Claude Code

```
Puedes hacerme un resumen de las características que ya tiene la herramienta construidas, y cuál es el modelo de datos actual.
```

**Qué salió:** bien a la primera. Leyó el repo entero y dejó claro lo importante: solo hay auth, de dominio no hay nada.

---

## Prompt 2

**Modelo:** Opus 5 (1M context), esfuerzo max
**Herramienta:** Claude Code

```
Escribe el resumen generado en la ruta docs/prd/punto-partida-mvp-EM.md
```

**Qué salió:** creó la rama `alcance-EM` por su cuenta antes de escribir (regla del CLAUDE.md) y avisó de que `backend/database/schema.ts` venía modificado de antes y no debía entrar en el PR.

---

## Prompt 3

**Modelo:** Opus 5 (1M context), esfuerzo max
**Herramienta:** Claude Code

```
Partiendo de las características y modelo de datos ya construido, quiero generar un fichero con el PRD donde se defina el alcance / no alcance de un MVP para este problema: 
«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»
Una vez listo el fichero quedará guardado en la ruta docs/prd/alcance-mvp-EM.md
¿Puedes hacerme cinco preguntas para reducir la incertidumbre del problema? 
Solo haz una ronda de preguntas, y limitado al lenguaje del problema, sin bajar a modelo de datos, código o endpoints.
```

**Qué salió:** cinco preguntas de producto, una ronda, sin bajar a modelo de datos. Cada una venía con el porqué: qué cambiaría en el alcance según la respuesta.

---

## Prompt 4

**Modelo:** Opus 5 (1M context), esfuerzo max
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

- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** la ficha de hechos de la lección, pegada entera y sin inventar respuestas. Se pasó de frenada: escribió el PRD completo de golpe sin que yo se lo pidiera, cuando yo solo le había dado las respuestas.

---

## Prompt 5

**Modelo:** Opus 5 (1M context), esfuerzo max
**Herramienta:** Claude Code

```
No generes el fichero del alcance hasta que te lo indique yo.
Antes de generar el fichero del alcance quiero decidir yo que va a alcance y que queda fuera. 
Puedes listar lo que va dentro del alcance, y lo que queda fuera, justificándolo en cada caso
```

**Qué salió:** corrección al prompt anterior. Sacó el borrador de `docs/prd/` y listó 7 dentro y 16 fuera, numerados para poder decidir por referencia. Añadió un apartado señalando las cuatro decisiones que se había inventado sin respaldo de la ficha.

---

## Prompt 6

**Modelo:** Opus 5 (1M context), esfuerzo max
**Herramienta:** Claude Code

```
La D6, cámbiala a poder filtrar por estado y por responsable simultáneamente.
Elimina la D7, La complejidad de montar actualización a tiempo real no compensa para un MVP. Las tareas no cambian con tanta frecuencia. Vale con refrescar el listado antes de coger una nueva tarea.
```

**Qué salió:** aceptó el recorte sin discutir y avisó de las dos consecuencias: el MVP dejaba de cumplir el "en tiempo real" del enunciado, y aparecía un supuesto nuevo (refrescar antes de coger tarea).

---

## Prompt 7

**Modelo:** Opus 5 (1M context), esfuerzo max
**Herramienta:** Claude Code

```
Incluye de nuevo la D7: Los cambios ajenos aparecen sin refrescar
```

**Qué salió:** marcha atrás sobre el prompt anterior. Lo revirtió sin comentarios de más.

---

## Prompt 8

**Modelo:** Opus 5 (1M context), esfuerzo max
**Herramienta:** Claude Code

```
Escribe el fichero de alcance, incluyendo estos apartados: Problema / usuarios / propuesta de valor / alcance / NO-alcance
```

**Qué salió:** el fichero con los cinco bloques y sin tablas. Avisó de lo que faltaba para la entrega: la Parte B y este `prompts.md`.

---

## Prompt 9

**Modelo:** Opus 5 (1M context), esfuerzo max
**Herramienta:** Claude Code

```
Escribe el fichero de alcance, En la sección de Alcance > Supuestos. Añade un último supuesto que indique que la opción D7 (los cambios de los demás aparecen solos) se incluye por suponer que el stack tecnológico ofrece algo que permite forzar esta sincronización a tiempo real de forma fácil, económica y que no complique el modelo. (Algo parecido a SignalR de .Net)
```

**Qué salió:** lo escribió como condición de alcance y no como decisión técnica: si el supuesto no se sostiene, la D7 se cae. Avisó de que la mención a SignalR es el único punto donde el documento roza la arquitectura.

---

## Prompt 10

**Modelo:** Opus 5 (1M context), esfuerzo max
**Herramienta:** Claude Code

```
genera el fichero prompts.md siguiendo la plantilla de ejemplo, y incluyendo este último prompt en ella ;)
```

**Qué salió:** este fichero.
