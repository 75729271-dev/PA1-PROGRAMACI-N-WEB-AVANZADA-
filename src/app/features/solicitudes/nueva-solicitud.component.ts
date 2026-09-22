import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TIPOS_SOLICITUD } from "../../core/models/solicitud.model";
import { SolicitudesService } from "../../core/services/solicitudes.service";
import { esTipoSolicitud } from "../../core/utils/solicitud.utils";
import { longitudUtil } from "./solicitud.validators";

@Component({
  selector: "app-nueva-solicitud",
  templateUrl: "./nueva-solicitud.component.html",
})
export class NuevaSolicitudComponent {
  readonly tipos = TIPOS_SOLICITUD;
  guardando = false;
  error = "";
  readonly formulario = this.fb.nonNullable.group({
    nombre: [
      "",
      [Validators.required, longitudUtil(3), Validators.maxLength(80)],
    ],
    codigo: ["", [Validators.required, Validators.pattern(/^A\d{8}$/)]],
    correo: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.maxLength(120),
      ],
    ],
    tipo: ["", Validators.required],
    asunto: [
      "",
      [Validators.required, longitudUtil(5), Validators.maxLength(100)],
    ],
    descripcion: [
      "",
      [Validators.required, longitudUtil(20), Validators.maxLength(1000)],
    ],
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly servicio: SolicitudesService,
    private readonly router: Router,
  ) {}
  invalido(campo: keyof typeof this.formulario.controls): boolean {
    const control = this.formulario.controls[campo];
    return control.touched && control.invalid;
  }
  guardar(): void {
    if (this.guardando) return;
    this.formulario.markAllAsTouched();
    this.error = "";
    if (this.formulario.invalid) return;
    const { nombre, codigo, correo, tipo, asunto, descripcion } =
      this.formulario.getRawValue();
    if (!esTipoSolicitud(tipo)) return;
    this.guardando = true;
    try {
      const solicitud = this.servicio.crear({
        estudiante: { nombre, codigo, correo },
        tipo,
        asunto,
        descripcion,
      });
      void this.router.navigate(["/solicitudes", solicitud.id], {
        state: { recienCreada: true },
      });
    } catch (error: unknown) {
      this.error =
        error instanceof Error
          ? error.message
          : "No se pudo registrar la solicitud.";
      this.guardando = false;
    }
  }
}
