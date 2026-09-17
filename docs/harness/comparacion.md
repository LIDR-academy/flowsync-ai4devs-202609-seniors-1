# Comparación: con harness vs. sin harness

**Ticket:** Filtrar tareas por estado desde la API  
**Modelo:** Abacus AI  
**Herramienta:** Chat Abacus  
**Fecha:** 2026-09-17

---

## Parte A — Tabla comparativa

### 1. Archivos tocados

| | CON harness | SIN harness |
|---|---|---|
| Migración | `database/migrations/<ts>_create_tasks_table.ts` | `database/migrations/<ts>_create_tasks_table.ts` |
| Modelo | `app/models/task.ts` | `app/models/Task.ts` |
| Validator | `app/validators/task.ts` | _(no creado)_ |
| Controller | `app/controllers/tasks_controller.ts` | `app/controllers/TasksController.ts` |
| Rutas | `start/routes.ts` | `start/routes.ts` |
| **Total** | **5 archivos** | **4 archivos** (sin validator) |

---

### 2. Convenciones del proyecto respetadas y no respetadas

| Convención | CON harness | SIN harness |
|---|---|---|
| Archivos en snake_case | ✅ `task.ts`, `tasks_controller.ts` | ❌ `Task.ts`, `TasksController.ts` (PascalCase) |
| Modelo extiende schema autogenerado | ✅ Extiende `TaskSchema` de `#database/schema` | ❌ Define columnas manualmente con `@column()` |
| Validators en `app/validators/` con VineJS | ✅ Archivo separado `task.ts` con `vine.create()` | ❌ Validación inline en el controller |
| Alias de importación del `package.json` | ✅ Usa `#models/task`, `#validators/task` | ❌ Importa con ruta relativa `../models/Task.js` |
| Importación de controllers via `controllers` autogenerado | ✅ Usa `[controllers.Tasks, 'index']` | ❌ Importa `TasksController` directamente |
| Sin `console.log` de depuración | ✅ | ✅ |
| No instalar dependencias nuevas | ✅ | ✅ |

---

### 3. Intervenciones necesarias

| | CON harness | SIN harness |
|---|---|---|
| Intervención 1 | Corregir directorio: `node ace` ejecutado desde `migrations/` en vez de `backend/` | Crear usuario antes de insertar tareas (foreign key error) |
| Intervención 2 | Ejecutar `npm run format` manualmente para corregir formato | — |
| Intervención 3 | — | — |
| **Total** | **2 intervenciones** | **1 intervención** |

El harness detectó automáticamente 6 errores de formato en 6 archivos (incluido `schema.ts` preexistente). Sin harness no hubo detección automática de nada.

---

### 4. Qué habría que arreglar antes de enseñárselo al equipo

**CON harness:**
- Nada crítico. El formato quedó correcto tras `npm run format`. Los nombres de archivo y las importaciones siguen las convenciones.

**SIN harness:**
- Renombrar `Task.ts` → `task.ts` y `TasksController.ts` → `tasks_controller.ts`
- Cambiar las importaciones en `routes.ts` de ruta relativa a alias de `package.json`
- Extraer la validación de status a un archivo en `app/validators/`
- Cambiar el modelo para que extienda `TaskSchema` del schema autogenerado en vez de definir columnas a mano (riesgo de desincronización con la base de datos)

---

## Parte B — Las tres líneas

### 1. Qué piezas monté y cuál costó más

Piezas montadas:
- `AGENTS.md` en la raíz — archivo de instrucciones con convenciones y prohibiciones
- `harness/check.cmd` — script verificador que corre format, lint y tests al terminar

Lo que costó más: el `check.cmd`. No fue difícil técnicamente, pero ajustar el orden correcto (format antes que lint, para que Prettier arregle antes de que ESLint valide) me llevó un ciclo extra. Además descubrí que ESLint fallaba en un archivo preexistente (`schema.ts`) que no había tocado, lo que obligó a entender que el script debía formatear primero.

### 2. La primera diferencia que vi entre las dos salidas, y cómo la noté

La primera diferencia la noté en los nombres de los archivos creados. En la corrida CON harness el agente generó `task.ts` y `tasks_controller.ts` (snake_case). En la corrida SIN harness generó `Task.ts` y `TasksController.ts` (PascalCase). Lo noté al revisar los archivos creados en el explorador antes de abrir ninguno: los nombres eran distintos sin haber cambiado el ticket ni una palabra.

### 3. Algo que dejé escrito en el harness y que el agente no cumplió igualmente

En el `AGENTS.md` dejé escrito: _"Usar los alias de importación definidos en `package.json` (ej: `#models/task`, `#controllers/tasks_controller`)"_. La corrida CON harness lo respetó en el modelo y el validator, pero en `routes.ts` igualmente usó el objeto `controllers` autogenerado — que es correcto para AdonisJS — en lugar del alias directo. La instrucción estaba ahí, el agente la leyó, pero interpretó que el mecanismo de `controllers` autogenerado era equivalente y lo aplicó sin avisar que estaba tomando esa decisión. No fue un error, pero tampoco fue exactamente lo que la regla decía.
