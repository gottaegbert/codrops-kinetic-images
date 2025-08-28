'use client'

import { useEffect } from 'react'

export default function StudioPage() {
  useEffect(() => {
    // 在开发环境，重定向到Studio开发服务器
    if (process.env.NODE_ENV === 'development') {
      window.location.href = 'http://localhost:3333'
    } else {
      // 在生产环境，使用静态构建的Studio
      window.location.href = '/studio/index.html'
    }
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div>
        <h2>Redirecting to Sanity Studio...</h2>
        <p>
          {process.env.NODE_ENV === 'development' 
            ? 'Redirecting to development studio at localhost:3333...' 
            : 'Redirecting to studio...'}
        </p>
        <p>
          If not redirected: 
          <a href={process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : '/studio/index.html'}>
            click here
          </a>
        </p>
      </div>
    </div>
  )
}
