# Parte A: dos copias, un solo encargo. Comparación
| Versión           | **CON harness**                           | **SIN harness**  |
|:-------------     |:-----------                               |:------------|
| **Qué archivos tocó** | **24**                                | **21**     |
|                   | .claude/agents/analista-tarea.md          |        |
|                   | .claude/skills/commit-message/SKILL.md    |    |
|                   | AGENTS.md                                 |     |
|                   | CLAUDE.md                                 |      |
|                   |                                           | frontend/vite.config.ts      |
|                   | frontend/package-lock.json                | frontend/package-lock.json         |
|                   | frontend/package.json                     | frontend/package.json     |
|                   | frontend/src/App.css                      | frontend/src/App.css   |
|                   | frontend/src/App.tsx                      | frontend/src/App.tsx    |
|                   | frontend/src/main.tsx                     |  frontend/src/main.tsx   |
|                   | frontend/src/api/auth.ts                  |     |
|                   | frontend/src/api/client.ts                |    |
|                   | frontend/src/api/errors.ts                |     |
|                   | frontend/src/api/types.ts                 |     |
|                   |                                           |  frontend/src/lib/api-errors.ts    |
|                   |                                           |  frontend/src/lib/api.ts   |
|                   |                                           |  frontend/src/lib/field-messages.ts   |
|                   |                                           |  frontend/src/lib/validation.ts   |
|                   |                                           |  frontend/src/auth/useAuth.ts  |
|                   | frontend/src/auth/AuthProvider.tsx        |  frontend/src/auth/AuthProvider.tsx    |
|                   | frontend/src/auth/RequireAuth.tsx         |  frontend/src/auth/RequireAuth.tsx   |
|                   | frontend/src/auth/auth-context.ts         |   frontend/src/Auth/auth-context.ts   |
|                   | frontend/src/auth/storage.ts              |     |
|                   | frontend/src/components/Alert.tsx         |     |
|                   | frontend/src/components/ErrorSummary.tsx  |     |
|                   | frontend/src/components/FormField.tsx     |  frontend/src/components/FormField.tsx   |
|                   | frontend/src/pages/HomePage.tsx           |  frontend/src/pages/HomePage.tsx   |
|                   | frontend/src/pages/LoginPage.tsx          |   frontend/src/pages/LoginPage.tsx  |
|                   | frontend/src/pages/ProfilePage.tsx        |    frontend/src/pages/DashboardPage.tsx  |
|                   | frontend/src/pages/SignupPage.tsx         |   frontend/src/pages/RegisterPage.tsx   |
|                   |                                           |   frontend/src/pages/UnauthorizedPage.tsx |
| Qué convenciones del proyecto respetó y cuáles no         | No introducir dependencias nuevas sin justificarlas en el PR. > Se respetó         | No introducir dependencias nuevas sin justificarlas en el PR. > No se respetó.        |
|  | Skill de Commit message SI advierte de mezcla feature, chore (agents y subagent) y docs (por error al registrar prompts mientras hacia el ejercicio en el propio repo). Propone dos alternativas para incluir solo feature o partirlo en 3. | petición de texto para commit con mismo rompt que la skill no advierte de docs (aqui no hay chore) |
| Cuántas veces tuviste que intervenir | 4 (interacciones propias de la tarea, no incluye creacion de subagent ni medición de contexto)  | 2 (interacciones propias de la tarea, no incluye medición de contexto) |
| Qué te tocaría arreglar a mano | Nada | Nada |

# Parte B: las tres líneas

## Qué piezas montaste y cuál te costó más de lo que esperabas

- Memoria contexto permantente en Agents.md
- Skill commit-message para redactar mensaje "Conventional Commits" según diff
- subagente para mejorar solicitud de tarea (buscar fallos, ambiguedades / indefinición y generar una propuesta mejorada)
- La propia definición de la tarea a realizar.

Lo que más costó fue la propia definición de la tarea, seguida del subagente (por deconocimiento del uso de claude code).
La memoria porque nos la disteis hecha, eso hubiera costado esfuerzo (saber donde cortar)

## La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla.

La versión con harness me propuso no tener una página dedicada de acceso no autorizado, en su lugar redirigir a Login. (posible efecto del subagente¿?). La versión sin harness hizo caso directo y creo la UnauthorizedPage.

La versión con harness me propuso crear tests, e instalar alguna libreria de test.

Cambios menores en nomenclatura de archivos. Versiones bastante parecidas, ambas válidas y decentes. He hecho hasta winmerge de las carpetas para ver cambios archivo a archivo.

## Algo que dejaste escrito en el harness y que el agente no cumplió igualmente.

"lo cumplió todo" / No detecto nada.

Ambos casos han eliminado la página inicial ya existente mientras que yo solo habia indicado crear una nueva página.

Al subagente le pedí no escribir, que rehiciera el prompt de la tarea. En su lugar me propuso lanzar el plan una vez resueltos los Puntos abiertos.
