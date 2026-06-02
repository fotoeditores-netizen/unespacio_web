import { getCitas } from '@/lib/citas'
import TablaCitas from '@/components/admin/TablaCitas'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Citas | UnEspacio' }
export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { estado?: string; fecha?: string }
}

export default async function AdminCitasPage({ searchParams }: Props) {
  const todas = await getCitas()

  const filtradas = todas.filter((c) => {
    if (searchParams.estado && c.estado !== searchParams.estado) return false
    if (searchParams.fecha && c.fecha !== searchParams.fecha) return false
    return true
  })

  const conteos = {
    total: todas.length,
    pendiente: todas.filter((c) => c.estado === 'pendiente').length,
    confirmada: todas.filter((c) => c.estado === 'confirmada').length,
    cancelada: todas.filter((c) => c.estado === 'cancelada').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Panel de citas</h1>
          <p className="text-sm text-gray-500 mt-1">UnEspacio Arquitectos</p>
        </div>

        {/* Contadores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', valor: conteos.total, color: 'bg-gray-100 text-gray-800' },
            { label: 'Pendientes', valor: conteos.pendiente, color: 'bg-yellow-50 text-yellow-800' },
            { label: 'Confirmadas', valor: conteos.confirmada, color: 'bg-green-50 text-green-800' },
            { label: 'Canceladas', valor: conteos.cancelada, color: 'bg-red-50 text-red-800' },
          ].map((item) => (
            <div key={item.label} className={`rounded-lg px-4 py-4 ${item.color}`}>
              <p className="text-2xl font-bold">{item.valor}</p>
              <p className="text-xs mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <form className="flex flex-wrap gap-3 mb-6">
          <select
            name="estado"
            defaultValue={searchParams.estado ?? ''}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white"
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="cancelada">Cancelada</option>
          </select>
          <input
            type="date"
            name="fecha"
            defaultValue={searchParams.fecha ?? ''}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Filtrar
          </button>
          <a
            href="/admin/citas"
            className="text-sm text-gray-500 px-4 py-2 hover:underline self-center"
          >
            Limpiar
          </a>
        </form>

        {/* Tabla */}
        {filtradas.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 px-6 py-12 text-center">
            <p className="text-gray-400 text-sm">No hay citas con los filtros seleccionados.</p>
          </div>
        ) : (
          <TablaCitas citas={filtradas} />
        )}
      </div>
    </div>
  )
}
