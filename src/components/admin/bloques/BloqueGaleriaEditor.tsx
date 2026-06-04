'use client'

import ImageUploader from '@/components/admin/ImageUploader'
import type { BloqueGaleria } from '@/types/paginas'

interface Props {
  contenido: BloqueGaleria
  onChange: (c: BloqueGaleria) => void
}

export default function BloqueGaleriaEditor({ contenido, onChange }: Props) {
  const imagenes = contenido.imagenes ?? []

  function handleImagenesChange(urls: string | string[]) {
    const arr = Array.isArray(urls) ? urls : [urls]
    const nuevas = arr.map((src, i) => ({
      src,
      pie: imagenes[i]?.pie ?? '',
    }))
    onChange({ imagenes: nuevas })
  }

  function handlePie(i: number, pie: string) {
    const nuevas = imagenes.map((img, idx) => idx === i ? { ...img, pie } : img)
    onChange({ imagenes: nuevas })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Imágenes de la galería</label>
        <ImageUploader
          folder="paginas"
          multiple={true}
          value={imagenes.map(i => i.src)}
          onChange={handleImagenesChange}
        />
      </div>
      {imagenes.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pie de foto por imagen</p>
          {imagenes.map((img, i) => (
            <div key={img.src} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-4 flex-shrink-0">{i + 1}</span>
              <input
                value={img.pie ?? ''}
                onChange={e => handlePie(i, e.target.value)}
                placeholder="Pie de foto (opcional)"
                className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
