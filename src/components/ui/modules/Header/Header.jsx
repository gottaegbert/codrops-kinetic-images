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
                    <a href="/exhibitions" className={styles.navLink}>Exhibitions</a>
                    <a href="/artists" className={styles.navLink}>Artists</a>
                    <a href="/magazine" className={styles.navLink}>Magazine</a>
                    <a href="/about" className={styles.navLink}>About</a>
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
