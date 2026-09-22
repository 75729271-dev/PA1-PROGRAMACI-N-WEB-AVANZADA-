import {
  ESTADOS_SOLICITUD,
  NuevaSolicitud,
  ResumenSolicitudes,
  Solicitud,
  TIPOS_SOLICITUD,
  TipoSolicitud,
} from "../models/solicitud.model";
import { esObjeto } from "../models/usuario-api.model";

export const normalizar = (texto: string): string =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
export const esTipoSolicitud = (valor: string): valor is TipoSolicitud =>
  TIPOS_SOLICITUD.some((tipo) => tipo === valor);

/** Reglas del caso propuestas por el equipo: no son reglas institucionales oficiales. */
export function datosValidos(datos: NuevaSolicitud): boolean {
  const { estudiante, asunto, descripcion, tipo } = datos;
  return (
    estudiante.nombre.trim().length >= 3 &&
    estudiante.nombre.trim().length <= 80 &&
    /^A\d{8}$/.test(estudiante.codigo) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(estudiante.correo) &&
    estudiante.correo.length <= 120 &&
    esTipoSolicitud(tipo) &&
    asunto.trim().length >= 5 &&
    asunto.trim().length <= 100 &&
    descripcion.trim().length >= 20 &&
    descripcion.trim().length <= 1000
  );
}

export function esSolicitud(dato: unknown): dato is Solicitud {
  if (!esObjeto(dato) || !esObjeto(dato["estudiante"])) return false;
  const estudiante = dato["estudiante"];
  if (
    typeof estudiante["nombre"] !== "string" ||
    typeof estudiante["codigo"] !== "string" ||
    typeof estudiante["correo"] !== "string" ||
    typeof dato["tipo"] !== "string" ||
    !esTipoSolicitud(dato["tipo"]) ||
    typeof dato["asunto"] !== "string" ||
    typeof dato["descripcion"] !== "string"
  )
    return false;
  return (
    typeof dato["id"] === "string" &&
    /^SA-[A-Z0-9-]+$/.test(dato["id"]) &&
    typeof dato["estado"] === "string" &&
    ESTADOS_SOLICITUD.some((estado) => estado === dato["estado"]) &&
    typeof dato["creadaEn"] === "string" &&
    !Number.isNaN(Date.parse(dato["creadaEn"])) &&
    datosValidos({
      estudiante: {
        nombre: estudiante["nombre"],
        codigo: estudiante["codigo"],
        correo: estudiante["correo"],
      },
      tipo: dato["tipo"],
      asunto: dato["asunto"],
      descripcion: dato["descripcion"],
    })
  );
}

export function resumir(solicitudes: readonly Solicitud[]): ResumenSolicitudes {
  let pendientes = 0;
  let enRevision = 0;
  let resueltas = 0;
  for (const { estado } of solicitudes) {
    if (estado === "Pendiente") pendientes++;
    if (estado === "En revisión") enRevision++;
    if (estado === "Resuelta") resueltas++;
  }
  return { total: solicitudes.length, pendientes, enRevision, resueltas };
}
