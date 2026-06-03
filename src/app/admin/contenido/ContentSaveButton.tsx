'use client'

import { useFormStatus } from 'react-dom'

export default function ContentSaveButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-[#1a1a1a] text-white text-xs font-['Montserrat'] font-semibold tracking-widest uppercase rounded hover:bg-[#333] transition-colors disabled:opacity-50"
    >
      {pending ? 'Guardando…' : 'Guardar cambios'}
    </button>
  )
}
