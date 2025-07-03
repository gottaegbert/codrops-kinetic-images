'use client';

import styles from './page.module.scss';
import Billboard from '@/components/webgl/Billboard/Billboard';
import Banner from '@/components/webgl/Banner/Banner';
import Loader from '@/components/ui/modules/Loader/Loader';
import images from '@/data/images';
import { View, Common } from '@/webgl/View';
import { useCollageTexture } from '@/hooks/useCollageTexture';

const COUNT = 10;
const GAP = 3.2;

export default function Home() {
    const { texture, dimensions, isLoading } = useCollageTexture(images);

    if (isLoading) return <Loader />;

    return (
        <div className={styles.page}>
            <View className={styles.view} orbit>
                <group rotation={[-0.15, 0, -0.2]}>
                    {Array.from({ length: COUNT }).map((_, index) => [
                        <Billboard
                            key={`billboard-${index}`}
                            radius={5}
                            rotation={[0, index * Math.PI * 0.5, 0]}
                            position={[0, (index - (Math.ceil(COUNT / 2) - 1)) * GAP, 0]}
                            texture={texture}
                            dimensions={dimensions}
                        />,
                        <Banner
                            key={`banner-${index}`}
                            radius={5.035}
                            rotation={[0, 0, 0.085]}
                            position={[
                                0,
                                (index - (Math.ceil(COUNT / 2) - 1)) * GAP - GAP * 0.5,
                                0,
                            ]}
                        />,
                    ])}
                </group>
                <Common cameraFOV={7} cameraPosition={[0, 0, 70]} />
            </View>
        </div>
    );
} 