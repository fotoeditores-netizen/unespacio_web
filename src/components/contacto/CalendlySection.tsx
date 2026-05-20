'use client'

// TODO: Reemplaza CALENDLY_URL con tu URL real de Calendly
// Ejemplo: 'https://calendly.com/unespacio/consulta-inicial'
const CALENDLY_URL = 'https://calendly.com/unespacio/consulta-inicial'

export default function CalendlySection() {
  return (
    <div className="bg-white border border-cream-dark p-1">
      {/* Placeholder visual cuando no hay URL configurada */}
      <div className="relative">
        <div className="aspect-[4/3] md:aspect-[16/10] bg-cream flex flex-col items-center justify-center gap-6 p-8">
          <div className="w-16 h-16 bg-olive/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-xl text-dark-olive mb-2">
              Agenda tu consulta inicial
            </p>
            <p className="font-sans text-sm text-olive max-w-sm leading-relaxed">
              Elige el día y hora que mejor te funcione. La primera consulta es sin costo
              y sin compromiso.
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Abrir Calendario
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="font-sans text-xs text-olive/50">
            Powered by Calendly · Reunión de 30 min vía videollamada o presencial
          </p>
        </div>
      </div>

      {/*
        Para activar el embed real de Calendly, reemplaza el div anterior con:

        <iframe
          src={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=787A68`}
          className="w-full"
          style={{ height: '700px', border: 'none' }}
          title="Agendar cita con UnEspacio Arquitectos"
          loading="lazy"
        />

        También puedes usar el widget de Calendly con su script oficial:
        https://assets.calendly.com/assets/external/widget.js
      */}
    </div>
  )
}
