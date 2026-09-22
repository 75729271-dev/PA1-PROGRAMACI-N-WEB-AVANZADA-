import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { firstValueFrom, Subject, takeUntil } from "rxjs";
import {
  ConsultaDirectorio,
  UsuarioApi,
} from "../../core/models/usuario-api.model";
import { DirectorioService } from "../../core/services/directorio.service";
import { normalizar } from "../../core/utils/solicitud.utils";

@Component({
  selector: "app-directorio",
  templateUrl: "./directorio.component.html",
})
export class DirectorioComponent implements OnInit, OnDestroy {
  consulta?: ConsultaDirectorio;
  cargando = false;
  error = "";
  busqueda = "";
  private destruido = false;
  private readonly finalizar$ = new Subject<void>();
  constructor(public readonly servicio: DirectorioService) {}
  ngOnInit(): void {
    void this.cargar();
  }

  /** firstValueFrom convierte una petición HttpClient en una promesa para async/await. */
  async cargar(): Promise<void> {
    if (this.cargando) return;
    this.cargando = true;
    this.error = "";
    this.consulta = undefined;
    try {
      this.consulta = await firstValueFrom(
        this.servicio.consultar().pipe(takeUntil(this.finalizar$)),
      );
    } catch (error: unknown) {
      if (this.destruido) return;
      this.error =
        error instanceof HttpErrorResponse
          ? error.status === 0
            ? "No se pudo conectar con el directorio. Revisa tu conexión e inténtalo otra vez."
            : `El directorio respondió con HTTP ${error.status}. Inténtalo otra vez.`
          : error instanceof Error && error.name === "TimeoutError"
            ? "La consulta tardó demasiado. Inténtalo otra vez."
            : error instanceof Error
              ? error.message
              : "No se pudo cargar el directorio.";
    } finally {
      if (!this.destruido) this.cargando = false;
    }
  }
  get usuariosFiltrados(): UsuarioApi[] {
    const termino = normalizar(this.busqueda);
    return (this.consulta?.usuarios ?? []).filter(({ name, email, company }) =>
      normalizar(`${name} ${email} ${company.name}`).includes(termino),
    );
  }
  trackId(_indice: number, usuario: UsuarioApi): number {
    return usuario.id;
  }
  ngOnDestroy(): void {
    this.destruido = true;
    this.finalizar$.next();
    this.finalizar$.complete();
  }
}
