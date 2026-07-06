'use client'

import { useState } from 'react'

interface Datos {
  whatsapp: string
  ga_id: string
  gtm_id: string
  meta_pixel_id: string
  search_console_tag: string
}

interface Props {
  datos: Datos
}

interface Integracion {
  id: keyof Datos
  nombre: string
  descripcion: string
  placeholder: string
  icono: string
  seccion: string
  clave: string
  ayuda: string
  color: string
}

const INTEGRACIONES: Integracion[] = [
  {
    id: 'whatsapp',
    nombre: 'WhatsApp',
    descripcion: 'Botón flotante de contacto en todas las páginas del sitio.',
    placeholder: '+57 301 437 5950',
    icono: '💬',
    seccion: 'contacto',
    clave: 'whatsapp',
    ayuda: 'Incluye el código de país. Ej: +57 301 437 5950',
    color: 'border-green-200 bg-green-50',
  },
  {
    id: 'ga_id',
    nombre: 'Google Analytics 4',
    descripcion: 'Mide el tráfico, las visitas y el comportamiento de los usuarios en el sitio.',
    placeholder: 'G-XXXXXXXXXX',
    icono: '📊',
    seccion: 'integraciones',
    clave: 'ga_id',
    ayuda: 'Encuentra el ID en Google Analytics → Administrar → Flujos de datos → tu sitio web.',
    color: 'border-blue-200 bg-blue-50',
  },
  {
    id: 'gtm_id',
    nombre: 'Google Tag Manager',
    descripcion: 'Gestiona etiquetas de marketing y analítica sin tocar el código.',
    placeholder: 'GTM-XXXXXXX',
    icono: '🏷️',
    seccion: 'integraciones',
    clave: 'gtm_id',
    ayuda: 'Encuentra el ID en tagmanager.google.com → tu cuenta → tu contenedor.',
    color: 'border-indigo-200 bg-indigo-50',
  },
  {
    id: 'meta_pixel_id',
    nombre: 'Meta Pixel (Facebook/Instagram)',
    descripcion: 'Rastrea conversiones y crea audiencias para publicidad en Facebook e Instagram.',
    placeholder: '123456789012345',
    icono: '📘',
    seccion: 'integraciones',
    clave: 'meta_pixel_id',
    ayuda: 'Encuentra el ID en Meta Business Suite → Eventos → Píxeles.',
    color: 'border-indigo-200 bg-indigo-50',
  },
  {
    id: 'search_console_tag',
    nombre: 'Google Search Console',
    descripcion: 'Verifica la propiedad del sitio y monitorea el rendimiento en búsquedas de Google.',
    placeholder: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    icono: '🔍',
    seccion: 'integraciones',
    clave: 'search_console_tag',
    ayuda: 'En Search Console → Agregar propiedad → Etiqueta HTML → copia solo el contenido del atributo content="".',
    color: 'border-orange-200 bg-orange-50',
  },
]

export default function IntegracionesClient({ datos }: Props) {
  const [valores, setValores] = useState<Datos>(datos)
  const [guardando, setGuardando] = useState<keyof Datos | null>(null)
  const [msgs, setMsgs] = useState<Partial<Record<keyof Datos, string>>>({})

  async function guardar(integracion: Integracion) {
    setGuardando(integracion.id)
    setMsgs(prev => ({ ...prev, [integracion.id]: undefined }))

    const res = await fetch('/api/admin/integraciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seccion: integracion.seccion,
        clave: integracion.clave,
        valor: valores[integracion.id],
      }),
    })

    const d = await res.json()
    setMsgs(prev => ({
      ...prev,
      [integracion.id]: res.ok ? 'Guardado correctamente.' : `Error: ${d.error}`,
    }))
    setGuardando(null)
  }

  function estaConectado(id: keyof Datos) {
    return !!valores[id]?.trim()
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Integraciones</h1>
        <p className="text-sm text-gray-500">Conecta herramientas externas al sitio. Los cambios se aplican inmediatamente.</p>
      </div>

      <div className="space-y-4">
        {INTEGRACIONES.map(integracion => {
          const conectado = estaConectado(integracion.id)
          const msg = msgs[integracion.id]

          return (
            <div key={integracion.id} className="bg-white border border-gray-200">
              {/* Header */}
              <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{integracion.icono}</span>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">{integracion.nombre}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">{integracion.descripcion}</p>
                  </div>
                </div>
                <span className={`flex-shrink-0 ml-4 text-[10px] font-semibold px-2 py-1 rounded-full ${
                  conectado
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {conectado ? '● Activo' : '○ Sin configurar'}
                </span>
              </div>

              {/* Form */}
              <div className="px-6 py-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={valores[integracion.id]}
                    onChange={e => setValores(prev => ({ ...prev, [integracion.id]: e.target.value }))}
                    placeholder={integracion.placeholder}
                    className="flex-1 border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:border-gray-500"
                  />
                  <button
                    onClick={() => guardar(integracion)}
                    disabled={guardando === integracion.id}
                    className="bg-gray-900 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 hover:bg-gray-700 transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    {guardando === integracion.id ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">{integracion.ayuda}</p>
                {msg && (
                  <p className={`mt-2 text-xs px-3 py-1.5 ${msg.startsWith('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                    {msg}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Nota sobre scripts */}
      <div className="mt-6 bg-amber-50 border border-amber-200 px-5 py-4">
        <p className="text-xs text-amber-800 font-semibold mb-1">Nota sobre Google Analytics, Tag Manager y Meta Pixel</p>
        <p className="text-xs text-amber-700">
          Los scripts de seguimiento se activarán automáticamente en el sitio una vez que el desarrollador
          los conecte al layout principal. Guarda el ID aquí primero — luego se hace la activación técnica.
        </p>
      </div>
    </div>
  )
}
