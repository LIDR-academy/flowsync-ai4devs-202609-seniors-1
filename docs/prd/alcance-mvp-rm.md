# Alcance del MVP — FlowSync

**Párrafo de partida (literal):**
> Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.

## Tramo 1 — el terreno que ya existe

En esta rama (`s2/start`), FlowSync tiene hoy un único modelo `User` con autenticación completa de punta a punta (signup, login, logout, sesión vía access tokens opacos, perfil), tanto en backend (AdonisJS) como en frontend (React, con rutas protegidas). No existe ninguna entidad de tarea, equipo o espacio de trabajo — ni modelo, ni migración, ni endpoint, ni pantalla. Hay auth construida; cero funcionalidad de producto todavía.

## Tramo 2 — el interrogatorio

Preguntas (una sola ronda, sin bajar a modelo de datos ni endpoints) y respuesta usando la ficha de hechos del producto (ver `prompts.md`, Prompt 2):
1. ¿Qué reunión o ritual concreto se supone que este producto reduce o elimina, y para quién?
2. ¿Quién saca el valor real de que alguien teclee el estado de su tarea?
3. ¿"Tiempo real" es un aviso activo o un estado consultable cuando se decide mirar?
4. ¿De dónde sale el estado de una tarea — a mano o inferido de otra fuente?
5. Si el estado queda desactualizado, ¿es un riesgo asumido del MVP o algo que hay que resolver ya?

## Tramo 3 — el alcance

**Problema:** en equipos remotos pequeños, la ronda de "¿en qué estás?" de la daily —no la daily completa— consume tiempo porque nadie ve el estado de las tareas sin preguntar. Genera duplicidad real de trabajo (dos personas tocando el mismo módulo la misma semana sin saberlo).

**Usuarios:** equipos remotos de 3–10 personas, roles planos. Caso de estudio: equipo de 6 personas de producto SaaS en 3 husos horarios. Quien más valor saca es el propio par que teclea su estado (le sirve como su cola de trabajo) y el compañero que deja de interrumpirlo para preguntar.

**Propuesta de valor:** un espacio único compartido donde el estado de cada tarea se actualiza en dos clics y se ve fresco por los demás sin preguntar ni esperar una reunión. Sustituye al gestor de tareas, no convive con él.

**Alcance:**
1. Espacio de trabajo único compartido (sin entidad "equipo").
2. Crear tarea con: título, responsable, estado (pendiente / en progreso / hecho), fecha de vencimiento.
3. Cambiar el estado de una tarea en dos clics, sin campos obligatorios extra.
4. Ver la lista de tareas filtrada por estado.
5. Ver los cambios de estado de los demás sin refrescar ni preguntar.

**NO-alcance:**
- **Notificaciones push** — la ficha lo excluye explícito: el valor es "resumen que espera", no "aviso que interrumpe".
- **Indicadores de presencia** ("quién está conectado ahora") — rechazado a propósito: el estado es de la tarea, no de la persona; es vigilancia.
- **Derivar el estado de señales externas** (Git/PRs, CI, calendario) — exige integraciones/OAuth de terceros; "es otro producto".
- **Múltiples equipos o gente en más de uno** — fuera explícito de la ficha, anotado como supuesto de producto.
- **Sprints, estimaciones, épicas, backlog priorizado, informes** — renuncia explícita: "un equipo que necesite eso no es nuestro usuario".
- **Convivencia con otro gestor de tareas** — FlowSync crea las tareas, no las importa; la doble actualización "es como muere esta categoría".
- **Jerarquía de permisos o roles** — explícito: "roles planos... sin jerarquía de permisos".
- **Reemplazar la daily completa** — la ficha es honesta: solo desaparece la ronda de "¿en qué estás?"; los bloqueos siguen sin resolverse.

### Supuestos declarados
1. **Set mínimo de estados de una tarea: pendiente / en progreso / hecho.** La ficha dice que la lista se filtra "por estado" pero nunca enumera cuáles son — esto lo decidí yo, no viene del producto.

(El supuesto de "cliente web únicamente" que propuse en la primera pasada se descartó en el recorte: no se afirma nada sobre plataforma en este documento.)

---

## Parte B — las tres líneas

1. **Los dos números.** La IA propuso 7 cosas dentro del alcance. Quedaron 5 después del recorte.

2. **Tres cosas que dejé fuera, y por qué cada una** (qué hipótesis de producto no ayuda a validar):
   - **Notificaciones push** — si empujo el aviso, no sé si la gente actualiza su estado por costumbre genuina (dos clics, barato) o porque el sistema se lo recuerda. Contamina la métrica real de éxito (que la ronda de la daily desaparezca porque ya se sabe, no porque se lo avisaron).
   - **Indicadores de presencia** — respondería una pregunta distinta ("¿quién está conectado ahora?") en vez de la que el MVP quiere validar ("¿qué está libre para coger?").
   - **Derivar el estado de Git/CI** — se saltaría la pregunta central (el riesgo #1: si teclear a mano en dos clics es lo bastante barato como para que la gente realmente lo haga) en vez de probarla.

3. **La exclusión de la que menos seguro estoy, y qué tendría que pasar para que entrara:** múltiples equipos o gente en más de uno. Es la única que la propia ficha marca como supuesto a validar, no como decisión firme. Lo que se contradice: la simplicidad que pide el MVP (un espacio único, sin jerarquía) contra lo que sabemos de organizaciones reales (casi nadie está en un solo equipo). Entraría si un piloto real mostrara que la gente reparte su tiempo entre proyectos distintos — pero eso obliga a modelar "espacio de trabajo", justo la jerarquía que hoy se evita a propósito.
