import { groq } from 'next-sanity'

// ─── Tipos TypeScript ────────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
  alt?: string
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  year?: number
  area?: string
  location?: string
  description?: string
  coverImage: SanityImage
  images?: SanityImage[]
  featured?: boolean
  featuredSize?: 'normal' | 'wide' | 'large'
  order?: number
}

// ─── Queries GROQ ────────────────────────────────────────────────────────────

/** Todos los proyectos ordenados */
export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, year desc) {
    _id,
    title,
    slug,
    category,
    year,
    area,
    location,
    description,
    coverImage,
    featured,
    featuredSize,
    order
  }
`

/** Solo los proyectos destacados para la home (máx 6) */
export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    category,
    year,
    area,
    coverImage,
    featuredSize
  }
`

/** Un proyecto por slug (para futuras páginas de detalle) */
export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    year,
    area,
    location,
    description,
    coverImage,
    images,
    featuredSize
  }
`
