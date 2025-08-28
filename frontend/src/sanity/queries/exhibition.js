// GROQ queries for exhibitions and exhibition images

// Get current exhibition with images
export const CURRENT_EXHIBITION_QUERY = `
  *[_type == "exhibition" && status == "current"][0] {
    _id,
    title,
    slug,
    description,
    artist,
    curator,
    venue,
    startDate,
    endDate,
    coverImage {
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
      hotspot
    },
    "images": *[_type == "exhibitionImage" && exhibition._ref == ^._id] | order(order asc, _createdAt asc) {
      _id,
      title,
      image {
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
        hotspot
      },
      artworkTitle,
      medium,
      dimensions,
      year,
      description,
      order,
      featured,
      tags
    }
  }
`

// Get exhibition by slug
export const EXHIBITION_BY_SLUG_QUERY = `
  *[_type == "exhibition" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    artist,
    curator,
    venue,
    startDate,
    endDate,
    status,
    coverImage {
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
      hotspot
    },
    "images": *[_type == "exhibitionImage" && exhibition._ref == ^._id] | order(order asc, _createdAt asc) {
      _id,
      title,
      image {
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
        hotspot
      },
      artworkTitle,
      medium,
      dimensions,
      year,
      description,
      order,
      featured,
      tags
    }
  }
`

// Get all exhibitions (for listing/navigation)
export const ALL_EXHIBITIONS_QUERY = `
  *[_type == "exhibition"] | order(startDate desc) {
    _id,
    title,
    slug,
    description,
    artist,
    status,
    startDate,
    endDate,
    coverImage {
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
      hotspot
    },
    "imageCount": count(*[_type == "exhibitionImage" && exhibition._ref == ^._id])
  }
`

// Get exhibition images for a specific exhibition
export const EXHIBITION_IMAGES_QUERY = `
  *[_type == "exhibitionImage" && exhibition._ref == $exhibitionId] | order(order asc, _createdAt asc) {
    _id,
    title,
    image {
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
      hotspot
    },
    artworkTitle,
    medium,
    dimensions,
    year,
    description,
    order,
    featured,
    tags,
    exhibition-> {
      title,
      slug
    }
  }
`

// Get featured images across all exhibitions
export const FEATURED_IMAGES_QUERY = `
  *[_type == "exhibitionImage" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    image {
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
      hotspot
    },
    artworkTitle,
    description,
    exhibition-> {
      title,
      slug,
      artist
    }
  }
`