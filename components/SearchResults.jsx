// components/SearchResults.jsx
import React from "react";
import Link from "next/link";

import styles from '@/styles/SearchResults.module.css';


const closeSearchModal = () => {
    const modal = document.getElementById('SearchModal');
    modal.opened = false;
}


function SearchResults({ results, locale, empty }) {
    const noResultsMessage =
        locale === "de" ? "Keine Ergebnisse gefunden." : "No results found.";

    return (
        <div className={styles.results_container}>
            {/* {console.log(results)} */}
            {!empty ? (
                results && results.length > 0 ? (
                    results.map((result, index) => {
                        const partnerId = result._source?.attributes?.partner_id;
                        const headline = result._source?.attributes?.overview_headline;
                        const highlightKey = Object.keys(result.highlight || {})[0];
                        const highlightHtml = result.highlight?.[highlightKey] || "";

                        if (!partnerId) return null; // falls kein partner_id vorhanden ist

                        return (
                            <div key={index} className={styles.result}>
                                <Link
                                    href={`/${locale}/partners/${partnerId}`}
                                    className={styles.atag}
                                    onClick={closeSearchModal}
                                >
                                    <div className={styles.header}>{headline}</div>
                                    <div className={styles.link}>
                                        {`/${locale}/partners/${partnerId}`}
                                    </div>
                                    <div
                                        className={styles.highlight}
                                        dangerouslySetInnerHTML={{ __html: highlightHtml }}
                                    ></div>
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <div>{noResultsMessage}</div>
                )
            ) : null}
        </div>
    );
}

export default SearchResults;
