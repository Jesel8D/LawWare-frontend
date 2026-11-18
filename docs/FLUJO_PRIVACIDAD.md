# Flujo de privacidad previsto

1. Mostrar el contenido y la versión del aviso que el backend registre como presentado. La presentación prueba puesta a disposición, no lectura ni comprensión.
2. Permitir una decisión explícita por cada finalidad consentible, incluyendo aceptación o rechazo, y enviar la decisión al backend para su confirmación transaccional.
3. Tras autenticación validada por backend, vincular el prerregistro mediante el mecanismo de sesión y secreto que acuerde el equipo; la interfaz no debe tratar un UUID público como prueba de titularidad.
4. Permitir solicitar una revocación parcial que identifique la autorización original. Mostrar su resultado confirmado por backend.
5. Resolver estados de carga y error sin exponer secretos ni afirmar que una operación fallida fue confirmada.

## Estado de esta fase

El recorrido `/demo/registro/aviso` está **implementado con datos sintéticos**, solo en desarrollo. El aviso y las finalidades son ejemplos explícitamente no aprobados. La opción opcional inicia sin decisión; elegir aceptar o rechazar permite una revisión temporal en memoria, pero el botón de guardar está deshabilitado. Continuar a vinculación no registra ni confirma nada. Mostrar la página no evidencia una presentación persistida.

La lectura autorizada de un aviso configurado está implementada experimentalmente, sujeta al SQL propuesto no aprobado; mostrarlo no registra presentación. El registro de presentación, decisiones, vinculación, consulta de estados distintos de ACTIVO, historial, revocación y confirmación transaccional siguen sin endpoint implementado. El contenido legal, finalidades y reglas requieren aprobación. No se puede inferir registro pendiente de un 401 o 403. Consulte [contratos](api/CONTRATOS.md) y [decisiones generales](https://github.com/Jesel8D/LawWare-context/blob/main/decisions/DECISIONES_PENDIENTES.md).
