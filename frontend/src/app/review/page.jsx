'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Footer } from '@/components/ui/modules';
import styles from './page.module.scss';

export default function ReviewPage() {
    const { t } = useLanguage();
    
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Review</h1>
                    <p className={styles.subtitle}>
                        Critical reviews and reflections on contemporary art
                    </p>
                </div>
                
                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        This section features thoughtful reviews and critical analysis of contemporary artworks, 
                        exhibitions, and artistic practices. We welcome contributions from writers, curators, 
                        and art enthusiasts who wish to share their perspectives on works on paper and small-scale art.
                    </p>
                </div>
            </div>
            
        </main>
    );
}
