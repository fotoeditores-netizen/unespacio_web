import type { Metadata } from 'next'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: {
    default: 'Admin | UnEspacio Arquitectos',
    template: '%s | UnEspacio Admin',
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-56 min-h-screen">
        {children}
      </div>
    </div>
  )
}
