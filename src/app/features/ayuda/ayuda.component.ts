import { Component } from "@angular/core";

@Component({
  selector: "app-ayuda",
  template: ` <div class="page-heading">
      <div>
        <p class="eyebrow">GUÍA DEL PORTAL</p>
        <h1>Cómo funciona</h1>
        <p class="lead">
          Un recorrido sencillo para gestionar tus solicitudes.
        </p>
      </div>
    </div>
    <div class="panel prose">
      <h2>1. Registra tu solicitud</h2>
      <p>
        Abre «Nueva solicitud», completa los datos del estudiante y describe el
        trámite. Los campos muestran mensajes si faltan datos o el formato no es
        válido. Utiliza únicamente datos ficticios.
      </p>
      <h2>2. Revisa la confirmación</h2>
      <p>
        Un registro válido genera un código único, la fecha y el estado
        «Pendiente». Después de guardarlo verás el detalle de la solicitud.
      </p>
      <h2>3. Encuentra tus registros</h2>
      <p>
        En «Solicitudes» puedes buscar por asunto, nombre, código o tipo de
        trámite y filtrar por estado. Los registros creados permanecen al
        recargar este navegador.
      </p>
      <h2>4. Consulta el directorio</h2>
      <p>
        La vista «Directorio» obtiene usuarios ficticios de JSONPlaceholder
        mediante una petición HTTP. Requiere conexión a Internet y permite
        volver a intentar una consulta fallida.
      </p>
      <h2>Sobre esta entrega</h2>
      <p>
        Profesor, encontrará seis solicitudes de ejemplo para revisar el listado
        y los distintos estados. Puede registrar una nueva solicitud, consultar
        su detalle y recargar la página para comprobar que se conserva.
        Los datos se guardan en el navegador que utilice; si borra los datos
        del sitio o abre la aplicación en otro navegador, no verá los registros
        que haya creado aquí.
      </p>
      <p>
        El desarrollo cubre los contenidos de las sesiones 1 a 4. Por eso,
        todavía no incluye inicio de sesión, envío de correos ni un backend
        con base de datos compartida. Los estados iniciales sirven para la
        demostración y no representan una atención administrativa real.
        En «Directorio» puede comprobar el consumo de la API externa,
        cuyos datos se muestran por separado de las solicitudes registradas.
      </p>
      <a class="button primary" routerLink="/solicitudes/nueva"
        >Registrar una solicitud →</a
      >
    </div>`,
})
export class AyudaComponent {}

@Component({
  selector: "app-no-encontrado",
  template: `<div class="panel empty-state">
    <p class="eyebrow">ERROR 404</p>
    <h1>Página no encontrada</h1>
    <p>La dirección que abriste no corresponde a una vista del portal.</p>
    <a class="button primary" routerLink="/solicitudes">Volver a solicitudes</a>
  </div>`,
})
export class NoEncontradoComponent {}
