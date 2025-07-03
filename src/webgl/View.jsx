'use client';

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react';
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei';
import { Three } from '@/webgl/helpers/Three';
import { useControls } from 'leva';

export const Common = ({ cameraFOV = 20, cameraPosition = [0, 0, 13] }) => {
    const { fov, position } = useControls({
        fov: { value: cameraFOV, min: 1, max: 100, step: 0.1 },
        position: { value: cameraPosition, min: -100, max: 100, step: 1 },
    });

    return (
        <Suspense fallback={null}>
            <ambientLight />
            <PerspectiveCamera makeDefault fov={fov} position={position} near={0.01} far={100000} />
        </Suspense>
    );
};

const View = forwardRef(({ children, orbit, ...props }, ref) => {
    const localRef = useRef(null);
    useImperativeHandle(ref, () => localRef.current);

    return (
        <>
            <div ref={localRef} {...props} />
            <Three>
                <ViewImpl track={localRef}>
                    {children}
                    {orbit && <OrbitControls />}
                </ViewImpl>
            </Three>
        </>
    );
});

View.displayName = 'View';

export { View }; 