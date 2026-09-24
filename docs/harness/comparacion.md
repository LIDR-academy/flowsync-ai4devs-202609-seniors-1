# Comparación con harness vs. sin harness (Implementar login en el frontend)

## Encargo lanzado en ambos casos:

```text
Implementa el login y el registro consumiendo el backend de auth ya existente.

El frontend necesita una página de login que:

1. Acepte email y contraseña
2. Haga POST a /auth/login (backend ya está listo)
3. Guarde el token de acceso en sessionStorage
4. Redirija al dashboard si login es exitoso
5. Muestre errores claros si falla

Sabes que terminaste cuando:
    - El registro llama a POST /api/v1/auth/signup y el login a POST /api/v1/auth/login.
    - Tras login exitoso, redirige a una vista protegida que consuma GET /api/v1/account/profile.
    - Credenciales inválidas o email ya registrado muestran un mensaje claro, no un error genérico.
	
No toques el backend — el auth ya existe. No instales una librería de formularios sin justificarlo.

Usa el stack del proyecto: React 19, Vite, componentes en /src/components.
Usa los componentes de shadcn/ui. Convenciones en AGENTS.md.

Mantén alineación con los transformers del backend.

Si el ticket no especifica un campo del formulario, revisa el validador real del backend antes de asumir.
```

En la copia **con harness** llegó al agente desde Jira, a través del MCP de Atlassian, mediante el skill `/priority-ticket`

 En la copia **sin harness** se escribió a mano ese mismo encargo directamente en el prompt.

## Parte A

### Archivos modificados

**Con harness:**

Nuevos (22):

| Carpeta | Ficheros |
| --- | --- |
| `.` (raíz) | .gitattributes |
| `.githooks/` | pre-commit |
| `frontend/` | .env.example · vitest.config.ts |
| `frontend/src/services/` | types.ts · tokenStorage.ts · http.ts · auth.ts · http.test.ts · tokenStorage.test.ts |
| `frontend/src/auth/` | AuthContext.ts · AuthProvider.tsx · useAuth.ts · AuthProvider.test.tsx |
| `frontend/src/components/` | ProtectedRoute.tsx · PublicOnlyRoute.tsx · SessionLoading.tsx · ProtectedRoute.test.tsx |
| `frontend/src/pages/` | LoginPage.tsx · HomePage.tsx · LoginPage.test.tsx |
| `frontend/src/test/` | setup.ts |

Modificados (9):

| Carpeta | Ficheros |
| --- | --- |
| `.` (raíz) | AGENTS.md |
| `frontend/` | .gitignore · package.json · package-lock.json · vite.config.ts |
| `frontend/src/` | App.tsx · main.tsx · App.css · index.css |

Eliminados(3):

| Carpeta | Ficheros |
| --- | --- |
| `frontend/src/assets/` | hero.png · react.svg · vite.svg |

**Sin harness:**

Nuevos (20):

| Carpeta | Ficheros |
| --- | --- |
| `frontend/src/features/auth/` | `api.ts` · `types.ts` · `auth-provider.tsx` · `session.ts` · `auth-context.ts` · `use-auth.ts` |
| `frontend/src/components/auth/` | `SignupForm.tsx` · `LoginForm.tsx` · `ProtectedRoute.tsx` · `FormAlert.tsx` · `FieldError.tsx` |
| `frontend/src/components/ui/` | `card.tsx` · `alert.tsx` · `button.tsx` · `input.tsx` · `label.tsx` |
| `frontend/src/pages/` | `DashboardPage.tsx` · `LoginPage.tsx` · `SignupPage.tsx` |
| `frontend/src/lib/` | `utils.ts` |

Modificados (9):

| Carpeta | Ficheros |
| --- | --- |
| `frontend/src/` | `App.tsx` · `main.tsx` · `index.css` |
| `frontend/` | `vite.config.ts` · `tsconfig.app.json` · `package.json` · `package-lock.json` · `index.html` · `README.md` |

Eliminados (5):

| Carpeta | Ficheros |
| --- | --- |
| `frontend/src/` | `App.css` |
| `frontend/src/assets/` | `hero.png` · `react.svg` · `vite.svg` |
| `frontend/public/` | `icons.svg` |

### Convenciones del proyecto respetadas

**Con harness:**

 ✅ **Backend intacto** — el plan no toca backend/; sin rutas, validadores, transformers ni migraciones nuevas.
