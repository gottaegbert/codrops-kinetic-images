'use client';

import { useMemo } from 'react';
import { PortableText } from '@portabletext/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAboutContent } from '@/hooks/useAboutContent';
import styles from './page.module.scss';

const portableTextComponents = {
    block: {
        normal: ({ children }) => (
            <div className={styles.textBlock}>
                <p className={styles.paragraph}>{children}</p>
            </div>
        )
    }
};

export default function AboutPage() {
    const { language, t } = useLanguage();
    const { aboutContent } = useAboutContent();

    const fallbackBody = useMemo(() => {
        const paragraphs = [
            t('about.description1'),
            t('about.description2'),
            t('about.description3')
        ].filter(Boolean);

        return paragraphs.map((text, index) => ({
            _type: 'block',
            _key: `fallback-${index}`,
            style: 'normal',
            markDefs: [],
            children: [
                {
                    _type: 'span',
                    _key: `fallback-${index}-span`,
                    text,
                    marks: []
                }
            ]
        }));
    }, [t]);

    const heading = aboutContent?.heading?.[language] || t('about.title');
    const body = aboutContent?.body?.[language]?.length
        ? aboutContent.body[language]
        : fallbackBody;

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.textColumn}>
                        <h1 className={styles.title}>{heading}</h1>

                        <PortableText value={body} components={portableTextComponents} />
                    </div>
                </div>
            </div>
        </main>
    );
}
