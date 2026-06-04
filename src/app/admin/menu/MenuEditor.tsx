'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { crearMenuItemAction, actualizarMenuItemAction, eliminarMenuItemAction } from '@/actions/menu'
import type { MenuItem } from '@/types/menu'

interface FormState {
  label: string
  url: string
  parent_id: string
  activo: boolean
}

const EMPTY_FORM: FormState = { label: '', url: '', parent_id: '', activo: true }

export default function MenuEditor({ items }: { items: MenuItem[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState(false)

  const raiz = items.filter(i => i.parent_id === null).sort((a, b) => a.orden - b.orden)
  const hijos = (parentId: string) => items.filter(i => i.parent_id === parentId).sort((a, b) => a.orden - b.orden)
  const padresDisponibles = items.filter(i => i.parent_id === null && i.id !== editingId)

  function startEdit(item: MenuItem) {
    setEditingId(item.id)
    setForm({ label: item.label, url: item.url, parent_id: item.parent_id ?? '', activo: item.activo })
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setError(null)
  }

  function flash() {
    setExito(true)
    setTimeout(() => setExito(false), 2500)
  }

  async function handleGuardar() {
    if (!form.label.trim() || !form.url.trim()) {
      setError('El nombre y la URL son obligatorios.')
      return
    }
    setError(null)
    const payload = {
      label: form.label.trim(),
      url: form.url.trim(),
      parent_id: form.parent_id || null,
      orden: editingId ? (items.find(i => i.id === editingId)?.orden ?? 0) : items.length,
      activo: form.activo,
    }
    startTransition(async () => {
      const result = editingId
        ? await actualizarMenuItemAction(editingId, payload)
        : await crearMenuItemAction(payload)
      if (result.ok) {
        cancelEdit()
        flash()
        router.refresh()
      } else {
        setError(result.error ?? 'Error al guardar.')
      }
    })
  }

  async function handleEliminar(id: string, label: string) {
    if (!confirm(`¿Eliminar "${label}" del menú? Los submenús también se eliminarán.`)) return
    startTransition(async () => {
      await eliminarMenuItemAction(id)
      router.refresh()
    })
  }

  async function mover(id: string, dir: -1 | 1) {
    const item = items.find(i => i.id === id)
    if (!item) return
    const grupo = items.filter(i => i.parent_id === item.parent_id).sort((a, b) => a.orden - b.orden)
    const idx = grupo.findIndex(i => i.id === id)
    const swap = grupo[idx + dir]
    if (!swap) return
    startTransition(async () => {
      await actualizarMenuItemAction(id, { orden: swap.orden })
      await actualizarMenuItemAction(swap.id, { orden: item.orden })
      router.refresh()
    })
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-['Montserrat'] font-bold text-2xl text-[#1a1a1a]">Menú de navegación</h1>
          <p className="text-sm text-gray-500 mt-1">Administra los ítems y submenús del sitio.</p>
        </div>
        {exito && <span className="text-xs text-green-600 font-medium">✓ Guardado</span>}
      </div>

      {/* Estructura actual */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden mb-8">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estructura actual</p>
        </div>
        {raiz.length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">No hay ítems de menú.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {raiz.map((item, i) => (
              <li key={item.id}>
                {/* Ítem raíz */}
                <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => mover(item.id, -1)} disabled={i === 0 || isPending} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none">▲</button>
                    <button onClick={() => mover(item.id, 1)} disabled={i === raiz.length - 1 || isPending} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none">▼</button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-[#1a1a1a]">{item.label}</span>
                    <span className="ml-2 text-xs text-gray-400 font-mono">{item.url}</span>
                    {!item.activo && <span className="ml-2 text-xs text-gray-400">(oculto)</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(item)} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors">Editar</button>
                    <button onClick={() => handleEliminar(item.id, item.label)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-colors">Eliminar</button>
                  </div>
                </div>

                {/* Submenús */}
                {hijos(item.id).map((hijo, j) => (
                  <div key={hijo.id} className="flex items-center gap-3 px-5 py-2.5 bg-gray-50/50 border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="w-6 flex-shrink-0" />
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => mover(hijo.id, -1)} disabled={j === 0 || isPending} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none">▲</button>
                      <button onClick={() => mover(hijo.id, 1)} disabled={j === hijos(item.id).length - 1 || isPending} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none">▼</button>
                    </div>
                    <span className="text-gray-300 text-sm">└</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-gray-700">{hijo.label}</span>
                      <span className="ml-2 text-xs text-gray-400 font-mono">{hijo.url}</span>
                      {!hijo.activo && <span className="ml-2 text-xs text-gray-400">(oculto)</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEdit(hijo)} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors">Editar</button>
                      <button onClick={() => handleEliminar(hijo.id, hijo.label)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-colors">Eliminar</button>
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulario agregar/editar */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {editingId ? 'Editar ítem' : 'Agregar ítem'}
          </p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Nombre</label>
              <input
                value={form.label}
                onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                placeholder="Ej: Blog"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">URL</label>
              <input
                value={form.url}
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                placeholder="Ej: /blog o https://..."
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Submenú de</label>
              <select
                value={form.parent_id}
                onChange={e => setForm(f => ({ ...f, parent_id: e.target.value }))}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
              >
                <option value="">— Ninguno (ítem principal) —</option>
                {padresDisponibles.map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.activo}
                  onChange={e => setForm(f => ({ ...f, activo: e.target.checked }))}
                  className="w-4 h-4 accent-[#1a1a1a]"
                />
                <span className="text-sm text-gray-700">Visible en el menú</span>
              </label>
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleGuardar}
              disabled={isPending}
              className="px-6 py-2 bg-[#1a1a1a] text-white text-xs font-['Montserrat'] font-semibold tracking-widest uppercase rounded hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {isPending ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Agregar ítem'}
            </button>
            {editingId && (
              <button onClick={cancelEdit} className="text-xs text-gray-500 hover:text-gray-700">
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
