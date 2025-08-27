export default {
  name: 'exhibitionImage',
  title: 'Exhibition Image',
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
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette']
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required().min(1).max(200),
          description: 'Important for SEO and accessibility'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'exhibition',
      title: 'Exhibition',
      type: 'reference',
      to: [{ type: 'exhibition' }],
      validation: Rule => Rule.required(),
      description: 'Which exhibition this image belongs to'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which images appear (lower numbers first)',
      validation: Rule => Rule.integer().min(0),
      initialValue: 0
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional description of the artwork or image'
    },
    {
      name: 'artworkTitle',
      title: 'Artwork Title',
      type: 'string',
      description: 'Title of the artwork (if different from image title)'
    },
    {
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'Artwork medium (oil on canvas, digital print, etc.)'
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'Artwork dimensions (e.g., 100 x 150 cm)'
    },
    {
      name: 'year',
      title: 'Year Created',
      type: 'number',
      validation: Rule => Rule.integer().min(1900).max(new Date().getFullYear() + 1)
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
    },
    {
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      description: 'Mark as featured for special display',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      exhibition: 'exhibition.title',
      order: 'order',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, media, exhibition, order, featured } = selection
      return {
        title: title,
        subtitle: `${exhibition || 'No exhibition'} • Order: ${order}${featured ? ' • ⭐' : ''}`,
        media: media
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'asc' }
      ]
    },
    {
      title: 'Date Created (newest first)',
      name: 'dateDesc',
      by: [
        { field: '_createdAt', direction: 'desc' }
      ]
    }
  ]
}