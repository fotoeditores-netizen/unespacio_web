'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { actualizarPaginaAction } from '@/actions/paginas'
import BloqueTextoEditor from './bloques/BloqueTextoEditor'
import BloqueImagenTextoEditor from './bloques/BloqueImagenTextoEditor'
import BloqueHeroEditor from './bloques/BloqueHeroEditor'
import BloqueGaleriaEditor from './bloques/BloqueGaleriaEditor'
import type { TipoBloque, BloqueContenido, BloqueTexto, BloqueImagenTexto, BloqueHero, BloqueGaleria, PaginaConBloques } from '@/types/paginas'

interface BloqueLocal {
  key: string
  tipo: TipoBloque
  contenido: BloqueContenido
}

const DEFAULTS: Record<TipoBloque, BloqueContenido> = {
  texto: { titulo: '', cuerpo: '' } as BloqueTexto,
  imagen_texto: { imagen: '', lado: 'izquierda', titulo: '', parrafo: '' } as BloqueImagenTexto,
  hero: { imagen: '', titulo: '', subtitulo: '', cta_texto: '', cta_url: '' } as BloqueHero,
  galeria: { imagenes: [] } as BloqueGaleria,
}

const LABELS: Record<TipoBloque, string> = {
  texto: '📝 Texto',
  imagen_texto: '🖼️ Imagen + Texto',
  hero: '🎯 Hero / Banner',
  galeria: '🖼️ Galería',
}

function genKey() {
  return Math.random().toString(36).slice(2)
}

export default function PageBuilder({ pagina }: { pagina: PaginaConBloques }) {
  const router = useRouter()
  const [titulo, setTitulo] = useState(pagina.titulo)
  const [slug, setSlug] = useState(pagina.slug)
  const [estado, setEstado] = useState<'borrador' | 'publicada'>(pagina.estado)
  const [bloques, setBloques] = useState<BloqueLocal[]>(
    pagina.bloques.map(b => ({ key: genKey(), tipo: b.tipo, contenido: b.contenido }))
  )
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState(false)
  const [mostrarSelector, setMostrarSelector] = useState(false)

  function agregarBloque(tipo: TipoBloque) {
    setBloques(prev => [...prev, { key: genKey(), tipo, contenido: { ...DEFAULTS[tipo] } }])
    setMostrarSelector(false)
  }

  function eliminarBloque(key: string) {
    if (!confirm('¿Eliminar este bloque?')) return
    setBloques(prev => prev.filter(b => b.key !== key))
  }

  function moverBloque(key: string, dir: -1 | 1) {
    setBloques(prev => {
      const idx = prev.findIndex(b => b.key === key)
      const newIdx = idx + dir
      if (newIdx < 0 || newIdx >= prev.length) return prev
      const arr = [...prev]
      ;[arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]]
      return arr
    })
  }

  function actualizarContenido(key: string, contenido: BloqueContenido) {
    setBloques(prev => prev.map(b => b.key === key ? { ...b, contenido } : b))
  }

  function slugify(t: string) {
    return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  async function guardar() {
    setGuardando(true)
    setError(null)
    setExito(false)
    const result = await actualizarPaginaAction(
      pagina.id,
      titulo,
      slug,
      estado,
      bloques.map((b, i) => ({ tipo: b.tipo, orden: i, contenido: b.contenido }))
    )
    setGuardando(false)
    if (result.ok) {
      setExito(true)
      setTimeout(() => setExito(false), 3000)
      router.refresh()
    } else {
      setError(result.error ?? 'Error al guardar.')
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-['Montserrat'] font-bold text-2xl text-[#1a1a1a]">Editor de página</h1>
          <a href="/admin/paginas" className="text-xs text-gray-400 hover:text-gray-600 mt-1 inline-block">← Volver a páginas</a>
        </div>
        <div className="flex items-center gap-3">
          {exito && <span className="text-xs text-green-600 font-medium">✓ Guardado</span>}
          {error && <span className="text-xs text-red-600">{error}</span>}
          <button
            onClick={guardar}
            disabled={guardando}
            className="px-5 py-2 bg-[#1a1a1a] text-white text-xs font-['Montserrat'] font-semibold tracking-widest uppercase rounded hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            {guardando ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </div>

      {/* Metadatos */}
      <div className="bg-white border border-gray-200 rounded p-5 mb-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Título de la página</label>
          <input
            value={titulo}
            onChange={e => {
              setTitulo(e.target.value)
              setSlug(slugify(e.target.value))
            }}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">URL (slug)</label>
            <div className="flex items-center border border-gray-200 rounded overflow-hidden">
              <span className="px-3 py-2 bg-gray-50 text-xs text-gray-400 border-r border-gray-200">/p/</span>
              <input
                value={slug}
                onChange={e => setSlug(slugify(e.target.value))}
                className="flex-1 px-3 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Estado</label>
            <select
              value={estado}
              onChange={e => setEstado(e.target.value as 'borrador' | 'publicada')}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
            >
              <option value="borrador">Borrador</option>
              <option value="publicada">Publicada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bloques */}
      <div className="space-y-4">
        {bloques.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded text-gray-400 text-sm">
            No hay bloques. Agrega uno con el botón de abajo.
          </div>
        )}

        {bloques.map((bloque, i) => (
          <div key={bloque.key} className="bg-white border border-gray-200 rounded overflow-hidden">
            {/* Header del bloque */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-xs font-semibold text-gray-600">{LABELS[bloque.tipo]}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moverBloque(bloque.key, -1)}
                  disabled={i === 0}
                  className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
                  title="Subir"
                >↑</button>
                <button
                  onClick={() => moverBloque(bloque.key, 1)}
                  disabled={i === bloques.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
                  title="Bajar"
                >↓</button>
                <button
                  onClick={() => eliminarBloque(bloque.key)}
                  className="p-1 text-red-400 hover:text-red-600 transition-colors ml-2"
                  title="Eliminar bloque"
                >✕</button>
              </div>
            </div>

            {/* Editor del bloque */}
            <div className="p-5">
              {bloque.tipo === 'texto' && (
                <BloqueTextoEditor
                  contenido={bloque.contenido as BloqueTexto}
                  onChange={c => actualizarContenido(bloque.key, c)}
                />
              )}
              {bloque.tipo === 'imagen_texto' && (
                <BloqueImagenTextoEditor
                  contenido={bloque.contenido as BloqueImagenTexto}
                  onChange={c => actualizarContenido(bloque.key, c)}
                />
              )}
              {bloque.tipo === 'hero' && (
                <BloqueHeroEditor
                  contenido={bloque.contenido as BloqueHero}
                  onChange={c => actualizarContenido(bloque.key, c)}
                />
              )}
              {bloque.tipo === 'galeria' && (
                <BloqueGaleriaEditor
                  contenido={bloque.contenido as BloqueGaleria}
                  onChange={c => actualizarContenido(bloque.key, c)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Agregar bloque */}
      <div className="mt-6">
        {mostrarSelector ? (
          <div className="bg-white border border-gray-200 rounded p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Selecciona un tipo de bloque</p>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(LABELS) as [TipoBloque, string][]).map(([tipo, label]) => (
                <button
                  key={tipo}
                  onClick={() => agregarBloque(tipo)}
                  className="text-left px-4 py-3 border border-gray-200 rounded hover:border-[#1a1a1a] hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMostrarSelector(false)}
              className="mt-3 text-xs text-gray-400 hover:text-gray-600"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setMostrarSelector(true)}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            + Agregar bloque
          </button>
        )}
      </div>
    </div>
  )
}
