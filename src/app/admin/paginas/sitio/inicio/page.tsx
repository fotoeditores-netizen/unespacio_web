import { getContentBySeccion } from '@/lib/content'
import { guardarHero, guardarStats } from '@/actions/content'
import ContentSaveButton from '@/app/admin/contenido/ContentSaveButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EditorInicioPage() {
  const [hero, stats] = await Promise.all([
    getContentBySeccion('hero'),
    getContentBySeccion('stats'),
  ])

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/paginas" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Páginas
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-['Montserrat'] font-bold text-xl text-[#1a1a1a]">Inicio</h1>
        <a href="/" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded transition-colors">
          Ver página ↗
        </a>
      </div>

      {/* Hero */}
      <section className="mb-10">
        <h2 className="font-['Montserrat'] font-semibold text-base text-[#1a1a1a] mb-1 pb-2 border-b border-gray-200">
          Sección Hero
        </h2>
        <p className="text-xs text-gray-400 mb-4">El encabezado principal que aparece al entrar al sitio.</p>
        <form action={guardarHero} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Título — línea 1</label>
            <input
              name="titulo_linea1"
              defaultValue={hero.titulo_linea1 ?? 'Diseñamos los lugares'}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Título — línea 2</label>
            <input
              name="titulo_linea2"
              defaultValue={hero.titulo_linea2 ?? 'donde ocurre la vida.'}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Botón principal</label>
              <input
                name="cta1"
                defaultValue={hero.cta1 ?? 'Ver Portafolio'}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Botón secundario</label>
              <input
                name="cta2"
                defaultValue={hero.cta2 ?? 'Agendar Consulta Gratuita'}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>
          </div>
          <ContentSaveButton />
        </form>
      </section>

      {/* Estadísticas */}
      <section className="mb-10">
        <h2 className="font-['Montserrat'] font-semibold text-base text-[#1a1a1a] mb-1 pb-2 border-b border-gray-200">
          Banda de estadísticas
        </h2>
        <p className="text-xs text-gray-400 mb-4">Los 4 indicadores que aparecen debajo del hero.</p>
        <form action={guardarStats} className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Stat {i} — Número</label>
                <input
                  name={`stat${i}_value`}
                  defaultValue={stats[`stat${i}_value`] ?? ''}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Unidad</label>
                <input
                  name={`stat${i}_unit`}
                  defaultValue={stats[`stat${i}_unit`] ?? ''}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Descripción</label>
                <input
                  name={`stat${i}_label`}
                  defaultValue={stats[`stat${i}_label`] ?? ''}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
            </div>
          ))}
          <ContentSaveButton />
        </form>
      </section>
    </div>
  )
}
