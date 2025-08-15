'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './page.module.scss';

export default function ExhibitionsPage() {
    const { t } = useLanguage();
    
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <h1 className={styles.title}>{t('exhibitions.title')}</h1>
                <p className={styles.subtitle}>{t('exhibitions.subtitle')}</p>
            </section>

            <section className={styles.content}>
                <div className={styles.card}>
                    <h2>{t('exhibitions.current')}</h2>
                    <p>{t('exhibitions.description')}</p>
                </div>
            </section>
        </main>
    );
}
