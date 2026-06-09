import Link from 'next/link'
import { getPaginas } from '@/lib/paginas'
import DeletePaginaButton from './DeletePaginaButton'

export const dynamic = 'force-dynamic'

const PAGINAS_SITIO = [
  { href: '/admin/paginas/sitio/inicio', label: 'Inicio', url: '/', descripcion: 'Hero, estadísticas y textos de la portada' },
  { href: '/admin/paginas/sitio/nosotros', label: 'Nosotros / El Estudio', url: '/#estudio', descripcion: 'Textos de la sección del estudio y cita de fundadores' },
  { href: '/admin/paginas/sitio/servicios', label: 'Servicios', url: '/servicios', descripcion: 'Encabezado de la página de servicios' },
  { href: '/admin/paginas/sitio/portafolio', label: 'Portafolio', url: '/portafolio', descripcion: 'Encabezado de la página de portafolio' },
  { href: '/admin/paginas/sitio/contacto', label: 'Contacto', url: '/contacto', descripcion: 'Email, WhatsApp y ciudad de contacto' },
]

export default async function PaginasPage() {
  const paginas = await getPaginas()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-['Montserrat'] font-bold text-2xl text-[#1a1a1a]">Páginas</h1>
          <p className="text-sm text-gray-500 mt-1">Edita el contenido de todas las páginas del sitio</p>
        </div>
        <Link
          href="/admin/paginas/nueva"
          className="px-5 py-2 bg-[#1a1a1a] text-white text-xs font-['Montserrat'] font-semibold tracking-widest uppercase rounded hover:bg-[#333] transition-colors"
        >
          + Nueva página
        </Link>
      </div>

      {/* Páginas fijas del sitio */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-['Montserrat'] mb-3">
          Páginas del sitio
        </h2>
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          {PAGINAS_SITIO.map((p, i) => (
            <div
              key={p.href}
              className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors ${i < PAGINAS_SITIO.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-[#2D2F1E]/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2D2F1E] text-xs font-bold font-['Montserrat']">{p.label.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-[#1a1a1a] text-sm">{p.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.descripcion}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono hidden sm:block">{p.url}</span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-[#1a1a1a] transition-colors px-2 py-1"
                >
                  Ver ↗
                </a>
                <Link
                  href={p.href}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Páginas personalizadas */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-['Montserrat'] mb-3">
          Páginas personalizadas
        </h2>

        {paginas.length === 0 ? (
          <div className="text-center py-14 bg-white border border-gray-200 rounded text-gray-400">
            <p className="text-sm mb-1">No hay páginas personalizadas</p>
            <p className="text-xs">Usa el botón "+ Nueva página" para crear una con el constructor de bloques.</p>
          </div>
        ) : (
          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginas.map((pagina) => (
                  <tr key={pagina.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-[#1a1a1a]">{pagina.titulo}</td>
                    <td className="px-5 py-3 text-gray-500 font-mono text-xs">/p/{pagina.slug}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        pagina.estado === 'publicada'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {pagina.estado === 'publicada' ? 'Publicada' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {pagina.estado === 'publicada' && (
                          <a
                            href={`/p/${pagina.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 hover:text-[#1a1a1a] transition-colors px-2 py-1"
                          >
                            Ver ↗
                          </a>
                        )}
                        <Link
                          href={`/admin/paginas/${pagina.id}`}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors"
                        >
                          Editar
                        </Link>
                        <DeletePaginaButton id={pagina.id} titulo={pagina.titulo} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
