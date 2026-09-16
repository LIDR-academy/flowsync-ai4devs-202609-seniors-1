| - | Con harness | Sin harness |
|-----------------------|-----------|-----------|
| Cantidad de ficheros  |    36       |   12  |
| Convenciones no respetadas    | 1. RegisterForm.tsx duplica estado de servidor en useState<br>2. AuthPage.tsx reimplementa un chequeo de auth fuera de src/routes/guards/<br>3. No verificó si el hook de PostToolUse realmente se ejecutó  |    |
| Convenciones respetadas    |  Todas las demás   |           |
| Intervenciones    | 2 para indicar que podía instalar dependencias iniciales sin necesidad de aprobación  | 1 para indicar que ejecutase el plan       |
| Arreglar a mano    | problemas de colores en campos con el fondo  | No me creó ningún test aunque si ejecutó tests contra el navegador Chrome      |

### Piezas montadas

.claude/commands/jira-ticket.md
AGENTS.md
CLAUDE.md
frontend/AGENTS.md
frontend/CLAUDE.md
frontend/.claude/hooks/post-edit-check.sh

La que más me ha costado es la de frontend/AGENTS.md sobre todo porque no soy experto en desarrollo front bajo React + Vite

### Diferencia entre las dos salidas
Al ejecutar los test contra el navegador Chrome la diferencia visual fue abismal

### Algo del harness que no se cumplió
1. **Violación real** — RegisterForm.tsx duplica estado de servidor en useState
   frontend/AGENTS.md dice: "Estado servidor: TanStack Query para todo lo que venga de la API. NUNCA duplicar ese estado en useState/Zustand 'por si acaso'."
   En RegisterForm.tsx se agregó const [formError, setFormError] = useState<string | null>(null) y se rellena a mano en el catch del submit — cuando ese mismo error ya vive en signupMutation.error (TanStack Query). Es inconsistente y va contra la regla explícita.

2. **Discutible** — AuthPage.tsx reimplementa un chequeo de auth fuera de src/routes/guards/
   La regla dice "rutas protegidas pasan por el guard existente en src/routes/guards/, no reimplementar el check de auth en cada página". El RequireAuth cumple eso para proteger /. Pero en AuthPage añadió por su cuenta (no lo pedía el ticket), un segundo chequeo inline (isAuthenticated leído de useAuthStore para redirigir lejos de /login si ya hay sesión).

3. No verificó si el hook de PostToolUse realmente se ejecutó pero detectó que probablemente está roto
   frontend/CLAUDE.md dice que ese hook formatea/lintea/corre tests solo, y que si reporta fallos hay que corregirlos, no ignorarlos.

