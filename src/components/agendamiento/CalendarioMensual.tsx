'use client'

import { useState } from 'react'

interface Props {
  fechaSeleccionada: string | null
  onSeleccionar: (fecha: string) => void
}

const DIAS_SEMANA = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']
const MESES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
]

function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function esLaborable(date: Date): boolean {
  const day = date.getDay()
  return day !== 0 && day !== 6
}

function esPasado(date: Date): boolean {
  const hoy = new Date()
  const hoyISO = toISO(hoy)
  const dateISO = toISO(date)
  return dateISO < hoyISO
}

export default function CalendarioMensual({ fechaSeleccionada, onSeleccionar }: Props) {
  const hoy = new Date()
  const [mes, setMes] = useState(hoy.getMonth())
  const [año, setAño] = useState(hoy.getFullYear())

  const primerDia = new Date(año, mes, 1)
  // Ajustar para que semana empiece en lunes (0=lunes)
  const offsetInicio = (primerDia.getDay() + 6) % 7
  const diasEnMes = new Date(año, mes + 1, 0).getDate()

  const celdas: (Date | null)[] = [
    ...Array(offsetInicio).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => new Date(año, mes, i + 1)),
  ]

  function anterior() {
    if (mes === 0) { setMes(11); setAño(y => y - 1) }
    else setMes(m => m - 1)
  }

  function siguiente() {
    if (mes === 11) { setMes(0); setAño(y => y + 1) }
    else setMes(m => m + 1)
  }

  const mesActual = hoy.getMonth()
  const añoActual = hoy.getFullYear()
  const puedeRetroceder = año > añoActual || (año === añoActual && mes > mesActual)

  return (
    <div>
      {/* Navegación mes */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={anterior}
          disabled={!puedeRetroceder}
          className="w-8 h-8 flex items-center justify-center text-dark-olive disabled:opacity-30 hover:bg-olive/10 transition-colors rounded"
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <span className="font-heading font-semibold text-sm text-dark-olive uppercase tracking-wide">
          {MESES[mes]} {año}
        </span>
        <button
          onClick={siguiente}
          className="w-8 h-8 flex items-center justify-center text-dark-olive hover:bg-olive/10 transition-colors rounded"
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>

      {/* Encabezado días */}
      <div className="grid grid-cols-7 mb-1">
        {DIAS_SEMANA.map((d) => (
          <div key={d} className="text-center text-xs font-heading font-semibold text-olive/60 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Celdas */}
      <div className="grid grid-cols-7 gap-0.5">
        {celdas.map((fecha, i) => {
          if (!fecha) return <div key={i} />

          const iso = toISO(fecha)
          const laborable = esLaborable(fecha)
          const pasado = esPasado(fecha)
          const deshabilitado = !laborable || pasado
          const seleccionado = fechaSeleccionada === iso

          return (
            <button
              key={iso}
              disabled={deshabilitado}
              onClick={() => onSeleccionar(iso)}
              className={`
                aspect-square flex items-center justify-center text-sm font-sans rounded transition-colors
                ${deshabilitado ? 'text-dark-olive/20 cursor-not-allowed' : 'cursor-pointer hover:bg-olive/20'}
                ${seleccionado ? 'bg-olive text-white font-semibold hover:bg-olive' : ''}
              `}
            >
              {fecha.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