- ✅ **Sin cambios de esquema** — no hay migraciones en este ticket, luego la regla migration-first no entra en juego.
- ✅ **Capa de servicios única** en /src/services/; ningún componente hace fetch directo.
- ✅ **/src/components/*** alberga las guardas reutilizables, como pide el ticket.
- ✅ **Estado alineado con el Transformer** — los 6 campos exactos de UserTransformer, verificados en respuesta real.
- ✅ **Dependencia nueva justificada** (react-router) según AGENTS.md.
- ✅ **CORS** ya permite el origen de Vite en dev (origin: app.inDev ? true : []), verificado en config/cors.ts.

**Sin harness:**

- ✅ **Backend intacto** — sin rutas, validadores, transformers, modelos ni migraciones nuevos. `backend/app/` sin un solo cambio de contenido y ningún fichero untracked en `backend/`. Único cambio: `backend/package-lock.json` (−30 líneas), y son todas entradas `libc` (`glibc`/`musl`) que npm elimina al instalar en Windows. `backend/package.json` sin tocar: ruido de plataforma, no un cambio de dependencias.
- ✅ **Sin cambios de esquema** — las 2 migraciones (`create_users_table`, `create_access_tokens_table`) son preexistentes. `database/schema.ts` aparece como
modificado en `git status` pero su diff de contenido está **vacío**: solo LF→CRLF. La
regla migration-first no llega a ponerse a prueba.
- ✅ **`/src/components/*` alberga las guardas reutilizables** — `ProtectedRoute.tsx`,
junto a `LoginForm`, `SignupForm`, `FieldError`, `FormAlert` y `components/ui/*`.
- ✅ **Estado alineado con el Transformer** — los 6 campos exactos de `UserTransformer`
(`id`, `fullName`, `email`, `createdAt`, `updatedAt`, `initials`) coinciden en
`features/auth/types.ts`, con `fullName: string | null` correctamente nullable. El
fichero además documenta de dónde sale cada campo y que `initials` es un getter
computado, no una columna.
- ✅ **CORS** ya permite el origen de Vite en desarrollo (`config/cors.ts:21`,
`origin: app.inDev ? true : []`), verificado. Sin intervención backend.

### Convenciones del proyecto no respetadas

**Con harness:**

- ⚠️ **/src/pages/ es un directorio nuevo** que CLAUDE.md no contempla — solo documenta /src/components/*. Asumo pages/ por claridad; la alternativa es meter todo en components/.
- ⚠️ **Prettier no cubre el frontend.** AGENTS.md declara "Lint/format: ESLint + Prettier" como convención global, pero Prettier solo está instalado en backend/, y el hook pre-commit que configuramos antes tampoco formatea frontend/. Todo el código de este ticket nace fuera del formateo automático.
- ⚠️ **tsconfig.app.json no activa strict.** El compilador no va a forzar el manejo de fullName: string | null; hay que cuidarlo a mano.

**Sin harness:**

- ❌ **No existe `/src/services/`.** La capa HTTP vive en `src/features/auth/api.ts`. El matiz importa: la centralización **sí se cumple** — el único `fetch(` de todo el frontend está en `api.ts:85`, ningún componente ni página llama a la red directamente. Se acertó el patrón y se falló la ubicación.
- ⚠️ **Dependencias nuevas justificadas… contra una regla que aquí no existe.** 8 paquetes (`react-router`, `tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `@tailwindcss/vite`, `tw-animate-css`). Hay justificación escrita en `docs/implementacion-auth.md`, pero es autoimpuesta: **no hay AGENTS.md** que exija el requisito. Y la justificación de Tailwind/shadcn se apoya en que "se pidió" fuera del diff, algo no verificable desde el código.
- ⚠️ **Tres directorios nuevos, no uno:** `/src/pages/`, `/src/features/` y `/src/lib/`. Aquí no hay un CLAUDE.md que los contemple o deje de contemplarlos — la estructura se inventó entera sin criterio documentado con el que contrastarla.
- ⚠️ **Prettier no cubre el frontend — ni el backend.** El frontend usa `oxlint` y no tiene Prettier. Además **no existe `.githooks/`** ni `core.hooksPath` configurado: aquí no hay hook `pre-commit` en absoluto, así que ningún fichero del repo pasa por formateo automático, ni siquiera los de `backend/`.
- ⚠️ **`tsconfig.app.json` no activa `strict`.** Confirmado: no aparece la clave. El
compilador no fuerza el manejo de `fullName: string | null` — aunque en este caso el tipo sí se declaró nullable a mano y se maneja.
- 🔴 **Bug real de sesión** — en `pages/DashboardPage.tsx:30-57` un 401 de `fetchProfile` solo pinta un banner y **no limpia el token ni redirige**, a diferencia de `auth-provider.tsx:26-39`, que en el arranque sí hace `clearToken()`. Token caducado a mitad de sesión = usuario atrapado en un dashboard aparentemente autenticado con un error permanente.

### Cuántas veces tuve que intervenir

**Con harness:**

**1 vez** para solventar decisiones a tomar sobre Cobertura de **Tests** + almacenamiento del **Token**.

**Sin harness:**

**2 veces** para instalar `react-router` y para el setup de **shadcn/ui**.

**Preguntó también** por el uso del **browser**.

### Qué tocaría arreglar a mano antes de enseñarlo al equipo

**Con harness:**

1. El retorno a la ruta pedida pierde query string y fragmento. `ProtectedRoute.tsx:23` guarda el `location` entero, pero `PublicOnlyRoute.tsx:26-27` solo lee `from?.pathname`. Si entras sin sesión a `/?filter=archived#seccion`, tras autenticarte aterrizas en `/` pelado.
2. `HomePage` no tiene ni un test. Es un fallo contra mi propio listón: el plan dice explícitamente que la caída `fullName || initials || email` "hay que cuidarlo a mano y cubrirlo con un test" porque `strict` está desactivado. No lo escribí. Los "46 tests" no tocan ese fichero.
3. `ValidationError` con `fields` vacío deja al usuario sin ningún mensaje. En `http.ts:107` filtro las entradas sin `field`; si el filtro vacía el array, `LoginPage` pinta `{}` de errores de campo y `formError` ya se había puesto a `null`. El formulario deja de enviar y no muestra nada.
4. El criterio 8 no está construido como mecanismo transversal. Solo la rehidratación traduce `UnauthorizedError` en borrar sesión. Funciona porque hoy la única llamada autenticada es `fetchProfile()`. El plan afirma que "cualquier 401 posterior al login descarta la sesión" y eso es más de lo que hay.

**Sin harness:**

🔴 **Crítico 1 — La capa de API no está en `/src/services/`**

Todo el HTTP vive en `frontend/src/features/auth/api.ts`. El matiz es interesante: el código sí centraliza correctamente (ningún `fetch()` se escapa a componentes o páginas), pero lo hace en la ruta equivocada. Se cumple el espíritu, no la convención. El riesgo es de precedente: la siguiente feature inventa `features/tasks/api.ts` y se pierde el punto único de verdad del contrato.

🔴 **Crítico 2 — Desincronización de sesión ante un 401 a mitad de sesión**

En `DashboardPage.tsx:30-57`, un `fetchProfile` fallido solo pinta un banner de error. No limpia el token ni redirige — a diferencia de `auth-provider.tsx:26-39`, que en el arranque sí hace `clearToken()` + redirect. Si el token caduca o se revoca estando ya en `/dashboard`, el usuario queda atrapado en una página aparentemente autenticada con un error permanente; `ProtectedRoute` no lo rescata porque el token sigue en contexto. Arreglo: tratar el 401 en el helper `request()` y disparar el mismo `signOut` en cualquier petición autenticada, no solo en el boot.

🟡 **Avisos**

- 8 dependencias nuevas para un login/signup (`react-router`, Tailwind, shadcn, `lucide-react`…). Hay justificación en `docs/implementacion-auth.md`, pero se apoya en que Tailwind/shadcn "se pidió" fuera del diff — eso necesita confirmación humana, no es verificable desde el código.
- `ApiError.fieldErrors (api.ts:28-36)` descarta en silencio todos los errores menos el primero por campo. Latente hoy, pero el tipo `ApiIssue[]` promete algo que el código no cumple.
- Validación cliente duplicada en `SignupForm.tsx:38-42` (confirmación de contraseña): legítima como atajo de UX, no sustituye al backend.

## Parte B

### 1. **Piezas montadas y cuál costó más:**

Me costó bastante acabar de entender todo el proceso de ejecución de la propia tarea en la copia con harness. Finalmente, intenté que la propia IA me generara un plan de acción. Pero tanto revisar la documentación generada, como analizar las diferentes respuestas de la IA, fue lo que más tiempo me consumió.

### 2. **La primera diferencia que vista entre las dos salidas:**

La primera direfencia que noté fue que la estructura del código frontend generado a nivel de carpetas y los nombres de los archivos fue bastante diferente en ambos casos.

### 3. **Algo que dejé escrito en el harness y que el agente no cumplió igualmente:**

CLAUDE.md indicaba las siguientes reglas de proceso 3 y 4:
> 3. Test locally before committing: npm run test (backend), npm run dev (both).
> 4. Lint before push: npm run lint formats and validates code.

El agente nunca ejecutó ´npm run test´ ni ´npm run lint´ en ´backend/´. Solo los corrió en ´frontend/´.
