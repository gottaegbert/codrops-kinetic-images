'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './page.module.scss';
import { View } from '@/webgl/View';
import { OrthographicCamera, RoundedBox, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { easing } from 'maath';
import * as THREE from 'three';
import ExhibitionCard from '@/components/ui/ExhibitionCard/ExhibitionCard';
import { useCurrentExhibition } from '@/hooks/useCurrentExhibition';
import { getOptimizedImageUrl } from '@/sanity/client';

const COUNT = 10;
const INITIAL_SPACING = 0.05; // Initial spacing between cards
const FINAL_SPACING = 0.6; // Final spacing between cards

function Card({
    index,
    position,
    onPointerOver,
    onPointerOut,
    hovered,
    active,
    imageUrl,
    altText,
}) {
    const ref = useRef();
    const materialRef = useRef();

    // Use Sanity image if available, otherwise fallback to local images
    const fallbackImage = `/images/img${(index % 19) + 1}.webp`;
    const finalImageUrl = imageUrl || fallbackImage;

    const texture = useTexture(finalImageUrl);

    // Fix texture wrapping and flipping
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.flipY = true;

    useFrame((_, delta) => {
        const f = hovered ? 1.25 : active ? 1.25 : 1;
        const targetOpacity = hovered ? 1.0 : 0.85; // Increase opacity on hover

        easing.damp3(ref.current.position, [0, 0, hovered ? 0.9 : 0], 0.4, delta);
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
            zoom={260}
            position={[-40, 0, 0]}
            near={0.01}
            far={100000}
        />
    );
}

function Cards({ onFirstHover, currentSpacing, viewRef, onScrollStart }) {
    const [hovered, hover] = useState(null);
    // 初始位置设为最左边（显示第一张卡片）
    const [scrollOffset, setScrollOffset] = useState(() => {
        const totalWidth = COUNT * INITIAL_SPACING;
        return totalWidth / 2 - INITIAL_SPACING;
    });
    const [hasTriggeredFirstHover, setHasTriggeredFirstHover] = useState(false);

    // Fetch current exhibition
    const { exhibition, loading, error } = useCurrentExhibition();

    const groupRef = useRef();

    // 计算滚动范围限制，使用动态spacing
    const totalWidth = COUNT * currentSpacing;
    const maxScrollLeft = totalWidth / 2 - currentSpacing; // 最左边的卡片可见（起始位置）
    const maxScrollRight = -(totalWidth / 2 - currentSpacing); // 最右边的卡片可见（结束位置）

    // 处理第一次hover触发相机动画
    const handleCardHover = (index) => {
        hover(index);
        if (!hasTriggeredFirstHover) {
            setHasTriggeredFirstHover(true);
            onFirstHover();
        }
    };

    // 当spacing改变时，调整scrollOffset以保持相对位置
    useEffect(() => {
        const totalWidth = COUNT * currentSpacing;
        const newMaxScrollLeft = totalWidth / 2 - currentSpacing;

        // 如果当前在初始位置，保持在左边
        if (scrollOffset >= maxScrollLeft * 0.9) {
            setScrollOffset(newMaxScrollLeft);
        }
    }, [currentSpacing, maxScrollLeft]);

    useEffect(() => {
        const handleWheel = (event) => {
            const deltaY = event.deltaY;
            const scrollSensitivity = 0.01;

            // Check if mouse is over the 3D view area
            const viewElement = viewRef?.current;
            if (!viewElement) return;

            const rect = viewElement.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const isOverView =
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom;

            // If not over the 3D view, allow normal scrolling
            if (!isOverView) return;

            // 反转滚动方向：向下滚动（deltaY > 0）向右移动（减少offset）
            const newOffset = scrollOffset - deltaY * scrollSensitivity;
            const clampedOffset = Math.max(maxScrollRight, Math.min(maxScrollLeft, newOffset));

            // 检查是否在边界处
            const atLeftBoundary = scrollOffset >= maxScrollLeft && deltaY < 0; // 在左边界且向上滚动
            const atRightBoundary = scrollOffset <= maxScrollRight && deltaY > 0; // 在右边界且向下滚动

            // 只有当不在边界或者滚动方向不会超出边界时才阻止默认行为
            if (!atLeftBoundary && !atRightBoundary) {
                event.preventDefault();
                setScrollOffset(clampedOffset);
                // 通知父组件用户开始滚动
                if (onScrollStart) {
                    onScrollStart();
                }
            }
            // 在边界处且继续向边界方向滚动时，允许页面正常滚动
        };

        const handleTouchStart = (e) => {
            const viewElement = viewRef?.current;
            if (!viewElement) return;

            const rect = viewElement.getBoundingClientRect();
            const touchY = e.touches[0].clientY;
            const isOverView = touchY >= rect.top && touchY <= rect.bottom;

            if (isOverView) {
                viewElement.touchStartY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e) => {
            const viewElement = viewRef?.current;
            if (!viewElement || !viewElement.touchStartY) return;

            const rect = viewElement.getBoundingClientRect();
            const touchY = e.touches[0].clientY;
            const isOverView = touchY >= rect.top && touchY <= rect.bottom;

            if (!isOverView) return;

            const deltaY = viewElement.touchStartY - touchY;
            const scrollSensitivity = 0.008;

            const newOffset = scrollOffset - deltaY * scrollSensitivity;
            const clampedOffset = Math.max(maxScrollRight, Math.min(maxScrollLeft, newOffset));

            // 检查是否在边界处
            const atLeftBoundary = scrollOffset >= maxScrollLeft && deltaY < 0;
            const atRightBoundary = scrollOffset <= maxScrollRight && deltaY > 0;

            // 只有当不在边界或者滚动方向不会超出边界时才阻止默认行为
            if (!atLeftBoundary && !atRightBoundary) {
                e.preventDefault();
                setScrollOffset(clampedOffset);
                viewElement.touchStartY = touchY; // 更新起始位置
                // 通知父组件用户开始滚动
                if (onScrollStart) {
                    onScrollStart();
                }
            }
        };

        const handleTouchEnd = () => {
            const viewElement = viewRef?.current;
            if (viewElement) {
                delete viewElement.touchStartY;
            }
        };

        // Use window event listener to capture all scroll events
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [maxScrollLeft, maxScrollRight, scrollOffset, viewRef]);

    useFrame((_, delta) => {
        if (groupRef.current) {
            easing.damp3(groupRef.current.position, [scrollOffset, 0, 0], 0.1, delta);
        }
    });

    // Prepare image data from current exhibition
    const exhibitionImages = exhibition?.images || [];
    const imageData = Array.from({ length: COUNT }).map((_, index) => {
        const sanityImage = exhibitionImages[index];

        if (sanityImage?.asset) {
            return {
                url: getOptimizedImageUrl(sanityImage, {
                    width: 800,
                    height: 800,
                    quality: 85,
                    format: 'webp',
                }),
                alt: sanityImage.alt || `${exhibition?.title || 'Gallery'} image ${index + 1}`,
                title: sanityImage.title || `Image ${index + 1}`,
            };
        }

        return {
            url: null, // Will use local fallback
            alt: `Gallery image ${index + 1}`,
            title: `Image ${index + 1}`,
        };
    });

    // Debug info
    useEffect(() => {
        if (!loading) {
            console.log('=== Exhibition Debug Info ===');
            console.log('Exhibition:', exhibition);
            console.log('Exhibition title:', exhibition?.title || 'No current exhibition');
            console.log('Exhibition images raw:', exhibition?.images);
            console.log('Exhibition images count:', exhibition?.images?.length || 0);
            console.log('Processed imageData:', imageData);
            console.log('Has error:', !!error);
            console.log('Error details:', error);
            console.log('Error message:', error?.message);
            console.log('Loading state:', loading);

            // 如果有错误，显示在页面上
            if (error) {
                console.error('SANITY ERROR:', error);
            }
            console.log('=============================');
        }
    }, [exhibition, exhibitionImages.length, loading, error, imageData]);

    return (
        <group ref={groupRef} rotation={[0, 0, 0]}>
            {imageData.map((imageInfo, index) => {
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
                        imageUrl={imageInfo.url}
                        altText={imageInfo.alt}
                    />
                );
            })}
        </group>
    );
}

export default function Home() {
    const [shouldTriggerAnimation, setShouldTriggerAnimation] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);
    const [showScrollHint, setShowScrollHint] = useState(true);
    const viewRef = useRef();

    // 导入语言上下文
    const { t } = useLanguage();

    const handleFirstHover = () => {
        if (!shouldTriggerAnimation) {
            setShouldTriggerAnimation(true);
        }
    };

    const handleProgressChange = (progress) => {
        setAnimationProgress(progress);
    };

    const handleScrollStart = () => {
        if (showScrollHint) {
            setShowScrollHint(false);
        }
    };

    // 自动隐藏滚动提示
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowScrollHint(false);
        }, 5000); // 5秒后自动隐藏

        return () => clearTimeout(timer);
    }, []);

    // Calculate current spacing based on animation progress
    const currentSpacing = INITIAL_SPACING + (FINAL_SPACING - INITIAL_SPACING) * animationProgress;

    return (
        <div className={styles.page}>
            <div className={styles.heroSection}>
                <ExhibitionCard />
                {/* Optional: Show loading state for Sanity images */}
                {/* {sanityLoading && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', fontSize: '12px' }}>
                        Loading Sanity images...
                    </div>
                )} */}
                <View ref={viewRef} className={styles.view}>
                    <CameraController
                        triggerAnimation={shouldTriggerAnimation}
                        onProgressChange={handleProgressChange}
                    />
                    <ambientLight intensity={1.4} />
                    <directionalLight position={[10, 10, 5]} intensity={1.9} />
                    <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />
                    <Cards
                        onFirstHover={handleFirstHover}
                        currentSpacing={currentSpacing}
                        viewRef={viewRef}
                        onScrollStart={handleScrollStart}
                    />
                </View>

                {/* 移动端滚动提示 */}
                {showScrollHint && (
                    <div className={styles.scrollHint}>
                        <svg className={styles.scrollIcon} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 5v14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M19 12l-7 7-7-7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>{t('home.scrollHint')}</span>
                    </div>
                )}
            </div>
            <div className={styles.content} data-content-section>
                <ExhibitionCard mobile={true} />
                <div className={styles.section}>
                    {/* 横向滚动条 - 展览信息 */}
                    <div className={styles.infiniteScroll}>
                        <div className={styles.scrollContent}>
                            <div className={styles.scrollItem}>{t('home.issue')}</div>
                            <div className={styles.scrollItem}>{t('home.artist')}</div>
                            <div className={styles.scrollItem}>{t('home.exhibition')}</div>
                            <div className={styles.scrollItem}>{t('home.visions')}</div>
                            {/* Duplicate content for seamless loop */}
                            <div className={styles.scrollItem}>{t('home.issue')}</div>
                            <div className={styles.scrollItem}>{t('home.artist')}</div>
                            <div className={styles.scrollItem}>{t('home.exhibition')}</div>
                            <div className={styles.scrollItem}>{t('home.visions')}</div>
                        </div>
                    </div>

                    {/* 页面导航 */}
                    <div className={styles.pageNavigation}>
                        <span className={styles.navLabel}>{t('home.onThisPage')}</span>
                        <div className={styles.navLinks}>
                            <a href="#press" className={styles.navLink}>
                                {t('home.press')}
                            </a>
                            <a href="#interview" className={styles.navLink}>
                                {t('home.interview')}
                            </a>
                            <a href="#biography" className={styles.navLink}>
                                {t('home.biography')}
                            </a>
                            <a href="#selected-exhibition" className={styles.navLink}>
                                {t('home.selectedExhibition')}
                            </a>
                        </div>
                    </div>

                    <h2 className={styles.sectionTitle}>{t('home.exhibitionTitle')}</h2>
                    <p className={styles.sectionText}>{t('home.exhibitionDescription')}</p>
                </div>
            </div>
        </div>
    );
}
