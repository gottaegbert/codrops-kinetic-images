import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3 className={styles.title}>MaKaleidos</h3>
                        <p className={styles.description}>
                            Contemporary art gallery reimagining the digital exhibition experience.
                        </p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Gallery</h4>
                            <a href="/exhibitions" className={styles.link}>Current Exhibitions</a>
                            <a href="/artists" className={styles.link}>Featured Artists</a>
                            <a href="/collections" className={styles.link}>Collections</a>
                        </div>

                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Content</h4>
                            <a href="/magazine" className={styles.link}>Art Magazine</a>
                            <a href="/interviews" className={styles.link}>Artist Interviews</a>
                            <a href="/archive" className={styles.link}>Exhibition Archive</a>
                        </div>

                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Connect</h4>
                            <a href="/about" className={styles.link}>About Us</a>
                            <a href="/contact" className={styles.link}>Contact</a>
                            <a href="/newsletter" className={styles.link}>Newsletter</a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © 2025 MaKaleidos. All rights reserved.
                    </p>
                    <div className={styles.social}>
                        <a href="#" className={styles.socialLink} aria-label="Instagram">IG</a>
                        <a href="#" className={styles.socialLink} aria-label="WeChat">微信</a>
                        <a href="#" className={styles.socialLink} aria-label="Email">Email</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
