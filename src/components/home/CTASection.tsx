import Image from 'next/image'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Imagen — CDI Pasacaballos, render crepuscular dramático */}
      <Image
        src="/fotos/proyecto-cdi.jpg"
        alt="CDI Pasacaballos — UnEspacio Arquitectos"
        fill
        className="object-cover object-center"
        quality={80}
      />
      {/* Overlay escalonado: más oscuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-olive/90 via-dark-olive/75 to-dark-olive/85" />

      {/* Contenido */}
      <div className="relative z-10 container-custom">
        <div className="max-w-3xl">
          <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive-light mb-6">
            04 — Empecemos
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            ¿Listo para diseñar el espacio de tu vida?
          </h2>
          <p className="font-sans text-lg text-cream/65 leading-relaxed mb-12 max-w-xl">
            Una consulta inicial gratuita y sin compromiso. Queremos escucharte antes de trazar una sola línea.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-olive text-white font-heading font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-olive-dark hover:-translate-y-0.5 hover:shadow-lg"
            >
              Agendar Consulta Gratuita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/portafolio"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white font-heading font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              Explorar Proyectos
            </Link>
          </div>

          {/* Trust signals en línea */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-14 pt-10 border-t border-white/10">
            {[
              'Consulta inicial gratuita',
              '+20 años de experiencia',
              'Respuesta en 24 hrs',
              'Proyectos desde 320m²',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-sans text-xs text-cream/50">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
