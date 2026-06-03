import { getContentBySeccion } from '@/lib/content'
import { guardarHero, guardarStats, guardarContactoContent } from '@/actions/content'
import ContentSaveButton from './ContentSaveButton'

export const dynamic = 'force-dynamic'

export default async function ContenidoPage() {
  const [hero, stats, contacto] = await Promise.all([
    getContentBySeccion('hero'),
    getContentBySeccion('stats'),
    getContentBySeccion('contacto'),
  ])

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-['Montserrat'] font-bold text-2xl text-[#1a1a1a]">Contenido del sitio</h1>
        <p className="text-sm text-gray-500 mt-1">Edita los textos principales sin tocar el código.</p>
      </div>

      {/* ── Hero ── */}
      <section className="mb-10">
        <h2 className="font-['Montserrat'] font-semibold text-base text-[#1a1a1a] mb-4 pb-2 border-b border-gray-200">
          Hero (inicio)
        </h2>
        <form action={guardarHero} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Título — línea 1
            </label>
            <input
              name="titulo_linea1"
              defaultValue={hero.titulo_linea1 ?? 'Diseñamos los lugares'}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Título — línea 2
            </label>
            <input
              name="titulo_linea2"
              defaultValue={hero.titulo_linea2 ?? 'donde ocurre la vida.'}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Botón principal
              </label>
              <input
                name="cta1"
                defaultValue={hero.cta1 ?? 'Ver Portafolio'}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Botón secundario
              </label>
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

      {/* ── Estadísticas ── */}
      <section className="mb-10">
        <h2 className="font-['Montserrat'] font-semibold text-base text-[#1a1a1a] mb-4 pb-2 border-b border-gray-200">
          Estadísticas
        </h2>
        <form action={guardarStats} className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Stat {i} — Número
                </label>
                <input
                  name={`stat${i}_value`}
                  defaultValue={stats[`stat${i}_value`] ?? ''}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Unidad
                </label>
                <input
                  name={`stat${i}_unit`}
                  defaultValue={stats[`stat${i}_unit`] ?? ''}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Descripción
                </label>
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

      {/* ── Contacto ── */}
      <section className="mb-10">
        <h2 className="font-['Montserrat'] font-semibold text-base text-[#1a1a1a] mb-4 pb-2 border-b border-gray-200">
          Información de contacto
        </h2>
        <form action={guardarContactoContent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              defaultValue={contacto.email ?? 'hola@unespacio.com'}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              WhatsApp
            </label>
            <input
              name="whatsapp"
              defaultValue={contacto.whatsapp ?? '+57 301 437 5950'}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Ciudad / País
            </label>
            <input
              name="ciudad"
              defaultValue={contacto.ciudad ?? 'Colombia'}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
          <ContentSaveButton />
        </form>
      </section>
    </div>
  )
}
