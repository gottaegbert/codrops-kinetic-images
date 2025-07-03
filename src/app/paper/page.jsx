'use client';

import styles from './page.module.scss';
import images from '@/data/images';
import { useCollageTexture } from '@/hooks/useCollageTexture';
import Paper from '@/components/webgl/Paper/Paper';
import { View } from '@/webgl/View';
import Loader from '@/components/ui/modules/Loader/Loader';

const paperImages = images.slice(0, 5);

export default function Home() {
    const { texture, isLoading } = useCollageTexture(paperImages, {
        gap: 0,
        canvasWidth: 1024,
        axis: 'y',
    });

    if (isLoading) return <Loader />;

    return (
        <div className={styles.page}>
            <View className={styles.view} orbit={false}>
                <Paper rotation={[0, Math.PI * 0.3, 0]} position={[0, 0.5, 0]} texture={texture} />
            </View>
        </div>
    );
} 