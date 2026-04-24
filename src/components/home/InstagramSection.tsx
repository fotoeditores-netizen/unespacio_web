import Link from 'next/link'

const INSTAGRAM_URL = 'https://www.instagram.com/unespacioarquitectos/reels/'

const reels = [
  {
    id: 1,
    label: 'Proceso de diseño',
    caption: 'Del boceto al espacio construido',
    category: 'Proceso',
    span: 'col-span-1 row-span-2',
    aspectClass: 'aspect-[9/16]',
    accentBg: 'bg-olive',
  },
  {
    id: 2,
    label: 'Proyecto educativo',
    caption: 'Aulas que inspiran',
    category: 'Educativa',
    span: 'col-span-1 row-span-1',
    aspectClass: 'aspect-[4/3]',
    accentBg: 'bg-dark-olive',
  },
  {
    id: 3,
    label: 'Espacio corporativo',
    caption: 'Donde la empresa toma forma',
    category: 'Corporativa',
    span: 'col-span-1 row-span-1',
    aspectClass: 'aspect-[4/3]',
    accentBg: 'bg-olive/80',
  },
  {
    id: 4,
    label: 'Casa Ene',
    caption: 'Vivienda · 391 m²',
    category: 'Residencial',
    span: 'col-span-2 row-span-1',
    aspectClass: 'aspect-[16/7]',
    accentBg: 'bg-dark-olive/90',
  },
  {
    id: 5,
    label: 'Detalle constructivo',
    caption: 'La materialidad del espacio',
    category: 'Detalle',
    span: 'col-span-1 row-span-1',
    aspectClass: 'aspect-square',
    accentBg: 'bg-olive/70',
  },
]

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-7 h-7 text-white drop-shadow-lg"
    >
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export default function InstagramSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <InstagramIcon className="w-4 h-4 text-olive" />
              <span className="font-sans text-xs tracking-widest uppercase text-olive">Instagram</span>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-dark-olive leading-tight">
              El estudio,<br />
              <span className="text-olive">en movimiento.</span>
            </h2>
          </div>
          <div className="md:text-right max-w-xs">
            <p className="font-sans text-sm text-olive/80 leading-relaxed mb-4">
              Procesos, obras en curso, detalles que cuentan historias. Síguenos en Instagram para ver cómo diseñamos los lugares donde ocurre la vida.
            </p>
            <p className="font-heading font-semibold text-sm text-dark-olive tracking-wide">
              @unespacioarquitectos
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Card 1 — tall left */}
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden row-span-2 bg-olive/20"
            style={{ gridRow: 'span 2' }}
          >
            <div className="absolute inset-0 bg-olive/20 flex flex-col items-center justify-center">
              {/* Placeholder texture */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #787A68 0, #787A68 1px, transparent 0, transparent 50%)',
                  backgroundSize: '10px 10px',
                }}
              />
            </div>
            <div className="relative aspect-[9/16] md:aspect-auto md:h-full min-h-[320px] flex flex-col justify-between p-5">
              {/* Top badge */}
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs tracking-widest uppercase text-cream/80 bg-dark-olive/60 px-2 py-1 backdrop-blur-sm">
                  Proceso
                </span>
                <div className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayIcon />
                </div>
              </div>
              {/* Bottom text */}
              <div>
                <p className="font-heading font-bold text-lg text-white leading-snug mb-1">
                  Del boceto al espacio construido
                </p>
                <p className="font-sans text-xs text-cream/70">Proceso de diseño</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-dark-olive/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>
          </Link>

          {/* Card 2 — top right */}
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-dark-olive"
          >
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, #EDE9DC 0, #EDE9DC 1px, transparent 0, transparent 50%)',
                backgroundSize: '10px 10px',
              }}
            />
            <div className="relative aspect-[4/3] flex flex-col justify-between p-4">
              <span className="font-sans text-xs tracking-widest uppercase text-cream/60">Educativa</span>
              <div>
                <p className="font-heading font-bold text-base text-white leading-snug mb-1">Aulas que inspiran</p>
                <p className="font-sans text-xs text-cream/50">Proyecto educativo</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-olive/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>
          </Link>

          {/* Card 3 — mid right */}
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-olive"
          >
            <div className="relative aspect-[4/3] flex flex-col justify-between p-4">
              <span className="font-sans text-xs tracking-widest uppercase text-cream/70">Corporativa</span>
              <div>
                <p className="font-heading font-bold text-base text-white leading-snug mb-1">Donde la empresa toma forma</p>
                <p className="font-sans text-xs text-cream/60">Espacio corporativo</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-dark-olive/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>
          </Link>

          {/* Card 4 — bottom wide (hidden on mobile, shown on md+) */}
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-dark-olive/90 hidden md:block md:col-span-2"
          >
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #EDE9DC 0, #EDE9DC 1px, transparent 0, transparent 50%)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative aspect-[16/7] flex items-end justify-between p-6">
              <div>
                <span className="font-sans text-xs tracking-widest uppercase text-cream/60 block mb-2">Residencial</span>
                <p className="font-heading font-bold text-2xl text-white leading-snug">Casa Ene · 391 m²</p>
              </div>
              <p className="font-sans text-xs text-cream/40 text-right max-w-[180px] leading-relaxed">
                Vivienda unifamiliar.<br />La arquitectura como diálogo.
              </p>
            </div>
            <div className="absolute inset-0 bg-olive/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>
          </Link>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-olive/20">
          <p className="font-sans text-sm text-olive/70 text-center sm:text-left">
            Más de nuestros proyectos, procesos y reflexiones en Instagram.
          </p>
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-heading font-semibold text-sm tracking-wide text-dark-olive uppercase hover:text-olive transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            Ver todos los reels
            <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
          </Link>
        </div>
      </div>
    </section>
  )
}
