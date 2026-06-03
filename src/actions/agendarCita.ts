'use server'

import { createCita, getDisponibilidad } from '@/lib/citas'
import { enviarCorreoCitaAdmin, enviarCorreoConfirmacionCliente } from '@/actions/enviarCorreo'
import type { CrearCitaInput } from '@/types/citas'

// En producción (Vercel) el sistema de archivos no es persistente.
// Mientras se integra Supabase, mostramos un mensaje amigable al usuario.
const EN_VERCEL = process.env.VERCEL === '1'

export async function agendarCitaAction(input: CrearCitaInput): Promise<{ ok: boolean; error?: string }> {
  if (EN_VERCEL) {
    return {
      ok: false,
      error: 'El agendamiento en línea estará disponible muy pronto. Por ahora escríbenos por WhatsApp al +57 301 437 5950 o al correo Unespacioarquitectos@gmail.com.',
    }
  }

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
  if (EN_VERCEL) return []
  return getDisponibilidad(fecha)
}
