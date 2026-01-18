'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import ContactModal from '../ContactModal/ContactModal';
import styles from './Header.module.scss';

function Header({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const pathname = usePathname();
    const { t } = useLanguage();

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    const handleOpenContact = () => {
        setIsMenuOpen(false);
        setIsContactOpen(true);
    };

    const navItems = [
        { href: '/archive', label: t('navigation.archive') },
        { href: '/news', label: t('navigation.news'), disabled: true },
        { href: '/review', label: t('navigation.review') },
        { href: '/about', label: t('navigation.about') },
        { label: t('navigation.contact'), onClick: handleOpenContact },
    ];

    const navId = 'primary-navigation';

    const renderNavLinks = (linkClass, activeClass, disabledClass) =>
        navItems.map((item) => {
            const isActive = !item.disabled && (pathname === item.href || pathname.startsWith(`${item.href}/`));
            const className = [linkClass, isActive ? activeClass : '', item.disabled ? disabledClass : '']
                .filter(Boolean)
                .join(' ');

            if (item.disabled) {
                return (
                    <span key={item.href} className={className} aria-disabled="true">
                        {item.label}
                    </span>
                );
            }

            if (item.onClick) {
                return (
                    <button
                        key={item.label}
                        type="button"
                        className={className}
                        onClick={item.onClick}
                    >
                        {item.label}
                    </button>
                );
            }

            return (
                <Link
                    key={item.href}
                    href={item.href}
                    className={className}
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
            <div className={styles.brandBlock}>
                <Link href="/">
                    <h1 className={styles.title}>MaKaleidos</h1>
                </Link>
            </div>

            <div className={styles.menuContainer}>
                <button
                    className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleActive : ''}`}
                    onClick={handleToggleMenu}
                    aria-label={t('navigation.menu')}
                    aria-expanded={isMenuOpen}
                    aria-controls={navId}
                >
                    <span
                        className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ''}`}
                        aria-hidden="true"
                    >
                        <span className={styles.hamburgerBar} />
                        <span className={styles.hamburgerBar} />
                        <span className={styles.hamburgerBar} />
                    </span>
                </button>

                <nav
                    id={navId}
                    className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}
                    aria-hidden={!isMenuOpen}
                >
                    <div className={styles.navItems}>
                        {renderNavLinks(styles.navLink, styles.navLinkActive, styles.navLinkDisabled)}
                    </div>
                    <div className={styles.languageInline}>
                        <LanguageSwitcher />
                    </div>
                    {children}
                </nav>
            </div>

            {/* Mobile menu overlay */}
            {isMenuOpen && (
                <div className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label={t('navigation.menu')}>
                    <nav className={styles.mobileNav} aria-label={t('navigation.menu')}>
                        {renderNavLinks(
                            styles.mobileNavLink,
                            styles.mobileNavLinkActive,
                            styles.mobileNavLinkDisabled
                        )}
                        <div className={styles.mobileLanguage}>
                            <LanguageSwitcher />
                        </div>
                    </nav>
                </div>
            )}

            <ContactModal open={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </header>
    );
}

export default Header;
