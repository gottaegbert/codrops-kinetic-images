'use client';

import { useState, useEffect } from 'react';
import { client, getOptimizedImageUrl } from '@/sanity/client';
import { CURRENT_EXHIBITION_QUERY } from '@/sanity/queries';

export default function DebugPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log('Fetching current exhibition...');
                const result = await client.fetch(CURRENT_EXHIBITION_QUERY);
                console.log('Raw result:', result);
                setData(result);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div style={{padding: '20px'}}>Loading...</div>;
    if (error) return <div style={{padding: '20px', color: 'red'}}>Error: {error}</div>;

    return (
        <div style={{padding: '20px', fontFamily: 'monospace'}}>
            <h1>Sanity Debug Page</h1>
            
            <h2>Raw Data:</h2>
            <pre style={{background: '#f5f5f5', padding: '10px', overflow: 'auto'}}>
                {JSON.stringify(data, null, 2)}
            </pre>

            {data && (
                <>
                    <h2>Exhibition Info:</h2>
                    <p>Title: {data.title}</p>
                    <p>Artist: {data.artist}</p>
                    <p>Images Count: {data.images?.length || 0}</p>

                    {data.images && data.images.length > 0 && (
                        <>
                            <h2>Images:</h2>
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px'}}>
                                {data.images.map((image, index) => {
                                    const imageUrl = getOptimizedImageUrl(image, {
                                        width: 200,
                                        height: 200,
                                        quality: 80
                                    });
                                    
                                    return (
                                        <div key={index} style={{border: '1px solid #ccc', padding: '10px'}}>
                                            <h4>Image {index + 1}</h4>
                                            <p>Title: {image.title || 'No title'}</p>
                                            <p>Alt: {image.alt || 'No alt text'}</p>
                                            <p>Asset ID: {image.asset?._id || 'No asset'}</p>
                                            <p>URL: {imageUrl || 'No URL generated'}</p>
                                            {imageUrl && (
                                                <img 
                                                    src={imageUrl} 
                                                    alt={image.alt || `Image ${index + 1}`}
                                                    style={{width: '100%', height: 'auto'}}
                                                    onError={(e) => {
                                                        console.error('Image load error:', e);
                                                        e.target.style.border = '2px solid red';
                                                    }}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
