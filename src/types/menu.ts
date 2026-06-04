export interface MenuItem {
  id: string
  label: string
  url: string
  parent_id: string | null
  orden: number
  activo: boolean
  created_at: string
}

export interface MenuItemConHijos extends MenuItem {
  hijos: MenuItem[]
}
