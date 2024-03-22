import React from 'react';
import styles from '/styles/Teaser.module.css';
import Image from 'next/image';


function Teaser({props, locale}) {
    let mediaSrc = `/api/${props.attributes.teaser_media.data.attributes.hash}${props.attributes.teaser_media.data.attributes.ext}`
    const mediaType = props.attributes.teaser_media.data.attributes.mime.split('/')[0];

    let headline = ""
    let description = ""

    if (locale === "en") {
        headline = props["attributes"]["teaser_headline"]
        description = props["attributes"]["teaser_description"]
    } else {
        props.attributes.localizations.data.map(partner_localization => {
            if (partner_localization.attributes.locale === locale) {
                headline = partner_localization.attributes.teaser_headline
                description = partner_localization.attributes.teaser_description
            }
        })
    }

    return (
            <div className={styles.container}>
                <div className={styles.container_width}>
                    <div className={styles.teaser_container}>
                        <div className={styles.teaser_item}>
                            <h2>{headline}</h2>
                            <p>{description}</p>
                        </div>
                        <div className={styles.teaser_item}>
                            {mediaType === 'video' && (
                                <video width="100%" height="100%" controls>
                                    <source src={mediaSrc} type={props.attributes.teaser_media.data.attributes.mime} />
                                </video>
                            )}
                            {mediaType === 'image' && (
                                <Image
                                    src={mediaSrc}
                                    width={props.attributes.teaser_media.data.attributes.width}
                                    height={props.attributes.teaser_media.data.attributes.height}
                                    className={styles.teaser_image}
                                    alt="Teaser Image"></Image>
                            )}                            
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Teaser;