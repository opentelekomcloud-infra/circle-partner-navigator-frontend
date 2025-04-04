'use client';

import React from 'react';
import styles from '@/styles/Quotation.module.css';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown'


function Quotation({props, locale}) {

    let quotation = undefined
    let quotation_footer = undefined

    if (locale === "en" && props.quotation_footer !== undefined) {
        quotation = props["quotation"]
        quotation_footer = props["quotation_footer"]
    } else {
        props.localizations.map(partner_localization => {
            if (partner_localization.locale === locale) {
                quotation = partner_localization.quotation
                quotation_footer = partner_localization.quotation_footer
            }
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.container_width}>
                <div className={styles.quote_block}>
                    {props.profile_picture && (
                        <Image
                            src={`/api/${props.profile_picture.hash}${props.profile_picture.ext}`}
                            className={styles.quote_image}
                            width={props.profile_picture.width}
                            height={props.profile_picture.height}
                            alt={props.profile_picture.name}></Image>
                    )}
                    <div className={styles.quote_icon_text}>
                        <div className={styles.quote_icon}>”</div>                   
                        <div className={styles.quote_text}>
                            {quotation && (
                                <b><ReactMarkdown children={quotation} /></b>
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