export type EstadoPagina = 'borrador' | 'publicada'
export type TipoBloque = 'texto' | 'imagen_texto' | 'hero' | 'galeria'

export interface Pagina {
  id: string
  titulo: string
  slug: string
  estado: EstadoPagina
  orden: number
  created_at: string
  updated_at: string
}

export interface Bloque {
  id: string
  pagina_id: string
  tipo: TipoBloque
  orden: number
  contenido: BloqueContenido
  created_at: string
}

// Contenidos tipados por bloque
export interface BloqueTexto {
  titulo?: string
  cuerpo: string
}

export interface BloqueImagenTexto {
  imagen: string
  lado: 'izquierda' | 'derecha'
  titulo: string
  parrafo: string
}

export interface BloqueHero {
  imagen: string
  titulo: string
  subtitulo?: string
  cta_texto?: string
  cta_url?: string
}

export interface BloqueGaleria {
  imagenes: { src: string; pie?: string }[]
}

export type BloqueContenido = BloqueTexto | BloqueImagenTexto | BloqueHero | BloqueGaleria

export interface PaginaConBloques extends Pagina {
  bloques: Bloque[]
}

export interface CrearPaginaInput {
  titulo: string
  slug: string
  estado: EstadoPagina
  orden: number
}

export interface ActualizarPaginaInput extends Partial<CrearPaginaInput> {}
