# Revisión final y puntos delicados de la consigna

## Qué ya contiene esta base

- Las cuatro actividades implementadas en Angular 16 y TypeScript estricto.
- Código organizado, diseño adaptable y estados de error/vacío/carga.
- Pruebas automáticas y estructura de evidencias reproducible.
- README con desarrollo, solución, fuentes y datos del estudiante.
- Guion de exposición individual y plantilla de seguimiento real.

Consultar `evidencias/README.md` para los resultados finales de ejecución.

## Qué debe completar Angel

1. **Confirmar la entrega individual.** El PDF indica equipos de 4, máximo 5. Trabajar solo no crea una excepción automática. Solicitar confirmación al docente y conservarla.
2. **Comprender y revisar el trabajo.** Ejecutar los pasos del README y poder explicar modelos, servicios, formulario, rutas y llamada HTTP. Registrar cualquier adaptación propia.
3. **Completar la participación real.** Llenar `PARTICIPACION.md` con avances verificables de sesiones 1 a 4 y trasladar un resumen a la matriz del README.
4. **Grabar la exposición.** Usar el guion, mantener la cámara encendida y mostrar procedimiento, decisiones, código y ejecución. Explicar con palabras propias.
5. **Publicar en YouTube.** Seleccionar Público, comprobar acceso sin sesión y reemplazar `[PEGAR AQUÍ EL ENLACE]` en el README por la URL real.
6. **Comprobar GitHub.** El docente debe poder abrir el repositorio, el README, el código y las capturas. Entregar el enlace requerido por el aula virtual.

## Inconsistencias y requisitos fáciles de omitir

| Punto | Evidencia en el material | Decisión o acción |
|---|---|---|
| Angular 16 frente a diapositivas de versiones 19/20 | PDF actividad 2 y sesión 3, portada; cuerpo de la sesión 3 menciona Angular 20 | Se fija Angular 16.2.12. No instalar automáticamente el último CLI. |
| `@if` y `@for` incompatibles con Angular 16 | Sesión 3 diapositivas 25–26 y sesión 4 diapositivas 12, 15, 30 | Se usan `*ngIf` y `*ngFor`; el control de flujo nuevo existe desde v17. |
| 12 puntos técnicos frente a 10 | PDF sección E dice 12; tabla H: 3+3+2+2 | La tabla H totaliza 20. Pedir aclaración si el docente utiliza otro reparto. |
| Solo un integrante | PDF páginas 1–2 indica 4, máximo 5 | Confirmar excepción individual; no inventar miembros. |
| API indicada o autorizada | PDF actividad 4 | Se usa JSONPlaceholder `/users`, presente en sesión 4 diapositiva 30. Si el docente comunica otra fuente, adaptar el servicio. |
| Backend Node.js | PDF nota curricular y actividad 4 | Se documenta integración conceptual, sin adelantar backend. Node se usa para herramientas del frontend. |
| React en el temario | Sesión 2 compara integración con frameworks | El caso pide Angular. No exige duplicar la aplicación en React. |
| Namespaces y módulos | Sesión 1 explica ambos; actividad 1 pide módulos coherentes | Se justifican módulos ES. No se agrega un namespace redundante solo para marcar una palabra del temario. |
| Webpack | Sesión 2 enseña configuración genérica | Angular CLI gestiona el builder Webpack; documentar cómo comprobarlo. |
| Interfaz TS no es validación de JSON | Sesión 2 usa genéricos y aserciones | Se añade comprobación de estructura con `unknown` y type guards. |
| Registro local no acredita API | Actividad 4 pide evidencia verificable de consumo REST | Se incluyen petición HTTP real, estado, URL y captura del directorio, separados de localStorage. |
| El video debe ser público y estar en README | PDF secciones F y G | Un video privado, un marcador vacío o solo un enlace en el aula no cumple. |
| Cámara y dominio del trabajo | PDF sección G | Mostrar cámara y explicar decisiones; no limitarse a leer diapositivas. |
| Duración del video | PDF sección G | 8–12 minutos es sugerencia pedagógica, no una condición oficial del sílabo. |
| Evidencia individual de clases | PDF sección D y rúbrica H | El producto funcional no reemplaza los 3 puntos de seguimiento individual. |

Estas observaciones describen incompatibilidades y omisiones posibles. No se presupone intención del docente de engañar.

## Publicación del repositorio

Destino indicado por Angel: <https://github.com/75729271-dev/PA1-PROGRAMACI-N-WEB-AVANZADA->.

Si falta autenticación durante la subida, iniciar sesión en GitHub con el gestor de credenciales del equipo y ejecutar `git push -u origin main`. No pegar tokens en el README ni en mensajes. El estado real de publicación debe comprobarse en GitHub.

No subir `node_modules`, `.tools`, `.angular`, `tmp` ni archivos de credenciales. El `.gitignore` ya excluye esas rutas. Conservar `package-lock.json` para instalación reproducible, `src`, configuraciones, documentación y evidencias.

## Comprobación antes de entregar

- [ ] Modalidad individual aceptada por el docente.
- [ ] Nombres, sección y docente correctos.
- [ ] El proyecto arranca siguiendo el README.
- [ ] Las cuatro actividades se pueden demostrar.
- [ ] Los resultados y capturas corresponden a esta versión.
- [ ] Matriz de participación y seguimiento completados con información real.
- [ ] Video propio público, cámara encendida, audio y pantalla legibles.
- [ ] Enlace de YouTube colocado dentro del README.
- [ ] Repositorio accesible para el docente.
- [ ] Enlace final enviado por el canal de entrega del curso.
