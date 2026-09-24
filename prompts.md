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

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
quiero un documento PRD dentro de docs/prd/alcance-mvp-cnb.md donde por ahora me vas a dar un analisis de 3-5 lineas del estado del proyecto, las capabilities ya construidas y modelo de datos actual.
```

**Qué salió:** FlowSync está en fase inicial: solo existe el módulo de autenticación (signup, login, logout, perfil), sin ningún concepto de tareas, equipos o proyectos todavía implementado.


## Prompt 2

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
quiero que FLowSync sea ua herramienta para que los equipos remotos sepan en que se esta trabajando cada uno sin tener que hacer reuniones de sync. Tienen que poder comnpartir y ver las tareas compartidas de otros equipos en tiempo real, es decir, cuando alguien esta trabajando en una tarea tiene que poder verlo en el momento que dice que esta trabajando en ella. Preguntame antes de proponer, todo lo vas a escribor en el parchivo PRD, unicamente la parte de funcionalidad de la epica
```

**Qué salió:** agrupan tareas y son independientes de los equipos — un equipo puede tener varios proyectos, y un proyecto puede involucrar a personas de varios equipos.


## Prompt 3

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
 Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.- Quién cobra el valor: los pares, no un lead. No hay reporte haciaarriba y a un manager le daría igual. Duele a los dos devs quedescubren tarde que iban a lo mismo, y al que interrumpe a otropara preguntar.
  - Episodio concreto: dos personas del equipo tocaron el mismo      módulo la misma semana porque una empezó sin que la otra lo
  supiera. Dos días perdidos.                                        - Qué reunión desaparece (respuesta honesta, no la vendas de más):
  la daily NO desaparece entera. Desaparece la ronda de "¿en qué     estás?", que hoy se come la mitad de los 15 minutos. La parte de
  bloqueos sigue, y este MVP no la resuelve.                          - Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Rplanos: en el MVP todos ven y editan lo mismo, sin jerarquía depermisos.- Primer usuario concreto: equipo de 6 personas de producto SaaS,en 3 husos horarios, que hoy usa un gestor de tareas pesado y unadaily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un
  cliente real.                                                      - Fronteras: un espacio único compartido, sin entidad "equipo".
  Varios equipos separados, o gente en más de uno, queda FUERA del   MVP: se anota como supuesto en el PRD, no se construye.
  - "Tiempo real" = ver los cambios de estado de las tareas sin      refrescar ni preguntar. NO es chat, NO es videollamada, NO escolaboración simultánea sobre el mismo documento.- Es frescura, no presencia: el estado es de la TAREA, no de lapersona. Nada de "quién está conectado ahora" ni indicadores deactividad; eso es vigilancia y lo rechazamos a propósito.
  - Forma de la señal: resumen que espera, no aviso que interrumpe.  El caso es "llego por la mañana o vuelvo de una reunión y veo qué
  se ha movido". Sin notificaciones push.                            - Qué decisión cambia: no empezar algo que otra persona ya está
  tocando, y elegir lo siguiente sabiendo qué está libre. Si la únicarespuesta fuera "sentirse informado", el tiempo real no valdría lo
  que cuesta.                                                         - De dónde sale el estado: lo teclea la persona que hace la taren segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con inty OAuth de terceros.                                     - Por qué se sostiene: no porque sea más agradable, sino dos clics sobre una lista ya abierta, sin campos obligatodecidir sprint ni estimación. Y quien lo escribe cobra en el       momento: esa misma lista es su cola de trabajo, la mira pdecidir qué coge, y de paso deja de recibir interrupciones         preguntándole cómo va. Si el beneficio fuera solo para lono lo escribiría.                                                  - Si la información se queda vieja: el producto pierde ely lo asumo. Es el riesgo #1 a validar, no un detalle. La es que actualizar cueste dos clics, no obligar a nadie.            - Es donde se hace el trabajo, no donde se cuenta: sustitgestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.                                     - Renuncia explícita a sprints, estimaciones, épicas, backlog     priorizado e informes. Un equipo que necesite eso no es nuestro   usuario.                                                          
  - "Menos rollo que Jira" = crear una tarea y cambiarle el estado en
  segundos, sin flujos de configuración ni campos obligatorios. Lo   
  mínimo para saber quién está en qué.                               
  - Qué necesita una tarea en el MVP: título, responsable, estado y  fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
  - Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
  - Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
  - Criterio a una semana de uso real: que el equipo cancele esa
  ronda y nadie pida que vuelva. Si la siguen haciendo igual, no
  funcionó.
  - Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias
```

**Qué salió:** Lo que duele hoy es la ronda de "¿en qué estás?" de la daily (se come la mitad de los 15 minutos) y las interrupciones constantes p
or chat para preguntar en qué va cada uno. Nadie ve el estado del equipo sin interrumpir a alguien. Episodio concreto que lo motiva
: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera — dos días perdidos. El valor l
o cobran los pares (los propios devs), no un lead ni un manager: no hay reporte hacia arriba en esta épica.


## Prompt 4

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas. Quitame todo lo que tenga que ver con estas opciones y a parte revisa bien que no quede nada tecnico.s
```

**Qué salió:** - Entidad "equipo" y visibilidad multi-equipo, Jerarquía de roles y permisos, Notificaciones push, email o chat.

