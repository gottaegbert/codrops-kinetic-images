import { useState, useEffect } from 'react'
import { client } from '../sanity/client'
import { archiveQuery, exhibitionByIdQuery } from '../sanity/queries/archive'

export function useArchiveContent() {
  const [archiveItems, setArchiveItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        setLoading(true)
        const data = await client.fetch(archiveQuery)
        setArchiveItems(data || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching archive content:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArchive()
  }, [])

  return {
    archiveItems,
    loading,
    error
  }
}

export function useExhibition(id) {
  const [exhibition, setExhibition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchExhibition = async () => {
      try {
        setLoading(true)
        const data = await client.fetch(exhibitionByIdQuery, { id })
        setExhibition(data)
        setError(null)
      } catch (err) {
        console.error(`Error fetching exhibition ${id}:`, err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchExhibition()
  }, [id])

  return {
    exhibition,
    loading,
    error
  }
}
