/**
 * ProjectGrid — Server Component
 * Obtiene proyectos de Sanity CMS y pasa los datos al componente de filtro (Client).
 * Revalida cada 60 segundos (ISR): los cambios en el CMS se ven en ~1 minuto.
 */
import { client } from '@/sanity/lib/client'
import { ALL_PROJECTS_QUERY, type Project } from '@/sanity/lib/queries'
import ProjectGridClient from './ProjectGridClient'

// ─── Datos de respaldo (se usan mientras el CMS está vacío) ─────────────────
const FALLBACK_PROJECTS: Project[] = [
  {
    _id: '1', title: 'Hospital Tatamá', slug: { current: 'hospital-tatama' },
    category: 'Salud', area: '41.000 m²', year: 2023,
    featuredSize: 'large', order: 1,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'Hospital Tatamá' },
  },
  {
    _id: '2', title: 'CDI Pasacaballos', slug: { current: 'cdi-pasacaballos' },
    category: 'Educativa', area: '320 m²', year: 2022,
    featuredSize: 'normal', order: 2,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'CDI Pasacaballos' },
  },
  {
    _id: '3', title: 'Centro de Idiomas EAFIT', slug: { current: 'centro-idiomas-eafit' },
    category: 'Corporativa', area: '4.800 m²', year: 2022,
    featuredSize: 'wide', order: 3,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'Centro de Idiomas EAFIT' },
  },
  {
    _id: '4', title: 'Facultad de Artes', slug: { current: 'facultad-artes' },
    category: 'Cultural', area: '3.200 m²', year: 2023,
    featuredSize: 'normal', order: 4,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'Facultad de Artes' },
  },
  {
    _id: '5', title: 'Casa CEM', slug: { current: 'casa-cem' },
    category: 'Residencial', area: '480 m²', year: 2024,
    featuredSize: 'large', order: 5,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'Casa CEM' },
  },
  {
    _id: '6', title: 'Casa CEL', slug: { current: 'casa-cel' },
    category: 'Residencial', area: '320 m²', year: 2023,
    featuredSize: 'normal', order: 6,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'Casa CEL' },
  },
  {
    _id: '7', title: 'Casa CLE', slug: { current: 'casa-cle' },
    category: 'Residencial', area: '650 m²', year: 2022,
    featuredSize: 'normal', order: 7,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'Casa CLE' },
  },
  {
    _id: '8', title: 'Restaurante', slug: { current: 'restaurante' },
    category: 'Comercial', area: '280 m²', year: 2023,
    featuredSize: 'normal', order: 8,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'Restaurante' },
  },
  {
    _id: '9', title: 'Concurso Ambientes Educativos', slug: { current: 'concurso-ambientes' },
    category: 'Educativa', area: '2.400 m²', year: 2021,
    featuredSize: 'normal', order: 9,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'Concurso Ambientes Educativos' },
  },
  {
    _id: '10', title: 'Concurso Colegio', slug: { current: 'concurso-colegio' },
    category: 'Educativa', area: '1.800 m²', year: 2021,
    featuredSize: 'normal', order: 10,
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' }, alt: 'Concurso Colegio' },
  },
]

// Imágenes locales de respaldo mapeadas por slug
const LOCAL_FALLBACK_IMAGES: Record<string, string> = {
  'hospital-tatama': '/fotos/hospital-tatama.jpg',
  'cdi-pasacaballos': '/fotos/proyecto-cdi.jpg',
  'centro-idiomas-eafit': '/fotos/proyecto-centro-idiomas.jpg',
  'facultad-artes': '/fotos/proyecto-facultad-artes.jpg',
  'casa-cem': '/fotos/casa-cem2.jpg',
  'casa-cel': '/fotos/proyecto-casa-cel.jpg',
  'casa-cle': '/fotos/servicio-residencial.jpg',
  'restaurante': '/fotos/servicio-comercial.jpg',
  'concurso-ambientes': '/fotos/quote-educativo.jpg',
  'concurso-colegio': '/fotos/concurso-colegio.jpg',
}

// Revalida cada 60 segundos
export const revalidate = 60

export default async function ProjectGrid() {
  let projects: Project[] = []
  let usingSanity = false

  // Intentar obtener datos de Sanity
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const data = await client.fetch<Project[]>(ALL_PROJECTS_QUERY)
      if (data && data.length > 0) {
        projects = data
        usingSanity = true
      }
    } catch (err) {
      console.warn('[ProjectGrid] No se pudo conectar a Sanity, usando datos locales.', err)
    }
  }

  // Usar datos de respaldo si Sanity está vacío o no configurado
  if (!usingSanity) {
    projects = FALLBACK_PROJECTS
  }

  return (
    <ProjectGridClient
      projects={projects}
      usingSanity={usingSanity}
      localImages={LOCAL_FALLBACK_IMAGES}
    />
  )
}
