import React from 'react';
import styles from '../styles/Feature.module.css';
import Image from 'next/image';



function Feature({props}) {

    let media = props["attributes"]["media"]["data"]["attributes"]
    let mediaName = `${media.hash}${media.ext}`
    let mediaSrc = `/api/${media.hash}${media.ext}`
    const mediaType = media.mime.split('/')[0];

    return (
        <div className="container">
            <div className="width-setting">
                <div className={styles.feature_container}>
                    <div className={`${styles.feature_item} ${styles.feature_item_image}`}>
                        {/* Conditional Rendering */}
                        {mediaType === 'video' && (
                            <video
                                width="100%"
                                height="100%"
                                controls>
                                <source src={mediaSrc} type={media.mime} />
                            </video>
                        )}
                        {mediaType === 'image' && (
                            <Image
                                src={mediaSrc}
                                width={media.width}
                                height={media.height}
                                alt={mediaName}></Image>
                        )} 
                    </div>
                    <div className={`${styles.feature_item} ${styles.feature_item_text}`}>
                        <div className={styles.feature_item}>
                            <h3>{props["attributes"]["headline"]}</h3>
                        </div>

                        <div className={styles.feature_item}>
                            <p>{props["attributes"]["description"]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature;