'use client'

import type { BloqueTexto } from '@/types/paginas'

interface Props {
  contenido: BloqueTexto
  onChange: (c: BloqueTexto) => void
}

export default function BloqueTextoEditor({ contenido, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Título (opcional)</label>
        <input
          value={contenido.titulo ?? ''}
          onChange={e => onChange({ ...contenido, titulo: e.target.value })}
          placeholder="Título de la sección"
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Contenido</label>
        <textarea
          value={contenido.cuerpo}
          onChange={e => onChange({ ...contenido, cuerpo: e.target.value })}
          placeholder="Escribe el contenido aquí..."
          rows={6}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a] resize-y"
        />
      </div>
    </div>
  )
}
