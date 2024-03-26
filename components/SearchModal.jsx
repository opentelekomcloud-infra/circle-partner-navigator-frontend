import React from "react";

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
            <p>{description}</p>
        </scale-modal>
    );
}

export default SearchModal;
