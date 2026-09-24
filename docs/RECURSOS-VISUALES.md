# Recursos visuales

Las tres imágenes fueron proporcionadas por el estudiante y se integran como recursos decorativos en `src/assets/images/`.

| Recurso | Uso |
|---|---|
| `banner-academico.jpg` | Encabezado de solicitudes, con una capa de contraste sobre la fotografía |
| `nueva-solicitud.png` | Ilustración junto al formulario y resumen compacto en móvil |
| `sin-solicitudes.png` | Estado vacío o sin resultados de búsqueda |

La arquitectura de la fotografía es ilustrativa: no se presenta como una sede real de ISIL. Las imágenes no sustituyen evidencias de funcionamiento.

El texto, botones y formularios se mantienen como HTML accesible. Las imágenes decorativas usan `alt=""` para evitar información redundante a lectores de pantalla. CSS adapta los recortes al ancho disponible; el formulario móvil conserva prioridad sobre la decoración. Se reservan dimensiones para evitar saltos de contenido.
