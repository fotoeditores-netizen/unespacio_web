'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Tipo global para el script de Instagram
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export default function InstagramSection() {
  // Re-inicializa los embeds cuando el componente monta en una SPA
  useEffect(() => {
    if (typeof window !== 'undefined' && window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">

        {/* ── Encabezado ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <InstagramIcon className="w-4 h-4 text-olive" />
              <span className="font-sans text-xs tracking-widest uppercase text-olive">
                Instagram · @unespacioarquitectos
              </span>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-dark-olive leading-tight">
              El estudio,<br />
              <span className="text-olive">en movimiento.</span>
            </h2>
          </div>
          <div className="md:text-right max-w-xs">
            <p className="font-sans text-sm text-olive/80 leading-relaxed mb-4">
              Procesos, obras en curso y detalles que cuentan historias.
              Síguenos para ver cómo diseñamos los lugares donde ocurre la vida.
            </p>
            <a
              href="https://www.instagram.com/unespacioarquitectos/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-semibold text-sm text-dark-olive tracking-wide hover:text-olive transition-colors"
            >
              @unespacioarquitectos →
            </a>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            REELS DE INSTAGRAM — EMBEDS NATIVOS OFICIALES
            ══════════════════════════════════════════════════════════════════

            CÓMO REEMPLAZAR CADA REEL POR TU VIDEO REAL:
            ─────────────────────────────────────────────
            1. Abre el Reel en Instagram desde tu celular o computador
            2. Toca los 3 puntos (···) del Reel → selecciona "Insertar" (Embed)
            3. Copia la URL del atributo: data-instgrm-permalink="..."
            4. En este archivo busca el comentario del Reel a cambiar
               (REEL 1, REEL 2 o REEL 3) y pega la URL en el lugar indicado

            EJEMPLO de URL de Reel:
            https://www.instagram.com/reel/ABC123XYZ/?utm_source=ig_embed

            ══════════════════════════════════════════════════════════════════ */}

        {/* Grid 3 columnas desktop · 1 columna móvil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* ┌─────────────────────────────────────────────────────────────────┐
              │  REEL 1 ─── PEGA AQUÍ LA URL DE TU PRIMER REEL               │
              │                                                                │
              │  Localiza la línea data-instgrm-permalink y reemplaza         │
              │  ÚNICAMENTE la URL entera por la URL de tu Reel:              │
              │                                                                │
              │  data-instgrm-permalink=                                       │
              │    "https://www.instagram.com/reel/ ◄ PON AQUÍ TU URL        │
              └───────────────────────────────────────────────────────────── */}
          <div className="flex justify-center w-full">
            <blockquote
              className="instagram-media w-full"
              data-instgrm-captioned
              data-instgrm-permalink="https://www.instagram.com/reel/REEL_ID_1/?utm_source=ig_embed&amp;utm_campaign=loading"
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '100%',
              }}
            >
              {/* Contenido visible mientras carga o si el Reel no está definido */}
              <div style={{ padding: '16px' }}>
                <a
                  href="https://www.instagram.com/unespacioarquitectos/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="flex flex-col items-center justify-center bg-olive/10" style={{ minHeight: '420px' }}>
                    <InstagramIcon className="w-8 h-8 text-olive mb-3" />
                    <p className="font-heading font-semibold text-sm text-dark-olive">Reel 1</p>
                    <p className="font-sans text-xs text-olive/60 mt-1 text-center px-4 max-w-[200px]">
                      Reemplaza REEL_ID_1 en el código con la URL de tu Reel
                    </p>
                  </div>
                </a>
              </div>
            </blockquote>
          </div>

          {/* ┌─────────────────────────────────────────────────────────────────┐
              │  REEL 2 ─── PEGA AQUÍ LA URL DE TU SEGUNDO REEL              │
              │                                                                │
              │  Localiza la línea data-instgrm-permalink y reemplaza         │
              │  ÚNICAMENTE la URL entera por la URL de tu Reel:              │
              │                                                                │
              │  data-instgrm-permalink=                                       │
              │    "https://www.instagram.com/reel/ ◄ PON AQUÍ TU URL        │
              └───────────────────────────────────────────────────────────── */}
          <div className="flex justify-center w-full">
            <blockquote
              className="instagram-media w-full"
              data-instgrm-captioned
              data-instgrm-permalink="https://www.instagram.com/reel/REEL_ID_2/?utm_source=ig_embed&amp;utm_campaign=loading"
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '100%',
              }}
            >
              <div style={{ padding: '16px' }}>
                <a
                  href="https://www.instagram.com/unespacioarquitectos/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="flex flex-col items-center justify-center bg-dark-olive/10" style={{ minHeight: '420px' }}>
                    <InstagramIcon className="w-8 h-8 text-olive mb-3" />
                    <p className="font-heading font-semibold text-sm text-dark-olive">Reel 2</p>
                    <p className="font-sans text-xs text-olive/60 mt-1 text-center px-4 max-w-[200px]">
                      Reemplaza REEL_ID_2 en el código con la URL de tu Reel
                    </p>
                  </div>
                </a>
              </div>
            </blockquote>
          </div>

          {/* ┌─────────────────────────────────────────────────────────────────┐
              │  REEL 3 ─── PEGA AQUÍ LA URL DE TU TERCER REEL               │
              │                                                                │
              │  Localiza la línea data-instgrm-permalink y reemplaza         │
              │  ÚNICAMENTE la URL entera por la URL de tu Reel:              │
              │                                                                │
              │  data-instgrm-permalink=                                       │
              │    "https://www.instagram.com/reel/ ◄ PON AQUÍ TU URL        │
              └───────────────────────────────────────────────────────────── */}
          <div className="flex justify-center w-full">
            <blockquote
              className="instagram-media w-full"
              data-instgrm-captioned
              data-instgrm-permalink="https://www.instagram.com/reel/REEL_ID_3/?utm_source=ig_embed&amp;utm_campaign=loading"
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '100%',
              }}
            >
              <div style={{ padding: '16px' }}>
                <a
                  href="https://www.instagram.com/unespacioarquitectos/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="flex flex-col items-center justify-center bg-olive/10" style={{ minHeight: '420px' }}>
                    <InstagramIcon className="w-8 h-8 text-olive mb-3" />
                    <p className="font-heading font-semibold text-sm text-dark-olive">Reel 3</p>
                    <p className="font-sans text-xs text-olive/60 mt-1 text-center px-4 max-w-[200px]">
                      Reemplaza REEL_ID_3 en el código con la URL de tu Reel
                    </p>
                  </div>
                </a>
              </div>
            </blockquote>
          </div>

        </div>
        {/* ══ FIN GRID DE REELS ══════════════════════════════════════════════ */}

        {/* ── CTA ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-olive/20">
          <p className="font-sans text-sm text-olive/70 text-center sm:text-left">
            Más proyectos, procesos y reflexiones en Instagram.
          </p>
          <a
            href="https://www.instagram.com/unespacioarquitectos/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-heading font-semibold text-sm tracking-wide text-dark-olive uppercase hover:text-olive transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            Ver todos los reels
            <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
          </a>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SCRIPT OFICIAL DE INSTAGRAM — NO MOVER / NO ELIMINAR
          ══════════════════════════════════════════════════════════════════════
          Transforma los <blockquote> anteriores en reproductores reales de Reels.
          Se carga de forma diferida (lazyOnload) para no afectar el rendimiento.
          ══════════════════════════════════════════════════════════════════════ */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.instgrm) {
            window.instgrm.Embeds.process()
          }
        }}
      />

    </section>
  )
}
