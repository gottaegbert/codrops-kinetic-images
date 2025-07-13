'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.scss';
import images from '@/data/images';
import { Billboard, Banner } from '@/components/webgl';
import { Loader } from '@/components/ui/modules';
import { View } from '@/webgl/View';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCollageTexture } from '@/hooks';

const COUNT = 10;
const GAP = 3.2;

// Animation component for the camera
function AnimatedCamera() {
    const [progress, setProgress] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        // Start animation after a brief delay
        const timer = setTimeout(() => {
            setHasStarted(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useFrame((state) => {
        if (!hasStarted) return;

        // Animate progress from 0 to 1 over 3 seconds
        const targetProgress = Math.min(progress + 0.01, 1);
        setProgress(targetProgress);

        // Smooth easing function
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOut(targetProgress);

        // Initial position (top view)
        const initialPosition = [0, 50, 0];
        const initialRotation = [-Math.PI / 2, 0, 0];
        const initialFov = 45;

        // Final position (current view)
        const finalPosition = [0, 0, 70];
        const finalRotation = [0, 0, 0];
        const finalFov = 7;

        // Interpolate positions
        const x = initialPosition[0] + (finalPosition[0] - initialPosition[0]) * easedProgress;
        const y = initialPosition[1] + (finalPosition[1] - initialPosition[1]) * easedProgress;
        const z = initialPosition[2] + (finalPosition[2] - initialPosition[2]) * easedProgress;

        // Interpolate rotations
        const rotX = initialRotation[0] + (finalRotation[0] - initialRotation[0]) * easedProgress;
        const rotY = initialRotation[1] + (finalRotation[1] - initialRotation[1]) * easedProgress;
        const rotZ = initialRotation[2] + (finalRotation[2] - initialRotation[2]) * easedProgress;

        // Interpolate FOV
        const fov = initialFov + (finalFov - initialFov) * easedProgress;

        // Update camera
        state.camera.position.set(x, y, z);
        state.camera.rotation.set(rotX, rotY, rotZ);
        state.camera.fov = fov;
        state.camera.updateProjectionMatrix();
    });

    return null;
}

// Animation component for the scene group
function AnimatedGroup({ children }) {
    const groupRef = useRef();
    const [progress, setProgress] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasStarted(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useFrame(() => {
        if (!hasStarted) return;

        // Animate progress from 0 to 1 over 3 seconds
        const targetProgress = Math.min(progress + 0.01, 1);
        setProgress(targetProgress);

        // Smooth easing function
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOut(targetProgress);

        // Final rotation values
        const finalRotation = [-0.15, 0, -0.2];

        // Interpolate from [0, 0, 0] to final rotation
        const rotX = finalRotation[0] * easedProgress;
        const rotY = finalRotation[1] * easedProgress;
        const rotZ = finalRotation[2] * easedProgress;

        // Apply rotation to the group
        if (groupRef.current) {
            groupRef.current.rotation.set(rotX, rotY, rotZ);
        }
    });

    return (
        <group ref={groupRef}>
            {children}
        </group>
    );
}

export default function Home() {
    const { texture, dimensions, isLoading } = useCollageTexture(images);

    if (isLoading) return <Loader />;

    return (
        <div className={styles.page}>
            <div className={styles.intro}>
                <h2 className={styles.introTitle}>Welcome to MaKaleidos</h2>
                <p className={styles.introSubtitle}>
                    Discover contemporary art through immersive virtual exhibitions. 
                    Experience art in a whole new dimension where creativity meets technology.
                </p>
                <a href="/exhibitions" className={styles.ctaButton}>
                    Explore Current Exhibition
                </a>
            </div>

            <View className={styles.view} orbit>
                <PerspectiveCamera
                    makeDefault
                    fov={45}
                    position={[0, 50, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    near={0.01}
                    far={100000}
                />
                <AnimatedCamera />
                <AnimatedGroup>
                    {Array.from({ length: COUNT }).map((_, index) => [
                        <Billboard
                            key={`billboard-${index}`}
                            radius={5}
                            rotation={[0, index * Math.PI * 0.5, 0]}
                            position={[0, (index - (Math.ceil(COUNT / 2) - 1)) * GAP, 0]}
                            texture={texture}
                            dimensions={dimensions}
                        />,
                        <Banner
                            key={`banner-${index}`}
                            radius={5.035}
                            rotation={[0, 0, 0.085]}
                            position={[
                                0,
                                (index - (Math.ceil(COUNT / 2) - 1)) * GAP - GAP * 0.5,
                                0,
                            ]}
                        />,
                    ])}
                </AnimatedGroup>
            </View>
        </div>
    );
}
