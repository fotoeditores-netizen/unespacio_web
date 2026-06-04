import { notFound } from 'next/navigation'
import { getPaginaById } from '@/lib/paginas'
import PageBuilder from '@/components/admin/PageBuilder'

export const dynamic = 'force-dynamic'

export default async function EditarPaginaPage({ params }: { params: { id: string } }) {
  const pagina = await getPaginaById(params.id)
  if (!pagina) notFound()

  return <PageBuilder pagina={pagina} />
}
