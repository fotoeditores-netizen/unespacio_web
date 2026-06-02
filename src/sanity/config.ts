import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  title: 'UnEspacio Arquitectos',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Panel de Administración')
          .items([
            S.listItem()
              .title('Proyectos del Portafolio')
              .icon(() => '🏛️')
              .child(
                S.documentList()
                  .title('Proyectos')
                  .filter('_type == "project"')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
