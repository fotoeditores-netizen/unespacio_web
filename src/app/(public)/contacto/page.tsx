import type { Metadata } from 'next'
import ContactForm from '@/components/contacto/ContactForm'
import BotonAgendarCita from '@/components/agendamiento/BotonAgendarCita'
import { getContentBySeccion } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Inicia una conversación con UnEspacio Arquitectos. Agenda una consulta inicial gratuita con Laura Maya o Juan Esteban Ramírez.',
}

export default async function ContactoPage() {
  const contacto = await getContentBySeccion('contacto')

  const email = contacto.email ?? 'hola@unespacio.com'
  const whatsapp = contacto.whatsapp ?? '+57 301 437 5950'
  const ciudad = contacto.ciudad ?? 'Colombia'
  const waNumero = whatsapp.replace(/\D/g, '')

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      label: 'WhatsApp',
      value: whatsapp,
      href: `https://wa.me/${waNumero}?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20UnEspacio%20Arquitectos.`,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Ciudad',
      value: ciudad,
      href: null,
    },
  ]
  return (
    <>
      {/* Header */}
      <section className="bg-dark-olive pt-32 pb-20">
        <div className="container-custom">
          <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive-light mb-6">
            Contacto
          </p>
          <div className="max-w-2xl">
            <h1 className="font-heading font-bold text-5xl md:text-6xl text-white leading-tight">
              Comencemos una conversación
            </h1>
            <p className="font-sans text-lg text-cream/70 mt-6 leading-relaxed">
              La primera consulta es sin costo y sin compromiso. Queremos entender
              tu proyecto antes de hacer cualquier propuesta.
            </p>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap gap-8 mt-12">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-olive/20 flex items-center justify-center text-cream/70 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-sans text-xs text-cream/40 tracking-wide">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-sans text-sm text-cream hover:text-olive-light transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-sans text-sm text-cream">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <div className="mb-10">
                <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive mb-3">
                  01 — Escríbenos
                </p>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-olive">
                  Cuéntanos sobre tu proyecto
                </h2>
                <p className="font-sans text-sm text-olive mt-3 leading-relaxed">
                  Responderemos dentro de las próximas 24 horas hábiles.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Calendly + info lateral */}
            <div className="space-y-10">
              <div>
                <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive mb-3">
                  02 — Agenda una cita
                </p>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-olive mb-3">
                  Prefiere una llamada o videollamada
                </h2>
                <p className="font-sans text-sm text-olive leading-relaxed mb-6">
                  Reserva un espacio en nuestro calendario para una primera conversación de 30 minutos.
                </p>
                <BotonAgendarCita
                  label="Reservar espacio en el calendario →"
                  className="btn-primary py-4 text-sm"
                />
              </div>

              {/* Trust signals */}
              <div className="bg-white p-8 space-y-5">
                <p className="font-heading font-semibold text-xs tracking-widest uppercase text-dark-olive/40">
                  ¿Por qué UnEspacio?
                </p>
                {[
                  { icon: '✓', text: 'Primera consulta gratuita y sin compromiso' },
                  { icon: '✓', text: 'Respuesta en menos de 24 horas hábiles' },
                  { icon: '✓', text: '+20 años de experiencia combinada' },
                  { icon: '✓', text: 'Proyectos desde 320 m² hasta 41.000 m²' },
                  { icon: '✓', text: 'Acompañamiento desde el concepto hasta la obra' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="font-heading font-bold text-olive text-sm flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <p className="font-sans text-sm text-dark-olive leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA banner */}
      <section className="bg-[#25D366] py-10">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <div>
              <p className="font-heading font-bold text-white text-lg">¿Prefieres WhatsApp?</p>
              <p className="font-sans text-white/80 text-sm">Escríbenos directamente, respondemos rápido.</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${waNumero}?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20UnEspacio%20Arquitectos.`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-semibold text-xs tracking-wider uppercase bg-white text-[#25D366] px-8 py-3.5 hover:bg-green-50 transition-colors flex-shrink-0"
          >
            Abrir WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
