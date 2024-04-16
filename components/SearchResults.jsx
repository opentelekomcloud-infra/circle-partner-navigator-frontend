// components/SearchResults.jsx
import React from "react";

function SearchResults({results}) {
    return (
        <div>
            {console.log(results)}
            {results ? results.map((result, index) => (
                <div key={index}>
                    <div style={{fontSize: "1.5rem", fontWeight: 'bold'}}>{result["_source"]["attributes"]["overview_headline"]}</div>
                    <div style={{color: 'blue'}}>https://dev.schreiber-ling.de/?folder=/home/ubuntu/workspace</div>
                    <div>
                        {result["highlight"][Object.keys(result["highlight"])[0]]}
                    </div>
                </div>                
            )) : null}
        </div>
    )
}

export default SearchResults;
