export interface SiteContent {
  id: string
  seccion: string
  clave: string
  valor: string
  updated_at: string
}

export type ContentMap = Record<string, string>

export interface HeroContent {
  titulo_linea1: string
  titulo_linea2: string
  cta1: string
  cta2: string
}

export interface StatItem {
  value: string
  unit: string
  label: string
}

export interface ContactoContent {
  email: string
  whatsapp: string
  ciudad: string
}
