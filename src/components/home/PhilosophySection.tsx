import Image from 'next/image'
import Link from 'next/link'

export default function PhilosophySection() {
  return (
    <section className="bg-cream overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

        {/* Columna de texto */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-0">
          <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive mb-8">
            01 — El Estudio
          </p>

          <h2 className="font-heading font-bold text-3xl md:text-4xl xl:text-5xl text-dark-olive leading-tight mb-8">
            La arquitectura no es un producto — es una conversación.
          </h2>

          <p className="font-sans text-base md:text-lg text-olive leading-relaxed mb-5">
            Diseñamos los lugares donde la vida ocurre: donde los niños aprenden, los equipos crean, las familias crecen y las comunidades se encuentran.
          </p>
          <p className="font-sans text-sm text-olive/70 leading-relaxed mb-12">
            Cada proyecto comienza con una escucha profunda. El resultado no lleva nuestra firma — refleja el alma de quienes lo van a habitar. Ese es nuestro único estándar.
          </p>

          {/* Fundadores */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 sm:divide-x divide-olive/20 mb-12">
            <div className="sm:pr-8">
              <p className="font-heading font-bold text-dark-olive">Laura Maya</p>
              <p className="font-sans text-xs text-olive mt-0.5">Co-fundadora · Diseño</p>
            </div>
            <div className="sm:pl-8">
              <p className="font-heading font-bold text-dark-olive">Juan Esteban Ramírez</p>
              <p className="font-sans text-xs text-olive mt-0.5">Co-fundador · Dirección de Proyecto</p>
            </div>
          </div>

          <Link
            href="/estudio"
            className="self-start inline-flex items-center gap-3 font-heading font-semibold text-xs tracking-widest uppercase text-dark-olive group"
          >
            <span className="border-b border-dark-olive pb-0.5 group-hover:border-olive group-hover:text-olive transition-colors">
              Conocer el estudio
            </span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Columna de imagen — sangra hasta el borde */}
        <div className="relative min-h-[480px] lg:min-h-0">
          <Image
            src="/fotos/interior-casa-cem.jpg"
            alt="Interior Casa CEM — espacio donde ocurre la vida"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            quality={85}
          />
          {/* Label flotante */}
          <div className="absolute bottom-6 left-6 bg-dark-olive/90 backdrop-blur-sm text-white px-5 py-4">
            <p className="font-sans text-[10px] text-cream/50 tracking-widest uppercase mb-0.5">Proyecto</p>
            <p className="font-heading font-bold text-sm">Casa CEM</p>
            <p className="font-sans text-xs text-cream/60">Arquitectura Residencial</p>
          </div>
        </div>
      </div>
    </section>
  )
}
