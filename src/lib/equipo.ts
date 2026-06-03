import { createClient, createServiceClient } from '@/lib/supabase/client'
import type { Miembro, CrearMiembroInput, ActualizarMiembroInput } from '@/types/equipo'

export async function getEquipo(): Promise<Miembro[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('equipo')
    .select('*')
    .order('orden', { ascending: true })
  if (error) throw new Error(error.message)
  return data as Miembro[]
}

export async function getMiembro(id: string): Promise<Miembro | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('equipo').select('*').eq('id', id).single()
  if (error) return null
  return data as Miembro
}

export async function createMiembro(input: CrearMiembroInput): Promise<Miembro> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('equipo').insert([input]).select().single()
  if (error) throw new Error(error.message)
  return data as Miembro
}

export async function updateMiembro(id: string, input: ActualizarMiembroInput): Promise<Miembro> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('equipo').update(input).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data as Miembro
}

export async function deleteMiembro(id: string): Promise<void> {
  const supabase = createServiceClient()
  const { error } = await supabase.from('equipo').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
