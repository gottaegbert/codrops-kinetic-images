'use client';

import styles from './template.module.scss';

export default function Template({ children }) {
    return (
        <div className={styles.template}>
            {children}
        </div>
    );
}
