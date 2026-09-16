# Comparación: con harness vs sin harness

- **Ticket:** FLOW-5 — "Implementa el login y el registro consumiendo el backend de auth ya existente."
- **Tarea:** generar un plan de implementación en cada copia. **No se implementó nada**: se comparan los dos planes.
- **Modelo:** Sonnet 5 · **Herramienta:** Claude Code.

## Parte A — La comparación

### 1. Archivos que propone tocar (contados)
- **CON harness: 13** (11 nuevos + 2 editados).
- **SIN harness: 14** (9 nuevos + 2 editados + **3 borrados**).
- Diferencia: la copia pelada propuso **borrar los assets huérfanos** del scaffold (`react.svg`, `vite.svg`, `hero.png`); la de harness no los mencionó.

### 2. Convenciones respetadas y no respetadas
- **Ambas respetaron:** no tocar `backend/`, no instalar librerías sin justificar, las reglas exactas del **validador real** (`email` ≤254, `password` 8–32, `passwordConfirmation`, `fullName` nullable), usar el **cliente Tuyau**, y el mapeo de errores 422 por campo.
- **Ninguna siguió una convención de estructura de frontend**, porque no existía ninguna escrita: el `CLAUDE.md` documenta solo el backend y el frontend era el scaffold vacío. Cada copia **inventó su propia estructura**: CON harness usó `src/features/auth` + `src/features/account`; SIN harness usó `src/components/` plano.
- La copia pelada, además, se apoyó en una convención presente en el **propio código**: el campo `exports` `"./registry"` que declara el backend (dependencia `file:../backend`), en lugar del path alias a `.adonisjs/client/registry` que propuso la de harness.

### 3. Cuántas veces tuve que intervenir
- **0 veces en ambas copias.** Las dos produjeron el plan de una sola pasada, sin necesidad de corregir, aclarar ni repetir el encargo.

### 4. Qué me tocaría arreglar a mano antes de enseñárselo a alguien
- En **ambos** planes: verificar que la resolución de tipos de Tuyau entre carpetas (frontend → backend) compila con el `tsconfig` actual del frontend; ninguno lo confirmó (no se puede saber solo leyendo el código).
- En **ambos**: confirmar contra el backend real la forma exacta del error de **credenciales inválidas** en login (no está tipado en el registry).
- Al ser planes y no código, "arreglar" aquí = resolver esos puntos abiertos antes de implementar.

### Diferencia de comportamiento observada
- La copia **CON harness** terminó **pidiendo aprobación explícita** ("¿ajusto algo antes de pasar a la fase de implementación?") — efecto de la regla de proceso *"planifica → aprobación → ejecución"*.
- La copia **SIN harness** terminó **directamente en el plan**, sin ofrecer siguiente paso.

### Lectura general (honesta)
Los dos planes salieron **muy parecidos en calidad**. El harness no abrió una gran brecha en este caso porque: (a) el prompt manual de la copia pelada ya llevaba las 6 partes con las mismas pistas (validador real, Tuyau, "verifica contra el código"); (b) ambas copias tienen el mismo código para leer; y (c) el `CLAUDE.md` era casi todo de backend, así que aportó poca guía en una tarea de **frontend**. La diferencia más clara fue de **proceso** (la pausa de aprobación), no de contenido del plan.

## Parte B — Las tres líneas

1. **Hasta qué pieza llegué / la que más me costó:** Monté las **8 piezas** del harness (completo). La que más me costó fue el **hook de Prettier**, por un problema de Windows (no tener `pwsh` instalado), que el agente resolvió solo usando `powershell.exe`.

2. **Primera diferencia que vi y en qué me fijé:** La copia con harness **se paró a pedirme aprobación** antes de implementar, mientras que la pelada **terminó directamente en el plan**. Me fijé en el **final de cada salida**: una preguntaba "¿ajusto algo antes de implementar?" y la otra no ofrecía siguiente paso.

3. **Algo que escribí en el harness y que el agente no cumplió igualmente:** El `CLAUDE.md` pedía "respetar las convenciones del proyecto", pero como esas convenciones eran **solo de backend**, la copia con harness **inventó igualmente su propia estructura de frontend**: la guía del harness no llegó a la parte del código donde de verdad se trabajaba.
