export type Tipologia =
  | 'educativa'
  | 'corporativa'
  | 'cultural'
  | 'salud'
  | 'comercial'
  | 'residencial'

export interface Proyecto {
  id: string
  titulo: string
  slug: string
  tipologia: Tipologia
  descripcion_corta: string
  descripcion_larga: string
  descripcion_hover: string
  imagenes: string[]
  imagen_portada: string
  area_m2: number | null
  anio: number | null
  destacado: boolean
  orden: number
  created_at: string
}

export interface CrearProyectoInput {
  titulo: string
  slug: string
  tipologia: Tipologia
  descripcion_corta: string
  descripcion_larga: string
  descripcion_hover: string
  imagenes: string[]
  imagen_portada: string
  area_m2: number | null
  anio: number | null
  destacado: boolean
  orden: number
}

export type ActualizarProyectoInput = Partial<CrearProyectoInput>
