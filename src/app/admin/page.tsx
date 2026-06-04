import Link from 'next/link'
import { getCitas } from '@/lib/citas'
import { getProyectos } from '@/lib/proyectos'
import { getEquipo } from '@/lib/equipo'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard | UnEspacio Admin' }
export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const [citas, proyectos, equipo] = await Promise.all([
    getCitas().catch(() => []),
    getProyectos().catch(() => []),
    getEquipo().catch(() => []),
  ])

  const citasPendientes = citas.filter(c => c.estado === 'pendiente').length
  const citasHoy = citas.filter(c => {
    const hoy = new Date()
    const iso = `${hoy.getFullYear()}-${String(hoy.getMonth()+1).padStart(2,'0')}-${String(hoy.getDate()).padStart(2,'0')}`
    return c.fecha === iso && c.estado !== 'cancelada'
  }).length
  const proyectosDestacados = proyectos.filter(p => p.destacado).length

  const stats = [
    { label: 'Citas pendientes', value: citasPendientes, alert: citasPendientes > 0, suffix: '' },
    { label: 'Citas hoy', value: citasHoy, alert: false, suffix: '' },
    { label: 'Portafolio publicado', value: proyectos.length, alert: false, suffix: '' },
    { label: 'Portafolio destacado', value: proyectosDestacados, alert: proyectosDestacados < 3, suffix: '/3 mín.' },
  ]

  const modules = [
    {
      href: '/admin/citas',
      icon: '📅',
      title: 'Citas',
      description: 'Gestiona las consultas agendadas por clientes. Confirma o cancela citas y notifica automáticamente.',
      badge: citasPendientes > 0 ? `${citasPendientes} pendiente${citasPendientes > 1 ? 's' : ''}` : null,
      badgeType: 'warn',
      cta: 'Ver citas →',
    },
    {
      href: '/admin/proyectos',
      icon: '🏛️',
      title: 'Portafolio',
      description: 'Publica nuevos proyectos, sube fotos, organiza el portafolio y marca proyectos como destacados en inicio.',
      badge: null,
      cta: 'Ver portafolio →',
    },
    {
      href: '/admin/equipo',
      icon: '👤',
      title: 'Equipo',
      description: `Edita los perfiles de ${equipo.map(m => m.nombre.split(' ')[0]).join(' y ') || 'Laura y Juan Esteban'}. Actualiza foto, rol y bio.`,
      badge: null,
      cta: 'Ver equipo →',
    },
    {
      href: '/admin/servicios',
      icon: '📋',
      title: 'Servicios',
      description: 'Edita la descripción y la imagen hero de cada una de las 6 tipologías de arquitectura.',
      badge: null,
      cta: 'Ver servicios →',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 font-['Montserrat'] mb-1">Bienvenido</p>
          <h1 className="text-2xl font-bold text-gray-900 font-['Montserrat']">Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className={`bg-white border rounded-lg px-5 py-4 ${s.alert ? 'border-amber-300 bg-amber-50' : 'border-gray-200'}`}>
              <p className={`text-3xl font-bold font-['Montserrat'] ${s.alert ? 'text-amber-700' : 'text-gray-900'}`}>
                {s.value}<span className="text-sm font-normal ml-1 text-gray-400">{s.suffix}</span>
              </p>
              <p className={`text-xs mt-1 ${s.alert ? 'text-amber-600' : 'text-gray-500'}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Módulos */}
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 font-['Montserrat'] mb-4">
          Secciones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-[#787A68] hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <h3 className="font-bold text-gray-900 font-['Montserrat'] text-base">{m.title}</h3>
                </div>
                {m.badge && (
                  <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full flex-shrink-0">
                    {m.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{m.description}</p>
              <span className="text-xs font-semibold text-[#2D2F1E] group-hover:text-[#787A68] transition-colors font-['Montserrat'] tracking-wide uppercase">
                {m.cta}
              </span>
            </Link>
          ))}
        </div>

        {/* Acceso rápido */}
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 font-['Montserrat'] mb-4">
          Acceso rápido
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/proyectos/nuevo" className="text-xs font-semibold bg-[#2D2F1E] text-white px-4 py-2.5 hover:bg-[#787A68] transition-colors uppercase tracking-wide font-['Montserrat']">
            + Nuevo proyecto
          </Link>
          <Link href="/admin/equipo/nuevo" className="text-xs font-semibold border border-gray-300 text-gray-700 px-4 py-2.5 hover:bg-gray-100 transition-colors uppercase tracking-wide font-['Montserrat']">
            + Nuevo miembro
          </Link>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold border border-gray-300 text-gray-700 px-4 py-2.5 hover:bg-gray-100 transition-colors uppercase tracking-wide font-['Montserrat']">
            Ver sitio público ↗
          </a>
        </div>

      </div>
    </div>
  )
}
