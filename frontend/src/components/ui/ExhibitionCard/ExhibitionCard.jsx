'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useHomeContent } from '@/hooks/useHomeContent';
import styles from './ExhibitionCard.module.scss';

export default function ExhibitionCard({ mobile = false }) {
    const { language } = useLanguage();
    const { currentExhibition } = useHomeContent();
    
    // Format date range for display
    const formatDateRange = (startDate, endDate) => {
        if (!startDate || !endDate) return '';
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const options = { 
            month: 'short', 
            day: 'numeric',
            year: start.getFullYear() !== end.getFullYear() ? 'numeric' : undefined
        };
        
        const startStr = start.toLocaleDateString('en-US', options);
        const endStr = end.toLocaleDateString('en-US', options);
        
        return `${startStr} - ${endStr}, ${end.getFullYear()}`;
    };
    
    const handleLearnMoreClick = () => {
        const contentSection = document.querySelector('[data-content-section]');
        if (contentSection) {
            contentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    const cardClass = mobile ? styles.exhibitionCardMobile : styles.exhibitionCard;

    return (
        <div className={cardClass}>
            {/* <div className={styles.header}>
                <h3 className={styles.title}>{t('exhibitionCard.currentExhibition')}</h3>
                <div className={styles.badge}>{t('exhibitionCard.paintings')}</div>
            </div> */}

            <div className={styles.content}>
                <div className={styles.exhibitionNumber}>
                    <span className={styles.label}>No.</span>
                    <span className={styles.number}>
                        {currentExhibition?.exhibitionCard?.number || '000000'}
                    </span>
                </div>

                <h4 className={styles.exhibitionName}>
                    {currentExhibition?.title || 'Exhibition Title'}
                </h4>

                <div className={styles.details}>
                    <div className={styles.timeInfo}>
                        <span className={styles.label}>Duration:</span>
                        <span>
                            {formatDateRange(
                                currentExhibition?.exhibitionCard?.startDate, 
                                currentExhibition?.exhibitionCard?.endDate
                            ) || 'Date TBD'}
                        </span>
                    </div>

                    <div className={styles.artistInfo}>
                        <span className={styles.label}>Featured Artists:</span>
                        <span>
                            {currentExhibition?.exhibitionCard?.featuredArtists?.[language] || 
                             currentExhibition?.artist || 'Artist Name'}
                        </span>
                    </div>
                </div>

                <p className={styles.description}>
                    {currentExhibition?.exhibitionCard?.cardDescription?.[language] || 
                     currentExhibition?.description || 'Exhibition description...'}
                </p>

                <button className={styles.learnMore} onClick={handleLearnMoreClick}>
                    <span>Learn More</span>
                    <svg className={styles.arrow} viewBox="0 0 24 24" fill="none">
                        <path
                            d="M7 10l5 5 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
