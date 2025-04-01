import React from 'react';
import styles from '/styles/Feature.module.css';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown'

function Feature({props, locale}) {

    let media = props["media"]
    let mediaName = `${media.hash}${media.ext}`
    let mediaSrc = `/api/${media.hash}${media.ext}`
    const mediaType = media.mime.split('/')[0];

    let headline = ""
    let description = ""

    if (locale === "en") {
        headline = props["headline"]
        description = props["description"]
    } else {
        props.localizations.map(partner_localization => {
            if (partner_localization.locale === locale) {
                headline = partner_localization.headline
                description = partner_localization.description
            }
        })
    }


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
                            <h3>{headline}</h3>
                        </div>

                        <div className={styles.feature_item}>
                            <ReactMarkdown children={description} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature;