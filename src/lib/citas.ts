import { createClient } from '@/lib/supabase/client'
import type { Cita, CrearCitaInput, EstadoCita } from '@/types/citas'

const HORAS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']

export async function getCitas(): Promise<Cita[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('citas')
    .select('*')
    .order('fecha', { ascending: true })
    .order('hora', { ascending: true })

  if (error) throw new Error(error.message)
  return data as Cita[]
}

export async function createCita(input: CrearCitaInput): Promise<Cita> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('citas')
    .insert([{ ...input, estado: 'pendiente' }])
    .select()
    .single()

  if (error) {
    // El constraint unique (fecha, hora) devuelve código 23505
    if (error.code === '23505') {
      throw new Error('Ya existe una cita agendada en esa fecha y hora.')
    }
    throw new Error(error.message)
  }
  return data as Cita
}

export async function updateEstadoCita(id: string, estado: EstadoCita): Promise<Cita> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('citas')
    .update({ estado })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Cita
}

export async function getDisponibilidad(fecha: string): Promise<string[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('citas')
    .select('hora')
    .eq('fecha', fecha)
    .neq('estado', 'cancelada')

  if (error) throw new Error(error.message)
  const ocupadas = (data ?? []).map((r: { hora: string }) => r.hora)
  return HORAS.filter((h) => !ocupadas.includes(h))
}
