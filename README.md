# LawWare Frontend

Frontend modular con Next.js App Router, React y TypeScript. El usuario realizó un recorrido académico con Auth0 real y backend local: consultó contenido sintético y recuperó el progreso tras recargar; PostgreSQL confirmó el estado. La propuesta SQL sigue sin aprobarse y la verificación directa del token no se capturó. El registro y consentimiento reales no están integrados; se conserva una demostración sintética separada. LawWare v2.1 permanece **validado en desarrollo local, con observaciones**, sin aprobación de producción.

## Inicio local

Requisitos: Node 24 y npm. En PowerShell de Windows, use `npm.cmd` si la política de ejecución bloquea `npm.ps1`.

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run dev
```

Abra `http://localhost:3000`. `.env.local` está ignorado. El ejemplo activa `LAWWARE_DEMO=1` y solo muestra datos sintéticos en `next dev`. La demostración se deshabilita por código en producción, incluso si se establece esa variable. No crea una sesión Auth0 ni autoriza operaciones.

El botón «Comenzar» abre el recorrido de demostración cuando está habilitado; desde Acceso puede abrirse un panel sintético. Cambie de escenario para revisar visitante, pendiente, estudiante, gestión de contenido, administración, múltiples capacidades, bloqueado, inactivo, anonimizado y errores. Las decisiones se mantienen únicamente para previsualización y nunca se envían ni se presentan como guardadas.

## Verificación

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run test:production
npx.cmd playwright install chromium
npm.cmd run test:e2e
```

También se puede usar Chrome instalado estableciendo `PLAYWRIGHT_CHROME_PATH` a su ruta ejecutable. La prueba opcional `npm.cmd run test:integration` necesita el backend hermano compilado en `../LawWare-backend/dist/server.js`; usa temporalmente los puertos locales 3210 y 3211 y no inicia PostgreSQL. Véase [pruebas](docs/testing/PRUEBAS.md).

`LAWWARE_BACKEND_URL` es de servidor, sin prefijo público. `/api/health` consulta `GET /health` del backend; no implica que PostgreSQL o Auth0 estén disponibles. `/api/identity` usa la sesión del SDK oficial y obtiene el access token en servidor para consultar `/api/v1/auth/me`; sin Auth0 configurado devuelve 503. El usuario probó login, recorrido académico, logout y 401 posterior; no se capturó directamente la respuesta 200 de identidad. No se guardan tokens en `localStorage` ni se habilita el endpoint público de token del SDK.

Las rutas reales `/dashboard`, `/aprendizaje` y sus lecciones usan `/api/vertical/*`, que conserva el token en servidor y consulta capacidades, módulos y progreso del backend. Las escrituras verifican origen y sesión; la navegación no concede permisos. El procedimiento completo y sus bloqueos están en `LawWare-backend/docs/development/GUIA_DEMOSTRACION_FUNCIONAL.md` del repositorio hermano.

- [Arquitectura y matriz de capacidades](docs/architecture/ARQUITECTURA.md)
- [Diseño, rutas y componentes](docs/design/SISTEMA_VISUAL.md)
- [APIs reales y contratos propuestos](docs/api/CONTRATOS.md)
- [Propuesta contractual compartida con backend](docs/api/CONTRATO_FULL_STACK_PROPUESTO.md)
- [Flujo de privacidad](docs/FLUJO_PRIVACIDAD.md)
- [Pruebas y pendientes](docs/testing/PRUEBAS.md)

Fuentes: [backend](https://github.com/Jesel8D/LawWare-backend), [modelo SQL](https://github.com/Jesel8D/LawWare-database) y [decisiones](https://github.com/Jesel8D/LawWare-context). Vercel y Render son destinos previstos, sin despliegue en esta etapa.
