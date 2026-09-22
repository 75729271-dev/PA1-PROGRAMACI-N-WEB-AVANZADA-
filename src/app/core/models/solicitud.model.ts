export const TIPOS_SOLICITUD = [
  "Constancia de estudios",
  "Certificado de notas",
  "Cambio de horario",
  "Reserva de matrícula",
] as const;
export type TipoSolicitud = (typeof TIPOS_SOLICITUD)[number];
export const ESTADOS_SOLICITUD = [
  "Pendiente",
  "En revisión",
  "Resuelta",
] as const;
export type EstadoSolicitud = (typeof ESTADOS_SOLICITUD)[number];

export interface Estudiante {
  nombre: string;
  codigo: string;
  correo: string;
}

export interface NuevaSolicitud {
  estudiante: Estudiante;
  tipo: TipoSolicitud;
  asunto: string;
  descripcion: string;
}

export interface Solicitud extends NuevaSolicitud {
  id: string;
  estado: EstadoSolicitud;
  creadaEn: string;
}

export interface ResumenSolicitudes {
  total: number;
  pendientes: number;
  enRevision: number;
  resueltas: number;
}
