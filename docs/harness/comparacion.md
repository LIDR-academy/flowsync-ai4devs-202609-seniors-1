# Comparación: con harness vs. sin harness

Encargo idéntico en las dos copias: ticket de Jira "Implementar login en
el frontend", mismo texto palabra por palabra. Modelo: Claude Opus 5 (1M
context) en Claude Code. Backend AdonisJS ya existente; el trabajo cae
entero en el frontend (partía del scaffold de Vite).

## Tabla

| Casilla | CON harness | SIN harness |
|---|---|---|
| Archivos de código tocados | 7: index.html, App.css, App.tsx, index.css + components/, hooks/, lib/ | 8: index.html, App.css, App.tsx, main.tsx + auth/, components/, lib/, .env.example |
| Dónde puso la sesión | hooks/useAuth.ts (hook directo, no toca main.tsx) | src/auth/ (context + AuthProvider + hook), envolviendo la app en main.tsx |
| Convenciones del proyecto | Componentes en components/, todo .tsx, sin deps nuevas, oxlint limpio, backend revertido a limpio | Todo .tsx, sin deps nuevas, oxlint limpio, backend limpio; creó carpeta src/auth/ (no prevista en CLAUDE.md) |
| Exploró el backend real | Sí (curl + leyó node_modules de @adonisjs/auth y vinejs) | Sí (curl contra el backend en marcha) |
| Revisión adversarial | Sí: adversarial-reviewer, 6/6 reglas OK, encontró un bug funcional en useAuth (un fallo de red borra la sesión) | No hubo revisor: nadie auditó la salida |
| Veces que intervine | ~4 (2 prompts: ticket + lanzar revisor; 2 permisos: "Not now" de Chrome, "no apliques" el arreglo) | 1 (solo el ticket; corrió sola de principio a fin) |
| Qué arreglaría a mano | El bug de sesión ante fallo de red (useAuth.ts); el Board es un placeholder de 3 columnas vacías | El Board es placeholder; sin auditoría, posibles fallos sin detectar |

## Notas
- Las dos copias regeneraron archivos en backend/.adonisjs/ al arrancar
  el backend para verificar. La copia con harness lo detectó y lo
  revirtió con `git checkout -- backend/`; ambas acabaron con el backend
  limpio.
- La copia sin harness resultó muy competente por su cuenta. La
  diferencia grande no fue la calidad bruta, sino la estructura (hooks/
  contenido vs. carpeta auth/ nueva) y el proceso: el harness añadió una
  segunda mirada crítica que la pelada no tuvo.

---

# Parte B: las tres líneas

1. Piezas montadas y cuál costó más. Monté CLAUDE.md (arquitectura del
   proyecto generada con /init, más secciones Prohibido y Proceso escritas
   a mano) y el subagente adversarial-reviewer. Lo que más rato me llevó
   fue redactar las reglas de "Prohibido"/"Proceso" concretas y
   verificables — no vagas — para que el revisor tuviera algo medible
   contra lo que contrastar.

2. Primera diferencia que vi y dónde. Comparando el git status de las dos
   copias vi que la pelada había creado una carpeta src/auth/ con tres
   archivos y modificado main.tsx para envolver la app en un AuthProvider,
   mientras la copia con harness metió toda la sesión en un único
   hooks/useAuth.ts sin tocar main.tsx. Lo noté leyendo los dos git
   status, no el código.

3. Algo escrito en el harness que el agente no cumplió (del todo). Escribí
   en CLAUDE.md "no toques backend/.adonisjs/". El agente cruzó la regla a
   mitad de proceso: arrancó el backend para verificar la API y eso
   regeneró esos archivos. La regla no evitó que los tocara. Sí hizo que,
   estando presente, el agente lo detectara y lo revirtiera con `git
   checkout -- backend/` antes de terminar. O sea: la instrucción no
   garantizó que no pasara, solo subió la probabilidad de que se
   corrigiera. La copia pelada, sin la regla, no tuvo motivo para
   comprobarlo.