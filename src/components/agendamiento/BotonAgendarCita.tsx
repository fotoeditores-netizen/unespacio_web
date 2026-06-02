'use client'

import { useState } from 'react'
import PopupAgendamiento from './PopupAgendamiento'

interface Props {
  label?: string
  className?: string
}

export default function BotonAgendarCita({ label = 'Agendar cita', className }: Props) {
  const [abierto, setAbierto] = useState(false)

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        className={className ?? 'btn-primary'}
      >
        {label}
      </button>

      {abierto && <PopupAgendamiento onCerrar={() => setAbierto(false)} />}
    </>
  )
}
