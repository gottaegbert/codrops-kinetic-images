'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header, Footer } from '@/components/ui/modules';
import Link from 'next/link';
import Splash from '@/components/ui/modules/Splash/Splash';

const Scene = dynamic(() => import('@/webgl/Scene'), { ssr: false });

const SPLASH_STORAGE_KEY = 'makaleidosSplashSeen';

export function Layout({ children }) {
    const ref = useRef(null);
    const pathname = usePathname();
    const { t } = useLanguage();
    const [shouldShowSplash, setShouldShowSplash] = useState(false);
    const handleSplashFinish = useCallback(() => {
        setShouldShowSplash(false);
    }, []);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const hasSeenSplash = sessionStorage.getItem(SPLASH_STORAGE_KEY) === 'true';

        if (!hasSeenSplash) {
            sessionStorage.setItem(SPLASH_STORAGE_KEY, 'true');
            setShouldShowSplash(true);
        }

        return undefined;
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                overflow: 'auto',
                touchAction: 'auto',
          
            }}
        >
            {pathname === '/' && shouldShowSplash && <Splash onFinish={handleSplashFinish} />}
            <Header>
                {/* <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        gap: '0.5rem',
                        flexDirection: 'column',
                    }}
                >
                    <h1>Kinetic Images</h1>
                    <nav
                        style={{
                            display: 'flex',
                            width: '100%',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            opacity: 0.6,
                        }}
                    >
                        <a href="https://tympanus.net/codrops/?p=96765">Article</a>
                        <a href="https://github.com/DGFX/codrops-kinetic-images">Code</a>
                        <a href="https://tympanus.net/codrops/demos/">All demos</a>
                    </nav>
                    <nav
                        style={{
                            display: 'flex',
                            width: '100%',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            opacity: 0.6,
                        }}
                    >
                        <a href="https://tympanus.net/codrops/demos/?tag=3d">#3d</a>
                        <a href="https://tympanus.net/codrops/demos/?tag=three-js">#three.js</a>
                        <a href="https://tympanus.net/codrops/demos/?tag=react-three-fiber">
                            #react-three-fiber
                        </a>
                    </nav>
                </div> */}
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
                <Link href="/" className={pathname === '/' ? 'active' : ''}>
                    {t('footer.tower')}
                </Link>
                <Link href="/paper" className={pathname === '/paper' ? 'active' : ''}>
                    {t('footer.paper')}
                </Link>
                <Link href="/spiral" className={pathname === '/spiral' ? 'active' : ''}>
                    {t('footer.spiral')}
                </Link>
            </Footer>
        </div>
    );
}
