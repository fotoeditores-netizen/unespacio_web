'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Miembro } from '@/types/equipo'

type TabKey = 'laura' | 'juan'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading font-semibold text-xs tracking-widest uppercase text-olive mb-4 border-b border-cream-dark pb-2">
      {children}
    </p>
  )
}

function ProjectRow({ year, name, office }: { year: string; name: string; office: string }) {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-3 py-2.5 border-b border-cream/60 last:border-0">
      <span className="font-heading font-semibold text-xs text-olive pt-0.5 tabular-nums">{year}</span>
      <div>
        <p className="font-sans text-sm text-dark-olive leading-snug">{name}</p>
        <p className="font-sans text-xs text-olive/70 mt-0.5">{office}</p>
      </div>
    </div>
  )
}

function ContestRow({
  year,
  name,
  office,
  location,
  result,
}: {
  year: string
  name: string
  office: string
  location?: string
  result?: string
}) {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-3 py-2.5 border-b border-cream/60 last:border-0">
      <span className="font-heading font-semibold text-xs text-olive pt-0.5 tabular-nums">{year}</span>
      <div>
        <p className="font-sans text-sm text-dark-olive leading-snug">{name}</p>
        <p className="font-sans text-xs text-olive/70 mt-0.5">{office}</p>
        {location && <p className="font-sans text-xs text-olive/50 mt-0.5">{location}</p>}
        {result && (
          <span className="inline-block mt-1 font-heading text-xs font-semibold tracking-wide text-cream bg-olive px-2 py-0.5">
            {result}
          </span>
        )}
      </div>
    </div>
  )
}

function FirmRow({ period, firm }: { period: string; firm: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-3 py-2.5 border-b border-cream/60 last:border-0">
      <span className="font-heading font-semibold text-xs text-olive pt-0.5">{period}</span>
      <p className="font-sans text-sm text-dark-olive leading-snug">{firm}</p>
    </div>
  )
}

function LauraCVContent() {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Left column — formation + firms */}
      <div className="space-y-10">
        <div>
          <SectionLabel>Formación Académica</SectionLabel>
          <div className="space-y-4">
            <div>
              <p className="font-heading font-semibold text-sm text-dark-olive">Arquitecta</p>
              <p className="font-sans text-xs text-olive/80 mt-0.5">Universidad Pontificia Bolivariana</p>
              <p className="font-sans text-xs text-olive/50 mt-0.5">2005</p>
            </div>
            <div>
              <p className="font-heading font-semibold text-sm text-dark-olive">Especialista en Gerencia de Proyectos</p>
              <p className="font-sans text-xs text-olive/80 mt-0.5">Universidad EAFIT</p>
              <p className="font-sans text-xs text-olive/50 mt-0.5">2020</p>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>Trayectoria de Firmas</SectionLabel>
          <FirmRow period="2013" firm="Anne Durand Atelier Urbain. París, Francia" />
          <FirmRow period="2014 – 2015" firm="Entrabe Arquitectos. Bogotá" />
          <FirmRow period="2015 – 2016" firm="SOLINOFF CORP. Bogotá" />
          <FirmRow period="2016 – 2019" firm="Juan Manuel Pelaez Arquitectos. Medellín" />
          <FirmRow period="2019 – 2022" firm="Conconcreto. Medellín — Desarrollo, Coordinación y Construcción de Proyectos" />
        </div>
      </div>

      {/* Middle column — projects */}
      <div>
        <SectionLabel>Proyectos</SectionLabel>
        <ProjectRow year="2022" name="Reasentamiento Gramalote (370 ha)" office="Conconcreto" />
        <ProjectRow year="2021" name="Centro de Negocios Agropecuarios (7500 m²)" office="Un espacio Arquitectos" />
        <ProjectRow year="2021" name="Casa El Mirador (320 m²)" office="Un espacio Arquitectos" />
        <ProjectRow year="2020" name="Reforma Edificio Midala (730 m²)" office="Un espacio Arquitectos" />
        <ProjectRow year="2020" name="Preescolar Instituto Uniban (830 m²)" office="Juan Manuel Peláez Arquitectos" />
        <ProjectRow year="2018" name="Centro de Desarrollo Infantil Pasacaballos (3400 m²)" office="Juan Manuel Peláez Arquitectos" />
        <ProjectRow year="2017" name="Casa Ene (391 m²)" office="Juan Esteban Ramírez + Laura Maya" />
        <ProjectRow year="2016" name="Medellín Distrito Empresarial MDE (28208 m²)" office="Juan Manuel Peláez Arquitectos" />
        <ProjectRow year="2015" name="Edificio Jorge Hoyos. Universidad Javeriana (11300 m²)" office="Entrabe arquitectos + UdeB arquitectos" />
        <ProjectRow year="2015" name="Edificio Ad Portas. Universidad de la Sabana (30000 m²)" office="Entrabe arquitectos + UdeB arquitectos" />
        <ProjectRow year="2014" name="Renovación Planetario de Bogotá (32000 m²)" office="Entrabe arquitectos" />
      </div>

      {/* Right column — concursos */}
      <div>
        <SectionLabel>Concursos</SectionLabel>
        <ContestRow
          year="2022"
          name="Concurso público Monumento Repelón"
          office="Un espacio arquitectos + Bassico arquitectos + Hernán Marin"
          result="Primer Puesto"
        />
        <ContestRow
          year="2020"
          name="Concurso público SENEGAL ELEMENTARY SCHOOL"
          office="Juan Esteban Ramírez + Laura Maya"
        />
        <ContestRow
          year="2018"
          name="Concurso privado COOMEVA SEDE REGIONAL CALI"
          office="Juan Manuel Peláez arquitectos"
        />
        <ContestRow
          year="2018"
          name="Concurso privado PLAN MAESTRO ARQUITECTÓNICO Y PRIMERA FASE DE DESARROLLO VIVIENDA DE INTERÉS SOCIAL"
          office="JUMP arquitectos + Bassico arquitectos"
        />
        <ContestRow
          year="2016"
          name="Concurso privado CENTRO CÍVICO UNIVERSITARIO UNIANDINOS"
          office="Juan Manuel Peláez arquitectos"
        />
        <ContestRow
          year="2015"
          name="Concurso privado EDIFICIO AD PORTAS UNIVERSIDAD DE LA SABANA"
          office="+UdeB arquitectos"
          result="Primer Puesto"
        />
      </div>
    </div>
  )
}

