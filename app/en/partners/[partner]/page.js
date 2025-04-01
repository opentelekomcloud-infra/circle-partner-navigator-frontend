import Overview from '@/components/Overview';
import Feature from '@/components/Feature';
import Teaser from '@/components/Teaser';
import { getAllPartners } from '@/lib/partners';
import PartnerContactForm from "@/components/PartnerContactForm"
import Quotation from "@/components/Quotation"
import PartnerBreadcrumbs from '@/components/PartnerBreadcrumbs';
import Head from 'next/head';

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

    const locale = "en"
    const linkLocale = "en"

    // const { partner } = params;
    const partners = await getCachedPartnersData()

    // From all partners the one with the correct partner data is being collected.
    let partnerData = partners.find(element => element.partner_id === params.partner);

    const metadata = await generateMetadata({params});

    // Quote
    let quote = {}
    if (partnerData.quotes) {
        // prevent more than one quote
        quote = partnerData.quotes[0]
    }

    return (
        <div>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <PartnerBreadcrumbs props={partnerData} linkLocale={linkLocale} locale={locale}></PartnerBreadcrumbs>
            <Overview props={partnerData} locale={locale}></Overview>
            <Teaser props={partnerData} locale={locale}></Teaser>
            {partnerData["features"].map(feature => {
                    return (
                        <Feature key={feature["id"]} props={feature} locale={locale}></Feature>
                    )
            })}
            {/* Test if quote is existing */}
            {quote && (
                <Quotation props={quote} locale={locale}></Quotation>               
            )}
            <PartnerContactForm locale={locale}></PartnerContactForm>

        </div>
    )
}

export async function generateStaticParams() {
    const partners = await getCachedPartnersData() 
    try {
        return partners.map((partner) => ({
            partner: partner.partner_id
        }));
    } catch {
        console.error("Error while accessing partner data. Check if the partner_id has an space in it.")
    }
}   

export async function generateMetadata({ params }) {
    const partners = await getCachedPartnersData()
    try {
        let partnerData = partners.find(element => element.partner_id === params.partner);
        return {
            title: partnerData.overview_headline,
            description: partnerData.overview_description
        };
    } catch {
        console.error("Error while accessing partner data. Check if the partner_id has an space in it.")
    }  
}
