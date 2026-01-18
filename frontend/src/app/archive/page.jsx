'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useArchiveContent } from '@/hooks/useArchiveContent';
import { getOptimizedImageUrl } from '@/sanity/client';

export default function ArchivePage() {
    const { t } = useLanguage();
    const { archiveItems, loading } = useArchiveContent();
    
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Archive</h1>
                    <p className={styles.subtitle}>
                        Exhibitions from MaKaleidos Gallery
                    </p>
                </div>
                
                {loading ? (
                   <div style={{ textAlign: 'center', marginTop: '4rem', color: '#999' }}>
                        Loading...
                   </div>
                ) : (
                    <div className={styles.archiveGrid}>
                        {archiveItems.map((item) => {
                            const displayImage = 
                                item.images?.[0]?.asset ? item.images[0] :
                                item.pressRelease?.featuredImage?.asset ? item.pressRelease.featuredImage :
                                item.interview?.featuredImage?.asset ? item.interview.featuredImage :
                                item.statement?.featuredImage?.asset ? item.statement.featuredImage : null;

                            return (
                                <article key={item._id} className={styles.archiveItem}>
                                    <Link href={`/archive/${item._id}`} className={styles.itemLink}>
                                        <div className={styles.imageContainer}>
                                            {displayImage && displayImage.asset && (
                                                <Image 
                                                    src={getOptimizedImageUrl(displayImage.asset, { width: 600 })} 
                                                    alt={displayImage.alt || item.title || 'Exhibition Image'} 
                                                    width={600} 
                                                    height={400}
                                                    className={styles.image}
                                                />
                                            )}
                                        </div>
                                        <div className={styles.itemContent}>
                                            <span className={styles.itemType}>Exhibition</span>
                                            <h2 className={styles.itemTitle}>{item.title}</h2>
                                            {item.date && (
                                                <time className={styles.itemDate}>{item.date}</time>
                                            )}
                                            {item.description && (
                                                <p className={styles.itemDescription}>{item.description}</p>
                                            )}
                                        </div>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
            
        </main>
    );
}
