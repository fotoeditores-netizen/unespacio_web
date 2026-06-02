'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { Project } from '@/sanity/lib/queries'

const CATEGORIES = ['Todos', 'Educativa', 'Corporativa', 'Cultural', 'Salud', 'Comercial', 'Residencial']

const CATEGORY_COLORS: Record<string, string> = {
  Educativa: 'bg-blue-100 text-blue-800',
  Corporativa: 'bg-olive/10 text-dark-olive',
  Cultural: 'bg-purple-100 text-purple-800',
  Salud: 'bg-green-100 text-green-800',
  Comercial: 'bg-amber-100 text-amber-800',
  Residencial: 'bg-cream text-dark-olive',
}

interface Props {
  projects: Project[]
  usingSanity: boolean
  localImages: Record<string, string>
}

export default function ProjectGridClient({ projects, usingSanity, localImages }: Props) {
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos'
    ? projects
    : projects.filter((p) => p.category === active)

  // Obtiene la URL de la imagen: desde Sanity CDN o desde /public/fotos local
  function getImageUrl(project: Project): string {
    if (usingSanity && project.coverImage?.asset?._ref) {
      return urlFor(project.coverImage).width(900).auto('format').quality(80).url()
    }
    return localImages[project.slug.current] || '/fotos/hospital-tatama.jpg'
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => (
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
        {filtered.map((project) => {
          const imgUrl = getImageUrl(project)
          const size = project.featuredSize || 'normal'

          return (
            <div
              key={project._id}
              className={`group relative overflow-hidden cursor-pointer ${
                size === 'large' ? 'lg:col-span-1 lg:row-span-2' :
                size === 'wide' ? 'lg:col-span-2' : ''
              }`}
              style={{ minHeight: size === 'large' ? '480px' : '260px' }}
            >
              {/* Project image */}
              <Image
                src={imgUrl}
                alt={project.coverImage?.alt || `${project.title} — UnEspacio Arquitectos`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={80}
                unoptimized={usingSanity} // Sanity ya optimiza; evitamos doble proceso
              />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-olive/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-olive/30" />

              {/* Category badge */}
              <div className="absolute top-4 right-4">
                <span className={`font-sans text-xs px-2.5 py-1 ${CATEGORY_COLORS[project.category] || 'bg-cream text-dark-olive'}`}>
                  {project.category}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark-olive/0 group-hover:bg-dark-olive/85 transition-all duration-300" />

              {/* Info on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {(project.area || project.year) && (
                  <p className="font-sans text-xs text-cream/60 mb-1">
                    {[project.area, project.year].filter(Boolean).join(' · ')}
                  </p>
                )}
                <h3 className="font-heading font-bold text-xl text-white">{project.title}</h3>
                {project.location && (
                  <p className="font-sans text-xs text-cream/50 mt-1">{project.location}</p>
                )}
                <div className="flex items-center gap-2 mt-3 font-heading text-xs text-cream/70 tracking-wider uppercase">
                  Ver proyecto
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-sans text-olive/70">No hay proyectos en esta categoría aún.</p>
        </div>
      )}
    </div>
  )
}
