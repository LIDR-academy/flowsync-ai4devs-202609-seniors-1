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

**Modelo:** Login
**Herramienta:** Claude Code
```
 Ejecuta lo necesario para crear la tarea de Jira llamada FLOW-1 tomando en cuenta el contexto de la tarea, recuerda que se debe realizar lo correpondiente al front y back

  Read 4 files, listed 1 directory, called atlassian 4 times

FLOW-1 ya existe en el proyecto FlowSync — no hay que crearla desde cero. Ya tiene resumen "Creación de login" y una descripción que cubre tanto frontend (UI, validaciones, estados visuales, responsive) como backend (hash de contraseñas, HTTPS, rate limiting, sesión). Está en "Por hacer", pero sin asignar. Voy a asignártela para que cumpla lo que pide el ejercicio (ticket en "Por hacer" y asignado a ti)
  Called atlassian

FLOW-1 ya existía en el proyecto FlowSync (creada hoy a las 14:16), así que no la dupliqué — solo le faltaba la asignación:

- Resumen: "Creación de login"
- Estado: Por hacer ✓
- Asignada a: Sara Sanchez ✓ (acabo de completarlo, estaba sin asignar)
- Descripción: ya cubre front y back — alcance funcional, seguridad mínima (hash, HTTPS, límite de intentos, expiración de sesión), y criterios de diseño responsive; incluye 11 criterios de aceptación.

Está lista para el paso 4 del ejercicio: lanzarla con /priority-ticket en la copia con harness.

```
##Promt 2
```
Requiero que realices la tarea FLOW-1 dentro de este proyecto, tanto el back como front, con la conexion correspondiente, tomando en cuanta los lenguajes de programacion que se tienen
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.
Salio a la segunda linea, ya que en la primera no fui clara e interpreto que quería que hiciera la tarea en Jira no que la tomara como referencia
