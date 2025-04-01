import React from 'react';
import styles from '/styles/Teaser.module.css';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown'


function Teaser({props, locale}) {
    let mediaSrc = `/api/${props.teaser_media.hash}${props.teaser_media.ext}`
    const mediaType = props.teaser_media.mime.split('/')[0];

    let headline = ""
    let description = ""

    if (locale === "en") {
        headline = props["teaser_headline"]
        description = props["teaser_description"]
    } else {
        props.localizations.map(partner_localization => {
            if (partner_localization.locale === locale) {
                headline = partner_localization.teaser_headline
                description = partner_localization.teaser_description
            }
        })
    }

    return (
            <div className={styles.container}>
                <div className={styles.container_width}>
                    <div className={styles.teaser_container}>
                        <div className={styles.teaser_item}>
                            <h2>{headline}</h2>
                            <ReactMarkdown children={description} />
                        </div>
                        <div className={styles.teaser_item}>
                            {mediaType === 'video' && (
                                <video width="100%" height="100%" controls>
                                    <source src={mediaSrc} type={props.teaser_media.mime} />
                                </video>
                            )}
                            {mediaType === 'image' && (
                                <Image
                                    src={mediaSrc}
                                    width={props.teaser_media.width}
                                    height={props.teaser_media.height}
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