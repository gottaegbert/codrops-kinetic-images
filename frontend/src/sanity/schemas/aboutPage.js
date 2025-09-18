export default {
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    fields: [
        {
            name: 'heading',
            title: 'Heading',
            type: 'object',
            validation: (Rule) => Rule.required(),
            fields: [
                {
                    name: 'en',
                    title: 'Heading (English)',
                    type: 'string',
                    validation: (Rule) => Rule.required().max(120)
                },
                {
                    name: 'zh',
                    title: 'Heading (Chinese)',
                    type: 'string',
                    validation: (Rule) => Rule.required().max(120)
                }
            ]
        },
        {
            name: 'body',
            title: 'Body',
            type: 'object',
            validation: (Rule) => Rule.required(),
            fields: [
                {
                    name: 'en',
                    title: 'Body (English)',
                    type: 'array',
                    validation: (Rule) => Rule.required().min(1),
                    of: [{ type: 'block' }]
                },
                {
                    name: 'zh',
                    title: 'Body (Chinese)',
                    type: 'array',
                    validation: (Rule) => Rule.required().min(1),
                    of: [{ type: 'block' }]
                }
            ]
        }
    ],
    initialValue: {
        heading: {
            en: 'About MaKaleidos',
            zh: '关于 MaKaleidos'
        },
        body: {
            en: [
                {
                    _type: 'block',
                    _key: 'enParagraph1',
                    style: 'normal',
                    markDefs: [],
                    children: [
                        {
                            _type: 'span',
                            _key: 'enParagraph1Span1',
                            text: 'MaKaleidos is an online gallery devoted to small-scale art and works on paper. Its vision extends beyond the framework of a gallery, moving with the rhythm of a light magazine. Each exhibition unfolds not only through the presentation of artworks but also through texts, interviews, and reflections that trace the undercurrents of an artist\'s ideas. Our interviews do not stop at the studio: they move outward into the wider terrain of each artist\'s inner world--literature, philosophy, music, and other influences that shape their sensibility.',
                            marks: []
                        }
                    ]
                },
                {
                    _type: 'block',
                    _key: 'enParagraph2',
                    style: 'normal',
                    markDefs: [],
                    children: [
                        {
                            _type: 'span',
                            _key: 'enParagraph2Span1',
                            text: 'Like the works it shows, MaKaleidos is intimate in scale but expansive in resonance. Writers, curators, and viewers are invited to join the conversation through reviews and responses that deepen the dialogue around paper-based and small-format art. In this way, the platform becomes a space of exchange--open, layered, and borderless.',
                            marks: []
                        }
                    ]
                },
                {
                    _type: 'block',
                    _key: 'enParagraph3',
                    style: 'normal',
                    markDefs: [],
                    children: [
                        {
                            _type: 'span',
                            _key: 'enParagraph3Span1',
                            text: 'The name combines Ma--the Japanese aesthetic principle of the pause or interval, which here also suggests the intimacy of a small space--with Kaleidos, from kaleidoscope, a figure of multiplicity. Together, they express our aim: to reveal how even the smallest space can hold a multitude of voices and visions.',
                            marks: []
                        }
                    ]
                }
            ],
            zh: [
                {
                    _type: 'block',
                    _key: 'zhParagraph1',
                    style: 'normal',
                    markDefs: [],
                    children: [
                        {
                            _type: 'span',
                            _key: 'zhParagraph1Span1',
                            text: 'MaKaleidos 是一家专注于纸上作品和小型艺术的线上画廊。但它不仅仅以画廊的框架运作，还以"轻杂志"的脉动展开。每一次展览不仅通过作品呈现，同时伴随文字、访谈与评论，追溯艺术家思想的潜流。我们的采访也不限于艺术实践本身，而是延伸至他们更广阔的精神世界--文学、哲学、音乐与其他滋养他们感性的源泉。',
                            marks: []
                        }
                    ]
                },
                {
                    _type: 'block',
                    _key: 'zhParagraph2',
                    style: 'normal',
                    markDefs: [],
                    children: [
                        {
                            _type: 'span',
                            _key: 'zhParagraph2Span1',
                            text: '如同我们展出的作品一样，MaKaleidos 规模亲密，却回响深远。我们邀请作家、策展人和观众加入对话，通过评论与回应不断加深围绕纸上与小型艺术的讨论。由此，这个平台成为一个交流的场所--开放、多层、无国界。',
                            marks: []
                        }
                    ]
                },
                {
                    _type: 'block',
                    _key: 'zhParagraph3',
                    style: 'normal',
                    markDefs: [],
                    children: [
                        {
                            _type: 'span',
                            _key: 'zhParagraph3Span1',
                            text: '名字中的 Ma 源自日本美学概念，意为"间隙"或"停顿"，在这里也象征一个亲密的小空间; Kaleidos 来自"万花筒"，象征多样与变化。二者结合，表达了我们的目标: 展现出即便在最小的空间中，也能容纳多重的声音与视野。',
                            marks: []
                        }
                    ]
                }
            ]
        }
    },
    preview: {
        select: {
            title: 'heading.en'
        },
        prepare(selection) {
            const { title } = selection
            return {
                title: title || 'About Page Content'
            }
        }
    }
}
