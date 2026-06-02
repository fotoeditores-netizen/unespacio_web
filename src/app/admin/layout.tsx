/**
 * Layout del panel de administración.
 * No hereda Navbar ni Footer del sitio público — es una interfaz limpia para el equipo.
 */
export const metadata = {
  title: 'Panel Admin — UnEspacio Arquitectos',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
