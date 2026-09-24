# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repositorio

FlowSync es el proyecto de práctica de un curso: gestión de tareas en equipo. Es un monorepo con dos apps independientes que no comparten dependencias ni tooling:

- **`backend/`** — API en AdonisJS 7 + Lucid (SQLite) + TypeScript.
- **`frontend/`** — React 19 + Vite, aún en el andamiaje inicial (la plantilla de Vite sin personalizar).

Actualmente el backend solo implementa auth (signup/login/logout/perfil vía tokens); el frontend todavía no consume esa API. El ejercicio del curso en este punto (rama `s1/start`) pide implementar el login en el frontend contra este backend.

Este repo se trabaja sobre un **fork personal**, nunca sobre un clon directo del curso (`LIDR-academy/flowsync-ai4devs`), que es de solo lectura para el alumno.

## Comandos

### Backend (`cd backend`)

```bash
npm install
cp .env.example .env
node ace generate:key       # genera APP_KEY, solo la primera vez
node ace migration:run      # crea/actualiza tmp/db.sqlite3
npm run dev                 # node ace serve --hmr, arranca en :3333
npm run build                # node ace build
npm test                     # node ace test (suites unit + functional, Japa)
npm run lint                  # eslint .
npm run format                 # prettier --write .
npm run typecheck                # tsc --noEmit
```

Para correr un solo test file con Japa: `node ace test tests/functional/<archivo>.spec.ts` (o `tests/unit/...`). Las suites están definidas en `adonisrc.ts` (`unit` → `tests/unit/**/*.spec.ts`, `functional` → `tests/functional/**/*.spec.ts`); hoy no existe todavía carpeta `tests/unit` ni `tests/functional` con specs.

Tras tocar un modelo o una migración, corre `node ace migration:run` de nuevo — el archivo `database/schema.ts` se **regenera automáticamente** a partir del esquema real de la base de datos y nunca debe editarse a mano (lleva ese aviso en cabecera).

### Frontend (`cd frontend`)

```bash
npm install
npm run dev       # vite, arranca en :5173
npm run build     # tsc -b && vite build
npm run lint       # oxlint
npm run preview     # vite preview
```

Backend y frontend se arrancan en dos terminales separadas; el frontend en `:5173` necesita el backend corriendo en `:3333` para cualquier llamada a la API. CORS ya está preparado para leer `CORS_ORIGIN` en `backend/.env` (por defecto comentado; añadir `http://localhost:5173` si el frontend empieza a hacer fetch al backend).

No hay comando de test para el frontend todavía (sin Vitest/Jest configurado).

## Arquitectura del backend

Sigue la estructura estándar de AdonisJS 7 con imports mapeados en `package.json` bajo `imports` (subpath imports de Node, tipo `#controllers/*`, `#models/*`, `#validators/*`, etc. — usar siempre estos alias en vez de rutas relativas largas).

Flujo de una request de auth:

1. **`start/routes.ts`** define las rutas bajo `/api/v1`, agrupadas en `auth` (signup, login — públicas) y `profile`/`account` (perfil, logout — protegidas por `middleware.auth()`).
2. **Controllers** (`app/controllers/`) son finos: validan el request con un `vine` validator, delegan en el modelo `User`, y devuelven `serialize(...)` de un transformer. `new_account_controller.ts` (signup), `access_tokens_controller.ts` (login/logout), `profile_controller.ts` (perfil del usuario autenticado).
3. **Validators** (`app/validators/user.ts`) centralizan las reglas de `email`/`password` compartidas entre signup y login usando VineJS.
4. **Modelo `User`** (`app/models/user.ts`) extiende el `UserSchema` autogenerado (ver abajo) más `withAuthFinder` para `verifyCredentials`, y expone `accessTokens` (tokens de acceso vía `DbAccessTokensProvider`) y un getter `initials` derivado de `fullName`/`email`.
5. **Transformers** (`app/transformers/user_transformer.ts`) controlan qué campos del modelo se serializan hacia el cliente (usa `BaseTransformer` de `@adonisjs/core`, no serializar el modelo directamente).
6. **Auth** (`config/auth.ts`): dos guards — `api` (tokens, guard por defecto, stateless) y `web` (sesión, para futuro uso en navegador). Las rutas protegidas usan `middleware.auth()` (por defecto el guard `api`).

Puntos a tener en cuenta:

- **`database/schema.ts` es generado** por `node ace migration:run` a partir de las migraciones reales (`database/migrations/`) — define las clases `*Schema` base (`UserSchema`, `AuthAccessTokenSchema`) que los modelos de `app/models/` extienden con `compose(...)`. Nunca editar este archivo directamente ni añadir columnas ahí: se pierden en la siguiente migración. Los cambios de esquema van en una nueva migración.
- **`database/schema_rules.ts`** permite afinar cómo se generan esos schemas (tipos, nombres) por columna; hoy está vacío.
- El middleware stack está en dos niveles (`start/kernel.ts`): middleware de **server** (corre en toda request, incluso sin ruta — CORS, JSON forzado) vs middleware de **router** (bodyparser, sesión, shield, auth) vs middleware **named** (`auth`, aplicado explícitamente por ruta/grupo).
- El proyecto usa **Tuyau** (`@tuyau/core`) para generar un registro tipado de rutas/controllers (`generateRegistry()` en `adonisrc.ts`, salida en `.adonisjs/`) — pensado para consumo tipado desde un cliente TS (el frontend, cuando lo integre).

## 🛑 Flujo de Control de Calidad (Revisor vs. Desarrollador)
Antes de dar por terminada cualquier tarea, se debe ejecutar un proceso de revisión sobre los cambios locales (`git diff`):

1. **El Rol del Revisor:** Claude actuará momentáneamente como un Revisor de Código (Code Reviewer). Analizará el `git diff` local de manera objetiva y estricta, buscando bugs, problemas de tipado o malas prácticas en el monorepo.
2. **Generación de Feedback:** El Revisor NO modificará ningún archivo directamente. En su lugar, listará de forma compacta en la terminal los hallazgos encontrados (Críticos o Mejoras).
3. **El Rol del Desarrollador (Agente Principal):** El agente principal tomará ese feedback impreso, procesará las observaciones y modificará los archivos necesarios para resolver los puntos críticos señalados.
4. **Ciclo de Cierre:** Este bucle se repite hasta que el `git diff` no presente errores críticos.
