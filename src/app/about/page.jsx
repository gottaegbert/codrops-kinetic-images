'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Footer } from '@/components/ui/modules';
import styles from './page.module.scss';
import Link from 'next/link';

export default function AboutPage() {
    const { t } = useLanguage();
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <h1 className={styles.title}>{t('about.title')}</h1>
                <p className={styles.subtitle}>
                    {t('about.subtitle')}
                </p>
            </section>

            <section className={styles.content}>
                <div className={styles.card}>
                    <h2>{t('about.heading')}</h2>
                    <p>{t('about.description1')}</p>
                    <p>{t('about.description2')}</p>
                    <p>{t('about.description3')}</p>
                </div>

                <div className={styles.ctaRow}>
                    <Link href="/contact" className={styles.ctaLink}>
                        {t('about.contact')}
                    </Link>
                </div>
            </section>
            
            {/* 添加完整的Footer */}
            <Footer />
        </main>
    );
}
