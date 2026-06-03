import { notFound } from 'next/navigation'
import { getMiembro } from '@/lib/equipo'
import MiembroForm from '@/components/admin/MiembroForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: 'Editar miembro | UnEspacio Admin' }
}

export default async function EditarMiembroPage({ params }: Props) {
  const miembro = await getMiembro(params.id)
  if (!miembro) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link href="/admin/equipo" className="text-xs text-gray-500 hover:underline">← Volver al equipo</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar: {miembro.nombre}</h1>
        </div>
        <div className="bg-white border border-gray-200 p-6">
          <MiembroForm miembro={miembro} />
        </div>
      </div>
    </div>
  )
}
