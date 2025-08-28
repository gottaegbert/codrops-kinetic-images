import { client } from '../client'

// Seed translations from the existing LanguageContext
const translationSeeds = [
  // Navigation
  { key: 'navigation.home', category: 'navigation', en: 'Home', zh: '首页' },
  { key: 'navigation.about', category: 'navigation', en: 'About', zh: '关于' },
  { key: 'navigation.exhibitions', category: 'navigation', en: 'Exhibitions', zh: '展览' },
  { key: 'navigation.news', category: 'navigation', en: 'News', zh: '新闻' },
  { key: 'navigation.review', category: 'navigation', en: 'Review', zh: '评论' },
  { key: 'navigation.archive', category: 'navigation', en: 'Archive', zh: '档案' },
  { key: 'navigation.contact', category: 'navigation', en: 'Contact', zh: '联系' },

  // Home page
  { key: 'home.title', category: 'home', en: 'MaKaleidos', zh: 'MaKaleidos' },
  { key: 'home.scrollHint', category: 'home', en: 'Scroll Navigating', zh: '滚动导航' },
  { key: 'home.onThisPage', category: 'home', en: 'On this page:', zh: '本页内容：' },
  { key: 'home.press', category: 'home', en: 'Press', zh: '媒体报道' },
  { key: 'home.interview', category: 'home', en: 'Interview', zh: '访谈' },
  { key: 'home.biography', category: 'home', en: 'Biography', zh: '艺术家简介' },
  { key: 'home.selectedExhibition', category: 'home', en: 'Selected Exhibition', zh: '精选展览' },

  // Exhibition Card
  { key: 'exhibitionCard.currentExhibition', category: 'exhibitionCard', en: 'Current Exhibition', zh: '当前展览' },
  { key: 'exhibitionCard.paintings', category: 'exhibitionCard', en: 'Paintings', zh: '绘画作品' },
  { key: 'exhibitionCard.number', category: 'exhibitionCard', en: 'No.', zh: '编号' },
  { key: 'exhibitionCard.duration', category: 'exhibitionCard', en: 'Duration:', zh: '展期：' },
  { key: 'exhibitionCard.featuredArtists', category: 'exhibitionCard', en: 'Featured Artists:', zh: '参展艺术家：' },
  { key: 'exhibitionCard.learnMore', category: 'exhibitionCard', en: 'Learn More', zh: '了解更多' },

  // About
  { key: 'about.title', category: 'about', en: 'About MaKaleidos', zh: '关于 MaKaleidos' },
  { key: 'about.subtitle', category: 'about', en: 'A forward-thinking online gallery and editorial platform for works on paper and small-scale art.', zh: '一家具有前瞻性的线上画廊与编辑平台，专注于纸上作品和小型艺术品。' },
  { key: 'about.contact', category: 'about', en: 'Contact the Gallery', zh: '联系画廊' },

  // Contact
  { key: 'contact.title', category: 'contact', en: 'Contact', zh: '联系我们' },
  { key: 'contact.subtitle', category: 'contact', en: 'Get in touch with MaKaleidos Gallery', zh: '与 MaKaleidos 画廊取得联系' },
  { key: 'contact.info', category: 'contact', en: 'Contact Information', zh: '联系信息' },
  { key: 'contact.email', category: 'contact', en: 'Email: info@makaleidos.com', zh: '邮箱：info@makaleidos.com' },
  { key: 'contact.inquiries', category: 'contact', en: 'For submissions and inquiries', zh: '投稿与咨询' },

  // Footer
  { key: 'footer.description', category: 'footer', en: 'Contemporary art gallery reimagining the digital exhibition experience.', zh: '重新构想数字展览体验的当代艺术画廊。' },
  { key: 'footer.gallery', category: 'footer', en: 'Gallery', zh: '画廊' },
  { key: 'footer.currentExhibitions', category: 'footer', en: 'Current Exhibitions', zh: '当前展览' },
  { key: 'footer.featuredArtists', category: 'footer', en: 'Featured Artists', zh: '特色艺术家' },
  { key: 'footer.collections', category: 'footer', en: 'Collections', zh: '收藏' },
  { key: 'footer.content', category: 'footer', en: 'Content', zh: '内容' },
  { key: 'footer.artMagazine', category: 'footer', en: 'Art Magazine', zh: '艺术杂志' },
  { key: 'footer.artistInterviews', category: 'footer', en: 'Artist Interviews', zh: '艺术家访谈' },
  { key: 'footer.exhibitionArchive', category: 'footer', en: 'Exhibition Archive', zh: '展览档案' },
  { key: 'footer.archive', category: 'footer', en: 'Archive', zh: '档案' },
  { key: 'footer.connect', category: 'footer', en: 'Connect', zh: '联系' },
  { key: 'footer.aboutUs', category: 'footer', en: 'About Us', zh: '关于我们' },
  { key: 'footer.contact', category: 'footer', en: 'Contact', zh: '联系我们' },
  { key: 'footer.newsletter', category: 'footer', en: 'Newsletter', zh: '订阅通讯' },
  { key: 'footer.copyright', category: 'footer', en: '© 2025 MaKaleidos. All rights reserved.', zh: '© 2025 MaKaleidos. 版权所有。' },
  { key: 'footer.tower', category: 'footer', en: 'Tower', zh: '塔楼' },
  { key: 'footer.paper', category: 'footer', en: 'Paper', zh: '纸张' },
  { key: 'footer.spiral', category: 'footer', en: 'Spiral', zh: '螺旋' },

  // Exhibitions
  { key: 'exhibitions.title', category: 'exhibitions', en: 'Exhibitions', zh: '展览' },
  { key: 'exhibitions.subtitle', category: 'exhibitions', en: 'Virtual exhibitions and digital art experiences', zh: '虚拟展览与数字艺术体验' },
  { key: 'exhibitions.current', category: 'exhibitions', en: 'Current Exhibitions', zh: '当前展览' },
  { key: 'exhibitions.description', category: 'exhibitions', en: 'Explore our current virtual exhibitions featuring contemporary artists and their works on paper and small-scale art.', zh: '探索我们当前的虚拟展览，展示当代艺术家的纸上作品和小型艺术品。' }
]

export async function seedTranslations() {
  console.log('Starting translation seeding...')
  
  try {
    // Create documents in batches
    const batch = translationSeeds.map(translation => ({
      _type: 'siteTranslations',
      key: translation.key,
      category: translation.category,
      translations: {
        en: translation.en,
        zh: translation.zh
      },
      isActive: true,
      description: `Auto-migrated from LanguageContext for ${translation.category}`
    }))

    const result = await client.createOrReplace(batch)
    console.log(`Successfully seeded ${batch.length} translations`)
    return result
  } catch (error) {
    console.error('Error seeding translations:', error)
    throw error
  }
}

// Run this function to seed the translations
if (typeof window === 'undefined') {
  seedTranslations().then(() => {
    console.log('Translation seeding completed!')
    process.exit(0)
  }).catch(error => {
    console.error('Translation seeding failed:', error)
    process.exit(1)
  })
}