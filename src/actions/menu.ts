'use server'

import { revalidatePath } from 'next/cache'
import { createMenuItem, updateMenuItem, deleteMenuItem } from '@/lib/menu'
import type { MenuItem } from '@/types/menu'

export async function crearMenuItemAction(
  input: Omit<MenuItem, 'id' | 'created_at'>
): Promise<{ ok: boolean; error?: string }> {
  try {
    await createMenuItem(input)
    revalidatePath('/', 'layout')
    revalidatePath('/admin/menu')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function actualizarMenuItemAction(
  id: string,
  input: Partial<Omit<MenuItem, 'id' | 'created_at'>>
): Promise<{ ok: boolean; error?: string }> {
  try {
    await updateMenuItem(id, input)
    revalidatePath('/', 'layout')
    revalidatePath('/admin/menu')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function eliminarMenuItemAction(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    await deleteMenuItem(id)
    revalidatePath('/', 'layout')
    revalidatePath('/admin/menu')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}
