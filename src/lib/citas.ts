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

  // Si la fecha es hoy (en Colombia, UTC-5), excluir horas que ya pasaron
  const ahoraColombia = new Date(Date.now() - 5 * 60 * 60 * 1000)
  const hoyColombia = ahoraColombia.toISOString().split('T')[0]
  const esHoy = fecha === hoyColombia
  const horaActual = esHoy
    ? `${String(ahoraColombia.getUTCHours()).padStart(2, '0')}:00`
    : null

  return HORAS.filter((h) => {
    if (ocupadas.includes(h)) return false
    if (horaActual && h <= horaActual) return false
    return true
  })
}
