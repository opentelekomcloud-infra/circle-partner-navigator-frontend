import React, { useState, useEffect} from 'react';

import { ScaleTextField } from '@telekom/scale-components-react';
import { postRequest } from '@/lib/postrequest'
import SearchResults from '@/components/SearchResults';


var timerID = 0;

// Build the request for searching
async function searchRequest(queryText, locale) {

    // Default request without filtering
    const request_query = {
        "from": 0,
        "size": 10,
        "_source": ["highlight", "_id", "overview_headline"],
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
          "pre_tags": [
            "<span style='color: var(--telekom-color-text-and-icon-primary-standard)'>"
          ],
          "post_tags": [
            "</span>"
          ]
        }
      };
      


    let url = `https://opensearch.eco.tsi-dev.otc-service.com/cpn-*-${locale}/_search`

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
    const [searchResults, setSearchResults] = useState(null);
    const [empty, setEmpty] = useState(true);

    let heading = ""
    let description = ""

    if (locale === "de") {
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
                onScaleChange={(scaleTextField) => getSearchResults(scaleTextField.target, setSearchResults, locale, setEmpty)}>
            </ScaleTextField>

            <SearchResults results={searchResults} locale={locale} empty={empty}></SearchResults>
        </scale-modal>
    );
}

export default SearchModal;
