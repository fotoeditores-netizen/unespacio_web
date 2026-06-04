'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { MenuItemConHijos } from '@/types/menu'

interface Props {
  menuItems: MenuItemConHijos[]
}

export default function NavbarClient({ menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false); setExpandedMobile(null) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isHome = pathname === '/'
  const dark = scrolled || !isHome

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${dark ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-8 w-36 flex-shrink-0">
              <Image
                src="/logo_unespacio.png"
                alt="UnEspacio Arquitectos"
                fill
                className={`object-contain object-left transition-all duration-300 ${dark ? '' : 'brightness-0 invert'}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) =>
              item.hijos.length > 0 ? (
                <DropdownItem key={item.id} item={item} dark={dark} pathname={pathname} />
              ) : (
                <Link
                  key={item.id}
                  href={item.url}
                  className={`font-heading text-xs font-semibold tracking-widest uppercase transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                    pathname === item.url
                      ? dark ? 'text-olive after:w-full after:bg-olive' : 'text-cream after:w-full after:bg-cream'
                      : dark ? 'text-dark-olive after:bg-olive hover:text-olive' : 'text-white/80 after:bg-white hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contacto"
              className={`btn-primary text-xs py-2.5 px-6 ${!scrolled && isHome ? 'bg-cream text-dark-olive hover:bg-white' : ''}`}
            >
              Agendar Cita
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${dark ? 'text-dark-olive' : 'text-white'}`}
            aria-label="Abrir menú"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`} />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 top-20 bg-dark-olive z-40 transition-all duration-300 overflow-y-auto ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="container-custom py-12 flex flex-col gap-2">
          {menuItems.map((item, i) => (
            <div key={item.id}>
              {item.hijos.length > 0 ? (
                <>
                  <button
                    onClick={() => setExpandedMobile(expandedMobile === item.id ? null : item.id)}
                    className={`w-full text-left font-heading font-bold text-3xl text-white py-3 border-b border-white/10 transition-all duration-200 hover:text-cream flex items-center justify-between ${pathname.startsWith(item.url) ? 'text-cream' : ''}`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    {item.label}
                    <span className={`text-xl transition-transform ${expandedMobile === item.id ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  {expandedMobile === item.id && (
                    <div className="pl-4 flex flex-col gap-1 py-2">
                      {item.hijos.map(hijo => (
                        <Link
                          key={hijo.id}
                          href={hijo.url}
                          className="font-heading font-semibold text-xl text-white/70 py-2 hover:text-cream transition-colors"
                        >
                          {hijo.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.url}
                  className={`font-heading font-bold text-3xl text-white py-3 border-b border-white/10 transition-all duration-200 hover:text-cream hover:pl-4 block ${pathname === item.url ? 'text-cream' : ''}`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link href="/contacto" className="mt-8 btn-primary text-center bg-olive hover:bg-olive-dark">
            Agendar Cita
          </Link>
        </div>
      </div>
    </header>
  )
}

function DropdownItem({ item, dark, pathname }: { item: MenuItemConHijos; dark: boolean; pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = pathname === item.url || item.hijos.some(h => pathname === h.url)

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className={`font-heading text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-1 ${
          isActive
            ? dark ? 'text-olive' : 'text-cream'
            : dark ? 'text-dark-olive hover:text-olive' : 'text-white/80 hover:text-white'
        }`}
      >
        {item.label}
        <span className={`text-[10px] transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2 w-52 z-50">
          <div className="bg-white shadow-xl rounded border border-gray-100 py-1">
          {item.hijos.map(hijo => (
            <Link
              key={hijo.id}
              href={hijo.url}
              className={`block px-4 py-2.5 text-xs font-heading font-semibold tracking-widest uppercase transition-colors ${
                pathname === hijo.url ? 'text-olive bg-cream/50' : 'text-dark-olive hover:bg-cream hover:text-olive'
              }`}
            >
              {hijo.label}
            </Link>
          ))}
          </div>
        </div>
      )}
    </div>
  )
}
