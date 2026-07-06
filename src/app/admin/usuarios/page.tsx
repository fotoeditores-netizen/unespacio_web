'use client'

import { useEffect, useState } from 'react'

type Rol = 'superadmin' | 'admin' | 'editor'

interface Usuario {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  role: string
  role_assigned_at: string | null
  invited: boolean
}

const ROLES: { value: Rol; label: string; desc: string }[] = [
  { value: 'superadmin', label: 'Superadmin', desc: 'Acceso total, incluyendo gestión de usuarios' },
  { value: 'admin', label: 'Administrador', desc: 'Acceso total excepto gestión de usuarios' },
  { value: 'editor', label: 'Editor', desc: 'Solo puede editar contenido y proyectos' },
]

const ROL_COLORS: Record<string, string> = {
  superadmin: 'bg-purple-100 text-purple-800',
  admin: 'bg-blue-100 text-blue-800',
  editor: 'bg-green-100 text-green-800',
  'sin rol': 'bg-gray-100 text-gray-500',
}

function formatFecha(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Formulario invitación
  const [email, setEmail] = useState('')
  const [rolNuevo, setRolNuevo] = useState<Rol>('editor')
  const [enviando, setEnviando] = useState(false)
  const [msgInvitacion, setMsgInvitacion] = useState<string | null>(null)

  async function cargarUsuarios() {
    setCargando(true)
    setError(null)
    const res = await fetch('/api/admin/usuarios')
    if (!res.ok) {
      const d = await res.json()
      setError(d.error ?? 'Error al cargar usuarios')
      setCargando(false)
      return
    }
    const d = await res.json()
    setUsuarios(d.users)
    setCargando(false)
  }

  useEffect(() => { cargarUsuarios() }, [])

  async function invitar(e: React.FormEvent) {
    e.preventDefault()
    setEnviando(true)
    setMsgInvitacion(null)
    const res = await fetch('/api/admin/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'invitar', email, role: rolNuevo }),
    })
    const d = await res.json()
    if (!res.ok) {
      setMsgInvitacion(`Error: ${d.error}`)
    } else {
      setMsgInvitacion(`Invitación enviada a ${email}`)
      setEmail('')
      cargarUsuarios()
    }
    setEnviando(false)
  }

  async function cambiarRol(user_id: string, role: Rol) {
    await fetch('/api/admin/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'cambiar_rol', user_id, role }),
    })
    cargarUsuarios()
  }

  async function eliminar(user_id: string, userEmail: string) {
    if (!confirm(`¿Eliminar acceso de ${userEmail}? Esta acción no se puede deshacer.`)) return
    await fetch('/api/admin/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'eliminar', user_id }),
    })
    cargarUsuarios()
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Usuarios</h1>
        <p className="text-sm text-gray-500">Gestiona quién tiene acceso al panel de administración.</p>
      </div>

      {/* Invitar usuario */}
      <div className="bg-white border border-gray-200 p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Invitar nuevo usuario</h2>
        <form onSubmit={invitar} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          />
          <select
            value={rolNuevo}
            onChange={e => setRolNuevo(e.target.value as Rol)}
            className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          >
            {ROLES.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={enviando}
            className="bg-gray-900 text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {enviando ? 'Enviando...' : 'Invitar'}
          </button>
        </form>
        {msgInvitacion && (
          <p className={`mt-3 text-xs px-3 py-2 ${msgInvitacion.startsWith('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
            {msgInvitacion}
          </p>
        )}

        {/* Descripción de roles */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {ROLES.map(r => (
            <div key={r.value} className="flex items-start gap-2 text-xs text-gray-500">
              <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${ROL_COLORS[r.value]} flex-shrink-0 mt-0.5`}>{r.label}</span>
              <span>{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Usuarios con acceso</h2>
        </div>

        {cargando && (
          <div className="px-6 py-10 text-center text-sm text-gray-400">Cargando...</div>
        )}

        {error && (
          <div className="px-6 py-4 text-sm text-red-600 bg-red-50">{error}</div>
        )}

        {!cargando && !error && usuarios.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-gray-400">No hay usuarios registrados.</div>
        )}

        {!cargando && !error && usuarios.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Rol</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Último acceso</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Desde</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {usuarios.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{u.email}</div>
                    {u.invited && (
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5">Pendiente de aceptar</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={u.role === 'sin rol' ? '' : u.role}
                      onChange={e => cambiarRol(u.id, e.target.value as Rol)}
                      className={`text-xs font-semibold px-2 py-1 rounded border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 ${ROL_COLORS[u.role]}`}
                    >
                      {u.role === 'sin rol' && <option value="">Sin rol</option>}
                      {ROLES.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-gray-500 text-xs">{formatFecha(u.last_sign_in_at)}</td>
                  <td className="px-4 py-4 text-gray-500 text-xs">{formatFecha(u.created_at)}</td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => eliminar(u.id, u.email ?? '')}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
