// Simple queries for exhibition system

// Get current exhibition
export const CURRENT_EXHIBITION_QUERY = `
  *[_type == "exhibition" && isCurrent == true][0] {
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
          lqip,
          blurhash,
          palette
        }
      },
      alt,
      title,
      hotspot
    },
    detailImages[] {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip,
          blurhash,
          palette
        }
      },
      alt,
      title,
      description,
      hotspot
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
  }
`

// Get all exhibitions
export const ALL_EXHIBITIONS_QUERY = `
  *[_type == "exhibition"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    artist,
    date,
    isCurrent,
    "imageCount": count(images),
    "firstImage": images[0] {
      asset->{
        _id,
        url
      }
    }
  }
`
