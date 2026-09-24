# Campus · Plataforma de Gestión de Solicitudes Académicas

**Curso:** Programación Web II · Código 30690<br>
**Evaluación:** PA1 · Sesiones 1 a 4 · Periodo 202620<br>
**Sección:** 4060.202620<br>
**Docente:** ESPINOZA BRAVO, WILDER JULIO<br>
**Estudiante:** Angel Fernando Reyes Moreno<br>
**Modalidad de presentación:** individual<br>
**Repositorio:** [PA1-PROGRAMACI-N-WEB-AVANZADA-](https://github.com/75729271-dev/PA1-PROGRAMACI-N-WEB-AVANZADA-)

Profesor, presento **Campus**, una aplicación para registrar y consultar solicitudes académicas. En este documento explico el problema abordado, la solución técnica, su relación con las sesiones de clase y las evidencias que puede utilizar para revisar el funcionamiento.

**Video de exposición:** [Ver mi exposición en YouTube](https://www.youtube.com/watch?v=TKgLy1HdxAg)

## 1. Integrante y reparto de responsabilidades

Presento este trabajo de manera individual por motivos personales. Mi nombre es **Angel Fernando Reyes Moreno** y asumo el desarrollo, la documentación y la sustentación del proyecto. El reparto sigue el orden de las diapositivas de la presentación:

| Diapositivas | Responsabilidad |
|---|---|
| 1 y 2 | Análisis del caso, objetivo y procedimiento de la solución. |
| 3 | Actividad 1: modelos tipados, utilidades ES6+ y configuración TypeScript. |
| 4 | Actividad 2: componentes, módulos y servicio con inyección de dependencias. |
| 5 y 6 | Actividad 3: formulario reactivo, validaciones, rutas y persistencia local. |
| 7 y 8 | Actividad 4: consumo de la API REST, manejo de errores y decisiones técnicas. |
| 9 y 10 | Pruebas, evidencias, conclusiones y [video de sustentación](https://www.youtube.com/watch?v=TKgLy1HdxAg). |

El detalle por diapositiva, con los archivos de cada responsabilidad y los criterios de organización, está en el [reparto de responsabilidades](docs/PARTICIPACION.md).

## 2. Descripción y objetivo

El caso plantea la necesidad de organizar solicitudes de constancias de estudios, certificados de notas, cambios de horario y reservas de matrícula. Para consultar estos trámites es necesario contar con datos consistentes del estudiante y una descripción clara de lo solicitado.

Mi objetivo con esta entrega es demostrar cómo **TypeScript y Angular 16** permiten representar esos datos, validar su ingreso, organizar las pantallas y consultar información externa mediante una API REST.

La solución incluye un listado con búsqueda y filtros, un formulario reactivo, una vista de detalle, un directorio externo y una guía de uso. El registro de solicitudes y la consulta del directorio utilizan fuentes independientes: las solicitudes se guardan en el navegador y los contactos se obtienen de JSONPlaceholder.

![Vista de solicitudes de Campus](evidencias/capturas/01-solicitudes.png)

### Alcance de la aplicación

Al iniciar la aplicación por primera vez, encontrará seis solicitudes ficticias con distintos estados. Puede registrar una nueva solicitud, consultar su detalle, buscarla y comprobar que permanece después de recargar la página. Cada registro nuevo comienza en **Pendiente**.

Los datos se conservan en `localStorage`, dentro del mismo navegador y origen. Otro navegador mantiene su propia lista y borrar los datos del sitio elimina los registros locales. Los estados iniciales son ejemplos; la aplicación no realiza atención administrativa ni envía solicitudes o correos a una institución.

El directorio utiliza `https://jsonplaceholder.typicode.com/users`, fuente incluida en la sesión 4, diapositiva 30. Sus usuarios son ficticios y no están vinculados con las solicitudes registradas. El alcance de esta PA1 no incluye un backend Node.js, autenticación ni una base de datos central.

## 3. Desarrollo y solución de las cuatro actividades

### Actividad 1 · TypeScript y módulos

La estructura comienza con las interfaces `Estudiante`, `NuevaSolicitud` y `Solicitud`. Esta separación distingue los datos ingresados por el usuario de los que se agregan al guardar, como el identificador, el estado y la fecha. Los tipos y estados de solicitud utilizan uniones para limitar los valores admitidos en el código.

La configuración estricta de TypeScript permite detectar incompatibilidades antes de ejecutar. En las utilidades se aplican `const`, `let`, funciones flecha, desestructuración y spread. Los archivos comparten sus funciones y tipos mediante módulos ES con `import` y `export`.

Puede revisar los [modelos](src/app/core/models/solicitud.model.ts), las [utilidades](src/app/core/utils/solicitud.utils.ts) y la [configuración TypeScript](tsconfig.json).

### Actividad 2 · Componentes, módulos y servicios de Angular

La aplicación separa el listado, el formulario, el detalle y el directorio en componentes. `AppModule` organiza la aplicación y el módulo de solicitudes se carga al acceder a sus rutas. Los elementos compartidos, como la etiqueta de estado, se reúnen en `SharedModule`.

`SolicitudesService` centraliza el acceso a los registros. Los componentes reciben el servicio mediante inyección de dependencias y comparten los cambios sin duplicar la lógica de almacenamiento. Las plantillas utilizan interpolación, enlaces de propiedades, eventos, `*ngIf`, `*ngFor` y `[(ngModel)]` para los filtros.

Puede comprobar esta organización en el [módulo de solicitudes](src/app/features/solicitudes/solicitudes.module.ts) y el [servicio de solicitudes](src/app/core/services/solicitudes.service.ts).

### Actividad 3 · Formulario reactivo y navegación

El formulario está definido con `FormBuilder` y controles tipados. Las reglas verifican campos obligatorios, correo, código del estudiante y longitudes mínimas y máximas. El código debe comenzar con `A` y continuar con ocho dígitos. El asunto requiere al menos cinco caracteres útiles y la descripción, veinte; ingresar únicamente espacios no satisface la validación. Estas reglas corresponden al caso de demostración.

Si los datos son inválidos, aparecen mensajes junto a los campos y el registro se detiene. Si son válidos, el servicio guarda la solicitud y el Router abre su detalle. El almacenamiento se realiza antes de comunicar el cambio a la vista: si falla, se informa el error y se conserva el contenido del formulario.

`RouterModule.forRoot` define la navegación principal y `forChild` organiza las rutas del módulo. La ruta `nueva` se declara antes de `:id` para evitar que se interprete como un identificador.

La implementación está en el [componente del formulario](src/app/features/solicitudes/nueva-solicitud.component.ts), sus [validadores](src/app/features/solicitudes/solicitud.validators.ts) y las [rutas principales](src/app/app-routing.module.ts).

### Actividad 4 · Consumo de una API REST

En **Directorio** puede comprobar una petición GET real a JSONPlaceholder. `DirectorioService` utiliza `HttpClient`, obtiene la respuesta como `unknown` y valida su estructura antes de mostrarla. Esta comprobación es necesaria porque una interfaz TypeScript no valida por sí sola el JSON recibido durante la ejecución.

El componente utiliza `async/await` con `firstValueFrom` para esperar la respuesta del Observable. La pantalla distingue carga, resultado y error, permite reintentar y establece un tiempo máximo de espera de doce segundos.

Puede revisar el [servicio HTTP](src/app/core/services/directorio.service.ts), el [componente del directorio](src/app/features/directorio/directorio.component.ts) y la [evidencia de consumo real](evidencias/consumo-api-real.json).

### Procedimiento y decisiones

El desarrollo partió del modelo de datos y de las reglas de las solicitudes. Sobre esa base se organizaron los servicios, los componentes y la navegación. Después se conectaron el formulario y el directorio, se incorporaron los estados de error y se verificó el recorrido completo mediante pruebas de navegador.

Se mantiene **Angular 16.2.12**, con CLI 16.2.16 y TypeScript 5.1.6, de acuerdo con el caso de la PA1. Los módulos ES organizan el código TypeScript y los `NgModule` agrupan los elementos de Angular. El proyecto utiliza el builder `@angular-devkit/build-angular:browser`, que gestiona Webpack desde Angular CLI. Las opciones `strict`, `strictTemplates` y los source maps apoyan la revisión y depuración.

La [documentación de arquitectura](docs/ARQUITECTURA.md) amplía estas decisiones. Las imágenes se incorporan como apoyo visual al encabezado, al formulario y a los estados vacíos; su uso se describe en [recursos visuales](docs/RECURSOS-VISUALES.md).

### Relación con las sesiones de clase

| Sesión | Aplicación en Campus |
|---|---|
| 1 | ES6+, interfaces, uniones, tipado estático, módulos ES y `async/await` en la consulta del directorio. |
| 2 | Componentes y servicios tipados, TSConfig, compilación con Angular CLI y Webpack, source maps y separación de responsabilidades. |
| 3 | Angular 16, `NgModule`, componentes, data binding, directivas y servicios con inyección de dependencias. |
| 4 | Formularios reactivos, validaciones, RouterModule, HttpClient y explicación de una futura integración con backend. |

## 4. Instrucciones de ejecución para la revisión

Para reproducir el proyecto se requiere **Node.js 18.20.8**, npm **10.x**, Git y un navegador. La instalación de dependencias y la consulta del directorio requieren conexión a Internet. Las versiones se conservan para reproducir el entorno académico de Angular 16; `.nvmrc` registra la versión de Node.

Desde una terminal puede ejecutar:

```bash
git clone https://github.com/75729271-dev/PA1-PROGRAMACI-N-WEB-AVANZADA-.git
cd PA1-PROGRAMACI-N-WEB-AVANZADA-
npm ci
npm start
```

La aplicación estará disponible en **http://127.0.0.1:4200**. En Windows, si PowerShell bloquea `npm.ps1`, puede utilizar `npm.cmd` en los mismos comandos.

### Recorrido sugerido

1. En `/solicitudes`, con los datos iniciales, encontrará seis ejemplos y sus contadores. La búsqueda `lucia` permite comprobar la coincidencia sin acentos; también puede filtrar por estado.
2. En `/solicitudes/nueva`, al pulsar **Registrar solicitud** sin completar los campos aparecen los errores de validación y no se guarda ningún registro.
3. Para probar un registro válido puede usar `Andrea Ejemplo`, `A20261234`, `andrea@example.com`, el tipo **Constancia de estudios**, un asunto de al menos cinco caracteres y una descripción de al menos veinte.
4. Al guardar verá el detalle, el identificador y el estado pendiente. Si regresa al listado y recarga la página, la solicitud se conserva.
5. En `/directorio` puede comprobar los contactos y la respuesta HTTP. En DevTools → Network, la petición `users` muestra la URL, el método GET y el JSON recibido.
6. Para revisar el manejo de errores puede activar Offline en Network y actualizar el directorio. Al recuperar la conexión, **Reintentar** vuelve a consultar la API.
7. Una ruta o un identificador inexistente muestran los mensajes correspondientes.

Si necesita restablecer los ejemplos, puede eliminar únicamente la clave `campus.solicitudes.v1` desde DevTools → Application → Local Storage y recargar. Esa operación elimina las solicitudes locales de Campus.

### Comprobación técnica

```bash
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

El build genera `dist/campus/`. Las pruebas utilizan sesiones aisladas del navegador y no modifican los registros de su sesión personal. La prueba **API REAL** consulta el servicio externo; las demás controlan las respuestas HTTP para comprobar de forma repetible situaciones como errores de red o datos inesperados.

Para ejecutar los grupos por separado o consultar el informe:

```bash
npm test -- --grep-invert "API REAL"
npm test -- --grep "API REAL"
npx playwright show-report
```

GitHub Actions ejecuta la instalación, el tipado, la compilación y las pruebas independientes de la disponibilidad de la API externa.

## 5. Resultados y evidencias

La ejecución documentada registra **18 pruebas de navegador aprobadas**, comprobación de tipos sin errores y compilación de producción correcta. La consulta real al directorio respondió **HTTP 200** con **10 usuarios**. Las fechas y los resultados detallados están disponibles en los archivos de evidencia.

| Evidencia | Qué puede comprobar |
|---|---|
| [Listado de solicitudes](evidencias/capturas/01-solicitudes.png) | Componentes, indicadores, directivas y registros iniciales. |
| [Formulario inválido](evidencias/capturas/02-validaciones.png) | Mensajes por campo y bloqueo del registro incompleto. |
| [Registro correcto](evidencias/capturas/03-registro-exitoso.png) | Confirmación y navegación al detalle de una solicitud válida. |
| [Consumo real de API](evidencias/capturas/04-api-real.png) | Contactos obtenidos mediante una petición real. |
| [Error HTTP simulado](evidencias/capturas/05-error-api-simulado.png) | Respuesta de la interfaz ante un HTTP 503 inducido por la prueba. |
| [Vista móvil](evidencias/capturas/06-movil.png) | Adaptación de la interfaz a una pantalla pequeña. |
| [Registro HTTP](evidencias/consumo-api-real.json) | URL, método, estado, fecha y cantidad de usuarios recibidos. |
| [Tipado](evidencias/tipado.txt), [compilación](evidencias/compilacion.txt) y [pruebas](evidencias/pruebas.txt) | Resultados de las comprobaciones ejecutadas. |
| [Informe detallado](evidencias/resultados-pruebas.json) | Resultado individual de los escenarios de navegador. |

La [carpeta de evidencias](evidencias/README.md) describe cada escenario. Las respuestas simuladas se identifican expresamente y se distinguen de la consulta real a JSONPlaceholder.

## 6. Exposición

Adjunto mi exposición para acompañar la revisión del proyecto:

**YouTube:** [https://www.youtube.com/watch?v=TKgLy1HdxAg](https://www.youtube.com/watch?v=TKgLy1HdxAg)

También adjunto la [presentación PowerPoint](output/exposicion/Campus-PA1-Presentacion-final.pptx). Sus notas amplían la explicación de cada actividad y señalan los archivos que puede revisar.

Para descargar el código, la documentación, las evidencias y la presentación en un solo archivo, puede utilizar el [ZIP de entrega](entrega/Campus-PA1-Entrega-Final.zip).

## 7. Conclusiones

Con esta entrega presento un recorrido completo de registro y consulta que permite relacionar los contenidos de las cuatro sesiones con una aplicación funcional.

El tipado estático ayuda a mantener una estructura consistente, pero debe complementarse con validaciones cuando la información llega de un formulario, del almacenamiento o de una API. La separación entre componentes y servicios permite que el listado y el formulario compartan los registros sin repetir la lógica de acceso a datos.

El formulario reactivo y las rutas conectan las reglas de ingreso con el recorrido del usuario. Por su parte, la consulta HTTP demuestra la comunicación con una fuente externa y la necesidad de contemplar carga, error y reintento.

La principal limitación del caso es la persistencia por navegador. Una evolución del proyecto requeriría un backend, autenticación y una base de datos central para compartir solicitudes y gestionar cambios de estado reales. En esta PA1, el alcance se concentra en Angular, TypeScript y el consumo de una API REST.

## 8. Referencias

- Consigna `PA1_30690_PROGRAMACION_WEB_II (1).pdf` y plantilla de README del curso.
- Sesión 1: `30690-S01-PPT.pptx`, ES6+, tipos, interfaces y módulos.
- Sesión 2: `30690-S02-PPT.pptx`, integración de TypeScript, TSConfig, Webpack y depuración.
- Sesión 3: `30690-S03-PPT.pptx`, Angular, módulos, componentes, binding e inyección de dependencias.
- Sesión 4: `30690-S04-PPT.pptx`, formularios, rutas y HttpClient; diapositiva 30 para la fuente JSONPlaceholder.
- [Compatibilidad de versiones de Angular](https://angular.dev/reference/versions).
- [Documentación de JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/).

**Última actualización del README:** 24/09/2026, hora de Perú.
