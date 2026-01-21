export const archiveQuery = `*[_type == "exhibition" && (!defined(isCurrent) || isCurrent == false)] | order(date desc) {
  _id,
  title,
  slug,
  date,
  artist,
  description,
  images[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    alt
  },
  pressRelease {
    featuredImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    }
  },
  interview {
    featuredImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    }
  },
  statement {
    featuredImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    }
  },
  exhibitionCard
}`

export const exhibitionByIdQuery = `*[_type == "exhibition" && _id == $id][0] {
  _id,
  title,
  slug,
  description,
  artist,
  date,
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
