'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServicio, updateServicio, deleteServicio } from '@/lib/servicios'
import type { CrearServicioInput, ActualizarServicioInput } from '@/types/servicios'

export async function crearServicioAction(input: CrearServicioInput): Promise<{ ok: boolean; error?: string }> {
  try {
    await createServicio(input)
    revalidatePath('/admin/servicios')
    revalidatePath('/servicios')
    revalidatePath('/')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function actualizarServicioAction(id: string, input: ActualizarServicioInput): Promise<{ ok: boolean; error?: string }> {
  try {
    await updateServicio(id, input)
    revalidatePath('/admin/servicios')
    revalidatePath('/servicios')
    revalidatePath('/')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function eliminarServicioAction(id: string): Promise<void> {
  await deleteServicio(id)
  revalidatePath('/admin/servicios')
  revalidatePath('/servicios')
  revalidatePath('/')
  redirect('/admin/servicios')
}
