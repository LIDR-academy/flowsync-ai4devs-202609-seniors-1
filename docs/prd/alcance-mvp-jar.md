# Alcance MVP - FlowSync AI4Devs

## Terreno Construido

**Capabilities actuales:** Sistema de autenticación con signup/login basado en access tokens opacos, perfil de usuario con email/fullName/password, y API REST tipada en AdonisJS 7 con Tuyau. Frontend en React 19 + Vite con context de auth y rutas protegidas.
**Modelo de datos:** Tabla `users` (id, full_name, email, password, created_at, updated_at) y tabla `access_tokens` para persistencia de sesiones. Sin tablas de tareas, equipos ni actividades aún — la aplicación es solo autenticación.

## Problema

Equipos remotos pequeños pierden visibilidad del estado del trabajo del resto sin interrumpir a alguien: hoy lo resuelven con la ronda de "¿en qué estás?" de la daily y con mensajes sueltos por chat, que se comen la mitad de los 15 minutos de la reunión. Cuando eso falla, el coste es concreto: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, y perdieron dos días. La daily no desaparece entera — la parte de bloqueos queda fuera de este MVP — pero la ronda de "¿en qué estás?" sí es prescindible si el estado de las tareas se puede ver de un vistazo.

## Preguntas de Alcance

1. **Usuarios prioritarios:** ¿A quién le duele más este problema — al miembro del equipo que pierde foco por las reuniones, o al lead/manager que necesita visibilidad para tomar decisiones?
2. **El dolor actual:** ¿Con qué frecuencia ocurren hoy esas reuniones de sincronización que se quieren eliminar y cuánto tiempo consumen por persona/semana?
3. **Qué significa "tiempo real":** ¿Qué tan al día necesita estar la información para que deje de hacer falta la reunión?
4. **Contexto de herramientas actuales:** ¿Estos equipos ya usan alguna herramienta de gestión de tareas y este MVP debe complementarla, sustituirla, o convivir con ella?
5. **Criterio de éxito:** ¿Qué comportamiento concreto tendría que cambiar para considerar que el MVP funcionó?

## Usuarios

Equipos remotos pequeños (3-10 personas), con roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos. El valor lo cobran los pares entre sí, no un lead que reporta hacia arriba — a un manager le daría igual. Duele por partida doble: a quien interrumpe para preguntar cómo va algo, y a quien empieza una tarea sin saber que otro ya la está tocando. Quien escribe el estado también cobra en el momento: esa misma lista es su cola de trabajo, y de paso deja de recibir interrupciones. Caso de estudio (no cliente real): equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada.

## Propuesta de Valor

Ver el estado de las tareas del equipo de un vistazo, sin preguntar y sin esperar a la daily, para no empezar algo que otra persona ya está tocando y elegir lo siguiente sabiendo qué está libre. Es frescura del estado de la tarea, no presencia de la persona: un resumen que se consulta al llegar o al volver de algo, no un aviso que interrumpe. Se sostiene porque actualizar cuesta dos clics sobre una lista que la propia persona ya necesita mirar para decidir qué coger — si el beneficio fuera solo para los demás, no lo escribiría.

## Alcance MVP

- Crear una tarea con lo mínimo para saber quién está en qué: título, responsable, estado y fecha de vencimiento — sin flujos de configuración ni campos obligatorios de más.
- Cambiar el estado de una tarea en segundos (dos clics), porque ese gesto es lo que sostiene que la información se mantenga fresca.
- Ver la lista de tareas de todo el equipo en un espacio único compartido, filtrable por estado para centrarse en lo pendiente.
- ~~Autenticación de usuario (ya construida): cada persona entra con su cuenta para teclear su propio estado.~~

### NO-Alcance

- **Notificaciones push o avisos que interrumpen** — el valor es la frescura al consultar, no el aviso; meterlo reproduce la misma interrupción que se quiere eliminar.
- **Integración con Slack u otro chat** — el objetivo es sustituir el "¿en qué estás?" de chat, no reproducirlo en otro canal.
- **Roles y permisos avanzados** — el equipo objetivo es plano; nadie en la ficha pide jerarquía.
- **Varios equipos, o una persona en más de un equipo** — la ficha lo declara fuera explícitamente: se anota como supuesto (espacio único compartido), no se construye.
- **Comentarios en tareas** — añaden una superficie de conversación que no es el problema validado (ver estado, no discutirlo).
- **Analítica o reporting** — no hay un usuario "manager" en este MVP que consuma reportes; nadie lo pidió.
- **Derivar el estado de señales externas (Git/PRs, CI, calendario)** — exige integraciones y OAuth de terceros; el estado lo teclea la persona en segundos, y ese control manual es parte del valor, no un atajo pendiente.
- **Sprints, estimaciones, épicas, backlog priorizado** — excluido explícitamente en la ficha: un equipo que necesite esto no es el usuario de este producto.
- **Colaboración simultánea sobre el mismo documento, o videollamada integrada** — no es el problema de visibilidad que se está validando; la parte de bloqueos de la daily queda fuera a propósito.
- **Convivir con otro gestor de tareas (Jira, etc.)** — exigiría doble actualización, que es como muere esta categoría de producto; FlowSync crea las tareas, no lee las de otro sitio.

---

## Parte B

1. **Los dos números:**
   - 5 Propuestas de la IA, 1 recortada.
2. **Tres cosas que dejé fuera:**
   - Autenticación de usuario: ya está construido. Sería mejor enfocarse en nuevas funcionalidades.
   - Solo hubo 5 propuestas, y únicamente 1 quedó descartada.
3. **La exclusión de la que menos seguro estaba:**
   - No tengo claro si, aunque ya esté construido, la autenticación de usuarios debería incluirse en el PRD del MVP de todos modos.
