'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useHomeContent } from '@/hooks/useHomeContent';
import ExhibitionContentRenderer from '@/components/ui/ExhibitionContentRenderer';
import PDFDownload from '@/components/ui/PDFDownload/PDFDownload';
import ImageViewer from '@/components/ui/ImageViewer/ImageViewer';
import styles from './page.module.scss';
import exhibitionStyles from '@/components/ui/ExhibitionCard/ExhibitionCard.module.scss';
import { View } from '@/webgl/View';
import { OrthographicCamera, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { easing } from 'maath';
import * as THREE from 'three';
import ExhibitionCard from '@/components/ui/ExhibitionCard/ExhibitionCard';
import { useCurrentExhibition } from '@/hooks/useCurrentExhibition';
import { getOptimizedImageUrl } from '@/sanity/client';

const INITIAL_SPACING = 0.05; // Initial spacing between cards
const FINAL_SPACING = 1.0; // Final spacing between cards

// Current Exhibition Button Component
function CurrentExhibitionButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { language, t } = useLanguage();
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
            contentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
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
                            {currentExhibition?.title || 'The Harmonizing Gaze'}
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
}) {
    const ref = useRef();
    const materialRef = useRef();
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

    useFrame((_, delta) => {
        const f = hovered ? 1.25 : active ? 1.25 : 1;
        const targetOpacity = hovered ? 1.0 : 0.85; // Increase opacity on hover

        easing.damp3(ref.current.position, [0, 0, hovered ? -0.9 : 0], 0.2, delta);
        easing.damp3(ref.current.scale, [f, f, f], 0.15, delta);

        // Smooth opacity transition
        if (materialRef.current) {
            easing.damp(materialRef.current, 'opacity', targetOpacity, 0.2, delta);
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={ref}
                rotation={[0, -Math.PI / 4, 0]}
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
                onClick={(e) => (e.stopPropagation(), onClick && onClick(index))}
            >
                <planeGeometry args={[cardWidth, cardHeight]} />
                <meshPhysicalMaterial
                    ref={materialRef}
                    map={texture}
                    transparent={true}
                    opacity={0.65}
                    roughness={0.1}
                    metalness={0.0}
                    clearcoat={1.0}
                    clearcoatRoughness={0.3}
                    transmission={0.2}
                    thickness={0.5}
                    ior={1.5}
                    side={THREE.FrontSide}
                />
            </mesh>
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

        // Screen-size responsive camera paths - 调整以看到底部的卡片
        let startPos, endPos;
        switch (screenSize) {
            case 'mobile':
                // 移动端：相机位置更高，向下看底部的卡片
                startPos = [-15, 5, 0];
                endPos = [0, 15, 25];
                break;
            case 'medium':
                // 13-inch MacBook and similar screens
                startPos = [-20, 3, 0];
                endPos = [0, 18, 30];
                break;
            case 'laptop':
                startPos = [-25, 2, 0];
                endPos = [0, 20, 35];
                break;
            default: // desktop
                startPos = [-30, 0, 0];
                endPos = [0, 20, 40];
        }

        // 使用三角函数创建更自然的曲线运动
        const curveProgress = Math.sin(progress * Math.PI * 0.5);

        // 更新相机位置
        cameraRef.current.position.set(
            startPos[0] + (endPos[0] - startPos[0]) * curveProgress,
            startPos[1] + (endPos[1] - startPos[1]) * curveProgress,
            startPos[2] + (endPos[2] - startPos[2]) * curveProgress
        );

        // 让相机看向不同屏幕尺寸下的卡片位置
        let lookAtTarget;
        switch (screenSize) {
            case 'mobile':
                lookAtTarget = [0, -2.5, 0]; // 看向底部的卡片
                break;
            case 'medium':
                lookAtTarget = [0, -1.5, 0];
                break;
            case 'laptop':
                lookAtTarget = [0, -1, 0];
                break;
            default: // desktop
                lookAtTarget = [0, 0, 0];
        }
        cameraRef.current.lookAt(...lookAtTarget);
    });

    // Screen-size responsive zoom and initial position
    let zoom, initialPosition;
    switch (screenSize) {
        case 'mobile':
            zoom = 160; // 稍微拉远一点以看到底部卡片
            initialPosition = [-20, 5, 0]; // 相机位置更高
            break;
        case 'medium':
            // 13-inch MacBook optimization
            zoom = 200;
            initialPosition = [-25, 3, 0];
            break;
        case 'laptop':
            zoom = 240;
            initialPosition = [-35, 2, 0];
            break;
        default: // desktop
            zoom = 260;
            initialPosition = [-40, 0, 0];
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

function Cards({ onFirstHover, currentSpacing, viewRef, onScrollStart, onCardClick }) {
    const [hovered, hover] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
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

    // Fetch current exhibition first
    const { exhibition, loading, error } = useCurrentExhibition();

    // Calculate dynamic count based on available images
    const exhibitionImages = exhibition?.images || [];
    const validImages = exhibitionImages.filter((img) => img?.asset);
    const dynamicCount = validImages.length;

    // 初始位置设为最左边（显示第一张卡片）
    const [scrollOffset, setScrollOffset] = useState(() => {
        if (dynamicCount === 0) return 0;
        const totalWidth = dynamicCount * INITIAL_SPACING;
        return totalWidth / 2 - INITIAL_SPACING;
    });
    const [hasTriggeredFirstHover, setHasTriggeredFirstHover] = useState(false);

    const groupRef = useRef();

    // 计算滚动范围限制，使用动态spacing和动态图片数量
    const totalWidth = dynamicCount * currentSpacing;
    const maxScrollLeft = dynamicCount > 0 ? totalWidth / 2 - currentSpacing : 0;
    const maxScrollRight = dynamicCount > 0 ? -(totalWidth / 2 - currentSpacing) : 0;

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

        const totalWidth = dynamicCount * currentSpacing;
        const newMaxScrollLeft = totalWidth / 2 - currentSpacing;

        // 如果当前在初始位置，保持在左边
        if (scrollOffset >= maxScrollLeft * 0.9) {
            setScrollOffset(newMaxScrollLeft);
        }
    }, [currentSpacing, maxScrollLeft, dynamicCount]);

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
            let loadedCount = 0;
            const totalImages = imageData.length;

            imageData.forEach((imageInfo) => {
                if (imageInfo.url) {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            setImagesLoaded(true);
                        }
                    };
                    img.onerror = () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            setImagesLoaded(true);
                        }
                    };
                    img.src = imageInfo.url;
                }
            });

            // Set loaded if no images to load
            if (totalImages === 0) {
                setImagesLoaded(true);
            }
        } else {
            setImagesLoaded(true);
        }
    }, [imageData]);

    // Calculate dynamic spacing based on actual image count
    const actualCount = imageData.length;
    const dynamicSpacing = actualCount > 0 ? currentSpacing : 0;

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
                // Linear stacking using dynamic spacing based on actual image count
                const xOffset = index * dynamicSpacing - (actualCount * dynamicSpacing) / 2;
                // Screen-size responsive Y positioning - 小尺寸固定在底部
                let yOffset;
                switch (screenSize) {
                    case 'mobile':
                        // 移动端：固定在屏幕底部20px位置
                        // 使用负值让卡片在视野下方，通过相机角度看到
                        yOffset = -3;
                        break;
                    case 'medium':
                        // 13-inch MacBook - 稍微下移但不要太极端
                        yOffset = -2;
                        break;
                    case 'laptop':
                        yOffset = -1.5;
                        break;
                    default: // desktop
                        yOffset = -1;
                }
                const zOffset = 0;

                return (
                    <Card
                        key={`card-${imageInfo.originalIndex}-${index}`}
                        index={index}
                        position={[xOffset, yOffset, zOffset]}
                        onPointerOver={handleCardHover}
                        onPointerOut={() => hover(null)}
                        onClick={onCardClick}
                        hovered={hovered === index}
                        active={hovered !== null}
                        imageUrl={imageInfo.url}
                        altText={imageInfo.alt}
                        imageDimensions={imageInfo.dimensions}
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
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const viewRef = useRef();

    // 导入语言上下文
    const { t, language } = useLanguage();

    // 获取Sanity内容
    const { currentExhibition, loading: contentLoading } = useHomeContent();

    // 获取当前展览数据用于图片查看器
    const { exhibition } = useCurrentExhibition();

    // 准备图片查看器的图片数据
    const exhibitionImages = exhibition?.images || [];
    const validImages = exhibitionImages.filter((img) => img?.asset);

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
                {/* Current Exhibition Button - positioned at center */}
                <CurrentExhibitionButton />
                {/* Show loading state while fetching Sanity images */}
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
                        onCardClick={handleCardClick}
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
                            {currentExhibition?.pressRelease?.[language] && (
                                <a href="#pressRelease" className={styles.navLink}>
                                    {t('home.pressRelease') || 'Press Release'}
                                </a>
                            )}
                            {(currentExhibition?.interview?.introduction?.[language] || currentExhibition?.interview?.content?.[language]) && (
                                <a href="#interview" className={styles.navLink}>
                                    {t('home.interview') || 'Interview'}
                                </a>
                            )}
                            {currentExhibition?.statement?.[language] && (
                                <a href="#statement" className={styles.navLink}>
                                    {t('home.statement') || 'Artist Statement'}
                                </a>
                            )}
                            {currentExhibition?.biography?.[language] && (
                                <a href="#biography" className={styles.navLink}>
                                    {t('home.biography') || 'Biography'}
                                </a>
                            )}
                            {currentExhibition?.selectedExhibition?.[language] && (
                                <a href="#selectedExhibition" className={styles.navLink}>
                                    {t('home.selectedExhibition') || 'Selected Exhibition'}
                                </a>
                            )}
                            {currentExhibition?.selectedPress?.[language] && (
                                <a href="#selectedPress" className={styles.navLink}>
                                    {t('home.selectedPress') || 'Selected Press'}
                                </a>
                            )}
                            {currentExhibition?.artistResume && (
                                <a href="#artistResume" className={styles.navLink}>
                                    {t('exhibition.artistResume') || 'Artist Resume'}
                                </a>
                            )}

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
                                    <h2 className={styles.sectionTitle}>
                                        {currentExhibition?.statement?.title?.[language]
                                            ? currentExhibition.statement.title[language]
                                            : (t('home.statement') || "Artist's Statement")}
                                    </h2>
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
