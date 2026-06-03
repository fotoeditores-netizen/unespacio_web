import { notFound } from 'next/navigation'
import { getProyectos } from '@/lib/proyectos'
import ProyectoForm from '@/components/admin/ProyectoForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Editar proyecto | UnEspacio Admin` }
}

export default async function EditarProyectoPage({ params }: Props) {
  const proyectos = await getProyectos()
  const proyecto = proyectos.find(p => p.id === params.id)
  if (!proyecto) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link href="/admin/proyectos" className="text-xs text-gray-500 hover:underline">← Volver a proyectos</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar: {proyecto.titulo}</h1>
        </div>
        <div className="bg-white border border-gray-200 p-6">
          <ProyectoForm proyecto={proyecto} />
        </div>
      </div>
    </div>
  )
}
