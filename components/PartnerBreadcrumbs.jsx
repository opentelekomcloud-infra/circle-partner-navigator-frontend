import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';


function PartnerBreadcrumbs({ props, linkLocale, locale }) {

    var headline = '';
    var partner_id = '';

    if (locale === "en") {
        headline = props["attributes"]["overview_headline"]
        partner_id = props["attributes"]["partner_id"]
    } else {
        props.attributes.localizations.data.map(partner_localization => {
            if (partner_localization.attributes.locale === locale) {
                headline = partner_localization.attributes.overview_headline
                partner_id = partner_localization.attributes.partner_id
            }
        })
    }
    const data = [
        {
            label: 'Partners',
            url: `/${linkLocale}/partners`,
        },
        {
            label: headline,
            url: `/${linkLocale}/partners/${partner_id}`,
        },
    ];

    return (
        <Breadcrumbs props={data} />
    );
}

export default PartnerBreadcrumbs;
