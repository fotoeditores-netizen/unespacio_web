'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createMiembro, updateMiembro, deleteMiembro } from '@/lib/equipo'
import type { CrearMiembroInput, ActualizarMiembroInput } from '@/types/equipo'

export async function crearMiembroAction(input: CrearMiembroInput): Promise<{ ok: boolean; error?: string }> {
  try {
    await createMiembro(input)
    revalidatePath('/admin/equipo')
    revalidatePath('/estudio')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function actualizarMiembroAction(id: string, input: ActualizarMiembroInput): Promise<{ ok: boolean; error?: string }> {
  try {
    await updateMiembro(id, input)
    revalidatePath('/admin/equipo')
    revalidatePath('/estudio')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function eliminarMiembroAction(id: string): Promise<void> {
  await deleteMiembro(id)
  revalidatePath('/admin/equipo')
  revalidatePath('/estudio')
  redirect('/admin/equipo')
}
