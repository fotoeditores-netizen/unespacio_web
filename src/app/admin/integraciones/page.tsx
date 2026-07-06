import { getContentBySeccion } from '@/lib/content'
import IntegracionesClient from './IntegracionesClient'

export default async function IntegracionesPage() {
  let contacto: Record<string, string> = {}
  let integraciones: Record<string, string> = {}

  try {
    contacto = await getContentBySeccion('contacto')
    integraciones = await getContentBySeccion('integraciones')
  } catch {
    // usa valores vacíos
  }

  const datos = {
    whatsapp: contacto.whatsapp ?? '',
    ga_id: integraciones.ga_id ?? '',
    gtm_id: integraciones.gtm_id ?? '',
    meta_pixel_id: integraciones.meta_pixel_id ?? '',
    search_console_tag: integraciones.search_console_tag ?? '',
  }

  return <IntegracionesClient datos={datos} />
}
