import styles from '../styles/Overview.module.css';
import Image from 'next/image';
import Link from 'next/link'


function Overview({props}) {

    let mediaSrc = `/api/${props.media.hash}${props.media.ext}`

    return (
        <div className="container">
            <div className="width-setting">
                <div className={styles.container_overview}>
                    <div className={styles.image_container}>
                        <Image
                            src={mediaSrc}
                            alt="Overview image"
                            width={props.media.width}
                            height={props.media.height}
                            className={styles.overview_image}></Image>
                    </div>
                    <div className={styles.container_text}>
                        <div className={styles.item_overview}>
                            <h1>{props["headline"]}</h1>
                        </div>

                        <div className={styles.item_overview}>
                            <p>{props["description"]}</p>
                            <p className={styles.no_margin}>Product type: {props["product_type"]}</p>
                            <p className={styles.no_margin}>Provider: {props["company"]}</p>
                            <p className={styles.no_margin}>Website: <Link href={props["website"]}>{props["website"]}</Link></p>
                        </div>

                        <div className={styles.item_overview}>
                            <scale-button href={props["website"]}>Click Here</scale-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview;