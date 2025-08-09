'use client';

import styles from './page.module.scss';

export default function ContactPage() {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <h1 className={styles.title}>Contact</h1>
                <p className={styles.subtitle}>We welcome proposals, interviews, and collaborations.</p>
            </section>

            <section className={styles.content}>
                <div className={styles.columns}>
                    <div className={styles.card}>
                        <h2>General</h2>
                        <p>
                            Email: <a href="mailto:hello@makaleidos.com">hello@makaleidos.com</a>
                        </p>
                        <p>
                            WeChat: <span className={styles.muted}>请添加后备注“MaKaleidos”</span>
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h2>Submissions</h2>
                        <p>
                            For artist portfolios and project proposals, include links, a short
                            statement, and availability. We review monthly and respond when a fit is
                            identified.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h2>Press & Partnerships</h2>
                        <p>
                            For interviews, editorial collaborations, and institutional partnerships,
                            please share timeline and scope. We aim to reply within 5–7 days.
                        </p>
                    </div>
                </div>

                <div className={styles.note}>
                    <p>
                        EN / 中文 均可联系我们。We are preparing our first issue and virtual
                        exhibition for launch; thank you for your patience.
                    </p>
                </div>
            </section>
        </main>
    );
}


