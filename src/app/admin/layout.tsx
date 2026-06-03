import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Admin | UnEspacio Arquitectos',
    template: '%s | UnEspacio Admin',
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
