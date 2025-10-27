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
                    Language:EN
                <span className={styles.visuallyHidden}>English</span>
            </button>
            <span className={styles.separator}>|</span>
            <button
                className={`${styles.langButton} ${language === 'zh' ? styles.active : ''}`}
                onClick={() => changeLanguage('zh')}
                aria-label="切换到中文"
            >
                    语言:中文
                <span className={styles.visuallyHidden}>中文</span>
            </button>
        </div>
    );
}
