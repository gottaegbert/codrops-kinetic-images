'use client';

import styles from './page.module.scss';
import Link from 'next/link';


export default function AboutPage() {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <h1 className={styles.title}>About MaKaleidos</h1>
                <p className={styles.subtitle}>
                    Online art gallery reimagining exhibitions with magazine-style storytelling.
                </p>
            </section>

            <section className={styles.content}>
                <div className={styles.card}>
                    <h2>Vision</h2>
                    <p>
                        MaKaleidos is a digital-first gallery and editorial platform presenting
                        ？？ art through virtual exhibitions and long‑form
                        narratives. We design every issue with clear rhythm, quiet typography, and
                        a magazine sensibility.
                    </p>
                    <p>
                        Each season introduces a focused selection of works, interviews, and
                        context—built for responsive reading and exploration across devices.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.feature}>
                        <h3>Virtual Exhibitions</h3>
                        <p>WebGL-powered spaces that replace the traditional wall display.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Magazine Presentation</h3>
                        <p>Editorial layouts for interviews, essays, and project documentation.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Bilingual (EN / 中文)</h3>
                        <p>Content designed for international audiences with cultural sensitivity.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Archival Structure</h3>
                        <p>Issues and exhibitions organized for long‑term reference and research.</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <h2>中文简介</h2>
                    <p>
                        MaKaleidos 是一个以数字为先的线上艺术画廊与杂志平台，通过虚拟展览与叙事化的
                        文章结构展示当代艺术。我们强调轻盈的节奏与杂志式排版，在不同设备上都保持优秀的观感与阅读体验。
                    </p>
                    <p>
                        每期内容包含展览、艺术家访谈与上下文信息，以清晰的归档结构进行整理与发布。
                    </p>
                </div>

                <div className={styles.ctaRow}>
                    <Link href="/contact" className={styles.ctaLink}>
                        Contact the Gallery
                    </Link>
                </div>
            </section>
        </main>
    );
}


