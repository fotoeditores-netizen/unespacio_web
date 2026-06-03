'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { crearMiembroAction, actualizarMiembroAction } from '@/actions/equipo'
import type { Miembro } from '@/types/equipo'

interface Props { miembro?: Miembro }

export default function MiembroForm({ miembro }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [subiendoFoto, setSubiendoFoto] = useState(false)
  const [form, setForm] = useState({
    nombre: miembro?.nombre ?? '',
    rol: miembro?.rol ?? '',
    bio: miembro?.bio ?? '',
    foto: miembro?.foto ?? '',
    orden: miembro?.orden ?? 0,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }))
  }

  async function handleFotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendoFoto(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', 'equipo')
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const json = await res.json()
    if (json.url) setForm(prev => ({ ...prev, foto: json.url }))
    setSubiendoFoto(false)
    e.target.value = ''
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = miembro
        ? await actualizarMiembroAction(miembro.id, form)
        : await crearMiembroAction(form)
      if (!result.ok) { setError(result.error ?? 'Error inesperado.') }
      else { router.push('/admin/equipo'); router.refresh() }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nombre *</label>
        <input name="nombre" required value={form.nombre} onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          placeholder="Laura Maya" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Rol *</label>
        <input name="rol" required value={form.rol} onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          placeholder="Co-fundadora · Diseño" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Bio</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} rows={4}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500 resize-y"
          placeholder="Descripción del miembro del equipo..." />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Foto {subiendoFoto && <span className="text-blue-500 normal-case font-normal ml-2">Subiendo...</span>}
        </label>
        {form.foto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.foto} alt="" className="w-20 h-20 object-cover mb-2" />
        )}
        <input type="file" accept="image/*" onChange={handleFotoUpload} disabled={subiendoFoto}
          className="block text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:border file:border-gray-300 file:text-xs file:font-semibold file:bg-white hover:file:bg-gray-50 file:cursor-pointer" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Orden</label>
        <input type="number" name="orden" value={form.orden} onChange={handleChange}
          className="w-24 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500" />
      </div>
      {error && <p className="text-red-600 text-xs bg-red-50 px-3 py-2">{error}</p>}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => router.push('/admin/equipo')}
          className="border border-gray-300 text-gray-700 text-xs font-semibold uppercase tracking-wide px-6 py-2.5 hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
        <button type="submit" disabled={isPending || subiendoFoto}
          className="bg-gray-900 text-white text-xs font-semibold uppercase tracking-wide px-6 py-2.5 hover:bg-gray-700 transition-colors disabled:opacity-50">
          {isPending ? 'Guardando...' : miembro ? 'Guardar cambios' : 'Crear miembro'}
        </button>
      </div>
    </form>
  )
}
