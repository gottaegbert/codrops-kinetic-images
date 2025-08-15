'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Footer } from '@/components/ui/modules';
import styles from './page.module.scss';
import Image from 'next/image';

export default function ExhibitionsPage() {
    const { t } = useLanguage();
    
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>{t('exhibitions.title')}</h1>
                
                <div className={styles.exhibitionGrid}>
                    {/* Current Exhibition */}
                    <div className={styles.exhibitionItem}>
                        <div className={styles.imageContainer}>
                            <Image 
                                src="/images/img5.webp" 
                                alt="Digital Metamorphosis" 
                                width={400} 
                                height={300}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.exhibitionInfo}>
                            <span className={styles.status}>Current</span>
                            <h2 className={styles.exhibitionTitle}>{t('home.exhibitionTitle')}</h2>
                            <p className={styles.exhibitionDate}>Jan 15 - Mar 30, 2025</p>
                            <p className={styles.exhibitionDescription}>{t('exhibitions.description')}</p>
                        </div>
                    </div>
                    
                    {/* Upcoming Exhibition */}
                    <div className={styles.exhibitionItem}>
                        <div className={styles.imageContainer}>
                            <Image 
                                src="/images/img6.webp" 
                                alt="Paper Works" 
                                width={400} 
                                height={300}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.exhibitionInfo}>
                            <span className={styles.status}>Upcoming</span>
                            <h2 className={styles.exhibitionTitle}>Paper Works: Intimate Expressions</h2>
                            <p className={styles.exhibitionDate}>Apr 5 - Jun 20, 2025</p>
                            <p className={styles.exhibitionDescription}>
                                A curated selection of works on paper exploring the intimate relationship between artist and medium.
                            </p>
                        </div>
                    </div>
                    
                    {/* Past Exhibition */}
                    <div className={styles.exhibitionItem}>
                        <div className={styles.imageContainer}>
                            <Image 
                                src="/images/img7.webp" 
                                alt="Small Scale" 
                                width={400} 
                                height={300}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.exhibitionInfo}>
                            <span className={styles.status}>Past</span>
                            <h2 className={styles.exhibitionTitle}>Small Scale, Big Impact</h2>
                            <p className={styles.exhibitionDate}>Oct 10 - Dec 15, 2024</p>
                            <p className={styles.exhibitionDescription}>
                                Exploring how small-scale artworks can create profound emotional and conceptual impact.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
    );
}
