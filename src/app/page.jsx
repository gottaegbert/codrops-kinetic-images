'use client';

import styles from './page.module.scss';
import images from '@/data/images';
import { Billboard, Banner } from '@/components/webgl';
import { Loader } from '@/components/ui/modules';
import { View } from '@/webgl/View';
import { PerspectiveCamera } from '@react-three/drei';
import { useCollageTexture } from '@/hooks';

const COUNT = 10;
const GAP = 3.2;

export default function Home() {
    const { texture, dimensions, isLoading } = useCollageTexture(images);

    if (isLoading) return <Loader />;

    return (
        <div className={styles.page}>
            <div className={styles.intro}>
                <h2 className={styles.introTitle}>Welcome to MaKaleidos</h2>
                <p className={styles.introSubtitle}>
                    Discover contemporary art through immersive virtual exhibitions. 
                    Experience art in a whole new dimension where creativity meets technology.
                </p>
                <a href="/exhibitions" className={styles.ctaButton}>
                    Explore Current Exhibition
                </a>
            </div>

            <View className={styles.view} orbit>
                <PerspectiveCamera
                    makeDefault
                    fov={7}
                    position={[0, 0, 70]}
                    near={0.01}
                    far={100000}
                />
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
            </View>
        </div>
    );
}
