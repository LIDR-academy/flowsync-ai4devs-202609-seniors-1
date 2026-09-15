- Qué archivos tocó, contados.

CON HARNESS: 6 archivos
Modificados (3):
backend/app/controllers/new_account_controller.ts
backend/app/validators/user.ts
backend/tests/bootstrap.ts
Creados (3):
backend/app/exceptions/user_already_exists_exception.ts
backend/tests/unit/validators/user.spec.ts
backend/tests/functional/auth/signup.spec.ts

SIN HARNESS: 15 archivos
Creados (6):
backend/database/migrations/1789502770918_alter_users_table.ts
backend/tests/functional/auth/signup.spec.ts
frontend/src/api/auth.ts
frontend/src/components/SignupForm.tsx
frontend/src/components/SignupForm.css
frontend/src/vite-env.d.ts
Modificados (5):
backend/app/controllers/new_account_controller.ts
backend/app/validators/user.ts
frontend/src/App.css
frontend/src/App.tsx
frontend/src/index.css
Eliminados (4):
frontend/public/icons.svg
frontend/src/assets/hero.png
frontend/src/assets/react.svg
frontend/src/assets/vite.svg



- Qué convenciones del proyecto respetó y cuáles no, nombrándolas una a una. Si en un lado no había ninguna escrita en ninguna parte, esa es la respuesta y vale.

CON HARNESS: Sin tiempo a revisar
SIN HARNESS: No habia convenciones




- Cuántas veces tuviste que intervenir: corregir, aclarar, repetir el encargo o pararlo en seco.

CON HARNESS:
Solo tras la ejecucion para indicar "Usa adversarial-reviewer para revisar mi diff"

SIN HARNESS: 
Solo una vez durante el desarrollo, para contestar a esto: El ticket FLOW-1 "Registro de usuario" tiene criterios de aceptación puramente de backend/API (validación, BD, errores). El frontend está en su plantilla base de Vite/React, sin router ni cliente HTTP. ¿Qué alcance implemento? (Me ofrece solo backend o backend + formulario frontend y elijo lo segundo)





-  Qué te tocaría arreglar a mano antes de enseñarle eso a alguien de tu equipo.

CON HARNESS:
No me ha desarrollado la parte de frontend
SIN HARNESS:
Tengo un error de Typescript en el formulario




 - Qué piezas montaste y cuál te costó más de lo que esperabas. Los nombres tal cual, y en qué se te fue el rato de verdad

CON HARNESS:
En el caso del proyecto con harness, un claude.md con convenciones de desarrollo para el stack dado, y tambien con prohibiciones explícitas. Ademas, un agente revisor adversarial-reviewer.md que define un subagente con instrucciones para leer el diff recién escrito con ojo crítico. Le pedi generarlos directamente a Claude Code. En el caso del agente, nunca habia desarrollado ninguno
Tambien en la propia ejecucion + la revision adversarial

COMUN:
Aunque parezca una tonteria, me llevo mas tiempo crear el ticket en Jira (no estoy familiarizado) y ver como acceder a el. No contabilice este tiempo dentro de los 45 minutos
La ejecucion, 17 minutos 




- La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla. Ojo, no cuál fue mejor: qué salió distinto, concretamente, y dónde estabas mirando cuando lo notaste. Si tuviste que abrir un archivo para verlo, dilo

Durante la ejecucion, el proyecto sin harness fue indicando cambios mas amplios (mas codigo en verde) durante el proceso
Si no contamos la revision adversarial, tardo considerablemente mas el proyecto sin harness (17 minutos). Mucho tiempo hacia el final, con testing, instalacion playwright, etc

MUY SIGNIFICATIVO. En el caso sin harness, no me implemento el cambio en frontend (no pregunto tampoco). Me indica "Aviso importante antes de nada: el cambio que implementé es solo de backend (el endpoint POST /api/v1/auth/signup). El frontend sigue siendo el starter de Vite sin ningún formulario de registro, así que no vas a ver nada 'en pantalla' — para comprobarlo hay que llamar al endpoint directamente (curl/Postman) o desde la consola del navegador"

En el caso del harness, al escribir en el formulario me salta un error de Typescript


- Algo que dejaste escrito en el harness y que el agente no cumplió igualmente. El matiz es todo: no es lo que hizo mal la copia pelada. Es lo que tú habías dejado negro sobre blanco en el lado bueno y aun así no pasó.

Sin tiempo a revisar 