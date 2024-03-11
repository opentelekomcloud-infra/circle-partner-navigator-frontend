'use client';

import React from 'react';
import styles from '@/styles/Quotation.module.css';
import Image from 'next/image';


function Quotation({props, locale}) {

    let quotation = undefined
    let quotation_footer = undefined

    if (locale === "en" && props.attributes.quotation_footer !== undefined) {
        quotation = props["attributes"]["quotation"]
        quotation_footer = props["attributes"]["quotation_footer"]
    } else {
        props.attributes.localizations.data.map(partner_localization => {
            if (partner_localization.attributes.locale === locale) {
                quotation = partner_localization.attributes.quotation
                quotation_footer = partner_localization.attributes.quotation_footer
            }
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.container_width}>
                <div className={styles.quote_block}>
                    {props.attributes.profile_picture && (
                        <Image
                            src={`/api/${props.attributes.profile_picture.data.attributes.hash}${props.attributes.profile_picture.data.attributes.ext}`}
                            className={styles.quote_image}
                            width={props.attributes.profile_picture.data.attributes.width}
                            height={props.attributes.profile_picture.data.attributes.height}
                            alt={props.attributes.profile_picture.data.attributes.name}></Image>
                    )}
                    <div className={styles.quote_icon_text}>
                        <div className={styles.quote_icon}>”</div>                   
                        <div className={styles.quote_text}>
                            {quotation && (
                                <b>{quotation}</b>
                            )}                            
                            <div className={styles.quote_footer}>
                                {quotation_footer && (
                                    <div>{quotation_footer}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quotation;