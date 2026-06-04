'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crearPaginaAction } from '@/actions/paginas'

function slugify(t: string) {
  return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function NuevaPaginaPage() {
  const router = useRouter()
  const [titulo, setTitulo] = useState('')
  const [slug, setSlug] = useState('')
  const [creando, setCreando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!titulo.trim() || !slug.trim()) return
    setCreando(true)
    setError(null)
    const result = await crearPaginaAction({ titulo, slug, estado: 'borrador', orden: 0 })
    if (result.ok && result.id) {
      router.push(`/admin/paginas/${result.id}`)
    } else {
      setError(result.error ?? 'Error al crear la página.')
      setCreando(false)
    }
  }

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="font-['Montserrat'] font-bold text-2xl text-[#1a1a1a]">Nueva página</h1>
        <a href="/admin/paginas" className="text-xs text-gray-400 hover:text-gray-600 mt-1 inline-block">← Volver a páginas</a>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded p-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Título de la página</label>
          <input
            value={titulo}
            onChange={e => {
              setTitulo(e.target.value)
              setSlug(slugify(e.target.value))
            }}
            placeholder="Ej: Política de privacidad"
            required
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">URL (slug)</label>
          <div className="flex items-center border border-gray-200 rounded overflow-hidden">
            <span className="px-3 py-2 bg-gray-50 text-xs text-gray-400 border-r border-gray-200">/p/</span>
            <input
              value={slug}
              onChange={e => setSlug(slugify(e.target.value))}
              placeholder="politica-de-privacidad"
              required
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">La página estará disponible en /p/{slug || '...'}</p>
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={creando || !titulo.trim()}
          className="w-full py-2.5 bg-[#1a1a1a] text-white text-xs font-['Montserrat'] font-semibold tracking-widest uppercase rounded hover:bg-[#333] transition-colors disabled:opacity-50"
        >
          {creando ? 'Creando…' : 'Crear página y abrir editor'}
        </button>
      </form>
    </div>
  )
}
