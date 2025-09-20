import '@/styles/global.scss';
import 'lenis/dist/lenis.css';

import { Suspense } from 'react';
import meta from '@/data/metadata';
import fontFaces from '@/assets/fonts/font-faces';
import { Layout } from '@/components/layouts/Layout';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { LenisProvider } from '@/contexts/LenisContext';

export const metadata = meta;

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" 
                    rel="stylesheet" 
                />
            </head>
            <body className={`${fontFaces}`}>
                <LanguageProvider>
                    <LenisProvider>
                        <Suspense>
                            <Layout>{children}</Layout>
                        </Suspense>
                    </LenisProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
