import { getContentBySeccion } from '@/lib/content'
import { guardarServicios } from '@/actions/content'
import ContentSaveButton from '@/app/admin/contenido/ContentSaveButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EditorServiciosPage() {
  const servicios = await getContentBySeccion('servicios')

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/paginas" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Páginas
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-['Montserrat'] font-bold text-xl text-[#1a1a1a]">Servicios</h1>
        <a href="/servicios" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded transition-colors">
          Ver página ↗
        </a>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded px-4 py-3 text-xs text-blue-700 mb-8">
        Aquí editas los textos del encabezado de la página de Servicios. Las 6 tipologías (Educativa, Corporativa, etc.) se editan en <Link href="/admin/servicios" className="underline font-semibold">Servicios →</Link>
      </div>

      <form action={guardarServicios} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Título principal
          </label>
          <input
            name="titulo"
            defaultValue={servicios.titulo ?? 'Arquitectura a la medida de cada vida'}
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
            defaultValue={servicios.subtitulo ?? 'Seis tipologías de diseño, una misma filosofía: el espacio como respuesta honesta a las necesidades humanas.'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a] resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Título sección "Nuestro Proceso"
          </label>
          <input
            name="proceso_titulo"
            defaultValue={servicios.proceso_titulo ?? 'De la conversación al espacio habitable'}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>

        <ContentSaveButton />
      </form>
    </div>
  )
}
