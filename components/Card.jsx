'use client';

import React, { useState } from 'react';
import styles from '/styles/Card.module.css';
import Image from 'next/image';
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

function Card({props, locale}) {
    // representation of a partner inside of partner navigator
    const [partner, setPartner] = useState(props)

    let overviewMedia = partner.overview_media.hash
    overviewMedia = overviewMedia.concat(partner.overview_media.ext)
    let partnerTags = partner.tags

    let overview_headline = ""
    let overview_description = ""


    if (locale === "en") {
        overview_headline = partner.overview_headline
        overview_description = partner.overview_description
    } else {
        partner.localizations.map(partner_localization => {
            if (partner_localization.locale === locale) {
                overview_headline = partner_localization.overview_headline
                overview_description = partner_localization.overview_description
            }
        })
    }

    let href_link = ""
    if (locale === "en") {
        href_link = "/en"
    } else if (locale === "de-DE") {
        href_link = "/de"
    }

    return (
                <div className={styles.card_container}>
                    <Link href={`${href_link}/partners/${partner.partner_id}`}>
                        <div className={styles.card_body}>
                            <Image
                                src={`/api/${overviewMedia}`}
                                width={partner.overview_media.width}
                                height={partner.overview_media.height}
                                className={styles.image}
                                alt={overview_headline}>
                            </Image>
                            <div className={styles.content_container}>
                                <h3 className={styles.h3}>{overview_headline}</h3>
                                <div className={styles.content}><ReactMarkdown children={overview_description} /></div>
                                {partnerTags.map(tag => {
                                    return(
                                        <div
                                            className={styles.tag}
                                            key={tag.id}
                                            style={{borderLeft: `3px solid ${tag.color}`}}
                                        >
                                            {tag.name}
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