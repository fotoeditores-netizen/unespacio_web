'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE REELS — EDITA ÚNICAMENTE ESTA SECCIÓN
// ══════════════════════════════════════════════════════════════════════════════
//
//  Cómo obtener la URL de un Reel:
//  1. Abre el Reel en Instagram
//  2. Toca los 3 puntos (···) → "Insertar" (Embed)
//  3. Copia la URL que aparece en: data-instgrm-permalink="..."
//     Formato: https://www.instagram.com/reel/XXXXXXXXXXX/?utm_source=ig_embed
//
//  Pega cada URL en el campo "url" del Reel correspondiente.
//  Deja url: '' para mostrar el placeholder hasta que tengas el enlace real.
//
// ══════════════════════════════════════════════════════════════════════════════
const REELS: { url: string; label: string }[] = [
  {
    url: 'https://www.instagram.com/reel/DWmymA7gszX/', // ← Reel 1
    label: 'Reel 1',
  },
  {
    url: 'https://www.instagram.com/reel/DW5CPxIDD0T/', // ← Reel 2
    label: 'Reel 2',
  },
  {
    url: 'https://www.instagram.com/reel/DXpMvmjkQcx/', // ← Reel 3
    label: 'Reel 3',
  },
]
// ══════════════════════════════════════════════════════════════════════════════

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

/** Tarjeta placeholder — se muestra cuando url está vacía */
function ReelPlaceholder({ index }: { index: number }) {
  const bg = index === 1 ? 'bg-dark-olive/10' : 'bg-olive/10'
  return (
    <a
      href="https://www.instagram.com/unespacioarquitectos/reels/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center gap-3 border border-olive/20 hover:border-olive/50 transition-colors"
      style={{ minHeight: '480px' }}
    >
      <InstagramIcon className="w-8 h-8 text-olive/40" />
      <div className="text-center px-6">
        <p className="font-heading font-semibold text-sm text-dark-olive/60">
          @unespacioarquitectos
        </p>
        <p className="font-sans text-xs text-olive/50 mt-1">
          Próximamente
        </p>
      </div>
    </a>
  )
}

/** Embed nativo de Instagram — se muestra cuando url tiene valor */
function ReelEmbed({ url }: { url: string }) {
  return (
    <div className="flex justify-center w-full">
      <blockquote
        className="instagram-media w-full"
        data-instgrm-captioned
        data-instgrm-permalink={`${url}&utm_source=ig_embed&utm_campaign=loading`}
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
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="flex flex-col items-center justify-center bg-olive/10" style={{ minHeight: '420px' }}>
              <InstagramIcon className="w-8 h-8 text-olive mb-2" />
              <p className="font-sans text-xs text-olive/70">Ver en Instagram</p>
            </div>
          </a>
        </div>
      </blockquote>
    </div>
  )
}

export default function InstagramSection() {
  const hasAnyReel = REELS.some((r) => r.url.trim() !== '')

  useEffect(() => {
    if (hasAnyReel && typeof window !== 'undefined' && window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [hasAnyReel])

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">

        {/* Encabezado */}
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

        {/* Grid 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {REELS.map((reel, i) =>
            reel.url.trim() !== '' ? (
              <ReelEmbed key={i} url={reel.url.trim()} />
            ) : (
              <ReelPlaceholder key={i} index={i} />
            )
          )}
        </div>

        {/* CTA */}
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

      {/* Script de Instagram — solo se carga si hay al menos un Reel configurado */}
      {hasAnyReel && (
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => {
            if (typeof window !== 'undefined' && window.instgrm) {
              window.instgrm.Embeds.process()
            }
          }}
        />
      )}

    </section>
  )
}
