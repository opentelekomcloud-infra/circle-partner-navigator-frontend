import Index_header from "/components/Index_Header"
import PartnerListing from "/components/PartnerListing"
import HeroImage from "/components/HeroImage"
import PartnerContactForm from "/components/ContactForm"
import Breadcrumbs from "/components/Breadcrumbs"
import TwoColumnsWithPicture from "/components/TwoColumnsWithPicture"
import { getAllPartners, getAllTags, getAllWebAssets } from '/lib/partners';
import Head from "next/head"



export default async function App() {
  // representation of first page
  const cachedPartnersData = await getAllPartners();
  const cachedTagsData = await getAllTags();
  // const metadata = await generateMetadata();
  const webAssets = await getAllWebAssets();
  
  const mainHero = webAssets.find(asset => asset.attributes.name === 'main-hero-image')
  const mainHeroHash = mainHero["attributes"]["media"]["data"]["attributes"]["hash"]
  const mainHeroExt = mainHero["attributes"]["media"]["data"]["attributes"]["ext"]

  const otcIcon = webAssets.find(asset => asset.attributes.name === 'otc-icon')
  const otcIconHash = otcIcon["attributes"]["media"]["data"]["attributes"]["hash"]
  const otcIconExt = otcIcon["attributes"]["media"]["data"]["attributes"]["ext"]

  let heroMedia = {
    backgroundImageUrl: `/api/${mainHeroHash}${mainHeroExt}`,
    iconSrc: `/api/${otcIconHash}${otcIconExt}`,
    iconAlt: otcIcon["attributes"]["name"]
  }

  const introMedia = webAssets.find(asset => asset.attributes.name === 'circle-partner-tp')
  const introMediaHash = introMedia["attributes"]["media"]["data"]["attributes"]["hash"]
  const introMediaExt = introMedia["attributes"]["media"]["data"]["attributes"]["ext"]

  let intro = {
    image: `${introMediaHash}${introMediaExt}`,
    img_height: "517px",
    headline: "Discover the powerful services of our partners",
    text: ["Many start-ups and cloud service providers already work together with us an partners, using our technology and infrastructure for their cloud projects. This is a testament to their trust in the Open Telekom Cloud and our great partnership.", "You can start using these services today to improve your IT systems or your company's communications and benefit from the advantages of the GDPR-compliant European cloud."]
  }

  return (
        <div>
          {/* <Head>
              <title>{metadata.title}</title>
              <meta name="description" content={metadata.description} />
          </Head> */}
          <HeroImage props={heroMedia}></HeroImage>
          <Breadcrumbs></Breadcrumbs>
          <TwoColumnsWithPicture props={intro}></TwoColumnsWithPicture>
          <PartnerListing cachedPartners={cachedPartnersData} cachedTags={cachedTagsData}></PartnerListing>
          <PartnerContactForm></PartnerContactForm>
        </div>
  )
}

// export async function generateMetadata() {
//   return {
//       title: "Discover the powerful services of our partners",
//       description: "Many start-ups and cloud service providers already work together with us an partners, using our technology and infrastructure for their cloud projects. This is a testament to their trust in the Open Telekom Cloud and our great partnership. You can start using these services today to improve your IT systems or your company's communications and benefit from the advantages of the GDPR-compliant European cloud."
//   };
// }

