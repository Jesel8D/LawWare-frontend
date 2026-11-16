# Flujo de privacidad previsto

1. Mostrar el contenido y la versión del aviso que el backend registre como presentado. La presentación prueba puesta a disposición, no lectura ni comprensión.
2. Permitir una decisión explícita por cada finalidad consentible, incluyendo aceptación o rechazo, y enviar la decisión al backend para su confirmación transaccional.
3. Tras autenticación validada por backend, vincular el prerregistro mediante el mecanismo de sesión y secreto que acuerde el equipo; la interfaz no debe tratar un UUID público como prueba de titularidad.
4. Permitir solicitar una revocación parcial que identifique la autorización original. Mostrar su resultado confirmado por backend.
5. Resolver estados de carga y error sin exponer secretos ni afirmar que una operación fallida fue confirmada.

La representación visual, el texto legal, la accesibilidad y los contratos de API aún deben definirse y verificarse. Este documento no implementa ni aprueba el flujo.
