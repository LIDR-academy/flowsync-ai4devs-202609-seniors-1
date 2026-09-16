# Comparación: con harness vs. sin harness

## Parte A: dos copias, un solo encargo

**Ticket lanzado en ambas copias:**

```
Lee el ticket que hay en el board de Jira y aplica la descripcion que contiene
```

### Con harness

| | |
|---|---|
| **Archivos tocados** | 5 archivos |
| **Convenciones respetadas** | - No modificó nada del backend (rutas, modelos, controladores, etc.), tal y como se le indicó.<br>- Respetó la estructura del proyecto, añadiendo los archivos nuevos en su sitio correspondiente.<br>- No expuso contraseñas, tokens ni ningún otro secreto.<br>- Validó que el proyecto funcionara: compiló y corrió los tests. |
| **Convenciones no respetadas** | Ninguna. |
| **Veces que tuve que intervenir** | Ninguna. |
| **Qué me tocaría arreglar a mano** | Nada. |

> Nota: era un harness muy sencillo, por lo tanto no tuve que repetir nada.

### Sin harness

| | |
|---|---|
| **Archivos tocados** | 1 archivo |
| **Convenciones respetadas** | — |
| **Convenciones no respetadas** | - Modificó la carpeta de `backend/`, cuando no se podía tocar.<br>- No validó que el proyecto funcionara: no compiló ni corrió los tests.<br>- No tocó nada de frontend: implementó la funcionalidad solo en el backend, cuando el login tenía que ir en el frontend. |
| **Veces que tuve que intervenir** | Tuve que decirle explícitamente que no quería tocar el backend, que lo que quería era un frontal nuevo para el login con el control en el frontal, y que corriera los tests y todo. |
| **Qué me tocaría arreglar a mano** | Eliminar el archivo de backend: la lógica que implementó sí resolvía lo que pedía el ticket, pero en el sitio equivocado (backend en vez de frontend). Me tocaría rehacerlo todo a mano yo mismo, del lado del frontend. |

---

## Parte B: las tres líneas

**1. Hasta qué pieza llegué, y cuál me costó más de lo esperado**

Monté:
- **`AGENTS.md` con contexto del proyecto**: los comandos principales de verificación, las convenciones de seguridad (no exponer tokens ni contraseñas), qué carpetas se pueden tocar y cuáles no (el backend no se podía tocar) y la estructura del proyecto.
- **Una skill de verificación** (`verify-quality`) que, al final de cada tarea, valida con tests y build todo lo que ha hecho el agente. El agente siempre tiene que validar su propio trabajo, y esta skill es la que le da toda la información necesaria para hacer esa validación, tanto de frontend como de backend.

La pieza que más me costó montar fue la skill de verificación: centralizar en un único sitio toda la información de validación (lint, build, tests) de frontend y backend para que el agente la use de forma consistente al cerrar cualquier tarea.

**2. La primera diferencia que vi entre las dos salidas, y en qué me fijé para verla**

Me fijé primero en el número de archivos tocados y en la precisión a la hora de saber en qué directorios y cómo tocar el código. La salida con harness tocó bastantes más archivos y se centró correctamente en el frontend. La salida sin harness tocó solo un archivo, en el backend —que no debía tocar— y no se centró en absoluto en el frontend. Además, la salida sin harness fue mucho más escueta.

**3. Algo que dejé escrito en el harness y que el agente no cumplió igualmente**

Al ser un ejercicio de prueba pequeño, el agente con harness se comportó muy bien y cumplió todo lo que le pedí en el `AGENTS.md`. No hubo ninguna instrucción del harness que el agente incumpliera.
