# Documento de PRD: Alcance MVP FlowSync

**Ubicación del archivo:** `docs/prd/alcance-mvp-DS.md`  
**Autor / Iniciales:** DS  

---

## 1. El terreno que ya existe
La aplicación FlowSync cuenta con una estructura base cliente-servidor lista para desplegar. La arquitectura dispone de un backend en AdonisJS (Node.js 24) expuesto en `http://localhost:3333` y un frontend en React/Vite en `http://localhost:5173`. A nivel de modelo de datos e infraestructura existe la persistencia de usuarios y la entidad básica de tareas con sus relaciones iniciales, el sistema de autenticación básico y la configuración del harness en el repositorio (`CLAUDE.md`, hooks y scripts de Make).

---

## 2. El interrogatorio (1 sola ronda)

### Preguntas clave de incertidumbre planteadas a la IA:
1. **Problema y contexto de uso:** ¿Cuál es la fricción exacta que buscamos eliminar en el día a día del equipo y qué reunión se pretende impactar?
2. **Público objetivo y roles:** ¿Quiénes son los usuarios principales y qué estructura jerárquica o permisos se requieren?
3. **Definición de "Tiempo Real":** ¿Qué implica concretamente esta necesidad y qué señales/mecanismos quedan explícitamente excluidos?
4. **Origen de la información:** ¿Cómo se actualiza el estado de las tareas e integración con herramientas externas?
5. **Métricas de éxito y riesgos:** ¿Cómo sabemos si el MVP funciona a la primera semana y cuál es el riesgo principal de adopción?

### Respuestas (Ficha de Hechos de Producto):
* **Dolor y reunión:** Eliminar el paso de "¿en qué estás?" en la daily de sincronización. No elimina la daily completa (los bloqueos se siguen hablando), pero elimina la ronda de estado que consume la mitad de los 15 minutos.
* **Usuarios:** Equipos remotos pequeños (3–10 personas) con roles planos. En este MVP todos ven y editan lo mismo sin jerarquías ni permisos avanzados.
* **Primer usuario concreto (caso de estudio):** Equipo de 6 personas de producto SaaS repartido en 3 husos horarios, que actualmente usa un gestor pesado y sufre la ronda verbal en la daily.
* **Tiempo real:** Se refiere a ver los cambios de estado de las tareas al instante (frescura visual) sin refrescar la página. NO es chat, NO es presencia ("quién está conectado"), NO incluye notificaciones push ni videollamadas.
* **Origen de datos:** Se actualiza manualmente en dos clics por la persona que hace la tarea. Cero integraciones automáticas con GitHub/GitLab, CI/CD o calendario. Sustituye al gestor de tareas actual para evitar la doble carga de información.
* **Éxito y riesgo:** El éxito es que el equipo cancele la ronda de "¿en qué estás?" en la daily tras una semana de uso. El riesgo #1 es que la información quede desactualizada; la mitigación es reducir el coste de actualización a dos clics sin campos obligatorios.

---

## 3. El alcance en 5 bloques

### Block 1: Problema
Los equipos remotos pierden tiempo diario interrumpiéndose en chats ("¿en qué estás?") o consumiendo la mitad de la reunión daily en rondas de actualización de estado verbales, debido a la falta de visibilidad en tiempo real del trabajo en progreso.

### Block 2: Usuarios
Equipos de desarrollo y producto remotos de 3 a 10 personas (caso de estudio inicial: equipo de 6 personas en 3 husos horarios), orientados al trabajo asíncrono y con roles planos donde todos los miembros tienen visibilidad y permisos equivalentes.

### Block 3: Propuesta de valor
Proporcionar una vista compartida y ultra-ligera donde consultar o actualizar el trabajo en curso toma dos clics, eliminando las interrupciones entre compañeros y la ronda de estado de la daily.

### Block 4: Alcance (MVP)
* Espacio único compartido con lista de tareas del equipo y refresco de estado en tiempo real (visibilidad inmediata sin recargar).
* Creación ultra-rápida de tareas con únicamente 4 campos mínimos: Título, Responsable, Estado y Fecha de vencimiento.
* Cambio de estado en 2 clics directamente desde la lista principal, sin campos obligatorios ni flujos complejos.
* Consumo y filtrado por estado para centrarse únicamente en el trabajo activo y pendiente.

### Block 5: NO-alcance (Exclusiones explicitadas y justificadas)
* **Notificaciones push o alertas por Slack:** *Justificación:* Fomentan la interrupción en lugar de la consulta asíncrona; el valor se obtiene al consultar la lista cuando el usuario lo necesita.
* **Indicadores de presencia / estado "En línea":** *Justificación:* Se busca medir el estado de la tarea, no vigilar a la persona. Evita dinámicas de microgestión y control.
* **Sprints, estimaciones, puntos de historia y épicas:** *Justificación:* Añaden fricción a la creación y edición. "Menos rollo que Jira" exige eliminar todo overhead administrativo.
* **Integraciones automáticas (GitHub, Jira, CI/CD, Calendario):** *Justificación:* Requieren autenticación OAuth compleja y restan foco a la validación de la hipótesis de actualización manual rápida (2 clics).
* **Gestión de múltiples equipos / Entidad "Equipo" / Permisos por roles:** *Justificación:* El MVP valida la adopción dentro de un espacio único compartido; la complejidad multi-tenant frena el despliegue inicial.
* **Comentarios y discusiones en tareas:** *Justificación:* Se evita convertir la herramienta en un canal de chat fragmentado. La comunicación sobre bloqueos sigue en la daily o en los canales de chat habituales.

---

## Parte B: Las Tres Líneas

### 1. Los dos números
* **Funcionalidades propuestas inicialmente por la IA:** 11  
* **Funcionalidades que quedaron tras tu recorte:** 4  

### 2. Tres descartes y su porqué
1. **Notificaciones en Slack / Push:** No ayuda a validar la hipótesis de que un panel asíncrono y silencioso es suficiente para eliminar la consulta de estado en la daily sin generar ruido mental.
2. **Integración con GitHub / Commits:** No ayuda a validar la hipótesis central de que los usuarios mantendrán la lista al día manualmente si la interfaz exige solo 2 clics y no tiene campos obligatorios.
3. **Indicadores de presencia ("En línea / Ausente"):** No ayuda a validar si el equipo gana autonomía al ver el avance del trabajo, y por el contrario introduce un sesgo de vigilancia no deseado.

### 3. La exclusión con más duda
* **Comentarios en las tareas:** Existe un dilema entre mantener la herramienta extremadamente limpia/ligera o permitir que los usuarios aclaren dudas puntuales en la misma tarea sin ir a Slack. Se decidió dejarlo fuera porque el riesgo de convertir la herramienta en un foro de discusión opacaba la hipótesis principal de "saber en qué está cada uno de un vistazo". Para incluirlo, tendría que comprobarse en uso real que los usuarios abandonan el MVP por la imposibilidad de adjuntar una aclaración mínima sobre el estado.
