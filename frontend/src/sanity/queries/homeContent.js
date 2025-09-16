export const homePageQuery = `*[_type == "homePageContent"][0] {
  _id,
  currentExhibition->{
    _id,
    title,
    slug,
    description,
    artist,
    date,
    isCurrent,
  images[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    alt,
    title,
    detailImages[] {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      title,
      description
    }
  },
  exhibitionCard,
    pressRelease {
      title { en, zh },
      featuredImage,
      en,
      zh
    },
    biography,
    statement,
    selectedExhibition,
    selectedPress,
    interview,
    scrollbar {
      items[]{ en, zh }
    }
  },
  heroSection,
  contentNavigation,
  seoSettings,
  lastUpdated
}`

export const currentExhibitionQuery = `*[_type == "exhibition" && isCurrent == true][0] {
  _id,
  title,
  slug,
  description,
  artist,
  date,
  isCurrent,
  images[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    alt,
    title,
    detailImages[] {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      title,
      description
    }
  },
  exhibitionCard,
  pressRelease {
    title { en, zh },
    featuredImage,
    en,
    zh
  },
  biography,
  statement,
  selectedExhibition,
  selectedPress,
  interview {
    title { en, zh },
    featuredImage,
    introduction { en, zh },
    content { en, zh },
    chat { en, zh }
  },
  scrollbar {
    items[]{ en, zh }
  },
  artistResume {
    en {
      asset->{
        _id,
        url,
        originalFilename,
        size
      }
    },
    zh {
      asset->{
        _id,
        url,
        originalFilename,
        size
      }
    }
  }
}`

export const siteTranslationsQuery = `*[_type == "siteTranslations" && isActive == true] {
  _id,
  key,
  category,
  translations,
  isActive
}`
