'use client'

import { useTransition } from 'react'
import { eliminarPaginaAction } from '@/actions/paginas'

export default function DeletePaginaButton({ id, titulo }: { id: string; titulo: string }) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm(`¿Eliminar la página "${titulo}"? Esta acción no se puede deshacer.`)) return
    startTransition(() => eliminarPaginaAction(id))
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
