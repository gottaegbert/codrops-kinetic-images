'use client';

import { useState } from 'react';
import { client } from '@/sanity/client';

export default function TestSanity() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        try {
            // 测试基本连接
            const basicTest = await client.fetch('*[_type == "exhibition"]');
            console.log('Basic test result:', basicTest);
            
            // 测试所有展览的详细信息
            const allExhibitionsDetailed = await client.fetch(`
                *[_type == "exhibition"] {
                    _id,
                    title,
                    isCurrent,
                    "imageCount": count(images),
                    images[0...2] {
                        asset->{_id, url},
                        alt,
                        title
                    }
                }
            `);
            console.log('All exhibitions detailed:', allExhibitionsDetailed);
            
            // 测试当前展览查询
            const currentExhibition = await client.fetch(`
                *[_type == "exhibition" && isCurrent == true][0] {
                    _id,
                    title,
                    isCurrent,
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
            `);
            console.log('Current exhibition test:', currentExhibition);
            
            setResult(JSON.stringify({
                allExhibitions: basicTest,
                allExhibitionsDetailed: allExhibitionsDetailed,
                currentExhibition: currentExhibition
            }, null, 2));
            
        } catch (error) {
            console.error('Test error:', error);
            setResult(`Error: ${error.message}\n\nStack: ${error.stack}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <h1>Sanity Connection Test</h1>
            <button onClick={testConnection} disabled={loading}>
                {loading ? 'Testing...' : 'Test Sanity Connection'}
            </button>
            
            {result && (
                <pre style={{
                    background: '#f5f5f5', 
                    padding: '20px', 
                    marginTop: '20px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap'
                }}>
                    {result}
                </pre>
            )}
        </div>
    );
}
