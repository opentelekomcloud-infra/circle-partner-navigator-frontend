import React, { useState } from "react";

import { ScaleTextField } from '@telekom/scale-components-react';
import { postRequest } from '@/lib/postrequest'


var timerID = 0;

// Build the request for searching
async function searchRequest(queryText) {

    // Default request without filtering
    const request_query = {
        "from" : 0,
        "size" : 10,
        "_source": ["highlight", "_id", "attributes.overview_headline"],
        "query": {
            "multi_match": {
              "query": queryText
            }
        },
        "highlight": {
          "number_of_fragments": 1,
          "fragment_size": 100,
          "fields": {
            "*": {}
          },
          "require_field_match" : false,
          "pre_tags": [
              "<span style='color: var(--telekom-color-text-and-icon-primary-standard)'>"
          ],
          "post_tags": [
              "</span>"
          ]
        }
      };


    let url = 'https://opensearch.eco.tsi-dev.otc-service.com/cpn-*/_search'

    let response = await postRequest(url, request_query)

    return response
};


// TIMER WHICH STARTS THE SEARCH RESULT LIST AFTER TIMEOUT HAS BEEN REACHED
function timer(el, setSearchResults) {
    timerID = setTimeout(async () => {
        if (el.value) {
            let response = await searchRequest(el.value);
            setSearchResults(response); // Update search results
        } else {
            setSearchResults(null); // Clear search results
        };
    }, 250);
};

const getSearchResults = (el, setSearchResults) => {
    clearTimeout(timerID);
    timer(el, setSearchResults);
};


function SearchModal({props, lang}) {
    const [searchResults, setSearchResults] = useState(null);

    let heading = ""
    let description = ""

    if (lang === "de") {
        heading = "Suche"
        description = "Durchsuchen Sie hier unsere Partnerangebote."
    }
    else {
        heading = "Search"
        description = "Search here through our partner offerings."
    }

    return (
        <scale-modal heading={heading} size="large" id="SearchModal">
            {/* scaleTextField is the event or the element which is provided to the timer function */}
            {/* setSearchResults is the method which updates our result list */}
            <ScaleTextField id="searchbox" label={description} onScaleChange={(scaleTextField) => getSearchResults(scaleTextField.target, setSearchResults)}>
            </ScaleTextField>
            <SearchResults results={searchResults}></SearchResults>
        </scale-modal>
    );
}

export default SearchModal;
