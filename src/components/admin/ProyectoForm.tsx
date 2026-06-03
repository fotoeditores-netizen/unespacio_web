'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { crearProyectoAction, actualizarProyectoAction } from '@/actions/proyectos'
import type { Proyecto, Tipologia } from '@/types/proyectos'

const TIPOLOGIAS: { value: Tipologia; label: string }[] = [
  { value: 'educativa', label: 'Educativa' },
  { value: 'corporativa', label: 'Corporativa' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'salud', label: 'Salud' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'residencial', label: 'Residencial' },
]

function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

interface Props {
  proyecto?: Proyecto
}

export default function ProyectoForm({ proyecto }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [subiendoImagen, setSubiendoImagen] = useState(false)

  const [form, setForm] = useState({
    titulo: proyecto?.titulo ?? '',
    slug: proyecto?.slug ?? '',
    tipologia: proyecto?.tipologia ?? 'residencial' as Tipologia,
    descripcion_corta: proyecto?.descripcion_corta ?? '',
    descripcion_larga: proyecto?.descripcion_larga ?? '',
    imagenes: proyecto?.imagenes ?? [] as string[],
    imagen_portada: proyecto?.imagen_portada ?? '',
    area_m2: proyecto?.area_m2 ?? null as number | null,
    anio: proyecto?.anio ?? null as number | null,
    destacado: proyecto?.destacado ?? false,
    orden: proyecto?.orden ?? 0,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : type === 'number'
        ? (value === '' ? null : Number(value))
        : value,
    }))
    if (name === 'titulo' && !proyecto) {
      setForm(prev => ({ ...prev, slug: slugify(value) }))
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    setSubiendoImagen(true)

    const nuevasUrls: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'proyectos')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) nuevasUrls.push(json.url)
    }

    setForm(prev => {
      const todasImagenes = [...prev.imagenes, ...nuevasUrls]
      return {
        ...prev,
        imagenes: todasImagenes,
        imagen_portada: prev.imagen_portada || todasImagenes[0] || '',
      }
    })
    setSubiendoImagen(false)
    e.target.value = ''
  }

  function eliminarImagen(url: string) {
    setForm(prev => {
      const imagenes = prev.imagenes.filter(i => i !== url)
      return {
        ...prev,
        imagenes,
        imagen_portada: prev.imagen_portada === url ? (imagenes[0] ?? '') : prev.imagen_portada,
      }
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = proyecto
        ? await actualizarProyectoAction(proyecto.id, form)
        : await crearProyectoAction(form)

      if (!result.ok) {
        setError(result.error ?? 'Error inesperado.')
      } else {
        router.push('/admin/proyectos')
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

      {/* Título y slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Título *</label>
          <input name="titulo" required value={form.titulo} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            placeholder="Casa CEM" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Slug *</label>
          <input name="slug" required value={form.slug} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            placeholder="casa-cem" />
        </div>
      </div>

      {/* Tipología */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tipología *</label>
        <select name="tipologia" value={form.tipologia} onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500 bg-white">
          {TIPOLOGIAS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      {/* Descripción corta */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descripción corta</label>
        <input name="descripcion_corta" value={form.descripcion_corta} onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          placeholder="Una línea descriptiva para el grid del portafolio" />
      </div>

      {/* Descripción larga */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descripción larga (Markdown)</label>
        <textarea name="descripcion_larga" value={form.descripcion_larga} onChange={handleChange} rows={6}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500 resize-y"
          placeholder="Descripción detallada del proyecto..." />
      </div>

      {/* Área y año */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Área (m²)</label>
          <input type="number" name="area_m2" value={form.area_m2 ?? ''} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            placeholder="1200" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Año</label>
          <input type="number" name="anio" value={form.anio ?? ''} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            placeholder="2024" />
        </div>
      </div>

      {/* Orden y destacado */}
      <div className="flex items-center gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Orden</label>
          <input type="number" name="orden" value={form.orden} onChange={handleChange}
            className="w-24 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500" />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <input type="checkbox" name="destacado" id="destacado" checked={form.destacado}
            onChange={handleChange} className="w-4 h-4 accent-gray-800" />
          <label htmlFor="destacado" className="text-sm text-gray-700">Mostrar en página de inicio</label>
        </div>
      </div>

      {/* Subida de imágenes */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Imágenes {subiendoImagen && <span className="text-blue-500 normal-case font-normal ml-2">Subiendo...</span>}
        </label>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={subiendoImagen}
          className="block text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:border file:border-gray-300 file:text-xs file:font-semibold file:bg-white hover:file:bg-gray-50 file:cursor-pointer" />

        {form.imagenes.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
            {form.imagenes.map((url) => (
              <div key={url} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className={`w-full aspect-square object-cover border-2 ${form.imagen_portada === url ? 'border-gray-800' : 'border-transparent'}`} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 items-center justify-center">
                  <button type="button" onClick={() => setForm(p => ({ ...p, imagen_portada: url }))}
                    className="text-xs bg-white text-gray-800 px-2 py-0.5 rounded">Portada</button>
                  <button type="button" onClick={() => eliminarImagen(url)}
                    className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">Eliminar</button>
                </div>
                {form.imagen_portada === url && (
                  <span className="absolute top-1 left-1 text-xs bg-gray-800 text-white px-1.5 py-0.5 rounded">Portada</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-600 text-xs bg-red-50 px-3 py-2">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => router.push('/admin/proyectos')}
          className="border border-gray-300 text-gray-700 text-xs font-semibold uppercase tracking-wide px-6 py-2.5 hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
        <button type="submit" disabled={isPending || subiendoImagen}
          className="bg-gray-900 text-white text-xs font-semibold uppercase tracking-wide px-6 py-2.5 hover:bg-gray-700 transition-colors disabled:opacity-50">
          {isPending ? 'Guardando...' : proyecto ? 'Guardar cambios' : 'Crear proyecto'}
        </button>
      </div>
    </form>
  )
}
