'use server'

import { revalidatePath } from 'next/cache'
import { upsertContentBatch } from '@/lib/content'

export async function guardarHero(formData: FormData) {
  const claves = ['titulo_linea1', 'titulo_linea2', 'cta1', 'cta2']
  const entries = claves.map(clave => ({
    seccion: 'hero',
    clave,
    valor: (formData.get(clave) as string) ?? '',
  }))
  await upsertContentBatch(entries)
  revalidatePath('/')
}

export async function guardarStats(formData: FormData) {
  const entries: { seccion: string; clave: string; valor: string }[] = []
  for (let i = 1; i <= 4; i++) {
    for (const campo of ['value', 'unit', 'label']) {
      const clave = `stat${i}_${campo}`
      entries.push({ seccion: 'stats', clave, valor: (formData.get(clave) as string) ?? '' })
    }
  }
  await upsertContentBatch(entries)
  revalidatePath('/')
}

export async function guardarContactoContent(formData: FormData) {
  const claves = ['email', 'whatsapp', 'ciudad']
  const entries = claves.map(clave => ({
    seccion: 'contacto',
    clave,
    valor: (formData.get(clave) as string) ?? '',
  }))
  await upsertContentBatch(entries)
  revalidatePath('/contacto')
}
