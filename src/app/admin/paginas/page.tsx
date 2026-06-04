import Link from 'next/link'
import { getPaginas } from '@/lib/paginas'
import DeletePaginaButton from './DeletePaginaButton'

export const dynamic = 'force-dynamic'

export default async function PaginasPage() {
  const paginas = await getPaginas()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-['Montserrat'] font-bold text-2xl text-[#1a1a1a]">Páginas</h1>
          <p className="text-sm text-gray-500 mt-1">{paginas.length} página{paginas.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/paginas/nueva"
          className="px-5 py-2 bg-[#1a1a1a] text-white text-xs font-['Montserrat'] font-semibold tracking-widest uppercase rounded hover:bg-[#333] transition-colors"
        >
          + Nueva página
        </Link>
      </div>

      {paginas.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">No hay páginas creadas</p>
          <p className="text-sm">Crea tu primera página con el botón de arriba.</p>
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
  )
}
