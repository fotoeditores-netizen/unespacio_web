export interface Miembro {
  id: string
  nombre: string
  rol: string
  bio: string
  foto: string
  orden: number
  created_at: string
}

export interface CrearMiembroInput {
  nombre: string
  rol: string
  bio: string
  foto: string
  orden: number
}

export type ActualizarMiembroInput = Partial<CrearMiembroInput>
