'use client';

import styles from './page.module.scss';
import { View } from '@/webgl/View';
import { OrthographicCamera, RoundedBox, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { easing } from 'maath';
import * as THREE from 'three';

const COUNT = 13;
const SPACING = 0.9; // Spacing between cards for linear stacking

function Card({ index, position, onPointerOver, onPointerOut, hovered, active }) {
    const ref = useRef();
    const texture = useTexture(`/images/img${(index % 13) + 1}.webp`);
    
    // Fix texture wrapping and flipping
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.flipY = true;
    
    useFrame((state, delta) => {
        const f = hovered ? 1.25 : active ? 1.25 : 1;
        easing.damp3(ref.current.position, [hovered ? 0.25 : 0, hovered ? 0.25 : 0, 0], 0.1, delta);
        easing.damp3(ref.current.scale, [f, f, f], 0.15, delta);
    });
    
    return (
        <group position={position}>
            <RoundedBox
                ref={ref}
                rotation={[0, -Math.PI / 2, 0]}
                args={[1, 1, 0.001]} // width, height, depth - smaller card size
                radius={0.05} // rounded corner radius
                smoothness={4} // corner smoothness
                onPointerOver={(e) => (e.stopPropagation(), onPointerOver(index))}
                onPointerOut={(e) => (e.stopPropagation(), onPointerOut())}
            >
                <meshPhysicalMaterial 
                    map={texture}
                    transparent={true}
                    opacity={0.85}
                    roughness={0.1}
                    metalness={0.0}
                    clearcoat={1.0}
                    clearcoatRoughness={0.3}
                    transmission={0.2}
                    thickness={0.5}
                    ior={1.5}
                    side={THREE.FrontSide}
                />
            </RoundedBox>
        </group>
    );
}

function Cards() {
    const [hovered, hover] = useState(null);
    
    return (
        <group rotation={[0, 0, 0]}>
            {Array.from({ length: COUNT }).map((_, index) => {
                // Linear stacking like the example: i * spacing - (amount * spacing) / 2
                const xOffset = index * SPACING - (COUNT * SPACING) / 2;
                const yOffset = 0;
                const zOffset = 0; // Slight depth separation
                
                return (
                    <Card
                        key={`card-${index}`}
                        index={index}
                        position={[xOffset, yOffset, zOffset]}
                        onPointerOver={hover}
                        onPointerOut={() => hover(null)}
                        hovered={hovered === index}
                        active={hovered !== null}
                    />
                );
            })}
        </group>
    );
}

export default function Home() {
    return (
        <div className={styles.page}>
            <View className={styles.view} orbit>
                <OrthographicCamera
                    makeDefault
                    zoom={200}
                    position={[-50, 0, 0]}
                    // position={[-50, 30, 50]}
                    near={0.01}
                    far={100000}
                />
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />
                <Cards />
            </View>
        </div>
    );
}
