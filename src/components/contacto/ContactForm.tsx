'use client'

import { useState } from 'react'

const projectTypes = [
  'Arquitectura Educativa',
  'Arquitectura Corporativa',
  'Arquitectura Cultural',
  'Arquitectura de Salud',
  'Arquitectura Comercial',
  'Arquitectura Residencial',
  'No estoy seguro todavía',
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(data: FormData) {
    const errs: Record<string, string> = {}
    const name = data.get('name') as string
    const email = data.get('email') as string
    const projectType = data.get('projectType') as string
    const message = data.get('message') as string
    if (!name || name.trim().length < 2) errs.name = 'Por favor ingresa tu nombre completo.'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Por favor ingresa un correo válido.'
    if (!projectType) errs.projectType = 'Por favor selecciona el tipo de proyecto.'
    if (!message || message.trim().length < 20) errs.message = 'Por favor describe tu proyecto (mínimo 20 caracteres).'
    return errs
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const errs = validate(data)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setState('submitting')
    // Aquí conectar con Resend, Formspree, EmailJS, etc.
    await new Promise(r => setTimeout(r, 800))
    setState('success')
  }

  if (state === 'success') {
    return (
      <div className="bg-olive/10 border border-olive/30 p-10 text-center">
        <div className="w-16 h-16 bg-olive/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-2xl text-dark-olive mb-3">¡Mensaje enviado!</h3>
        <p className="font-sans text-olive leading-relaxed">
          Gracias. Laura o Juan Esteban te contactarán en las próximas 24 horas hábiles.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-heading font-semibold text-xs tracking-widest uppercase text-dark-olive mb-2">
            Nombre completo <span className="text-olive">*</span>
          </label>
          <input id="name" name="name" type="text" autoComplete="name"
            className="input-field" placeholder="Laura García" />
          {errors.name && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block font-heading font-semibold text-xs tracking-widest uppercase text-dark-olive mb-2">
            Correo electrónico <span className="text-olive">*</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email"
            className="input-field" placeholder="laura@empresa.com" />
          {errors.email && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block font-heading font-semibold text-xs tracking-widest uppercase text-dark-olive mb-2">
            Teléfono / WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel"
            className="input-field" placeholder="+57 300 123 4567" />
        </div>
        <div>
          <label htmlFor="projectType" className="block font-heading font-semibold text-xs tracking-widest uppercase text-dark-olive mb-2">
            Tipo de proyecto <span className="text-olive">*</span>
          </label>
          <select id="projectType" name="projectType"
            className="input-field appearance-none cursor-pointer bg-white" defaultValue="">
            <option value="" disabled>Seleccionar...</option>
            {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.projectType && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.projectType}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block font-heading font-semibold text-xs tracking-widest uppercase text-dark-olive mb-2">
          Cuéntanos sobre tu proyecto <span className="text-olive">*</span>
        </label>
        <textarea id="message" name="message" rows={5}
          className="input-field resize-none"
          placeholder="¿Qué tipo de espacio necesitas? ¿Cuál es la escala aproximada?..." />
        {errors.message && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.message}</p>}
      </div>

      <p className="font-sans text-xs text-olive/70 leading-relaxed">
        Al enviar, aceptas que UnEspacio Arquitectos se ponga en contacto contigo sobre tu proyecto.
      </p>

      <button type="submit" disabled={state === 'submitting'}
        className="w-full btn-primary py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed">
        {state === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </span>
        ) : 'Enviar Mensaje'}
      </button>
    </form>
  )
}
