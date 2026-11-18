# Sistema visual y rutas

Identidad de tonos verdes y neutros, acentos lavanda y melocotón, tipografía de sistema con títulos serif, jerarquía editorial y controles visibles. Tokens en `src/app/globals.css`. No se cargan fuentes externas. Tarjetas, botones, encabezado, sidebar, mensajes, formularios y estados vacíos comparten estilos; las áreas de estudiante, contenido y administración presentan información distinta. Existe enlace para saltar al contenido, etiquetas para los radios, foco visible y disposición adaptable.

| Ruta | Estado |
|---|---|
| `/` | Bienvenida e introducción. |
| `/acceso` | Auth0 preparado; botón real deshabilitado si no está configurado. |
| `/registro` | Explicación; alta real deshabilitada. |
| `/privacidad/aviso` | Sin contenido legal real; enlace al ejemplo en desarrollo. |
| `/demo/registro/aviso` | Flujo visual de aviso, finalidad, revisión y vinculación. |
| `/demo/{escenario}/{seccion}` | Panel sintético con navegación por capacidades. |
| `/dashboard`, `/aprendizaje`, `/aprendizaje/{id}`, `/aprendizaje/leccion/{id}` | UI real experimental con BFF; requiere backend, SQL aprobado y sesión Auth0. |
| `/contenido`, `/administracion`, `/cuenta` | Espacios reales con navegación por permisos; acciones de gestión pendientes. |
| `/cuenta/aviso` | Consulta autorizada de aviso configurado; no registra presentación. |
| `/api/health`, `/api/identity` | Adaptadores de servidor; ver contratos. |

Secciones sintéticas: `dashboard`, `aprendizaje`, `dilemas`, `evaluaciones`, `contenido`, `administracion`, `cuenta`. El acceso visual directo comprueba la capacidad del escenario; no es una política de seguridad. Cuenta contiene tarjetas futuras de historial y revocación con acciones deshabilitadas; las operaciones reales, su carga y reintentos están pendientes del backend.
