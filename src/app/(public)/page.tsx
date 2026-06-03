export const dynamic = 'force-dynamic'

import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import PhilosophySection from '@/components/home/PhilosophySection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import ServicesPreview from '@/components/home/ServicesPreview'
import QuoteBanner from '@/components/home/QuoteBanner'
import InstagramSection from '@/components/home/InstagramSection'
import CTASection from '@/components/home/CTASection'
import { getContentBySeccion } from '@/lib/content'

export default async function HomePage() {
  const [heroContent, statsContent] = await Promise.all([
    getContentBySeccion('hero'),
    getContentBySeccion('stats'),
  ])

  return (
    <>
      {/* 01 — Hero: imagen real a pantalla completa, texto editorial bottom-left */}
      <HeroSection content={heroContent} />

      {/* Banda de estadísticas — credenciales inmediatas post-hero */}
      <StatsSection content={statsContent} />

      {/* 02 — Filosofía del estudio: split texto / interior Casa CEM */}
      <PhilosophySection />

      {/* 03 — Proyectos destacados: grid asimétrico con 3 proyectos reales */}
      <FeaturedProjects />

      {/* 04 — Tipologías de servicios: lista editorial */}
      <ServicesPreview />

      {/* Quote de los fundadores con imagen de fondo */}
      <QuoteBanner />

      {/* 05 — Instagram: bento grid de reels */}
      <InstagramSection />

      {/* CTA final: imagen dramática + conversión */}
      <CTASection />
    </>
  )
}
