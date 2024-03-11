import React from 'react';
import styles from '/styles/HeroImage.module.css';
import Image from 'next/image';


function HeroImage({props, locale}) {
    let headline = ""
    let summary = ""

    if (locale === "en") {
        headline = "Cloud solutions from our partners"
        summary = "Improve your processes and leverage the benefits of our European cloud"
    } else if (locale === "de-DE") {
        headline = "Cloud-Lösungen unserer Partner"
        summary = "Verbessern Sie Ihre Prozesse und nutzen Sie die Vorteile unserer europäischen Cloud"
    }

    return (
        <div className={styles.container} style={{backgroundImage: "url(" + props["backgroundImageUrl"] + ")"}}>
            <div className={styles.text_container}>
                <Image
                    src={props["iconSrc"]}
                    className={styles.image}
                    alt={props["iconAlt"]}>
                </Image>
                <h1 className={styles.h1}>{headline}</h1>
                <p  className={styles.p}>{summary}</p>
            </div>
        </div>
    )
}

export default HeroImage;