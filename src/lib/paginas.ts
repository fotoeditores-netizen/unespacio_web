import { createClient, createServiceClient } from '@/lib/supabase/client'
import type { Pagina, Bloque, PaginaConBloques, CrearPaginaInput, ActualizarPaginaInput, TipoBloque, BloqueContenido } from '@/types/paginas'

export async function getPaginas(): Promise<Pagina[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('paginas')
    .select('*')
    .order('orden', { ascending: true })
  if (error) throw new Error(error.message)
  return data as Pagina[]
}

export async function getPaginaConBloques(slug: string): Promise<PaginaConBloques | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('paginas')
    .select('*, bloques(*)')
    .eq('slug', slug)
    .single()
  if (error) return null
  const pagina = data as PaginaConBloques
  pagina.bloques = (pagina.bloques ?? []).sort((a: Bloque, b: Bloque) => a.orden - b.orden)
  return pagina
}

export async function getPaginaById(id: string): Promise<PaginaConBloques | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('paginas')
    .select('*, bloques(*)')
    .eq('id', id)
    .single()
  if (error) return null
  const pagina = data as PaginaConBloques
  pagina.bloques = (pagina.bloques ?? []).sort((a: Bloque, b: Bloque) => a.orden - b.orden)
  return pagina
}

export async function createPagina(input: CrearPaginaInput): Promise<Pagina> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('paginas')
    .insert([{ ...input, updated_at: new Date().toISOString() }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Pagina
}

export async function updatePagina(id: string, input: ActualizarPaginaInput): Promise<Pagina> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('paginas')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Pagina
}

export async function deletePagina(id: string): Promise<void> {
  const supabase = createServiceClient()
  const { error } = await supabase.from('paginas').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function upsertBloques(paginaId: string, bloques: { id?: string; tipo: TipoBloque; orden: number; contenido: BloqueContenido }[]): Promise<void> {
  const supabase = createServiceClient()
  // Elimina los bloques actuales y reinserta para mantener orden limpio
  const { error: delError } = await supabase.from('bloques').delete().eq('pagina_id', paginaId)
  if (delError) throw new Error(delError.message)

  if (bloques.length === 0) return

  const rows = bloques.map((b, i) => ({
    pagina_id: paginaId,
    tipo: b.tipo,
    orden: i,
    contenido: b.contenido,
  }))

  const { error } = await supabase.from('bloques').insert(rows)
  if (error) throw new Error(error.message)
}
