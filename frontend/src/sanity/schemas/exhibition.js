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
      name: 'detailImages',
      title: 'Detail Images',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true,
          metadata: ['blurhash', 'lqip', 'palette']
        },
        fields: [
          {
            name: 'description',
            title: 'Detail Description',
            type: 'text',
            rows: 2,
            description: 'Description of this specific detail（网页会显示）'
          },
          {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Describe the detail image for accessibility'
          },
          {
            name: 'title',
            title: 'Detail Title',
            type: 'string',
            description: 'Optional title for this detail image'
          }
         
        ]
      }],
      options: {
        layout: 'grid'
      },
      description: 'Upload up to 10 detail images for this exhibition'
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
    },
    // Exhibition Card Information
    {
      name: 'exhibitionCard',
      title: 'Exhibition Card Info',
      type: 'object',
      fields: [
        {
          name: 'number',
          title: 'Exhibition Number',
          type: 'string',
          description: 'e.g., "202507"'
        },
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date'
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date'
        },
        {
          name: 'featuredArtists',
          title: 'Featured Artists',
          type: 'object',
          fields: [
            {
              name: 'en',
              title: 'English',
              type: 'string'
            },
            {
              name: 'zh',
              title: 'Chinese',
              type: 'string'
            }
          ]
        },
        {
          name: 'cardDescription',
          title: 'Card Description',
          type: 'object',
          fields: [
            {
              name: 'en',
              title: 'English',
              type: 'text'
            },
            {
              name: 'zh',
              title: 'Chinese',
              type: 'text'
            }
          ]
        }
      ]
    },
    // Exhibition Content Fields
    {
      name: 'pressRelease',
      title: 'Press Release',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Content',
          type: 'array',
          of: [{ type: 'block' }]
        },
        {
          name: 'zh',
          title: 'Chinese Content',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      name: 'interview',
      title: 'Interview',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Content',
          type: 'array',
          of: [{ type: 'block' }]
        },
        {
          name: 'zh',
          title: 'Chinese Content',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      name: 'statement',
      title: 'Statement',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Content',
          type: 'array',
          of: [{ type: 'block' }]
        },
        {
          name: 'zh',
          title: 'Chinese Content',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Content',
          type: 'array',
          of: [{ type: 'block' }]
        },
        {
          name: 'zh',
          title: 'Chinese Content',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      name: 'selectedExhibition',
      title: 'Selected Exhibition',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Content',
          type: 'array',
          of: [{ type: 'block' }]
        },
        {
          name: 'zh',
          title: 'Chinese Content',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      name: 'selectedPress',
      title: 'Selected Press',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Content',
          type: 'array',
          of: [{ type: 'block' }]
        },
        {
          name: 'zh',
          title: 'Chinese Content',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    // Artist Resume PDF
    {
      name: 'artistResume',
      title: 'Artist Resume (PDF)',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Resume',
          type: 'file',
          options: {
            accept: '.pdf'
          },
          description: 'Upload artist resume in PDF format (English)'
        },
        {
          name: 'zh',
          title: 'Chinese Resume',
          type: 'file',
          options: {
            accept: '.pdf'
          },
          description: 'Upload artist resume in PDF format (Chinese)'
        }
      ],
      description: 'Upload artist resume PDFs for download on the homepage'
    },
  
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
