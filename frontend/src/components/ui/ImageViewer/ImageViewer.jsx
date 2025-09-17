'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ImageViewer.module.scss';

const ImageViewer = ({
    images = [],
    currentIndex = 0,
    isOpen = false,
    onClose,
    detailImages = [], // 新增：细节图数组
    artworkTitle = '',
    artworkDescription = ''
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [showDetailView, setShowDetailView] = useState(false);
    const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
    const imageRef = useRef();

    // 更新当前图片索引
    useEffect(() => {
        setCurrentImageIndex(currentIndex);
        setShowDetailView(false); // 重置为普通视图
        setCurrentDetailIndex(0);
    }, [currentIndex]);

    // 当打开查看器时重置状态
    useEffect(() => {
        if (isOpen) {
            setShowDetailView(false);
            setCurrentDetailIndex(0);
            setIsLoading(true);
            setImageError(false);
        }
    }, [isOpen]);

    // 键盘导航（仅 Esc 关闭）
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentImageIndex]);

    // 阻止背景滚动
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);


    const handleImageLoad = () => {
        setIsLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
        setImageError(true);
    };

    const handleToggleDetailView = () => {
        if (detailImages.length > 0) {
            setShowDetailView(!showDetailView);
            setIsLoading(true);
            setImageError(false);
        }
    };

    // 不需要细节图内部导航

    const currentImage = images[currentImageIndex];
    const currentDetailImage = detailImages[currentDetailIndex];
    const displayImage = showDetailView ? currentDetailImage : currentImage;
    const hasDetailImages = detailImages.length > 0;

    if (!isOpen || !currentImage) return null;

    const handleOverlayClick = (event) => {
        if (event.currentTarget === event.target) onClose();
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.container} onClick={handleOverlayClick}>
                <div className={styles.dialog} onClick={handleOverlayClick}>
                    {/* 关闭按钮 */}
                    <button className={styles.closeButton} onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* 已移除不同图片的导航按钮 */}

                    {/* 图片容器 */}
                    <div className={styles.imageContainer}>
                    {isLoading && (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                        </div>
                    )}

                    {imageError ? (
                        <div className={styles.error}>
                            <p>图片加载失败</p>
                        </div>
                    ) : (
                        <img
                            ref={imageRef}
                            src={displayImage?.asset?.url || displayImage?.url}
                            alt={displayImage?.alt || displayImage?.title || `Image ${currentImageIndex + 1}`}
                            className={styles.image}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={{ display: isLoading ? 'none' : 'block' }}
                        />
                    )}

                    {/* 细节图导航按钮 */}
                    {showDetailView && detailImages.length > 1 && (
                        <>
                            <button
                                className={`${styles.navButton} ${styles.detailPrevButton}`}
                                onClick={() => handleDetailNavigation('prev')}
                                disabled={currentDetailIndex === 0}
                            >
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M15 18l-6-6 6-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                className={`${styles.navButton} ${styles.detailNextButton}`}
                                onClick={() => handleDetailNavigation('next')}
                                disabled={currentDetailIndex === detailImages.length - 1}
                            >
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M9 18l6-6-6-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                    </div>

                    {/* 底部信息栏：中间显示按钮与描述 */}
                    <div className={styles.bottomBar}>
                    {!showDetailView ? (
                        hasDetailImages && (
                            <div className={styles.infoWrap}>
                                {currentDetailImage?.description && (
                                    <p className={styles.detailDescription}>{currentDetailImage.description}</p>
                                )}
                                <button
                                    className={styles.infoButton}
                                    onClick={handleToggleDetailView}
                                    title="View Details"
                                >
                                    Details
                                </button>
                            </div>
                        )
                    ) : (
                        <div className={styles.detailTextWrap}>
                            <button
                                className={styles.backButton}
                                onClick={handleToggleDetailView}
                                title="Back"
                            >
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M15 19l-7-7 7-7"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Back
                            </button>
                        </div>
                    )}
                    </div>

                    {/* 已移除缩略图导航 */}
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;
