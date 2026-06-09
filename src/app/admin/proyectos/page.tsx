import Link from 'next/link'
import { getProyectos } from '@/lib/proyectos'
import DeleteProyectoButton from '@/components/admin/DeleteProyectoButton'
import type { Metadata } from 'next'
import type { Tipologia } from '@/types/proyectos'

export const metadata: Metadata = { title: 'Admin — Proyectos | UnEspacio' }
export const dynamic = 'force-dynamic'

const TIPOLOGIA_LABEL: Record<Tipologia, string> = {
  educativa: 'Educativa', corporativa: 'Corporativa', cultural: 'Cultural',
  salud: 'Salud', comercial: 'Comercial', residencial: 'Residencial',
}

interface Props {
  searchParams: { tipologia?: string }
}

export default async function AdminProyectosPage({ searchParams }: Props) {
  const tipologia = searchParams.tipologia as Tipologia | undefined
  const proyectos = await getProyectos(tipologia ? { tipologia } : undefined)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portafolio</h1>
            <p className="text-sm text-gray-500 mt-1">{proyectos.length} proyecto{proyectos.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/admin/proyectos/nuevo" className="text-xs bg-gray-900 text-white px-4 py-2 hover:bg-gray-700 transition-colors font-semibold uppercase tracking-wide">
            + Nuevo proyecto
          </Link>
        </div>

        {/* Filtro tipología */}
        <form className="flex flex-wrap gap-2 mb-6">
          <Link href="/admin/proyectos"
            className={`text-xs px-3 py-1.5 border transition-colors ${!tipologia ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
            Todas
          </Link>
          {Object.entries(TIPOLOGIA_LABEL).map(([val, label]) => (
            <Link key={val} href={`/admin/proyectos?tipologia=${val}`}
              className={`text-xs px-3 py-1.5 border transition-colors ${tipologia === val ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
              {label}
            </Link>
          ))}
        </form>

        {proyectos.length === 0 ? (
          <div className="bg-white border border-gray-200 px-6 py-12 text-center">
            <p className="text-gray-400 text-sm">No hay proyectos. <Link href="/admin/proyectos/nuevo" className="text-gray-700 underline">Crea el primero.</Link></p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Proyecto', 'Tipología', 'Año', 'Área', 'En inicio', 'Acciones'].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proyectos.map(p => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.imagen_portada && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.imagen_portada} alt="" className="w-10 h-10 object-cover flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{p.titulo}</p>
                          <p className="text-xs text-gray-400">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{TIPOLOGIA_LABEL[p.tipologia]}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.anio ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.area_m2 ? `${p.area_m2} m²` : '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.destacado ? '✓' : '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/proyectos/${p.id}`}
                          className="text-xs bg-gray-200 text-gray-800 px-3 py-1.5 rounded hover:bg-gray-300 transition-colors">
                          Editar
                        </Link>
                        <DeleteProyectoButton id={p.id} />
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
