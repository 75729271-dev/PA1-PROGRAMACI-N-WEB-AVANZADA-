import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DirectorioComponent } from "./features/directorio/directorio.component";
import {
  AyudaComponent,
  NoEncontradoComponent,
} from "./features/ayuda/ayuda.component";

const routes: Routes = [
  { path: "", redirectTo: "solicitudes", pathMatch: "full" },
  {
    path: "solicitudes",
    loadChildren: () =>
      import("./features/solicitudes/solicitudes.module").then(
        (modulo) => modulo.SolicitudesModule,
      ),
  },
  {
    path: "directorio",
    component: DirectorioComponent,
    title: "Directorio · Campus",
  },
  { path: "ayuda", component: AyudaComponent, title: "Cómo funciona · Campus" },
  {
    path: "**",
    component: NoEncontradoComponent,
    title: "Página no encontrada · Campus",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
