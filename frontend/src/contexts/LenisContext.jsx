'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return undefined;
        }

        const instance = new Lenis({
            autoRaf: true,
            smoothWheel: true,
            syncTouch: true,
        });

        setLenis(instance);

        return () => {
            instance.destroy();
            setLenis(null);
        };
    }, []);

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
    return useContext(LenisContext);
}
