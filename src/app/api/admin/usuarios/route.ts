import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/client'

async function verificarSuperadmin() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const service = createServiceClient()
  const { data } = await service.from('user_roles').select('role').eq('user_id', user.id).single()
  if (data?.role !== 'superadmin') return null
  return user
}

// GET — listar todos los usuarios con su rol
export async function GET() {
  const admin = await verificarSuperadmin()
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const service = createServiceClient()
  const { data: roles } = await service.from('user_roles').select('user_id, role, created_at')

  // Obtener emails desde auth.users via admin API
  const { data: { users }, error } = await service.auth.admin.listUsers()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const rolesMap = Object.fromEntries((roles ?? []).map(r => [r.user_id, r]))

  const resultado = users.map(u => ({
    id: u.id,
    email: u.email,
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at,
    role: rolesMap[u.id]?.role ?? 'sin rol',
    role_assigned_at: rolesMap[u.id]?.created_at ?? null,
    invited: !u.last_sign_in_at,
  }))

  return NextResponse.json({ users: resultado })
}

// POST — invitar usuario o actualizar rol
export async function POST(req: NextRequest) {
  const admin = await verificarSuperadmin()
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const { accion, email, role, user_id } = body
  const service = createServiceClient()

  if (accion === 'crear') {
    const { password, nombre } = body
    if (!email || !role || !password) return NextResponse.json({ error: 'Email, contraseña y rol requeridos' }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 })

    const { data, error } = await service.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nombre: nombre ?? '' },
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    await service.from('user_roles').upsert({ user_id: data.user.id, role }, { onConflict: 'user_id' })
    return NextResponse.json({ ok: true })
  }

  if (accion === 'invitar') {
    if (!email || !role) return NextResponse.json({ error: 'Email y rol requeridos' }, { status: 400 })

    const { data, error } = await service.auth.admin.inviteUserByEmail(email)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    await service.from('user_roles').upsert({
      user_id: data.user.id,
      role,
    }, { onConflict: 'user_id' })

    return NextResponse.json({ ok: true })
  }

  if (accion === 'cambiar_rol') {
    if (!user_id || !role) return NextResponse.json({ error: 'user_id y rol requeridos' }, { status: 400 })

    await service.from('user_roles').upsert({ user_id, role }, { onConflict: 'user_id' })
    return NextResponse.json({ ok: true })
  }

  if (accion === 'eliminar') {
    if (!user_id) return NextResponse.json({ error: 'user_id requerido' }, { status: 400 })

    // No permitir que el superadmin se elimine a sí mismo
    if (user_id === admin.id) return NextResponse.json({ error: 'No puedes eliminarte a ti mismo' }, { status: 400 })

    await service.auth.admin.deleteUser(user_id)
    await service.from('user_roles').delete().eq('user_id', user_id)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Acción no válida' }, { status: 400 })
}
