'use client';

import { useState } from 'react';
import { useCurrentExhibition } from '@/hooks/useCurrentExhibition';
import { getOptimizedImageUrl } from '@/sanity/client';
import styles from './admin.module.scss';

export default function Admin() {
    const { exhibition, loading, error } = useCurrentExhibition();
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            // Note: This is a placeholder for image upload functionality
            // In a real implementation, you would upload to Sanity here
            console.log('Files to upload:', files);
            
            // For now, just show a message
            alert('Please use Sanity Studio to create exhibitions and upload images');
            setUploading(false);
        } catch (err) {
            console.error('Upload error:', err);
            alert('Upload failed');
            setUploading(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading exhibition data...</div>;
    if (error) return <div className={styles.error}>Error loading exhibition: {error.message}</div>;

    return (
        <div className={styles.admin}>
            <h1>Gallery Management</h1>
            
            {/* Current Exhibition Status */}
            <div className={styles.statusSection}>
                <h2>Exhibition Status</h2>
                {exhibition ? (
                    <div className={styles.currentExhibition}>
                        <h3>Current Exhibition: {exhibition.title}</h3>
                        <p>Artist: {exhibition.artist || 'Not specified'}</p>
                        <p>Images: {exhibition.images?.length || 0}</p>
                        {exhibition.date && (
                            <p>Date: {new Date(exhibition.date).toLocaleDateString()}</p>
                        )}
                        {exhibition.description && (
                            <p>Description: {exhibition.description}</p>
                        )}
                    </div>
                ) : (
                    <div className={styles.noExhibition}>
                        <p>No current exhibition set. Create one in Sanity Studio.</p>
                    </div>
                )}
            </div>
            
            <div className={styles.uploadSection}>
                <h2>Upload New Images</h2>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                />
                {uploading && <p>Uploading...</p>}
                <div className={styles.instructions}>
                    <h3>📋 Simple Upload Instructions</h3>
                    <ol>
                        <li>Open <a href="/studio" target="_blank" rel="noopener noreferrer">Sanity Studio</a></li>
                        <li>Click "📁 Exhibitions"</li>
                        <li>Create a new Exhibition or edit existing</li>
                        <li>Set "Current Exhibition" to ✓ to display on homepage</li>
                        <li>In "Exhibition Images" section, drag and drop up to 10 images</li>
                        <li>Add Alt Text for each image</li>
                        <li>Click "Publish"</li>
                    </ol>
                    <p><strong>That's it!</strong> Images will appear in the 3D gallery automatically.</p>
                </div>
            </div>

            {/* Current Exhibition Images */}
            {exhibition && exhibition.images && exhibition.images.length > 0 && (
                <div className={styles.gallerySection}>
                    <h2>Current Exhibition Images ({exhibition.images.length})</h2>
                    <div className={styles.imageGrid}>
                        {exhibition.images.map((image, index) => (
                            <div key={index} className={styles.imageItem}>
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={getOptimizedImageUrl(image, {
                                            width: 300,
                                            height: 300,
                                            quality: 80
                                        })}
                                        alt={image.alt || `Image ${index + 1}`}
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.imageInfo}>
                                    <h3>{image.title || `Image ${index + 1}`}</h3>
                                    <p>Position: {index + 1}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.actions}>
                <button onClick={() => window.location.reload()} className={styles.refreshBtn}>
                    Refresh Gallery
                </button>
                <a href="/studio" className={styles.studioBtn} target="_blank" rel="noopener noreferrer">
                    Open Sanity Studio
                </a>
            </div>
        </div>
    );
}