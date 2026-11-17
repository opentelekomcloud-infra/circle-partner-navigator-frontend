import React, { useState, useEffect} from 'react';

import { ScaleTextField } from '@telekom/scale-components-react';
import { postRequest } from '@/lib/postrequest'
import SearchResults from '@/components/SearchResults';
import { normaliseLocale } from '@/lib/locale';
import { HIGHLIGHT_START, HIGHLIGHT_END } from '@/lib/highlight';


var timerID = 0;

// Build the request for searching
async function searchRequest(queryText, locale) {
    const safeLocale = normaliseLocale(locale);

    // Default request without filtering
    const request_query = {
        "from": 0,
        "size": 10,
        "_source": [
          "attributes.partner_id",
          "attributes.overview_headline"
        ],
        "query": {
          "bool": {
            "should": [
              {
                "multi_match": {
                  "query": queryText,
                  "type": "phrase_prefix",
                  "slop": 4
                }
              }
            ]
          }
        },
        "highlight": {
          "number_of_fragments": 1,
          "fragment_size": 100,
          "fields": {
            "*": {}
          },
          "require_field_match": false,
          // Control characters, not HTML: SearchResults renders the fragments
          // as React text and wraps the marked parts in a <span>.
          "pre_tags": [HIGHLIGHT_START],
          "post_tags": [HIGHLIGHT_END]
        }
      };
      


    let url = `https://opensearch.eco.tsi-dev.otc-service.com/cpn-index-${safeLocale}/_search`

    let response = await postRequest(url, request_query)

    return response.hits.hits
};


// TIMER WHICH STARTS THE SEARCH RESULT LIST AFTER TIMEOUT HAS BEEN REACHED
function timer(el, setSearchResults, locale, setEmpty) {
    timerID = setTimeout(async () => {
        if (el.value) {
            let response = await searchRequest(el.value, locale);
            setSearchResults(response); // Update search results
            setEmpty(false);
        } else {
            setSearchResults([]); // Clear search results
            setEmpty(true);
        };
    }, 500);
};

const getSearchResults = (el, setSearchResults, locale, setEmpty) => {
    clearTimeout(timerID);
    timer(el, setSearchResults, locale, setEmpty);
};


function SearchModal({locale}) {
    const safeLocale = normaliseLocale(locale);
    const [searchResults, setSearchResults] = useState(null);
    const [empty, setEmpty] = useState(true);

    let heading = ""
    let description = ""

    if (safeLocale === "de") {
        heading = "Suche"
        description = "Durchsuchen Sie hier unsere Partnerangebote."
    }
    else {
        heading = "Search"
        description = "Search here through our partner offerings."
    }

    // useEffect(() => {
    //     console.log(searchResults)
    // }, [searchResults]);

    return (
        <scale-modal heading={heading} size="large" id="SearchModal">
            {/* scaleTextField is the event or the element which is provided to the timer function */}
            {/* setSearchResults is the method which updates our result list */}
            <ScaleTextField
                id="searchbox"
                label={description}
                onScaleChange={(scaleTextField) => getSearchResults(scaleTextField.target, setSearchResults, safeLocale, setEmpty)}>
            </ScaleTextField>

            <SearchResults results={searchResults} locale={safeLocale} empty={empty}></SearchResults>
        </scale-modal>
    );
}

export default SearchModal;
