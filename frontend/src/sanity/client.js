import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k2sljkbk',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Enable CDN for better performance and CORS support
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN, // Optional: for authenticated requests
  perspective: 'published', // Only fetch published documents
  stega: false, // Disable stega encoding
})

// Builder for generating image URLs with transformations
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(image, options = {}) {
  if (!image) return null
  
  let url = urlFor(image)
  
  // Apply common optimizations
  if (options.width) url = url.width(options.width)
  if (options.height) url = url.height(options.height)
  if (options.quality) url = url.quality(options.quality)
  if (options.format) url = url.format(options.format)
  if (options.fit) url = url.fit(options.fit)
  
  // Default optimizations
  if (!options.quality) url = url.quality(85)
  if (!options.format) url = url.format('webp')
  
  return url.url()
}
