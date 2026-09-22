import { Component, Input } from "@angular/core";
import { EstadoSolicitud } from "../core/models/solicitud.model";

@Component({
  selector: "app-status-badge",
  template: `<span
    class="badge"
    [ngClass]="{
      pending: estado === 'Pendiente',
      review: estado === 'En revisión',
      resolved: estado === 'Resuelta',
    }"
    ><span class="status-dot" aria-hidden="true"></span>{{ estado }}</span
  >`,
})
export class StatusBadgeComponent {
  @Input({ required: true }) estado!: EstadoSolicitud;
}
