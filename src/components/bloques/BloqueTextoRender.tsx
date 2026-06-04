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
        <div
          className="prose prose-olive max-w-none font-sans text-base text-olive/80 leading-relaxed
            [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:text-dark-olive [&_h2]:mt-6 [&_h2]:mb-3
            [&_h3]:font-heading [&_h3]:font-bold [&_h3]:text-xl [&_h3]:text-dark-olive [&_h3]:mt-5 [&_h3]:mb-2
            [&_h4]:font-heading [&_h4]:font-semibold [&_h4]:text-lg [&_h4]:text-dark-olive [&_h4]:mt-4 [&_h4]:mb-2
            [&_strong]:font-semibold [&_strong]:text-dark-olive
            [&_em]:italic
            [&_u]:underline
            [&_s]:line-through
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1
            [&_a]:text-olive [&_a]:underline [&_a]:hover:text-dark-olive
            [&_p]:mb-4 [&_p:last-child]:mb-0
            [&_.text-center]:text-center [&_.text-right]:text-right"
          dangerouslySetInnerHTML={{ __html: contenido.cuerpo }}
        />
      </div>
    </section>
  )
}
