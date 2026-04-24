import type { Metadata } from 'next'
import ProjectGrid from '@/components/portafolio/ProjectGrid'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portafolio',
  description:
    'Proyectos de UnEspacio Arquitectos en arquitectura educativa, corporativa, cultural, de salud, comercial y residencial. Desde 320 m² hasta 41.000 m².',
}

export default function PortafolioPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-dark-olive pt-32 pb-20">
        <div className="container-custom">
          <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive-light mb-6">
            Portafolio
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl text-white max-w-xl leading-tight">
                Cada proyecto, una historia única
              </h1>
              <p className="font-sans text-lg text-cream/70 mt-6 max-w-lg leading-relaxed">
                Proyectos a diferentes escalas que comparten una misma filosofía:
                el diseño al servicio de quien habita el espacio.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/contacto" className="btn-primary bg-olive hover:bg-olive-dark">
                Iniciar un proyecto
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <ProjectGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream section-padding">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-olive mb-4">
            ¿Tu proyecto podría estar aquí?
          </h2>
          <p className="font-sans text-lg text-olive mb-10 max-w-md mx-auto">
            Conversemos sobre tu idea y exploremos las posibilidades juntos.
          </p>
          <Link href="/contacto" className="btn-primary">
            Agendar Consulta Gratuita
          </Link>
        </div>
      </section>
    </>
  )
}
