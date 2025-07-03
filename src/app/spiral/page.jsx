'use client';

import styles from './page.module.scss';
import Spiral from '@/components/webgl/Spiral/Spiral';
import images from '@/data/images';
import { View, Common } from '@/webgl/View';
import { useCollageTexture } from '@/hooks/useCollageTexture';
import Loader from '@/components/ui/modules/Loader/Loader';

export default function Home() {
    const { texture, isLoading } = useCollageTexture(images);

    if (isLoading) return <Loader />;

    return (
        <div className={styles.page}>
            <View className={styles.view} orbit>
                <Spiral texture={texture} />
                <Common cameraFOV={7} cameraPosition={[0, 0, 100]} />
            </View>
        </div>
    );
} 