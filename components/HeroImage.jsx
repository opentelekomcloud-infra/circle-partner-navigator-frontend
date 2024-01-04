import React from 'react';
import styles from '/styles/HeroImage.module.css';
import Image from 'next/image';


function HeroImage({props}) {
    return (
        <div className={styles.container} style={{backgroundImage: "url(" + props["backgroundImageUrl"] + ")"}}>
            <div className={styles.text_container}>
                <Image
                    src={props["iconSrc"]}
                    className={styles.image}
                    alt={props["iconAlt"]}>
                </Image>
                <h1 className={styles.h1}>Cloud solutions from our partners</h1>
                <p  className={styles.p}>Improve your processes and leverage the benefits of our European cloud</p>
            </div>
        </div>
    )
}

export default HeroImage;