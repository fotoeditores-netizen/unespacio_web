'use client'

import { useState } from 'react'
import Image from 'next/image'

const categories = ['Todos', 'Educativa', 'Corporativa', 'Cultural', 'Salud', 'Comercial', 'Residencial']

const projects = [
  { id: 1, title: 'Hospital Tatamá', category: 'Salud', area: '41.000 m²', year: '2023', size: 'large', image: '/fotos/hospital-tatama.jpg' },
  { id: 2, title: 'CDI Pasacaballos', category: 'Educativa', area: '320 m²', year: '2022', size: 'normal', image: '/fotos/proyecto-cdi.jpg' },
  { id: 3, title: 'Centro de Idiomas EAFIT', category: 'Corporativa', area: '4.800 m²', year: '2022', size: 'wide', image: '/fotos/proyecto-centro-idiomas.jpg' },
  { id: 4, title: 'Facultad de Artes', category: 'Cultural', area: '3.200 m²', year: '2023', size: 'normal', image: '/fotos/proyecto-facultad-artes.jpg' },
  { id: 5, title: 'Casa CEM', category: 'Residencial', area: '480 m²', year: '2024', size: 'large', image: '/fotos/casa-cem2.jpg' },
  { id: 6, title: 'Casa CEL', category: 'Residencial', area: '320 m²', year: '2023', size: 'normal', image: '/fotos/proyecto-casa-cel.jpg' },
  { id: 7, title: 'Casa CLE', category: 'Residencial', area: '650 m²', year: '2022', size: 'normal', image: '/fotos/servicio-residencial.jpg' },
  { id: 8, title: 'Restaurante', category: 'Comercial', area: '280 m²', year: '2023', size: 'normal', image: '/fotos/servicio-comercial.jpg' },
  { id: 9, title: 'Concurso Ambientes Educativos', category: 'Educativa', area: '2.400 m²', year: '2021', size: 'normal', image: '/fotos/quote-educativo.jpg' },
  { id: 10, title: 'Concurso Colegio', category: 'Educativa', area: '1.800 m²', year: '2021', size: 'normal', image: '/fotos/concurso-colegio.jpg' },
]

const categoryColors: Record<string, string> = {
  Educativa: 'bg-blue-100 text-blue-800',
  Corporativa: 'bg-olive/10 text-dark-olive',
  Cultural: 'bg-purple-100 text-purple-800',
  Salud: 'bg-green-100 text-green-800',
  Comercial: 'bg-amber-100 text-amber-800',
  Residencial: 'bg-cream text-dark-olive',
}

export default function ProjectGrid() {
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos'
    ? projects
    : projects.filter((p) => p.category === active)

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
        {filtered.map((project) => (
          <div
            key={project.id}
            className={`group relative overflow-hidden cursor-pointer ${
              project.size === 'large' ? 'lg:col-span-1 lg:row-span-2' :
              project.size === 'wide' ? 'lg:col-span-2' : ''
            }`}
            style={{
              minHeight: project.size === 'large' ? '480px' : '260px',
            }}
          >
            {/* Project image */}
            <Image
              src={project.image}
              alt={`${project.title} — UnEspacio Arquitectos`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              quality={80}
            />

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-olive/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-olive/30" />

            {/* Category badge */}
            <div className="absolute top-4 right-4">
              <span className={`font-sans text-xs px-2.5 py-1 ${categoryColors[project.category] || 'bg-cream text-dark-olive'}`}>
                {project.category}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-dark-olive/0 group-hover:bg-dark-olive/85 transition-all duration-300" />

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="font-sans text-xs text-cream/60 mb-1">{project.area} · {project.year}</p>
              <h3 className="font-heading font-bold text-xl text-white">{project.title}</h3>
              <div className="flex items-center gap-2 mt-3 font-heading text-xs text-cream/70 tracking-wider uppercase">
                Ver proyecto
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-sans text-olive">No hay proyectos en esta categoría aún.</p>
        </div>
      )}
    </div>
  )
}
