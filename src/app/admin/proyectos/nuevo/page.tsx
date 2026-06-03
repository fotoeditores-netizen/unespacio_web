import ProyectoForm from '@/components/admin/ProyectoForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Nuevo proyecto | UnEspacio Admin' }

export default function NuevoProyectoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link href="/admin/proyectos" className="text-xs text-gray-500 hover:underline">← Volver a proyectos</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Nuevo proyecto</h1>
        </div>
        <div className="bg-white border border-gray-200 p-6">
          <ProyectoForm />
        </div>
      </div>
    </div>
  )
}
