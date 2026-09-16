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

**Modelo:** Opus 
**Herramienta:** Claude CLI

```
Work in the Jira story FLOW-1 as typescript developer
Build in the frontend the profile page requested in that ticket
The task will be finish when
- the react component is built and working
- unit tests have been built and passed
- the definion of done is success
Do not touch the backend, that code is already working
Use the profile endpoint in the backend to get the needed data.
All the information on the backend should be displayed in the new page
```

**Qué salió:** (opcional, una línea) Ambos pidieron confirmacion para acceder a atlassian, la ejecucion de determinados comandos y el acceso a ficheros
Con harness login es requiredo para acceder a la pagina no usuario pwd solicitado. Sin harness no acabo durante la duracion del test

## Prompt 1

**Modelo:** Opus 
**Herramienta:** Claude CLI

```
Amend the previous implementation with the same role. The needed changes are:
- Implement the login by user user password
- Home page should not require login, only the profile page.
- Accessing to the profile page should be using a link in the home page
```

**Qué salió:** (opcional, una línea) Solo ejecutado en le project harness y no acabo durante la duracion del test.