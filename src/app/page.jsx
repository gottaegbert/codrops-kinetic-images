'use client';

import styles from './page.module.scss';
import { View } from '@/webgl/View';
import { OrthographicCamera, RoundedBox, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { easing } from 'maath';
import * as THREE from 'three';

const COUNT = 19;
const INITIAL_SPACING = 0.05; // Initial spacing between cards
const FINAL_SPACING = 0.6; // Final spacing between cards

function Card({ index, position, onPointerOver, onPointerOut, hovered, active }) {
    const ref = useRef();
    const materialRef = useRef();
    const texture = useTexture(`/images/img${(index % 19) + 1}.webp`);

    // Fix texture wrapping and flipping
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.flipY = true;

    useFrame((_, delta) => {
        const f = hovered ? 1.25 : active ? 1.25 : 1;
        const targetOpacity = hovered ?1.0 : 0.85; // Increase opacity on hover

        easing.damp3(ref.current.position, [  0, 0, hovered ? 0.5:0], 0.1, delta);
        easing.damp3(ref.current.scale, [f, f, f], 0.15, delta);

        // Smooth opacity transition
        if (materialRef.current) {
            easing.damp(materialRef.current, 'opacity', targetOpacity, 0.2, delta);
        }
    });

    return (
        <group position={position}>
            <RoundedBox
                ref={ref}
                rotation={[0, -Math.PI / 2, 0]}
                args={[1, 1, 0.02]} // width, height, depth - smaller card size
                radius={0.02} // rounded corner radius
                smoothness={1} // corner smoothness
                onPointerOver={(e) => (e.stopPropagation(), onPointerOver(index))}
                onPointerOut={(e) => (e.stopPropagation(), onPointerOut())}
            >
                <meshPhysicalMaterial
                    ref={materialRef}
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

function CameraController({ triggerAnimation, onProgressChange }) {
    const cameraRef = useRef();
    const [startTime] = useState(Date.now());
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const [animationStartTime, setAnimationStartTime] = useState(null);

    useFrame(() => {
        if (!cameraRef.current) return;

        const elapsed = (Date.now() - startTime) / 1000;
        // 检查动画触发条件：5秒后自动触发 或 第一次hover触发
        if (!animationTriggered && (elapsed > 5 || triggerAnimation)) {
            setAnimationTriggered(true);
            setAnimationStartTime(Date.now());
        }

        let progress = 0;

        if (animationTriggered && animationStartTime) {
            // 计算从动画开始的时间
            const animationElapsed = (Date.now() - animationStartTime) / 1000;
            const animationProgress = Math.min(animationElapsed / 3, 1);

            // 使用平滑的easing函数 (ease-in-out)
            progress =
                animationProgress < 0.5
                    ? 2 * animationProgress * animationProgress
                    : 1 - Math.pow(-2 * animationProgress + 2, 2) / 2;
        }

        // 通知父组件进度变化，用于更新spacing
        onProgressChange(progress);

        // 创建平滑的相机路径
        const startPos = [-30, 0, 0];
        const endPos = [-40, 15, 30];

        // 使用三角函数创建更自然的曲线运动
        const curveProgress = Math.sin(progress * Math.PI * 0.5);

        // 更新相机位置
        cameraRef.current.position.set(
            startPos[0] + (endPos[0] - startPos[0]) * curveProgress,
            startPos[1] + (endPos[1] - startPos[1]) * curveProgress,
            startPos[2] + (endPos[2] - startPos[2]) * curveProgress
        );

        // 让相机始终看向卡片中心
        cameraRef.current.lookAt(0, 0, 0);
    });

    return (
        <OrthographicCamera
            ref={cameraRef}
            makeDefault
            zoom={300}
            position={[-40, 0, 0]}
            near={0.01}
            far={100000}
        />
    );
}

function Cards({ onFirstHover, currentSpacing }) {
    const [hovered, hover] = useState(null);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [hasTriggeredFirstHover, setHasTriggeredFirstHover] = useState(false);
    const groupRef = useRef();

    // 计算滚动范围限制，使用动态spacing
    const totalWidth = COUNT * currentSpacing;
    const maxScrollLeft = totalWidth / 2 - currentSpacing; // 最左边的卡片可见
    const maxScrollRight = -(totalWidth / 2 - currentSpacing); // 最右边的卡片可见

    // 处理第一次hover触发相机动画
    const handleCardHover = (index) => {
        hover(index);
        if (!hasTriggeredFirstHover) {
            setHasTriggeredFirstHover(true);
            onFirstHover();
        }
    };

    useEffect(() => {
        const handleWheel = (event) => {
            event.preventDefault();
            setScrollOffset((prev) => {
                const newOffset = prev + event.deltaY * 0.01;
                // 限制滚动范围
                return Math.max(maxScrollRight, Math.min(maxScrollLeft, newOffset));
            });
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [maxScrollLeft, maxScrollRight]);

    useFrame((_, delta) => {
        if (groupRef.current) {
            easing.damp3(groupRef.current.position, [scrollOffset, 0, 0], 0.1, delta);
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 0, 0]}>
            {Array.from({ length: COUNT }).map((_, index) => {
                // Linear stacking using dynamic spacing
                const xOffset = index * currentSpacing - (COUNT * currentSpacing) / 2;
                const yOffset = 0;
                const zOffset = 0; // Slight depth separation

                return (
                    <Card
                        key={`card-${index}`}
                        index={index}
                        position={[xOffset, yOffset, zOffset]}
                        onPointerOver={handleCardHover}
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
    const [shouldTriggerAnimation, setShouldTriggerAnimation] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);

    const handleFirstHover = () => {
        if (!shouldTriggerAnimation) {
            setShouldTriggerAnimation(true);
        }
    };

    const handleProgressChange = (progress) => {
        setAnimationProgress(progress);
    };

    // Calculate current spacing based on animation progress
    const currentSpacing = INITIAL_SPACING + (FINAL_SPACING - INITIAL_SPACING) * animationProgress;

    return (
        <div className={styles.page}>
            <View className={styles.view}>
                <CameraController
                    triggerAnimation={shouldTriggerAnimation}
                    onProgressChange={handleProgressChange}
                />
                <ambientLight intensity={1.4} />
                <directionalLight position={[10, 10, 5]} intensity={1.9} />
                <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />
                <Cards onFirstHover={handleFirstHover} currentSpacing={currentSpacing} />
            </View>
        </div>
    );
}
