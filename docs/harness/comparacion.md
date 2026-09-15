# AI4Devs 202609
## Módulo 1 - Ejercicio Flowsync: Monta el harness y mide la diferencia

### Parte A

#### 1. Qué archivos tocó?

| Con Harness | Sin Harness |
| :--- | :--- |
| modified: frontend/src/App.css | |
| modified: frontend/src/App.tsx | modified: frontend/package-lock.json |
| new file: frontend/src/api/auth.ts | modified: frontend/package.json |
| new file: frontend/src/api/client.ts | modified: frontend/src/App.tsx |
| new file: frontend/src/components/AuthPage.tsx | new file: frontend/src/features/auth/AuthContext.tsx |
| new file: frontend/src/components/LoginForm.tsx | new file: frontend/src/features/auth/LoginPage.tsx |
| new file: frontend/src/components/ProfilePage.tsx | new file: frontend/src/features/auth/SignupPage.tsx |
| new file: frontend/src/components/SignupForm.tsx | new file: frontend/src/features/auth/api.ts |
| new file: frontend/src/context/AuthContext.tsx | new file: frontend/src/features/profile/ProfilePage.tsx |
| new file: frontend/src/context/auth-context.ts | new file: frontend/src/lib/api.ts |
| new file: frontend/src/context/useAuth.ts | modified: frontend/src/main.tsx |
| modified: frontend/src/index.css | new file: frontend/src/routes/ProtectedRoute.tsx |
---

#### 2. Qué convenciones del proyecto respetó y cuáles no?

Con Harness: Según Claude todas, pero no usó shadcn/Tailwind.

| Archivo | Cumple | Notas |
| :--- | :---: | :--- |
| frontend/.env.example | ✅ | VITE_API_URL apunta a :3333, coherente con el backend |
| frontend/src/api/client.ts | ✅ | Wrapper fetch fino, sin sobre-abstracción |
| frontend/src/api/auth.ts | ✅ | Rutas (/api/v1/auth/signup, /api/v1/auth/login, /api/v1/account/profile, /api/v1/account/logout) coinciden exactamente con backend/start/routes.ts |
| frontend/src/context/auth-context.ts | ✅ | createContext aislado del componente - patrón correcto para Fast Refresh |
| frontend/src/context/useAuth.ts | ✅ | Hook aislado, mismo motivo |
| frontend/src/context/AuthContext.tsx | ✅ | Provider fino; el único comentario presente explica un WHY no obvio (por qué el useEffect corre solo al montar) - cumple la regla de comentarios de CLAUDE.md |
| frontend/src/components/AuthPage.tsx | ✅ | Componente simple, sin lógica de más |
| frontend/src/components/LoginForm.tsx | ✅ | - |
| frontend/src/components/SignupForm.tsx | ✅ | - |
| frontend/src/components/ProfilePage.tsx | ✅ | - |
| frontend/src/App.tsx | ✅ | Reemplaza el andamiaje de Vite por el flujo auth, como pide el ejercicio |
| frontend/src/App.css,<br>frontend/src/index.css | ✅ | Solo estilos, sin impacto en convenciones de código |

Sin Harness: No se definió archivo CLAUDE.md ni AGENTS.md, a pesar de que el prompt los referenciaba.

---

#### 3. Cuántas veces tuviste que intervenir?

| Con Harness | Sin Harness |
| :--- | :--- |
| Solo una, para instalar el plugin de Claude en Chrome y autorizar su uso para las pruebas del agente revisor. | Cuatro veces: 1) Ruido comparacion,md, pedì obviar, 2) mostro plan con ruido por el archivo comparacion.md, pedì ejecutar solo la tarea, 3) recomendó usar HTML/CSS al no tener shadcn/Tailwind, acepté sugerencia, no encontró plugin en Chrome, me pidiò revisar manulamente. |
---

#### 4. Qué tocaría arreglar a mano?

| Con Harness | Sin Harness |
| :--- | :--- |
| Reconstruir a shadcn/Tailwind, mensajes de validaciòn en inglès, redefinir layout de Profile. | Lo mismo, además de mejorar notablemente el UI del en general. |
---

### Parte B

#### 1. Qué piezas montaste y cuál te costó más de lo que esperabas?
En revisar los tipos de ticket en Jira, determinar que contenido colocar en el prompt y en el ticket de Jira, y registrar Rovo MCP en Claude.

#### 2. La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla?
Las veces de intervención en la solicitud sin harness, la ejecución de pruebas automáticas por el agente revisor en Chrome con harness, y el UI mucho mas elaborado cn harness.

#### 3. Algo que dejaste escrito en el harness y que el agente no cumplió igualmente.?
Uso de componentes shadcn/ui.