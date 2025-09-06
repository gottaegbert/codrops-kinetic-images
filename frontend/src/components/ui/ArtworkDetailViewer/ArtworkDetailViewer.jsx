'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ArtworkDetailViewer.module.scss';

const ArtworkDetailViewer = ({
    detailImages = [],
    isOpen = false,
    onClose,
    artworkTitle = '',
    artworkDescription = ''
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const imageRef = useRef();

    // 重置状态当组件打开时
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            setIsLoading(true);
            setImageError(false);
        }
    }, [isOpen]);

    // 键盘导航
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    handlePrev();
                    break;
                case 'ArrowRight':
                    handleNext();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex]);

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

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % detailImages.length;
        setCurrentIndex(nextIndex);
        setIsLoading(true);
        setImageError(false);
    };

    const handlePrev = () => {
        const prevIndex = currentIndex === 0 ? detailImages.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        setIsLoading(true);
        setImageError(false);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
        setImageError(true);
    };

    const currentImage = detailImages[currentIndex];

    if (!isOpen || !currentImage) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
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

                {/* 导航按钮 */}
                {detailImages.length > 1 && (
                    <>
                        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrev}>
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
                        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNext}>
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

                {/* 主要内容区域 */}
                <div className={styles.mainContent}>
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
                                src={currentImage.asset?.url}
                                alt={currentImage.alt || `Detail ${currentIndex + 1}`}
                                className={styles.image}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                style={{ display: isLoading ? 'none' : 'block' }}
                            />
                        )}
                    </div>

                    {/* 信息面板 */}
                    <div className={styles.infoPanel}>
                        <div className={styles.artworkInfo}>
                            <h3 className={styles.artworkTitle}>{artworkTitle}</h3>
                            <p className={styles.artworkDescription}>{artworkDescription}</p>
                        </div>

                        <div className={styles.detailInfo}>
                            <h4 className={styles.detailTitle}>
                                {currentImage.title || `Detail ${currentIndex + 1}`}
                            </h4>
                            {currentImage.description && (
                                <p className={styles.detailDescription}>
                                    {currentImage.description}
                                </p>
                            )}
                            {detailImages.length > 1 && (
                                <div className={styles.detailCounter}>
                                    {currentIndex + 1} / {detailImages.length}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 缩略图导航 */}
                {detailImages.length > 1 && (
                    <div className={styles.thumbnails}>
                        {detailImages.map((image, index) => (
                            <button
                                key={index}
                                className={`${styles.thumbnail} ${
                                    index === currentIndex ? styles.active : ''
                                }`}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsLoading(true);
                                    setImageError(false);
                                }}
                            >
                                <img
                                    src={image.asset?.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtworkDetailViewer;
