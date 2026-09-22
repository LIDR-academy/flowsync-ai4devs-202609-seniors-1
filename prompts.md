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

**Modelo:** Sonnet 5 with medium effort
**Herramienta:** Claude Code

```
Muéstrame las capabilities de lo que está ya construido en el proyecto y como es el modelo actual.
```

**Qué salió:** 
_Un informe de todo el repo con los endpoints de la API y las tablas (con columnas y tipos) del backend y la información del frontend muy básica._

---

## Prompt 2

**Modelo:** Sonnet 5 with medium effort
**Herramienta:** Claude Code

```
Hazme un resumen de 3-5 líneas.
```

**Qué salió:** 
_Resumen de 3 a 5 líneas (ver en prompt siguiente)_

## Prompt 3

**Modelo:** Sonnet 5 with medium effort
**Herramienta:** Claude Code

```
Dado este enunciado:
_Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira._

Teniendo en cuenta lo existente:
_FlowSync es un monorepo (AdonisJS 7 + React 19) en fase inicial: solo tiene implementado el módulo de autenticación (signup, login, logout, perfil), con access tokens y una única entidad de datos, users. El esquema del backend se autogenera desde migraciones, y los controladores/transformers/validadores siguen las convenciones del proyecto (serialize, VineJS, transformers). Todavía no existe ninguna funcionalidad de gestión de tareas en equipo (el propósito real de FlowSync) — es puro andamiaje de auth. El frontend replica ese alcance: páginas de login/registro/perfil y el contexto de autenticación, sin pantallas de tareas._

Proponme las 5 preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Una sola ronda, sólo con la información dada.
```

**Qué salió:** 
```
... dado que "tareas compartidas en tiempo real, menos rollo que Jira" y "que se sepa en qué está trabajando cada uno" admiten interpretaciones muy distintas:
```
_(5 preguntas resumidas, sólo muestro el principio_)
```
1. ¿"Tiempo real" significa qué exactamente? ...
2. ¿Qué unidad de trabajo sustituye a "tarea de Jira"?...
3. ¿Quién ve qué?....
4. ¿Qué reemplaza a la reunión de sync — un dashboard que se consulta, o notificaciones que empujan?...
5. ¿Cuál es el primer caso de uso a demostrar/entregar?...
```

## Prompt 4

**Modelo:** Sonnet 5 with medium effort
**Herramienta:** Claude Code

```
Te planteo las respuestas:
_todas las respuestas del enunciado_
* Si no te he respondido alguna pregunta, marcámelo y responde tu como supuesto
```

**Qué salió:** 
```
Todas las respuestas están claras y accionables. Solo una pregunta quedó sin responder directamente:

Pregunta 5 (alcance mínimo fijado por el curso/fecha de entrega) — no la respondiste. Supuesto que asumo en su lugar: no hay una fecha de entrega ni un alcance mínimo impuesto externamente por el curso; el criterio de "cuánto construir" que sí diste ("una vertical fina y usable de punta a punta, prefiero una capability terminada a tres a medias") es el único que rige el alcance. Lo marco como supuesto abierto en vez de bloquear en él.

Con esto, el MVP queda bastante acotado:

- Entidad nueva: ...
- Estados: ...
- Vista principal: ...
- Sin: ...
- Criterio de éxito: a una semana, el equipo deja de hacer la ronda de "¿en qué estás?" en la daily y nadie pide que vuelva.

¿Quieres que pase esto a un PRD corto, o directamente a un plan de implementación (migración de tasks, endpoints, transformer, validador, pantalla de lista) sobre lo que ya hay?

```
_(Y ya me suggiere:"Pasa esto a un PRD corto")_


## Prompt 5

**Modelo:** Sonnet 5 with medium effort
**Herramienta:** Claude Code

```
Pasa esto a un MVP con el alcance en cinco bloques. 
- Problema
- Usuarios
- Propuesta de valor
- Alcance 
- NO-alcance. 

Sé agresiva recortando, pero justifica cada exclusión.
Ten en cuenta lo que ya está decidido que está fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** 
_Un texto con los 5 apartados + un riesgo:_
```
Riesgo #1, no un detalle: si el estado se queda desactualizado, el producto pierde su sentido entero. La única mitigación en el MVP es que actualizar cueste dos clics — no hay plan B de notificaciones o recordatorios porque eso ya está descartado por diseño.
```

## Prompt 6

**Modelo:** Sonnet 5 with medium effort
**Herramienta:** Claude Code

```
Dejámelo en docs/prd/alcance-mvp-ia.md para poder acabar de repasarlo manualmente
```

**Qué salió:** 
```
...
Guardado en docs/prd/alcance-mvp-ia.md.
```


## Prompt 7

**Modelo:** Sonnet 5 with medium effort
**Herramienta:** Claude Code

```
no entiendo el riesgo ni la miteigación en el cambio de estado en dos clics
```

**Qué salió:** 
_Me lo ha explicado y ya he entendido, pensaba que era un riesgo técnico de actualización, pero era un problema de uso de los usuarios._
