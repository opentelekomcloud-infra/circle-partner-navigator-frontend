import styles from '/styles/Overview.module.css';
import Image from 'next/image';
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'


function Overview({props, locale}) {

    let mediaSrc = `/api/${props.overview_media.hash}${props.overview_media.ext}`

    let headline = ""
    let description = ""
    let product_type = ""
    let company = ""
    let website = ""

    if (locale === "en") {
        headline = props["overview_headline"]
        description = props["overview_description"]
        product_type = props["overview_product_type"]
        company = props["overview_company_name"]
        website = props["overview_website"]
    } else {
        props.localizations.map(partner_localization => {
            if (partner_localization.locale === locale) {
                headline = partner_localization.overview_headline
                description = partner_localization.overview_description
                product_type = partner_localization.overview_product_type
                company = partner_localization.overview_company_name
                website = partner_localization.overview_website
            }
        })
    }

    return (
        <div className="container">
            <div className="width-setting">
                <div className={styles.container_overview}>
                    <div className={styles.image_container}>
                        <Image
                            src={mediaSrc}
                            alt="Overview image"
                            width={props.overview_media.width}
                            height={props.overview_media.height}
                            className={styles.overview_image}></Image>
                    </div>
                    <div className={styles.container_text}>
                        <div className={styles.item_overview}>
                            <h1>{headline}</h1>
                        </div>

                        <div className={styles.item_overview}>
                            <ReactMarkdown children={description} />
                            <p className={styles.no_margin}>Product type: {product_type}</p>
                            <p className={styles.no_margin}>Provider: {company}</p>
                            <p className={styles.no_margin}>Website: <Link href={website}>{website}</Link></p>
                        </div>

                        <div className={styles.item_overview}>
                            <scale-button href={website}>Click Here</scale-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview;