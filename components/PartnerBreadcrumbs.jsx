import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';


function PartnerBreadcrumbs({ props, linkLocale, locale }) {

    var headline = '';
    var partner_id = '';

    if (locale === "en") {
        headline = props["overview_headline"]
        partner_id = props["partner_id"]
    } else {
        props.localizations.map(partner_localization => {
            if (partner_localization.locale === locale) {
                headline = partner_localization.overview_headline
                partner_id = partner_localization.partner_id
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
