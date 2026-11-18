# Instrucciones de frontend

- Conservar Next.js App Router, organización por funcionalidades y componentes compartidos; no afirmar integración de servicios sin evidencia.
- El modo `LAWWARE_DEMO=1` solo puede funcionar con `NODE_ENV=development`; es visual, sin sesión o autorización y sin operaciones persistentes. Identificar las pantallas sintéticas.
- Distinguir presentación del aviso, decisión por finalidad, confirmación del backend, vinculación y revocación. Nunca preaceptar finalidades opcionales ni afirmar que se registró algo sin confirmación transaccional.
- Usar el SDK oficial de Auth0 y access tokens solo en servidor. No usar tokens en localStorage, no exponer secretos, no inventar cuentas ni interpretar un 401/403 como necesidad de registro.
- La autorización efectiva corresponde al backend. No confiar en nombres de rol ni capacidades suministradas por el navegador para acceder a datos o ejecutar operaciones.
- No incluir datos reales en fixtures, logs ni ejemplos; no modificar SQL, backend o repositorios hermanos sin autorización aplicable.
- No realizar despliegues, commits, push ni fusiones sin autorización. Mantener resultados locales separados de aprobación de producción o legal.
- El usuario informó un recorrido académico con Auth0 real y PostgreSQL confirmó el avance; distinguirlo de evidencia directa del token, de pruebas de aislamiento completas y de aprobación de producción.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
