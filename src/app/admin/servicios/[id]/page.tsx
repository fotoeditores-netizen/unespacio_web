import { notFound } from 'next/navigation'
import { getServicios } from '@/lib/servicios'
import ServicioForm from '@/components/admin/ServicioForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: 'Editar servicio | UnEspacio Admin' }
}

export default async function EditarServicioPage({ params }: Props) {
  const servicios = await getServicios()
  const servicio = servicios.find(s => s.id === params.id)
  if (!servicio) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link href="/admin/servicios" className="text-xs text-gray-500 hover:underline">← Volver a servicios</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar: {servicio.nombre}</h1>
        </div>
        <div className="bg-white border border-gray-200 p-6">
          <ServicioForm servicio={servicio} />
        </div>
      </div>
    </div>
  )
}
