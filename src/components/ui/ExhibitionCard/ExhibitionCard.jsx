'use client';

import styles from './ExhibitionCard.module.scss';

export default function ExhibitionCard() {
    const handleLearnMoreClick = () => {
        const contentSection = document.querySelector('[data-content-section]');
        if (contentSection) {
            contentSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className={styles.exhibitionCard}>
            <div className={styles.header}>
                <h3 className={styles.title}>Current Exhibition</h3>
                <div className={styles.badge}>online</div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.exhibitionNumber}>
                    <span className={styles.label}>No.</span>
                    <span className={styles.number}>202507</span>
                </div>
                
                <h4 className={styles.exhibitionName}>
                    Digital Metamorphosis: Contemporary Visions
                </h4>
                
                <div className={styles.details}>
                    <div className={styles.timeInfo}>
                        <span className={styles.label}>Duration:</span>
                        <span>Jan 15 - Mar 30, 2025</span>
                    </div>
                    
                    <div className={styles.artistInfo}>
                        <span className={styles.label}>Featured Artists:</span>
                        <span>Marina Chen, Alex Rodriguez, Yuki Tanaka</span>
                    </div>
                </div>
                
                <p className={styles.description}>
                    An immersive exploration of digital art's evolution, featuring groundbreaking works that blur the boundaries between physical and virtual realms. This exhibition showcases how contemporary artists are redefining creative expression through technology.
                </p>
                
                <button className={styles.learnMore} onClick={handleLearnMoreClick}>
                    <span>Learn More</span>
                    <svg className={styles.arrow} viewBox="0 0 24 24" fill="none">
                        <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
