'use client'

import { useState, useEffect, useTransition } from 'react'
import CalendarioMensual from './CalendarioMensual'
import SelectorHora from './SelectorHora'
import { agendarCitaAction, obtenerDisponibilidadAction } from '@/actions/agendarCita'
import type { TipoConsulta } from '@/types/citas'

interface Props {
  onCerrar: () => void
}

const TIPOS_CONSULTA: TipoConsulta[] = ['Diseño interior', 'Remodelación', 'Consulta inicial', 'Otro']

const PASOS = ['Fecha y hora', 'Tus datos', 'Confirmado']

function formatearFechaVisible(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function PopupAgendamiento({ onCerrar }: Props) {
  const [paso, setPaso] = useState(0)
  const [fecha, setFecha] = useState<string | null>(null)
  const [hora, setHora] = useState<string | null>(null)
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([])
  const [cargandoHoras, setCargandoHoras] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tipo_consulta: 'Consulta inicial' as TipoConsulta,
    mensaje: '',
  })

  useEffect(() => {
    if (!fecha) return
    setCargandoHoras(true)
    setHora(null)
    obtenerDisponibilidadAction(fecha).then((horas) => {
      setHorasDisponibles(horas)
      setCargandoHoras(false)
    })
  }, [fecha])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSiguiente() {
    if (!fecha || !hora) return
    setPaso(1)
    setError(null)
  }

  function handleConfirmar() {
    if (!fecha || !hora) return
    setError(null)
    startTransition(async () => {
      const result = await agendarCitaAction({ ...form, fecha, hora })
      if (result.ok) {
        setPaso(2)
      } else {
        setError(result.error ?? 'Error al agendar la cita.')
      }
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-olive/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onCerrar() }}
    >
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-olive/15 sticky top-0 bg-white z-10">
          <div>
            <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive">
              Agendar cita
            </p>
            <p className="font-heading font-bold text-lg text-dark-olive leading-tight">
              {PASOS[paso]}
            </p>
          </div>
          <button onClick={onCerrar} className="text-dark-olive/40 hover:text-dark-olive transition-colors text-2xl leading-none" aria-label="Cerrar">
            ×
          </button>
        </div>

        {/* Indicador de pasos */}
        {paso < 2 && (
          <div className="flex gap-1 px-6 pt-4">
            {[0, 1].map((i) => (
              <div key={i} className={`h-0.5 flex-1 transition-colors ${i <= paso ? 'bg-olive' : 'bg-olive/20'}`} />
            ))}
          </div>
        )}

        <div className="px-6 py-6 flex-1">
          {/* PASO 0: Calendario + hora */}
          {paso === 0 && (
            <div className="space-y-6">
              <CalendarioMensual fechaSeleccionada={fecha} onSeleccionar={setFecha} />

              {fecha && (
                <div>
                  <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive mb-3">
                    Horarios disponibles
                  </p>
                  <SelectorHora
                    horasDisponibles={horasDisponibles}
                    horaSeleccionada={hora}
                    onSeleccionar={setHora}
                    cargando={cargandoHoras}
                  />
                </div>
              )}

              <button
                onClick={handleSiguiente}
                disabled={!fecha || !hora}
                className="w-full bg-dark-olive text-white font-heading font-semibold text-xs tracking-widest uppercase py-3.5 disabled:opacity-40 hover:bg-olive transition-colors"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* PASO 1: Formulario */}
          {paso === 1 && (
            <div className="space-y-4">
              {/* Resumen fecha/hora */}
              <div className="bg-cream px-4 py-3 mb-2">
                <p className="font-sans text-xs text-olive/70">Cita seleccionada</p>
                <p className="font-heading font-semibold text-sm text-dark-olive mt-0.5">
                  {fecha && formatearFechaVisible(fecha)} · {hora}
                </p>
              </div>

              <div>
                <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1.5">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full border border-olive/30 px-3 py-2.5 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white"
                  placeholder="Laura García"
                />
              </div>

              <div>
                <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1.5">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="correo"
                  required
                  value={form.correo}
                  onChange={handleChange}
                  className="w-full border border-olive/30 px-3 py-2.5 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white"
                  placeholder="laura@ejemplo.com"
                />
              </div>

              <div>
                <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1.5">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  required
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full border border-olive/30 px-3 py-2.5 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white"
                  placeholder="+57 300 000 0000"
                />
              </div>

              <div>
                <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1.5">
                  Tipo de consulta *
                </label>
                <select
                  name="tipo_consulta"
                  value={form.tipo_consulta}
                  onChange={handleChange}
                  className="w-full border border-olive/30 px-3 py-2.5 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white"
                >
                  {TIPOS_CONSULTA.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1.5">
                  Mensaje (opcional)
                </label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-olive/30 px-3 py-2.5 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white resize-none"
                  placeholder="Cuéntanos brevemente sobre tu proyecto..."
                />
              </div>

              {error && (
                <p className="text-red-600 text-xs font-sans bg-red-50 px-3 py-2">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setPaso(0)}
                  className="flex-1 border border-olive/30 text-dark-olive font-heading font-semibold text-xs tracking-widest uppercase py-3.5 hover:bg-cream transition-colors"
                >
                  ← Volver
                </button>
                <button
                  onClick={handleConfirmar}
                  disabled={isPending || !form.nombre || !form.correo || !form.telefono}
                  className="flex-1 bg-dark-olive text-white font-heading font-semibold text-xs tracking-widest uppercase py-3.5 disabled:opacity-40 hover:bg-olive transition-colors"
                >
                  {isPending ? 'Agendando...' : 'Confirmar cita'}
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: Confirmación */}
          {paso === 2 && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-olive/15 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-dark-olive">¡Cita agendada!</h3>
              <p className="font-sans text-sm text-olive leading-relaxed">
                Hemos enviado una confirmación a <strong>{form.correo}</strong>.<br />
                Te contactaremos pronto para confirmar los detalles.
              </p>
              <div className="bg-cream px-4 py-3 text-left mt-4">
                <p className="font-sans text-xs text-olive/70">Tu cita</p>
                <p className="font-heading font-semibold text-sm text-dark-olive mt-0.5">
                  {fecha && formatearFechaVisible(fecha)} · {hora}
                </p>
                <p className="font-sans text-xs text-olive mt-1">{form.tipo_consulta}</p>
              </div>
              <button
                onClick={onCerrar}
                className="w-full bg-dark-olive text-white font-heading font-semibold text-xs tracking-widest uppercase py-3.5 hover:bg-olive transition-colors mt-4"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
