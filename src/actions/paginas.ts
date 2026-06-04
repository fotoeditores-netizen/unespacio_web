'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createPagina, updatePagina, deletePagina, upsertBloques } from '@/lib/paginas'
import type { CrearPaginaInput, TipoBloque, BloqueContenido } from '@/types/paginas'

export async function crearPaginaAction(input: CrearPaginaInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const pagina = await createPagina(input)
    revalidatePath('/admin/paginas')
    return { ok: true, id: pagina.id }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function actualizarPaginaAction(
  id: string,
  titulo: string,
  slug: string,
  estado: 'borrador' | 'publicada',
  bloques: { tipo: TipoBloque; orden: number; contenido: BloqueContenido }[]
): Promise<{ ok: boolean; error?: string }> {
  try {
    await updatePagina(id, { titulo, slug, estado })
    await upsertBloques(id, bloques)
    revalidatePath('/admin/paginas')
    revalidatePath(`/p/${slug}`)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error inesperado.' }
  }
}

export async function eliminarPaginaAction(id: string): Promise<void> {
  await deletePagina(id)
  revalidatePath('/admin/paginas')
  redirect('/admin/paginas')
}
