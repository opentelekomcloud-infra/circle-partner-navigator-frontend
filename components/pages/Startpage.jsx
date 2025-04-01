import Index_header from "@/components/Index_Header"
import PartnerListing from "@/components/PartnerListing"
import HeroImage from "@/components/HeroImage"
import PartnerContactForm from "@/components/PartnerContactForm"
import Breadcrumbs from "@/components/Breadcrumbs"
import TwoColumnsWithPicture from "@/components/TwoColumnsWithPicture"
import { getAllPartners, getAllTagCategories, getAllTags, getAllWebAssets } from '@/lib/partners';


export default async function Startpage({ props }) {
    // representation of first page
    const cachedPartnersData = await getAllPartners();
    const cachedTagsData = await getAllTags();
    const cachedTagCategoriesData = await getAllTagCategories();
    const webAssets = await getAllWebAssets();

    const mainHero = webAssets.find(asset => asset.name === 'main-hero-image')
    const mainHeroHash = mainHero["media"]["hash"]
    const mainHeroExt = mainHero["media"]["ext"]

    const otcIcon = webAssets.find(asset => asset.name === 'otc-icon')
    const otcIconHash = otcIcon["media"]["hash"]
    const otcIconExt = otcIcon["media"]["ext"]

    let heroMedia = {
        backgroundImageUrl: `/api/${mainHeroHash}${mainHeroExt}`,
        iconSrc: `/api/${otcIconHash}${otcIconExt}`,
        iconAlt: otcIcon["name"]
    }

    const introMedia = webAssets.find(asset => asset.name === 'cpn-logo-light')
    const introMediaHash = introMedia["media"]["hash"]
    const introMediaExt = introMedia["media"]["ext"]
    
    const introMediaDark = webAssets.find(asset => asset.name === 'cpn-logo-dark')
    const introMediaDarkHash = introMediaDark["media"]["hash"]
    const introMediaDarkExt = introMediaDark["media"]["ext"]

    let intro = {}
    if (props["locale"] === "en") {
        intro = {
            image: `${introMediaHash}${introMediaExt}`,
            image_dark: `${introMediaDarkHash}${introMediaDarkExt}`,
            img_height: "143px",
            headline: "Discover the powerful services of our partners",
            text: ["Many start-ups and cloud service providers already work together with us an partners, using our technology and infrastructure for their cloud projects. This is a testament to their trust in the Open Telekom Cloud and our great partnership.", "You can start using these services today to improve your IT systems or your company's communications and benefit from the advantages of the GDPR-compliant European cloud."]
        }
    } else if (props["locale"] === "de-DE") {
        intro = {
            image: `${introMediaHash}${introMediaExt}`,
            image_dark: `${introMediaDarkHash}${introMediaDarkExt}`,
            img_height: "143px",
            headline: "Entdecken Sie die leistungsstarken Services unserer Partner",
            text: ["Viele Start-ups und Cloud-Service-Anbieter arbeiten bereits mit uns als Partner zusammen und nutzen unsere Technologie und Infrastruktur für ihre Cloud-Produkte. Dies ist ein Beweis für ihr Vertrauen in die Open Telekom Cloud und unsere großartige Partnerschaft.", "Sie können diese Dienste schon heute einsetzen, um Ihre IT-Systeme oder die Kommunikation Ihres Unternehmens zu verbessern und von den Vorteilen der DSGVO-konformen europäischen Cloud zu profitieren."]
        }
    }
    

    return (
        <div>
            <HeroImage props={heroMedia} locale={props["locale"]}></HeroImage>
            <Breadcrumbs></Breadcrumbs>
            <TwoColumnsWithPicture props={intro}></TwoColumnsWithPicture>
            <PartnerListing
                cachedPartners={cachedPartnersData}
                cachedTags={cachedTagsData}
                cachedTagCategories={cachedTagCategoriesData}
                locale={props["locale"]}>
            </PartnerListing>
            <PartnerContactForm locale={props["locale"]}></PartnerContactForm>
        </div>
    )
}
