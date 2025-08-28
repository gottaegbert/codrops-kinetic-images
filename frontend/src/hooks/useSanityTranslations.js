import { useState, useEffect } from 'react'
import { client } from '../sanity/client'
import { siteTranslationsQuery } from '../sanity/queries/homeContent'

export function useSanityTranslations() {
  const [translations, setTranslations] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true)
        
        const translationData = await client.fetch(siteTranslationsQuery)
        
        // Transform the data into nested object structure
        const translationMap = {}
        
        translationData.forEach(item => {
          const keys = item.key.split('.')
          let current = translationMap
          
          // Create nested structure for each language
          if (!current.en) current.en = {}
          if (!current.zh) current.zh = {}
          
          keys.reduce((acc, key, index) => {
            if (index === keys.length - 1) {
              // Last key - set the value
              if (!acc.en) acc.en = {}
              if (!acc.zh) acc.zh = {}
              acc.en[key] = item.translations.en
              acc.zh[key] = item.translations.zh
            } else {
              // Intermediate key - create object if doesn't exist
              if (!acc.en[key]) acc.en[key] = {}
              if (!acc.zh[key]) acc.zh[key] = {}
              return {
                en: acc.en[key],
                zh: acc.zh[key]
              }
            }
            return acc
          }, { en: current.en, zh: current.zh })
        })
        
        setTranslations(translationMap)
        setError(null)
      } catch (err) {
        console.error('Error fetching translations:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTranslations()
  }, [])

  // Translation function that works with the nested structure
  const t = (key, language = 'en') => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return {
    translations,
    t,
    loading,
    error
  }
}