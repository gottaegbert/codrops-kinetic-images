'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useLenis } from '@/contexts/LenisContext';
import { useHomeContent } from '@/hooks/useHomeContent';
import ExhibitionContentRenderer from '@/components/ui/ExhibitionContentRenderer';
import PDFDownload from '@/components/ui/PDFDownload/PDFDownload';
import ImageViewer from '@/components/ui/ImageViewer/ImageViewer';
import styles from './page.module.scss';
import exhibitionStyles from '@/components/ui/ExhibitionCard/ExhibitionCard.module.scss';
import { View } from '@/webgl/View';
import { OrthographicCamera, RoundedBox, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import { easing } from 'maath';
import * as THREE from 'three';
import ExhibitionCard from '@/components/ui/ExhibitionCard/ExhibitionCard';
import { useCurrentExhibition } from '@/hooks/useCurrentExhibition';
import { getOptimizedImageUrl } from '@/sanity/client';

const INITIAL_SPACING = 1; // Initial spacing between cards
const FINAL_SPACING = 1.0; // Final spacing between cards

// Current Exhibition Button Component
function CurrentExhibitionButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { language, t } = useLanguage();
    const lenis = useLenis();
    const { currentExhibition } = useHomeContent();

    const formatDateRange = (startDate, endDate) => {
        if (!startDate || !endDate) return '';
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const options = { 
            month: 'short', 
            day: 'numeric',
            year: start.getFullYear() !== end.getFullYear() ? 'numeric' : undefined
        };
        
        const startStr = start.toLocaleDateString('en-US', options);
        const endStr = end.toLocaleDateString('en-US', options);
        
        return `${startStr} - ${endStr}, ${end.getFullYear()}`;
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLearnMoreClick = () => {
        const contentSection = document.querySelector('[data-content-section]');
        if (contentSection) {
            if (lenis) {
                lenis.scrollTo(contentSection);
            } else {
                contentSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
        setIsExpanded(false);
    };

    return (
        <div className={exhibitionStyles.currentExhibitionContainer}>
            <button 
                className={`${exhibitionStyles.currentExhibitionButton} ${isExpanded ? exhibitionStyles.expanded : ''}`}
                onClick={handleToggle}
            >
                <span className={exhibitionStyles.buttonText}>{t('home.currentExhibitionButton')}</span>
            
                <svg 
                    className={`${exhibitionStyles.expandIcon} ${isExpanded ? exhibitionStyles.rotated : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none"
                >
                    <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isExpanded && (
                <div className={exhibitionStyles.exhibitionDetails}>
                    <div className={exhibitionStyles.exhibitionContent}>
                        <div className={exhibitionStyles.exhibitionNumber}>
                            <span className={exhibitionStyles.number}>
                                {currentExhibition?.exhibitionCard?.number || '1'}
                            </span>
                        </div>

                        <h4 className={exhibitionStyles.exhibitionName}>
                            {currentExhibition?.title || 'The Harmonising Gaze'}
                        </h4>

                        <div className={exhibitionStyles.details}>
                            <div className={exhibitionStyles.timeInfo}>
                                <span>
                                    {formatDateRange(
                                        currentExhibition?.exhibitionCard?.startDate, 
                                        currentExhibition?.exhibitionCard?.endDate
                                    ) || 'Sep.4 - Oct. 10 2025'}
                                </span>
                            </div>

                            <div className={exhibitionStyles.artistInfo}>
                                <span>
                                    {currentExhibition?.exhibitionCard?.featuredArtists?.[language] || 
                                     currentExhibition?.artist || 'Francesco Zanatta'}
                                </span>
                            </div>
                        </div>

                        <button className={exhibitionStyles.exploreButton} onClick={handleLearnMoreClick}>
                            <span>{t('home.explore')}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Card({
    index,
    position,
    onPointerOver,
    onPointerOut,
    onClick,
    hovered,
    active,
    imageUrl,
    imageDimensions,
    animationProgress = 0,
    revealProgress = 1,
    radialRoll = 0,
}) {
    const cardRef = useRef();
    const imageShaderRef = useRef();
    const [screenSize, setScreenSize] = useState('desktop');

    // Check screen size with multiple breakpoints
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            if (width <= 768) {
                setScreenSize('mobile');
            } else if (width <= 1024 || height <= 768) {
                setScreenSize('medium');
            } else if (width <= 1440) {
                setScreenSize('laptop');
            } else {
                setScreenSize('desktop');
            }
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Only use Sanity images, no fallback
    if (!imageUrl) {
        return null; // Don't render card if no image from Sanity
    }

    const texture = useTexture(imageUrl);

    // Configure texture for proper display
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = true; // Don't flip Y to maintain correct orientation
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Calculate aspect ratio from image dimensions
    const aspectRatio = imageDimensions ? imageDimensions.width / imageDimensions.height : 1;

    // Screen-size responsive base size
    let baseSize;
    switch (screenSize) {
        case 'mobile':
            baseSize = 1.8;
            break;
        case 'medium':
            // 13-inch MacBook - smaller cards to fit better
            baseSize = 1.2;
            break;
        case 'laptop':
            baseSize = 1.3;
            break;
        default: // desktop
            baseSize = 1.4;
    }
    let cardWidth, cardHeight;

    if (aspectRatio >= 1) {
        // Landscape image
        cardWidth = baseSize;
        cardHeight = baseSize / aspectRatio;
    } else {
        // Portrait image
        cardWidth = baseSize * aspectRatio;
        cardHeight = baseSize;
    }
    const maxCardSize = Math.max(cardWidth, cardHeight);
    const cardThickness = maxCardSize * 0.01; // ultra-thin slab
    const edgeRadius = Math.min(cardWidth, cardHeight) * 0.01;
    const imageDepth = cardThickness * 1;

    useFrame((_, delta) => {
        if (!cardRef.current) return;

        // Start facing the user (0) and ease to -15°
        const prog = animationProgress || 0;
        const introEase = Math.sin(prog * Math.PI * 0.5);
        const targetYaw = THREE.MathUtils.lerp(0, -Math.PI / 6, introEase);
        const dampRot = screenSize === 'mobile' ? 0.28 : 0.22;
        easing.damp(cardRef.current.rotation, 'y', targetYaw, dampRot, delta);
        easing.damp(cardRef.current.rotation, 'z', radialRoll, dampRot * 0.9, delta);

        const f = hovered ? 1.2 : active ? 1.2 : 1;
        const scaledF = THREE.MathUtils.lerp(0.95, f, revealProgress);
        const introScale = screenSize === 'mobile' ? THREE.MathUtils.lerp(0.72, 1, introEase) : 1;
        const finalScale = scaledF * introScale;
        const targetOpacity = hovered ? 1.0 : 0.85; // Increase opacity on hover

        const dampPos = screenSize === 'mobile' ? 0.26 : 0.2;
        const dampScale = screenSize === 'mobile' ? 0.24 : 0.18;
        easing.damp3(cardRef.current.position, [0, 0, hovered ? -0.9 : 0], dampPos, delta);
        easing.damp3(cardRef.current.scale, [finalScale, finalScale, finalScale], dampScale, delta);

        // Smooth opacity transition on the custom shader
        if (imageShaderRef.current?.uniforms?.uOpacity) {
            easing.damp(
                imageShaderRef.current.uniforms.uOpacity,
                'value',
                targetOpacity,
                0.2,
                delta
            );
        }
    });

    return (
        <group position={position}>
            <group ref={cardRef} rotation={[0, 0, 0]} renderOrder={-index * 2}>
                {/* <RoundedBox
                    args={[cardWidth, cardHeight, cardThickness]}
                    radius={edgeRadius}
                    smoothness={4}
                    renderOrder={index * 2 + 1}
                >
                    <shaderMaterial
                        uniforms={useMemo(
                            () => ({
                                uTexture: { value: texture },
                            }),
                            [texture]
                        )}
                        transparent={true}
                        depthWrite={false}
                        depthTest={true}
                        vertexShader={`
                            varying vec3 vNormal;
                            varying vec2 vUv;
                            void main() {
                                vNormal = normalize(normalMatrix * normal);
                                vUv = uv;
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                            }
                        `}
                        fragmentShader={`
                            varying vec3 vNormal;
                            varying vec2 vUv;
                            uniform sampler2D uTexture;

                            void main() {
                                vec2 uv = clamp(vUv, 0.001, 0.999);
                                vec3 edgeSample = (
                                    texture2D(uTexture, vec2(0.02, uv.y)).rgb +
                                    texture2D(uTexture, vec2(0.98, uv.y)).rgb +
                                    texture2D(uTexture, vec2(uv.x, 0.02)).rgb +
                                    texture2D(uTexture, vec2(uv.x, 0.98)).rgb
                                ) * 0.25;

                                vec3 glassBase = vec3(0.04, 0.045, 0.05); // dark glass tint
                                float fres = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);

                                vec3 tinted = mix(glassBase, edgeSample, 0.5);
                                tinted = mix(tinted, edgeSample, fres * 0.3);

                                float alpha = 0.05 + fres * 0.1;
                                gl_FragColor = vec4(tinted, alpha);
                            }
                        `}
                    />
                </RoundedBox> */}

                {/* Image layer offset forward */}
                    <mesh
                    position={[0, 0, cardThickness / 2 + imageDepth / 2 + 0.0003]}
                    renderOrder={-(index * 2 + 1)}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        document.body.style.cursor = 'pointer';
                        onPointerOver(index);
                    }}
                    onPointerOut={(e) => {
                        e.stopPropagation();
                        document.body.style.cursor = 'default';
                        onPointerOut();
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        const pointerEvent = e?.nativeEvent || e;
                        const clientX =
                            pointerEvent?.clientX ??
                            pointerEvent?.pageX ??
                            (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
                        const clientY =
                            pointerEvent?.clientY ??
                            pointerEvent?.pageY ??
                            (typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
                        const startScale = Math.min(
                            0.65,
                            Math.max(0.35, Math.max(cardWidth, cardHeight) / 3)
                        );
                        onClick && onClick(index, { clientX, clientY, scale: startScale });
                    }}
                >
                    <boxGeometry args={[cardWidth, cardHeight, imageDepth]} />
                    <shaderMaterial
                        ref={imageShaderRef}
                        uniforms={useMemo(
                            () => ({
                                uTexture: { value: texture },
                                uOpacity: { value: 1.0 },
                            }),
                            [texture]
                        )}
                        transparent={true}
                        depthWrite={false}
                        depthTest={true}
                        polygonOffset={true}
                        polygonOffsetFactor={-2}
                        polygonOffsetUnits={-2}
                        vertexShader={`
                            varying vec2 vUv;
                            void main() {
                                vUv = uv;
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                            }
                        `}
                        fragmentShader={`
                            varying vec2 vUv;
                            uniform sampler2D uTexture;
                            uniform float uOpacity;

                            void main() {
                                vec2 uv = clamp(vUv, 0.0, 1.0);
                                vec4 color = texture2D(uTexture, uv);

                                float edgeX = smoothstep(0.32, 0.46, abs(uv.x - 0.5));
                                float edgeY = smoothstep(0.32, 0.46, abs(uv.y - 0.5));
                                float edge = clamp(max(edgeX, edgeY), 0.0, 1.0);

                                // Gentle edge tint with subtle blur near edges
                                vec3 edgeXCol = (
                                    texture2D(uTexture, vec2(0.04, uv.y)).rgb +
                                    texture2D(uTexture, vec2(0.96, uv.y)).rgb
                                ) * 0.5;
                                vec3 edgeYCol = (
                                    texture2D(uTexture, vec2(uv.x, 0.04)).rgb +
                                    texture2D(uTexture, vec2(uv.x, 0.96)).rgb
                                ) * 0.5;
                                vec3 edgeColor = mix(edgeXCol, edgeYCol, 0.1);

                                // Radial smear outward near the edge
                                vec2 dir = normalize(uv - 0.5 + 1e-4);
                                float spread = 0.02 * edge; // tighter outward radius
                                vec3 blur =
                                    texture2D(uTexture, uv).rgb * 0.55 +
                                    texture2D(uTexture, uv + dir * spread * 0.7).rgb * 0.25 +
                                    texture2D(uTexture, uv + dir * spread * 1.2).rgb * 0.2;

                                // Keep edges translucent with gentler blur
                                vec3 tinted = mix(color.rgb, edgeColor, edge * 0.04);
                                tinted = mix(tinted, blur, edge * 0.3);

                                float minAlpha = 0.85; // keep more solid interior
                                float alpha = mix(1.0, minAlpha, edge) * uOpacity;
                                gl_FragColor = vec4(tinted, color.a * alpha);
                            }
                        `}
                    />
                </mesh>
            </group>
        </group>
    );
}

function CameraController({ triggerAnimation, onProgressChange }) {
    const cameraRef = useRef();
    const [startTime] = useState(Date.now());
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const [animationStartTime, setAnimationStartTime] = useState(null);
    const [screenSize, setScreenSize] = useState('desktop');

    // Check screen size with multiple breakpoints
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            if (width <= 768) {
                setScreenSize('mobile');
            } else if (width <= 1024 || height <= 768) {
                // Medium screens like 13-inch MacBook (1440x900) or tablets
                setScreenSize('medium');
            } else if (width <= 1440) {
                setScreenSize('laptop');
            } else {
                setScreenSize('desktop');
            }
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useFrame(() => {
        if (!cameraRef.current) return;

        const elapsed = (Date.now() - startTime) / 1000;
        if (!animationTriggered && (elapsed > 5 || triggerAnimation)) {
            setAnimationTriggered(true);
            setAnimationStartTime(Date.now());
        }

        let progress = 0;

        if (animationTriggered && animationStartTime) {
            const animationElapsed = (Date.now() - animationStartTime) / 1000;
            const animationDuration = screenSize === 'mobile' ? 3.8 : 3.2;
            const animationProgress = Math.min(animationElapsed / animationDuration, 1);
            // cubic ease-in-out for a slower, smoother ramp
            progress =
                animationProgress < 0.5
                    ? 4 * Math.pow(animationProgress, 3)
                    : 1 - Math.pow(-2 * animationProgress + 2, 3) / 2;
        }

        onProgressChange(progress);

        // Keep camera static at final position/lookAt per screen size
        let finalPos;
        let lookAtTarget;
        switch (screenSize) {
            case 'mobile':
                finalPos = [0, 12, 24];
                lookAtTarget = [0, -0.5, 0];
                break;
            case 'medium':
                finalPos = [0, 18, 30];
                lookAtTarget = [0, -1.5, 0];
                break;
            case 'laptop':
                finalPos = [0, 20, 35];
                lookAtTarget = [0, -1, 0];
                break;
            default: // desktop
                finalPos = [0, 20, 40];
                lookAtTarget = [0, 0, 0];
        }
        cameraRef.current.position.set(...finalPos);
        cameraRef.current.lookAt(...lookAtTarget);
    });

    // Screen-size responsive zoom and initial position
    let zoom, initialPosition;
    switch (screenSize) {
        case 'mobile':
            zoom = 150; // 稍微拉远一点以看到底部卡片
            initialPosition = [0, 12, 24]; // final position
            break;
        case 'medium':
            // 13-inch MacBook optimization
            zoom = 200;
            initialPosition = [0, 18, 30];
            break;
        case 'laptop':
            zoom = 240;
            initialPosition = [0, 20, 35];
            break;
        default: // desktop
            zoom = 260;
            initialPosition = [0, 20, 40];
    }

    return (
        <OrthographicCamera
            ref={cameraRef}
            makeDefault
            zoom={zoom}
            position={initialPosition}
            near={0.01}
            far={100000}
        />
    );
}

function Cards({
    onFirstHover,
    currentSpacing,
    viewRef,
    onScrollStart,
    onCardClick,
    animationProgress,
    onImagesLoaded,
    onLoadProgress,
}) {
    const [hovered, hover] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [screenSize, setScreenSize] = useState('desktop');
    const animationProgressRef = useRef(animationProgress);

    // Check screen size with multiple breakpoints
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            if (width <= 768) {
                setScreenSize('mobile');
            } else if (width <= 1024 || height <= 768) {
                setScreenSize('medium');
            } else if (width <= 1440) {
                setScreenSize('laptop');
            } else {
                setScreenSize('desktop');
            }
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        animationProgressRef.current = animationProgress;
    }, [animationProgress]);

    const baseGroupYOffset = useMemo(() => {
        switch (screenSize) {
            case 'mobile':
                return -0.5;
            case 'medium':
                return -0.6;
            case 'laptop':
                return 0;
            default:
                return 0;
        }
    }, [screenSize]);

    const introLift = useMemo(() => {
        switch (screenSize) {
            case 'mobile':
                return 1.5;
            case 'medium':
                return 2.5;
            case 'laptop':
                return 1.5;
            default:
                return 1;
        }
    }, [screenSize]);

    // Fetch current exhibition first
    const { exhibition, loading, error } = useCurrentExhibition();

    // Calculate dynamic count based on available images
    const exhibitionImages = exhibition?.images || [];
    const validImages = exhibitionImages.filter((img) => img?.asset);
    const dynamicCount = validImages.length;

    const groupRef = useRef();

    useFrame((_, delta) => {
        if (groupRef.current) {
            const introEase = Math.sin((animationProgressRef.current || 0) * Math.PI * 0.5);
            const animatedYOffset = baseGroupYOffset + introLift * (1 - introEase);
            easing.damp3(groupRef.current.position, [scrollOffset, animatedYOffset, 0], 0.14, delta);
        }
    });

    // Prepare image data from current exhibition - only use available Sanity images
    const imageData = exhibitionImages
        .filter((sanityImage) => sanityImage?.asset) // Only include images with assets
        .map((sanityImage, index) => {
            const dimensions = sanityImage.asset.metadata?.dimensions;
            return {
                url: getOptimizedImageUrl(sanityImage, {
                    width: 1200, // Higher resolution for better quality
                    quality: 95, // Higher quality, less compression
                    format: 'webp',
                    fit: 'max', // Don't crop, maintain aspect ratio
                }),
                alt: sanityImage.alt || `${exhibition?.title || 'Gallery'} image ${index + 1}`,
                title: sanityImage.title || `Image ${index + 1}`,
                dimensions: dimensions,
                originalIndex: index,
            };
        });

    // Preload all images for better performance
    useEffect(() => {
        if (imageData.length > 0) {
            setImagesLoaded(false);
            onLoadProgress?.(0);
            let loadedCount = 0;
            const totalImages = imageData.length;

            imageData.forEach((imageInfo) => {
                if (imageInfo.url) {
                    const img = new Image();
                    const handleDone = () => {
                        loadedCount++;
                        const progress = loadedCount / totalImages;
                        onLoadProgress?.(progress);
                        if (loadedCount === totalImages) {
                            setImagesLoaded(true);
                        }
                    };
                    img.onload = handleDone;
                    img.onerror = handleDone;
                    img.src = imageInfo.url;
                }
            });

            if (totalImages === 0) {
                setImagesLoaded(true);
                onLoadProgress?.(1);
            }
        } else {
            setImagesLoaded(true);
            onLoadProgress?.(1);
        }
    }, [imageData, onLoadProgress]);

    useEffect(() => {
        if (imagesLoaded && onImagesLoaded) {
            onImagesLoaded();
        }
    }, [imagesLoaded, onImagesLoaded]);

    // Calculate dynamic spacing based on actual image count and image widths
    const actualCount = imageData.length;
    const spacingValues = useMemo(() => {
        const baseSizeFor = () => {
            switch (screenSize) {
                case 'mobile':
                    return 2.2; // smaller base size for mobile
                case 'medium':
                    return 2.0;
                case 'laptop':
                    return 2.0;
                default:
                    return 2.0;
            }
        };
        const baseSize = baseSizeFor();
        return imageData.map((imageInfo) => {
            const dims = imageInfo.dimensions;
            const aspect = dims?.width && dims?.height ? dims.width / dims.height : 1;
            let cardWidth, cardHeight;
            if (aspect >= 1) {
                cardWidth = baseSize;
                cardHeight = baseSize / aspect;
            } else {
                cardWidth = baseSize * aspect;
                cardHeight = baseSize;
            }
            const maxSize = Math.max(cardWidth, cardHeight);
            const baseSpacing = Math.max(FINAL_SPACING, maxSize * 0.9); // ensure some spacing
            const maxSpacing = FINAL_SPACING * 1.05; // tighter cap to avoid large end gaps
            return Math.min(baseSpacing, maxSpacing);
        });
    }, [imageData, screenSize]);
    const totalWidth =
        spacingValues.length > 0 ? spacingValues.reduce((sum, v) => sum + v, 0) : 0;
    const edgeSpacing = spacingValues[0] ?? FINAL_SPACING;
    const halfSpan = totalWidth > 0 ? totalWidth / 2 - edgeSpacing / 2 : 0;

    // 初始位置设为最左边（显示第一张卡片）
    const [scrollOffset, setScrollOffset] = useState(() => {
        if (dynamicCount === 0) return 0;
        return halfSpan;
    });
    const [hasTriggeredFirstHover, setHasTriggeredFirstHover] = useState(false);

    // 计算滚动范围限制，使用动态spacing和动态图片数量
    const maxScrollLeft = dynamicCount > 0 ? halfSpan : 0;
    const maxScrollRight = dynamicCount > 0 ? -halfSpan : 0;

    // 处理第一次hover触发相机动画
    const handleCardHover = (index) => {
        hover(index);
        if (!hasTriggeredFirstHover) {
            setHasTriggeredFirstHover(true);
            onFirstHover();
        }
    };

    // 当spacing或图片数量改变时，调整scrollOffset以保持相对位置
    useEffect(() => {
        if (dynamicCount === 0) {
            setScrollOffset(0);
            return;
        }

        // 如果当前在初始位置，保持在左边
        if (scrollOffset >= maxScrollLeft * 0.9) {
            setScrollOffset(halfSpan);
        }
    }, [halfSpan, maxScrollLeft, dynamicCount, scrollOffset]);

    useEffect(() => {
        const viewElement = viewRef?.current;
        if (!viewElement) return undefined;

        const handleWheel = (event) => {
            const deltaY = event.deltaY;
            const scrollSensitivity = 0.01;

            const newOffset = scrollOffset - deltaY * scrollSensitivity;
            const clampedOffset = Math.max(maxScrollRight, Math.min(maxScrollLeft, newOffset));

            const atLeftBoundary = scrollOffset >= maxScrollLeft && deltaY < 0;
            const atRightBoundary = scrollOffset <= maxScrollRight && deltaY > 0;

            if (!atLeftBoundary && !atRightBoundary) {
                if (event.cancelable) {
                    event.preventDefault();
                }
                event.stopPropagation();
                setScrollOffset(clampedOffset);
                if (onScrollStart) {
                    onScrollStart();
                }
            }
        };

        const handleTouchStart = (e) => {
            const rect = viewElement.getBoundingClientRect();
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const isOverView =
                touchX >= rect.left &&
                touchX <= rect.right &&
                touchY >= rect.top &&
                touchY <= rect.bottom;

            if (isOverView) {
                viewElement.touchStartX = touchX;
                viewElement.touchStartY = touchY;
                viewElement.lastTouchX = touchX;
                viewElement.lastTouchY = touchY;
                viewElement.isHorizontalSwipe = undefined;
            }
        };

        const handleTouchMove = (e) => {
            if (viewElement.touchStartX == null || viewElement.touchStartY == null) return;

            const rect = viewElement.getBoundingClientRect();
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const isOverView =
                touchX >= rect.left &&
                touchX <= rect.right &&
                touchY >= rect.top &&
                touchY <= rect.bottom;

            if (!isOverView) return;

            const dx = touchX - viewElement.lastTouchX;
            const dy = touchY - viewElement.lastTouchY;

            const threshold = 6;
            if (viewElement.isHorizontalSwipe === undefined) {
                const totalDx = Math.abs(touchX - viewElement.touchStartX);
                const totalDy = Math.abs(touchY - viewElement.touchStartY);
                if (totalDx > threshold || totalDy > threshold) {
                    viewElement.isHorizontalSwipe = totalDx > totalDy;
                }
            }

            if (viewElement.isHorizontalSwipe) {
                const scrollSensitivity = 0.02;
                const newOffset = scrollOffset + dx * scrollSensitivity;
                const clampedOffset = Math.max(maxScrollRight, Math.min(maxScrollLeft, newOffset));

                const atLeftBoundary = scrollOffset >= maxScrollLeft && dx > 0;
                const atRightBoundary = scrollOffset <= maxScrollRight && dx < 0;

                if (!atLeftBoundary && !atRightBoundary) {
                    e.preventDefault();
                    setScrollOffset(clampedOffset);
                    if (onScrollStart) onScrollStart();
                }
            }

            viewElement.lastTouchX = touchX;
            viewElement.lastTouchY = touchY;
        };

        const handleTouchEnd = () => {
            delete viewElement.touchStartX;
            delete viewElement.touchStartY;
            delete viewElement.lastTouchX;
            delete viewElement.lastTouchY;
            delete viewElement.isHorizontalSwipe;
        };

        viewElement.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            viewElement.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [maxScrollLeft, maxScrollRight, onScrollStart, scrollOffset, viewRef]);

    // Show loading state or error message if needed
    if (loading) {
        return (
            <group>
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[2, 0.5]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
                </mesh>
            </group>
        );
    }

    if (error) {
        console.error('Exhibition loading error:', error);
        return (
            <group>
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[3, 0.5]} />
                    <meshBasicMaterial color="#ff6b6b" transparent opacity={0.8} />
                </mesh>
            </group>
        );
    }

    if (imageData.length === 0) {
        return (
            <group>
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[4, 0.5]} />
                    <meshBasicMaterial color="#ffd93d" transparent opacity={0.8} />
                </mesh>
            </group>
        );
    }

    return (
        <group ref={groupRef} rotation={[0, 0, 0]}>
            {imageData.map((imageInfo, index) => {
                // Screen-size responsive Y positioning - 小尺寸固定在底部
                let yOffset;
        switch (screenSize) {
            case 'mobile':
                // 移动端：更居中，初始位置略低
                yOffset = -1.3;
                break;
            case 'medium':
                // 13-inch MacBook - 稍微下移但不要太极端
                        yOffset = -1;
                        break;
                    case 'laptop':
                        yOffset = -1.5;
                        break;
                    default: // desktop
                        yOffset = -0.5;
                }
                const zOffset = 0;

                // Entry animation: top-down stagger, then wave push along Z
                const entryDelay = index * 0.06;
                const entryDuration = 0.6;
                const entryProgress = THREE.MathUtils.clamp(
                    (animationProgress - entryDelay) / entryDuration,
                    0,
                    1
                );
                const entryEase = Math.sin(entryProgress * Math.PI * 0.5);
                const settleEase = THREE.MathUtils.clamp((animationProgress - 0.6) / 0.4, 0, 1);
                const waveScale = entryEase * (1 - settleEase);
                const finalEase = Math.min(1, entryEase + settleEase); // ensures we fully settle spacing

                // Vertical S-curve once in place
                const waveAmp = 0.5;
                const wave = Math.sin(index * 1.2) * waveAmp * waveScale;

                // Z push wave after entry starts
                const pushEase = Math.sin(Math.max(entryProgress - 0.3, 0) * Math.PI * 0.5);
                const zWave = -0.35 * Math.sin(animationProgress * 2.2 + index * 0.7) * pushEase * (1 - settleEase);

                // Start near final center (no big drop), slight forward offset
                const startY = yOffset;
                const startZ = zOffset + 0.2;

                // Position based on per-card spacing to reduce overlap
                let cumulative = -totalWidth / 2;
                for (let i = 0; i < index; i++) {
                    cumulative += spacingValues[i] || 0;
                }
                const xCenter = cumulative + (spacingValues[index] || FINAL_SPACING) / 2;
                const indexFromCenter = index - (actualCount - 1) / 2;
                const extraSpread = edgeSpacing * 0.6;
                const startX = xCenter + indexFromCenter * extraSpread; // wider spacing at start
                const x = THREE.MathUtils.lerp(startX, xCenter, finalEase);
                const y = THREE.MathUtils.lerp(startY, yOffset + wave, entryEase);
                const z = THREE.MathUtils.lerp(startZ, zOffset, entryEase) + zWave;

                return (
                    <Card
                        key={`card-${imageInfo.originalIndex}-${index}`}
                        index={index}
                        position={[x, y, z]}
                        onPointerOver={handleCardHover}
                        onPointerOut={() => hover(null)}
                        onClick={onCardClick}
                        hovered={hovered === index}
                        active={hovered !== null}
                        imageUrl={imageInfo.url}
                        altText={imageInfo.alt}
                        imageDimensions={imageInfo.dimensions}
                        animationProgress={animationProgress}
                    />
                );
            })}
        </group>
    );
}

export default function Home() {
    const [shouldTriggerAnimation, setShouldTriggerAnimation] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);
    const [galleryLoading, setGalleryLoading] = useState(true);
    const [galleryProgress, setGalleryProgress] = useState(0);
    const [showScrollHint, setShowScrollHint] = useState(true);
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeNavSection, setActiveNavSection] = useState(null);
    const viewRef = useRef();
    const lenis = useLenis();

    // 导入语言上下文
    const { t, language } = useLanguage();

    // 获取Sanity内容
    const { currentExhibition, loading: contentLoading } = useHomeContent();

    // 获取当前展览数据用于图片查看器
    const { exhibition } = useCurrentExhibition();

    // 准备图片查看器的图片数据
    const exhibitionImages = exhibition?.images || [];
    const validImages = exhibitionImages.filter((img) => img?.asset);

    useEffect(() => {
        setGalleryLoading(validImages.length > 0);
        setGalleryProgress(validImages.length > 0 ? 0 : 1);
    }, [validImages.length]);

    const viewerImages = validImages.map((sanityImage, index) => ({
        url: getOptimizedImageUrl(sanityImage, {
            width: 1920, // 更高分辨率用于查看器
            quality: 95,
            format: 'webp',
            fit: 'max',
        }),
        alt: sanityImage.alt || `${exhibition?.title || 'Gallery'} image ${index + 1}`,
        title: sanityImage.title || `Image ${index + 1}`,
        detailImages: sanityImage.detailImages || [],
        artworkTitle: sanityImage.artworkTitle || sanityImage.title || `Artwork ${index + 1}`,
        artworkDescription: sanityImage.description || ''
    }));

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

    const handleCardClick = (index) => {
        setCurrentImageIndex(index);
        setImageViewerOpen(true);
    };

    const handleCloseImageViewer = () => {
        setImageViewerOpen(false);
    };


    const handleNextImage = (index) => {
        setCurrentImageIndex(index);
    };

    const handlePrevImage = (index) => {
        setCurrentImageIndex(index);
    };

    const navItems = useMemo(() => {
        const items = [
            {
                id: 'pressRelease',
                label: t('home.pressRelease') || 'Press Release',
                enabled: currentExhibition?.pressRelease?.[language],
            },
            {
                id: 'interview',
                label: t('home.interview') || 'Interview',
                enabled:
                    currentExhibition?.interview?.introduction?.[language] ||
                    currentExhibition?.interview?.content?.[language],
            },
            {
                id: 'statement',
                label: t('home.statement') || 'Artist Statement',
                enabled: currentExhibition?.statement?.[language],
            },
            {
                id: 'biography',
                label: t('home.biography') || 'Biography',
                enabled: currentExhibition?.biography?.[language],
            },
            {
                id: 'selectedExhibition',
                label: t('home.selectedExhibition') || 'Selected Exhibition',
                enabled: currentExhibition?.selectedExhibition?.[language],
            },
            {
                id: 'selectedPress',
                label: t('home.selectedPress') || 'Selected Press',
                enabled: currentExhibition?.selectedPress?.[language],
            },
            {
                id: 'artistResume',
                label: t('exhibition.artistResume') || 'Artist Resume',
                enabled: currentExhibition?.artistResume,
            },
        ];

        return items.filter((item) => Boolean(item.enabled));
    }, [currentExhibition, language, t]);

    useEffect(() => {
        if (navItems.length === 0) {
            setActiveNavSection(null);
            return;
        }

        setActiveNavSection((prev) => {
            if (prev && navItems.some((item) => item.id === prev)) {
                return prev;
            }

            return navItems[0].id;
        });
    }, [navItems]);

    useEffect(() => {
        if (!navItems.length) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visibleEntry) {
                    setActiveNavSection((current) => {
                        const next = visibleEntry.target.id;
                        return current === next ? current : next;
                    });
                }
            },
            {
                root: null,
                rootMargin: '-45% 0px -45% 0px',
                threshold: [0.1, 0.25, 0.5, 0.75],
            }
        );

        const observedSections = navItems
            .map(({ id }) => document.getElementById(id))
            .filter(Boolean);

        observedSections.forEach((section) => observer.observe(section));

        return () => {
            observedSections.forEach((section) => observer.unobserve(section));
            observer.disconnect();
        };
    }, [navItems]);

    const handleNavigationClick = (event, sectionId) => {
        event.preventDefault();
        const targetSection = document.getElementById(sectionId);

        if (!targetSection) {
            return;
        }

        if (lenis) {
            lenis.scrollTo(targetSection);
        } else {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

        setActiveNavSection(sectionId);

        if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', `#${sectionId}`);
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
    const currentSpacing = FINAL_SPACING;

    return (
        <div className={styles.page}>
            <div className={styles.heroSection}>
                {/* Current Exhibition Button - positioned at center */}
                <CurrentExhibitionButton />
                {/* Show loading state while fetching Sanity images */}
                <View ref={viewRef} className={styles.view}>
                    <CameraController
                        triggerAnimation={shouldTriggerAnimation}
                        onProgressChange={handleProgressChange}
                    />
                    
                    <Cards
                        onFirstHover={handleFirstHover}
                        currentSpacing={currentSpacing}
                        viewRef={viewRef}
                        onScrollStart={handleScrollStart}
                        onCardClick={handleCardClick}
                        animationProgress={animationProgress}
                        onImagesLoaded={() => setGalleryLoading(false)}
                    />
                </View>
                {galleryLoading && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '12%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            padding: '8px 12px',
                            background: 'rgba(0, 0, 0, 0.55)',
                            color: '#fff',
                            fontSize: '12px',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            borderRadius: '999px',
                            pointerEvents: 'none',
                        }}
                    >
                        Gallery loading…
                    </div>
                )}

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
                    {/* 横向滚动条 - 展览信息（从 CMS 渲染三条内容） */}
                    <div className={styles.infiniteScroll}>
                        <div className={styles.scrollContent}>
                            {(() => {
                                // Prefer explicit CMS-provided scrollbar items; fallback to derived fields
                                const cmsItems = currentExhibition?.scrollbar?.items
                                    ?.map((it) => it?.[language])
                                    ?.filter(Boolean);
                                const fallbackItems = [
                                    currentExhibition?.exhibitionCard?.number || 'ISSUE #1',
                                    currentExhibition?.artist || 'ARTIST',
                                    currentExhibition?.title || 'EXHIBITION',
                                ];
                                const items = (cmsItems && cmsItems.length === 3)
                                    ? cmsItems
                                    : fallbackItems;
                                // Render two cycles for seamless loop
                                return [0, 1].flatMap((loop) =>
                                    items.map((text, idx) => (
                                        <div
                                            key={`scroll-${loop}-${idx}`}
                                            className={`${styles.scrollItem} ${idx === 2 ? styles.scrollItemItalic : ''}`}
                                        >
                                            {text}
                                        </div>
                                    ))
                                );
                            })()}
                        </div>
                    </div>

                    {/* 页面导航 */}
                    <div className={styles.pageNavigation}>
                        <span className={styles.navLabel}>{t('home.onThisPage') || 'On this page:'}</span>
                        <div className={styles.navLinks}>
                            {navItems.map(({ id, label }) => (
                                <a
                                    key={id}
                                    href={`#${id}`}
                                    className={`${styles.navLink} ${
                                        activeNavSection === id ? styles.navLinkActive : ''
                                    }`}
                                    onClick={(event) => handleNavigationClick(event, id)}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

  

                </div>

                {/* Dynamic Content Sections from Sanity - Ordered logically */}
                <div className={styles.contentSections}>
                    {/* Press Release - Introduction/Overview */}
                    {currentExhibition?.pressRelease?.[language] && (
                        <section id="pressRelease" className={styles.contentSection}>
                              <div className={styles.interviewHeader}>
                                    {t('home.pressRelease') || 'Press Release'}
                                </div>
                            {currentExhibition?.pressRelease?.featuredImage ? (
                                <div className={styles.pressReleaseLayout}>
                                    <div className={styles.pressReleaseImage}>
                                        <img
                                            src={getOptimizedImageUrl(currentExhibition.pressRelease.featuredImage, {
                                                height: 1080,
                                                quality: 90,
                                                fit: 'max',
                                            })}
                                            alt={currentExhibition.pressRelease.featuredImage.alt || 'Press Release Featured Image'}
                                            className={styles.featuredImage}
                                        />
                                    </div>
                                    <div className={styles.pressReleaseContent}>
                                        {currentExhibition?.pressRelease?.title?.[language] && (
                                            <h2 className={styles.sectionTitle}>
                                                {currentExhibition.pressRelease.title[language]}
                                            </h2>
                                        )}
                                        <ExhibitionContentRenderer
                                            content={{ [language]: currentExhibition.pressRelease[language] }}
                                            language={language}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {currentExhibition?.pressRelease?.title?.[language] && (
                                        <h2 className={styles.sectionTitle}>
                                            {currentExhibition.pressRelease.title[language]}
                                        </h2>
                                    )}
                                    <ExhibitionContentRenderer
                                        content={{ [language]: currentExhibition.pressRelease[language] }}
                                        language={language}
                                    />
                                </div>
                            )}
                        </section>
                    )}

                    {/* Separator between Press Release and Interview */}
                    {currentExhibition?.pressRelease?.[language] && (currentExhibition?.interview?.introduction?.[language] || currentExhibition?.interview?.content?.[language]) && (
                        <hr className={styles.sectionSeparator} />
                    )}

                    {/* Interview - In-depth conversation */}
                    {(currentExhibition?.interview?.introduction?.[language] || currentExhibition?.interview?.content?.[language]) && (
                        <section id="interview" className={styles.contentSection}>
                            <div className={styles.interviewLayout}>
                                <div className={styles.interviewHeader}>
                                    {t('home.interview') || 'Interview'}
                                </div>
                                
                                {currentExhibition?.interview?.title?.[language] && (
                                    <h2 className={styles.sectionTitle}>
                                        {currentExhibition.interview.title[language]}
                                    </h2>
                                )}

                          
                                
                                {currentExhibition?.interview?.featuredImage && (
                                    <div className={styles.interviewImage}>
                                        <img
                                            src={getOptimizedImageUrl(currentExhibition.interview.featuredImage, {
                                                height: 1080,
                                                quality: 90,
                                                fit: 'max',
                                            })}
                                            alt={currentExhibition.interview.featuredImage.alt || 'Interview Featured Image'}
                                            className={styles.featuredImage}
                                        />
                                    </div>
                                )}
                                
                                {/* Full width introduction */}
                                {currentExhibition?.interview?.introduction?.[language] && (
                                    <div className={styles.interviewIntroduction}>
                                        <ExhibitionContentRenderer
                                            content={{ [language]: currentExhibition.interview.introduction[language] }}
                                            language={language}
                                        />
                                    </div>
                                )}
                                
                                {/* Left aligned main content */}
                                {currentExhibition?.interview?.content?.[language] && (
                                    <div className={styles.interviewMainContent}>
                                        <ExhibitionContentRenderer
                                            content={{ [language]: currentExhibition.interview.content[language] }}
                                            language={language}
                                        />
                                    </div>
                                )}

                                {/* Small left-aligned chat text for interview */}
                                {currentExhibition?.interview?.chat?.[language] && (
                                    <div className={styles.interviewChatSmall}>
                                        <ExhibitionContentRenderer
                                            content={{ [language]: currentExhibition.interview.chat[language] }}
                                            language={language}
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                      {/* Separator between Press Release and Interview */}
                      {currentExhibition?.pressRelease?.[language] && (currentExhibition?.interview?.introduction?.[language] || currentExhibition?.interview?.content?.[language]) && (
                        <hr className={styles.sectionSeparator} />
                    )}

                    {/* Statement - Artist's perspective */}
                    {currentExhibition?.statement?.[language] && (
                        <section id="statement" className={styles.contentSection}>
                            <div className={styles.statementLayout}>
                                {currentExhibition?.statement?.featuredImage && (
                                    <div className={styles.statementImage}>
                                        <img
                                            src={getOptimizedImageUrl(currentExhibition.statement.featuredImage, {
                                                height: 1080,
                                                quality: 90,
                                                fit: 'max',
                                            })}
                                            alt={currentExhibition.statement.featuredImage.alt || 'Statement Featured Image'}
                                        />
                                    </div>
                                )}
                                   
                                  
                    
                                <div className={styles.statementContent}>
                                    <div className={styles.interviewHeader}>
                                        {t('home.statement') || "Artist Statement"}
                                    </div>
                                    {currentExhibition?.statement?.title?.[language] && (
                                        <h2 className={styles.sectionTitle}>
                                            {currentExhibition.statement.title[language]}
                                        </h2>
                                    )}
                                    <ExhibitionContentRenderer
                                        content={{ [language]: currentExhibition.statement[language] }}
                                        language={language}
                                    />
                                    {currentExhibition?.artistResume && (
                                        <div id="artistResume" className={styles.cvLinkWrapper}>
                                            <PDFDownload
                                                artistResume={currentExhibition.artistResume}
                                                artistName={currentExhibition.artist}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}
                    
      
                    {/* Biography - About the artist */}
                    {currentExhibition?.biography?.[language] && (
                        <section id="biography" className={styles.contentSection}>
                            <ExhibitionContentRenderer
                                content={{ [language]: currentExhibition.biography[language] }}
                                language={language}
                            />
                        </section>
                    )}

                    {/* Selected Exhibitions - Previous work context */}
                    {currentExhibition?.selectedExhibition?.[language] && (
                        <section id="selectedExhibition" className={styles.contentSection}>
                            <ExhibitionContentRenderer
                                content={{
                                    [language]: currentExhibition.selectedExhibition[language],
                                }}
                                language={language}
                            />
                        </section>
                    )}

                    {/* Selected Press - Media coverage */}
                    {currentExhibition?.selectedPress?.[language] && (
                        <section id="selectedPress" className={styles.contentSection}>
                            <ExhibitionContentRenderer
                                content={{ [language]: currentExhibition.selectedPress[language] }}
                                language={language}
                            />
                        </section>
                    )}
                </div>
            </div>

            {/* 图片查看器 */}
            <ImageViewer
                images={viewerImages}
                currentIndex={currentImageIndex}
                isOpen={imageViewerOpen}
                onClose={handleCloseImageViewer}
                onNext={handleNextImage}
                onPrev={handlePrevImage}
                detailImages={
                    exhibition?.detailImages && exhibition.detailImages[currentImageIndex]?.asset
                        ? [exhibition.detailImages[currentImageIndex]]
                        : []
                }
                artworkTitle={viewerImages[currentImageIndex]?.artworkTitle || ''}
                artworkDescription={viewerImages[currentImageIndex]?.artworkDescription || ''}
            />

        </div>
    );
}
