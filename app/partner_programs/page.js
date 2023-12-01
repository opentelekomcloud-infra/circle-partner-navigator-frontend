import { getAllPartnerPrograms } from '@/lib/partners';
import { getPartnerProgramData } from '@/lib/singleTypes';
import PartnerContactForm from "@/components/ContactForm"
import PartnerProgram from '@/components/PartnerProgram';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroImage from '@/components/HeroImage';
import Head from 'next/head';
import styles from '/styles/PartnerProgram.module.css';

const hero_image = {
  image: "partner-program-1920x300.webp"
}

const breadcrumbs = [
  {
      label: 'Partner Programs',
      url: '/partner_programs',
  }
];

let cachedProgramsData = null;

async function getcachedProgramsData() {
    // get partner data from API and cache the value for the time creating the partner pages
    if (cachedProgramsData === null) {
      cachedProgramsData = await getAllPartnerPrograms();
    }
    return cachedProgramsData;
}

export default async function Page() {
  // representation of first page
  const programs = await getcachedProgramsData()
  const metadata = await generateMetadata();
  const site = await getPartnerProgramData();
  return (
        <div>
          <Head>
              <title>{metadata.title}</title>
              <meta name="description" content={metadata.description} />
          </Head>
          <HeroImage props={hero_image}></HeroImage>
          <Breadcrumbs props={breadcrumbs}></Breadcrumbs>
          <div className="container">
            <div className={`width-setting ${styles.margin_bottom}`}>
                { site && (
                  <div>
                    <h1>{site.attributes.title}</h1>
                    <p>{site.attributes.description}</p>  
                  </div>
                )}
            </div>
          </div>          
          <div className={`${styles.container}`}>
            <div className={`${styles.container_width} ${styles.gap}`}>
              {programs.map((program, index) => {
                const isOdd = index % 2 !== 0;
                program["isodd"] = isOdd;
                return (
                    <PartnerProgram 
                      key={program["id"]} 
                      props={program}>
                    </PartnerProgram>
                )
              })}
              
            </div>
          </div>      
        <PartnerContactForm></PartnerContactForm>
        </div>
  )
}

export async function generateMetadata() {
  return {
      title: "Discover our partner programs",
      description: "Many start-ups and cloud service providers already work together with us an partners, using our technology and infrastructure for their cloud projects. This is a testament to their trust in the Open Telekom Cloud and our great partnership. You can start using these services today to improve your IT systems or your company's communications and benefit from the advantages of the GDPR-compliant European cloud."
  };
}
