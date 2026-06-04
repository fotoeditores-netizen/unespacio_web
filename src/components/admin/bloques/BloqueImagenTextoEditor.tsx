'use client'

import ImageUploader from '@/components/admin/ImageUploader'
import RichTextEditor from '@/components/admin/RichTextEditor'
import type { BloqueImagenTexto } from '@/types/paginas'

interface Props {
  contenido: BloqueImagenTexto
  onChange: (c: BloqueImagenTexto) => void
}

export default function BloqueImagenTextoEditor({ contenido, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Imagen</label>
        <ImageUploader
          folder="paginas"
          multiple={false}
          value={contenido.imagen}
          onChange={v => onChange({ ...contenido, imagen: v as string })}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Posición de la imagen</label>
        <select
          value={contenido.lado}
          onChange={e => onChange({ ...contenido, lado: e.target.value as 'izquierda' | 'derecha' })}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
        >
          <option value="izquierda">Imagen a la izquierda</option>
          <option value="derecha">Imagen a la derecha</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Título</label>
        <input
          value={contenido.titulo}
          onChange={e => onChange({ ...contenido, titulo: e.target.value })}
          placeholder="Título de la sección"
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Texto</label>
        <RichTextEditor
          value={contenido.parrafo}
          onChange={html => onChange({ ...contenido, parrafo: html })}
          placeholder="Texto descriptivo..."
        />
      </div>
    </div>
  )
}
