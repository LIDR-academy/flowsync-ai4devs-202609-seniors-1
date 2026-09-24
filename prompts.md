# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.
```

**Qué salió:** resumió lo que ya existe (solo cuentas: registro, login, perfil) e hizo cinco preguntas en una ronda antes de proponer nada.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Te respondo cada pregunta:
```

**Qué salió:** no funcionó. El mensaje se envió cortado, sin las respuestas, y la IA pidió que las volviera a pegar.

## Prompt 3

**Modelo:** Opus 5.5
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

**Qué salió:** escribió `docs/prd/alcance-mvp-mmg.md` con 8 cosas dentro del alcance, 20 exclusiones justificadas, 7 supuestos y 4 incoherencias detectadas en la ficha.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Ok, refinemos.
```

**Qué salió:** la IA preguntó qué puntos del alcance se quedaban, con un selector. Marqué 1, 2, 3, 4 y 8 (quedaron 5 de 8) y la IA señaló que el recorte se aparta de la ficha en "tiempo real", fecha y filtro.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Completemos el motivo de los puntos quedaron que afuera:
- la fecha no es necesaria porque es para entender cuanto tiempo podría tardar la tarea y el objetivo del tablero es entender en que se está trabajando no en que va  a trabajar o analizar vencimientos.
- para el mvp, no es necesario ver los cambios sin recargar. El objetivo es entender en que está cada uno. Que sea automático es un wish y no aporta al objetivo principal
- El filtro por estados no se incluye en el mvp porque en un principio no se justifica por la cantidad de personas. Además, en un principio da una foto de como termina y arranca el día
```

**Qué salió:** los volcó a la línea 2 de la Parte B y me discutió el motivo de la fecha: la ficha la define como "qué se ha pasado de plazo", no como estimación. Tenía razón.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
cambiar por "qué se ha pasado de plazo"
```

**Qué salió:** funcionó a la primera.

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
No estoy tan seguro de excluir la fecha de vencimiento porque de alguna manera sirve para entender si la tarea está retrasada y podría hacerse alguna acción correctiva, sumar recursos, dividir la tarea, etc. Si dentro de la daily puede ser un punto importante, no lo excluiría. Si es solo entender "en que se está", sobra. Si a partir del vencimiento de la fecha se van a tomar decisiones, debería estar presente. No está claro si esa fecha es arbitraria, si salió de la planning, si es calculada según la complejidad de la tarea.
```

**Qué salió:** lo escribió como línea 3 y propuso añadir el choque: el uso natural de la fecha es de gestión, y el producto renuncia a ser una herramienta de gestión.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
agregar la frase que renuncia a ser una herramienta de gestión y es para uso interno del equipo
```

**Qué salió:** funcionó a la primera.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
volcar prompts a prompts.md
```

**Qué salió:** este archivo.
