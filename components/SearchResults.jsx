// components/SearchResults.jsx
import React from "react";
import Link from "next/link";

import styles from '@/styles/SearchResults.module.css';


const closeSearchModal = () => {
    const modal = document.getElementById('SearchModal');
    modal.opened = false;
}


function SearchResults({results, locale}) {
    return (
        <div className={styles.results_container}>
            {/* {console.log(results)} */}
            {results ? results.map((result, index) => (
                <div  key={index} className={styles.result}>
                    <Link href={`/${locale}/partners/${result["_id"]}`} className={styles.atag} onClick={closeSearchModal}>
                        <div className={styles.header}>{result["_source"]["attributes"]["overview_headline"]}</div>
                        <div className={styles.link}>{`/${locale}/partners/${result["_id"]}`}</div>
                        <div className={styles.highlight} dangerouslySetInnerHTML={{ __html: result["highlight"][Object.keys(result["highlight"])[0]] }}></div>
                    </Link>
                </div>
            )) : null}
        </div>
    )
}

export default SearchResults;
