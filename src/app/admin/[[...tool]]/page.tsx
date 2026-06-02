'use client'

/**
 * Panel de administración de UnEspacio Arquitectos
 * Accesible en /admin — solo para uso interno del estudio
 *
 * Instrucciones:
 * 1. Inicia sesión con tu cuenta de Sanity
 * 2. Crea/edita proyectos desde "Proyectos del Portafolio"
 * 3. Sube fotos directamente — se optimizan automáticamente
 * 4. Los cambios se ven en el sitio en menos de 60 segundos
 */

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
