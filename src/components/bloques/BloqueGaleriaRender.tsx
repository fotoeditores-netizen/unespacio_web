import Image from 'next/image'
import type { BloqueGaleria } from '@/types/paginas'

export default function BloqueGaleriaRender({ contenido }: { contenido: BloqueGaleria }) {
  const imagenes = contenido.imagenes ?? []
  if (imagenes.length === 0) return null

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imagenes.map((img, i) => (
            <div key={i} className="group relative overflow-hidden aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.pie ?? `Imagen ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={80}
              />
              {img.pie && (
                <div className="absolute bottom-0 inset-x-0 bg-dark-olive/70 px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-sans text-xs text-cream/80">{img.pie}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
