import Image from 'next/image'

// ══════════════════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE REELS — EDITA ÚNICAMENTE ESTA SECCIÓN
// ══════════════════════════════════════════════════════════════════════════════
//
//  image: ruta de la imagen en /public (se muestra siempre, nunca desaparece)
//  url:   enlace al Reel en Instagram (se abre al hacer clic)
//  label: texto alternativo de la imagen
//
//  Cuando instales el CMS, estos datos vendrán desde allá — la estructura
//  de cada tarjeta no cambia.
//
// ══════════════════════════════════════════════════════════════════════════════
const REELS: { url: string; image: string; label: string }[] = [
  {
    url: 'https://www.instagram.com/reel/DWmymA7gszX/',
    image: '/fotos/instagram/tarjeta-1.jpg',
    label: 'Reel 1 — @unespacioarquitectos',
  },
  {
    url: 'https://www.instagram.com/reel/DW5CPxIDD0T/',
    image: '/fotos/instagram/tarjeta-2.jpg',
    label: 'Reel 2 — @unespacioarquitectos',
  },
  {
    url: 'https://www.instagram.com/reel/DXpMvmjkQcx/',
    image: '/fotos/instagram/tarjeta-3.jpg',
    label: 'Reel 3 — @unespacioarquitectos',
  },
]
// ══════════════════════════════════════════════════════════════════════════════

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function ReelCard({ url, image, label }: { url: string; image: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden"
      aria-label={label}
    >
      <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Overlay con icono de Instagram al hacer hover */}
        <div className="absolute inset-0 bg-dark-olive/0 group-hover:bg-dark-olive/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
            <InstagramIcon className="w-10 h-10 text-white" />
            <span className="font-heading font-semibold text-white text-xs tracking-widest uppercase">
              Ver Reel
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function InstagramSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">

        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <InstagramIcon className="w-4 h-4 text-olive" />
              <span className="font-sans text-xs tracking-widest uppercase text-olive">
                Instagram · @unespacioarquitectos
              </span>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-dark-olive leading-tight">
              El estudio,<br />
              <span className="text-olive">en movimiento.</span>
            </h2>
          </div>
          <div className="md:text-right max-w-xs">
            <p className="font-sans text-sm text-olive/80 leading-relaxed mb-4">
              Procesos, obras en curso y detalles que cuentan historias.
              Síguenos para ver cómo diseñamos los lugares donde ocurre la vida.
            </p>
            <a
              href="https://www.instagram.com/unespacioarquitectos/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-semibold text-sm text-dark-olive tracking-wide hover:text-olive transition-colors"
            >
              @unespacioarquitectos →
            </a>
          </div>
        </div>

        {/* Grid 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {REELS.map((reel, i) => (
            <ReelCard key={i} url={reel.url} image={reel.image} label={reel.label} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-olive/20">
          <p className="font-sans text-sm text-olive/70 text-center sm:text-left">
            Más proyectos, procesos y reflexiones en Instagram.
          </p>
          <a
            href="https://www.instagram.com/unespacioarquitectos/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-heading font-semibold text-sm tracking-wide text-dark-olive uppercase hover:text-olive transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            Ver todos los reels
            <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
          </a>
        </div>

      </div>
    </section>
  )
}
