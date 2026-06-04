import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPaginaConBloques } from '@/lib/paginas'
import BloqueTextoRender from '@/components/bloques/BloqueTextoRender'
import BloqueImagenTextoRender from '@/components/bloques/BloqueImagenTextoRender'
import BloqueHeroRender from '@/components/bloques/BloqueHeroRender'
import BloqueGaleriaRender from '@/components/bloques/BloqueGaleriaRender'
import type { BloqueTexto, BloqueImagenTexto, BloqueHero, BloqueGaleria } from '@/types/paginas'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pagina = await getPaginaConBloques(params.slug)
  if (!pagina) return {}
  return { title: pagina.titulo }
}

export default async function PaginaDinamicaPage({ params }: { params: { slug: string } }) {
  const pagina = await getPaginaConBloques(params.slug)
  if (!pagina) notFound()

  return (
    <>
      {pagina.bloques.map((bloque) => {
        switch (bloque.tipo) {
          case 'texto':
            return <BloqueTextoRender key={bloque.id} contenido={bloque.contenido as BloqueTexto} />
          case 'imagen_texto':
            return <BloqueImagenTextoRender key={bloque.id} contenido={bloque.contenido as BloqueImagenTexto} />
          case 'hero':
            return <BloqueHeroRender key={bloque.id} contenido={bloque.contenido as BloqueHero} />
          case 'galeria':
            return <BloqueGaleriaRender key={bloque.id} contenido={bloque.contenido as BloqueGaleria} />
          default:
            return null
        }
      })}
    </>
  )
}
