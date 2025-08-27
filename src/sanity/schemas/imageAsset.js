export default {
  name: 'imageAsset',
  title: 'Image Asset',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(1).max(100)
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enable hotspot for better cropping
        metadata: ['blurhash', 'lqip', 'palette'] // Extract metadata for optimization
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required().min(1).max(200),
          description: 'Important for SEO and accessibility'
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Gallery Images', value: 'gallery' },
          { title: 'Hero Images', value: 'hero' },
          { title: 'Thumbnails', value: 'thumbnail' },
          { title: 'Banners', value: 'banner' },
          { title: 'Backgrounds', value: 'background' }
        ]
      },
      initialValue: 'gallery',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional description for internal use'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to control the order of images in the gallery (lower numbers appear first)',
      validation: Rule => Rule.integer().min(0)
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Tags for better organization and search'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category'
    },
    prepare(selection) {
      const { title, media, category } = selection
      return {
        title: title,
        subtitle: `Category: ${category}`,
        media: media
      }
    }
  }
}
