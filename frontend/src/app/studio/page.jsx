'use client';

import { useEffect, useState } from 'react';

export default function StudioPage() {
  const [studioUrl, setStudioUrl] = useState('');

  useEffect(() => {
    // Get current hostname and build studio URL
    const hostname = window.location.hostname;
    const url = `http://${hostname}:3333`;
    setStudioUrl(url);
    
    // Redirect after a short delay
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ 
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>正在跳转到 Sanity Studio...</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          如果没有自动跳转，请点击下面的链接：
        </p>
        <a 
          href={studioUrl} 
          style={{ 
            color: '#0066cc', 
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.target.style.textDecoration = 'none'}
        >
          {studioUrl || '正在获取地址...'}
        </a>
      </div>
    </div>
  );
}
