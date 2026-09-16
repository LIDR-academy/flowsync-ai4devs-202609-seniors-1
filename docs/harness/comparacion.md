# Comparación: con harness vs. sin harness

**Ticket** (mismo texto, pero en la copia sin harness sin referenciar AGENTS.md

**Piezas de harness** (solo en la copia con harness): `AGENTS.md`/`CLAUDE.md`

**Con Harness**

Implementó todo. Pasó linters. Lanzó tests backend y frontend en el navegador. Al lanzarlos detectó bugs los resolvió y volvió a lanzar la batería de tests. 
Increíble. Zero shot y funcionó

Coste:
- claude-haiku-4-5: 1.7k input, 29 output, 0 cache read, 0 cache write ($0.0018)                                                                                                                                                                                                                           
- claude-opus-5: 28.5k input, 105.7k output, 15.0m cache read, 438.6k cache write ($14.16)                                                                                                                                                                                                              
- Prompt cache (main): 92 requests · 97% of input tokens from cache · 1 miss

1. Archivos tocados. 11 modificados, 23 nuevos
2. Convenciones: No tocó backend, los 3 gates pasan (tsc --strict 0, oxlint 0, build 0), 13 dependencias referenciadas,  Migration-first, nunca editar database/schema.ts, Salida de API por *Transformer , Validación con VineJS en #validators/*, fechas con Luxon,Auth por access tokens, perfil por transformer, Usar componentes de shadcn/ui, Preguntar antes de implementar    
3. Intervenciones: 2, simplemente decidir en el plan 4 cosas, y qué librería instalar (elegí react-hook-form + zod)
4. Arreglos a mano: Nada — verificado con build, lint, tsc y E2E real (Playwright). Lo único que no ha hecho es Prettier

**Sin harness**

También implementó todo. Pasó menos linters. Sólo lanzó tests frontend manuales en el navegador.  

Coste:
- claude-haiku-4-5: 1.7k input, 30 output, 0 cache read, 0 cache write ($0.0019)                                                                                                                                                                                                                  
- claude-opus-5: 36.2k input, 105.7k output, 10.1m cache read, 365.7k cache write ($11.02)                                                                                                                                                                                                     
- Prompt cache (main): 68 requests · 97% of input tokens from cache · 1 miss

1. Archivos tocados. 9 modificados, 22 nuevos, 5 borrados (demo Vite)
2. Convenciones: backend intacto (0 archivos tocados, verificado con git status backend/), componentes de shadcn/ui, preguntó antes de implementar, y fue al validador real en vez de asumir campos — de ahí salieron passwordConfirmation, el fullName que es nullable() pero no optional(), y el tope de 32 
  en contraseña.                                                                                                                                                                                                                                                                                     
  Gates: 2, no 3. npm run build (tsc -b) y oxlint pasan. No hay strict: true en ningún tsconfig de este repo
Realmente en el harness algunas convenciones estaban sólo en el AGENTS.md y no en el prompt, así que no es justo compararlos. 
3. Intervenciones: 1, simplemente decidir en el plan 4 cosas
4. Arreglos a mano: 
  - Cero tests automáticos. Esta es la diferencia grande. Con harness sí lanzó una batería, detectó bugs, los arregló y volvió a lanzarla. Aquí la verificación E2E fue real (6 flujos en navegador: duplicado, credenciales malas, registro, login, persistencia tras F5, backend caído) pero manual 
    y no reproducible — no queda ni un archivo de test que otro pueda ejecutar).                                                                                                                                                                                    
  - Sin Prettier (igual que con harness).                                                                                                                                                                                             
  - Usuarios de prueba en backend/tmp/db.sqlite3


# Parte B: las tres líneas

1. **Qué piezas montaste y cuál te costó más de lo que esperabas.**
Monté sólo el prompt y el AGENTS.md (y el CLAUDE.md) básico.
No me costó mucho ya que simplemente copié lo que había en el repo del mentor y lo adapté a mi repo. 

2. **La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla.**
Las salidas fueron muy similares a nivel de interfaz, pero más completa con harness.
Ambos se testearon en el navegador y ambos pasaron los tests.
Harness mostró una ejecución más disciplinada y una adaptación más limpia ante inconsistencias del tooling, además de una verificación final más exhaustiva.
Trató AGENTS.md como fuente de requisitos, poniendo más énfasis en respetar las restricciones existentes antes de diseñar la solución y creando una checklist de verificación bastante más exhaustiva.
El beneficio observable del harness aquí es de proceso y consistencia, no de capacidad bruta para resolver el ticket.

3. **Algo que dejaste escrito en el harness y que el agente no cumplió igualmente.**

AGENTS.md:14 dice "ESLint + Prettier" — el frontend no tiene ninguno de los dos. Esa línea solo es cierta para backend/. El frontend usa oxlint y no trae Prettier ni script format. No instalé ninguno (habría sido una dependencia nueva no pedida); en su lugar repliqué el estilo a mano, y lo he          
  verificado programáticamente arriba. Es una inconsistencia preexistente de AGENTS.md, no algo que rompiera — pero conviene corregir esa línea o añadir Prettier al frontend.                                                                                                                                      
                                                                                                                                                                                                                                                                                                                    
Las dependencias reales difieren del plan aprobado. El plan preveía Radix + clsx/tailwind-merge; el shadcn actual (v4) usa Base UI y un paquete cn. De las 13 nuevas, solo 4 fueron decisión mía —react-hook-form, zod, @hookform/resolvers (tu elección) y react-router—; las otras 9 las metió el CLI de     
  shadcn y todas están importadas por código generado o por index.css. Descarté sonner porque los errores se muestran inline y no estaba en la lista justificad