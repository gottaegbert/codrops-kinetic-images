'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.scss';

function Header({ children }) {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    const navItems = [
        { href: '/archive', label: t('navigation.archive') },
        { href: '/news', label: t('navigation.news') },
        { href: '/review', label: t('navigation.review') },
        { href: '/about', label: t('navigation.about') },
        { href: '/contact', label: t('navigation.contact') },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <Link href="/">
                        <h1 className={styles.title}>MaKaleidos</h1>
                    </Link>
                </div>

                {/* Menu Toggle Button */}
                <button
                    className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleActive : ''}`}
                    onClick={handleToggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className={styles.menuText}>menu</span>
                    <svg
                        className={`${styles.expandIcon} ${isMenuOpen ? styles.rotated : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                </button>

                {/* Navigation Links - Toggleable */}
                <nav className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}>
                    {navItems.map((item, index) => {
                        const isActive =
                            pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                                style={{
                                    '--delay': `${index * 0.06}s`,
                                    '--offset': `${index * 1.6}rem`,
                                    '--slide-delay': `${0.35 + index * 0.06}s`,
                                    '--close-delay': `${(4 - index) * 0.06}s`,
                                }}
                                onClick={handleNavClick}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {children}
            </div>
            {/* Language Switcher - Separate Button on the Right */}
            <div className={styles.languageContainer}>
                <LanguageSwitcher />
            </div>
        </header>
    );
}

export default Header;
