'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import styles from './Splash.module.scss';

function Splash() {
    const { active, progress } = useProgress();
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!active && progress >= 100) {
            const minShowMs = 600; // ensure splash shows briefly
            const t = setTimeout(() => setFadeOut(true), minShowMs);
            return () => clearTimeout(t);
        }
    }, [active, progress]);

    useEffect(() => {
        if (!fadeOut) return;
        const t = setTimeout(() => setVisible(false), 450); // match CSS transition
        return () => clearTimeout(t);
    }, [fadeOut]);

    if (!visible) return null;

    return (
        <div className={`${styles.splash} ${fadeOut ? styles.fadeOut : ''}`}>
            <div className={styles.center}>
                <h1 className={styles.title} aria-label="MaKaleidos">
                    <span>MAKALEIDOS</span>
                </h1>
            </div>
        </div>
    );
}

export default Splash;

