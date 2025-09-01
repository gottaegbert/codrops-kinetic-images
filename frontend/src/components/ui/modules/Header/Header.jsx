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
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const pathname = usePathname();

    // Keep navigation open when navigating to other pages
    useEffect(() => {
        // 导航到新页面时保持展开状态
        setIsMenuOpen(true);
        setUserManualControl(true);
        setHasScrolledDown(false);
        
        // 检查当前滚动位置决定是否显示header
        const currentScroll = window.scrollY;
        setIsHeaderVisible(currentScroll >= window.innerHeight);

        // 3秒后恢复自动控制
        const timer = setTimeout(() => {
            setUserManualControl(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [pathname]);

    // 滚动监听
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            // 控制header的显示/隐藏（基于100vh）
            setIsHeaderVisible(scrollY >= viewportHeight);

            if (!userManualControl && scrollY >= viewportHeight) {
                if (scrollY <= viewportHeight + 300) {
                    // 刚滚动过100vh时，自动展开菜单
                    setIsMenuOpen(true);
                    setHasScrolledDown(false);
                } else if (scrollY > viewportHeight + 100 && !hasScrolledDown) {
                    // 继续向下滚动超过100vh+100px时，收起一次
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
        <header className={`${styles.header} ${isHeaderVisible ? styles.headerVisible : styles.headerHidden}`}>
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
                  
                        {/* <span className={styles.menuIcon}></span>
                        <span className={styles.menuIcon}></span>
                        <span className={styles.menuIcon}></span> */}
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
