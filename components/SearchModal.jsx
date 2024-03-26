import React from "react";

import { ScaleTextField } from '@telekom/scale-components-react';

var timerID = 0;

// Build the request for searching
async function searchRequest(val, request_size, highlight_size) {

    // Default request without filtering
    const request_query = {
        "from" : 0, "size" : request_size,
        "_source": ["highlight", "current_page_name", "title", "base_url", "doc_url", "doc_type", "doc_title", "service_title"],
        "query": {
            "multi_match": {
              "query": val,
              "type": "bool_prefix",
              "operator": "and",
              "fields": [ "body", "title^2" ]
            }
        },
        "highlight": {
            "number_of_fragments": 1,
            "fragment_size":highlight_size,
            "pre_tags": [
                "<span style='color: var(--telekom-color-text-and-icon-primary-standard)'>"
            ],
            "post_tags": [
                "</span>"
            ],
            "fields":{
                "body": {},
                "title": {}
            },
            "require_field_match" : false
        }
    };


    let url = `${search_url}${search_environment}-*/_search`

    let response = await postRequest(url, request_query)

    return response
};


// TIMER WHICH STARTS THE SEARCH RESULT LIST AFTER TIMEOUT HAS BEEN REACHED
function timer(el) {
    timerID = setTimeout(async () => {
        if (el.value) {
            let response = await searchRequest(document.getElementById('searchbox').value, 100, 300);
            createMainResult(response)
        } else {
            deleteResults();
        };
    }, 250);
};

// FUNCTION WHICH STARTS THE TIMER EVENT AFTER THE KEY UP EVENT
const getSearchResults = async () => {
    clearTimeout(timerID);
    const el = document.getElementById('searchbox');
    timer(el);
};


function SearchModal({props, lang}) {

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
            <ScaleTextField id="searchbox" label={description} onScaleChange={getSearchResults}>
            </ScaleTextField>
        </scale-modal>
    );
}

export default SearchModal;
