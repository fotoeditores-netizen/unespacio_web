import type { Metadata } from 'next'
import ServicesList from '@/components/servicios/ServicesList'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Servicios de arquitectura en 6 tipologías: educativa, corporativa, cultural, salud, comercial y residencial. Proyectos desde 320 m² hasta 41.000 m².',
}

const quickLinks = [
  { href: '#educativa', label: 'Educativa' },
  { href: '#corporativa', label: 'Corporativa' },
  { href: '#cultural', label: 'Cultural' },
  { href: '#salud', label: 'Salud' },
  { href: '#comercial', label: 'Comercial' },
  { href: '#residencial', label: 'Residencial' },
]

export default function ServiciosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-dark-olive pt-32 pb-20">
        <div className="container-custom">
          <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive-light mb-6">
            Servicios
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl text-white max-w-xl leading-tight">
                Arquitectura a la medida de cada vida
              </h1>
              <p className="font-sans text-lg text-cream/70 mt-6 max-w-lg leading-relaxed">
                Seis tipologías de diseño, una misma filosofía: el espacio como respuesta honesta
                a las necesidades humanas.
              </p>
            </div>
            <Link href="/contacto" className="btn-primary bg-olive hover:bg-olive-dark flex-shrink-0 self-start md:self-auto">
              Solicitar Propuesta
            </Link>
          </div>

          {/* Quick navigation */}
          <div className="flex flex-wrap gap-3 mt-12">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-heading text-xs font-semibold tracking-widest uppercase text-cream/50 hover:text-cream border border-white/10 hover:border-white/30 px-4 py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <ServicesList />

      {/* Process section */}
      <section className="section-padding bg-olive">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="font-heading font-semibold text-xs tracking-widest uppercase text-cream/60 mb-4">
              Nuestro Proceso
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white max-w-xl mx-auto">
              De la conversación al espacio habitable
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { step: '01', title: 'Escucha', desc: 'Entendemos tu proyecto, tus necesidades y tus sueños antes de trazar una sola línea.' },
              { step: '02', title: 'Concepto', desc: 'Desarrollamos una propuesta conceptual que responde a tu programa y tu presupuesto.' },
              { step: '03', title: 'Diseño', desc: 'Refinamos la propuesta hasta lograr un proyecto técnico, estético y viable.' },
              { step: '04', title: 'Obra', desc: 'Acompañamos la construcción para garantizar que el resultado sea fiel a la visión.' },
            ].map((phase) => (
              <div key={phase.step} className="bg-olive p-10 hover:bg-olive-dark transition-colors">
                <p className="font-heading font-bold text-5xl text-cream/20 mb-6">{phase.step}</p>
                <h3 className="font-heading font-bold text-xl text-white mb-3">{phase.title}</h3>
                <p className="font-sans text-sm text-cream/70 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-olive mb-6">
            ¿Cuál es tu proyecto?
          </h2>
          <p className="font-sans text-lg text-olive mb-10 max-w-md mx-auto">
            Sin importar la escala o la tipología, estamos listos para escucharte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn-primary">
              Agendar Consulta Gratuita
            </Link>
            <Link href="/portafolio" className="btn-outline-dark">
              Ver Proyectos
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
