'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.scss';

function Header({ children }) {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userManualControl, setUserManualControl] = useState(false);
    const [hasScrolledDown, setHasScrolledDown] = useState(false);
    const pathname = usePathname();

    // Auto-collapse when navigating to other pages
    useEffect(() => {
        setIsMenuOpen(false);
        setUserManualControl(false);
        setHasScrolledDown(false);
    }, [pathname]);

    // 滚动监听
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (!userManualControl) {
                if (scrollY <= 300) {
                    // 在页面顶部，自动展开
                    setIsMenuOpen(true);
                    setHasScrolledDown(false);
                } else if (scrollY > 100 && !hasScrolledDown) {
                    // 首次向下滚动超过100px，收起一次
                    setIsMenuOpen(false);
                    setHasScrolledDown(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 初始检查
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [userManualControl, hasScrolledDown]);

    const handleMouseEnter = () => {
        setIsMenuOpen(true);
    };

    const handleMouseLeave = () => {
        // 鼠标离开时不自动收起，让滚动控制
    };

    const handleToggleClick = () => {
        // 用户主动控制
        setUserManualControl(true);
        setIsMenuOpen(!isMenuOpen);

        // 10秒后恢复自动控制
        setTimeout(() => {
            setUserManualControl(false);
        }, 10000);
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

                <div className={styles.navContainer}>
                    {/* Menu Toggle Button */}
                    <button
                        className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleActive : ''}`}
                        onClick={handleToggleClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        aria-label="Click to toggle or hover to expand navigation menu"
                    >
                        <span className={styles.menuIcon}></span>
                        <span className={styles.menuIcon}></span>
                        <span className={styles.menuIcon}></span>
                    </button>

                    {/* Navigation Links - Individual Buttons */}
                    <nav
                        className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}
                    >
                        {navItems.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
                                style={{
                                    '--delay': `${index * 0.08}s`,
                                    '--reverse-delay': `${(navItems.length - 1 - index) * 0.05}s`,
                                }}
                                onClick={() => {
                                    // 点击链接时收起导航
                                    setIsMenuOpen(false);
                                    // 短暂进入手动控制模式，避免滚动立即影响
                                    setUserManualControl(true);
                                    setTimeout(() => {
                                        setUserManualControl(false);
                                    }, 1000);
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>


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
