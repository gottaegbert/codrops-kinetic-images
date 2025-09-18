import { useEffect, useState } from 'react'
import { client } from '@/sanity/client'
import { aboutPageQuery } from '@/sanity/queries/about'

export function useAboutContent() {
    const [aboutContent, setAboutContent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetchAboutContent = async () => {
            try {
                setLoading(true)
                const data = await client.fetch(aboutPageQuery)
                if (isMounted) {
                    setAboutContent(data)
                    setError(null)
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Error fetching about content:', err)
                    setError(err.message)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchAboutContent()

        return () => {
            isMounted = false
        }
    }, [])

    return {
        aboutContent,
        loading,
        error
    }
}
