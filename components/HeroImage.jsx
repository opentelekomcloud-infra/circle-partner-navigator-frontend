import React from 'react';
import styles from '/styles/HeroImage.module.css';
import Image from 'next/image';


function HeroImage({props}) {
    let media = props["attributes"]["media"]["data"]["attributes"]
    let mediaName = props["attributes"]["name"]
    let mediaSrc = `/api/${media.hash}${media.ext}`

    return (
        <div className={styles.container} style={{ backgroundImage: "url('/open-telekom-cloud-partner-overview-stage-allgemein.jpg')" }}>
            <Image
                src={mediaSrc}
                className={styles.image}
                alt={mediaName}>
            </Image>
            <div className={styles.text_container}>
                <h1 className={styles.h1}>Cloud solutions from our partners</h1>
                <p  className={styles.p}>Improve your processes and leverage the benefits of our European cloud</p>
            </div>
        </div>
    )
}

export default HeroImage;