# CLAUDE.md

This file provides guidance to Claude Code when working with the "UnEspacio Arquitectos" web project.

## 🏢 Contexto del Negocio y Marca
UnEspacio es una firma de arquitectura colombiana fundada en 2021 por Laura Maya y Juan Esteban 
Ramírez. Diseñan espacios educativos, corporativos, culturales, de salud, comerciales y 
residenciales con más de 20 años de experiencia combinada.

- **Tono de Comunicación:** Reflexivo, cercano y con profundidad. "La arquitectura no es un 
  producto, es una conversación."
- **Tipografías:** `Montserrat` (títulos, weight 600/700) e `Inter` (cuerpo, weight 400/500) 
  — ya configuradas en layout.tsx vía Google Fonts.
- **Paleta de Colores:** Neutros arquitectónicos. Carbón `#1a1a1a`, blanco hueso `#f5f5f0`, 
  grises de Tailwind. Verificar valores exactos en globals.css.
- **Estilo Visual:** Editorial, minimalista. Fotografía de obra real como protagonista.

## 🏗️ Stack Técnico
- **Frontend:** Next.js 14.2.5 App Router + TypeScript + Tailwind CSS
- **CMS:** Supabase (base de datos, auth, storage) — PENDIENTE DE INTEGRAR
- **Deploy:** Vercel
- **Admin:** Panel propio en `/admin/*`
- **Email:** Nodemailer (ya instalado)
- **SIN i18n:** El sitio es solo en español, sin next-intl ni prefijos de locale

## ⚠️ Regla de Oro — NO TOCAR EL FRONTEND
El sitio visual está TERMINADO y desplegado en producción. Cada componente en 
`src/components/` debe mantenerse idéntico. La integración de Supabase ocurre 
ÚNICAMENTE en la capa de datos:
- `src/lib/citas.ts` — reemplazar fs/JSON por Supabase
- `src/app/admin/*` — agregar autenticación Supabase (reemplazar Basic Auth)
- `src/actions/*` — actualizar para usar Supabase client
- Agregar nuevos módulos admin sin modificar páginas públicas

## 📝 Reglas de Desarrollo
1. **Planificación primero:** Antes de crear archivos, presenta siempre un plan.
2. **Preservar componentes:** NUNCA modificar archivos en `src/components/` salvo bugs.
3. **Next.js estricto:** Solo `.tsx`/`.ts`. Server Components por defecto. 
   `'use client'` solo cuando sea necesario.
4. **Sin deploy sin aprobación:** Validar siempre en localhost antes de Vercel.
5. **Migraciones incrementales:** Un módulo a la vez. Primero citas, luego proyectos, 
   luego equipo, luego servicios.

## 🗄️ Arquitectura Supabase (A IMPLEMENTAR)
- SITE_ID: `00000000-0000-0000-0000-000000000001`
- `createClient()` — Server Components y Server Actions (usa cookies)
- `createServiceClient()` — API routes con permisos elevados (service role)
- `createBrowserSupabaseClient()` — Client Components
- Upload de archivos: siempre via `/api/admin/upload` con service role
- Auth admin: Supabase Auth (reemplazar Basic Auth del middleware.ts actual)

## 🗃️ Tablas Supabase (A CREAR)
- `citas` — migración directa desde el JSON actual (campos ya definidos en types/citas.ts)
- `proyectos` — portafolio: slug, título, tipología, descripción, imágenes[], destacado, orden
- `equipo` — Laura Maya y Juan Esteban Ramírez: nombre, rol, bio, foto, orden
- `servicios` — 6 tipologías: nombre, slug_anchor, descripción, imagen_hero, orden
- `site_settings` — configuración global clave-valor
- `blog_posts` — artículos del estudio (futuro)

## 📁 Estructura Admin (ACTUAL → OBJETIVO)
### Ya existe:
- `/admin/citas` — panel de citas (funciona con JSON, migrar a Supabase)

### Por crear:
- `/admin/login` — autenticación Supabase (reemplazar Basic Auth)
- `/admin/proyectos` — CRUD portafolio
- `/admin/equipo` — CRUD equipo  
- `/admin/servicios` — CRUD tipologías
- `/admin/configuracion` — editor site_settings

## 🔄 Mapa de Migración
El archivo `src/lib/citas.ts` ya tiene comentarios `→ Supabase` en cada función.
Seguir ese patrón para la migración:

getCitas()        → supabase.from('citas').select('*').order('fecha')
createCita()      → supabase.from('citas').insert([nueva]).select().single()
updateEstadoCita() → supabase.from('citas').update({ estado }).eq('id', id)
getDisponibilidad() → supabase.from('citas').select('fecha,hora').eq('fecha', fecha)