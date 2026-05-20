'use server'

export type ContactFormState = {
  success: boolean
  message: string
  errors?: Record<string, string>
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const projectType = formData.get('projectType') as string
  const message = formData.get('message') as string

  // Validations
  const errors: Record<string, string> = {}

  if (!name || name.trim().length < 2) {
    errors.name = 'Por favor ingresa tu nombre completo.'
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Por favor ingresa un correo electrónico válido.'
  }
  if (!projectType) {
    errors.projectType = 'Por favor selecciona el tipo de proyecto.'
  }
  if (!message || message.trim().length < 20) {
    errors.message = 'Por favor describe tu proyecto (mínimo 20 caracteres).'
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Por favor corrige los errores del formulario.',
      errors,
    }
  }

  // ── Integración con Resend ──────────────────────────────────────
  // Para activar el envío real, instala Resend:
  //   npm install resend
  // Y descomenta el siguiente bloque reemplazando YOUR_RESEND_API_KEY
  // y el correo de destino:
  //
  // import { Resend } from 'resend'
  // const resend = new Resend(process.env.RESEND_API_KEY)
  //
  // try {
  //   await resend.emails.send({
  //     from: 'web@unespacio.com',
  //     to: 'contacto@unespacio.com',
  //     subject: `Nuevo contacto: ${projectType} — ${name}`,
  //     html: `
  //       <h2>Nuevo mensaje desde el sitio web</h2>
  //       <p><strong>Nombre:</strong> ${name}</p>
  //       <p><strong>Email:</strong> ${email}</p>
  //       <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
  //       <p><strong>Tipo de proyecto:</strong> ${projectType}</p>
  //       <p><strong>Mensaje:</strong><br>${message}</p>
  //     `,
  //   })
  // } catch (error) {
  //   return { success: false, message: 'Error al enviar el mensaje. Inténtalo de nuevo.' }
  // }
  // ────────────────────────────────────────────────────────────────

  // Simulación en desarrollo
  console.log('Contact form submission:', { name, email, phone, projectType, message })

  return {
    success: true,
    message: `¡Gracias, ${name}! Hemos recibido tu mensaje. Laura o Juan Esteban te contactarán pronto.`,
  }
}
