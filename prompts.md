# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

---

## Prompt 1

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
me ayudas a darle cuerpo a las SKILLS? el objetivo es montar un harness para este proyecto. Un harness que contiene:
- AGENTS.md
- skills para el ticket y para el commit. Aqui no se que debe de hacer exactmente priority-ticket.
- un agente para refutar la implementacion del codigo
- un hook para formatear el frontend con Prettier
- rglas del proceso al final de AGENTS y CLAUDE.

Esta escrito en el README la infraestructura del harness pero me falta el contenido. En lugar de decirme que poner, enseñame a entender y a que yo lo haga, como un profesor
```

**Qué salió:** una guía de todas las piezas de golpe, con preguntas; demasiado texto de una vez.

## Prompt 2

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pon una configuracion local para /model y /effort de opus y high por defecto. Para que no use las globales. Y luego los agentes usaran cada uno las suyas, es posible?
```

**Qué salió:** verificó las claves en la documentación y creó `.claude/settings.local.json`; los agentes admiten `model` y `effort` en su frontmatter.

## Prompt 3

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
explicame los elementos del harness uno a uno, no me des tanto texto de golpe
```

**Qué salió:** cambió a una pieza por mensaje, empezando por `CLAUDE.md` / `AGENTS.md`.

## Prompt 4

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
porque anthropic quiere usar un nombre mas estandar para el archivo con las instrucciones base? te hgao otra pregunta, si no existiera AGENTS, los agentew leerian CLAUDE, o nada?
```

**Qué salió:** me corrigió (AGENTS.md es un estándar entre herramientas, no de Anthropic) y propuso un experimento para comprobar qué leen los subagentes.

## Prompt 5

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
si en el modelSettings de claude-personal (la conexion de este repo) tiene dos modelos: fable con xhigh y opus con high, que significa? cual se usa por defecto?
```

**Qué salió:** `modelSettings` guarda el esfuerzo por modelo, no elige modelo; sin clave `model`, se usa el de la cuenta.

## Prompt 6

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
si pusiera instrucciones en CLAUDE no incluidas en AGENTS, que pasaria con los agentes?
```

**Qué salió:** Claude Code las ve, otras herramientas no; lo específico de Claude Code va en `CLAUDE.md`.

## Prompt 7

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
porque CLAUDE es el director de orquesta? es decir el manager de los agentes?
```

**Qué salió:** respuesta a medias; las reglas de proceso van en `CLAUDE.md` porque nombran piezas que solo existen en Claude Code.

## Prompt 8

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
sí, pasamos a la pieza 2
```

**Qué salió:** explicación del MCP de Atlassian.

## Prompt 9

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
espera, antes de seguir, veo que hay dos archivos para settings: settings.json y settings.local.json, qe diferencia hay?
```

**Qué salió:** compartido y commiteado frente a personal e ignorado; el local gana.

## Prompt 10

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
anade el contenido de settings.local a settings y borra settings.local. En este caso quiero que en todos los dispositivos se use el mismo modelo y esfuerzo
```

**Qué salió:** funcionó a la primera.

## Prompt 11

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
ahora quiero anadir esto en settings: 
  "statusLine": {
    "type": "command",
    "command": "/Users/elena.pascual.ext/.claude/statusline-valiria.sh",
    "padding": 0
  }
para poder ver un tag del modelo, esfuerzo actuales, el contexto y lo que queda de mi ventana. Me gustaria que el script invocado statusline-valiria.sh estuviera copiado en algun lugar del repo, pero donde? es un hook? que seria?
```

**Qué salió:** no es un hook sino personalización de la interfaz; copió el script a `.claude/` con ruta `$CLAUDE_PROJECT_DIR`.

## Prompt 12

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
cambia el nombre del script de statusline-valiria.sh a solo statusline.sh
```

**Qué salió:** funcionó a la primera.

## Prompt 13

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
sí, cambia el comentario de VALIRIA también
```

**Qué salió:** funcionó a la primera.

## Prompt 14

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pues imagino que en algun momento me pedira que me identifique, pero no se con que credenciales
```

**Qué salió:** explicación de OAuth con `/mcp`; `.mcp.json` es seguro de commitear.

## Prompt 15

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pone conectado
```

## Prompt 16

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
una skill tb tiene frontmatter, los agentes tb no? y los hooks, tb deben de llevar frontmatter?
```

**Qué salió:** skills y agentes sí, hooks no; corrigió una pista anterior (`allowed-tools` preaprueba, no restringe).

## Prompt 17

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pero si las pongo en settings seran para todas las skills no? lo que quiero es que de momento solo la skill priority-ticket no pueda escribir, unicamente leer
```

**Qué salió:** propuso un subagente de solo lectura con `context: fork`.

## Prompt 18

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
hacer un agente para esta skill de momento me parece overkill, no hay manera de acotar una skill?
```

**Qué salió:** dijo primero que los hooks no se documentaban para skills; lo corrigió en el siguiente prompt.

## Prompt 19

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
y una skill con hook pretooluse? podemos usar allowed-tools, disallowed-tools y el hook, que piensas?
```

**Qué salió:** el hook en la skill funciona pero dura toda la sesión; `disallowed-tools` no existe en skills.

## Prompt 20

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
no, en esa sesión no voy a escribir en Jira
```

## Prompt 21

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
pero en el futuro probablemente tenga otra skill que sea /enrich-us o /enrich-ticket, que si escribiran en jira
```

**Qué salió:** tres opciones con su coste (hook + disciplina, subagente, regla `ask` global).

## Prompt 22

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
A por ahora, y lo reviso cuando haga enrich-ticket
```

