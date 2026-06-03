import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/client'

const BUCKET = 'unespacio-media'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string | null) ?? 'general'

  if (!file) {
    return NextResponse.json({ error: 'Campo "file" requerido.' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const supabase = createServiceClient()

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)

  return NextResponse.json({ url: data.publicUrl })
}
