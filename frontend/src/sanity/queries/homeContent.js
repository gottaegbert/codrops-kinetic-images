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
      title
    },
    exhibitionCard,
    pressRelease,
    biography,
    statement,
    selectedExhibition,
    selectedPress,
    interview
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
    title
  },
  exhibitionCard,
  pressRelease,
  biography,
  statement,
  selectedExhibition,
  selectedPress,
  interview
}`

export const siteTranslationsQuery = `*[_type == "siteTranslations" && isActive == true] {
  _id,
  key,
  category,
  translations,
  isActive
}`