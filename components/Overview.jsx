import styles from '/styles/Overview.module.css';
import Image from 'next/image';
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'


function Overview({props, locale}) {

    let mediaSrc = `/api/${props.attributes.overview_media.data.attributes.hash}${props.attributes.overview_media.data.attributes.ext}`

    let headline = ""
    let description = ""
    let product_type = ""
    let company = ""
    let website = ""

    if (locale === "en") {
        headline = props["attributes"]["overview_headline"]
        description = props["attributes"]["overview_description"]
        product_type = props["attributes"]["overview_product_type"]
        company = props["attributes"]["overview_company_name"]
        website = props["attributes"]["overview_website"]
    } else {
        props.attributes.localizations.data.map(partner_localization => {
            if (partner_localization.attributes.locale === locale) {
                headline = partner_localization.attributes.overview_headline
                description = partner_localization.attributes.overview_description
                product_type = partner_localization.attributes.overview_product_type
                company = partner_localization.attributes.overview_company_name
                website = partner_localization.attributes.overview_website
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
                            width={props.attributes.overview_media.data.attributes.width}
                            height={props.attributes.overview_media.data.attributes.height}
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