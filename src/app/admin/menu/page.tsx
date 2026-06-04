import { getAllMenuItems } from '@/lib/menu'
import MenuEditor from './MenuEditor'

export const dynamic = 'force-dynamic'

export default async function MenuPage() {
  const items = await getAllMenuItems()
  return <MenuEditor items={items} />
}
