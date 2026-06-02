import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const adminUser = process.env.ADMIN_USER ?? 'admin'
  const adminPass = process.env.ADMIN_PASS ?? 'unespacio2024'

  const auth = request.headers.get('authorization')
  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
      const [user, pass] = decoded.split(':')
      if (user === adminUser && pass === adminPass) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Acceso restringido', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="UnEspacio Admin"',
    },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}
