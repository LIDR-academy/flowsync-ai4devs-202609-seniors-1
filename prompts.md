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

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.
```

**Qué salió:** 

Este es el párrafo de partida del ejercicio de alcance (README, Parte A). Te doy los dos primeros tramos. El tercero, los cinco bloques, lo dejo hasta que me pegues la ficha de hechos, para no inventarme las respuestas.                                                                                       
                                                                                                                                                                                                                                                                                                                    
  1. Lo que ya existe                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                    
  - Capacidades construidas: solo autenticación. Registro, login con token de acceso, ver el perfil propio y logout. No hay nada de tareas, equipos, estados ni tiempo real.                                                                                                                                        
  - Modelo de datos: dos tablas. users (email, nombre completo, contraseña con hash) y auth_access_tokens (tokens de acceso de cada usuario).                                                                                                                                                                       
  - Frontend: tres pantallas (/login, /register, /profile) con rutas protegidas. Cualquier otra URL redirige a /profile.                                                                                                                                                                                            
  - Consecuencia: todo lo que es FlowSync está por construir. Lo que ya existe es la identidad de cada usuario.                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                    
  2. Las cinco preguntas                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                    
  1. ¿Qué quiere saber alguien del equipo cuando abre FlowSync? ¿Qué está haciendo cada persona ahora mismo, qué ha terminado desde ayer, o quién está bloqueado? Cada una de esas preguntas lleva a un producto distinto.                                                                                          
  2. ¿Qué significa "en tiempo real" aquí? ¿Hace falta ver un cambio en segundos, o basta con estar al día al abrir la herramienta? ¿Qué pasa si mi compañero se entera de mi cambio una hora tarde?                                                                                                                
  3. ¿Cómo es el equipo? Cuántas personas, cuántos husos horarios, y si hay alguien que coordina o todos están al mismo nivel.                                                                                                                                                                                      
  4. ¿Qué parte de Jira sobra, y qué hay que conservar sí o sí? Asignar tareas, prioridades, fechas, historial…                                                                                                                                                                                                     
  5. ¿Qué tendría que pasar para decir que el MVP funciona? Por ejemplo, que se cancele la daily, o que el equipo mire FlowSync antes de preguntar por Slack. ¿Y en cuánto tiempo?                                                                                                                                  
                                                                                                                                                                                                                                                                                                                    
  Pégame la ficha de hechos de la lección "Ejercicio FlowSync" y te devuelvo el alcance en cinco bloques: problema, usuarios, propuesta de valor, alcance y NO-alcance, con cada exclusión justificada.                                                                                                             
                                                                                                                                                                                                                                                                                                                    
  Una nota para el entregable: prompts.md tiene cambios sin commitear y docs/prd/alcance-mvp-raul-martin.md está en staging pero vacío. No he tocado ninguno de los dos. Hay además un cambio en backend/database/schema.ts que es del entorno, no del ejercicio, y conviene no meterlo en el PR (la entrega son    
  solo esos dos archivos).


## Prompt 2

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
- Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias.
```

**Qué salió:** 

Le he dado las respuestas a las preguntas.
El output que devuelve es:

Alcance en cinco bloques (problema · usuarios · propuesta de valor · alcance · NO-alcance), con 9 elementos dentro y 13 exclusiones justificadas contra la hipótesis "el equipo cancela la ronda de ¿en qué estás?". Señala como candidatos a recortar el 9 (qué ha cambiado desde tu última visita) y el borrado. El texto completo está en `docs/prd/alcance-mvp-raul-martin.md`.

## Prompt 3

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
si vuelca y añade a prompts
```

**Qué salió:** volcó el alcance en `docs/prd/alcance-mvp-raul-martin.md` (con el terreno como bloque 0 y huecos para mi recorte y la Parte B) y completó este archivo.

## Prompt 4

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** push, roles y comentarios ya estaban excluidos. Añadió la integración con Slack y separó analítica/reporting en una exclusión propia, cada una con su justificación. El NO-alcance pasa de 13 a 15 exclusiones.

## Prompt 5

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
alcance 3. porqué 2 clicks? No sería mejor 1 o arrastrar y soltar en un kanban?
```

