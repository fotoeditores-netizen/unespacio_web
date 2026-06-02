/**
 * Capa de servicio para citas.
 *
 * REEMPLAZAR SUPABASE: Cada función marcada con "→ Supabase" debe
 * reemplazarse por la llamada equivalente al cliente de Supabase.
 * La firma de cada función NO cambia — solo cambia la implementación interna.
 *
 * Ejemplo de reemplazo para getCitas():
 *   const { data, error } = await supabase.from('citas').select('*')
 */

import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import type { Cita, CrearCitaInput, EstadoCita } from '@/types/citas'

const DATA_PATH = path.join(process.cwd(), 'data', 'citas.json')

function leerCitas(): Cita[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8')
    return JSON.parse(raw) as Cita[]
  } catch {
    return []
  }
}

function escribirCitas(citas: Cita[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(citas, null, 2), 'utf-8')
}

// → Supabase: supabase.from('citas').select('*').order('fecha', { ascending: true })
export async function getCitas(): Promise<Cita[]> {
  return leerCitas().sort((a, b) => {
    const da = new Date(`${a.fecha}T${a.hora}`)
    const db = new Date(`${b.fecha}T${b.hora}`)
    return da.getTime() - db.getTime()
  })
}

// → Supabase: supabase.from('citas').insert([nuevaCita]).select().single()
export async function createCita(input: CrearCitaInput): Promise<Cita> {
  const citas = leerCitas()

  const conflicto = citas.find(
    (c) => c.fecha === input.fecha && c.hora === input.hora && c.estado !== 'cancelada'
  )
  if (conflicto) {
    throw new Error('Ya existe una cita agendada en esa fecha y hora.')
  }

  const nueva: Cita = {
    ...input,
    id: uuidv4(),
    estado: 'pendiente',
    created_at: new Date().toISOString(),
  }

  escribirCitas([...citas, nueva])
  return nueva
}

// → Supabase: supabase.from('citas').update({ estado }).eq('id', id).select().single()
export async function updateEstadoCita(id: string, estado: EstadoCita): Promise<Cita> {
  const citas = leerCitas()
  const index = citas.findIndex((c) => c.id === id)
  if (index === -1) throw new Error('Cita no encontrada.')

  citas[index] = { ...citas[index], estado }
  escribirCitas(citas)
  return citas[index]
}

// → Supabase: supabase.from('citas').select('fecha,hora').eq('fecha', fecha).neq('estado','cancelada')
export async function getDisponibilidad(fecha: string): Promise<string[]> {
  const HORAS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
  const citas = leerCitas()
  const ocupadas = citas
    .filter((c) => c.fecha === fecha && c.estado !== 'cancelada')
    .map((c) => c.hora)
  return HORAS.filter((h) => !ocupadas.includes(h))
}
