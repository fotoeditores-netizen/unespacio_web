import Image from 'next/image'
import Link from 'next/link'
import { getProyectos } from '@/lib/proyectos'

const FALLBACK = [
  { src: '/fotos/proyecto-facultad-artes.jpg', alt: 'Facultad de Artes', title: 'Facultad de Artes', category: 'Educativa · Cultural', tag: 'Obra construida', href: '/portafolio', position: 'object-center' },
  { src: '/fotos/proyecto-casa-cel.jpg', alt: 'Casa CEL', title: 'Casa CEL', category: 'Residencial', tag: 'Diseño residencial', href: '/portafolio', position: 'object-center' },
  { src: '/fotos/proyecto-centro-idiomas.jpg', alt: 'Centro de Idiomas EAFIT', title: 'Centro de Idiomas EAFIT', category: 'Educativa · Corporativa', tag: 'Gran escala', href: '/portafolio', position: 'object-top' },
]

export default async function FeaturedProjects() {
  let featured = FALLBACK
  try {
    const destacados = await getProyectos({ soloDestacados: true })
    if (destacados.length >= 3) {
      featured = destacados.slice(0, 3).map(p => ({
        src: p.imagen_portada || FALLBACK[0].src,
        alt: p.titulo,
        title: p.titulo,
        category: p.tipologia.charAt(0).toUpperCase() + p.tipologia.slice(1),
        tag: p.descripcion_corta || p.tipologia,
        href: '/portafolio',
        position: 'object-center',
      }))
    }
  } catch {
    // Si Supabase falla, usa el fallback
  }

  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive mb-3">
              02 — Proyectos Destacados
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-olive leading-tight">
              Cada proyecto, una historia única
            </h2>
          </div>
          <Link
            href="/portafolio"
            className="self-start sm:self-auto inline-flex items-center gap-2 font-heading font-semibold text-xs tracking-widest uppercase text-olive hover:text-dark-olive transition-colors group flex-shrink-0"
          >
            Ver portafolio completo
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid asimétrico editorial: proyecto grande izquierda + 2 apilados derecha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Proyecto 1 — ocupa 2/3 del ancho, toda la altura */}
          <Link
            href={featured[0].href}
            className="md:col-span-2 group relative overflow-hidden block min-h-[420px] md:min-h-[580px]"
          >
            <Image
              src={featured[0].src}
              alt={featured[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className={`object-cover ${featured[0].position} transition-transform duration-700 group-hover:scale-105`}
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-olive/80 via-dark-olive/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-5 left-5">
              <span className="font-heading font-semibold text-[10px] tracking-widest uppercase bg-white/15 backdrop-blur-sm text-white px-3 py-1.5">
                {featured[0].tag}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-sans text-[10px] text-cream/60 tracking-widest uppercase mb-1.5">{featured[0].category}</p>
              <div className="flex items-end justify-between">
                <h3 className="font-heading font-bold text-2xl text-white leading-tight">{featured[0].title}</h3>
                <svg className="w-5 h-5 text-cream/50 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Columna derecha: 2 proyectos apilados */}
          <div className="grid grid-rows-2 gap-3" style={{ minHeight: '580px' }}>
            {[featured[1], featured[2]].map((p, i) => (
              <Link key={i} href={p.href} className="group relative overflow-hidden block">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`object-cover ${p.position} transition-transform duration-700 group-hover:scale-105`}
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-olive/80 via-dark-olive/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="font-heading font-semibold text-[10px] tracking-widest uppercase bg-white/15 backdrop-blur-sm text-white px-2.5 py-1">
                    {p.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-sans text-[10px] text-cream/60 tracking-widest uppercase mb-1">{p.category}</p>
                  <h3 className="font-heading font-bold text-lg text-white leading-tight">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