**Qué salió:** explicó que los "2 clics" venían de la ficha de hechos como techo de esfuerzo, no como diseño. Propuso sacar el número de clics y el kanban del documento de producto (son diseño de interacción), reescribir el punto 3 como requisito ("sin salir de la lista ni abrir un formulario, en segundos") y convertir "me la quedo" en una sola acción.

## Prompt 6

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
sí aplica esos cambios
```

**Qué salió:** reescribió los puntos 3 y 4, quitó los "dos clics" del resto del documento (propuesta de valor, NO-alcance y supuestos) y anotó el hallazgo debajo del alcance.

## Prompt 7

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
Punto 1. No estaría mejor que veas lo de todos pero también puedas fácilmente ver las que tú has creado o las que tienes asignadas?
```

**Qué salió:** aceptó "las que tengo asignadas" (refuerza que la lista sea la cola de trabajo de quien escribe) y rechazó "las que he creado" (con roles planos no cambia ninguna decisión). Propuso ampliar el punto 6 en vez de añadir un elemento, con la vista del equipo como pantalla por defecto, y avisó de que eso es meter más dentro.

## Prompt 8

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
sí
```

**Qué salió:** amplió el punto 6 del alcance y añadió "filtrar por quién creó la tarea" al NO-alcance, con su justificación.

## Prompt 9

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
7. **Destacar las tareas vencidas** de un vistazo. lo quitaría. El objetivo actual es ver en qué están los otros, no qué se debería priorizar  o si no hemos hecho algo a tiempo
```

**Qué salió:** quitó el punto 7 del alcance (primer recorte mío), lo pasó al NO-alcance con mi justificación y avisó de que choca con la ficha de hechos, que pedía la fecha precisamente para ver lo vencido.

## Prompt 10

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
ok añadelo a parte b. Deja la fecha, aunque sin filtro no ayude tanto
```

**Qué salió:** escribió la tercera línea de la Parte B (la exclusión de las vencidas, con qué tendría que pasar para que entrara), puso el recuento provisional (9 → 8) y aclaró en el punto 2 que la fecha se apunta pero no se destaca ni se filtra.

## Prompt 11

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
7. **Ver los cambios de los demás sin refrescar ni preguntar.** se puede quitar. Creo que la cubre la 1 y la 8
```

**Qué salió:** no lo aplicó y me lo discutió. El 1 y el 8 funcionan al abrir la lista y el 7 con la lista ya abierta (dos personas cogiendo la misma tarea libre). Además, el 7 es casi literal la definición de "tiempo real" de la ficha. Recomendó quitar el 8 en su lugar.

## Prompt 12

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
veo complicado el 8. Yo lo entiendo como que resaltaría los cambios para que sea fácil ver qué ha cambiado y no tener que ver todas tareas e inferir tú qué ha cambiado. Eso posiblemente sería una mejora a futuro fuera de MVP aunque la considero muy relevante para ser eficientes
```

**Qué salió:** quitó el 8 del alcance, lo pasó al NO-alcance como recorte propio y mejora futura, y actualizó la Parte B a 9 → 7.

## Prompt 13

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
quitarias algo más del alcance que no sea esencial para el MVP o sean nice-to-ahve disfrazados? ¿Hay algo de scope no justificado?
```

**Qué salió:** señaló la fecha de vencimiento como campo sin justificar tras recortar las vencidas, y propuso adelgazar el 4 (solo asignártela a ti), el 5 (borrar sí, editar no; se corrigió respecto a su propuesta anterior de recortar el borrado) y el 6 ("ver solo las tuyas", que había metido ella).

## Prompt 14

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
fecha de vencimiento está porque el requisito era " Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.". Punto 4 acepto que para el mvp no es necesario asignar a otro solo a ti. Punto 5 ok tambien, mejor borrar y crear nueva tarea aunque tendras que volverla a asignar para el mvp, aunque yo sí veo la utilidad de la edición porque entiendo que no se quedarán sólo en el título, habrá luego una descripción más detallada, adjuntos, etc. Punto 6 sí que se puede sacar de mvp y dejarlo como posterior mejora
```

**Qué salió:** mantuvo la fecha justificada por la ficha (se ve en la lista, sin destacar), dejó el 4 en quedarse o soltar una tarea, el 5 en solo borrar y el 6 en filtrar por estado. Pasó al NO-alcance "asignar a otra persona", "editar" y "ver solo las tuyas" (estas dos como mejoras futuras) y actualizó la Parte B.

