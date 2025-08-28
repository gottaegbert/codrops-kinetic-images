import { useState, useEffect } from 'react'
import { client } from '../sanity/client'
import { currentExhibitionQuery } from '../sanity/queries/homeContent'

export function useHomeContent() {
  const [currentExhibition, setCurrentExhibition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        setLoading(true)
        
        // Get current exhibition directly
        const currentExh = await client.fetch(currentExhibitionQuery)
        if (currentExh) {
          setCurrentExhibition(currentExh)
        }
        
        setError(null)
      } catch (err) {
        console.error('Error fetching home content:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeContent()
  }, [])

  return {
    currentExhibition,
    loading,
    error
  }
}