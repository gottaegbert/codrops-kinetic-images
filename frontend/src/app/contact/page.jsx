'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './page.module.scss';

export default function ContactPage() {
    const { t } = useLanguage();
    
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.textColumn}>
                        <h1 className={styles.title}>{t('contact.title')}</h1>
                        
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>General</h2>
                            <p className={styles.paragraph}>
                                Email: <a href="mailto:hello@makaleidos.com" className={styles.link}>hello@makaleidos.com</a>
                            </p>
                            <p className={styles.paragraph}>
                                WeChat: <span className={styles.muted}>请添加后备注"MaKaleidos"</span>
                            </p>
                        </div>

                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Submissions</h2>
                            <p className={styles.paragraph}>
                                For artist portfolios and project proposals, include links, a short
                                statement, and availability. We review monthly and respond when a fit is
                                identified.
                            </p>
                        </div>

                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Press & Partnerships</h2>
                            <p className={styles.paragraph}>
                                For interviews, editorial collaborations, and institutional partnerships,
                                please share timeline and scope. We aim to reply within 5–7 days.
                            </p>
                        </div>

                        <div className={styles.note}>
                            <p className={styles.paragraph}>
                                EN / 中文 均可联系我们。We are preparing our first issue and virtual
                                exhibition for launch; thank you for your patience.
                            </p>
                        </div>
                    </div>
                    
                    <div className={styles.infoColumn}>
                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>Location</h3>
                            <p className={styles.infoParagraph}>Online Gallery</p>
                            <p className={styles.infoParagraph}>Global Reach</p>
                        </div>
                        
                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>Hours</h3>
                            <p className={styles.infoParagraph}>24/7 Online Access</p>
                            <p className={styles.infoParagraph}>Response: 1-3 Business Days</p>
                        </div>
                        
                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>Social</h3>
                            <p className={styles.infoParagraph}>
                                <a href="#" className={styles.link}>Instagram</a>
                            </p>
                            <p className={styles.infoParagraph}>
                                <a href="#" className={styles.link}>WeChat</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
    );
}
