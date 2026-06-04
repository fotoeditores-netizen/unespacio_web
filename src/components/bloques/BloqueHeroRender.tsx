import Image from 'next/image'
import Link from 'next/link'
import type { BloqueHero } from '@/types/paginas'

export default function BloqueHeroRender({ contenido }: { contenido: BloqueHero }) {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      {contenido.imagen ? (
        <Image
          src={contenido.imagen}
          alt={contenido.titulo}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={90}
        />
      ) : (
        <div className="absolute inset-0 bg-dark-olive" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-olive/40 to-dark-olive/80" />
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container-custom pb-14 md:pb-20">
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-4 leading-tight max-w-3xl">
            {contenido.titulo}
          </h1>
          {contenido.subtitulo && (
            <p className="font-sans text-lg text-cream/70 mb-8 max-w-2xl">
              {contenido.subtitulo}
            </p>
          )}
          {contenido.cta_texto && contenido.cta_url && (
            <Link
              href={contenido.cta_url}
              className="inline-flex items-center px-8 py-3.5 bg-white text-dark-olive font-heading font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-cream hover:-translate-y-0.5"
            >
              {contenido.cta_texto}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
