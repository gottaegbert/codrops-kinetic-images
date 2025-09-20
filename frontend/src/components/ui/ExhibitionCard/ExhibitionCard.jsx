'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useLenis } from '@/contexts/LenisContext';
import { useHomeContent } from '@/hooks/useHomeContent';
import styles from './ExhibitionCard.module.scss';

export default function ExhibitionCard({ mobile = false }) {
    const { language } = useLanguage();
    const lenis = useLenis();
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
            if (lenis) {
                lenis.scrollTo(contentSection);
            } else {
                contentSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
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
                    <span className={styles.number}>
                        {currentExhibition?.exhibitionCard?.number || '1'}
                    </span>
                </div>

                <h4 className={styles.exhibitionName}>
                    {currentExhibition?.title || 'The Harmonizing Gaze'}
                </h4>

                <div className={styles.details}>
                    <div className={styles.timeInfo}>
                        <span>
                            {formatDateRange(
                                currentExhibition?.exhibitionCard?.startDate, 
                                currentExhibition?.exhibitionCard?.endDate
                            ) || 'Sep.4 - Oct. 10 2025'}
                        </span>
                    </div>

                    <div className={styles.artistInfo}>
                        <span>
                            {currentExhibition?.exhibitionCard?.featuredArtists?.[language] || 
                             currentExhibition?.artist || 'Francesco Zanatta'}
                        </span>
                    </div>
                </div>

                <button className={styles.exploreButton} onClick={handleLearnMoreClick}>
                    <span>Explore</span>
                </button>
            </div>
        </div>
    );
}
