import Startpage from "@/components/pages/Startpage"
import Head from "next/head"


export default async function App() {
    const metadata = await generateMetadata();
    const startpageProps = {
        locale: "de-DE" // Like Strapi API response
    }
    return (
        <div>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <Startpage props={startpageProps}></Startpage>
        </div>
    )
}

export async function generateMetadata() {
    return {
        title: "Discover the powerful services of our partners",
        description: "Many start-ups and cloud service providers already work together with us an partners, using our technology and infrastructure for their cloud projects. This is a testament to their trust in the Open Telekom Cloud and our great partnership. You can start using these services today to improve your IT systems or your company's communications and benefit from the advantages of the GDPR-compliant European cloud."
    };
}
