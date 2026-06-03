'use client'

import { useState, useRef, useCallback } from 'react'

interface Props {
  folder: string
  multiple?: boolean
  value: string | string[]
  onChange: (value: string | string[]) => void
}

export default function ImageUploader({ folder, multiple = false, value, onChange }: Props) {
  const [subiendo, setSubiendo] = useState(false)
  const [draggingOver, setDraggingOver] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const urls: string[] = multiple
    ? (Array.isArray(value) ? value : value ? [value] : [])
    : (typeof value === 'string' && value ? [value] : [])

  async function subirArchivos(files: FileList | File[]) {
    setSubiendo(true)
    const nuevas: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        const json = await res.json()
        if (json.url) nuevas.push(json.url)
      } catch { /* silencioso */ }
    }
    setSubiendo(false)

    if (multiple) {
      const todas = [...urls, ...nuevas]
      onChange(todas)
    } else {
      onChange(nuevas[0] ?? '')
    }
    if (inputRef.current) inputRef.current.value = ''
  }

  function eliminar(url: string) {
    if (multiple) {
      const filtradas = urls.filter(u => u !== url)
      onChange(filtradas)
    } else {
      onChange('')
    }
  }

  // Drag-and-drop reordenar (solo multiple)
  const handleDragStart = useCallback((i: number) => setDragIndex(i), [])
  const handleDragEnter = useCallback((i: number) => setDragOverIndex(i), [])
  const handleDragEnd = useCallback(() => {
    if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      const reordenadas = [...urls]
      const [item] = reordenadas.splice(dragIndex, 1)
      reordenadas.splice(dragOverIndex, 0, item)
      onChange(reordenadas)
    }
    setDragIndex(null)
    setDragOverIndex(null)
  }, [dragIndex, dragOverIndex, urls, onChange])

  // Drag-and-drop subir desde el sistema
  function handleDropZone(e: React.DragEvent) {
    e.preventDefault()
    setDraggingOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) subirArchivos(files)
  }

  return (
    <div className="space-y-3">
      {/* Zona de drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true) }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDropZone}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded cursor-pointer transition-colors px-4 py-6 text-center
          ${draggingOver ? 'border-gray-500 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        {subiendo ? (
          <p className="text-sm text-blue-600 font-medium">Subiendo{multiple ? ' imágenes' : ' imagen'}...</p>
        ) : (
          <>
            <p className="text-sm text-gray-500">
              Arrastra {multiple ? 'imágenes' : 'una imagen'} aquí o{' '}
              <span className="text-gray-800 font-semibold underline">haz clic para seleccionar</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — máx. 10 MB por archivo</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && subirArchivos(e.target.files)}
          disabled={subiendo}
        />
      </div>

      {/* Preview de imágenes */}
      {urls.length > 0 && (
        <div className={multiple ? 'grid grid-cols-3 sm:grid-cols-4 gap-2' : ''}>
          {urls.map((url, i) => (
            <div
              key={url}
              draggable={multiple}
              onDragStart={() => handleDragStart(i)}
              onDragEnter={() => handleDragEnter(i)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`relative group transition-opacity
                ${multiple ? 'cursor-grab active:cursor-grabbing' : ''}
                ${dragIndex === i ? 'opacity-40' : ''}
                ${dragOverIndex === i && dragIndex !== i ? 'ring-2 ring-gray-800' : ''}
              `}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className={`object-cover w-full ${multiple ? 'aspect-square' : 'h-40'}`}
              />

              {/* Overlay acciones */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => eliminar(url)}
                  className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>

              {/* Indicador portada (primera imagen en multiple) */}
              {multiple && i === 0 && (
                <span className="absolute top-1 left-1 text-[10px] bg-gray-900 text-white px-1.5 py-0.5 rounded">
                  Portada
                </span>
              )}

              {/* Handle drag */}
              {multiple && (
                <div className="absolute top-1 right-1 text-white/70 text-xs select-none">⠿</div>
              )}
            </div>
          ))}
        </div>
      )}

      {multiple && urls.length > 1 && (
        <p className="text-xs text-gray-400">Arrastra las imágenes para reordenar. La primera es la portada.</p>
      )}
    </div>
  )
}
