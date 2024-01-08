import React from 'react';
import styles from '../styles/Breadcrumbs.module.css';
import Link from 'next/link';

function Breadcrumbs({ props }) { 
    return (
        <div className={styles.container}>
            <div className={`${styles.container_width} ${styles.breadcrumbs}`}>
                <scale-breadcrumb>
                    <Link href="/">Home</Link>
                    {props && props.map((item, index) => (
                        <Link key={index} href={item.url}>
                            {item.label}
                        </Link>
                    ))}
                </scale-breadcrumb>
            </div>
        </div>
    );
}

export default Breadcrumbs;
