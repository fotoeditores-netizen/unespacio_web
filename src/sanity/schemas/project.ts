import { defineField, defineType } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  groups: [
    { name: 'info', title: 'Información general', default: true },
    { name: 'media', title: 'Fotos' },
    { name: 'display', title: 'Visualización' },
  ],
  fields: [
    // ─── Información general ───────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Nombre del proyecto',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'URL del proyecto',
      type: 'slug',
      group: 'info',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Tipología',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Educativa', value: 'Educativa' },
          { title: 'Corporativa', value: 'Corporativa' },
          { title: 'Cultural', value: 'Cultural' },
          { title: 'Salud', value: 'Salud' },
          { title: 'Comercial', value: 'Comercial' },
          { title: 'Residencial', value: 'Residencial' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      group: 'info',
      validation: (Rule) => Rule.min(2000).max(2100),
    }),
    defineField({
      name: 'area',
      title: 'Área construida',
      type: 'string',
      group: 'info',
      description: 'Ej: 41.000 m²',
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'string',
      group: 'info',
      description: 'Ej: Medellín, Colombia',
    }),
    defineField({
      name: 'description',
      title: 'Descripción del proyecto',
      type: 'text',
      group: 'info',
      rows: 4,
    }),

    // ─── Fotos ─────────────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Foto principal (portada)',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo (accesibilidad)',
          description: 'Describe la imagen brevemente. Ej: "Vista exterior del hospital"',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Galería de fotos',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Descripción de la foto',
            }),
          ],
        },
      ],
    }),

    // ─── Visualización ─────────────────────────────────────────────
    defineField({
      name: 'featured',
      title: '¿Destacar en la página de inicio?',
      type: 'boolean',
      group: 'display',
      initialValue: false,
      description: 'Máximo 3 proyectos destacados se muestran en la home.',
    }),
    defineField({
      name: 'featuredSize',
      title: 'Tamaño en el portafolio',
      type: 'string',
      group: 'display',
      options: {
        list: [
          { title: 'Normal (1 columna)', value: 'normal' },
          { title: 'Ancho (2 columnas)', value: 'wide' },
          { title: 'Grande (2 columnas + altura doble)', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      group: 'display',
      description: 'Menor número = aparece primero. Ej: 1, 2, 3...',
      initialValue: 99,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sin título',
        subtitle: subtitle || '',
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Orden personalizado',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Año (más reciente primero)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
})
