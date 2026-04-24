const values = [
  {
    number: '01',
    title: 'Escucha activa',
    description:
      'Cada proyecto comienza con una conversación profunda. Entendemos que el cliente es el experto en su propia vida y necesidades; nosotros somos expertos en traducir esas necesidades en espacio.',
  },
  {
    number: '02',
    title: 'Rigor técnico',
    description:
      'La belleza sin funcionalidad no es arquitectura. Cada decisión de diseño está respaldada por un sólido dominio técnico, normativo y constructivo que garantiza la calidad y durabilidad de la obra.',
  },
  {
    number: '03',
    title: 'Singularidad',
    description:
      'No trabajamos con plantillas. Cada proyecto es único porque cada cliente, cada terreno y cada programa arquitectónico es irrepetible. Nos negamos al copy-paste.',
  },
  {
    number: '04',
    title: 'Sostenibilidad',
    description:
      'Diseñamos pensando en el tiempo. Los materiales, la orientación, la ventilación natural y la huella de carbono son criterios que guían nuestras decisiones desde el primer esquema.',
  },
]

const milestones = [
  { year: '2021', event: 'Fundación de UnEspacio Arquitectos' },
  { year: '2022', event: 'Primer proyecto educativo de gran escala' },
  { year: '2023', event: 'Expansión a tipologías de salud y cultura' },
  { year: '2024', event: 'Proyecto de 41.000 m² como hito de la firma' },
  { year: '2025', event: 'Consolidación en arquitectura residencial' },
]

export default function PhilosophySection() {
  return (
    <>
      {/* Philosophy */}
      <section className="section-padding bg-dark-olive">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive-light mb-6">
              Nuestra Filosofía
            </p>
            <blockquote className="font-heading font-bold text-3xl md:text-4xl text-white leading-tight">
              &ldquo;La arquitectura no es un producto,{' '}
              <span className="text-cream">es una conversación</span>{' '}
              entre el espacio y las personas que lo van a habitar.&rdquo;
            </blockquote>
            <p className="font-sans text-cream/60 mt-6">
              — Laura Maya & Juan Esteban Ramírez
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {values.map((value) => (
              <div key={value.number} className="bg-dark-olive p-10 hover:bg-dark-olive-light transition-colors">
                <p className="font-heading font-bold text-5xl text-olive/30 mb-6 leading-none">
                  {value.number}
                </p>
                <h3 className="font-heading font-bold text-xl text-white mb-4">{value.title}</h3>
                <p className="font-sans text-sm text-cream/60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive mb-4 text-center">
              Trayectoria
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-olive text-center mb-16">
              Una firma en construcción constante
            </h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[60px] top-0 bottom-0 w-px bg-olive/20" />

              <div className="space-y-10">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-8 items-start">
                    <div className="w-[60px] flex-shrink-0 text-right">
                      <p className="font-heading font-bold text-sm text-olive">{m.year}</p>
                    </div>
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-3 h-3 rounded-full bg-olive" />
                    </div>
                    <div className="pb-2">
                      <p className="font-sans text-base text-dark-olive leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
