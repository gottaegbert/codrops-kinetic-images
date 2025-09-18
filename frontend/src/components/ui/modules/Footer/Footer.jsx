import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brandBlock}>
                    <span className={styles.brand}>MaKaleidos</span>
                    <span className={styles.tagline}>Digital exhibitions · Works on paper · Small-scale art</span>
                </div>

                <div className={styles.meta}>
                    <div className={styles.contact}>
                        <a href="mailto:general@makaleidos.com" className={styles.contactLink}>
                            general@makaleidos.com
                        </a>
                        <a
                            href="https://www.instagram.com/makaleidos_/"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.contactLink}
                        >
                            Instagram
                        </a>
                    </div>
                    <small className={styles.copy}>© 2025 MaKaleidos</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
