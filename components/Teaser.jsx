import React from 'react';
import styles from '/styles/Teaser.module.css';
import Image from 'next/image';


function Teaser({props}) {
    let mediaSrc = `/api/${props.media.hash}${props.media.ext}`
    const mediaType = props.media.mime.split('/')[0];

    return (
            <div className={styles.container}>
                <div className={styles.container_width}>
                    <div className={styles.teaser_container}>
                        <div className={styles.teaser_item}>
                            <h2>{props["headline"]}</h2>
                            <p>{props["description"]}</p>
                        </div>
                        <div className={styles.teaser_item}>
                            {/* Conditional Rendering */}
                            {mediaType === 'video' && (
                                <video width="100%" height="100%" controls>
                                    <source src={mediaSrc} type={props.media.mime} />
                                </video>
                            )}
                            {mediaType === 'image' && (
                                <Image
                                    src={mediaSrc}
                                    width={props.media.width}
                                    height={props.media.height}
                                    alt="Teaser Image"></Image>
                            )}                            
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Teaser;