'use client';

/**
 * This route redirects to the standalone Sanity Studio
 * Since we don't have next-sanity installed, we'll redirect to the external studio
 */

import { useEffect } from 'react';

export default function StudioPage() {
  useEffect(() => {
    // Redirect to the external Sanity Studio
    window.location.href = 'https://makaleidos-gallery.sanity.studio';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif',
      background: '#f0f0f0'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <h1 style={{ margin: '0 0 1rem 0', color: '#333' }}>
          MaKaleidos Studio
        </h1>
        <p style={{ margin: '0 0 1.5rem 0', color: '#666' }}>
          Redirecting to Sanity Studio...
        </p>
        <p style={{ margin: '0', fontSize: '14px', color: '#888' }}>
          If you're not redirected automatically, 
          <br />
          <a 
            href="https://makaleidos-gallery.sanity.studio" 
            style={{ color: '#0066cc', textDecoration: 'none' }}
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}
