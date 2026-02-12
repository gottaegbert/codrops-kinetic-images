'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        const instance = new Lenis({
            autoRaf: true,
            smoothWheel: true,
            // On touch devices, enable smoothTouch, reduce touch multiplier, and avoid syncing native touch
            smoothTouch: isCoarsePointer,
            syncTouch: isCoarsePointer ? false : true,
            touchMultiplier: isCoarsePointer ? 0.6 : 1,
        });

        setLenis(instance);

        // Integrate Lenis with ScrollTrigger
        instance.on('scroll', ScrollTrigger.update);

        const ticker = (time) => {
            instance.raf(time * 1000);
        };

        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        return () => {
            instance.destroy();
            setLenis(null);
            gsap.ticker.remove(ticker);
        };
    }, []);

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
    return useContext(LenisContext);
}
