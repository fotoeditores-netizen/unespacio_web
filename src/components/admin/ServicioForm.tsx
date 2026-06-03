'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { crearServicioAction, actualizarServicioAction } from '@/actions/servicios'
import ImageUploader from '@/components/admin/ImageUploader'
import type { Servicio } from '@/types/servicios'

interface Props { servicio?: Servicio }

export default function ServicioForm({ servicio }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    nombre: servicio?.nombre ?? '',
    slug_anchor: servicio?.slug_anchor ?? '',
    descripcion_corta: servicio?.descripcion_corta ?? '',
    descripcion_larga: servicio?.descripcion_larga ?? '',
    imagen_hero: servicio?.imagen_hero ?? '',
    orden: servicio?.orden ?? 0,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = servicio
        ? await actualizarServicioAction(servicio.id, form)
        : await crearServicioAction(form)
      if (!result.ok) { setError(result.error ?? 'Error inesperado.') }
      else { router.push('/admin/servicios'); router.refresh() }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nombre *</label>
          <input name="nombre" required value={form.nombre} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            placeholder="Arquitectura Educativa" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Slug anchor *</label>
          <input name="slug_anchor" required value={form.slug_anchor} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            placeholder="educativa" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descripción corta</label>
        <input name="descripcion_corta" value={form.descripcion_corta} onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          placeholder="Una línea para el preview de servicios" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descripción larga (Markdown)</label>
        <textarea name="descripcion_larga" value={form.descripcion_larga} onChange={handleChange} rows={6}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500 resize-y"
          placeholder="Descripción detallada del servicio..." />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Imagen hero</label>
        <ImageUploader
          folder="servicios"
          multiple={false}
          value={form.imagen_hero}
          onChange={(v) => setForm(prev => ({ ...prev, imagen_hero: typeof v === 'string' ? v : v[0] ?? '' }))}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Orden</label>
        <input type="number" name="orden" value={form.orden} onChange={handleChange}
          className="w-24 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500" />
      </div>
      {error && <p className="text-red-600 text-xs bg-red-50 px-3 py-2">{error}</p>}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => router.push('/admin/servicios')}
          className="border border-gray-300 text-gray-700 text-xs font-semibold uppercase tracking-wide px-6 py-2.5 hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
        <button type="submit" disabled={isPending}
          className="bg-gray-900 text-white text-xs font-semibold uppercase tracking-wide px-6 py-2.5 hover:bg-gray-700 transition-colors disabled:opacity-50">
          {isPending ? 'Guardando...' : servicio ? 'Guardar cambios' : 'Crear servicio'}
        </button>
      </div>
    </form>
  )
}
