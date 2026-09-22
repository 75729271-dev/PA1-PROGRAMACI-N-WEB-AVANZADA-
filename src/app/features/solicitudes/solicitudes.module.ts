import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ListaSolicitudesComponent } from "./lista-solicitudes.component";
import { NuevaSolicitudComponent } from "./nueva-solicitud.component";
import { DetalleSolicitudComponent } from "./detalle-solicitud.component";

@NgModule({
  declarations: [
    ListaSolicitudesComponent,
    NuevaSolicitudComponent,
    DetalleSolicitudComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: "",
        component: ListaSolicitudesComponent,
        title: "Solicitudes · Campus",
      },
      {
        path: "nueva",
        component: NuevaSolicitudComponent,
        title: "Nueva solicitud · Campus",
      },
      {
        path: ":id",
        component: DetalleSolicitudComponent,
        title: "Detalle de solicitud · Campus",
      },
    ]),
  ],
})
export class SolicitudesModule {}
