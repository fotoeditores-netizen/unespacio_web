'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Proyecto, Tipologia } from '@/types/proyectos'

const categories = ['Todos', 'Educativa', 'Corporativa', 'Cultural', 'Salud', 'Comercial', 'Residencial']

const categoryColors: Record<string, string> = {
  Educativa: 'bg-blue-100 text-blue-800',
  Corporativa: 'bg-olive/10 text-dark-olive',
  Cultural: 'bg-purple-100 text-purple-800',
  Salud: 'bg-green-100 text-green-800',
  Comercial: 'bg-amber-100 text-amber-800',
  Residencial: 'bg-cream text-dark-olive',
}

// Proyectos hardcodeados como fallback mientras no haya datos en Supabase
const FALLBACK_PROJECTS = [
  { id: '1', titulo: 'Hospital Tatamá', tipologia: 'salud' as Tipologia, area_m2: 41000, anio: 2023, imagen_portada: '/fotos/hospital-tatama.jpg', descripcion_corta: '', slug: 'hospital-tatama' },
  { id: '2', titulo: 'CDI Pasacaballos', tipologia: 'educativa' as Tipologia, area_m2: 320, anio: 2022, imagen_portada: '/fotos/proyecto-cdi.jpg', descripcion_corta: '', slug: 'cdi-pasacaballos' },
  { id: '3', titulo: 'Centro de Idiomas EAFIT', tipologia: 'corporativa' as Tipologia, area_m2: 4800, anio: 2022, imagen_portada: '/fotos/proyecto-centro-idiomas.jpg', descripcion_corta: '', slug: 'centro-idiomas-eafit' },
  { id: '4', titulo: 'Facultad de Artes', tipologia: 'cultural' as Tipologia, area_m2: 3200, anio: 2023, imagen_portada: '/fotos/proyecto-facultad-artes.jpg', descripcion_corta: '', slug: 'facultad-de-artes' },
  { id: '5', titulo: 'Casa CEM', tipologia: 'residencial' as Tipologia, area_m2: 480, anio: 2024, imagen_portada: '/fotos/casa-cem2.jpg', descripcion_corta: '', slug: 'casa-cem' },
  { id: '6', titulo: 'Casa CEL', tipologia: 'residencial' as Tipologia, area_m2: 320, anio: 2023, imagen_portada: '/fotos/proyecto-casa-cel.jpg', descripcion_corta: '', slug: 'casa-cel' },
  { id: '7', titulo: 'Casa CLE', tipologia: 'residencial' as Tipologia, area_m2: 650, anio: 2022, imagen_portada: '/fotos/servicio-residencial.jpg', descripcion_corta: '', slug: 'casa-cle' },
  { id: '8', titulo: 'Restaurante', tipologia: 'comercial' as Tipologia, area_m2: 280, anio: 2023, imagen_portada: '/fotos/servicio-comercial.jpg', descripcion_corta: '', slug: 'restaurante' },
  { id: '9', titulo: 'Concurso Ambientes Educativos', tipologia: 'educativa' as Tipologia, area_m2: 2400, anio: 2021, imagen_portada: '/fotos/quote-educativo.jpg', descripcion_corta: '', slug: 'concurso-ambientes-educativos' },
  { id: '10', titulo: 'Concurso Colegio', tipologia: 'educativa' as Tipologia, area_m2: 1800, anio: 2021, imagen_portada: '/fotos/concurso-colegio.jpg', descripcion_corta: '', slug: 'concurso-colegio' },
]

interface Props {
  proyectos?: Proyecto[]
}

export default function ProjectGrid({ proyectos }: Props) {
  const [active, setActive] = useState('Todos')

  const source = (proyectos && proyectos.length > 0) ? proyectos : FALLBACK_PROJECTS

  const filtered = active === 'Todos'
    ? source
    : source.filter(p => p.tipologia.toLowerCase() === active.toLowerCase())

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`font-heading font-semibold text-xs tracking-wider uppercase px-5 py-2.5 transition-all duration-200 ${
              active === cat
                ? 'bg-dark-olive text-white'
                : 'bg-cream text-dark-olive hover:bg-olive hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, index) => {
          const label = project.tipologia.charAt(0).toUpperCase() + project.tipologia.slice(1)
          const size = index === 0 ? 'large' : index === 2 ? 'wide' : 'normal'
          return (
            <Link
              key={project.id}
              href={project.slug ? `/portafolio/${project.slug}` : '#'}
              className={`group relative overflow-hidden block ${
                size === 'large' ? 'lg:col-span-1 lg:row-span-2' :
                size === 'wide' ? 'lg:col-span-2' : ''
              }`}
              style={{ minHeight: size === 'large' ? '480px' : '260px' }}
            >
              <Image
                src={project.imagen_portada || '/fotos/proyecto-facultad-artes.jpg'}
                alt={`${project.titulo} — UnEspacio Arquitectos`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={80}
              />
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-olive/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-olive/30" />
              <div className="absolute top-4 right-4">
                <span className={`font-sans text-xs px-2.5 py-1 ${categoryColors[label] || 'bg-cream text-dark-olive'}`}>
                  {label}
                </span>
              </div>
              <div className="absolute inset-0 bg-dark-olive/0 group-hover:bg-dark-olive/85 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-sans text-xs text-cream/60 mb-1">
                  {project.area_m2 ? `${project.area_m2.toLocaleString()} m²` : ''}{project.area_m2 && project.anio ? ' · ' : ''}{project.anio ?? ''}
                </p>
                <h3 className="font-heading font-bold text-xl text-white">{project.titulo}</h3>
                <div className="flex items-center gap-2 mt-3 font-heading text-xs text-cream/70 tracking-wider uppercase">
                  Ver proyecto
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-sans text-olive">No hay proyectos en esta categoría aún.</p>
        </div>
      )}
    </div>
  )
}
