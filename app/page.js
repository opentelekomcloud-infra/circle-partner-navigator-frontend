import Index_header from "@/components/Index_Header"
import PartnerListing from "@/components/PartnerListing"
import HeroImage from "@/components/HeroImage"
import PartnerContactForm from "@/components/ContactForm"
import Breadcrumbs from "@/components/Breadcrumbs"
import TwoColumnsWithPicture from "@/components/TwoColumnsWithPicture"
import { getAllPartners, getAllTags } from '@/lib/partners';
import Head from "next/head"

const hero_image = {
  image: "open-telekom-cloud-loesungen-partner-stage-1920x300.webp"
}

const intro = {
  image: "Circle-Partner-tp.webp",
  img_height: "517px",
  headline: "Discover the powerful services of our partners",
  text: ["Many start-ups and cloud service providers already work together with us an partners, using our technology and infrastructure for their cloud projects. This is a testament to their trust in the Open Telekom Cloud and our great partnership.", "You can start using these services today to improve your IT systems or your company's communications and benefit from the advantages of the GDPR-compliant European cloud."]
}


export default async function App() {
  // representation of first page
  const cachedPartnersData = await getAllPartners();
  const cachedTagsData = await getAllTags();
  const metadata = await generateMetadata();
  return (
        <div>
          <Head>
              <title>{metadata.title}</title>
              <meta name="description" content={metadata.description} />
          </Head>
          <HeroImage props={hero_image}></HeroImage>
          <Breadcrumbs></Breadcrumbs>
          <TwoColumnsWithPicture props={intro}></TwoColumnsWithPicture>
          <PartnerListing cachedPartners={cachedPartnersData} cachedTags={cachedTagsData}></PartnerListing>
          <PartnerContactForm></PartnerContactForm>
        </div>
  )
}

export async function generateMetadata() {
  return {
      title: "Discover the powerful services of our partners",
      description: "Many start-ups and cloud service providers already work together with us an partners, using our technology and infrastructure for their cloud projects. This is a testament to their trust in the Open Telekom Cloud and our great partnership. You can start using these services today to improve your IT systems or your company's communications and benefit from the advantages of the GDPR-compliant European cloud."
  };
}
