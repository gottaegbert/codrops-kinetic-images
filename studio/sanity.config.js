import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from '../sanity/schemas/index.js'

const config = defineConfig({
  name: 'makaleidos-cms',
  title: 'MaKaleidos CMS',
  projectId: 'k2sljkbk',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Image Assets')
              .child(
                S.documentTypeList('imageAsset')
                  .title('Image Assets')
                  .filter('_type == "imageAsset"')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['imageAsset'].includes(listItem.getId())
            ),
          ])
    }),
    visionTool(),
    media()
  ],
  schema: {
    types: schemaTypes,
  },
})

export default config
