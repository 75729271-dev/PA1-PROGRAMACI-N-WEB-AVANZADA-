# Reparto de responsabilidades

**Estudiante:** Angel Fernando Reyes Moreno<br>
**Sección:** 4060.202620<br>
**Docente:** ESPINOZA BRAVO, WILDER JULIO<br>
**Modalidad presentada:** individual por motivos personales.

Al presentar la PA1 de manera individual, asumo todas las responsabilidades del trabajo. El reparto se organiza según las diez diapositivas de la [presentación final](../output/exposicion/Campus-PA1-Presentacion-final.pptx), que siguen el mismo orden que el video de exposición.

| Diapositiva | Tema | Responsabilidad | Evidencia en el repositorio |
|---|---|---|---|
| 1 | Presentación | Presentar el caso Campus, el curso y los datos de la entrega | README, sección de datos generales |
| 2 | Objetivo y desarrollo | Analizar el caso de solicitudes académicas y definir el procedimiento: modelos, componentes, formulario y rutas, API | README, secciones 2 y 3 |
| 3 | Actividad 1 · TypeScript | Definir las interfaces `Estudiante`, `NuevaSolicitud` y `Solicitud`, los estados tipados y las utilidades ES6+ | `src/app/core/models/`, `src/app/core/utils/`, `tsconfig.json` |
| 4 | Actividad 2 · Angular | Organizar componentes, `SolicitudesModule`, `SharedModule` y el servicio inyectado `SolicitudesService` | `src/app/features/solicitudes/`, `src/app/shared/`, `src/app/core/services/solicitudes.service.ts` |
| 5 | Actividad 3 · Formulario | Construir el formulario reactivo y sus validaciones de nombre, código, correo, asunto y descripción | `nueva-solicitud.component.ts`, `solicitud.validators.ts`, captura 02 |
| 6 | Actividad 3 · Rutas | Configurar `RouterModule` (listado, nueva, detalle) y la persistencia en `localStorage` | `app-routing.module.ts`, `solicitudes.module.ts`, captura 03 |
| 7 | Actividad 4 · HttpClient | Consumir la API REST de JSONPlaceholder con `HttpClient` y `async/await`, validando el JSON recibido | `directorio.service.ts`, `directorio.component.ts`, `evidencias/consumo-api-real.json` |
| 8 | Robustez y alcance | Manejar errores, tiempo máximo de espera y reintento; justificar Angular 16 y el alcance sin backend | `docs/ARQUITECTURA.md`, captura 05 |
| 9 | Verificación | Ejecutar tipado, compilación y las 18 pruebas de navegador, y registrar sus resultados | `tests/solicitudes.spec.ts`, `evidencias/` |
| 10 | Conclusiones | Exponer los resultados, las limitaciones y la siguiente etapa del proyecto | README, sección 7 y [video](https://www.youtube.com/watch?v=TKgLy1HdxAg) |

## Acuerdos de trabajo

- Desarrollar la solución en el orden de las cuatro actividades de la consigna, partiendo del modelo de datos.
- Validar cada actividad con pruebas y capturas antes de pasar a la siguiente.
- Mantener en el repositorio solo el código, la documentación, las evidencias y la presentación final.
- Explicar en el video el procedimiento seguido y las decisiones técnicas, con la cámara encendida.

La asistencia y participación en las sesiones 1 a 4 se verifican directamente con el docente.
