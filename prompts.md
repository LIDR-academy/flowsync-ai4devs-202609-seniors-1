# Prompts

Todos los prompts que lancé para este ejercicio, en orden, con su modelo y herramienta.

**Nota sobre el método.** El harness lo construí dirigiendo a Claude Code desde una sesión abierta
en mi repo de apuntes del máster, no escribiendo los archivos a mano. Los prompts 1 a 5 son esas
instrucciones. El prompt 6 es el encargo del ejercicio, y es el único que se lanzó **idéntico en las
dos copias**. Los prompts 7 y 8 son las respuestas a las preguntas de cada agente.

---

## Prompt 1

**Modelo:** Opus 5
**Herramienta:** Claude Code (app de escritorio)

```
empecemos con el fork y levantar el proyecto
```

**Qué salió:** funcionó. Clonó el repo del curso, se colocó en `s1/start`, instaló dependencias de
backend y frontend en paralelo, generó `APP_KEY`, corrió migraciones y levantó los dos servidores.
De paso hizo un signup de prueba con `curl` y se topó con el error de `passwordConfirmation`, que
resultó ser el hueco central del ejercicio.

---

## Prompt 2

**Modelo:** Opus 5
**Herramienta:** Claude Code (app de escritorio)

```
ya hice el fork, mi usuario es IngAdamMarquez
```

**Qué salió:** verificó por la API de GitHub que el fork existía y que su parent era
`LIDR-academy/...`, renombró `origin` a `upstream`, añadió mi fork como `origin` y empujó
`s1/start`.

---

## Prompt 3

**Modelo:** Opus 5
**Herramienta:** Claude Code (app de escritorio)

```
ya di de alta Jira, el tablero es FlowSync con clave FLOW
```

**Qué salió:** redactó el ticket en lenguaje de producto con criterios de aceptación, dejando
deliberadamente fuera `passwordConfirmation`, las rutas y las restricciones de longitud.

---

## Prompt 4

**Modelo:** Opus 5
**Herramienta:** Claude Code (app de escritorio)

```
FLOW-1, los tipos son Historia, Tarea, Error y Subtarea, ya la cree en historia
```

**Qué salió:** arrancó el reloj y escribió las dos piezas del harness: el `CLAUDE.md` y el subagente
`adversarial-reviewer`.

**Decisión de diseño que salió de aquí y que merece la pena anotar:** el `CLAUDE.md` **no** dice
*"signup exige passwordConfirmation"*. Dice *"lee el contrato real, nunca lo deduzcas del ticket"*.
Poner el dato habría sido soplarle la respuesta al agente con harness y el experimento no habría
medido nada.

---

## Prompt 5 — ❌ NO FUNCIONÓ

**Modelo:** Opus 5 · Máx
**Herramienta:** Claude Code (app de escritorio)

Este es el prompt 6 de abajo, pero lanzado desde una sesión cuyo directorio de trabajo apuntaba a
una carpeta **vacía** (`ProyectosClaude\flowsync-ai4devs-202609-seniors-1`) en vez de a
`C:\Proyectos\flowsync-ai4devs-202609-seniors-1`.

**Qué salió:** el agente no encontró el proyecto, salió a buscarlo por el disco y aterrizó en mis
apuntes del máster, donde leyó `contrato-api.md` — el archivo marcado *"para evaluar, no para el
ticket"*, que contiene los huecos. Lo detectó y me avisó por su cuenta antes de continuar:

> *"I found your evaluation key. […] So I've seen the intended gaps (including passwordConfirmation)
> rather than discovering them cold. That contaminates the with/without-harness measurement on this
> run, and you should know before you score it."*

**Corrida descartada entera.** Costó 27 de los 45 minutos. La lección está en la Parte B: el
aislamiento del contexto es del **directorio de la sesión**, no de la carpeta del proyecto.

---

## Prompt 6 — el encargo, IDÉNTICO en las dos copias

**Modelo:** Opus 5 · Máx
**Herramienta:** Claude Code (terminal), plan mode, sesión nueva sin historial
**Lanzado en:** `C:\Proyectos\flowsync-ai4devs-202609-seniors-1` (con harness) **y**
`C:\Proyectos\flowsync-sin-harness` (pelada)

```
Implementa esto en el frontend:

Registro e inicio de sesión de usuarios

Como persona que llega a FlowSync por primera vez, quiero crear mi cuenta y entrar con ella, para poder ver mi información personal dentro de la aplicación.

Hoy la aplicación no tiene ninguna pantalla de acceso: cualquiera que abre la web ve directamente la pantalla de inicio. Necesitamos cerrar esa puerta antes de empezar a construir el resto del producto.

El equipo de backend ya dejó lista la parte de servidor. Esta tarea es solo la parte que ve el usuario.

Criterios de aceptación:

- Puedo crear una cuenta nueva desde la propia aplicación.
- Puedo entrar con una cuenta que ya creé antes.
- Una vez dentro, veo una pantalla con mis datos que no era accesible antes de entrar.
- Si mis datos de acceso no son correctos, la aplicación me lo dice de forma comprensible, sin mostrarme un error técnico.
- Si intento registrarme con un correo que ya existe, también me lo dice de forma comprensible.
- Puedo salir de mi cuenta.
```

**Qué salió:** las dos copias produjeron un plan ejecutable. Las dos encontraron
`passwordConfirmation`, el matiz `nullable` vs `optional` de `fullName` y el 400-no-401. La
comparación completa está en `docs/harness/comparacion.md`.

---

## Prompt 7 — respuestas a la copia CON harness

**Modelo:** Opus 5 · Máx · **Herramienta:** Claude Code (terminal)

El agente devolvió cuatro decisiones antes de planificar. No son texto libre: se eligen de una lista.

| Pregunta suya | Mi respuesta |
|---|---|
| *"El frontend no tiene router. ¿Instalamos uno o navegamos con estado?"* | react-router |
| *"¿Dónde guardamos el access token (oat_...) tras entrar?"* | localStorage |
| *"El backend exige enviar siempre `fullName`, pero acepta null. ¿Qué hacemos en el formulario de registro?"* | Campo opcional |
| *"¿Cómo alcanza el frontend (:5173) al backend (:3333)?"* | Proxy de Vite + `VITE_API_URL` |

---

## Prompt 8 — respuestas a la copia PELADA

**Modelo:** Opus 5 · Máx · **Herramienta:** Claude Code (terminal)

| Pregunta suya | Mi respuesta |
|---|---|
| *"El frontend está vacío: no hay router, ni cliente HTTP, ni estado global. ¿Cómo quieres gestionar la navegación?"* | react-router v7 |
| *"¿En qué idioma escribo los textos que ve el usuario?"* | Español |
| *"El backend devuelve un token bearer que nunca caduca. ¿Dónde lo guardo en el navegador?"* | localStorage |
| *"Hoy App.tsx es la pantalla de plantilla de Vite. ¿Qué hago con ella?"* | Sustituirla por el perfil |

**Criterio de simetría:** respondí lo mismo donde las preguntas coincidían (router y almacenamiento
del token). Las otras dos son distintas en cada copia, así que no había simetría que mantener — y
esa divergencia **es el hallazgo**, no un defecto del método.

---

## Nota final sobre honestidad

Ninguno de los planes se aplicó: el ejercicio pide comparar **los planes**. Las dos sesiones
corrieron en plan mode, con el mismo modelo y el mismo esfuerzo, sin historial previo, y la única
diferencia entre sus directorios era el `CLAUDE.md` y la carpeta `.claude/agents/`.
