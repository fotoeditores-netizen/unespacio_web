import Link from 'next/link'
import SectionTitle from '@/components/ui/SectionTitle'

export default function AboutPreview() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <SectionTitle
              eyebrow="El Estudio"
              title="Una conversación entre el espacio y quien lo habita"
              subtitle="Fundado en 2021 por Laura Maya y Juan Esteban Ramírez, con más de 20 años de experiencia combinada. Cada proyecto, desde 320 m² hasta 41.000 m², lleva nuestra firma de rigor, sensibilidad y escucha activa."
            />
            <div className="mt-10 flex gap-8">
              <div className="flex items-center gap-4">
                {/* Avatar placeholder Laura */}
                <div className="w-14 h-14 rounded-full bg-olive/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-olive text-lg">LM</span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-dark-olive text-sm">Laura Maya</p>
                  <p className="font-sans text-xs text-olive mt-0.5">Co-fundadora · Diseño</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Avatar placeholder Juan */}
                <div className="w-14 h-14 rounded-full bg-dark-olive/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-dark-olive text-lg">JE</span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-dark-olive text-sm">Juan Esteban Ramírez</p>
                  <p className="font-sans text-xs text-olive mt-0.5">Co-fundador · Dirección</p>
                </div>
              </div>
            </div>
            <Link href="/estudio" className="btn-outline-dark mt-10 inline-flex text-xs">
              Conocer el Estudio
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Visual placeholder */}
          <div className="relative">
            {/* Main image placeholder */}
            <div className="aspect-[4/5] bg-olive/15 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-olive/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="font-sans text-xs text-olive/50 tracking-wider uppercase">Foto del Estudio</p>
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-olive/40" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-olive/40" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-dark-olive text-white p-6 max-w-[200px]">
              <p className="font-heading font-bold text-4xl">+20</p>
              <p className="font-sans text-xs text-cream/70 mt-1 leading-relaxed">
                Años de experiencia combinada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
