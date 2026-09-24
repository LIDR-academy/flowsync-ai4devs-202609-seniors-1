# Prompts

Todos los prompts que lancé para este ejercicio, en orden, con su modelo y herramienta.

**Nota sobre el método.** Trabajé dirigiendo a Claude Code desde una sesión abierta en mi repo de
apuntes del máster, con el proyecto FlowSync añadido al alcance. Los prompts son las instrucciones
que le di yo; el recorte del alcance y las tres líneas de la Parte B son decisiones mías, y están
marcadas donde corresponde.

---

## Prompt 1

**Modelo:** Opus 5
**Herramienta:** Claude Code (app de escritorio)

```
empecemos con el ejercicio, las lecturas después
```

**Qué salió:** arrancó el reloj y exploró el repositorio para el tramo 1. Encontró que lo único
construido es la autenticación —registro, login, perfil protegido, logout— y que **no existe ninguna
entidad de dominio**: ni tarea, ni estado, ni equipo.

---

## Prompt 2 — el interrogatorio

**Modelo:** Opus 5
**Herramienta:** Claude Code

No fue un prompt suelto: el encargo del tramo 2 era que **preguntara antes de proponer**, en una sola
ronda y sin bajar a modelo de datos ni a endpoints. Las cinco que devolvió:

1. Un episodio concreto en que no saber en qué trabajaba otro rompió algo — qué costó.
2. *"Más en tiempo real"*: ¿ver sin refrescar, recibir avisos, o saber quién está conectado? ¿Cuál
   resuelve el dolor y cuáles NO quieres?
3. ¿Quién teclea el estado, cuándo, y qué gana al hacerlo?
4. ¿Sustituye al gestor de tareas o convive con él? Si convive, ¿quién actualiza los dos?
5. ¿Cómo sabrás en un mes si funcionó? Algo observable: qué reunión deja de existir.

**Qué salió:** las cinco quedaron cubiertas por la ficha de hechos. **Ningún supuesto declarado**, así
que no hubo huecos que revisar por ese lado.

---

## Prompt 3 — la ficha de hechos

**Modelo:** Opus 5
**Herramienta:** Claude Code

Pegué **entera y de una vez** la ficha de hechos que trae la lección (22 puntos más la lista de fuera
de alcance). No la reproduzco aquí porque es material del curso, no un prompt mío.

**Qué salió:** con eso propuso el alcance en cinco bloques.

---

## Prompt 4 — el recorte, que es la parte mía

**Modelo:** Opus 5
**Herramienta:** Claude Code

La IA propuso **6 elementos** dentro del alcance y me señaló tres candidatos a recortar, con la
tensión de cada uno. Mi decisión:

```
saca la fecha de vencimiento y el filtro, deja el tiempo real
```

**Qué salió:** alcance de 6 a 4. Los dos que saqué **estaban pedidos explícitamente en la ficha de
hechos**, y ese es el recorte que cuenta.

---

## Prompt 5 — la línea 3

**Modelo:** Opus 5
**Herramienta:** Claude Code

Me preguntó por qué mantuve el tiempo real pese a su objeción, y de qué decisión estaba menos seguro:

```
lo mantuve porque es el diferenciador, y la dudosa es esa misma
```

**Qué salió:** la línea 3 quedó como una **inclusión dudosa**, no una exclusión. La tensión es
**lo que enamora contra lo que valida**.

---

## 📌 Dónde falló la IA — y no fue proponiendo de más

No me discutió ninguna decisión ni me señaló ninguna incoherencia. **Falló por obediente.**

Los dos elementos que recorté estaban en su propuesta **solo porque la ficha los pedía**, con la
justificación literal *"pedido explícitamente"*. Eso no es un argumento de producto: es una cita.

**Una ficha de hechos no es una lista de requisitos.** Parte de recortar es sacar cosas que el propio
cliente pidió, y la IA trató lo pedido como decidido.

## 📌 Y dónde fallé yo

La primera versión del tramo 1 listaba **las rutas de la API y las columnas de la tabla de usuarios**.
Lo detecté pasando la propia checklist de autoevaluación de la lección —*"ni una tabla ni un
endpoint"*— y lo subí a nivel de producto.

**La deriva hacia implementación no empieza en el alcance: empieza describiendo el terreno**, que es
donde más parece rigor.

---

## ⚠️ Nota de plazo

Este ejercicio se entrega **fuera de plazo**: la fecha límite era el martes 22 de septiembre y esto
se hizo el miércoles 23. Según la lección, se marca como recibido pero ya no se revisa. Lo entrego
igual, y lo digo aquí en vez de omitirlo.
