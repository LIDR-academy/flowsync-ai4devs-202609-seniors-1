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

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe. Funcionó

---

## Prompt 2

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
Añade al fichero CLAUDE.md las siguientes reglas:
```

**Qué salió:** (opcional, una línea) tuve que insistir 

---

## Prompt 3

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
## Prohibido
- No instales dependencias nuevas en el frontend (nada de react-router, axios, librerías de formularios ni de UI). Usa solo lo que ya está en package.json.
- No modifiques nada dentro de backend/. El backend no se toca en esta tarea.
- No inventes endpoints: si necesitas la API de login, explora primero el backend real (rutas, controlador, validador) y usa lo que exista.
- No toques archivos autogenerados (backend/.adonisjs/, database/schema.ts, package-lock.json).

## Proceso
- Los componentes nuevos del frontend van en frontend/src/components/ (esa carpeta aún no existe; créala).
- Todo componente React se escribe en TypeScript (.tsx).
- Antes de dar por terminada cualquier tarea, ejecuta `npm run lint` en frontend/ y deja el código sin errores de oxlint.
- Explica en una frase qué archivos vas a tocar antes de empezar a editar.
```

**Qué salió:** (opcional, una línea) funcionó a la primera 

---

## Prompt 4

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
Crea un subagente de proyecto llamado adversarial-reviewer en .claude/agents/adversarial-reviewer.md. Su encargo: revisar con espíritu crítico el código que se acaba de escribir en el frontend, buscando incumplimientos de las reglas de CLAUDE.md (dependencias nuevas prohibidas, componentes fuera de frontend/src/components/, archivos que no son .tsx, endpoints inventados que no existen en el backend real, errores de oxlint). Debe listar cada problema encontrado con el archivo y la línea, y no arreglar nada por su cuenta: solo reporta. Si no encuentra problemas, lo dice explícitamente.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe. Funcionó

---

## Prompt 5

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
Como usuario de FlowSync, quiero poder iniciar sesión con mi email y contraseña para acceder a mi tablero de tareas. Criterios de aceptación: - Existe una pantalla de login con campos de email y contraseña. - Al enviar credenciales correctas, el usuario accede a la aplicación. - Si las credenciales son incorrectas, se muestra un mensaje de error. - El usuario no puede acceder al tablero sin haber iniciado sesión.
```

**Qué salió:** (opcional, una línea) funcionó a la primera 

---

## Prompt 6

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
usa el subagente adversarial-reviewer para revisar lo que acabas de escribir
```

**Qué salió:** (opcional, una línea) funcionó a la primera

---

## Prompt 7

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
No lo apliques. Déjalo como está.
```

**Qué salió:** (opcional, una línea) funcionó a la primera

---
---

##PROMTS SIN HARNESS

---
---

## Prompt 1

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
Como usuario de FlowSync, quiero poder iniciar sesión con mi email y contraseña para acceder a mi tablero de tareas. Criterios de aceptación: - Existe una pantalla de login con campos de email y contraseña. - Al enviar credenciales correctas, el usuario accede a la aplicación. - Si las credenciales son incorrectas, se muestra un mensaje de error. - El usuario no puede acceder al tablero sin haber iniciado sesión.
```

**Qué salió:** (opcional, una línea) funcionó a la primera 

---