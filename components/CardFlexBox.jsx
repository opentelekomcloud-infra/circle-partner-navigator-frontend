import React from 'react';
import styles from '../styles/CardFlexBox.module.css';


function CardFlexBox({children}) {
    return (
        <div className={styles.flex_box}>
            {children}
        </div>
    )
}

export default CardFlexBox;