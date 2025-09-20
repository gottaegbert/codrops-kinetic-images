'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import styles from './Splash.module.scss';

const MIN_SPLASH_MS = 600;
const SPLASH_FADE_DURATION_MS = 450;
const MAX_SPLASH_DURATION_MS = 10000;

function Splash({ onFinish }) {
    const { active, progress } = useProgress();
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (fadeOut) return undefined;
        if (!active && progress >= 100) {
            const t = setTimeout(() => setFadeOut(true), MIN_SPLASH_MS);
            return () => clearTimeout(t);
        }
    }, [active, progress, fadeOut]);

    useEffect(() => {
        if (!fadeOut) return undefined;
        const t = setTimeout(() => {
            setVisible(false);
            if (onFinish) onFinish();
        }, SPLASH_FADE_DURATION_MS); // match CSS transition

        return () => clearTimeout(t);
    }, [fadeOut, onFinish]);

    useEffect(() => {
        if (fadeOut) return undefined;

        // Fallback guard to ensure the splash never blocks longer than 10s.
        const fadeTimeout = setTimeout(
            () => setFadeOut(true),
            Math.max(MAX_SPLASH_DURATION_MS - SPLASH_FADE_DURATION_MS, 0)
        );
        const hideTimeout = setTimeout(() => {
            setVisible(false);
            if (onFinish) onFinish();
        }, MAX_SPLASH_DURATION_MS);

        return () => {
            clearTimeout(fadeTimeout);
            clearTimeout(hideTimeout);
        };
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
