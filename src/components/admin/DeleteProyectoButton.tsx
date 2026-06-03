'use client'

import { useTransition } from 'react'
import { eliminarProyectoAction } from '@/actions/proyectos'

export default function DeleteProyectoButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')) return
    startTransition(() => eliminarProyectoAction(id))
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
    >
      {isPending ? 'Eliminando...' : 'Eliminar'}
    </button>
  )
}
