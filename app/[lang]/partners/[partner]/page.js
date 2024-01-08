import Overview from '../../../../components/Overview';
import Feature from '../../../../components/Feature';
import Teaser from '../../../../components/Teaser';
import { getAllPartners } from '../../../../lib/partners';
import PartnerContactForm from "../../../../components/ContactForm"
import Quotation from "../../../../components/Quotation"
import Breadcrumbs from '../../../../components/Breadcrumbs';
import Head from 'next/head';
import path from 'path';

let cachedPartnersData = null;

async function getCachedPartnersData() {
    // get partner data from API and cache the value for the time creating the partner pages
    if (cachedPartnersData === null) {
      cachedPartnersData = await getAllPartners();
    }
    return cachedPartnersData;
}

export default async function Page({ params }) {
    // function to create partner pages

    const { partner } = params.partner;
    const partners = await getCachedPartnersData()

    // From all partners the one with the correct partner data is being collected.
    let partnerData = partners.find(element => element.attributes.partner_id === params.partner);

    // const metadata = await generateMetadata({params});

    // Overview
    const overviewContent = {
        headline: partnerData["attributes"]["overview_headline"],
        description: partnerData["attributes"]["overview_description"],
        product_type: partnerData["attributes"]["overview_product_type"],
        company: partnerData["attributes"]["overview_company_name"],
        website: partnerData["attributes"]["overview_website"],
        media: partnerData.attributes.overview_media.data.attributes
    }

    // Teaser
    const teaserContent = {
        headline: partnerData["attributes"]["teaser_headline"],
        description: partnerData["attributes"]["teaser_description"],
        media: partnerData.attributes.teaser_media.data.attributes
    }

    // Features
    const featuresContent = partnerData["attributes"]["features"]["data"]

    // Quote
    let quote = {}
    if (partnerData.attributes.quotes.data) {
        quote = partnerData.attributes.quotes.data[0]
    }

    // Compute the breadcrumb data based on the route
    const breadcrumbs = [
        {
            label: 'Partners',
            url: '/partners',
        },
        {
            label: partnerData.attributes.overview_headline,
            url: `/partners/${partnerData.attributes.partner_id}`,
        },
    ];
    
    return (
        <div>
            {/* <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head> */}
            <Breadcrumbs props={breadcrumbs}></Breadcrumbs>
            <Overview props={overviewContent}></Overview>
            <Teaser props={teaserContent}></Teaser>
            {featuresContent.map(feature => {
                    return (
                        <Feature key={feature["id"]} props={feature}></Feature>
                    )
            })}
            {/* Test if quote is existing */}
            {quote && (
                <Quotation props={quote}></Quotation>               
            )}
            <PartnerContactForm></PartnerContactForm>

        </div>
    )
}

export async function generateStaticParams({params: {lang}}) {
    const partners = await getCachedPartnersData()
    console.log(lang)
    return partners.map((partner) => ({
        lang: lang,
        partner: partner.attributes.partner_id
    }));
}   

// export async function generateMetadata({ params }) {
//     const partners = await getCachedPartnersData()
//     let partnerData = partners.find(element => element.attributes.partner_id === params.partner);
//     return {
//         title: partnerData.attributes.overview_headline,
//         description: partnerData.attributes.overview_description
//     };
    
// }
