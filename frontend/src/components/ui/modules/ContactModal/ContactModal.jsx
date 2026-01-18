'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ContactModal.module.scss';

function ContactModalContent({ onClose, isClosing }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div 
            className={`${styles.overlay} ${isClosing ? styles.closing : ''}`} 
            onClick={onClose}
        >
            <div 
                className={`${styles.modal} ${isClosing ? styles.closing : ''}`} 
                role="dialog" 
                aria-modal="true" 
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close contact">
                    <span>&times;</span>
                </button>
                <header className={styles.header}>
                    <h2 className={styles.title}>Contact</h2>
                    <p className={styles.subtitle}>We would love to hear from you</p>
                </header>
                <div className={styles.body}>
                    <div className={styles.infoBlock}>
                        <h3>Email</h3>
                        <a href="mailto:general@makaleidos.com">general@makaleidos.com</a>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>Instagram</h3>
                        <a href="https://www.instagram.com/makaleidos_/" target="_blank" rel="noreferrer">
                            @makaleidos
                        </a>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>Address</h3>
                        <p>Online gallery · Global reach</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ContactModal({ open, onClose }) {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 400); // 400ms matches animation duration
            return () => clearTimeout(timer);
        }
    }, [open]);

    useEffect(() => {
        if (!isVisible) {
            document.body.style.overflow = '';
            return;
        }

        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isVisible]);

    if (!mounted || !isVisible) return null;

    return createPortal(
        <ContactModalContent 
            onClose={onClose} 
            isClosing={!open && isVisible} 
        />, 
        document.body
    );
}
