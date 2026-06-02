'use server'

import { updateEstadoCita } from '@/lib/citas'
import { enviarCorreoCambioEstado } from '@/actions/enviarCorreo'
import type { EstadoCita } from '@/types/citas'

export async function cambiarEstadoCitaAction(
  id: string,
  estado: EstadoCita
): Promise<{ ok: boolean; error?: string }> {
  try {
    const cita = await updateEstadoCita(id, estado)
    if (estado === 'confirmada' || estado === 'cancelada') {
      await enviarCorreoCambioEstado(cita).catch(() => {})
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}
