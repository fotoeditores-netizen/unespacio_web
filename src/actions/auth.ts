'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export async function cerrarSesion() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
