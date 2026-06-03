export interface Servicio {
  id: string
  nombre: string
  slug_anchor: string
  descripcion_corta: string
  descripcion_larga: string
  imagen_hero: string
  orden: number
  created_at: string
}

export interface CrearServicioInput {
  nombre: string
  slug_anchor: string
  descripcion_corta: string
  descripcion_larga: string
  imagen_hero: string
  orden: number
}

export type ActualizarServicioInput = Partial<CrearServicioInput>
