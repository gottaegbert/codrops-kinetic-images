'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './ExhibitionCard.module.scss';

export default function ExhibitionCard({ mobile = false }) {
    const { t } = useLanguage();
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
                    <span className={styles.label}>{t('exhibitionCard.number')}</span>
                    <span className={styles.number}>202507</span>
                </div>

                <h4 className={styles.exhibitionName}>
                    {t('home.exhibitionTitle')}
                </h4>

                <div className={styles.details}>
                    <div className={styles.timeInfo}>
                        <span className={styles.label}>{t('exhibitionCard.duration')}</span>
                        <span>{t('exhibitionCard.durationText')}</span>
                    </div>

                    <div className={styles.artistInfo}>
                        <span className={styles.label}>{t('exhibitionCard.featuredArtists')}</span>
                        <span>{t('exhibitionCard.artistsText')}</span>
                    </div>
                </div>

                <p className={styles.description}>
                    {t('home.exhibitionDescription')}
                </p>

                <button className={styles.learnMore} onClick={handleLearnMoreClick}>
                    <span>{t('exhibitionCard.learnMore')}</span>
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
