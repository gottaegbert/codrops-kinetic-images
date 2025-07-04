'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Header, Footer } from '@/components/ui/modules';

const Scene = dynamic(() => import('@/webgl/Scene'), { ssr: false });

export function Layout({ children }) {
    const ref = useRef(null);
    const pathname = usePathname();

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                touchAction: 'auto',
            }}
        >
            <Header>
                <div>
                    <p>Codrops - Kinetic Images</p>
                </div>
            </Header>
            {children}
            <Scene
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1,
                }}
                eventSource={ref}
                eventPrefix="client"
            />
            <Footer>
                <a href="./" className={pathname === '/' ? 'active' : ''}>
                    Tower
                </a>
                <a href="./paper" className={pathname === '/paper' ? 'active' : ''}>
                    Paper
                </a>
                <a href="./spiral" className={pathname === '/spiral' ? 'active' : ''}>
                    Spiral
                </a>
            </Footer>
        </div>
    );
}
