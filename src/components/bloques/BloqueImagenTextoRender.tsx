import Image from 'next/image'
import type { BloqueImagenTexto } from '@/types/paginas'

export default function BloqueImagenTextoRender({ contenido }: { contenido: BloqueImagenTexto }) {
  const imagenDerecha = contenido.lado === 'derecha'

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`relative aspect-[4/3] overflow-hidden ${imagenDerecha ? 'lg:order-last' : ''}`}>
            {contenido.imagen ? (
              <Image
                src={contenido.imagen}
                alt={contenido.titulo}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                quality={85}
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                Sin imagen
              </div>
            )}
          </div>
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-olive mb-6 leading-tight">
              {contenido.titulo}
            </h2>
            <div
              className="font-sans text-base text-olive/80 leading-relaxed
                [&_strong]:font-semibold [&_strong]:text-dark-olive
                [&_em]:italic [&_u]:underline [&_s]:line-through
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1
                [&_a]:text-olive [&_a]:underline [&_a]:hover:text-dark-olive
                [&_p]:mb-4 [&_p:last-child]:mb-0
                [&_.text-center]:text-center [&_.text-right]:text-right"
              dangerouslySetInnerHTML={{ __html: contenido.parrafo }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
