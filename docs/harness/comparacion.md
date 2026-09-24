# Comparación de implementaciones

Referencia: `flowsync-ai4devs-202609-seniors-1` frente a `flowsync-sin-harness`.

| Archivo | Aspecto | `flowsync-ai4devs-202609-seniors-1` | `flowsync-sin-harness` | Diferencia e impacto |
| --- | --- | --- | --- | --- |
| `App.tsx` | Dependencias visuales | Solo importa React y la hoja de estilos. | Añade los SVG de React y Vite, y `hero.png`. | La versión sin harness incorpora recursos del starter de Vite. |
| `App.tsx` | Estructura de la interfaz | Renderiza una tarjeta de reloj (`main.page` / `section.clock-card`). | Renderiza un reloj flotante, una zona central “Get started” y bloques de documentación y comunidad. | Cambia de una aplicación centrada exclusivamente en el reloj a una página de bienvenida de Vite con el reloj integrado. |
| `App.tsx` | Modos de reloj | Permite alternar mediante botones entre reloj digital y analógico. | Muestra simultáneamente la hora digital en el encabezado y un reloj analógico pequeño. | Se elimina el selector y el estado `display`; se simplifica la interacción. |
| `App.tsx` | Hora digital | Forma manualmente `HH:MM:SS` y da menor tamaño a los segundos. | Usa `Intl.DateTimeFormat('ca-ES')` para formatear la hora completa. | La versión sin harness delega el formato al navegador y adopta la configuración regional catalana. |
| `App.tsx` | Hora en catalán | Agrupa los minutos en franjas: en punto, uno/dos/tres quarts o “falten pocs minuts”. | Calcula los minutos exactos hasta el cuarto y añade los minutos transcurridos tras cada cuarto. | La redacción de la hora es más precisa en la versión sin harness. |
| `App.tsx` | Accesibilidad y enlace | La frase catalana es texto con `lang="ca"`; el reloj analógico es un elemento `time`. | El contenedor de reloj expone una etiqueta ARIA con ambas horas; el dial es decorativo y la frase enlaza a `horacatalana.cat`. | Cambia la semántica del reloj y se añade una navegación externa. |
| `App.tsx` | Estado e interacción adicional | Mantiene solo el estado de hora y de modo de visualización. | Añade el contador `count` y su botón. | La versión sin harness recupera funcionalidad demostrativa del starter de Vite. |
| `App.tsx` | Contenido externo | No contiene enlaces externos. | Incluye enlaces a Vite, React, GitHub, Discord, X y Bluesky. | Añade contenido y navegación propios de la plantilla. |
| `App.css` | Contenedor principal | Define una tarjeta de reloj alineada a la derecha con diseño autocontenido. | Define un reloj fijo/flotante y estilos para secciones de página completas. | El diseño pasa de componente aislado a composición de landing page. |
| `App.css` | Reloj analógico | Dial grande de 220 px, borde grueso y numerales 12/3/6/9. | Dial compacto de 62 px, marcas con gradiente cónico y sin numerales. | El reloj se vuelve un elemento secundario y más compacto. |
| `App.css` | Selector y reloj digital | Incluye estilos para el selector, reloj digital grande y estado de foco global de botones. | Esos estilos desaparecen. | Consecuencia directa de eliminar el cambio de modo y la vista digital principal. |
| `App.css` | Estilos añadidos | Se limita al reloj y a una adaptación móvil a 480 px. | Añade estilos para contador, hero, secciones de documentación/social, iconos, separadores y enlaces. | Aumenta significativamente el alcance de la hoja de estilos. |
| `App.css` | Transparencia y posición | Fondo opaco y tarjeta en el flujo normal. | Fondo semitransparente con `backdrop-filter`; posición `fixed` y ajuste de posición según viewport. | El reloj permanece visible al desplazarse y adquiere tratamiento de panel flotante. |
| `App.css` | Diseño responsive | Reduce el padding y el de la tarjeta por debajo de 480 px. | Reubica el reloj a 700 px y convierte las secciones inferiores en columna a 1024 px. | La versión sin harness cubre más puntos de ruptura y reorganiza la página completa. |
| `App.css` | Sintaxis CSS | Usa reglas CSS planas. | Usa anidamiento de reglas y consultas de medios dentro de selectores. | Requiere soporte de CSS nesting en la cadena de compilación/navegador. |

## Resumen

La versión `flowsync-ai4devs-202609-seniors-1` implementa una experiencia de reloj enfocada y conmutables digital/analógica. `flowsync-sin-harness` conserva el reloj como widget, pero sustituye esa experiencia por la página de ejemplo de Vite: añade recursos, contador, contenido de documentación y enlaces sociales, además de un formato de hora catalana más detallado.
