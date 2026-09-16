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

**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
Lee el ticket que hay en el board de Jira y aplica la descripcion que contiene
```

**Qué salió:** Funciono a la primera lo que le habia pedido. tambien comentar que el ejemplo ha sido algo muy sencillo de hacer. Quizo hizo un poco mas, pero todo bien.


El ticket de jira decia lo siguiente: 
**Titulo**: Mejorar el formulario de login
**descripcion**:

Como usuario quiero tener feedback en el inicio de la session, sabiendo si lo he hecho bien o si lo he hecho mal y el porque se ha hecho mal.

ACCEPTANCE CRITERIA

    Mensaje de success si todo ha ido bien

    Mensaje de error con el error message si ha ocurrido algo. Los tipos de error que se van a incluir en esta version van a ser:
        Bad credentials
        Max password retries
        Max login attempts
        Internal error