import styles from './Header.module.scss';

function Header({ children }) {
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <h1 className={styles.title}>MaKaleidos</h1>
                    <span className={styles.subtitle}>Online Art Gallery</span>
                </div>
                
                <nav className={styles.navigation}>
                    <a href="/" className={styles.navLink}>Gallery</a>
                    <a href="/Archive" className={styles.navLink}>Exhibitions</a>
                    <a href="/News" className={styles.navLink}>Artists</a>
                    <a href="/Review" className={styles.navLink}>Magazine</a>
                    <a href="/About" className={styles.navLink}>About</a>
                    <a href="/Contact" className={styles.navLink}>Contact</a>
                </nav>

                <div className={styles.controls}>
                    <button className={styles.langToggle}>EN / 中文</button>
                </div>
                
                {children}
            </div>
        </header>
    );
}

export default Header;
