# Comparación: con harness vs. sin harness

**Ticket** (mismo texto, palabra por palabra, en las dos copias): "Implementar registro e inicio de sesión".

**Piezas de harness** (solo en la copia con harness): `AGENTS.md`/`CLAUDE.md` (orienta antes) · hook `Stop` con lint+typecheck (comprueba después, automático) · subagente `adversarial-reviewer` (comprueba después, semántico).

| | Con harness | Sin harness |
|---|---|---|
| **1. Archivos tocados** | 25 (11 modificados/borrados + 14 nuevos) | 6 (2 modificados + 4 nuevos) |
| **2. Convenciones** | Tenía convenciones escritas y las siguió: no tocó `backend/`, `Bearer` token, base URL completa, shadcn/ui montado como pedía `AGENTS.md`, TS estricto limpio, deps justificadas, invocó al revisor (y no se fió ciegamente de él) | No había ninguna convención escrita en ningún sitio — y aun así: no tocó `backend/`, `Bearer` token, base URL completa, CSS plano reutilizando variables existentes, token en `localStorage` (igual que la otra copia). Único fallo: no verificó con navegador real |
| **3. Intervenciones** | 1: Arreglar a mano el `tsconfig` tras 6 bloqueos idénticos del hook que el agente no tradujo en corrección | 2: Intervenciones de corrección de errores (mensajes de error en inglés, botón de pestaña invisible) |
| **4. Qué arreglaría a mano** | Nada — verificado con build, lint, tsc y E2E real (Playwright) | Nada, tras los 2 prompts de seguimiento — verificado igual en navegador |

---

# Parte B: las tres líneas

1. **Qué piezas montaste y cuál te costó más de lo que esperabas.**
Monté `AGENTS.md`/`CLAUDE.md`, un hook `Stop` (lint+typecheck) y un subagente `adversarial-reviewer`. La que más me costó fue el AGENTS.md por el desconocimiento de las convenciones del proyecto y de la tecnología utilizada, tuve que investigar sobre las convenciones y los comandos. 

2. **La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla.**
La más clara la vi probando las dos apps a mano en el navegador: En la versión sin harness los botones de login e iniciar sesión no se veían bien y los mensajes de error estaban en inglés y en crudo. En la versión con harness todo estaba correcto. 

3. **Algo que dejaste escrito en el harness y que el agente no cumplió igualmente.**
No fue una regla que se saltara, sino una que cumplió a medias: el hook detectó un problema de `tsconfig` seis veces, pero el agente nunca tradujo ese feedback en una corrección por sí solo. La comprobación automática subió la probabilidad de detectar el problema, pero no garantizó que se resolviera solo — tuve que intervenir manualmente.
