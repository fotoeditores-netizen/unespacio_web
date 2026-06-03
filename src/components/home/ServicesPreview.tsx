import Link from 'next/link'
import { getServicios } from '@/lib/servicios'

const FALLBACK = [
  { id: 'educativa', number: '01', title: 'Educativa', sub: 'Aulas · Campus · Colegios' },
  { id: 'corporativa', number: '02', title: 'Corporativa', sub: 'Oficinas · Torres · Sedes' },
  { id: 'cultural', number: '03', title: 'Cultural', sub: 'Museos · Teatros · Plazas' },
  { id: 'salud', number: '04', title: 'Salud', sub: 'Clínicas · Hospitales' },
  { id: 'comercial', number: '05', title: 'Comercial', sub: 'Restaurantes · Locales' },
  { id: 'residencial', number: '06', title: 'Residencial', sub: 'Casas · Conjuntos' },
]

export default async function ServicesPreview() {
  let serviciosDB: Awaited<ReturnType<typeof getServicios>> = []
  try { serviciosDB = await getServicios() } catch { /* usa fallback */ }

  const services = serviciosDB.length > 0
    ? serviciosDB.map((s, i) => ({
        id: s.slug_anchor,
        number: String(i + 1).padStart(2, '0'),
        title: s.nombre.replace('Arquitectura ', '').replace('Arquitectura de ', ''),
        sub: s.descripcion_corta,
      }))
    : FALLBACK
  return (
    <section className="bg-cream border-t border-cream-dark">
      <div className="container-custom py-16 md:py-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive">
            03 — Tipologías de Diseño
          </p>
          <Link
            href="/servicios"
            className="self-start sm:self-auto inline-flex items-center gap-2 font-heading font-semibold text-xs tracking-widest uppercase text-dark-olive hover:text-olive transition-colors group"
          >
            Ver todos los servicios
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Lista editorial horizontal */}
        <div className="divide-y divide-olive/15">
          {services.map((svc) => (
            <Link
              key={svc.id}
              href={`/servicios#${svc.id}`}
              className="group flex items-center justify-between py-5 md:py-6 hover:bg-cream-dark/40 -mx-4 px-4 transition-colors duration-200"
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className="font-heading font-semibold text-xs text-olive/40 tracking-widest w-6 flex-shrink-0">
                  {svc.number}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-dark-olive group-hover:text-olive transition-colors duration-200">
                    {svc.title}
                  </h3>
                  <span className="font-sans text-xs text-olive/60 mt-0.5 sm:mt-0">
                    {svc.sub}
                  </span>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-olive/30 group-hover:text-olive group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
