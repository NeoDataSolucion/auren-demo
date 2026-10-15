# AUREN Business Suite — demo local

## Abrir
1. Extrae el ZIP completo.
2. En Visual Studio Code, abre la carpeta `auren_suite`.
3. Haz clic derecho sobre el `index.html` de esa carpeta y selecciona Open with Live Server.
4. Usuario: **demo**. Contraseña: **AurenDemo2026**.

Abre siempre el index principal, no el que está dentro de finance. La dirección depende del puerto de Live Server. La dirección 127.0.0.1 solo funciona en tu computadora; este paquete no ha sido publicado.

## Recorrido para presentar
- **Finance:** consulta inventario, registra una venta o compra, revisa resultados y carga inventario Excel/CSV con vista previa. Incluye plantilla y respaldo. La carga sustituye el inventario de prueba y reinicia sus movimientos: revisa la confirmación.
- **Concilia:** prueba el ejemplo o carga dos Excel/CSV con columnas Clave e Importe. Identifica coincidencias, diferencias, duplicados y registros presentes en un solo archivo. Exporta los resultados. Máximo 5,000 filas y 5 MB por archivo; primera hoja, valores sin fórmulas.
- **Docs:** selecciona una persona, marca documentos recibidos y descarga el control. Es un checklist; no recibe archivos personales.
- **Flow:** crea una tarea, asigna responsable y cambia su estado en el tablero. No ejecuta automatizaciones externas.
- **People:** registra una solicitud de vacaciones, permiso o falta. Aprueba o cancela. Vacaciones aprobadas descuentan saldo; cancelar lo restaura. Los días se capturan manualmente.
- **Reports:** revisa indicadores de Docs, Flow, People, Concilia y Care y descarga Excel. Los indicadores financieros se consultan dentro de Finance.
- **Care:** crea un ticket y actualiza su estado. No envía mensajes a un equipo externo.

## Datos y acceso
Todos los registros iniciales son ficticios. Los cambios se guardan en este navegador y en esta dirección local. Si cambias el puerto, navegador o equipo no aparecerán los mismos datos. No hay sincronización entre usuarios.

El acceso genérico es una simulación para presentaciones, no autenticación segura. No uses información confidencial. Cerrar sesión oculta la aplicación, pero no cifra ni elimina sus datos.

Restablecer demo solicita confirmación y elimina los cambios de los siete módulos. Los datos de la versión independiente anterior de Finance no se modifican ni se migran automáticamente.

El paquete incluye fuentes y librerías locales; no requiere servicios externos para operar. Para convertirlo en un sistema real se necesitan servidor, usuarios y permisos, base de datos y respaldos.
