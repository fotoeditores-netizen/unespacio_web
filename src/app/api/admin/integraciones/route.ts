import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/client'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const { seccion, clave, valor } = body

  if (!seccion || !clave) {
    return NextResponse.json({ error: 'Sección y clave requeridas' }, { status: 400 })
  }

  const service = createServiceClient()
  const { error } = await service
    .from('site_content')
    .upsert(
      { seccion, clave, valor: valor ?? '', updated_at: new Date().toISOString() },
      { onConflict: 'seccion,clave' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
