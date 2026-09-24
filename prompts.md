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

```bash
 ▐▛███▛█   Claude Code v2.1.273
▝▜██████▀  Sonnet 5 with high effort · Claude Team
  ▝▝ ▝▝    ~/projects/flowsync-ai4devs

Hazme un análisis inicial del backend sobre su estructura básica, si tiene swagger o openapi, etc, no quiero una auditoría de buenas prácticas o arquitectura, solo dame un resumen del repo, env, swagger, api keys, una introducción general
```

**Qué salió:** (opcional, una línea) funcionó a la primera.

## Prompt 2

```bash
 ▐▛███▛█   Claude Code v2.1.273
▝▜██████▀  Sonnet 5 with high effort · Claude Team
  ▝▝ ▝▝    ~/projects/flowsync-ai4devs

Hazme un análisis inicial del frontend sobre su estructura básica, si consume un api backend o no, si si si tiene claro los endpoints y sus contratos, etc, no quiero una auditoría de buenas prácticas o arquitectura, solo dame un resumen del repo, environments, api keys (si aplica) etc
```

**Qué salió:** (opcional, una línea) funcionó a la primera.

## Prompt 3

```bash
 ▐▛███▛█   Claude Code v2.1.273
▝▜██████▀  Sonnet 5 with high effort · Claude Team
  ▝▝ ▝▝    /Users/valdemarfarina

Necesito que me crees una tarea en Jira, el objetivo es generar el diseño y conectar estos 4 endpoints en el frontend
  - POST /api/v1/auth/signup
  - POST /api/v1/auth/login
  - GET /api/v1/account/profile (protegida)
  - POST /api/v1/account/logout (protegida)

Presentame la descripción antes de crear la tarea.
Importante y no negociable: la redacción en jira debe ser completamente desde la perspectiva de producto, no desde especificación técnica, usa la siguiente plantilla que estáen este directorio Estándares para redacción de incidencias de desarrollo en Jira.md sin embargo, hay muchas cosas que no tengo: no tengo id de requisito, matriz de requisitos así que eso inventalo. Todo el detalle que no puedes obtener omitelo, es decir vas a redacrtar una versión ligera de esta plantilla. Es una tarea de frontend así que la aplicación se llama flowsync-ai4devs no busques el repo, redacta la tarea solo con lo que te acabo de decir. Este es el espacio de jira, debe ser una tarea de tipo Task https://newryndem.atlassian.net/jira/software/projects/FLOW/boards/999/backlog Ya está el mcp de jira aquí.
```

**Qué salió:** (opcional, una línea) funcionó a la primera.

## Prompt 4

```bash
 ▐▛███▛█   Claude Code v2.1.273
▝▜██████▀  Sonnet 5 with high effort · Claude Team
  ▝▝ ▝▝    /Users/valdemarfarina

Ahora, que prompt me darías para que un agente de IA ejecute esta tarea? no quiero que repitas la tarea (para eso está jira), no quiero que le des contexto técnico como el stack, los estándares, etc, ya que eso estará en el contexto del repo. Te das cuenta? Lo de Producto está en Jira, el contexto está en el repo mediante CLAUDE.md, la herramienta será claude code, así que solo me hace falta el prompt para cumplir con los pilares del desarrollo agentico. Dame una propuesta de prompt.
```

**Qué salió:** (opcional, una línea) Tuve que ajustar 2 líneas del prompt manualmente.

## Prompt 5

```bash
 ▐▛███▛█   Claude Code v2.1.273
▝▜██████▀  Opus 5 (1M context) with high effort · Claude Team
  ▝▝ ▝▝    ~/projects/flowsync-ai4devs

/ryndem-standards:adopt
```

**Qué salió:** (opcional, una línea) En la organización tenemos un plugin que agrega el harness a un repositorio, sin embargo, no tenemos stack React o AdonisJS por lo cual solo aplicó estándares generales. Tuve que responderle dos preguntas sobre CLAUDE.md y sobre el stack pero si creo el harness

## Prompt 6

