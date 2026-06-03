import type { Metadata } from 'next'
import TeamSection from '@/components/estudio/TeamSection'
import PhilosophySection from '@/components/estudio/PhilosophySection'
import Link from 'next/link'
import { getEquipo } from '@/lib/equipo'

export const metadata: Metadata = {
  title: 'El Estudio',
  description:
    'Conoce a Laura Maya y Juan Esteban Ramírez, los fundadores de UnEspacio Arquitectos. Más de 20 años de experiencia combinada al servicio de cada proyecto.',
}

export default async function EstudioPage() {
  let equipo: Awaited<ReturnType<typeof getEquipo>> = []
  try { equipo = await getEquipo() } catch { /* usa fallback */ }
  return (
    <>
      {/* Page Header */}
      <section className="bg-dark-olive pt-32 pb-20">
        <div className="container-custom">
          <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive-light mb-6">
            El Estudio
          </p>
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-white max-w-2xl leading-tight">
            Dos arquitectos, un propósito compartido
          </h1>
          <p className="font-sans text-lg text-cream/70 max-w-xl mt-6 leading-relaxed">
            Laura y Juan Esteban fundaron UnEspacio en 2021 con la convicción de que la arquitectura
            debe ser siempre una respuesta honesta a las necesidades de quien la habita.
          </p>
        </div>
      </section>

      <TeamSection equipo={equipo} />
      <PhilosophySection />

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-olive mb-6">
            ¿Quieres trabajar con nosotros?
          </h2>
          <p className="font-sans text-lg text-olive mb-10 max-w-lg mx-auto">
            Iniciemos una conversación. Sin compromisos, solo escucha.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn-primary">
              Contactar Ahora
            </Link>
            <Link href="/portafolio" className="btn-outline-dark">
              Ver Portafolio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
