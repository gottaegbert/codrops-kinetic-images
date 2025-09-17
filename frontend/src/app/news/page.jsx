'use client';

import Link from 'next/link';
import styles from './page.module.scss';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NewsPage() {
    const { t } = useLanguage();

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>{t('news.comingSoonTitle')}</h1>
                <p className={styles.description}>{t('news.comingSoonDescription')}</p>
                <Link href="/" className={styles.backLink}>
                    {t('navigation.home')}
                </Link>
            </div>
        </main>
    );
}