```bash
 ▐▛███▛█   Claude Code v2.1.273
▝▜██████▀  Opus 5 (1M context) with high effort · Claude Team
  ▝▝ ▝▝    ~/projects/flowsync-ai4devs

Ejecuta la tarea FLOW-1 de Jira.

1. Antes de escribir código, obtén el ticket completo desde Jira (no asumas su contenido) y confirma que entiendes el objetivo y el resultado esperado ahí descritos.
2. Explora el repositorio para identificar cómo están resueltos hoy los flujos equivalentes (formularios, llamadas a API, manejo de sesión, estado, rutas protegidas) y sigue esos mismos patrones. No introduzcas una convención nueva si ya existe una establecida.
3. Antes de implementar, resume en 5-8 líneas tu plan (qué vas a tocar y por qué) y verifica que cubre todas las funcionalidades descritas en el ticket sin ambigüedades. Si algo del ticket es insuficiente para decidir un detalle de UX (mensajes de error, validaciones, redirecciones), decide con el criterio menos sorprendente para quien use la app y anótalo como supuesto en el PR.
4. Implementa de forma incremental. Cada funcionalidad conectada debe quedar en un estado verificable antes de pasar a la siguiente. Haz commit por cada una de las funcionalidades terminadas y verificadas de acuerdo al estándar del repositorio.
5. Verifica tu propio trabajo antes de darlo por terminado:
  - Corre el flujo real en el navegador (no solo compilación/lint): los casos de uso del ticket y sus casos negativos evidentes.
  - Corre las pruebas y linters del proyecto.
6. Deja evidencia de la funcionalidad (capturas o descripción del flujo probado) en Jira. No documentes decisiones de stack o arquitectura ya cubiertas en el repositorio.
```

**Qué salió:** (opcional, una línea) funcionó a la primera.
```bash
FLOW-1 terminado.

Qué se construyó

Todo en frontend/; el backend no se tocó. El frontend estaba en la plantilla de Vite, así que no había flujo equivalente que copiar: las convenciones que seguí son las del repo (ESM, identificadores en inglés y comentarios en español, pruebas *.test.tsx consultando por rol, tokens CSS de index.css, Conventional Commits sin scope).

- lib/api-client — fetch contra /api/v1, desenvuelve el sobre data, traduce {errors:[…]} a un ApiError con mensaje y errores por campo. lib/api-messages traduce por rule en la frontera con el API, porque el backend responde en inglés.
- auth/ — contexto de sesión con el token en localStorage, rehidratado contra GET /account/profile al arrancar, más RequireAuth y GuestOnly.
- pages/ — registro, inicio de sesión y perfil, con FormField compartido (aria-invalid, aria-describedby, pista que cede el sitio al error).

Verificación

29 pruebas Vitest, oxlint y tsc -b limpios, vite build correcto. El flujo lo corrí en Chrome real contra el backend en :3333 — no solo compilación: los seis casos felices y sus negativos (credenciales incorrectas, correo duplicado, contraseñas que no coinciden, backend caído, token revocado, volver atrás tras cerrar sesión). También modo claro/oscuro, 390 px y envío con Enter.

Dos cosas salieron de esa verificación y están corregidas: el perfil partía el correo a media palabra en móvil, y el error de correo duplicado salía por duplicado. El revisor de frontend del repo encontró un catch copiado entre login y registro; extraído a lib/form-errors con pruebas propias.

Lo que decidí yo

El ticket no fijaba varios detalles de UX. Los seis supuestos (auto-login tras registro, fullName obligatorio en el formulario aunque el API lo acepte nulo, mensaje genérico en credenciales inválidas, etc.) están anotados en el comentario de Jira, listos para copiar al PR.

Pendiente de tu decisión

- El PR no está abierto y la rama no está pusheada — no lo hice sin confirmarlo. Dime y lo abro con /pr.
- El ticket sigue en "Por hacer"; no lo moví porque no me lo pediste.
- Tengo 12 capturas del flujo en el scratchpad. El MCP de Jira no expone adjuntos, así que la evidencia quedó como descripción; si las quieres en el ticket hay que subirlas a mano.
- backend/package-lock.json sigue modificado en el árbol desde antes de esta tarea. No lo toqué, como avisa el CLAUDE.md.

Los servidores de desarrollo siguen corriendo: backend en :3333, frontend en :5174 (el :5173 estaba ocupado por otra instancia que ya estaba ahí).

✻ Sautéed for 20m 40s · done 2:59 PM · 1 shell still running
```

