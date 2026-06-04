import Image from 'next/image'
import Link from 'next/link'
import { getServicios } from '@/lib/servicios'

const SERVICES_STATIC = [
  {
    id: 'educativa',
    number: '01',
    title: 'Arquitectura Educativa',
    tagline: 'Espacios que inspiran el aprendizaje',
    description:
      'Diseñamos colegios, universidades, centros de formación y espacios de aprendizaje que combinan funcionalidad pedagógica con ambientes estimulantes. Entendemos que el espacio físico es un maestro silencioso.',
    scope: ['Colegios y escuelas', 'Campus universitarios', 'Centros de formación técnica', 'Bibliotecas y aulas especializadas'],
    scale: 'Proyectos desde 500 m² hasta 41.000 m²',
    image: { src: '/fotos/proyecto-cdi.jpg', alt: 'CDI Pasacaballos — arquitectura educativa comunitaria', position: 'object-center' },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: 'corporativa',
    number: '02',
    title: 'Arquitectura Corporativa',
    tagline: 'Entornos que potencian el talento',
    description:
      'Creamos oficinas y edificios empresariales que reflejan la cultura organizacional y potencian el bienestar y la productividad. Desde pequeños despachos hasta torres corporativas de gran envergadura.',
    scope: ['Oficinas y espacios de trabajo', 'Torres corporativas', 'Coworkings', 'Sedes empresariales'],
    scale: 'Proyectos desde 320 m² hasta 15.000 m²',
    image: { src: '/fotos/proyecto-centro-idiomas.jpg', alt: 'Centro de Idiomas EAFIT — arquitectura corporativa educativa', position: 'object-top' },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'cultural',
    number: '03',
    title: 'Arquitectura Cultural',
    tagline: 'Espacios que hacen visible la identidad',
    description:
      'Museos, teatros, centros culturales y plazas públicas que se convierten en hitos de la memoria colectiva. Proyectos que equilibran la experiencia estética con la funcionalidad del programa cultural.',
    scope: ['Museos y galerías', 'Teatros y auditorios', 'Plazas y espacios públicos', 'Centros culturales comunitarios'],
    scale: 'Proyectos desde 800 m² hasta 20.000 m²',
    image: { src: '/fotos/proyecto-facultad-artes.jpg', alt: 'Facultad de Artes — arquitectura cultural universitaria construida', position: 'object-center' },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'salud',
    number: '04',
    title: 'Arquitectura de Salud',
    tagline: 'Humanidad en cada espacio de cuidado',
    description:
      'Clínicas, hospitales y centros médicos donde la arquitectura contribuye activamente al proceso de sanación. Diseñamos con rigor técnico y normativo sin perder la escala humana.',
    scope: ['Clínicas y consultorios', 'Centros médicos', 'Hospitales', 'Centros de bienestar'],
    scale: 'Proyectos desde 320 m² hasta 8.000 m²',
    image: { src: '/fotos/hospital-tatama.jpg', alt: 'Hospital Tatamá — arquitectura de salud integrada a la naturaleza', position: 'object-center' },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'comercial',
    number: '05',
    title: 'Arquitectura Comercial',
    tagline: 'Experiencias que invitan a quedarse',
    description:
      'Diseñamos espacios comerciales donde la experiencia del cliente es el centro de cada decisión: flujos, iluminación, materialidad y atmósfera al servicio del negocio.',
    scope: ['Locales comerciales', 'Restaurantes y cafés', 'Centros comerciales', 'Hoteles y hospedajes'],
    scale: 'Proyectos desde 50 m² hasta 25.000 m²',
    image: { src: '/fotos/servicio-comercial.jpg', alt: 'Restaurante — arquitectura comercial interior con jardín', position: 'object-center' },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    id: 'residencial',
    number: '06',
    title: 'Arquitectura Residencial',
    tagline: 'Hogares a la medida de la vida',
    description:
      'Viviendas unifamiliares, dúplex y conjuntos residenciales diseñados con atención especial a la calidad de vida, la luz natural, la privacidad y la relación con el entorno.',
    scope: ['Viviendas unifamiliares', 'Dúplex y casas de campo', 'Conjuntos residenciales', 'Apartamentos a medida'],
    scale: 'Proyectos desde 320 m² hasta 5.000 m²',
    image: { src: '/fotos/servicio-residencial.jpg', alt: 'Casa CLE — arquitectura residencial en ladera con piscina', position: 'object-center' },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
]

export default async function ServicesList() {
  let serviciosDB: Awaited<ReturnType<typeof getServicios>> = []
  try { serviciosDB = await getServicios() } catch { /* usa fallback */ }

  // Combina datos estáticos con imagen_hero y descripcion_corta de Supabase
  const services = SERVICES_STATIC.map(s => {
    const db = serviciosDB.find(d => d.slug_anchor === s.id)
    return {
      ...s,
      description: db?.descripcion_corta || s.description,
      image: { ...s.image, src: db?.imagen_hero || s.image.src },
    }
  })

  return (
    <div>
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`${i % 2 === 0 ? 'bg-white' : 'bg-cream'}`}
        >
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[560px]">

              {/* Imagen — sangra hasta el borde de la columna */}
              <div className={`relative min-h-[320px] lg:min-h-[560px] overflow-hidden ${i % 2 !== 0 ? 'lg:order-last' : ''}`}>
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover ${service.image.position} transition-transform duration-700 hover:scale-105`}
                  quality={85}
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-dark-olive/10" />
                {/* Número decorativo */}
                <div className="absolute top-6 right-6 font-heading font-bold text-6xl text-white/20 leading-none select-none">
                  {service.number}
                </div>
              </div>

              {/* Contenido */}
              <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-16 py-16 lg:py-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-olive/10 flex items-center justify-center text-olive flex-shrink-0">
                    {service.icon}
                  </div>
                  <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive">
                    {service.number} — {service.title}
                  </p>
                </div>

                <h2 className="font-heading font-bold text-2xl md:text-3xl xl:text-4xl text-dark-olive leading-tight mb-4">
                  {service.tagline}
                </h2>

                <p className="font-sans text-base text-olive/80 leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Tipos de proyecto */}
                <div className="mb-8">
                  <p className="font-heading font-semibold text-[10px] tracking-widest uppercase text-olive/40 mb-3">
                    Tipos de proyecto
                  </p>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {service.scope.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-sans text-sm text-dark-olive">
                        <span className="w-1 h-1 rounded-full bg-olive flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-cream-dark">
                  <p className="font-sans text-xs text-olive/60">
                    {service.scale}
                  </p>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 font-heading font-semibold text-xs tracking-widest uppercase text-dark-olive hover:text-olive transition-colors group"
                  >
                    Consultar
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
