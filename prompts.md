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

**Copia:** con harness
**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
Implementar registro e inicio de sesión

Como nuevo usuario en FlowSync, quiero poder crear una cuenta e iniciar sesión con mi email y contraseña, para acceder a mi cuenta.

Criterios de aceptación:
- Puedo crear una cuenta nueva con mi nombre, email y contraseña.
- Si el email ya está registrado, se muestra un mensaje claro, no un error genérico.
- Puedo iniciar sesión con el email y la contraseña de una cuenta ya creada.
- Si las credenciales no son correctas, se muestra un mensaje claro, no un error genérico.
- Tras iniciar sesión, veo confirmación de que estoy dentro de mi cuenta (por ejemplo, mi nombre).
```

**Qué salió:** funcionó a la primera, sin que le mandara ningún prompt más — pero no de un tirón: el hook de comprobación automática se quedó bloqueado seis veces seguidas con el mismo error de `tsconfig` (generado por el propio `shadcn init`) sin corregirlo por su cuenta, así que tuve que arreglarlo yo directamente en el archivo, por fuera de esta conversación con el agente. A partir de ahí terminó solo: montó shadcn/ui, verificó con Playwright real y pasó su propio subagente revisor antes de darse por terminado.

---

## Prompt 2

**Copia:** sin harness
**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
Implementar registro e inicio de sesión

Como nuevo usuario en FlowSync, quiero poder crear una cuenta e iniciar sesión con mi email y contraseña, para acceder a mi cuenta.

Criterios de aceptación:
- Puedo crear una cuenta nueva con mi nombre, email y contraseña.
- Si el email ya está registrado, se muestra un mensaje claro, no un error genérico.
- Puedo iniciar sesión con el email y la contraseña de una cuenta ya creada.
- Si las credenciales no son correctas, se muestra un mensaje claro, no un error genérico.
- Tras iniciar sesión, veo confirmación de que estoy dentro de mi cuenta (por ejemplo, mi nombre).
```

**Qué salió:** funcionó a la primera, sin ninguna intervención mía. Terminó antes que la copia con harness (mismo prompt, mismo modelo). Se quedó corto en un solo punto: no consiguió verificar el resultado con un navegador real (dijo no tener Playwright disponible en su entorno), así que solo lo probó contra la API con curl/fetch directo.

---

## Prompt 3

**Copia:** sin harness
**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
Los mensajes de error que ve el usuario están en inglés y tal cual los
devuelve la API (por ejemplo "The email has already been taken" o
"Invalid user credentials"). Tradúcelos a mensajes claros en español
para el usuario final.
```

**Qué salió:** tuve que insistir — la comprobación manual en el navegador reveló que los mensajes de error se mostraban en inglés, sin traducir, algo que ni el agente ni ninguna comprobación había detectado antes de darse por terminado. Solucionó bien y a la primera: creó `errorMessages.ts` traduciendo por `rule`+`field` (más robusto que por el texto en inglés, que puede cambiar), con un mapa aparte para mensajes sin regla (como "Invalid user credentials") y un fallback razonable. Verificado en vivo en el navegador: los mensajes ahora salen en español, muy cercanos en redacción a los de la copia con harness sin haberlos visto.

---

## Prompt 4

**Copia:** sin harness
**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
En la pantalla de login/registro, el botón de la pestaña que no está
seleccionada (por ejemplo "Crear cuenta" cuando estás viendo el login)
no se ve: el texto es invisible. Revísalo y arréglalo.
```

**Qué salió:** funcionó a la primera, con un diagnóstico de causa raíz correcto y no un parche superficial: el botón inactivo no tenía `color` explícito, así que heredaba el color por defecto del navegador bajo `color-scheme: light dark`; en modo oscuro eso da texto claro, y `.auth-card` forzaba un fondo blanco fijo (`var(--card-bg, #fff)`, una variable que no existía y caía al fallback) → texto claro sobre blanco, invisible. Arregló las dos causas: color explícito en el botón, y el fondo de la tarjeta pasó a `var(--bg)` para respetar el tema. Verificado con captura: se ve perfectamente, y además la tarjeta entera quedó bien integrada con el modo oscuro.
