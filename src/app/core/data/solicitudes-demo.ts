import { Solicitud } from "../models/solicitud.model";

/** Datos ficticios identificados como demostración en la interfaz. */
export const SOLICITUDES_DEMO: readonly Solicitud[] = [
  {
    id: "SA-0006",
    estudiante: {
      nombre: "Lucía Ejemplo",
      codigo: "A20260001",
      correo: "lucia@example.com",
    },
    tipo: "Constancia de estudios",
    asunto: "Constancia para prácticas preprofesionales",
    descripcion:
      "Solicito una constancia de estudios para presentar mi postulación a prácticas preprofesionales.",
    estado: "Pendiente",
    creadaEn: "2026-09-21T14:30:00Z",
  },
  {
    id: "SA-0005",
    estudiante: {
      nombre: "Mateo Ejemplo",
      codigo: "A20260002",
      correo: "mateo@example.com",
    },
    tipo: "Cambio de horario",
    asunto: "Cambio al turno de la mañana",
    descripcion:
      "Solicito evaluar el cambio de horario de mi curso por incompatibilidad con mis prácticas.",
    estado: "En revisión",
    creadaEn: "2026-09-20T17:10:00Z",
  },
  {
    id: "SA-0004",
    estudiante: {
      nombre: "Valeria Ejemplo",
      codigo: "A20260003",
      correo: "valeria@example.com",
    },
    tipo: "Certificado de notas",
    asunto: "Certificado de notas del ciclo anterior",
    descripcion:
      "Necesito el certificado de notas del ciclo anterior para una convocatoria de intercambio.",
    estado: "Resuelta",
    creadaEn: "2026-09-19T16:00:00Z",
  },
  {
    id: "SA-0003",
    estudiante: {
      nombre: "Diego Ejemplo",
      codigo: "A20260004",
      correo: "diego@example.com",
    },
    tipo: "Reserva de matrícula",
    asunto: "Reserva de matrícula para el próximo ciclo",
    descripcion:
      "Solicito la reserva de matrícula para el siguiente periodo por motivos de organización personal.",
    estado: "Pendiente",
    creadaEn: "2026-09-18T18:20:00Z",
  },
  {
    id: "SA-0002",
    estudiante: {
      nombre: "Sofía Ejemplo",
      codigo: "A20260005",
      correo: "sofia@example.com",
    },
    tipo: "Constancia de estudios",
    asunto: "Constancia para postulación a una beca",
    descripcion:
      "Solicito una constancia de estudios vigente para adjuntarla a mi postulación a una beca.",
    estado: "En revisión",
    creadaEn: "2026-09-17T15:45:00Z",
  },
  {
    id: "SA-0001",
    estudiante: {
      nombre: "Lucas Ejemplo",
      codigo: "A20260006",
      correo: "lucas@example.com",
    },
    tipo: "Certificado de notas",
    asunto: "Certificado para convalidación de cursos",
    descripcion:
      "Solicito el certificado de notas para iniciar la evaluación de convalidación de cursos.",
    estado: "Resuelta",
    creadaEn: "2026-09-16T13:00:00Z",
  },
];
