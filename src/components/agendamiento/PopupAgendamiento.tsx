'use client'

import { useState, useEffect, useTransition, useCallback } from 'react'
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
  const [confirmandoCierre, setConfirmandoCierre] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tipo_consulta: 'Consulta inicial' as TipoConsulta,
    mensaje: '',
  })

  const hayDatos = fecha !== null || form.nombre !== '' || form.correo !== ''

  const intentarCerrar = useCallback(() => {
    if (paso === 2) { onCerrar(); return }
    if (hayDatos) { setConfirmandoCierre(true); return }
    onCerrar()
  }, [paso, hayDatos, onCerrar])

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-olive/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-olive/15">
          <div>
            <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive">
              Agendar cita
            </p>
            <p className="font-heading font-bold text-lg text-dark-olive leading-tight">
              {PASOS[paso]}
            </p>
          </div>
          <button onClick={intentarCerrar} className="text-dark-olive/40 hover:text-dark-olive transition-colors text-2xl leading-none" aria-label="Cerrar">
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

        <div className="px-6 py-5 flex-1">
          {/* PASO 0: Calendario + hora en dos columnas */}
          {paso === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Columna izquierda: calendario */}
              <div>
                <CalendarioMensual fechaSeleccionada={fecha} onSeleccionar={setFecha} />
              </div>

              {/* Columna derecha: horarios + botón */}
              <div className="flex flex-col justify-between gap-4">
                <div>
                  <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive mb-3">
                    {fecha ? 'Horarios disponibles' : 'Selecciona una fecha'}
                  </p>
                  {fecha ? (
                    <SelectorHora
                      horasDisponibles={horasDisponibles}
                      horaSeleccionada={hora}
                      onSeleccionar={setHora}
                      cargando={cargandoHoras}
                    />
                  ) : (
                    <p className="font-sans text-xs text-olive/50">
                      Elige un día del calendario para ver los horarios disponibles.
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSiguiente}
                  disabled={!fecha || !hora}
                  className="w-full bg-dark-olive text-white font-heading font-semibold text-xs tracking-widest uppercase py-3.5 disabled:opacity-40 hover:bg-olive transition-colors"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* PASO 1: Formulario compacto en 2 columnas */}
          {paso === 1 && (
            <div className="space-y-3">
              {/* Resumen fecha/hora */}
              <div className="bg-cream px-4 py-2.5 mb-1">
                <p className="font-sans text-xs text-olive/70">Cita seleccionada</p>
                <p className="font-heading font-semibold text-sm text-dark-olive mt-0.5">
                  {fecha && formatearFechaVisible(fecha)} · {hora}
                </p>
              </div>

              {/* Nombre + Teléfono */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full border border-olive/30 px-3 py-2 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white"
                    placeholder="Laura García"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full border border-olive/30 px-3 py-2 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white"
                    placeholder="+57 300 000 0000"
                  />
                </div>
              </div>

              {/* Correo + Tipo */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1">
                    Correo *
                  </label>
                  <input
                    type="email"
                    name="correo"
                    required
                    value={form.correo}
                    onChange={handleChange}
                    className="w-full border border-olive/30 px-3 py-2 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white"
                    placeholder="laura@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1">
                    Tipo de consulta *
                  </label>
                  <select
                    name="tipo_consulta"
                    value={form.tipo_consulta}
                    onChange={handleChange}
                    className="w-full border border-olive/30 px-3 py-2 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white"
                  >
                    {TIPOS_CONSULTA.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block font-heading font-semibold text-xs tracking-wide text-dark-olive/70 mb-1">
                  Mensaje (opcional)
                </label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-olive/30 px-3 py-2 text-sm font-sans text-dark-olive focus:outline-none focus:border-olive bg-white resize-none"
                  placeholder="Cuéntanos brevemente sobre tu proyecto..."
                />
              </div>

              {error && (
                <p className="text-red-600 text-xs font-sans bg-red-50 px-3 py-2">{error}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setPaso(0)}
                  className="flex-1 border border-olive/30 text-dark-olive font-heading font-semibold text-xs tracking-widest uppercase py-3 hover:bg-cream transition-colors"
                >
                  ← Volver
                </button>
                <button
                  onClick={handleConfirmar}
                  disabled={isPending || !form.nombre || !form.correo || !form.telefono}
                  className="flex-1 bg-dark-olive text-white font-heading font-semibold text-xs tracking-widest uppercase py-3 disabled:opacity-40 hover:bg-olive transition-colors"
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

      {/* Modal confirmación de cierre */}
      {confirmandoCierre && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-dark-olive/40">
          <div className="bg-white p-6 max-w-sm w-full shadow-xl">
            <p className="font-heading font-bold text-dark-olive text-base mb-2">¿Salir del formulario?</p>
            <p className="font-sans text-sm text-olive mb-6">Perderás los datos ingresados si cierras ahora.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmandoCierre(false)}
                className="flex-1 border border-olive/30 text-dark-olive font-heading font-semibold text-xs tracking-widest uppercase py-3 hover:bg-cream transition-colors"
              >
                Continuar
              </button>
              <button
                onClick={onCerrar}
                className="flex-1 bg-dark-olive text-white font-heading font-semibold text-xs tracking-widest uppercase py-3 hover:bg-olive transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
