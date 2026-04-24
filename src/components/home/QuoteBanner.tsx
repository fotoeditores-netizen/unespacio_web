import Image from 'next/image'

export default function QuoteBanner() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Imagen de fondo — ambientes educativos con niños */}
      <Image
        src="/fotos/quote-educativo.jpg"
        alt="Arquitectura educativa — ambientes donde ocurre la vida"
        fill
        className="object-cover object-center"
        quality={80}
      />
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-dark-olive/80" />

      {/* Contenido */}
      <div className="relative z-10 container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Comillas decorativas */}
          <svg
            className="w-10 h-10 text-olive/40 mx-auto mb-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <blockquote className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-8 text-balance">
            La arquitectura no es un producto, es una conversación entre el espacio y las personas que lo van a habitar. Cada proyecto es único.
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-olive/50" />
            <p className="font-sans text-sm text-cream/60">
              Laura Maya & Juan Esteban Ramírez · Fundadores
            </p>
            <div className="w-8 h-px bg-olive/50" />
          </div>
        </div>
      </div>
    </section>
  )
}
