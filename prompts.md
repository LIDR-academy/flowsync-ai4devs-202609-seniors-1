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

1. CONTEXTO/ROLE  (corto, solo si añade restricciones reales)
   "Trabajas en el frontend de FlowSync: React 19 + Tailwind + shadcn/ui."

2. OBJETIVO / TAREA  (orientado a outcome, no a steps)
   "Ejecuta la tarea Flow-7 del espacio FlowSync de Jira."

3. CRITERIOS DE ÉXITO EXPLÍCITOS
   "Los criterios se encuentran en la descripción de la tarea Flow-7"

4. RESTRICCIONES / ANTIPATTERNS  (qué NO hacer)
   "No toques el backend — el auth ya existe. No instales una librería de formularios sin justificarlo."

5. RECURSOS  (referencias, no copy-paste)
   "Usa los componentes de shadcn/ui. Convenciones en AGENTS.md."

6. CLARIFICACIÓN  (si el espacio de soluciones es ambiguo)
   "Si el ticket no especifica un campo del formulario, revisa el validador real del backend antes de asumir."