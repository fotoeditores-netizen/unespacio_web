import { getContentBySeccion } from '@/lib/content'
import { guardarNosotros } from '@/actions/content'
import ContentSaveButton from '@/app/admin/contenido/ContentSaveButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EditorNosotrosPage() {
  const nosotros = await getContentBySeccion('nosotros')

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/paginas" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Páginas
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-['Montserrat'] font-bold text-xl text-[#1a1a1a]">Nosotros / El Estudio</h1>
        <a href="/" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded transition-colors">
          Ver en sitio ↗
        </a>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded px-4 py-3 text-xs text-amber-700 mb-8">
        Esta sección controla los textos de la sección "El Estudio" en la página de inicio y la cita de los fundadores.
        Los perfiles del equipo (Laura y Juan Esteban) se editan en <Link href="/admin/equipo" className="underline font-semibold">Equipo →</Link>
      </div>

      <form action={guardarNosotros} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Título principal
          </label>
          <input
            name="titulo"
            defaultValue={nosotros.titulo ?? 'La arquitectura no es un producto — es una conversación.'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Párrafo 1
          </label>
          <textarea
            name="parrafo1"
            rows={3}
            defaultValue={nosotros.parrafo1 ?? 'Diseñamos los lugares donde la vida ocurre: donde los niños aprenden, los equipos crean, las familias crecen y las comunidades se encuentran.'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a] resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Párrafo 2
          </label>
          <textarea
            name="parrafo2"
            rows={3}
            defaultValue={nosotros.parrafo2 ?? 'Cada proyecto comienza con una escucha profunda. El resultado no lleva nuestra firma — refleja el alma de quienes lo van a habitar. Ese es nuestro único estándar.'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a] resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Cita de los fundadores
          </label>
          <textarea
            name="cita"
            rows={3}
            defaultValue={nosotros.cita ?? 'La arquitectura no es un producto, es una conversación entre el espacio y las personas que lo van a habitar. Cada proyecto es único.'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a] resize-y"
          />
          <p className="text-xs text-gray-400 mt-1">Aparece en el banner con imagen de fondo en la página de inicio.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Autor de la cita
          </label>
          <input
            name="cita_autor"
            defaultValue={nosotros.cita_autor ?? 'Laura Maya & Juan Esteban Ramírez · Fundadores'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>

        <ContentSaveButton />
      </form>
    </div>
  )
}
