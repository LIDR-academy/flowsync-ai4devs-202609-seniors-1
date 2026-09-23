# Alcance MVP — FlowSync (ach)

> «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está
> trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas
> compartidas pero más en tiempo real y menos rollo que Jira.»

## 1. Terreno que ya existe

FlowSync hoy solo tiene la capa de **autenticación**: registro (`POST /api/v1/auth/signup`),
login (`POST /api/v1/auth/login`), logout y perfil (`GET /api/v1/account/profile`), protegidos
con tokens de acceso. No existe ninguna entidad de tareas, equipos ni estados: el único modelo
de datos es `User` (`id`, `full_name`, `email`, `password`, timestamps). En frontend solo hay
páginas de login, registro y perfil. Es decir: partimos de cero en todo lo que es el producto
(tareas, estados, equipo); lo único reutilizable es el sistema de usuarios/sesión.

## 2. Interrogatorio

**1. "En qué está trabajando cada uno" — ¿de qué granularidad hablamos?** Es el estado de una
tarea puntual, tecleado por quien la hace, no un estado de presencia de la persona.

**2. "Tiempo real" — ¿qué tan real?** Ver los cambios de estado de las tareas sin refrescar ni
preguntar. No es chat, no es videollamada, no es colaboración simultánea sobre el mismo
documento. Es frescura de la tarea, no presencia: nada de "quién está conectado ahora" ni
indicadores de actividad — eso es vigilancia y se rechaza a propósito. La forma de la señal es
un resumen que se consulta (llego por la mañana o vuelvo de una reunión y veo qué se ha
movido), no un aviso que interrumpe; sin notificaciones push.

**3. ¿Quién puede ver qué?** Un espacio único compartido por todo el equipo logueado, sin
entidad "equipo". Varios equipos separados, o gente en más de uno, queda fuera del MVP: se
anota como supuesto, no se construye. Roles planos: todos ven y editan lo mismo, sin
jerarquía de permisos.

**4. ¿Quién actualiza el estado?** Lo teclea la propia persona que hace la tarea, en segundos.
Derivarlo de señales externas (Git/PRs, CI, calendario) está fuera del MVP: es otro producto,
con integraciones y OAuth de terceros. Se sostiene porque el beneficio no es solo para los
demás: esa misma lista es la cola de trabajo de quien la escribe, la usa para decidir qué
coger, y de paso deja de recibir interrupciones preguntándole cómo va.

**5. "Menos rollo que Jira" — ¿menos campos o menos proceso?** Crear una tarea y cambiarle el
estado en segundos, sin flujos de configuración ni campos obligatorios: dos clics sobre una
lista ya abierta. Una tarea en el MVP necesita solo título, responsable, estado y fecha de
vencimiento (la fecha, para ver de un vistazo qué se ha pasado de plazo). La lista se consume
filtrando por estado. Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e
informes — y fuera del MVP también quedan notificaciones push, integración con Slack,
roles/permisos avanzados, analítica/reporting y comentarios en tareas.

**Contexto de negocio recogido:**

- **Qué duele hoy:** la daily de sincronización y el "¿en qué estás?" constante por chat. Nadie
  ve el estado del equipo sin interrumpir a alguien.
- **Quién cobra el valor:** los pares, no un lead — no hay reporte hacia arriba en este MVP.
- **Episodio concreto:** dos personas tocaron el mismo módulo la misma semana porque una
  empezó sin que la otra lo supiera. Dos días perdidos.
- **Qué reunión desaparece:** la daily no desaparece entera. Desaparece la ronda de "¿en qué
  estás?", que hoy se come la mitad de los 15 minutos; la parte de bloqueos sigue.
- **Usuarios:** equipos remotos pequeños, 3–10 personas, roles planos.
- **Primer usuario concreto (caso de estudio, no cliente real):** equipo de 6 personas de
  producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15
  minutos por videollamada.
- **Qué decisión cambia:** no empezar algo que otra persona ya está tocando, y elegir lo
  siguiente sabiendo qué está libre.
- **Riesgo #1:** que la información se quede vieja. Se asume como el riesgo a validar; la
  mitigación es que actualizar cueste dos clics, no obligar a nadie.
- **Relación con el gestor de tareas actual:** sustituye, no convive. FlowSync crea las tareas,
  no lee las de otro sitio — convivir exigiría doble actualización.
- **Éxito para el usuario:** dejar de hacer la ronda de "¿en qué estás?" porque el estado del
  equipo se ve de un vistazo.
- **Criterio a una semana de uso real:** que el equipo cancele esa ronda y nadie pida que
  vuelva.
- **Cuánto construir:** una vertical fina y usable de punta a punta, no el andamiaje amplio de
  un producto.

## 3. Alcance en 5 bloques

### Problema

Los equipos remotos pierden tiempo y coordinación en el ritual de "¿en qué estás?": la mitad
de los 15 minutos de la daily se va en que cada uno cuente su estado en voz alta, y fuera de la
daily esa misma pregunta se repite por chat, interrumpiendo a quien la responde. La
consecuencia no es solo tiempo perdido en la reunión: sin visibilidad continua, dos personas
pueden tocar el mismo módulo la misma semana sin saberlo — ya ha pasado, y costó dos días de
trabajo duplicado.

### Usuarios

Equipos remotos pequeños (3–10 personas), con roles planos: no hay jerarquía de permisos,
todos ven y editan lo mismo. Caso de estudio de referencia: un equipo de 6 personas de
producto SaaS, repartido en 3 husos horarios, que hoy usa un gestor de tareas pesado y sostiene
una daily de 15 minutos por videollamada. El valor lo cobran los pares entre sí, no un lead ni
un manager — no hay reporte hacia arriba en este MVP.

