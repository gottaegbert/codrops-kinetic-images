import { useState, useEffect } from 'react'
import { client } from '@/sanity/client'
import { CURRENT_EXHIBITION_QUERY } from '@/sanity/queries'

export function useCurrentExhibition() {
  const [exhibition, setExhibition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCurrentExhibition() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(CURRENT_EXHIBITION_QUERY)
        setExhibition(data)
      } catch (err) {
        console.error('Error fetching current exhibition:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentExhibition()
  }, [])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await client.fetch(CURRENT_EXHIBITION_QUERY)
      setExhibition(data)
    } catch (err) {
      console.error('Error fetching current exhibition:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { exhibition, loading, error, refetch }
}