## Prompt 6 -ejecutado sin harness-

```bash
 ▐▛███▛█   Claude Code v2.1.273
▝▜██████▀  Opus 5 (1M context) with high effort · Claude Team
  ▝▝ ▝▝    ~/projects/flowsync-ai4devs

-Mismo prompt que con Harness-
```

**Qué salió:** (opcional, una línea) Se confundió con las propias instrucciones confusas del ejercicio. Así que tuve que insistir en que lo ejecutara.
```bash
Antes de tocar nada, encontré un conflicto que necesito que resuelvas.

Este repo es flowsync-ai4devs-sin-harness, y su propio README.md lo describe como la copia "pelada" del ejercicio del Módulo 1 (comparar cómo responde el agente con harness vs. sin harness al mismo ticket). Ahí dice explícitamente:

▎ "la otra se queda pelada y no se toca en todo el ejercicio"
▎ "No apliques el plan en ninguna: se comparan los dos planes."
▎ "No rescates a la copia pelada. Guiarla a mano es exactamente la variable que estás midiendo."

Es decir: el propósito documentado de este repo es que yo (sin harness) reciba la instrucción del ticket, proponga un plan, y me detenga ahí — para poder comparar ese plan contra el que produce la copia con harness. Implementar, commitear, correr pruebas y dejar evidencia en Jira (como pide tu instrucción) es justo lo que el ejercicio dice que no se debe hacer aquí, porque invalidaría la comparación.

¿Cómo quieres que proceda?
```

## Prompt 7 -comparación-

```bash
 ▐▛███▛█   Claude Code v2.1.273
▝▜██████▀  Opus 5 (1M context) with high effort · Claude Team
  ▝▝ ▝▝    ~/projects/flowsync-ai4devs

El objetivo de la tarea es comparar esta ejecución con harness vs una ejecución sin harness. Haz esta comparatia entre lo que hiciste en este repositorio y lo que hizo otro agente en el repositorio flowsync-ai4devs-sin-harness siguiendo estas instrucciones:
4. La comparación
En un archivo, un lado y otro, con estas casillas:
  - Qué archivos tocó, contados.
  - Qué convenciones del proyecto respetó y cuáles no, nombrándolas una a una. Si en un lado no había ninguna escrita en ninguna parte, esa es la respuesta y vale.
  - Cuántas veces tuviste que intervenir: corregir, aclarar, repetir el encargo o pararlo en seco.
  - Qué te tocaría arreglar a mano antes de enseñarle eso a alguien de tu equipo.

Parte B: las tres líneas
Debajo de la comparación, en el mismo archivo, tres líneas anotadas. Esta parte no se puede fallar, y es la que hay que traer sí o sí.
  - Qué piezas montaste (harness) y cuál te costó más de lo que esperabas. Los nombres tal cual, y en qué se te fue el rato de verdad.
  - La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla. Ojo, no cuál fue mejor: qué salió distinto, concretamente, y dónde estabas
  mirando cuando lo notaste. Si tuviste que abrir un archivo para verlo, dilo.
  - Algo que dejaste escrito en el harness y que el agente no cumplió igualmente. El matiz es todo: no es lo que hizo mal la copia pelada. Es lo que tú habías dejado
  negro sobre blanco en el lado bueno y aun así no pasó.

Si hay algo que tú no puedes contestar por ser juez y parte o porque es cosa de criterio mío no lo llenes y deja un amarca para que yo revise. No hagas commit.
Coloca el archivo en docs/harness/comparacion.md
```

**Qué salió:** (opcional, una línea) Archivo de comparación.

