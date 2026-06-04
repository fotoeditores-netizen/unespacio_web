import type { BloqueTexto } from '@/types/paginas'

export default function BloqueTextoRender({ contenido }: { contenido: BloqueTexto }) {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom max-w-3xl">
        {contenido.titulo && (
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-olive mb-6 leading-tight">
            {contenido.titulo}
          </h2>
        )}
        <div className="font-sans text-base text-olive/80 leading-relaxed whitespace-pre-line">
          {contenido.cuerpo}
        </div>
      </div>
    </section>
  )
}
