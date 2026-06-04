import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProyecto } from '@/lib/proyectos'

export const dynamic = 'force-dynamic'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const proyecto = await getProyecto(params.slug)
  if (!proyecto) return {}
  return {
    title: `${proyecto.titulo} | UnEspacio Arquitectos`,
    description: proyecto.descripcion_corta,
  }
}

const TIPOLOGIA_LABEL: Record<string, string> = {
  educativa: 'Arquitectura Educativa',
  corporativa: 'Arquitectura Corporativa',
  cultural: 'Arquitectura Cultural',
  salud: 'Arquitectura de Salud',
  comercial: 'Arquitectura Comercial',
  residencial: 'Arquitectura Residencial',
}

export default async function ProyectoPage({ params }: Props) {
  const proyecto = await getProyecto(params.slug)
  if (!proyecto) notFound()

  const imagenes = proyecto.imagenes?.length ? proyecto.imagenes : proyecto.imagen_portada ? [proyecto.imagen_portada] : []

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        {imagenes[0] ? (
          <Image
            src={imagenes[0]}
            alt={proyecto.titulo}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            quality={90}
          />
        ) : (
          <div className="absolute inset-0 bg-dark-olive" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-olive/30 to-dark-olive/80" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-custom pb-14 md:pb-20">
            <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive-light mb-4">
              {TIPOLOGIA_LABEL[proyecto.tipologia] ?? proyecto.tipologia}
            </p>
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-white leading-tight max-w-3xl">
              {proyecto.titulo}
            </h1>
            <div className="flex items-center gap-6 mt-6 text-cream/60 font-sans text-sm">
              {proyecto.area_m2 && <span>{proyecto.area_m2.toLocaleString()} m²</span>}
              {proyecto.anio && <span>{proyecto.anio}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {proyecto.descripcion_corta && (
                <p className="font-sans text-xl text-dark-olive leading-relaxed mb-6 font-medium">
                  {proyecto.descripcion_corta}
                </p>
              )}
              {proyecto.descripcion_larga && (
                <p className="font-sans text-base text-olive/80 leading-relaxed whitespace-pre-line">
                  {proyecto.descripcion_larga}
                </p>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive/50 mb-1">Tipología</p>
                <p className="font-sans text-sm text-dark-olive">{TIPOLOGIA_LABEL[proyecto.tipologia]}</p>
              </div>
              {proyecto.area_m2 && (
                <div>
                  <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive/50 mb-1">Área</p>
                  <p className="font-sans text-sm text-dark-olive">{proyecto.area_m2.toLocaleString()} m²</p>
                </div>
              )}
              {proyecto.anio && (
                <div>
                  <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive/50 mb-1">Año</p>
                  <p className="font-sans text-sm text-dark-olive">{proyecto.anio}</p>
                </div>
              )}
              <Link href="/contacto" className="btn-primary w-full text-center mt-4 block">
                Iniciar un proyecto
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Galería */}
      {imagenes.length > 1 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {imagenes.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden group">
                  <Image
                    src={img}
                    alt={`${proyecto.titulo} — imagen ${i + 2}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={80}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-dark-olive section-padding">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            ¿Tienes un proyecto similar?
          </h2>
          <p className="font-sans text-cream/70 mb-8 max-w-md mx-auto">
            Conversemos sobre tu idea y exploremos las posibilidades juntos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn-primary bg-olive hover:bg-olive-dark">
              Agendar consulta gratuita
            </Link>
            <Link href="/portafolio" className="btn-outline-white">
              Ver más proyectos
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
