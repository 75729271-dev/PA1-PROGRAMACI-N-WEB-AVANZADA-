import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { SolicitudesService } from "../../core/services/solicitudes.service";

@Component({
  selector: "app-detalle-solicitud",
  templateUrl: "./detalle-solicitud.component.html",
})
export class DetalleSolicitudComponent {
  readonly recienCreada = history.state?.recienCreada === true;
  readonly vista$ = this.ruta.paramMap.pipe(
    map((parametros) => ({
      solicitud: this.servicio.buscar(parametros.get("id") ?? ""),
    })),
  );
  constructor(
    private readonly ruta: ActivatedRoute,
    private readonly servicio: SolicitudesService,
  ) {}
}
