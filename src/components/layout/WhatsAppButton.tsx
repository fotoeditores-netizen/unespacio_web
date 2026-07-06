import { getContentBySeccion } from '@/lib/content'
import WhatsAppButtonClient from './WhatsAppButtonClient'

export default async function WhatsAppButton() {
  let numero = '573014375950'
  try {
    const contacto = await getContentBySeccion('contacto')
    if (contacto.whatsapp) {
      numero = contacto.whatsapp.replace(/\D/g, '')
    }
  } catch {
    // usa el número por defecto
  }

  return <WhatsAppButtonClient numero={numero} />
}
