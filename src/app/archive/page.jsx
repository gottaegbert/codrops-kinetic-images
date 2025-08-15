'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Footer } from '@/components/ui/modules';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function ArchivePage() {
    const { t } = useLanguage();
    
    // 模拟档案数据
    const archiveItems = [
        {
            id: 1,
            type: 'Exhibition',
            title: 'Digital Metamorphosis: Contemporary Visions',
            date: '2025.01.15 - 2025.03.30',
            image: '/images/img1.webp',
            description: 'An immersive exploration of digital art\'s evolution, featuring groundbreaking works that blur the boundaries between physical and virtual realms.'
        },
        {
            id: 2,
            type: 'Interview',
            title: 'In Conversation with Marina Chen',
            date: '2025.01.10',
            image: '/images/img2.webp',
            description: 'Artist Marina Chen discusses her latest series exploring the intersection of traditional techniques and digital media.'
        },
        {
            id: 3,
            type: 'Essay',
            title: 'The Future of Paper-Based Art',
            date: '2024.12.20',
            image: '/images/img3.webp',
            description: 'A critical examination of how paper-based artworks continue to evolve in our increasingly digital world.'
        },
        {
            id: 4,
            type: 'Exhibition',
            title: 'Small Scale, Big Impact',
            date: '2024.10.10 - 2024.12.15',
            image: '/images/img4.webp',
            description: 'Exploring how small-scale artworks can create profound emotional and conceptual impact.'
        },
        {
            id: 5,
            type: 'Review',
            title: 'Intimate Expressions: A Critical Review',
            date: '2024.11.05',
            image: '/images/img5.webp',
            description: 'A comprehensive review of recent works exploring intimacy and personal expression in contemporary art.'
        },
        {
            id: 6,
            type: 'Interview',
            title: 'Alex Rodriguez on Digital Transformation',
            date: '2024.09.15',
            image: '/images/img6.webp',
            description: 'The artist shares insights on how digital tools are transforming traditional art practices.'
        },
        {
            id: 7,
            type: 'Exhibition',
            title: 'Emerging Voices: New Perspectives',
            date: '2024.07.01 - 2024.09.30',
            image: '/images/img7.webp',
            description: 'A group exhibition featuring emerging artists pushing the boundaries of contemporary art.'
        },
        {
            id: 8,
            type: 'Essay',
            title: 'The Role of Curation in Digital Spaces',
            date: '2024.08.12',
            image: '/images/img8.webp',
            description: 'Examining how curatorial practices adapt to virtual and digital exhibition spaces.'
        }
    ];
    
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Archive</h1>
                    <p className={styles.subtitle}>
                        Exhibitions, interviews, essays, and reviews from MaKaleidos Gallery
                    </p>
                </div>
                
                <div className={styles.archiveGrid}>
                    {archiveItems.map((item) => (
                        <article key={item.id} className={styles.archiveItem}>
                            <Link href={`/archive/${item.id}`} className={styles.itemLink}>
                                <div className={styles.imageContainer}>
                                    <Image 
                                        src={item.image} 
                                        alt={item.title} 
                                        width={300} 
                                        height={200}
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.itemContent}>
                                    <span className={styles.itemType}>{item.type}</span>
                                    <h2 className={styles.itemTitle}>{item.title}</h2>
                                    <time className={styles.itemDate}>{item.date}</time>
                                    <p className={styles.itemDescription}>{item.description}</p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
            
        </main>
    );
}
