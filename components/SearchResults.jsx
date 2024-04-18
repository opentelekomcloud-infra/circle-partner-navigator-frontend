// components/SearchResults.jsx
import React from "react";
import Link from "next/link";

function SearchResults({results, locale}) {
    return (
        <div>
            {/* {console.log(results)} */}
            {results ? results.map((result, index) => (
                <Link key={index} href={`/${locale}/partners/${result["_id"]}`}>
                    <div>
                        <div style={{fontSize: "1.5rem", fontWeight: 'bold'}}>{result["_source"]["attributes"]["overview_headline"]}</div>
                        <div style={{color: 'blue'}}>{`/${locale}/partners/${result["_id"]}`}</div>
                        <div dangerouslySetInnerHTML={{ __html: result["highlight"][Object.keys(result["highlight"])[0]] }}></div>
                    </div>  
                </Link>        
            )) : null}
        </div>
    )
}

export default SearchResults;
