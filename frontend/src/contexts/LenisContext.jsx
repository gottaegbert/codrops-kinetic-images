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

        // Detect coarse pointer (touch) devices
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

        const instance = new Lenis({
            autoRaf: true,
            smoothWheel: true,
            // On touch devices, enable smoothTouch, reduce touch multiplier, and avoid syncing native touch
            smoothTouch: isCoarsePointer,
            syncTouch: isCoarsePointer ? false : true,
            touchMultiplier: isCoarsePointer ? 0.6 : 1,
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
