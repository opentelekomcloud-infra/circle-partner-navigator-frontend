import styles from '/styles/TwoColumnsWithPicture.module.css';
import Image from 'next/image';


function TwoColumnsWithPicture({props}) {
    return (
        <div className={styles.container}>
            <div className={styles.container_width}>
                <div className={styles.container_overview}>                    
                    <div className={`${styles.item} ${styles.text_item}`}>
                        <h1 className={styles.headline}>{props["headline"]}</h1>
                        <div className={styles.text}>
                            {props["text"].map(text => {
                                return(
                                    <p key={text} className={styles.text}>{text}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className={`${styles.item} ${styles.image_item}`} >
                        <Image
                            src={`/api/${props["image"]}`}
                            alt={props["image"]}
                            style={{maxHeight: `${props["img_height"]}`}}
                            className={styles.image}></Image>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TwoColumnsWithPicture;