function JuanCVContent() {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Left column — formation */}
      <div className="space-y-10">
        <div>
          <SectionLabel>Formación Académica</SectionLabel>
          <div>
            <p className="font-heading font-semibold text-sm text-dark-olive">Arquitecto</p>
            <p className="font-sans text-xs text-olive/80 mt-0.5">Universidad Nacional de Colombia – Sede Medellín</p>
            <p className="font-sans text-xs text-olive/50 mt-0.5">2005</p>
          </div>
        </div>

        <div>
          <SectionLabel>Trayectoria de Firmas</SectionLabel>
          <FirmRow period="2005 – 2020" firm="Juan Manuel Peláez Arquitectos. Medellín — Desarrollo, Coordinación y Construcción de Proyectos" />
        </div>

        <div>
          <SectionLabel>Proyectos Recientes</SectionLabel>
          <ProjectRow year="2021" name="Centro de Negocios Agropecuarios (7500 m²)" office="Un espacio Arquitectos" />
          <ProjectRow year="2021" name="Casa El Mirador (320 m²)" office="Un espacio Arquitectos" />
          <ProjectRow year="2020" name="Reforma Edificio Midala (730 m²)" office="Un espacio Arquitectos" />
          <ProjectRow year="2020" name="Preescolar Instituto Uniban (830 m²)" office="JUMP Arquitectos" />
          <ProjectRow year="2019" name="Facultad de Creación Universidad del Rosario – Edificio Cabal (712 m²)" office="JUMP Arquitectos" />
          <ProjectRow year="2019" name="Facultad de Creación Universidad del Rosario – Casa Reynolds (843 m²)" office="JUMP Arquitectos" />
          <ProjectRow year="2019" name="Parque Biodinámico Quebradona (8.4 ha)" office="JUMP Arquitectos" />
          <ProjectRow year="2019" name="Casa Guacharacas (387 m²)" office="JUMP Arquitectos" />
          <ProjectRow year="2018" name="Casa Almoguera Lote 2 (424 m²)" office="JUMP Arquitectos" />
          <ProjectRow year="2018" name="Restaurante Moshi-Don Diablo (422 m²)" office="JUMP Arquitectos" />
          <ProjectRow year="2018" name="Centro cultura Laboratorio del Espíritu – Vereda Nazaret (327 m²)" office="JUMP Arquitectos" />
          <ProjectRow year="2017" name="Casa Ene (391 m²)" office="Juan Esteban Ramírez + Laura Maya" />
          <ProjectRow year="2016" name="Medellín Distrito Empresarial MDE (28208 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2014" name="Casa Urbanización Capiro lote 08 (530 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2014" name="Reloteo el Tablazo (44415 m²)" office="Juan Manuel Peláez + Juan Esteban Ramírez" />
          <ProjectRow year="2014" name="Facultad de artes Universidad Nacional de Colombia – sede Bogotá (23082 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2013" name="Centro de Idiomas Eafit (7099 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2012" name="Reforma Oficinas Haceb (2850 m²)" office="Juan Manuel Peláez Arquitectos + Nicolas Hermelin arquitectos + Studio Sur" />
          <ProjectRow year="2012" name="Kimberly Clark Innovation Center (5000 m²)" office="Juan Manuel Peláez Arquitectos + AIA" />
          <ProjectRow year="2011" name="Prototipo Educativo Región Caribe (2500 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2011" name="Centro de Recursos Bureche (750 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2011" name="Coliseo Polideportivo Bureche (850 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2009" name="Complejo Clínico Coomeva Palmira (41100 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2008" name="Restaurante Carmen (400 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2007" name="Casa Torrelunera (620 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2007" name="Viviendas Los Ciruelos (4500 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2007" name="Pabellón NEXUS – Liverpool – Lápiz de acero espacio efímero 2009" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2007" name="Colegio Las Mercedes (4162 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2006" name="Casa Albania (350 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2006" name="Aulas + Administración Colegio Bureche (1654 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2006" name="Edificio de vivienda Balcones de Miraflores (2860 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2006" name="Casa Ochoa (410 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2006" name="Casa Asturias (582 m²)" office="Juan Manuel Peláez Arquitectos" />
          <ProjectRow year="2005" name="Edificio de vivienda Cuba Centro (4.500 m²)" office="Juan Manuel Peláez Arquitectos" />
        </div>
      </div>

      {/* Middle + Right columns — concursos, full width split */}
      <div className="lg:col-span-2">
        <SectionLabel>Concursos</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <ContestRow
              year="2020"
              name="Concurso público SENEGAL ELEMENTARY SCHOOL"
              office="Juan Esteban Ramírez + Laura Maya"
            />
            <ContestRow
              year="2019"
              name="Concurso privado CONFANDI SEDE ARROYO HONDO"
              office="JUMP Arquitectos + Colectivo 720"
              location="Cali – Valle del Cauca"
              result="Primer Puesto"
            />
            <ContestRow
              year="2018"
              name="Concurso privado COOMEVA SEDE REGIONAL CALI"
              office="Juan Manuel Peláez arquitectos"
            />
            <ContestRow
              year="2018"
              name="Concurso privado PLAN MAESTRO ARQUITECTÓNICO Y PRIMERA FASE DE DESARROLLO VIVIENDA DE INTERÉS SOCIAL"
              office="JUMP arquitectos + Bassico arquitectos"
            />
            <ContestRow
              year="2016"
              name="Concurso privado CENTRO CÍVICO UNIVERSITARIO UNIANDINOS"
              office="Juan Manuel Peláez arquitectos"
            />
            <ContestRow
              year="2015"
              name="Concurso privado PARQUE MUSEO INTERACTIVO DE LA HIDROELECTRICIDAD"
              office="Juan Manuel Peláez arquitectos"
              result="Primer Puesto"
            />
            <ContestRow
              year="2013"
              name="Concurso público internacional PARQUE DEL RIO EN LA CIUDAD DE MEDELLIN"
              office="Juan Manuel Peláez Arquitectos + Lorenzo Castro Arquitectos"
              location="Medellín – Antioquia"
            />
            <ContestRow
              year="2012"
              name="Concurso privado CENTRO CÍVICO DE SERVICIOS COMPLEMENTARIOS PARA EL CAMPAMENTO RESIDENCIAL PETROLERO CENTRO RUBIALES"
              office="Carlos Pardo + Juan Manuel Peláez arquitectos"
              location="Puerto Gaitán – Meta"
            />
            <ContestRow
              year="2012"
              name="Concurso privado CENTRO DE INNOVACION KYMBERLY CLARK"
              office="AIA + Juan Manuel Peláez arquitectos"
              location="Envigado – Antioquia"
              result="Primer Puesto"
            />
            <ContestRow
              year="2011"
              name="Concurso público recuperación del espacio público del centro histórico de Guadalajara de Buga"
              office="Juan Manuel Peláez Arquitectos"
              location="Buga, Valle del Cauca"
            />
            <ContestRow
              year="2011"
              name="Buena Arquitectura, Excelente Pedagogía. (Prototipos Espacios Pedagógicos)"
              office="Unión Temporal Peláez – Ramírez – Camargo"
              location="Regiones Andina – Pacifica – Caribe – Amazónica"
              result="1er Puesto Caribe · 2do Puesto Amazonia"
            />
            <ContestRow
              year="2011"
              name="Centro Internacional de Convenciones para Bogotá"
              office="Unión Temporal Juan Manuel Peláez arquitectos – Zaha Hadid arquitectos"
              location="Bogotá – Cundinamarca"
              result="Finalista"
            />
            <ContestRow
              year="2011"
              name="Remodelación Primera Etapa Centro Comercial Oviedo"
              office="Unión Temporal Pascual Celis + Juan Manuel Peláez Arquitectos"
              location="Medellín"
            />
          </div>
          <div>
            <ContestRow
              year="2010"
              name="Concurso diseño nueva sede del Instituto de Investigaciones Marinas"
              office="Unión Temporal Herrera-Peláez-Ramírez"
              location="Santa Marta"
            />
            <ContestRow
              year="2010"
              name="Concurso público revitalización eje urbano de la Albarrada de Mompox"
              office="Unión Temporal Herrera-Peláez-Ramírez"
              location="Mompox"
              result="Mención Honorífica"
            />
            <ContestRow
              year="2009"
              name="Parque de la Vida"
              office="Unión Temporal Herrera-Peláez-Ramírez"
              location="Medellín"
            />
            <ContestRow
              year="2009"
              name="Museo de Historia para Polonia"
              office="Juan Manuel Peláez Arquitectos"
              location="Polonia"
            />
            <ContestRow
              year="2009"
              name="Parques Biblioteca para la Cultura y la Vida Doce de Octubre y San Cristóbal"
              office="Unión Temporal Herrera-Peláez-Ramírez"
              location="Medellín"
            />
            <ContestRow
              year="2008"
              name="Concurso Público Nacional SCA – Infraestructuras Educativas Lotes Montería y Soacha"
              office="Unión Temporal Herrera-Bohorquez-Ramírez-Dapena"
              result="Segundo Puesto"
            />
            <ContestRow
              year="2008"
              name="Concurso Internacional de ideas – Nueva sede CAF"
              office="Juan Manuel Peláez Arquitectos"
              location="Caracas – Venezuela"
            />
            <ContestRow
              year="2008"
              name="Concurso Público Nacional SCA – Cuatro Infraestructuras Educativas en la Costa Atlántica"
              office="Unión Temporal Herrera-Bohorquez-Ramírez"
              location="Santa Marta – Lote La Carbonera"
              result="Segundo Puesto"
            />
            <ContestRow
              year="2008"
              name="Nueva Cámara de Comercio de Arauca"
              office="Juan Manuel Peláez Arquitectos"
              location="Arauca"
              result="Segundo Puesto"
            />
            <ContestRow
              year="2008"
              name="Escenarios Deportivos Medellín 2010"
              office=""
              location="Medellín"
            />
            <ContestRow
              year="2007"
              name="Centro Cultural de España"
              office="Unión Temporal Peláez-Mazo-Ramírez"
              location="Bogotá"
              result="Primer Puesto"
            />
            <ContestRow
              year="2006"
              name="Plaza de la Libertad"
              office="Unión Temporal Mazzanti Arquitectos + Juan Manuel Peláez Arquitectos"
              location="Medellín"
            />
            <ContestRow
              year="2006"
              name="Readecuación del Centro Histórico de Sta Marta"
              office="Juan Manuel Peláez Arquitectos"
              location="Santa Marta"
              result="Tercer Puesto"
            />
            <ContestRow
              year="2005"
              name="Biblioteca Pública Municipal de Chía"
              office="Unión Temporal Herrera-Bohorquez-Ramírez-Mazo"
              location="Bogotá-Chía"
            />
            <ContestRow
              year="2005"
              name="Bibliotecas para Medellín – Santo Domingo Sabio"
              office="Juan Manuel Peláez Arquitectos"
              location="Medellín"
              result="Tercer Puesto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface Props { equipo?: Miembro[] }

export default function TeamSection({ equipo }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('laura')

  // Busca en Supabase por nombre parcial; si no hay datos usa los valores hardcodeados
  const lauraDB = equipo?.find(m => m.nombre.toLowerCase().includes('laura'))
  const juanDB = equipo?.find(m => m.nombre.toLowerCase().includes('juan'))

  const profiles: { key: TabKey; photo: string; name: string; fullName: string; born: string; role: string }[] = [
    {
      key: 'laura',
      photo: lauraDB?.foto || '/perfil1.png',
      name: lauraDB?.nombre || 'Laura Maya Torres',
      fullName: lauraDB?.nombre || 'Arquitecta Laura Maya Torres',
      born: '1990 · Medellín – Colombia',
      role: lauraDB?.rol || 'Co-fundadora · Dirección de Diseño',
    },
    {
      key: 'juan',
      photo: juanDB?.foto || '/perfil2.png',
      name: juanDB?.nombre || 'Juan Esteban Ramírez Henao',
      fullName: juanDB?.nombre || 'Arquitecto Juan Esteban Ramírez Henao',
      born: '1982 · Medellín – Colombia',
      role: juanDB?.rol || 'Co-fundador · Dirección de Proyecto',
    },
  ]

  const active = profiles.find((p) => p.key === activeTab)!

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Profile selector cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {profiles.map((profile) => (
            <button
              key={profile.key}
              onClick={() => setActiveTab(profile.key)}
              className={`group flex items-center gap-5 p-6 border-2 transition-all duration-300 text-left ${
                activeTab === profile.key
                  ? 'border-olive bg-olive/5'
                  : 'border-cream-dark hover:border-olive/40 bg-white'
              }`}
            >
              <div
                className={`relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 transition-all duration-300 ${
                  activeTab === profile.key ? 'ring-olive' : 'ring-cream-dark group-hover:ring-olive/40'
                }`}
              >
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-olive mb-1">{profile.role}</p>
                <h3
                  className={`font-heading font-bold text-lg leading-tight transition-colors ${
                    activeTab === profile.key ? 'text-dark-olive' : 'text-dark-olive/70 group-hover:text-dark-olive'
                  }`}
                >
                  {profile.name}
                </h3>
                <p className="font-sans text-xs text-olive/60 mt-1">{profile.born}</p>
              </div>
              {/* active indicator */}
              <div className="ml-auto">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeTab === profile.key ? 'bg-olive scale-125' : 'bg-cream-dark'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* CV header */}
        <div className="mt-14 pb-6 border-b-2 border-dark-olive flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-olive mb-1">Hoja de Vida</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-olive">{active.fullName}</h2>
          </div>
          <p className="font-sans text-xs text-olive/60 tracking-widest">{active.born}</p>
        </div>

        {/* CV Content */}
        {activeTab === 'laura' ? <LauraCVContent /> : <JuanCVContent />}

        {/* Contact footer */}
        <div className="mt-12 pt-8 border-t border-cream-dark flex flex-col sm:flex-row gap-4 text-xs font-sans text-olive/60">
          <span>e-mail: unespacioarquitectos.@gmail.com</span>
          <span className="hidden sm:block">·</span>
          <span>Móvil: {activeTab === 'laura' ? '301-437 5950' : '311-764 9040'}</span>
        </div>
      </div>
    </section>
  )
}
