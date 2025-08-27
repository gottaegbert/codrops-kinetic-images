import { useState, useEffect } from 'react'
import { client } from '@/sanity/client'
import { GALLERY_IMAGES_QUERY, IMAGES_BY_CATEGORY_QUERY } from '@/sanity/queries'

export function useSanityImages(category = 'gallery') {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        setError(null)
        
        const query = category === 'gallery' ? GALLERY_IMAGES_QUERY : IMAGES_BY_CATEGORY_QUERY
        const params = category === 'gallery' ? {} : { category }
        
        const data = await client.fetch(query, params)
        setImages(data || [])
      } catch (err) {
        console.error('Error fetching images from Sanity:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [category])

  return { images, loading, error, refetch: () => fetchImages() }
}