import { createClient, createServiceClient } from '@/lib/supabase/client'
import type { Servicio, CrearServicioInput, ActualizarServicioInput } from '@/types/servicios'

export async function getServicios(): Promise<Servicio[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicios').select('*').order('orden', { ascending: true })
  if (error) throw new Error(error.message)
  return data as Servicio[]
}

export async function getServicio(slug_anchor: string): Promise<Servicio | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicios').select('*').eq('slug_anchor', slug_anchor).single()
  if (error) return null
  return data as Servicio
}

export async function createServicio(input: CrearServicioInput): Promise<Servicio> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('servicios').insert([input]).select().single()
  if (error) throw new Error(error.message)
  return data as Servicio
}

export async function updateServicio(id: string, input: ActualizarServicioInput): Promise<Servicio> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('servicios').update(input).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data as Servicio
}

export async function deleteServicio(id: string): Promise<void> {
  const supabase = createServiceClient()
  const { error } = await supabase.from('servicios').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
