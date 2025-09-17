'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './page.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* 左侧文本内容 */}
                    <div className={styles.textColumn}>
                        <h1 className={styles.title}>{t('about.title')}</h1>

                        <div className={styles.textBlock}>
                            <p className={styles.paragraph}>{t('about.description1')}</p>
                        </div>

                        <div className={styles.textBlock}>
                            <p className={styles.paragraph}>{t('about.description2')}</p>
                        </div>

                        <div className={styles.textBlock}>
                            <p className={styles.paragraph}>{t('about.description3')}</p>
                        </div>

                    </div>

                    {/* 右侧图片网格 */}
                    {/* <div className={styles.imageColumn}>
                        <div className={styles.imageGrid}>
                            <div className={styles.imageItem}>
                                <Image
                                    src="/images/img14.webp"
                                    alt="Gallery space"
                                    width={300}
                                    height={400}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.imageItem}>
                                <Image
                                    src="/images/img15.webp"
                                    alt="Artwork detail"
                                    width={300}
                                    height={200}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.imageItem}>
                                <Image
                                    src="/images/img16.webp"
                                    alt="Exhibition view"
                                    width={300}
                                    height={300}
                                    className={styles.image}
                                />
                            </div>
                            
                        </div>
                    </div> */}
                </div>
            </div>

        </main>
    );
}
