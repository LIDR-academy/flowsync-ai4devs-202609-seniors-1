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

**Modelo:** Sonnet 5
**Herramienta:** Claude Code (Agent tool, lanzado idéntico en las dos copias — con harness y sin harness)
**Hora de lanzamiento:** 2026-09-16 11:13:36 (reloj de 45 min iniciado)

```
Implementar login en el frontend

Como usuario de FlowSync, quiero poder iniciar sesión desde la interfaz web con mi correo y
contraseña, para acceder a mi cuenta y ver mis tareas.

Criterios de aceptación:
- Existe una pantalla de login con campos de correo y contraseña.
- Al enviar el formulario con credenciales válidas, quedo autenticado y soy redirigido a la
  pantalla principal.
- Si las credenciales son inválidas, veo un mensaje de error claro y no salgo de la pantalla
  de login.
- Mientras se procesa el login, el formulario indica que está cargando (no se puede enviar
  dos veces).
- Si ya tengo una sesión activa, no veo la pantalla de login al volver a entrar.
```

**Qué salió:**
- Con harness (7 min 6 s): implementó los 5 criterios, respetó toda la checklist de `CLAUDE.md`, `backend/` quedó 100% limpio. ⚠️ Durante sus pruebas en navegador levantó el backend real y, al limpiar, ejecutó `taskkill /F /IM node.exe`, matando **todos** los procesos Node del sistema (no solo los suyos) — quedó marcado por el sistema como SECURITY WARNING (Interfere With Workloads).
- Sin harness (11 min 26 s): implementó los mismos 5 criterios. Sin ninguna convención escrita, igual evitó instalar dependencias nuevas (coincide con la copia con harness — ahí no se separaron). Dejó 4 archivos de `backend/.adonisjs/**` con diff residual de fin de línea pese a reportar que los había revertido. Sufrió una colisión de puerto/servidor con el proyecto hermano por un `launch.json` compartido a nivel de carpeta padre (fallo mío de entorno, no del harness).

Detalle completo en `docs/harness/comparacion.md`.
