'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.scss';

function Header({ children }) {
    const { t } = useLanguage();
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <h1 className={styles.title}>MaKaleidos</h1>
                    <span className={styles.subtitle}>Online Art Gallery</span>
                </div>

                <nav className={styles.navigation}>
                    <Link href="/" className={styles.navLink}>
                        {t('navigation.home')}
                    </Link>
                    <Link href="/exhibitions" className={styles.navLink}>
                        {t('navigation.exhibitions')}
                    </Link>
                    <Link href="/archive" className={styles.navLink}>
                        {t('navigation.archive')}
                    </Link>
                    <Link href="/about" className={styles.navLink}>
                        {t('navigation.about')}
                    </Link>
                    <Link href="/contact" className={styles.navLink}>
                        {t('navigation.contact')}
                    </Link>
                </nav>

                <div className={styles.controls}>
                    <LanguageSwitcher />
                </div>

                {children}
            </div>
        </header>
    );
}

export default Header;
