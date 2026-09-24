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
## Con harness
### Prompt 1

**Modelo:** GPT-5.6 Terra Ligero
**Herramienta:** Codex

```
Implementa el ticket https://marctomas.atlassian.net/browse/FLOW-1
```

**Qué salió:** 
Salió mal porque no identificó que tenía que buscar el tiquet en el MCP de Atlassian, y me implementó la pantalla de login, porque leyó la documentación del repositorio:

```
...
No pude leer la descripción de FLOW-1 porque Jira requiere una sesión Atlassian activa; tomé como alcance “Implementar login en el frontend”, indicado en la documentación del repositorio. Los cambios preexistentes del backend permanecen sin incluir en el commit.
...
```

Deshice el commit y volví a hacer otro prompt más explícito.

### Prompt 2

**Modelo:** GPT-5.6 Terra Ligero
**Herramienta:** Codex

```
Use `Atlassian plugin` to check ticket FLOW-1
```

**Qué salió:** Me implementó el reloj tal y como le pedí quitando todo lo demás.

```
Consulté FLOW-1 con la integración de Atlassian y corregí la implementación: el ticket es “Catalan clock”, no login.
Implementado:
  - Reloj en la esquina superior derecha.
  - Alternancia entre vistas digital y analógica.
  - Actualización en tiempo real cada segundo.
  - Etiqueta de hora catalana basada en cuartos, siguiendo la referencia de horacatalana.cat.
Cambios en [App.tsx](C:/ProjectsOffside/ai4devs/flowsync/flowsync-ai4devs-202609-seniors-1/frontend/src/App.tsx) y [App.css](C:/ProjectsOffside/ai4devs/flowsync/flowsync-ai4devs-202609-seniors-1/frontend/src/App.css).
...
```

---
## Sin harness
### Prompt 1

**Modelo:** GPT-5.6 Terra Ligero
**Herramienta:** Codex

```
Add a clock on upper right of frontend:
- It shows the current time online
- It has two displays: digital and analogic
- Add a label with the catalan hour (https://horacatalana.cat/ )
```

**Qué salió:** Me implementó el reloj tal y como le pedí dejando el contenido previo.

```
Added the live upper-right clock to the frontend.
- Digital time updates every second.
- Analog clock hands stay synchronized.
- Catalan time label follows quarter-based phrasing and links to horacatalana.cat.
- Responsive styling included.
...
```
