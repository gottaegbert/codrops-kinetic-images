'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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

    const navId = 'primary-navigation';

    const renderNavLinks = (linkClass, activeClass) =>
        navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`${linkClass} ${isActive ? activeClass : ''}`.trim()}
                    onClick={handleNavClick}
                >
                    {item.label}
                </Link>
            );
        });

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;

        if (isMenuOpen && isMobileViewport) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.topRow}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <h1 className={styles.title}>MaKaleidos</h1>
                        </Link>
                    </div>

                    {/* Menu Toggle Button */}
                    <button
                        className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleActive : ''}`}
                        onClick={handleToggleMenu}
                        aria-label={t('navigation.menu')}
                        aria-expanded={isMenuOpen}
                        aria-controls={navId}
                    >
                        <span className={styles.menuText}>{t('navigation.menu')}</span>
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
                </div>

                {/* Navigation Links - Toggleable */}
                <nav
                    id={navId}
                    className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}
                    aria-hidden={isMenuOpen}
                >
                    {renderNavLinks(styles.navLink, styles.navLinkActive)}
                </nav>

                {children}
            </div>
            {/* Language Switcher - Separate Button on the Right */}
            <div className={styles.languageContainer}>
                <LanguageSwitcher />
            </div>

            {isMenuOpen && (
                <div className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label={t('navigation.menu')}>
                    <nav className={styles.mobileNav} aria-label={t('navigation.menu')}>
                        {renderNavLinks(styles.mobileNavLink, styles.mobileNavLinkActive)}
                    </nav>
                    <div className={styles.mobileLanguage}>
                        <LanguageSwitcher />
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
