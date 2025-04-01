// components/SearchResults.jsx
import React from "react";
import Link from "next/link";

import styles from '@/styles/SearchResults.module.css';


const closeSearchModal = () => {
    const modal = document.getElementById('SearchModal');
    modal.opened = false;
}


function SearchResults({results, locale, empty}) {
    const noResultsMessage =
        locale === "de" ? "Keine Ergebnisse gefunden." : "No results found.";
    return (
        <div className={styles.results_container}>
            {/* {console.log(results)} */}
            { !empty ? (
                results && results.length > 0 ? results.map((result, index) => (
                    <div  key={index} className={styles.result}>
                        <Link href={`/${locale}/partners/${result["_id"]}`} className={styles.atag} onClick={closeSearchModal}>
                            <div className={styles.header}>{result["_source"]["overview_headline"]}</div>
                            <div className={styles.link}>{`/${locale}/partners/${result["_id"]}`}</div>
                            <div className={styles.highlight} dangerouslySetInnerHTML={{ __html: result["highlight"][Object.keys(result["highlight"])[0]] }}></div>
                        </Link>
                    </div>
                )) : (
                    <div>{noResultsMessage}</div>
                )
            ) : (
                null
            )}
        </div>
    )
}

export default SearchResults;
