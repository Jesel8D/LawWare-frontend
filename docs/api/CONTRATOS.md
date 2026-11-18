# Contratos de integración

El backend de referencia está en una rama local todavía sin commit. Contratos inspeccionados en su código:

El [contrato full stack propuesto](CONTRATO_FULL_STACK_PROPUESTO.md) es una copia idéntica de la versión de la rama backend. Incluye propuestas pendientes; el endpoint experimental de aviso está deshabilitado. Ambas copias deben revisarse juntas.

| Endpoint | Respuesta comprobada en código | Uso |
|---|---|---|
| `GET /health` | `200 {"status":"ok"}` | `/api/health` lo consulta desde servidor; prueba local ejecutada. |
| `GET /api/v1/auth/me` | `200 {"id_usuario":"<uuid>","estado":"ACTIVO"}`; 401, 403, 503, 500 según error | `/api/identity` obtiene access token desde SDK en servidor y valida forma; sin proveedor devuelve 503. El recorrido real fue informado por el usuario; el 200 no se capturó directamente. |
| Capacidades, módulos, lecciones y avance | Ver `LawWare-backend/docs/api/ENDPOINTS.md` | BFF `/api/vertical/*`; recorrido real informado por el usuario con SQL candidato no aprobado. |
| Aviso vigente | Endpoint experimental deshabilitado: 503 | Sin consulta ni registro de presentación o consentimiento. |

Los errores del backend tienen `error` y `requestId`; 401 puede abarcar indisponibilidad JWKS y 403 incluye ausencia o estado no activo. El adaptador no decide registrar usuarios al recibir esos errores. La URL de backend no se expone mediante variables `NEXT_PUBLIC`; no se devuelve el token al navegador.

`/api/identity` devuelve códigos genéricos `UNAUTHENTICATED`, `FORBIDDEN`, `BACKEND_ERROR`, `INVALID_BACKEND_RESPONSE` e `IDENTITY_UNAVAILABLE` para 401, 403, 500, 502 y 503, respectivamente. Otros errores del SDK o de red se tratan como 503 sin exponer detalles. El cliente no sigue redirecciones del backend; sus respuestas no se almacenan en caché. Configurar la misma audiencia de API en ambos servicios, distinta del client ID, y probar emisor/algoritmo/tokens en un tenant autorizado antes de afirmar compatibilidad real.

## Propuestas, no endpoints implementados

Deben acordarse semántica, esquemas, autenticación, idempotencia, retención y auditoría antes de implementación:

- Inicio y consulta de prerregistro mediante sesión segura sin exponer secretos.
- Acordar y aprobar el uso del aviso vigente y sus finalidades; el endpoint experimental está deshabilitado.
- Registrar presentación; registrar explícitamente decisiones por finalidad en transacción y recibir resultado confirmado.
- Consultar estado de cuenta de manera segura sin deducirlo de 401/403; vincular tras verificación.
- Revisar y aprobar los permisos efectivos y sus códigos; el endpoint experimental une roles activos sin confiar en valores del cliente.
- Consultar historial y solicitar revocación parcial vinculada a la decisión original.

Ningún ejemplo de finalidad, aviso o permiso visual es un contrato legal o código de rol definitivo. No existe aprobación para recolección real.
