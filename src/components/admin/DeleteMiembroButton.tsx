'use client'

import { useTransition } from 'react'
import { eliminarMiembroAction } from '@/actions/equipo'

export default function DeleteMiembroButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  function handleClick() {
    if (!confirm('¿Eliminar este miembro del equipo?')) return
    startTransition(() => eliminarMiembroAction(id))
  }
  return (
    <button onClick={handleClick} disabled={isPending}
      className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 disabled:opacity-50 transition-colors">
      {isPending ? 'Eliminando...' : 'Eliminar'}
    </button>
  )
}
