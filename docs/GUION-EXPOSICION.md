# Guion individual de exposición · Angel Fernando Reyes Moreno

Duración orientativa: 10 minutos. La consigna sugiere 8 a 12 minutos. Confirmar primero la autorización para presentar individualmente. Mantener la cámara encendida durante toda la exposición y el código legible. Este guion es una guía de preparación: explicar con palabras propias y demostrar el funcionamiento.

## Preparación antes de grabar

1. Ejecutar el proyecto, comprobar Internet y probar el directorio.
2. Abrir el README y los archivos indicados abajo en el editor.
3. Preparar una ventana de navegador con los seis ejemplos iniciales. Si se restablece la demo, eliminar únicamente la clave del portal, como explica el README.
4. Comprobar cámara, micrófono y legibilidad de pantalla. Cerrar notificaciones y pestañas personales.
5. Utilizar datos ficticios. No mostrar contraseñas, tokens o información de otras personas.

## 0:00–0:50 · Presentación y problema

Presentarse con nombre completo, curso, PA1, sección y docente. Explicar que Campus organiza solicitudes académicas y que el objetivo es demostrar TypeScript y Angular 16 hasta la sesión 4.

Mostrar el listado. Aclarar que los registros iniciales son ejemplos y que las solicitudes se almacenan en el navegador. Si el docente autorizó la modalidad individual, mencionarlo de forma verificable.

## 0:50–2:15 · Actividad 1 y procedimiento

Abrir `src/app/core/models/solicitud.model.ts` y `src/app/core/utils/solicitud.utils.ts`.

- Explicar por qué se separan estudiante, entrada del formulario y solicitud registrada.
- Mostrar la unión de estados. Explicar que un estado no definido genera un error de tipos.
- Mostrar `const`, `let` en los contadores, una función flecha, destructuración y spread.
- Explicar que se modelaron primero los datos y después se conectaron servicios y vistas.

Abrir `tsconfig.json`: explicar `strict`. Mostrar la evidencia de compilación. Señalar que los módulos ES sustituyen la necesidad de un namespace global en este proyecto.

## 2:15–3:35 · Actividad 2: módulos, componentes y servicio

Mostrar `app.module.ts`, `solicitudes.module.ts` y `solicitudes.service.ts`.

- Explicar qué declara un módulo y por qué el módulo de solicitudes se carga por ruta.
- Mostrar el constructor del listado que recibe el servicio. Angular entrega la instancia compartida.
- Explicar el `BehaviorSubject` como estado que comunica cambios al listado y el pipe `async` como suscriptor de la vista.
- Mostrar interpolación, `*ngFor`, `*ngIf`, binding de estado al componente reutilizable y `[(ngModel)]` en búsqueda.

Buscar `lucia` y filtrar por estado. Explicar que la búsqueda normaliza acentos y no cambia los datos originales.

## 3:35–5:40 · Actividad 3: formulario y navegación

Abrir «Nueva solicitud» e intentar registrar en blanco. Mostrar errores. Probar un correo inválido y código incompleto.

Abrir `nueva-solicitud.component.ts` y `solicitud.validators.ts`. Explicar `FormBuilder`, validadores, `touched` y por qué los espacios no cumplen la longitud mínima. Mostrar que el método comprueba validez antes de llamar al servicio.

Completar datos ficticios:

| Campo | Valor de demostración |
|---|---|
| Nombre | Andrea Ejemplo |
| Código | A20261234 |
| Correo | andrea@example.com |
| Tipo | Constancia de estudios |
| Asunto | Constancia para prácticas profesionales |
| Descripción | Solicito una constancia de estudios para adjuntar a mi postulación de prácticas profesionales. |

Guardar. Mostrar la confirmación, ID y estado pendiente. Regresar al listado y recargar. Explicar qué demuestra la persistencia local y qué no ofrece.

Mostrar `RouterModule.forRoot`/`forChild` y la ruta `:id`. Explicar por qué `nueva` aparece antes de la ruta dinámica.

## 5:40–7:35 · Actividad 4: API REST real

Abrir DevTools → Network y luego «Directorio». Filtrar `users`, seleccionar la petición y mostrar URL, GET, estado 200 y JSON recibido. Relacionar un usuario del JSON con su tarjeta.

Abrir `directorio.service.ts`: explicar `HttpClient`, Observable, inyección, `observe: 'response'` y validación de `unknown`. Abrir `DirectorioComponent.cargar()` y explicar `async/await` y `firstValueFrom`.

Cambiar Network a Offline, actualizar y mostrar el error. Volver a Online y reintentar. Aclarar que JSONPlaceholder proporciona usuarios ficticios y que no recibe las solicitudes locales.

## 7:35–8:45 · Pruebas y decisiones

Mostrar los resultados automáticos de `evidencias/pruebas.txt` y las capturas. Distinguir la prueba **API REAL** de los escenarios con respuestas controladas. Explicar al menos un caso: almacenamiento bloqueado, correo inválido o reintento HTTP.

Explicar las decisiones de alcance:

- Angular 16 porque lo exige la consigna; las diapositivas mezclan ejemplos posteriores.
- `*ngIf`/`*ngFor` por compatibilidad.
- Webpack mediante Angular CLI y source maps para depuración.
- No implementar aún backend: el requisito corresponde a etapas posteriores.

## 8:45–10:00 · Conclusiones y cierre

Explicar las conclusiones del README con ejemplos de lo mostrado. Mencionar los límites: almacenamiento por navegador, datos ficticios y ausencia de flujo administrativo real.

Describir los aportes y cambios que realmente realizaste, incluida la asistencia de herramientas cuando corresponda. Mostrar el repositorio y cómo ejecutar el proyecto. Comprobar al finalizar que la grabación incluye cámara y audio.

## Preguntas para ensayar

| Pregunta probable | Idea que debes poder explicar |
|---|---|
| ¿Una interfaz valida el JSON de una API? | No. Desaparece al compilar; por eso se valida la estructura recibida. |
| ¿Por qué un servicio? | Centraliza estado o acceso a datos y evita duplicar lógica entre componentes. |
| ¿Por qué formulario reactivo? | Define controles y reglas explícitas, facilita inspección y pruebas. |
| ¿Por qué guardar primero y actualizar después? | Evita anunciar éxito si `localStorage` falla. |
| ¿Qué pasa al recargar? | Se leen y validan los registros del mismo origen en localStorage. |
| ¿Qué diferencia hay entre Observable y Promise aquí? | HttpClient entrega un Observable; firstValueFrom espera su primera respuesta como Promise. |
| ¿Dónde se usa async/await? | En la carga del directorio, con try/catch/finally. |
| ¿Por qué no @if? | Pertenece a Angular 17+, y el proyecto requerido es Angular 16. |
| ¿Por qué no hay backend? | La PA1 solo exige frontend que consuma una fuente REST disponible. |
| ¿Cómo se integra un backend después? | Cambiando la persistencia del servicio por peticiones a endpoints propios y validación en servidor. |

## Después de grabar

Publicar en YouTube con visibilidad **Público**. Copiar el enlace real en la línea obligatoria del README. Abrirlo sin sesión para comprobar disponibilidad. No sustituir el video propio por enlaces de clase ni presentar un archivo local como video publicado.
