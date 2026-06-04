'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cerrarSesion } from '@/actions/auth'

interface NavItem {
  href: string
  label: string
  icon: string
  exact: boolean
  external?: boolean
}

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: 'Principal',
    items: [
      { href: '/admin', label: 'Dashboard', icon: '▤', exact: true },
    ],
  },
  {
    section: 'Contenido',
    items: [
      { href: '/admin/citas', label: 'Citas', icon: '📅', exact: false },
      { href: '/admin/proyectos', label: 'Proyectos', icon: '🏛️', exact: false },
      { href: '/admin/equipo', label: 'Equipo', icon: '👤', exact: false },
      { href: '/admin/servicios', label: 'Servicios', icon: '📋', exact: false },
      { href: '/admin/contenido', label: 'Contenido', icon: '✏️', exact: false },
      { href: '/admin/paginas', label: 'Páginas', icon: '📄', exact: false },
    ],
  },
  {
    section: 'Sitio',
    items: [
      { href: '/', label: 'Ver sitio público', icon: '↗', exact: false, external: true },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-[#2D2F1E] flex flex-col z-50 select-none">
      {/* Brand */}
      <Link href="/admin" className="flex flex-col px-5 py-5 border-b border-white/10 hover:bg-white/5 transition-colors">
        <span className="font-['Montserrat'] font-bold text-white text-sm tracking-widest uppercase leading-none">
          UnEspacio
        </span>
        <span className="font-['Montserrat'] text-[10px] text-[#787A68] tracking-widest uppercase mt-1">
          Arquitectura
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        {NAV.map((group) => (
          <div key={group.section} className="mb-2">
            <p className="px-5 py-2 text-[10px] font-['Montserrat'] font-700 tracking-[0.15em] uppercase text-white/25">
              {group.section}
            </p>
            {group.items.map((item) => {
              const active = isActive(item.href, item.exact)
              return item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent"
                >
                  <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors border-l-2 ${
                    active
                      ? 'text-white bg-white/8 border-[#787A68]'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                  style={active ? { backgroundColor: 'rgba(255,255,255,0.08)' } : {}}
                >
                  <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <form action={cerrarSesion}>
          <button
            type="submit"
            className="w-full text-left flex items-center gap-3 text-sm text-white/40 hover:text-white/70 transition-colors py-1"
          >
            <span className="text-base w-5 text-center">⎋</span>
            <span>Cerrar sesión</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
