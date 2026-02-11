'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ImageViewer.module.scss';

const ImageViewer = ({
    images = [],
    currentIndex = 0,
    isOpen = false,
    onClose,
    detailImages: detailImagesProp = [], // 保留向后兼容
    fallbackDetailImages = [], // 展览级别的 fallback
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

    // 1:1 对应：展览级 detailImages 按索引和 images 一一对应
    const allDetailImages = fallbackDetailImages.length > 0
        ? fallbackDetailImages
        : (detailImagesProp.length > 0 ? detailImagesProp : []);

    const handleToggleDetailView = () => {
        // 当前图片的对应 detail image
        const correspondingDetail = allDetailImages[currentImageIndex];
        if (correspondingDetail) {
            setShowDetailView(!showDetailView);
            setIsLoading(true);
            setImageError(false);
        }
    };

    const currentImage = images[currentImageIndex];
    // 按索引取对应的 detail image
    const currentDetailImage = allDetailImages[currentImageIndex];
    const displayImage = showDetailView ? currentDetailImage : currentImage;
    const displayImageUrl = displayImage?.asset?.url || displayImage?.url;
    const hasDetailImages = !!allDetailImages[currentImageIndex];

    if (!isOpen) return null;

    const handleOverlayPointerDown = (event) => {
        if (event.currentTarget === event.target) onClose();
    };

    return (
        <div className={styles.overlay} onPointerDown={handleOverlayPointerDown}>
            <div className={styles.container} onPointerDown={handleOverlayPointerDown}>
                <div className={styles.dialog} onPointerDown={handleOverlayPointerDown}>
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

                    {/* 顶部按钮栏 */}
                    <div className={styles.topBar}>
                        {!showDetailView ? (
                            hasDetailImages && (
                                <button
                                    className={styles.infoButton}
                                    onClick={handleToggleDetailView}
                                    title="View Details"
                                >
                                    Details
                                </button>
                            )
                        ) : (
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
                        )}
                    </div>

                    <div className={styles.content}>
                        {/* 图片容器 */}
                        <div className={styles.imageContainer}>
                        {isLoading && displayImageUrl && (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                            </div>
                        )}

                        {!displayImageUrl ? (
                            <div className={styles.error}>
                                <p>图片缺失</p>
                            </div>
                        ) : imageError ? (
                            <div className={styles.error}>
                                <p>图片加载失败</p>
                            </div>
                        ) : (
                            <img
                                key={displayImageUrl}
                                ref={imageRef}
                                src={displayImageUrl}
                                alt={displayImage?.alt || displayImage?.title || `Image ${currentImageIndex + 1}`}
                                className={styles.image}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                style={{ display: isLoading ? 'none' : 'block' }}
                            />
                        )}


                        {/* 1:1 对应模式，无需细节图导航按钮 */}
                        </div>

                        {/* 底部信息栏：描述文本 */}
                        <div className={styles.bottomBar}>
                        {showDetailView && hasDetailImages && currentDetailImage?.description && (
                            <p className={styles.detailDescription}>{currentDetailImage.description}</p>
                        )}
                        </div>
                    </div>

                    {/* 已移除缩略图导航 */}
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;
