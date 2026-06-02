'use server'

import { createCita, getDisponibilidad } from '@/lib/citas'
import { enviarCorreoCitaAdmin, enviarCorreoConfirmacionCliente } from '@/actions/enviarCorreo'
import type { CrearCitaInput } from '@/types/citas'

export async function agendarCitaAction(input: CrearCitaInput): Promise<{ ok: boolean; error?: string }> {
  try {
    const disponibles = await getDisponibilidad(input.fecha)
    if (!disponibles.includes(input.hora)) {
      return { ok: false, error: 'Ese horario ya no está disponible. Por favor elige otro.' }
    }

    const cita = await createCita(input)

    await Promise.allSettled([
      enviarCorreoCitaAdmin(cita),
      enviarCorreoConfirmacionCliente(cita),
    ])

    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error inesperado. Intenta de nuevo.'
    return { ok: false, error: msg }
  }
}

export async function obtenerDisponibilidadAction(fecha: string): Promise<string[]> {
  return getDisponibilidad(fecha)
}
