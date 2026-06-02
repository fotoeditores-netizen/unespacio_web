export type EstadoCita = 'pendiente' | 'confirmada' | 'cancelada'

export type TipoConsulta =
  | 'Diseño interior'
  | 'Remodelación'
  | 'Consulta inicial'
  | 'Otro'

export interface Cita {
  id: string
  nombre: string
  correo: string
  telefono: string
  tipo_consulta: TipoConsulta
  mensaje: string
  fecha: string   // ISO date: YYYY-MM-DD
  hora: string    // '09:00', '10:00', ... '18:00'
  estado: EstadoCita
  created_at: string // ISO datetime
}

export interface CrearCitaInput {
  nombre: string
  correo: string
  telefono: string
  tipo_consulta: TipoConsulta
  mensaje: string
  fecha: string
  hora: string
}
