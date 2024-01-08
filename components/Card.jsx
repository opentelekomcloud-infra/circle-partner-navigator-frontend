'use client';

import React, { useState } from 'react';
import styles from '/styles/Card.module.css';
import Image from 'next/image';
import Link from 'next/link'

function Card({props}) {
    // representation of a partner inside of partner navigator
    const [partner, setPartner] = useState(props)

    let overviewMedia = partner.attributes.overview_media.data.attributes.hash
    overviewMedia = overviewMedia.concat(partner.attributes.overview_media.data.attributes.ext)
    let partnerTags = partner.attributes.tags.data

    return (
                <div className={styles.card_container}>
                    <Link href={`/en/partners/${partner.attributes.partner_id}`}>
                        <div className={styles.card_body}>
                            <Image
                                src={`/api/${overviewMedia}`}
                                width={partner.attributes.overview_media.data.attributes.width}
                                height={partner.attributes.overview_media.data.attributes.height}
                                className={styles.image}
                                alt={partner.attributes.overview_headline}>
                            </Image>
                            <div className={styles.content_container}>
                                <h3 className={styles.h3}>{partner.attributes.overview_headline}</h3>
                                <div className={styles.content}>{partner.attributes.overview_description}</div>
                                {partnerTags.map(tag => {
                                    return(
                                        <div
                                            className={styles.tag}
                                            key={tag.id}
                                            style={{borderLeft: `3px solid ${tag.attributes.color}`}}
                                        >
                                            {tag.attributes.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Link>
                </div>
    )
}

export default Card;