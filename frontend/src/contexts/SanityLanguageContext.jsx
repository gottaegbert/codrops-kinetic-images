'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSanityTranslations } from '../hooks/useSanityTranslations';

const SanityLanguageContext = createContext();

export function SanityLanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');
    const { translations, t: sanityT, loading } = useSanityTranslations();

    // Load language setting from localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && ['en', 'zh'].includes(savedLanguage)) {
            setLanguage(savedLanguage);
        }
    }, []);

    // Save language setting to localStorage
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    // Enhanced translation function that uses Sanity data
    const t = (key) => {
        return sanityT(key, language);
    };

    return (
        <SanityLanguageContext.Provider value={{ 
            language, 
            changeLanguage, 
            t, 
            translations,
            loading 
        }}>
            {children}
        </SanityLanguageContext.Provider>
    );
}

export function useSanityLanguage() {
    const context = useContext(SanityLanguageContext);
    if (!context) {
        throw new Error('useSanityLanguage must be used within a SanityLanguageProvider');
    }
    return context;
}