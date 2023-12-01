import React from 'react';
import styles from '/styles/PartnerProgram.module.css';
import Image from 'next/image';


function PartnerProgram({props}) {
    let media = props.attributes.media.data.attributes
    let mediaSrc = `/api/${media.hash}${media.ext}`
    const mediaType = media.mime.split('/')[0];
    const programContainerClasses = props.isodd ? `${styles.program_container} ${styles.odd_program}` : styles.program_container;

    return (
            <div className={programContainerClasses}>
                <div className={styles.program_item}>
                    {/* Conditional Rendering */}
                    {mediaType === 'video' && (
                        <video width="100%" height="100%" controls>
                            <source src={mediaSrc} type={media.mime} />
                        </video>
                    )}
                    {mediaType === 'image' && (
                        <Image
                            src={mediaSrc}
                            width={media.width}
                            height={media.height}
                            alt="Program Image"></Image>
                    )}
                </div>
                <div className={styles.program_item}>
                    <h2>{props.attributes.title}</h2>
                    <h3>{props.attributes.subtitle}</h3>
                    <p>{props.attributes.description}</p>
                </div>
            </div>
    )
}

export default PartnerProgram;