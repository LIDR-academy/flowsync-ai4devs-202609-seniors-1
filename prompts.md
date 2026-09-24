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

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Este es el ejemplo. Bórralo.

El prompt va aquí dentro, entero y con sus saltos de línea,
para que se sepa dónde empieza y dónde acaba.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.


# Registro de Prompts - Ejercicio FlowSync (S2)

**Autor / Iniciales:** Darvy Soriano / DS  
**Fecha:** Septiembre 2026  

---

## Prompt 1: Interrogatorio inicial y extracción de incertidumbres
> "Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.
> 
> Antes de proponer ningún alcance, actúa como un Senior Product Manager y hazme hasta 5 preguntas clave para reducir la incertidumbre sobre el problema, los usuarios y las fronteras de este MVP. Haz una sola ronda de preguntas y no bajes a detalles de base de datos ni endpoints."

---

## Prompt 2: Inyección de la Ficha de Hechos de Producto
> "Aquí tienes la ficha de hechos con las decisiones de producto ya tomadas para responder a tus preguntas:
> - Qué duele hoy: la daily de sincronización y el '¿en qué estás?' constante.
> - Usuarios: equipos remotos pequeños de 3 a 10 personas con roles planos.
> - Tiempo real: ver el cambio de estado al instante sin refrescar la página. Sin chat, sin videollamadas, sin presencia 'en línea'.
> - Origen de datos: actualización manual en 2 clics por quien hace la tarea. Cero integraciones externas.
> - Menos rollo que Jira: solo título, responsable, estado y fecha de vencimiento. Sin sprints, estimaciones ni métricas.
> 
> Con esta información, propón un alcance agresivamente recortado para el MVP organizado en los 5 bloques: Problema, Usuarios, Propuesta de Valor, Alcance y NO-Alcance (con justificación de cada exclusión)."

---

## Prompt 3: Recorte final y estructuración del PRD
> "Genera el documento de PRD final en formato Markdown listo para guardar en `docs/prd/alcance-mvp-DS.md`, incluyendo los 3 tramos exigidos:
> 1. El terreno que ya existe
> 2. El interrogatorio y las respuestas
> 3. El alcance en 5 bloques
> 
> Y al final, añade la Parte B (Las tres líneas):
> 1. Los dos números (funcionalidades propuestas originalmente vs. las que quedaron).
> 2. Tres descartes y su porqué (enfocado en qué hipótesis de producto NO ayuda a validar).
> 3. La exclusión con más duda y sus implicaciones."

