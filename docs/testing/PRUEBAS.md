# Pruebas y pendientes

Ejecutar con Node 24: `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run test:production`, `npm run test:e2e`. Playwright necesita Chromium (`npx playwright install chromium`) o `PLAYWRIGHT_CHROME_PATH` apuntando a Chrome. E2E arranca Next en 127.0.0.1:3210 con demostración; no necesita Auth0 ni base de datos.

`npm run test:integration` necesita el repositorio backend hermano compilado. Comprueba que los puertos 3210 y 3211 estén libres; levanta procesos locales sin credenciales y verifica `/api/health` a backend, el 401 de `/auth/me` sin token y el 503 de identidad frontend sin Auth0. No prueba sesión real ni la respuesta autenticada de identidad. El script no modifica el backend o su base.

Las pruebas unitarias cubren decisiones explícitas, navegación de capacidades múltiples, bloqueo de opciones y errores de API. Las pruebas de navegador cubren recorrido, estados, rutas sensibles, teclado, viewport móvil, ausencia de desbordamiento y reglas automáticas esenciales axe WCAG 2 A/AA y 2.1 A en tres vistas. No constituyen una auditoría completa de accesibilidad ni garantizan todos los contrastes, lectores de pantalla o tamaños.

Resultados actuales: typecheck, lint, build, 20 unitarias y 7 recorridos de navegador con emisor no configurado pasaron en Node 24.18.0. El build y Playwright se ejecutaron en copia aislada sin credenciales. La prueba de producción confirmó 404 para las rutas de demostración aun con la variable activada. El usuario informó un recorrido académico autenticado con Auth0 real; PostgreSQL confirmó el avance, sin captura directa del token o del 200. La migración candidata sigue sin aprobarse. ESLint 9.39.5 sigue fuera de soporte y requiere actualización compatible de plugins.
