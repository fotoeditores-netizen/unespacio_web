import Link from 'next/link'
import { getServicios } from '@/lib/servicios'
import DeleteServicioButton from '@/components/admin/DeleteServicioButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Servicios | UnEspacio' }
export const dynamic = 'force-dynamic'

export default async function AdminServiciosPage() {
  const servicios = await getServicios()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Servicios</h1>
            <p className="text-sm text-gray-500 mt-1">{servicios.length} servicio{servicios.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/admin/citas" className="text-xs text-gray-500 border border-gray-300 px-3 py-2 hover:bg-gray-100 transition-colors">← Citas</Link>
        </div>

        <div className="bg-white border border-gray-200 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Servicio', 'Slug', 'Descripción corta', 'Acciones'].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {servicios.map(s => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 text-sm">{s.nombre}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">{s.slug_anchor}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate">{s.descripcion_corta || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/servicios/${s.id}`} className="text-xs bg-gray-200 text-gray-800 px-3 py-1.5 rounded hover:bg-gray-300 transition-colors">Editar</Link>
                      <DeleteServicioButton id={s.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