### Propuesta de valor

Saber en qué está cada uno sin preguntar y sin reunión: llegar por la mañana, o volver de otra
cosa, y ver de un vistazo qué se ha movido en el equipo. Esto cambia una decisión concreta — no
empezar algo que otro ya está tocando, y elegir lo siguiente sabiendo qué está libre. El estado
se mantiene fresco porque a quien lo escribe también le sirve: esa misma lista es su cola de
trabajo, la usa para decidir qué coger, y de paso deja de recibir interrupciones preguntándole
cómo va. Actualizar cuesta dos clics sobre una lista ya abierta, no un formulario.

### Alcance (qué se construye)

- Crear una tarea con cuatro campos: título, responsable, estado, fecha de vencimiento.
- Lista de tareas filtrable por estado, para centrarse en lo pendiente y ver de un vistazo lo
  que se ha pasado de plazo.
- Los cambios de estado se ven en la lista de los demás sin que nadie tenga que refrescar ni
  preguntar (frescura de la tarea, no presencia de la persona).
- Un espacio único compartido por todo el equipo logueado — no hay entidad "equipo" ni
  separación de espacios.
- Se apoya en la autenticación que ya existe (signup/login/logout/perfil); no se toca esa
  parte.

### NO-alcance (qué se queda fuera)

- **Cambiar el estado de una tarea en dos clics, sin campos obligatorios adicionales.** El MVP
  cubre la edición estándar de una tarea (incluido su estado); una interacción dedicada y
  optimizada para el cambio rápido no valida por sí sola si el equipo adopta la lista como su
  cola de trabajo — eso se comprueba primero con la edición normal, y la fricción reducida se
  justifica después, si hace falta.
- **Múltiples equipos o espacios separados.** No valida la hipótesis central — si ver el estado
  del equipo basta para cancelar la ronda de la daily — y añade aislamiento multi-tenant que
  solo complica sin aportar señal.
- **Indicadores de presencia ("quién está conectado ahora").** Rechazado a propósito: no es
  información de la tarea sino de la persona, se lee como vigilancia y arriesga la adopción que
  el MVP intenta ganar.
- **Notificaciones push.** Contradice la forma de señal decidida — un resumen que se consulta,
  no un aviso que interrumpe. Construirlas antes de validar que el resumen pasivo ya resuelve
  el problema sería resolver algo que no se sabe si hace falta.
- **Integraciones externas (Slack, Git/PRs, CI, calendario) para derivar el estado
  automáticamente.** Es otro producto, con OAuth de terceros. No ayuda a validar la apuesta de
  este MVP: que teclear el estado en dos clics ya es suficientemente barato como para que la
  gente lo haga.
- **Roles y permisos avanzados.** El MVP asume un equipo plano de pares que ya confían entre
  sí; resolver gobernanza de permisos no valida nada sobre si el producto sustituye a la daily.
- **Sprints, estimaciones, épicas, backlog priorizado, informes.** Es justo el "rollo" del
  gestor de tareas pesado que este producto sustituye. Meterlos reintroduce el problema que se
  quiere quitar.
- **Comentarios en tareas.** Convertiría la lista en un canal de conversación, compitiendo con
  el chat que ya existe — el producto está para reemplazar el gestor de tareas, no el chat.
- **Analítica y reporting.** No hay nadie "arriba" que lo pida en este MVP (no hay lead ni
  reporte jerárquico); construirlo no acerca la validación de si los pares dejan de hacer la
  ronda de la daily.

---

# Parte B — Las tres líneas

## Los dos números

La IA propuso **6** ítems dentro del bloque Alcance. Tras mi recorte, quedaron **5**.

## Tres exclusiones y su porqué

1. **Cambio de estado en dos clics como interacción dedicada.** El MVP cubre la edición
   estándar de una tarea (incluido su estado); una interacción optimizada para el cambio rápido
   no valida por sí sola si el equipo adopta la lista como su cola de trabajo — eso se
   comprueba primero con la edición normal, y la fricción reducida se justifica después, si
   hace falta.
2. **Indicadores de presencia ("quién está conectado ahora").** No es información de la tarea
   sino de la persona; se lee como vigilancia y arriesga la adopción que el MVP intenta ganar.
   Rechazado a propósito, no por falta de tiempo.
3. **Integraciones externas (Git/PRs, CI, calendario) para derivar el estado.** No ayuda a
   validar la apuesta central de este MVP: que teclear el estado en dos clics ya es
   suficientemente barato como para que la gente lo haga. Derivarlo automáticamente respondería
   una pregunta distinta.

## La exclusión de la que menos seguro estoy

**Notificaciones push.** Es la que más dudo. Digo que las descarto porque van contra la idea de
"resumen que se consulta, no aviso que interrumpe" — pero al mismo tiempo declaro que el riesgo
número uno del producto es que la información se quede vieja. Y ese mecanismo que elijo, el
resumen pasivo, solo funciona si la gente entra por su cuenta a mirarlo. Si nadie entra, la
frescura se pierde igual, que es justo el riesgo que más me preocupa.

Estoy usando "nada de avisos, es vigilancia" como argumento para dejarlas fuera, pero un aviso
mínimo (no de presencia de la persona, solo de "algo cambió en tu equipo") sería la mitigación
más obvia a ese riesgo, y la estoy descartando por principio sin haberla probado. Entraría si,
pasada una semana de uso real, veo que el equipo no vuelve solo a la lista con la frecuencia
necesaria para que el resumen cumpla su función.
