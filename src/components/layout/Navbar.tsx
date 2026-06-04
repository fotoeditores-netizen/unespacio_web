import { getMenuItems } from '@/lib/menu'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
  const menuItems = await getMenuItems()
  return <NavbarClient menuItems={menuItems} />
}
