# AUREN Finance — Demo de inventarios y finanzas

## Identidad AUREN

Esta versión utiliza el monograma de AUREN, azul petróleo, marfil y arena; tipografías Manrope y DM Sans incluidas localmente. No requiere cargar tipografías desde Internet. Conserva las funciones de Neo Control y las claves de guardado anteriores para reutilizar sus datos cuando se abre en el mismo origen del navegador (mismo protocolo, dirección y puerto). Usar localhost en lugar de 127.0.0.1 crea un almacenamiento distinto.

## Abrir con Live Server

Extrae toda la carpeta auren_finance. En VS Code abre esa carpeta y haz clic derecho en index.html → Open with Live Server. Usa la dirección que abra Live Server. Si VS Code tiene abierta la carpeta superior, la dirección normalmente será http://127.0.0.1:5500/auren_finance/index.html. Si abres directamente la carpeta auren_finance, será http://127.0.0.1:5500/index.html. Conserva assets y vendor junto a los archivos HTML, CSS y JS.

No se ha publicado esta aplicación. Es una demo local, sin usuarios ni sincronización entre equipos. El periodo de muestra es octubre de 2026. La importación disponible es de inventario inicial; la carga de ventas y gastos no está incluida.

Aplicación demostrativa independiente de AUREN. Toda la información, productos, movimientos y resultados financieros son ficticios.

## Abrir desde un puerto local

1. Extrae el ZIP.
2. Abre la carpeta `auren_finance` en Visual Studio Code.
3. Abre la terminal dentro de esa carpeta.
4. Ejecuta:

```powershell
py -m http.server 5500
```

5. Abre en Chrome:

```text
http://localhost:5500
```

Para detener el servidor presiona `Ctrl + C` en la terminal.

`localhost` solo funciona en la computadora donde se ejecuta. Para compartir la demo con prospectos debe publicarse en GitHub Pages u otro alojamiento web.

## Funciones incluidas

### Cargar inventario desde Excel o CSV

Entra en Cargar datos, descarga la plantilla y reemplaza el ejemplo por tus productos. Carga el archivo, revisa los errores y confirma. Solo se acepta la primera hoja, sin fórmulas, máximo 5 MB y 5,000 productos. Los códigos deben ser únicos. La carga reemplaza el inventario y reinicia movimientos y resultados financieros para no mezclarlos con el ejemplo. Puedes descargar un respaldo Excel antes de confirmar; su hoja Inventario se puede volver a importar. El historial de movimientos del respaldo es solo para consulta.

Esta etapa no importa ventas ni gastos. Los movimientos nuevos se registran en pantalla. En modo de inventario propio la utilidad se muestra antes de gastos e impuestos. Los datos solo permanecen en el navegador actual. Conserva la carpeta vendor: permite leer Excel sin conexión a servicios externos.

Con Live Server, abre index.html mediante Open with Live Server y utiliza la dirección que muestre el navegador, incluyendo la ruta de la carpeta.

- Resumen de ventas, utilidad, valor de inventario y alertas.
- Consulta y filtros del catálogo de productos.
- Registro de ventas, compras y ajustes de inventario.
- Actualización automática de existencias e indicadores.
- Estado de resultados estimado.
- Distribución de gastos operativos.
- Descarga de inventario y resumen financiero en CSV.
- Persistencia local de los movimientos.
- Botón para restablecer la demostración.

## Publicar después en GitHub Pages

1. Crea un repositorio público, por ejemplo `auren-finance`.
2. Sube todo el contenido de la carpeta `auren_finance` a la raíz del repositorio: `index.html`, los archivos CSS y JavaScript, y las carpetas `assets` y `vendor`. No subas el ZIP.
3. Entra en `Settings → Pages`.
4. Selecciona `Deploy from a branch`.
5. Elige `main` y `/(root)`.
6. Presiona `Save`.

La dirección tendrá una estructura similar a:

```text
https://TU-USUARIO.github.io/auren-finance/
```
