'use client'

import ImageUploader from '@/components/admin/ImageUploader'
import type { BloqueHero } from '@/types/paginas'

interface Props {
  contenido: BloqueHero
  onChange: (c: BloqueHero) => void
}

export default function BloqueHeroEditor({ contenido, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Imagen de fondo</label>
        <ImageUploader
          folder="paginas"
          multiple={false}
          value={contenido.imagen}
          onChange={v => onChange({ ...contenido, imagen: v as string })}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Título</label>
        <input
          value={contenido.titulo}
          onChange={e => onChange({ ...contenido, titulo: e.target.value })}
          placeholder="Título principal del hero"
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subtítulo (opcional)</label>
        <input
          value={contenido.subtitulo ?? ''}
          onChange={e => onChange({ ...contenido, subtitulo: e.target.value })}
          placeholder="Subtítulo o descripción breve"
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Texto del botón</label>
          <input
            value={contenido.cta_texto ?? ''}
            onChange={e => onChange({ ...contenido, cta_texto: e.target.value })}
            placeholder="Ej: Ver más"
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">URL del botón</label>
          <input
            value={contenido.cta_url ?? ''}
            onChange={e => onChange({ ...contenido, cta_url: e.target.value })}
            placeholder="Ej: /contacto"
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>
      </div>
    </div>
  )
}
