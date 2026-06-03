import { createClient } from '@/lib/supabase/client'
import { createServiceClient } from '@/lib/supabase/client'
import type { SiteContent, ContentMap } from '@/types/content'

export async function getContentBySeccion(seccion: string): Promise<ContentMap> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('site_content')
    .select('clave, valor')
    .eq('seccion', seccion)

  if (error) throw new Error(error.message)
  return Object.fromEntries((data ?? []).map((r: { clave: string; valor: string }) => [r.clave, r.valor]))
}

export async function getAllContent(): Promise<SiteContent[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .order('seccion')
    .order('clave')

  if (error) throw new Error(error.message)
  return data as SiteContent[]
}

export async function upsertContent(seccion: string, clave: string, valor: string): Promise<void> {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('site_content')
    .upsert({ seccion, clave, valor, updated_at: new Date().toISOString() }, { onConflict: 'seccion,clave' })

  if (error) throw new Error(error.message)
}

export async function upsertContentBatch(entries: { seccion: string; clave: string; valor: string }[]): Promise<void> {
  const supabase = createServiceClient()
  const rows = entries.map(e => ({ ...e, updated_at: new Date().toISOString() }))
  const { error } = await supabase
    .from('site_content')
    .upsert(rows, { onConflict: 'seccion,clave' })

  if (error) throw new Error(error.message)
}
