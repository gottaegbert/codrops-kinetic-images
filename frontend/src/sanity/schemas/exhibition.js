export default {
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Exhibition Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., "Exhibition 1", "Exhibition 2"'
    },
    {
      name: 'slug',
      title: 'Folder Name',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 50,
      },
      validation: Rule => Rule.required(),
      description: 'This will be used as the folder name (e.g., "exhibition1")'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'isCurrent',
      title: 'Current Exhibition',
      type: 'boolean',
      description: 'Check this to display on the homepage',
      initialValue: false
    },
    {
      name: 'images',
      title: 'Exhibition Images',
      type: 'array',
      of: [{
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
            description: 'Describe the image for accessibility'
          },
          {
            name: 'title',
            title: 'Image Title',
            type: 'string'
          }
        ]
      }],
      options: {
        layout: 'grid'
      },
      description: 'Upload up to 10 images for this exhibition'
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'string'
    },
    {
      name: 'date',
      title: 'Exhibition Date',
      type: 'date'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      isCurrent: 'isCurrent'
    },
    prepare(selection) {
      const { title, media, isCurrent } = selection
      return {
        title: title,
        subtitle: isCurrent ? '🟢 Current Exhibition' : '⚪ Exhibition',
        media: media
      }
    }
  }
}