'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei';
import { Three } from '@/webgl/helpers/Three';

const View = forwardRef(({ children, orbit, cameraPosition = [0, 0, 13], cameraFOV = 20, ...props  }, ref) => {
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
                <PerspectiveCamera makeDefault fov={cameraFOV} position={cameraPosition} near={0.01} far={100000} />
            </Three>
        </>
    );
});

View.displayName = 'View';

export { View }; 