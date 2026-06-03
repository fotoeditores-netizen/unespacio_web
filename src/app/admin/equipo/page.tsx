import Link from 'next/link'
import { getEquipo } from '@/lib/equipo'
import DeleteMiembroButton from '@/components/admin/DeleteMiembroButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Equipo | UnEspacio' }
export const dynamic = 'force-dynamic'

export default async function AdminEquipoPage() {
  const equipo = await getEquipo()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Equipo</h1>
            <p className="text-sm text-gray-500 mt-1">{equipo.length} miembro{equipo.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/admin/equipo/nuevo" className="text-xs bg-gray-900 text-white px-4 py-2 hover:bg-gray-700 transition-colors font-semibold uppercase tracking-wide">+ Nuevo miembro</Link>
        </div>

        <div className="space-y-3">
          {equipo.length === 0 ? (
            <div className="bg-white border border-gray-200 px-6 py-12 text-center">
              <p className="text-gray-400 text-sm">No hay miembros. <Link href="/admin/equipo/nuevo" className="text-gray-700 underline">Agrega el primero.</Link></p>
            </div>
          ) : equipo.map(m => (
            <div key={m.id} className="bg-white border border-gray-200 px-5 py-4 flex items-center gap-4">
              {m.foto
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={m.foto} alt={m.nombre} className="w-12 h-12 object-cover rounded-full flex-shrink-0" />
                : <div className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-gray-400 text-lg font-bold">{m.nombre[0]}</div>
              }
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{m.nombre}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.rol}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link href={`/admin/equipo/${m.id}`} className="text-xs bg-gray-200 text-gray-800 px-3 py-1.5 rounded hover:bg-gray-300 transition-colors">Editar</Link>
                <DeleteMiembroButton id={m.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
