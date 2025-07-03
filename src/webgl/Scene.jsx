'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { r3f } from '@/webgl/helpers/global';
import * as THREE from 'three';

export default function Scene(props) {
    function onSceneCreated(state) {
        state.gl.toneMapping = THREE.ACESFilmicToneMapping;
    }

    return (
        <Canvas {...props} onCreated={onSceneCreated}>
            <r3f.Out />
            <Preload all />
        </Canvas>
    );
} 