import { createClient, createServiceClient } from '@/lib/supabase/client'
import type { Proyecto, CrearProyectoInput, ActualizarProyectoInput, Tipologia } from '@/types/proyectos'

interface FiltrosProyectos {
  tipologia?: Tipologia
  soloDestacados?: boolean
}

export async function getProyectos(filtros?: FiltrosProyectos): Promise<Proyecto[]> {
  const supabase = createServiceClient()
  let query = supabase
    .from('proyectos')
    .select('*')
    .order('orden', { ascending: true })
    .order('created_at', { ascending: false })

  if (filtros?.tipologia) query = query.eq('tipologia', filtros.tipologia)
  if (filtros?.soloDestacados) query = query.eq('destacado', true)

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data as Proyecto[]
}

export async function getProyecto(slug: string): Promise<Proyecto | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as Proyecto
}

export async function createProyecto(input: CrearProyectoInput): Promise<Proyecto> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('proyectos')
    .insert([input])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Proyecto
}

export async function updateProyecto(id: string, input: ActualizarProyectoInput): Promise<Proyecto> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('proyectos')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Proyecto
}

export async function deleteProyecto(id: string): Promise<void> {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('proyectos')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}
