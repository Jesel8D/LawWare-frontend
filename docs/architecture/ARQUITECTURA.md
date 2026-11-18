# Arquitectura y matriz de capacidades

## Límites

Next.js App Router organiza rutas públicas, pantallas visuales de desarrollo y adaptadores de servidor. `features/privacy` y `features/dashboard` agrupan comportamientos, `components` aporta elementos compartidos y `lib/api` valida respuestas. El frontend nunca consulta PostgreSQL. El cliente Auth0 oficial mantiene la sesión y obtiene el access token en servidor; `/api/identity` llama al backend y nunca devuelve el token. El endpoint de access token del SDK se deshabilita. El usuario informó un recorrido real de Auth0; el token y el 200 de identidad no se inspeccionaron directamente.

La demostración solo funciona si `NODE_ENV=development` y `LAWWARE_DEMO=1`. Los escenarios son constantes sintéticas y la URL selecciona solo una vista: no crea una sesión y nunca autoriza operaciones. Las rutas reales usan el BFF con sesión y capacidades del backend; sin ellas no muestran datos. El backend verifica permisos en cada operación; el BFF comprueba origen en escrituras.

## Matriz de consolidación

| Capacidad | Backend actual | Frontend y estado |
|---|---|---|
| Salud del proceso | `GET /health` | Integración local real mediante `/api/health`; no comprueba proveedores. |
| Usuario activo | `GET /api/v1/auth/me`, Auth0 y PostgreSQL necesarios | Adaptador servidor implementado; respuesta 200 real no capturada directamente. |
| Inicio de sesión | Verificación de tokens implementada con SDK | Login y logout reales informados por el usuario; token no inspeccionado. |
| Aviso vigente | Endpoint experimental deshabilitado | Indisponible; presentación no registrada. |
| Presentación, decisiones, vinculación, historial y revocación | Endpoints inexistentes | Recorrido sintético; envío y confirmación deshabilitados. |
| Cuenta no activa y registro | `/auth/me` devuelve 403 sin distinguir motivo | Escenarios visuales; transición y consulta específica pendientes. |
| Roles/permisos efectivos | Endpoint experimental basado en PostgreSQL | BFF y navegación implementados; SQL propuesto y aislamiento de dos usuarios pendientes de aprobación. |
| Aprendizaje | Módulos, lecciones y avance experimentales | El usuario informó recorrido real; PostgreSQL confirmó avance en laboratorio desechable. |
| Contenido y administración | Sin operaciones implementadas | Navegación basada en permiso; acciones deshabilitadas. |

SQL define `rol`, `permiso`, `usuario_rol` y `rol_permiso`, pero no fija códigos de roles de aplicación en el esquema examinado. `lawware_app`, `lawware_editor_service` y otros son roles técnicos PostgreSQL, no equivalencias de perfiles de interfaz. Un usuario puede acumular capacidades; no se selecciona un rol principal.

Escenarios sin capacidades (visitante, pendiente, bloqueado, inactivo, anonimizado, errores) no muestran aprendizaje, gestión ni administración. Estudiante muestra aprendizaje; gestión muestra contenido; administración muestra supervisión; múltiples muestra la unión. Estas reglas solo controlan la demostración.

## Pendientes transversales

Backend debe definir APIs de prerregistro y consentimiento, estado distinguible, semántica definitiva de permisos, vinculación y registro seguro de errores. La salida 401 del SDK backend puede incluir error de JWKS y 403 combina usuario inexistente/no activo; ninguno define por sí solo un alta. `app.user_id` no constituye identidad fuerte. Revisar Auth0 real, CORS, RLS y pool, TLS y auditoría externa antes de producción.
