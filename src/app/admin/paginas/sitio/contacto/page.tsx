import { getContentBySeccion } from '@/lib/content'
import { guardarContactoContent } from '@/actions/content'
import ContentSaveButton from '@/app/admin/contenido/ContentSaveButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EditorContactoPage() {
  const contacto = await getContentBySeccion('contacto')

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/paginas" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Páginas
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-['Montserrat'] font-bold text-xl text-[#1a1a1a]">Contacto</h1>
        <a href="/contacto" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded transition-colors">
          Ver página ↗
        </a>
      </div>

      <form action={guardarContactoContent} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={contacto.email ?? 'hola@unespacio.com'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
          <p className="text-xs text-gray-400 mt-1">Se muestra en la página y se usa para recibir mensajes del formulario.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">WhatsApp</label>
          <input
            name="whatsapp"
            defaultValue={contacto.whatsapp ?? '+57 301 437 5950'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
            placeholder="+57 300 000 0000"
          />
          <p className="text-xs text-gray-400 mt-1">Incluir código de país. Se usa para generar el enlace de WhatsApp.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Ciudad / País</label>
          <input
            name="ciudad"
            defaultValue={contacto.ciudad ?? 'Colombia'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>

        <ContentSaveButton />
      </form>
    </div>
  )
}
