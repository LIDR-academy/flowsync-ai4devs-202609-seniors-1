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

**Modelo:** Opus 5 (effort: low)
**Herramienta:** Claude Code
**Copia sin harness** Yes

```
Analiza este requerimiento:
Se necesita que una persona pueda darse de alta en el sistema por su cuenta. Abrirá un formulario web donde indicará su correo y una clave, y al enviarlo el sistema debe crear el nuevo usuario.
Criterios de aceptación:
1. El sistema valida correctamente el correo y la clave antes de enviar el formulario.
2. Si los datos no son válidos, la persona ve un mensaje que le indica qué corregir.
3. Cuando el alta se completa, la persona recibe confirmación de que su usuario fue creado.

Implementalo y avísame del resultado con un resumen de implementación.
```

**Qué salió:** Funciono a la primera, claude me implemento el login y si bien no tenia como saber de la existencia del user.ts con validaciones, el miro el backend y rescato las validaciones.


## Prompt 2

**Modelo:** Opus 5 (effort: low)
**Herramienta:** Claude Code
**Copia CON harness**

```
Analiza este requerimiento:
Se necesita que una persona pueda darse de alta en el sistema por su cuenta. Abrirá un formulario web donde indicará su correo y una clave, y al enviarlo el sistema debe crear el nuevo usuario.
Criterios de aceptación:
1. El sistema valida correctamente el correo y la clave antes de enviar el formulario.
2. Si los datos no son válidos, la persona ve un mensaje que le indica qué corregir.
3. Cuando el alta se completa, la persona recibe confirmación de que su usuario fue creado.

Implementalo y avísame del resultado con un resumen de implementación.
```

**Qué salió:** Funciono a la primera, Formulario de alta hecho, en React dentro de frontend/. No toquo nada de backend (lo especifique en claude.md)/. Compila y pasa lint sin errores. Probé contra el backend en marcha con curl: un alta válida crea el usuario, un correo repetido devuelve 422 con regla database.unique, y los datos malos devuelven 422 con error por campo.