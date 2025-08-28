import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from '../frontend/src/sanity/schemas/index.js'

export default defineConfig({
  name: 'makaleidos-cms',
  title: 'MaKaleidos Gallery',
  projectId: 'k2sljkbk',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Gallery Management')
          .items([
            S.listItem()
              .title('📁 Exhibitions')
              .child(S.documentTypeList('exhibition').title('All Exhibitions')),
            S.divider(),
            S.listItem()
              .title('📷 Media Library')
              .child(S.component().component(() => null).id('media'))
          ])
    }),
    visionTool(),
    media()
  ],
  schema: {
    types: schemaTypes,
  }
})
