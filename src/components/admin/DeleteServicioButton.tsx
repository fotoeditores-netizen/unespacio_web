'use client'

import { useTransition } from 'react'
import { eliminarServicioAction } from '@/actions/servicios'

export default function DeleteServicioButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  function handleClick() {
    if (!confirm('¿Eliminar este servicio?')) return
    startTransition(() => eliminarServicioAction(id))
  }
  return (
    <button onClick={handleClick} disabled={isPending}
      className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 disabled:opacity-50 transition-colors">
      {isPending ? 'Eliminando...' : 'Eliminar'}
    </button>
  )
}
