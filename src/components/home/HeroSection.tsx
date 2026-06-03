import Image from 'next/image'
import Link from 'next/link'
import type { ContentMap } from '@/types/content'

interface HeroSectionProps {
  content: ContentMap
}

export default function HeroSection({ content }: HeroSectionProps) {
  const linea1 = content.titulo_linea1 ?? 'Diseñamos los lugares'
  const linea2 = content.titulo_linea2 ?? 'donde ocurre la vida.'
  const cta1 = content.cta1 ?? 'Ver Portafolio'
  const cta2 = content.cta2 ?? 'Agendar Consulta Gratuita'

  return (
    <section className="relative h-screen min-h-[680px] overflow-hidden">
      {/* Imagen hero — Hospital Tatamá, pórtico de entrada */}
      <Image
        src="/fotos/hospital-tatama.jpg"
        alt="Hospital Tatamá — UnEspacio Arquitectos"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
        quality={90}
      />

      {/* Overlay: oscuro arriba (para navbar), claro en medio, muy oscuro abajo (para texto) */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-olive/60 via-dark-olive/10 to-dark-olive/90" />

      {/* Contenido posicionado editorial — bottom left */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container-custom pb-14 md:pb-20">

          {/* Eyebrow */}
          <p className="font-heading font-semibold text-xs tracking-widest uppercase text-cream/50 mb-5 md:mb-7">
            UnEspacio Arquitectos · Fundado 2021
          </p>

          {/* Headline principal */}
          <h1 className="font-heading font-bold text-[2.6rem] leading-[1.05] md:text-6xl lg:text-7xl xl:text-[5.5rem] text-white mb-8 md:mb-10 max-w-4xl">
            {linea1}<br />
            <span className="text-cream/75 italic">{linea2}</span>
          </h1>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12 md:mb-16">
            <Link
              href="/portafolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-dark-olive font-heading font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-cream hover:-translate-y-0.5 hover:shadow-lg"
            >
              {cta1}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/50 text-white font-heading font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:border-white hover:bg-white/10 hover:-translate-y-0.5"
            >
              {cta2}
            </Link>
          </div>

          {/* Barra inferior — caption de imagen + scroll */}
          <div className="flex items-center justify-between pt-5 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-olive" />
              <p className="font-sans text-[11px] text-white/35 tracking-widest uppercase">
                Hospital Tatamá · Arquitectura de Salud
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2.5 text-white/30 animate-scroll-bounce">
              <span className="font-heading text-[10px] tracking-widest uppercase">Scroll</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
