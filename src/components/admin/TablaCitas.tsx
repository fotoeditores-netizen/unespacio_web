'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { cambiarEstadoCitaAction } from '@/actions/adminCitas'
import type { Cita, EstadoCita } from '@/types/citas'

const BADGE: Record<EstadoCita, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800',
}

function formatFecha(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function FilaCita({ cita }: { cita: Cita }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function cambiar(estado: EstadoCita) {
    startTransition(async () => {
      await cambiarEstadoCitaAction(cita.id, estado)
      router.refresh()
    })
  }

  return (
    <tr className={`border-b border-gray-100 ${isPending ? 'opacity-50' : ''}`}>
      <td className="px-4 py-3">
        <p className="font-medium text-gray-900 text-sm">{cita.nombre}</p>
        <p className="text-xs text-gray-400">{cita.correo}</p>
        <p className="text-xs text-gray-400">{cita.telefono}</p>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {formatFecha(cita.fecha)}<br />
        <span className="text-xs text-gray-400">{cita.hora}</span>
      </td>
      <td className="px-4 py-3 text-xs text-gray-600">{cita.tipo_consulta}</td>
      <td className="px-4 py-3">
        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${BADGE[cita.estado]}`}>
          {cita.estado}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          {cita.estado !== 'confirmada' && (
            <button
              onClick={() => cambiar('confirmada')}
              disabled={isPending}
              className="text-xs bg-green-600 text-white px-2.5 py-1 rounded hover:bg-green-700 disabled:opacity-40 transition-colors"
            >
              Confirmar
            </button>
          )}
          {cita.estado !== 'cancelada' && (
            <button
              onClick={() => cambiar('cancelada')}
              disabled={isPending}
              className="text-xs bg-red-600 text-white px-2.5 py-1 rounded hover:bg-red-700 disabled:opacity-40 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

export default function TablaCitas({ citas }: { citas: Cita[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {['Cliente', 'Fecha / Hora', 'Tipo', 'Estado', 'Acciones'].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <FilaCita key={cita.id} cita={cita} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
