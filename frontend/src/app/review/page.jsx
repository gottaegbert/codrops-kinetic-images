'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './page.module.scss';

export default function ReviewPage() {
    const { t } = useLanguage();
    const leadParagraphs = t('review.leadParagraphs') || [];
    const guidelines = t('review.guidelines') || [];

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.textColumn}>
                        <h1 className={styles.title}>{t('review.title')}</h1>

                        {Array.isArray(leadParagraphs) &&
                            leadParagraphs.map((paragraph, index) => (
                                <div key={`lead-${index}`} className={styles.textBlock}>
                                    <p className={styles.paragraph}>{paragraph}</p>
                                </div>
                            ))}

                        <section className={styles.guidelines}>
                            <h2 className={styles.guidelinesTitle}>{t('review.guidelinesTitle')}</h2>
                            <ul className={styles.guidelinesList}>
                                {Array.isArray(guidelines) &&
                                    guidelines.map((item, index) => (
                                        <li key={`guideline-${index}`} className={styles.guidelinesItem}>
                                            {item}
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
