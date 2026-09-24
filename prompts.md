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

CON HARNESS

## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code
```
Desarrolla lo necesario para resolver el ticket "Registro de usuario" definido en el tablero FlowSync de Jira
```

El ticket dice: 
Como usuario sin cuenta, quiero poder registrarme con mi nombre de usuario, email y contraseña, para obtener acceso autenticado a la aplicación sin intervención manual de un administrador
Criterios de aceptacion
Si los datos introducidos son válidos, se registra el usuario, sus datos quedan registrados en la BD y se devuelve ok
Si el nombre o el email ya existen, se devuelve un error sin dar pistas de que la el email ya forma parte de una cuenta registrada previamente
La contraseña tendra unas minimas exigencias de robustez
Se pedira repetir la contraseña para asegurarse de que el usuario elige la deseada. Si las indicadas no coinciden se le indicara y no se procedera al registro


## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code
```
Usa adversarial-reviewer para revisar mi diff
```

SIN HARNESS

## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code
```
Desarrolla lo necesario para resolver el ticket "Registro de usuario" definido en el tablero FlowSync de Jira
```

El ticket dice: 
Como usuario sin cuenta, quiero poder registrarme con mi nombre de usuario, email y contraseña, para obtener acceso autenticado a la aplicación sin intervención manual de un administrador
Criterios de aceptacion
Si los datos introducidos son válidos, se registra el usuario, sus datos quedan registrados en la BD y se devuelve ok
Si el nombre o el email ya existen, se devuelve un error sin dar pistas de que la el email ya forma parte de una cuenta registrada previamente
La contraseña tendra unas minimas exigencias de robustez
Se pedira repetir la contraseña para asegurarse de que el usuario elige la deseada. Si las indicadas no coinciden se le indicara y no se procedera al registro

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Backend + formulario frontend
```
(respuesta a l ticket FLOW-1 "Registro de usuario" tiene criterios de aceptación puramente de backend/API (validación, BD, errores). El frontend está en su plantilla base de Vite/React, sin router ni cliente HTTP. ¿Qué alcance implemento?)