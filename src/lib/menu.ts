import { createClient, createServiceClient } from '@/lib/supabase/client'
import type { MenuItem, MenuItemConHijos } from '@/types/menu'

export async function getMenuItems(): Promise<MenuItemConHijos[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })

    if (error || !data) return FALLBACK_MENU

    const items = data as MenuItem[]
    const raiz = items.filter(i => i.parent_id === null)
    return raiz.map(item => ({
      ...item,
      hijos: items.filter(i => i.parent_id === item.id).sort((a, b) => a.orden - b.orden),
    }))
  } catch {
    return FALLBACK_MENU
  }
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('orden', { ascending: true })
  if (error) throw new Error(error.message)
  return data as MenuItem[]
}

export async function createMenuItem(input: Omit<MenuItem, 'id' | 'created_at'>): Promise<MenuItem> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('menu_items')
    .insert([input])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as MenuItem
}

export async function updateMenuItem(id: string, input: Partial<Omit<MenuItem, 'id' | 'created_at'>>): Promise<MenuItem> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('menu_items')
    .update(input)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as MenuItem
}

export async function deleteMenuItem(id: string): Promise<void> {
  const supabase = createServiceClient()
  const { error } = await supabase.from('menu_items').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

const FALLBACK_MENU: MenuItemConHijos[] = [
  { id: '1', label: 'Inicio',     url: '/',           parent_id: null, orden: 0, activo: true, created_at: '', hijos: [] },
  { id: '2', label: 'Estudio',    url: '/estudio',    parent_id: null, orden: 1, activo: true, created_at: '', hijos: [] },
  { id: '3', label: 'Portafolio', url: '/portafolio', parent_id: null, orden: 2, activo: true, created_at: '', hijos: [] },
  { id: '4', label: 'Servicios',  url: '/servicios',  parent_id: null, orden: 3, activo: true, created_at: '', hijos: [] },
]
