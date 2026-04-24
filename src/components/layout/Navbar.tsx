'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/estudio', label: 'Estudio' },
  { href: '/portafolio', label: 'Portafolio' },
  { href: '/servicios', label: 'Servicios' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/logosimbolo_unespacio.png"
                alt="UnEspacio Arquitectos — logosímbolo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="leading-none">
              <p
                className={`font-heading font-bold text-base tracking-wider uppercase transition-colors ${
                  scrolled || !isHome ? 'text-dark-olive' : 'text-white'
                }`}
              >
                UnEspacio
              </p>
              <p
                className={`font-sans text-xs tracking-widest uppercase transition-colors ${
                  scrolled || !isHome ? 'text-olive' : 'text-cream'
                }`}
              >
                Arquitectos
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading text-xs font-semibold tracking-widest uppercase transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === link.href
                    ? scrolled || !isHome
                      ? 'text-olive after:w-full after:bg-olive'
                      : 'text-cream after:w-full after:bg-cream'
                    : scrolled || !isHome
                    ? 'text-dark-olive after:bg-olive hover:text-olive'
                    : 'text-white/80 after:bg-white hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className={`btn-primary text-xs py-2.5 px-6 ${
                !scrolled && isHome
                  ? 'bg-cream text-dark-olive hover:bg-white'
                  : ''
              }`}
            >
              Agendar Cita
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${
              scrolled || !isHome ? 'text-dark-olive' : 'text-white'
            }`}
            aria-label="Abrir menú"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2 w-6' : ''
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-20 bg-dark-olive z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-custom py-12 flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-heading font-bold text-3xl text-white py-3 border-b border-white/10 transition-all duration-200 hover:text-cream hover:pl-4 ${
                pathname === link.href ? 'text-cream' : ''
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="mt-8 btn-primary text-center bg-olive hover:bg-olive-dark"
          >
            Agendar Cita
          </Link>
        </div>
      </div>
    </header>
  )
}
