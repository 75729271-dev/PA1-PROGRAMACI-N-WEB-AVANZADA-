import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SOLICITUDES_DEMO } from "../data/solicitudes-demo";
import { NuevaSolicitud, Solicitud } from "../models/solicitud.model";
import { esObjeto } from "../models/usuario-api.model";
import { datosValidos, esSolicitud } from "../utils/solicitud.utils";

@Injectable({ providedIn: "root" })
export class SolicitudesService {
  private readonly clave = "campus.solicitudes.v1";
  aviso = "";
  private readonly estado = new BehaviorSubject<readonly Solicitud[]>(
    this.leer(),
  );
  readonly solicitudes$: Observable<readonly Solicitud[]> =
    this.estado.asObservable();

  private leer(): readonly Solicitud[] {
    try {
      const guardado = localStorage.getItem(this.clave);
      if (guardado === null) return structuredClone(SOLICITUDES_DEMO);
      const datos: unknown = JSON.parse(guardado);
      if (
        !esObjeto(datos) ||
        datos["version"] !== 1 ||
        !Array.isArray(datos["solicitudes"]) ||
        !datos["solicitudes"].every(esSolicitud)
      ) {
        throw new Error("Formato de almacenamiento inválido");
      }
      const solicitudes: Solicitud[] = datos["solicitudes"];
      if (new Set(solicitudes.map((s) => s.id)).size !== solicitudes.length)
        throw new Error("Identificadores duplicados");
      return solicitudes;
    } catch {
      this.aviso =
        "No se pudieron recuperar los registros locales. Se muestra una lista vacía. Al registrar una solicitud se intentará guardar una nueva lista.";
      return [];
    }
  }

  crear(datos: NuevaSolicitud): Solicitud {
    if (!datosValidos(datos))
      throw new Error("Revisa los datos de la solicitud antes de guardarla.");
    const solicitud: Solicitud = {
      ...datos,
      estudiante: {
        ...datos.estudiante,
        nombre: datos.estudiante.nombre.trim(),
        correo: datos.estudiante.correo.trim(),
      },
      asunto: datos.asunto.trim(),
      descripcion: datos.descripcion.trim(),
      id: `SA-${crypto.randomUUID().toUpperCase()}`,
      estado: "Pendiente",
      creadaEn: new Date().toISOString(),
    };
    const actualizadas = [solicitud, ...this.estado.value];
    // Publicar el estado solo después de persistir evita confirmar registros que no se guardaron.
    try {
      localStorage.setItem(
        this.clave,
        JSON.stringify({ version: 1, solicitudes: actualizadas }),
      );
    } catch {
      throw new Error(
        "El navegador no permitió guardar. Habilita el almacenamiento local o libera espacio e inténtalo otra vez.",
      );
    }
    this.aviso = "";
    this.estado.next(actualizadas);
    return solicitud;
  }

  buscar(id: string): Solicitud | undefined {
    return this.estado.value.find((solicitud) => solicitud.id === id);
  }
}
