'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useLenis } from '@/contexts/LenisContext';
import { useExhibition } from '@/hooks/useArchiveContent';
import { getOptimizedImageUrl } from '@/sanity/client';
import { PortableText } from '@portabletext/react';
import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const portableTextComponents = {
    marks: {
        strong: ({children}) => <strong style={{fontWeight: 600}}>{children}</strong>,
        em: ({children}) => <em style={{fontStyle: 'italic'}}>{children}</em>,
    },
    block: {
        normal: ({children}) => <p style={{marginBottom: '1em'}}>{children}</p>,
        h1: ({children}) => <h1 style={{fontSize: '2rem', margin: '2rem 0 1rem'}}>{children}</h1>,
        h2: ({children}) => <h2 style={{fontSize: '1.5rem', margin: '1.5rem 0 1rem'}}>{children}</h2>,
    }
};

export default function ArchiveDetailClient({ id }) {
    const { t, language } = useLanguage();
    const { exhibition, loading, error } = useExhibition(id);
    const lenis = useLenis();

    const containerRef = useRef(null);
    const stripRef = useRef(null);

    const handleScrollTo = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            if (lenis) {
                lenis.scrollTo(element, { offset: -150 });
            } else {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleImageLoad = useCallback(() => {
        ScrollTrigger.refresh();
    }, []);

    useLayoutEffect(() => {
        if (loading || error || !exhibition?.images?.length) return;

        const container = containerRef.current;
        const strip = stripRef.current;

        if (!container || !strip) return;

        // Context for clean up
        let ctx = gsap.context(() => {
            // Function to calculate scroll width dynamically
            const getScrollAmount = () => {
                let stripWidth = strip.scrollWidth;
                // Add significant buffer so user sees past the last image (40% of viewport width)
                // This creates whitespace after the last image
                return -(stripWidth - window.innerWidth + window.innerWidth * 0.4);
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top", // Pins when container hits top of viewport
                    end: () => `+=${strip.scrollWidth + window.innerHeight}`, // Moderate extra scroll duration
                    pin: true,
                    scrub: true, // Instant scrub to work with Lenis smoothing without lag
                    invalidateOnRefresh: true,
                    markers: false
                }
            });

            // 1. Scroll the strip horizontally
            tl.to(strip, {
                x: getScrollAmount,
                ease: "none",
                duration: 1
            });
            
            // 2. Hold at the end (50% of the movement duration)
            // This creates a distinct pause at the end before unpinning, checking the "don't unpin too early" box
            tl.to({}, { duration: 0.5 });

        }, container); // Scope to container

        return () => ctx.revert();
    }, [loading, error, exhibition]);

    if (loading) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                     <div style={{ textAlign: 'center', marginTop: '4rem', color: '#999' }}>Loading...</div>
                </div>
            </main>
        );
    }

    if (error || !exhibition) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <h1>Exhibition not found</h1>
                        <Link href="/archive" className={styles.backLink}>← Back to Archive</Link>
                    </div>
                </div>
            </main>
        );
    }

    const validImages = exhibition.images?.filter(img => img.asset) || [];

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <Link href="/archive" className={styles.backLink}>← Back to Archive</Link>
                
                <header className={styles.header}>
                    <h1 className={styles.title}>{exhibition.title}</h1>
                    <div className={styles.meta}>
                        {exhibition.artist && <span>{exhibition.artist}</span>}
                        {exhibition.date && <span>{exhibition.date}</span>}
                    </div>
                     {exhibition.description && (
                        <div className={styles.description}>
                            {exhibition.description}
                        </div>
                    )}
                </header>

                <nav className={styles.pageNav}>
                    <span className={styles.navLabel}>{t('home.onThisPage') || 'On this page:'}</span>
                    <div className={styles.navLinks}>
                        {exhibition.pressRelease?.[language] && (
                            <a 
                                href="#pressRelease" 
                                className={styles.navLink}
                                onClick={(e) => handleScrollTo(e, 'pressRelease')}
                            >
                                {t('home.pressRelease') || 'Press Release'}
                            </a>
                        )}
                        {exhibition.interview?.content?.[language] && (
                            <a 
                                href="#interview" 
                                className={styles.navLink}
                                onClick={(e) => handleScrollTo(e, 'interview')}
                            >
                                {t('home.interview') || 'Interview'}
                            </a>
                        )}
                        {exhibition.statement?.[language] && (
                            <a 
                                href="#statement" 
                                className={styles.navLink}
                                onClick={(e) => handleScrollTo(e, 'statement')}
                            >
                                {t('home.statement') || 'Artist Statement'}
                            </a>
                        )}
                    </div>
                </nav>
            </div>

            {/* GSAP Scroll-linked horizontal gallery */}
            {validImages.length > 0 && (
                <div ref={containerRef} className={styles.galleryContainer}>
                    <div ref={stripRef} className={styles.galleryStrip}>
                        {validImages.map((img, index) => {
                             const dims = img.asset?.metadata?.dimensions;
                             const aspectRatio = dims ? dims.width / dims.height : 1;
                             const isLandscape = aspectRatio >= 1;

                             const infoParts = [];
                             if (img.artworkTitle) infoParts.push(img.artworkTitle);
                             if (img.year) infoParts.push(String(img.year));
                             if (img.medium) infoParts.push(img.medium);
                             if (img.dimensions) infoParts.push(img.dimensions);
                             const artworkInfo = infoParts.length > 0
                                 ? infoParts.join('; ')
                                 : (img.alt || img.title || '');

                             return (
                                <div 
                                    key={img._key || index} 
                                    className={`${styles.galleryItem} ${isLandscape ? styles.landscape : styles.portrait}`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={getOptimizedImageUrl(img.asset, { width: 1200 })}
                                        alt={img.alt || exhibition.title}
                                        onLoad={handleImageLoad}
                                    />
                                    {artworkInfo && (
                                        <p className={styles.artworkInfo}>{artworkInfo}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className={styles.container}>
                {/* Content Sections */}
                {exhibition.pressRelease?.[language] && (
                    <section id="pressRelease" className={styles.contentSection}>
                        <h2>{t('home.pressRelease') || 'Press Release'}</h2>
                         {exhibition.pressRelease.title?.[language] && (
                            <h3>{exhibition.pressRelease.title[language]}</h3>
                        )}
                        <div className={styles.textContent}>
                            <PortableText 
                                value={exhibition.pressRelease[language]} 
                                components={portableTextComponents}
                            />
                        </div>
                    </section>
                )}

                {exhibition.interview?.content?.[language] && (
                    <section id="interview" className={styles.contentSection}>
                        <h2>{t('home.interview') || 'Interview'}</h2>
                         {exhibition.interview.title?.[language] && (
                            <h3>{exhibition.interview.title[language]}</h3>
                        )}
                         {exhibition.interview.featuredImage && (
                            <div className={styles.sectionImage}>
                                <Image
                                    src={getOptimizedImageUrl(exhibition.interview.featuredImage, { width: 800 })}
                                    alt={exhibition.interview.featuredImage.alt || 'Interview'}
                                    width={800}
                                    height={500}
                                    className={styles.image}
                                />
                            </div>
                        )}
                        <div className={styles.textContent}>
                             <PortableText 
                                value={exhibition.interview.content[language]} 
                                components={portableTextComponents}
                             />
                        </div>
                    </section>
                )}

                {exhibition.statement?.[language] && (
                    <section id="statement" className={styles.contentSection}>
                        <h2>{t('home.statement') || 'Statement'}</h2>
                        {exhibition.statement.featuredImage && (
                            <div className={styles.sectionImage}>
                                <Image
                                    src={getOptimizedImageUrl(exhibition.statement.featuredImage, { width: 800 })}
                                    alt={exhibition.statement.featuredImage.alt || 'Artist Statement'}
                                    width={800}
                                    height={500}
                                    className={styles.image}
                                />
                            </div>
                        )}
                        <div className={styles.textContent}>
                            <PortableText 
                                value={exhibition.statement[language]} 
                                components={portableTextComponents}
                            />
                        </div>
                    </section>
                )}
                 
                 {exhibition.biography?.[language] && (
                    <section id="biography" className={styles.contentSection}>
                        <h2>{t('home.biography') || 'Biography'}</h2>
                        <div className={styles.textContent}>
                            <PortableText 
                                value={exhibition.biography[language]} 
                                components={portableTextComponents}
                            />
                        </div>
                    </section>
                )}

                {exhibition.artistResume?.[language]?.asset?.url && (
                    <div className={styles.resumeContainer}>
                        <a 
                            href={`${exhibition.artistResume[language].asset.url}?dl=`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.resumeLink}
                        >
                            Download Artist Resume (PDF)
                        </a>
                    </div>
                )}
            </div>
        </main>
    );
}