## Prompt 23

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
lista blanca, es decir, lo unico que puede hacer en jira
```

## Prompt 24

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
1. Get issue type y ver los de mayor priorirdad, luego get issue. Mi duda es, si hay varios tickets con prioridad alta, cual coger?
2. De mpomento confluence no
3. Si, deberia de coincidir con la de allowed-tools. Si no coincidieran, se bloquearian las herramientas que la skill tiene que usar
```

## Prompt 25

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
yo veo estos nombres de tools [Image #2] no los que tu dices
```

**Qué salió:** `/mcp` muestra títulos legibles y `/context` los nombres internos; la etiqueta `read-only` ayuda a elegir.

## Prompt 26

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
mcp__atlassian__getJiraIssue, mcp__atlassian__getJiraProjectIssueTypesMetadata, mcp__atlassian__getConfluenceSpaces, mcp__atlassian__getTransitionsForJiraIssue.
```

## Prompt 27

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
mcp__atlassian__getAccessibleAtlassianResources, mcp__atlassian__atlassianUserInfo
```

## Prompt 28

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
mcp__atlassian__searchJiraIssuesUsingJql
```

## Prompt 29

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
el orden del tablero
```

## Prompt 30

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
prioridad primero y rank para desempatar. No se hacer skills, necesito que la hagas
```

**Qué salió:** escribió `SKILL.md` y `.claude/hooks/jira-readonly.sh`; hook probado, skill sin probar porque Jira no tenía tickets.

## Prompt 31

Enviado mientras Claude trabajaba en el prompt 30.

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
ademas, que no necesito saber jql porque le herramienta de tickets es irrelevvante para mi, hoy puede ser jira, manana linear
```

**Qué salió:** los criterios quedaron en términos neutros y lo específico de Jira en una sección aparte.

## Prompt 32

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
creo que en prompts solo debo apuntar los prompts de implementacion del ticket, no de montaje del arnes
```

**Qué salió:** citó `prompts.md` y el README: los prompts del montaje también cuentan.

## Prompt 33

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
vale, apunta los prompts
```

**Qué salió:** apuntó los 33 prompts de la sesión en este fichero.

## Prompt 34

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
podemos poner un hook para que se vayan apuntando los hooks automaticamente?
```

**Qué salió:** lo interrumpí mientras consultaba la documentación: había escrito «hooks» en vez de «prompts».

## Prompt 35

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
podemos poner un hook para que se vayan apuntando los prompts automaticamente?
```

**Qué salió:** sí, con `UserPromptSubmit`; propuso ponerlo en `settings.local.json`.

## Prompt 36

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
prefiero en settings.json, la copia pelada ya esta hecha y necesito settings.json sincronizado con mis otros equipos
```

**Qué salió:** creó `.claude/hooks/log-prompt.py` y lo registró en `settings.json`.

## Prompt 37

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
haz commit y push. En la proxima sesion creare una skill para hacer commits pas profesional
```

## Prompt 38

**Modelo:** Opus 5 1M High
**Herramienta:** Claude Code

```
quiero que leas bien el ejercicio que tenemos que hacer: ✍️  Ejercicio FlowSync: Monta el harness y mide la diferencia 🔴 — 35min
Antonio Perez
⏱ La fecha límite es Miércoles 16 de Septiembre 2026 al final del día. 

Repositorio: Flowsync


⏱ Lectura ~13 min · 🔴 Obligatoria. Es la última lección del módulo y la que más se subestima: leerla son trece minutos, hacerla lleva bastante más (5 de leer el stack, 15-20 de entorno y unos 45 de la tarea). Todo lo que hay que traer hecho está aquí, y solo aquí. Si algo falla en el setup, avisa a tu TA con antelación, no lo dejes para el minuto 1 del directo.

Cuatro partes. La primera explica cómo funciona el módulo, y conviene leerla aunque tengas prisa. La segunda deja el entorno listo. La tercera es la tarea, que es la que lleva tiempo de verdad. La cuarta es cómo se entrega.

🔁 Cómo funciona este módulo
Hay tres momentos, y saberlos cambia cómo aprovechas cada uno.

1. Lo intentas tú. Sobre el proyecto de aquí abajo, con tu agente y con el reloj puesto. Entregas lo que te salga, con lo que tenga. La entrega a medias no es un problema: este paso no se puntúa por completarlo.

2. Lo ves resuelto en el directo. El mentor monta el harness sobre este mismo proyecto y lanza el mismo tipo de encargo con él y sin él, para que la diferencia se vea en pantalla. Si a ti no te salió, ahí ves que se puede y cómo. Por eso conviene mirar sin teclear: lo vas a repetir con calma después.

3. Lo replicas. Los prompts que use el mentor te llegan por escrito. Con ellos vuelves a tu entorno y rehaces el recorrido, que es donde se asienta.

⚠ En el paso 3 no esperes salidas idénticas, y no es un fallo tuyo. El agente no es determinista: con el mismo prompt y el mismo código cambian los nombres, la redacción y hasta cuántos archivos toca. Lo que se repite es la forma del recorrido, no el texto.

🛠 Deja el entorno listo
El stack del proyecto: qué es y por qué (5 min)
Este máster mezcla perfiles: backend, frontend, full-stack, y también managers/PMs sin fondo técnico diario. Si ya conoces AdonisJS o React a fondo, salta directo al apartado siguiente, el del entorno.

¿Por qué Node.js + AdonisJS y no otra cosa? Es una elección pedagógica, no una apuesta por "el mejor framework": Node.js reduce la fricción de entrada para una audiencia mixta, "todo programador en algún momento ha usado JavaScript". Y que sea TypeScript de punta a punta (backend y frontend) tiene una razón muy de 2026: TypeScript superó a Python y JavaScript como lenguaje más usado en GitHub por primera vez en más de una década (Octoverse 2025). GitHub lo atribuye al "convenience loop" con IA: los lenguajes tipados generan guardrails más útiles para los LLMs, lo que mejora la generación de código y retroalimenta su propio uso. Es el mismo motivo por el que este proyecto es TypeScript de punta a punta.

AdonisJS 7 (el backend, backend/) es un framework de Node.js con TypeScript de punta a punta y "baterías incluidas" (routing, ORM, validación, auth ya resueltos), en el mismo espíritu que Laravel o Rails pero en TypeScript. Vas a escuchar estas capas nombradas en el directo, sin que se paren a definirlas: esta es tu chuleta:

Ruta (routes.ts): qué URL responde a qué acción.

Controlador (controllers/*.ts): orquesta la petición, recibe, delega, responde.

Validador (VineJS, validators/*.ts): qué forma deben tener los datos de entrada. Es justo la pieza que un ticket de producto no siempre especifica del todo (la vas a ver en acción en la Parte 3 del directo).

Modelo (Lucid, models/*.ts): la fila en la base de datos.

Migration (database/migrations/*.ts): un cambio de esquema versionado en código. Nunca se edita la tabla a mano, se crea una migration nueva.

Transformer (transformers/*.ts): qué datos exactos se devuelven al cliente (filtra lo que el modelo no debe exponer, como el hash del password).

Importante para hoy: el backend de FlowSync ya existe y no se toca en esta sesión. Solo lo vas a leer (o mejor dicho, el agente lo va a leer por ti, explorando el validador real cuando el ticket no alcanza a especificar un campo).

React 19 + Vite (el frontend, frontend/) es donde sí vas a trabajar en vivo hoy:

React: librería de componentes. Construyes la UI a partir de piezas reutilizables (un formulario de login es un componente).

Vite: el "motor" de desarrollo detrás, arranca un servidor casi instantáneo y empaqueta el proyecto para producción. Sustituyó a Create React App (descontinuado) como estándar de facto en 2026.

shadcn/ui: no es una dependencia que se instala, son componentes que se copian a tu propio repo, así que se editan libremente y no engordan el package.json. Por eso el curso lo usa.

Glosario rápido (términos que vas a escuchar sin definición en el directo):

image.png
📖 Si quieres profundizar (opcional, no hace falta para el directo): AdonisJS docs, React docs, Vite docs.

Entorno (15–20 min)
[ ] [ ] Node.js 20.19+ instalado (node -v).

[ ] [ ] Claude Code instalado y autenticado (claude arranca en tu terminal). Docs: code.claude.com/docs.

[ ] [ ] Tu propio fork de LIDR-academy/flowsync-ai4devs-202609-seniors-1, en la rama s1/start. Trabajas sobre un fork, no sobre un clon directo del repo del curso: no tienes permiso de escritura sobre el del curso, y no deberías tenerlo, así que sobre un clon directo cualquier git push tuyo va a fallar. Son dos minutos:

# 1. Fork desde la web: botón "Fork" 
en https://github.com/LIDR-academy/flowsync-ai4devs-202609-seniors-1

# 2. Clona TU fork (no el del curso) y añade el del curso como "upstream"
git clone git@github.com:<tu-usuario>/LIDR-academy/flowsync-ai4devs-202609-seniors-1.git
cd flowsync-ai4devs
git remote add upstream git@github.com:LIDR-academy/flowsync-ai4devs-202609-seniors-1.git

# Comprueba cómo han quedado: origin = tu fork, upstream = el del curso
git remote -v

# 3. Trae las ramas del curso y colócate en la de hoy
git fetch upstream
git checkout -b s1/start upstream/s1/start

# 4. A partir de aquí tus cambios van a TU fork
git push -u origin s1/start
📌 Si ya habías clonado el repo del curso, no vuelvas a clonar: haz el fork en la web y recoloca los remotos sobre el clon que ya tienes, git remote rename origin upstream y git remote add origin git@github.com:<tu-usuario>/flowsync-ai4devs.git. A partir de ahí, los pasos 3 y 4 son iguales.

📌 Si te sale Permission denied (publickey), es SSH, no el fork. Los comandos de arriba usan URLs SSH (git@github.com:…), que necesitan una clave subida a tu cuenta de GitHub. Si no la tienes, o súbela ahora (cinco minutos, y te sirve para el resto del curso), o cambia las dos URLs por su versión HTTPS (https://github.com/<usuario>/flowsync-ai4devs.git). Cualquiera de las dos vale; lo que no vale es descubrirlo el día del directo.

Si algo de esto falla, avisa a tu TA. No lo dejes para el minuto 1 del directo.

[ ] [ ] Backend levantado (backend/, AdonisJS 7):

cd backend
npm install
cp .env.example .env
node ace generate:key
node ace migration:run
npm run dev
Verifica que responde en http://localhost:3333.

[ ] [ ] Frontend levantado (frontend/, React 19 + Vite): abre otra terminal en la raíz del repo (el backend se queda corriendo en la primera):

cd frontend
npm install
npm run dev
Verifica que responde en http://localhost:5173.

📋 La tarea, con reloj
⚠ Ve guardando cada prompt tal cual lo lanzas, desde el primero. Se entregan junto con la comparación, y no valen reconstruidos: el prompt que arreglas mentalmente diez minutos después no es el que lanzaste, y es justo la diferencia que interesa mirar.

El encuadre, y no es un consuelo
El entregable no es el código que salga. Es la comparación, y sobre todo las tres líneas de la parte B, que se escriben igual de bien aunque ninguna de las dos corridas llegue al final.

La idea que sostiene todo el módulo, que el andamiaje explica más varianza que el modelo, leída es una frase de diapositiva. La única forma de que deje de serlo es lanzar el mismo encargo, con el mismo modelo, en dos sitios que solo se diferencian en lo que hay montado alrededor, y mirar por dónde se separan las dos salidas. Si no se separan, eso también es un dato, y de los interesantes: quiere decir que ese encargo concreto no ejercía ninguna de las reglas que escribiste.

El reloj tampoco es una crueldad de diseño. Un harness real no se monta en una tarde ideal, se monta con el rato que hay antes de empezar la tarea de verdad. Lo que sale en 45 minutos es exactamente la parte que depende de tener criterio, y no la que depende de tener una herramienta mejor.

Sobre qué se hace: sobre el proyecto que acabas de dejar levantado, duplicado en dos copias hermanas.

El encargo lo escribes tú como elemento de trabajo en tu propio tablero de Jira, sobre este proyecto, en lenguaje de producto y con sus criterios de aceptación.

⚠ Resérvale un rato de verdad y ponte el reloj. Son unos 45 minutos y hay que pararlos. Dejarlo para la noche de antes te deja con dos corridas a medias y sin haberlas comparado, que es justo la parte que vale.

🅰 Parte A: dos copias, un solo encargo
1. Duplica el proyecto, y una copia se queda pelada
Dos carpetas con el mismo código. En una montas el harness. La otra no se toca en todo el ejercicio: sin archivo de instrucciones, sin comprobaciones automáticas, sin atajos, sin nada.

# desde el directorio que CONTIENE tu clon, no desde dentro
cp -R flowsync-ai4devs flowsync-sin-harness
Tu clon original es la copia con harness: es la que tiene los remotos configurados y desde la que vas a entregar. flowsync-sin-harness/ es solo una copia de trabajo, no se entrega y no se toca.

2. Monta el harness en una sola de las dos
Al menos dos piezas, y de familias distintas, porque la gracia está en tener las dos:

Una que oriente antes de que el agente actúe: un archivo de instrucciones en la raíz que el agente lee siempre sin que se lo pidas, con las convenciones con las que se trabaja en este proyecto y con lo que está prohibido hacer.

Una que compruebe después: algo que se dispare solo cuando el agente termina de editar (formatear, pasar el linter, correr los tests), o un revisor al que le encargues leer con lupa lo que se acaba de escribir.

Si te sobra tiempo, añade una tercera. Si te falta, con dos ya se ve la diferencia.

3. Un solo encargo, escrito como un ticket
Escribe en tu tablero de Jira un encargo pequeño y realista sobre ese proyecto: descripción en lenguaje de producto y sus criterios de aceptación. No lo escribas como una especificación técnica. Un ticket de verdad deja huecos, y esos huecos son justamente donde se va a notar la diferencia entre las dos copias.

Lánzalo en las dos. Lo que le llega al agente tiene que ser el mismo texto, palabra por palabra. Si en la copia con harness lo empaquetas en un atajo, en la pelada escribes ese mismo texto a mano: lo que se mantiene igual es el encargo, no cuántas teclas te costó mandarlo.

⚠ No rescates a la copia pelada. La tentación de guiarla un poco "para que sea justo" aparece a los cinco minutos, y es lo único que arruina el ejercicio: guiarla a mano es exactamente la variable que estás midiendo.

4. La comparación
En un archivo, un lado y otro, con estas casillas:

Qué archivos tocó, contados.

Qué convenciones del proyecto respetó y cuáles no, nombrándolas una a una. Si en un lado no había ninguna escrita en ninguna parte, esa es la respuesta y vale.

Cuántas veces tuviste que intervenir: corregir, aclarar, repetir el encargo o pararlo en seco.

Qué te tocaría arreglar a mano antes de enseñarle eso a alguien de tu equipo.

⚠ Cuando suene el reloj, para. Aunque esté a medias. Una casilla en blanco es información: dice hasta dónde llegaste. Una casilla rellenada de memoria diez minutos después es ruido con formato, y encima es indistinguible de la buena.

⚠ Ve guardando cada prompt tal cual lo lanzas, desde el primero. Se entregan junto con la comparación, y no valen reconstruidos: el prompt que arreglas mentalmente después no es el que lanzaste, y es justo la diferencia que interesa mirar.

🅱 Parte B: las tres líneas
Debajo de la comparación, en el mismo archivo, tres líneas anotadas. Esta parte no se puede fallar, y es la que hay que traer sí o sí.

Qué piezas montaste y cuál te costó más de lo que esperabas. Los nombres tal cual, y en qué se te fue el rato de verdad.

La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla. Ojo, no cuál fue mejor: qué salió distinto, concretamente, y dónde estabas mirando cuando lo notaste. Si tuviste que abrir un archivo para verlo, dilo.

Algo que dejaste escrito en el harness y que el agente no cumplió igualmente. El matiz es todo: no es lo que hizo mal la copia pelada. Es lo que tú habías dejado negro sobre blanco en el lado bueno y aun así no pasó.

⚠ Ninguna de las tres tiene respuesta correcta. La tercera es la más incómoda y la más valiosa: si la contestas honestamente vas a llegar al directo con la pregunta correcta ya hecha.

Cómo saber que la has hecho bien
Las tres líneas están escritas y son concretas.

La tercera no dice "lo cumplió todo". Si lo dice, vuelve a mirar con calma: un archivo de instrucciones sube la probabilidad de que algo pase, no lo garantiza, y notar dónde se cae esa probabilidad es medio módulo.

El encargo es literalmente el mismo texto en los dos sitios. Si no lo es, la comparación no mide el andamiaje, mide lo bien que reescribiste el encargo la segunda vez.

Hay algo sin terminar. Significa que respetaste el reloj y que no rellenaste de memoria.

La comparación cabe en una pantalla. Si no cabe, cogiste un encargo demasiado grande: recórtalo y quédate con la parte que sí pudiste mirar entera.

Entrégalo con lo que tenga.

📤 Cómo se entrega
Un pull request desde tu fork, con dos cosas dentro y ni una más:

Tu archivo de comparación, en docs/harness/comparacion.md. Ese directorio todavía no existe en el proyecto: créalo.

prompts.md, en la raíz del proyecto. Ya está ahí con la plantilla puesta.

git checkout -b harness-<tus-iniciales>
git add docs/harness prompts.md
git commit -m "harness: comparacion con y sin harness, mas prompts"
git push -u origin harness-<tus-iniciales>
Con la rama empujada, GitHub te ofrece arriba el botón para abrir el pull request. Va contra el repositorio del curso (github.com/LIDR-academy/flowsync-ai4devs-202609-seniors-2), no contra tu fork.

🧠 prompts.md no es papeleo, y es la mitad de lo que se revisa. Lo que se mira no es solo lo que te salió, es cómo lo pediste: un resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan respuestas distintas, y sin ese archivo no se distinguen. Pega los prompts tal cual los lanzaste, con su modelo y su herramienta, e incluye también los que no funcionaron, que suelen ser los más útiles de leer.

El plazo
Antes del directo. Lo que llegue a tiempo recibe el feedback de tu TA antes de la sesión, que es el único momento en que te sirve: llegas sabiendo dónde fallaste y miras la sesión buscando eso. Lo que llegue después se marca como recibido, pero ya no se revisa.



El enunciado esta ahi, no en el readme. No tenemos que contar los prompts del montaje del harness, sino la implementacion del ticket en el repo con harness y en el repo sin harness y comparar los prompts de uno y de otro
```

## Prompt 39

**Modelo:** Opus 5 High
**Herramienta:** Claude Code

```
/priority-ticket
```

## Prompt 40

**Modelo:** Opus 5 High
**Herramienta:** Claude Code

```
Dudas:
- ¿El formulario tiene que llamar al backend?: Si, el backend no se toca, solo se invoca.
- Donde se guarda el token: La convencion para MVPs.
- Que mensaje de error?: Adelante con «Introduce un correo electrónico válido»
- Hay validacion de contraseña en el formulario? Si, anade la misma validacion que el backend. El check del backend es defensivo
- Mensaje de error de la contraseña del backend: Asi esta bien.
- Sustituir la plantilla de Vite: Utiliza la plantilla de Vite ya configurada.
- Idioma definido: Utiliza el idioma del index.html. La app en ingles aunque los tickets sean en español
- Sin enlaces externos ni comentarios en el ticket: Eso es todo
```

## Prompt 41

**Modelo:** Opus 5 High
**Herramienta:** Claude Code

```
me he equivocado, no hay que aplicar el plan al proyecto. Solo ver el plan y apuntar lo sigieunte en un archivo llamado comparacion.md: 
qué archivos propone tocar (contados) · qué convenciones respetó y cuáles no (nombrándolas) · cuántas veces tuviste que intervenir · qué te tocaría arreglar a mano antes de enseñárselo a alguien.
```

## Prompt 42

**Modelo:** Opus 5 High
**Herramienta:** Claude Code

```
ahora necesito que hagas el mismo analisis con el plan que se ha propuesto en el repo sin harness:
 Plan de implementación: FLOW-1 «Login usuario frontend»

 Contexto

 Ticket de Jira FLOW-1 («Login usuario frontend»), asignado a Elena Pascual Otero, estado «To Do». Es el único ticket asignado, así que es el más prioritario. El ticket llegó por captura de pantalla: esta sesión no tiene acceso a Jira (sin MCP de Atlassian ni CLI).

 Repositorio: flowsync-ai4devs-202609-seniors-1-sin-harness (rama s1/start). FlowSync es una API AdonisJS 7 en backend/ y un frontend React 19 + Vite 8 en frontend/. Todo el trabajo va en frontend/; el backend no se toca.

 Requisitos del ticket (literal)

 1. El login tiene que pedir correo electrónico y contraseña.
 2. Para el correo electrónico tiene que haber comprobación de formato. Si no es el formato correcto, mostrar error.
 3. Para la contraseña, tiene que ser no visible por defecto y tener un pequeño botón para visualizar la contraseña que se va metiendo.
 4. El botón tiene que poner «login».

 Sin subtareas, sin issues enlazadas, sin criterios de aceptación adicionales.

 Decisiones cerradas con la usuaria

 - Post-login mínimo, sin router: token + usuario en un contexto de auth persistido en localStorage; App muestra una vista «Sesión iniciada» con el nombre si hay sesión y el formulario si no. Logout fuera de alcance.
 - Con tests: Vitest + jsdom + Testing Library, script test, tests de validación, toggle de contraseña y envío con fetch mockeado.
 - UI en español (ticket y docs en español). Texto del botón literal: «Login».
 - fetch nativo con un wrapper pequeño. Sin axios, react-query, react-hook-form ni zod.

 Estado del repo que condiciona el plan

 Backend (ya existe todo lo necesario, verificado):
 - POST /api/v1/auth/login en backend/start/routes.ts:23 → backend/app/controllers/access_tokens_controller.ts (store). Body { email, password }; loginValidator (backend/app/validators/user.ts:23) exige email con formato y password solo string (sin mínimo).
 - 200: { "data": { "user": { id, fullName, email, createdAt, updatedAt, initials }, "token": "oat_…" } } (forma en backend/app/transformers/user_transformer.ts; envoltorio data en backend/providers/api_provider.ts). fullName y updatedAt son nullables.
 - 422: { "errors": [{ message, rule, field }] }. 400 (no 401) para credenciales incorrectas: { "errors": [{ "message": "Invalid user credentials" }] }.
 - Auth por Authorization: Bearer <token>, tokens sin caducidad. CORS abierto a cualquier origen en dev (backend/config/cors.ts:21), CSRF desactivado → no hace falta proxy en Vite.
 - Sin seeders: hay que crear un usuario con POST /api/v1/auth/signup para probar.

 Frontend (plantilla react-ts de Vite sin tocar):
 - Solo src/main.tsx, src/App.tsx (landing con contador), App.css, index.css, assets/. Sin router, cliente HTTP, contexto, tests, .env, Prettier ni alias.
 - Convenciones a respetar: sin punto y coma, comillas simples, 2 espacios; componentes PascalCase.tsx con export default y CSS hermano; imports relativos; import type obligatorio (verbatimModuleSyntax); sin enum ni parameter properties (erasableSyntaxOnly); noUnusedLocals/noUnusedParameters; oxlint con react/only-export-components (no exportar hooks/contextos desde archivos de componentes).
 - Reutilizable: tokens CSS de src/index.css (--text, --text-h, --bg, --border, --accent, --accent-bg, --accent-border, --shadow, dark mode automático) y el patrón de botón .counter de src/App.css (hover/focus-visible).

 Organización elegida

 Carpeta de feature src/auth/ (tipos, servicio, storage, contexto, formulario), src/api/ para el wrapper transversal de fetch, src/components/ para UI reutilizable, src/test/ para setup y helpers. Tests colocados junto al código (X.test.ts(x)). Módulos no-componente en camelCase.ts.

 Archivos (rutas relativas a frontend/)

 ┌──────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────┐
 │                       Archivo                        │                                     Responsabilidad                                     │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ .env.example                                         │ VITE_API_URL=http://localhost:3333                                                      │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/vite-env.d.ts                                    │ Tipa import.meta.env.VITE_API_URL (readonly VITE_API_URL?: string), sin imports/exports │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/api/client.ts                                    │ apiRequest<T>(path, { method, body, token }), ApiError, NetworkError                    │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/api/client.test.ts                               │ Tests del wrapper                                                                       │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/auth/types.ts                                    │ User, LoginCredentials, Session                                                         │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/auth/authService.ts                              │ login(credentials) → POST /api/v1/auth/login                                            │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/auth/authStorage.ts                              │ AUTH_STORAGE_KEY = 'flowsync.auth', readSession(), writeSession()                       │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/auth/authStorage.test.ts                         │ Tests de rehidratación segura                                                           │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/auth/AuthContext.ts                              │ AuthContext + useAuth() (archivo sin componentes)                                       │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/auth/AuthProvider.tsx                            │ Proveedor: estado de sesión, login, persistencia                                        │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
dation.test.ts                          │ Tests de validación                                                                     │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/auth/LoginForm.tsx + LoginForm.css               │ Formulario de login                                                                     │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/auth/LoginForm.test.tsx                          │ Tests del formulario con fetch mockeado                                                 │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/auth/SignedInView.tsx                            │ Vista «Sesión iniciada»                                                                 │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/components/PasswordInput.tsx + PasswordInput.css │ Input de contraseña con botón mostrar/ocultar                                           │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/components/PasswordInput.test.tsx                │ Tests del toggle                                                                        │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/App.test.tsx                                     │ Integración: sin sesión → formulario; con sesión → vista; flujo completo                │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/test/setup.ts                                    │ jest-dom, cleanup, limpieza de localStorage y mocks tras cada test                      │
 ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
 │ src/test/helpers.ts                                  │ jsonResponse(), mockFetch(), fixtures sampleUser/sampleSession                          │
 └──────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────────┘

 Modificar

 ┌────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │    Archivo     │                                                      Cambio                                                       │
 ├────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ package.json   │ devDependencies de test + scripts test / test:watch                                                               │
 ├────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ vite.config.ts │ defineConfig desde vitest/config + bloque test                                                                    │
 ├────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
eza

 src/api/client.ts

 export type ApiErrorItem = { message: string; rule?: string; field?: string }
 export class ApiError extends Error { readonly status: number; readonly errors: ApiErrorItem[] }  // asignación en constructor, no parameter properties
 export class NetworkError extends Error {}
 export async function apiRequest<T>(path: string, options?: { method?: 'GET' | 'POST'; body?: unknown; token?: string }): Promise<T>
 - Base URL: (import.meta.env.VITE_API_URL ?? 'http://localhost:3333').replace(/\/$/, '').
 - Cabeceras: Accept: application/json; Content-Type: application/json solo con body; Authorization: Bearer solo con token. Sin credentials: 'include' (no hay cookies).
 - fetch en try/catch → si rechaza, throw new NetworkError().
 - const json: unknown = await response.json().catch(() => null). Si !response.ok → throw new ApiError(status, extractErrors(json)) (usa json.errors si es array con message; si no, [{ message: statusText|| 'Unexpected error' }]). Si ok → return (json as { data: T }).data.

 src/auth/types.ts y authService.ts

on = { user: User; token: string }
 export function login(credentials: LoginCredentials): Promise<Session>  // apiRequest('/api/v1/auth/login', { method: 'POST', body: credentials })

 Contexto de auth

 - authStorage.ts: un único JSON { user, token } bajo flowsync.auth. readSession() hace try/catch del parse y un type guard isSession (objeto con token: string y user.id: number, user.email: string); cualquier basura → null.
 - AuthContext.ts: type AuthContextValue = { user: User | null; token: string | null; login: (c: LoginCredentials) => Promise<void> }; createContext<AuthContextValue | null>(null); useAuth() lanza Error('useAuth debe usarse dentro de <AuthProvider>') si es null.
 - AuthProvider.tsx (solo export default): useState<Session | null>(readSession) con inicializador perezoso (rehidratación en el primer render, sin useEffect, inmune al doble efecto de StrictMode). login = useCallback(async (c) => { const s = await loginRequest(c); writeSession(s); setSession(s) }, []); los errores se propagan al formulario. value con useMemo. Render con sintaxis React 19: <AuthContextvalue={value}>{children}</AuthContext>.

 src/components/PasswordInput.tsx

 - Props: Omit<ComponentProps<'input'>, 'type'> & { id: string } (React 19: ref es prop normal, sin forwardRef).
 - Estado local visible (false por defecto). <input id={id} type={visible ? 'text' : 'password'} …/> + <button type="button" aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}aria-pressed={visible} aria-controls={id} disabled={props.disabled}>{visible ? 'Ocultar' : 'Mostrar'}</button>.
 - type="button" evita que el clic envíe el formulario (con test).
 - CSS: fila flex con gap 8px; botón pequeño (14px), borde var(--border), hover var(--accent-border), focus-visible outline var(--accent).

 src/auth/validation.ts

 export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 export const EMAIL_REQUIRED = 'Introduce tu correo electrónico'
 export const EMAIL_INVALID = 'El formato del correo electrónico no es válido'
 export const PASSWORD_REQUIRED = 'Introduce tu contraseña'
 export function isValidEmail(value: string): boolean            // sobre value.trim()
 export function validateEmail(value: string): string | undefined
 export function validatePassword(value: string): string | undefined
 export type LoginFieldErrors = { email?: string; password?: string }
 export function validateLogin(values: LoginCredentials): LoginFieldErrors
 Sin mínimo de longitud en la contraseña: el loginValidator del backend solo exige string.
eldErrors, formError: string | null, isSubmitting, refs emailRef/passwordRef, const { login } = useAuth().

 Cuándo se valida:
 - onChange: actualiza valor; si el campo tenía error, revalida (el error desaparece al corregir); limpia formError.
 - onBlur: valida solo ese campo.
 - onSubmit: preventDefault(); validateLogin(values); si hay errores, los pinta, enfoca el primer campo inválido y no llama a fetch. Si no: isSubmitting = true, await login({ email: values.email.trim(), password }) en try/catch/finally.

 Mapeo de errores del servidor (applyServerError):
 - NetworkError → formError = 'No se ha podido conectar con el servidor. Inténtalo de nuevo.'
 - ApiError 400 → formError = 'Correo electrónico o contraseña incorrectos'
 - ApiError 422 → por item con field: email + rule required → EMAIL_REQUIRED; email + maxLength → 'El correo electrónico es demasiado largo'; email otra → EMAIL_INVALID; password → PASSWORD_REQUIRED. Sin campo conocido → formError = 'Los datos enviados no son válidos.'
 - Resto → formError = 'Ha ocurrido un error inesperado. Inténtalo de nuevo.'

 Markup:
 <form className="login-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
   <h1>Iniciar sesión</h1>
   <div className="field">
     <label htmlFor="login-email">Correo electrónico</label>
     <input id="login-email" name="email" type="email" autoComplete="email" inputMode="email" ref={emailRef}
       value={values.email} onChange={…} onBlur={…} disabled={isSubmitting}
       aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? 'login-email-error' : undefined} />
     {fieldErrors.email && <p id="login-email-error" className="field-error">{fieldErrors.email}</p>}
   </div>
   <div className="field">
     <label htmlFor="login-password">Contraseña</label>
     <PasswordInput id="login-password" name="password" autoComplete="current-password" ref={passwordRef} … />
     {fieldErrors.password && <p id="login-password-error" className="field-error">{fieldErrors.password}</p>}
   </div>
   {formError && <p className="form-error" role="alert">{formError}</p>}
   <button type="submit" className="button" disabled={isSubmitting}>Login</button>
 </form>
tMode><AuthProvider><App /></AuthProvider></StrictMode>.
 - index.css: conservar :root con tokens y el bloque dark; añadir --error: #c62828 (dark #ff8a80); #root → min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box (fuera width: 1126px, border-inline, text-align: center); quitar #social .button-icon, code, .counter, code; h1 a 32px; borrar tokens huérfanos --code-bg, --social-bg, --mono.
 - index.html: lang="es", título FlowSync.

 Setup de tests

 Versiones comprobadas con npm view (Node 26, Vite 8):
 npm install -D vitest@^5.0.1 jsdom@^30.0.1 @testing-library/react@^16.3.3 @testing-library/dom@^10.4.2 @testing-library/jest-dom@^7.0.1 @testing-library/user-event@^14.6.7
 (@testing-library/dom es peer explícito de RTL 16 y jest-dom 7.)

 - package.json: "test": "vitest run", "test:watch": "vitest".
 - vite.config.ts: import { defineConfig } from 'vitest/config' y test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] }. Sin globals: imports explícitos desde vitest en cada test.
 - src/test/setup.ts: import '@testing-library/jest-dom/vitest'; afterEach(() => { cleanup(); localStorage.clear(); vi.unstubAllGlobals(); vi.restoreAllMocks() }).
 - tsconfig.app.json: sin cambios (include: ["src"] ya cubre setup y tests; tsc -b los compila, así que deben cumplir noUnusedLocals).
 - src/test/helpers.ts: jsonResponse(body, status = 200) con new Response(...); mockFetch(...responses) con vi.fn() + vi.stubGlobal('fetch', fn); sampleUser (fullName: 'Ana García', email:'ana@example.com', updatedAt: null) y sampleSession (token: 'oat_MQ.test').

 Casos de test

 - validation.test.ts: acepta ana@example.com, a.b+c@sub.dominio.es; rechaza '', ana, ana@, @example.com, ana@example, ana @example.com; validateEmail('') → EMAIL_REQUIRED; trim; validateLogin vacío devuelve ambos mensajes y válido devuelve {}.
sx (render dentro de AuthProvider): campos y botón con nombre exacto Login; blur con ana → EMAIL_INVALID, aria-invalid, descripción accesible, fetch no llamado; submit vacío → ambos mensajes, fetch no llamado, foco en email; corregir el email limpia el error sin blur; submit válido → fetch una vez con body JSON (email recortado) y flowsync.auth en localStorage; 400 → role="alert" con el mensaje y botón habilitado; 422 field: 'email' → error bajo el campo, sin alert; red → alert de conexión; pendiente (promesa sin resolver, con new Promise y resolve capturado, no Promise.withResolvers) → botón disabled y texto «Login».
 - App.test.tsx: sin sesión → heading «Iniciar sesión»; con flowsync.auth sembrado → «Sesión iniciada» y «Hola, Ana García» sin llamar a fetch; flujo completo login → vista; fullName: null → «Hola, ana@example.com».

 Secuencia de construcción

 1. Base: .env.example, src/vite-env.d.ts, index.html. npm run build sigue verde.
 2. Tooling de tests: instalar deps, vite.config.ts, scripts, src/test/setup.ts, src/test/helpers.ts.
 3. src/auth/validation.ts + test → npm test verde.
 4. src/api/client.ts + test.
 5. src/auth/types.ts, authService.ts, authStorage.ts + test.
 6. src/auth/AuthContext.ts, AuthProvider.tsx; npm run lint limpio.
 7. src/components/PasswordInput.tsx + CSS + test.
 8. src/auth/LoginForm.tsx + CSS + test.
 9. SignedInView.tsx; reescribir App.tsx, App.css, main.tsx, index.css; borrar assets; App.test.tsx.
 10. npm run lint && npm run build && npm test y verificación manual.

 Verificación end-to-end

 Backend (terminal 1):
 cd backend && npm install && cp -n .env.example .env; node ace generate:key; node ace migration:run; npm run dev
 Usuario de prueba y comprobación de las tres respuestas (terminal 2):
 curl -s -X POST http://localhost:3333/api/v1/auth/signup -H 'Content-Type: application/json' \
   -d '{"fullName":"Ana García","email":"ana@example.com","password":"secret123","passwordConfirmation":"secret123"}'
 curl -s -i -X POST http://localhost:3333/api/v1/auth/login -H 'Content-Type: application/json' -d '{"email":"ana@example.com","password":"secret123"}'   # 200 data.token
 curl -s -i -X POST http://localhost:3333/api/v1/auth/login -H 'Content-Type: application/json' -d '{"email":"ana@example.com","password":"mal"}'         # 400
 curl -s -i -X POST http://localhost:3333/api/v1/auth/login -H 'Content-Type: application/json' -d '{"email":"no-es-email","password":"secret123"}'       # 422 field email
 Frontend:
 cd frontend && npm install && npm run lint && npm run build && npm test && npm run dev   # http://localhost:5173
 Checklist manual contra el ticket:
 1. Se ven dos campos «Correo electrónico» y «Contraseña»; Tab recorre email → contraseña → Mostrar → Login.
 2. Escribir ana y salir del campo → «El formato del correo electrónico no es válido» en rojo, sin globo nativo; corregir y desaparece. Enviar vacío → ambos mensajes y foco en email.
 3. La contraseña se ve como puntos; «Mostrar» la revela y pasa a «Ocultar»; el clic no dispara ninguna petición (pestaña Network).
 4. El botón dice exactamente «Login»; durante el envío se deshabilita sin cambiar de texto.
 5. Extras: credenciales incorrectas → mensaje de alerta; backend parado → mensaje de conexión; login correcto → «Sesión iniciada» + «Hola, Ana García»; F5 mantiene la sesión (flowsync.auth en Local Storage); borrar la clave y recargar vuelve al formulario; dark mode respetado.

 Riesgos y notas para quien implemente

 - 400 vs 401: credenciales incorrectas es 400; 401 solo en rutas protegidas. No tratar 401 como «credenciales».
 - Regex de email más laxa que Vine: un 422 con field: 'email' se pinta bajo el campo, no como error genérico.
 - convertEmptyStringsToNull en el backend: password: "" llega como null y da 422 required; la validación en cliente lo evita y el mapeo lo cubre.
 - Token sin caducidad en localStorage: exposición ante XSS y sin invalidación desde el front. Aceptado para el alcance. Seguimientos: logout (POST /api/v1/account/logout + clearSession, ojo: responde {message } sin data), validar token al arrancar con GET /api/v1/account/profile, router.
 - oxlint only-export-components: contexto y hook en AuthContext.ts; los .tsx solo exportan default (exportar type está permitido).
 - erasableSyntaxOnly / verbatimModuleSyntax: sin enum ni parameter properties; import type para ComponentProps, FormEvent, ReactNode, User, Session.
 - StrictMode: rehidratación con inicializador perezoso, fetch solo en el handler de submit; el setIsSubmitting(false) tras desmontar no avisa en React 19.
 - .env local y tests: Vitest carga .env de frontend/; las aserciones de URL usan stringContaining.
 - frontend/package-lock.json ya aparece modificado en el working tree antes de empezar; npm install -D lo volverá a tocar. Commitear junto.
 - Sin seeders: si el signup devuelve 422 unique, el usuario ya existe y basta con seguir.

y lo anadas al archivo comparacion.md.
```
