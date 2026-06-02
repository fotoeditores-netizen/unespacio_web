'use client'

interface Props {
  horasDisponibles: string[]
  horaSeleccionada: string | null
  onSeleccionar: (hora: string) => void
  cargando: boolean
}

export default function SelectorHora({ horasDisponibles, horaSeleccionada, onSeleccionar, cargando }: Props) {
  const TODAS_LAS_HORAS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']

  if (cargando) {
    return (
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {TODAS_LAS_HORAS.map((h) => (
          <div key={h} className="h-9 bg-olive/10 animate-pulse rounded" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
      {TODAS_LAS_HORAS.map((hora) => {
        const disponible = horasDisponibles.includes(hora)
        const seleccionada = horaSeleccionada === hora
        return (
          <button
            key={hora}
            disabled={!disponible}
            onClick={() => onSeleccionar(hora)}
            className={`
              h-9 text-xs font-heading font-semibold rounded transition-colors
              ${!disponible ? 'bg-dark-olive/5 text-dark-olive/25 cursor-not-allowed line-through' : 'hover:bg-olive/20 cursor-pointer'}
              ${seleccionada ? 'bg-olive text-white hover:bg-olive' : disponible ? 'bg-cream border border-olive/30 text-dark-olive' : ''}
            `}
          >
            {hora}
          </button>
        )
      })}
    </div>
  )
}
