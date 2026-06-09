import { getContentBySeccion } from '@/lib/content'
import { guardarPortafolio } from '@/actions/content'
import ContentSaveButton from '@/app/admin/contenido/ContentSaveButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EditorPortafolioPage() {
  const portafolio = await getContentBySeccion('portafolio')

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/paginas" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Páginas
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-['Montserrat'] font-bold text-xl text-[#1a1a1a]">Portafolio</h1>
        <a href="/portafolio" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded transition-colors">
          Ver página ↗
        </a>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded px-4 py-3 text-xs text-blue-700 mb-8">
        Aquí editas los textos del encabezado de la página de Portafolio. Los proyectos individuales se gestionan en <Link href="/admin/proyectos" className="underline font-semibold">Portafolio →</Link>
      </div>

      <form action={guardarPortafolio} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Título principal
          </label>
          <input
            name="titulo"
            defaultValue={portafolio.titulo ?? 'Cada proyecto, una historia única'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Subtítulo / descripción
          </label>
          <textarea
            name="subtitulo"
            rows={3}
            defaultValue={portafolio.subtitulo ?? 'Proyectos a diferentes escalas que comparten una misma filosofía: el diseño al servicio de quien habita el espacio.'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a] resize-y"
          />
        </div>

        <ContentSaveButton />
      </form>
    </div>
  )
}
