'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
    const { language, changeLanguage } = useLanguage();

    return (
        <div className={styles.languageSwitcher}>
            <button
                className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
                onClick={() => changeLanguage('en')}
                aria-label="Switch to English"
            >
                EN
            </button>
            <span className={styles.separator}>|</span>
            <button
                className={`${styles.langButton} ${language === 'zh' ? styles.active : ''}`}
                onClick={() => changeLanguage('zh')}
                aria-label="切换到中文"
            >
                中文
            </button>
        </div>
    );
}
