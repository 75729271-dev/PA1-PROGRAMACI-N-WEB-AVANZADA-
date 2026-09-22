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
      <h2>Alcance de esta práctica</h2>
      <p>
        Proyecto educativo PA1, Programación Web II. Los seis registros
        iniciales y sus estados son ejemplos. No hay autenticación, correos,
        base de datos central ni atención administrativa. Borrar los datos del
        sitio elimina los registros locales. Otro navegador tiene su propia
        lista. El directorio externo es independiente de las solicitudes.
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
