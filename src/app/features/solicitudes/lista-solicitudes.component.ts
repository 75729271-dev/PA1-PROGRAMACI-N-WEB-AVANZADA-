import { Component } from "@angular/core";
import { map } from "rxjs";
import {
  EstadoSolicitud,
  ESTADOS_SOLICITUD,
  Solicitud,
} from "../../core/models/solicitud.model";
import { SolicitudesService } from "../../core/services/solicitudes.service";
import { normalizar, resumir } from "../../core/utils/solicitud.utils";

@Component({
  selector: "app-lista-solicitudes",
  templateUrl: "./lista-solicitudes.component.html",
})
export class ListaSolicitudesComponent {
  busqueda = "";
  estado: EstadoSolicitud | "" = "";
  readonly estados = ESTADOS_SOLICITUD;
  readonly vista$ = this.servicio.solicitudes$.pipe(
    map((solicitudes) => ({ solicitudes, resumen: resumir(solicitudes) })),
  );
  constructor(public readonly servicio: SolicitudesService) {}

  filtrar(solicitudes: readonly Solicitud[]): readonly Solicitud[] {
    const consulta = normalizar(this.busqueda);
    return solicitudes.filter(
      ({ id, asunto, estudiante, estado, tipo }) =>
        (!this.estado || this.estado === estado) &&
        normalizar(
          `${id} ${asunto} ${estudiante.nombre} ${estudiante.codigo} ${tipo}`,
        ).includes(consulta),
    );
  }

  trackId(_indice: number, solicitud: Solicitud): string {
    return solicitud.id;
  }
  limpiar(): void {
    this.busqueda = "";
    this.estado = "";
  }
}
