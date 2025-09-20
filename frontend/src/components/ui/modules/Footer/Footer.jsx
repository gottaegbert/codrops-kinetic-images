'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Footer.module.scss';

function Footer() {
    const router = useRouter();
    const pathname = usePathname();

    const handleBrandClick = useCallback(
        (event) => {
            event.preventDefault();

            if (pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            router.push('/', { scroll: true });
        },
        [pathname, router]
    );

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brandBlock}>
                    <a href="/" onClick={handleBrandClick} className={styles.brand}>
                        MaKaleidos
                    </a>
                    <span className={styles.tagline}>| Online Gallery | In small – On paper – In voices</span>
                </div>

                <div className={styles.meta}>
                    <div className={styles.contact}>
                        <a href="mailto:general@makaleidos.com" className={styles.contactLink}>
                            general@makaleidos.com
                        </a>
                        <a
                            href="https://www.instagram.com/makaleidos_/"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.contactLink}
                        >
                            Instagram
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.contactLink}
                        >
                            Wechat
                        </a>
                    </div>
                    <small className={styles.copy}>© 2025 MaKaleidos</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
