import React from 'react';
import styles from '/styles/HeroImage.module.css';
import Image from 'next/image';


function HeroImage({props}) {
    return (
        <div className={styles.container}>
            <div className={styles.text_container}>
                <Image
                    src={require(`/public/open-telekom-cloud-icon.png`)}
                    className={styles.image}
                    alt="Hero Image"></Image>
                <h1 className={styles.h1}>Cloud solutions from our partners</h1>
                <p  className={styles.p}>Improve your processes and leverage the benefits of our European cloud</p>
            </div>
        </div>
    )
}

export default HeroImage;