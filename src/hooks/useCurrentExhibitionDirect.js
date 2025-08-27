import { useState, useEffect } from 'react'

export function useCurrentExhibitionDirect() {
  const [exhibition, setExhibition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCurrentExhibition() {
      try {
        setLoading(true)
        setError(null)
        
        // 直接使用fetch API
        const query = encodeURIComponent(`
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
            }
          }
        `)
        
        const response = await fetch(
          `https://k2sljkbk.api.sanity.io/v2024-01-01/data/query/production?query=${query}`
        )
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        setExhibition(data.result)
        
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
      
      const query = encodeURIComponent(`
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
          }
        }
      `)
      
      const response = await fetch(
        `https://k2sljkbk.api.sanity.io/v2024-01-01/data/query/production?query=${query}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setExhibition(data.result)
      
    } catch (err) {
      console.error('Error fetching current exhibition:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { exhibition, loading, error, refetch }
}
