'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createProyecto, updateProyecto, deleteProyecto } from '@/lib/proyectos'
import type { CrearProyectoInput, ActualizarProyectoInput } from '@/types/proyectos'

export async function crearProyectoAction(input: CrearProyectoInput): Promise<{ ok: boolean; error?: string }> {
  try {
    await createProyecto(input)
    revalidatePath('/admin/proyectos')
    revalidatePath('/portafolio')
    revalidatePath('/')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function actualizarProyectoAction(id: string, input: ActualizarProyectoInput): Promise<{ ok: boolean; error?: string }> {
  try {
    await updateProyecto(id, input)
    revalidatePath('/admin/proyectos')
    revalidatePath('/portafolio')
    revalidatePath('/')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function eliminarProyectoAction(id: string): Promise<void> {
  await deleteProyecto(id)
  revalidatePath('/admin/proyectos')
  revalidatePath('/portafolio')
  revalidatePath('/')
  redirect('/admin/proyectos')
}
