import { useState, useEffect } from 'react'
import { client } from '@/sanity/client'
import { ALL_EXHIBITIONS_QUERY, EXHIBITION_BY_SLUG_QUERY } from '@/sanity/queries/exhibition'

export function useExhibitions() {
  const [exhibitions, setExhibitions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchExhibitions() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(ALL_EXHIBITIONS_QUERY)
        setExhibitions(data || [])
      } catch (err) {
        console.error('Error fetching exhibitions:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchExhibitions()
  }, [])

  return { exhibitions, loading, error, refetch: fetchExhibitions }
}

export function useExhibitionBySlug(slug) {
  const [exhibition, setExhibition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    async function fetchExhibition() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(EXHIBITION_BY_SLUG_QUERY, { slug })
        setExhibition(data)
      } catch (err) {
        console.error('Error fetching exhibition:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchExhibition()
  }, [slug])

  return { exhibition, loading, error }
}