# prompts.md — Registro de prompts lanzados

> Proyecto: flowsync-ai4devs  
> Módulo: S1 — Harness  
> Fecha: 2026-09-17

---

## Corrida 1 — CON harness

**Modelo:** Abacus AI  
**Herramienta:** Chat Abacus  
**Resultado:** Implementación completa con convenciones respetadas

### Prompt lanzado

```
Modelo: Abacus AI
Herramienta: Chat Abacus
Corrida: CON harness

--- PROMPT ---
Contexto del proyecto (AGENTS.md):
[pega aquí el contenido completo de tu AGENTS.md]

Ticket a implementar:

Título: Filtrar tareas por estado desde la API

Descripción:
Los usuarios necesitan poder ver solo las tareas que están en un estado concreto 
(por ejemplo, solo las pendientes o solo las completadas). Hoy el endpoint de 
listado devuelve todas las tareas sin opción de filtrar.

Lo que se espera:
- El endpoint existente de listado de tareas acepta un parámetro opcional `status` 
  en la query string.
- Si se pasa `status`, devuelve solo las tareas con ese estado. Si no se pasa, 
  devuelve todas (comportamiento actual).
- La respuesta mantiene el mismo formato que hoy.

Criterios de aceptación:
- GET /tasks?status=pending devuelve solo tareas pendientes.
- GET /tasks?status=completed devuelve solo tareas completadas.
- GET /tasks sin parámetro sigue funcionando igual.
- Los valores de estado inválidos devuelven un error claro.

Instrucciones:
- Dime exactamente qué archivos hay que crear o modificar.
- Muéstrame el código completo de cada cambio.
- Al final lista los comandos que debo ejecutar para verificar.
--- FIN PROMPT ---
```

### Observación

El placeholder `[pega aquí el contenido completo de tu AGENTS.md]` fue enviado sin reemplazar por el contenido real del AGENTS.md. El agente igualmente pidió explorar la estructura del proyecto antes de responder. Este detalle es información: el prompt de contexto llegó vacío y el agente tuvo que reconstruir el contexto preguntando.

### Intervenciones necesarias

1. **Directorio equivocado:** `node ace migration:run` ejecutado desde `database/migrations/` en vez de `backend/`. Error: `Cannot find module 'ace'`.
2. **Formato:** El harness detectó 6 errores de formato (Prettier) en 6 archivos. Se corrigió con `npm run format` en `backend/`.

---

## Corrida 2 — SIN harness

**Modelo:** Abacus AI  
**Herramienta:** Chat Abacus  
**Resultado:** Implementación funcional pero con violaciones de convenciones

### Prompt lanzado

```
Modelo: Abacus AI
Herramienta: Chat Abacus
Corrida: SIN harness

--- PROMPT ---
Título: Filtrar tareas por estado desde la API

Descripción:
Los usuarios necesitan poder ver solo las tareas que están en un estado concreto 
(por ejemplo, solo las pendientes o solo las completadas). Hoy el endpoint de 
listado devuelve todas las tareas sin opción de filtrar.

Lo que se espera:
- El endpoint existente de listado de tareas acepta un parámetro opcional `status` 
  en la query string.
- Si se pasa `status`, devuelve solo las tareas con ese estado. Si no se pasa, 
  devuelve todas (comportamiento actual).
- La respuesta mantiene el mismo formato que hoy.

Criterios de aceptación:
- GET /tasks?status=pending devuelve solo tareas pendientes.
- GET /tasks?status=completed devuelve solo tareas completadas.
- GET /tasks sin parámetro sigue funcionando igual.
- Los valores de estado inválidos devuelven un error claro.

Instrucciones:
- Dime exactamente qué archivos hay que crear o modificar.
- Muéstrame el código completo de cada cambio.
- Al final lista los comandos que debo ejecutar para verificar.

El proyecto tiene backend en: C:\Users\eg777\flowsync-sin-harness\backend\
--- FIN PROMPT ---
```

### Observación

Sin AGENTS.md, el agente generó código funcional pero sin respetar las convenciones del proyecto: nombres de archivo en PascalCase, importaciones con rutas relativas en vez de alias, modelo con columnas definidas manualmente en vez de extender el schema autogenerado, y sin archivo de validator separado.

### Intervenciones necesarias

1. **Foreign key error:** Al insertar tareas de prueba, falló por no existir un usuario en la base de datos. Fue necesario crear un usuario primero antes de poder insertar tareas.
