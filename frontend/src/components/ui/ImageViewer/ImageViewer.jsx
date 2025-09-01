'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ImageViewer.module.scss';

const ImageViewer = ({ 
    images = [], 
    currentIndex = 0, 
    isOpen = false, 
    onClose, 
    onNext, 
    onPrev 
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const imageRef = useRef();

    // 更新当前图片索引
    useEffect(() => {
        setCurrentImageIndex(currentIndex);
    }, [currentIndex]);

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

    const handleNext = () => {
        const nextIndex = (currentImageIndex + 1) % images.length;
        setCurrentImageIndex(nextIndex);
        onNext && onNext(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(prevIndex);
        onPrev && onPrev(prevIndex);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
        setImageError(true);
    };

    const currentImage = images[currentImageIndex];

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
                {images.length > 1 && (
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
                            src={currentImage.url}
                            alt={currentImage.alt || `Image ${currentImageIndex + 1}`}
                            className={styles.image}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={{ display: isLoading ? 'none' : 'block' }}
                        />
                    )}
                </div>

                {/* 图片信息 */}
                <div className={styles.imageInfo}>
                    <div className={styles.imageTitle}>
                        {currentImage.title || `Image ${currentImageIndex + 1}`}
                    </div>
                    {images.length > 1 && (
                        <div className={styles.imageCounter}>
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    )}
                </div>

                {/* 缩略图导航 */}
                {images.length > 1 && (
                    <div className={styles.thumbnails}>
                        {images.map((image, index) => (
                            <button
                                key={index}
                                className={`${styles.thumbnail} ${
                                    index === currentImageIndex ? styles.active : ''
                                }`}
                                onClick={() => setCurrentImageIndex(index)}
                            >
                                <img src={image.url} alt={`Thumbnail ${index + 1}`} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageViewer;
