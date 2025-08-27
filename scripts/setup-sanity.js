#!/usr/bin/env node

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k2sljkbk',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
})

async function testConnection() {
  try {
    console.log('Testing Sanity connection...')
    console.log('Project ID:', 'k2sljkbk')
    console.log('Dataset:', 'production')
    
    const result = await client.fetch('*[_type == "sanity.imageAsset"][0]')
    console.log('✅ Connection successful!')
    console.log('Studio URL: http://localhost:3000/studio')
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    console.log('\nTroubleshooting:')
    console.log('1. Make sure your project ID is correct: k2sljkbk')
    console.log('2. Check if the dataset "production" exists')
    console.log('3. Verify your Sanity project at https://sanity.io/manage')
  }
}

testConnection()
