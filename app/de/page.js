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
        title: "Entdecken Sie die leistungsstarken Services unserer Partner",
        description: "Viele Start-ups und Cloud-Service-Anbieter arbeiten bereits mit uns als Partner zusammen und nutzen unsere Technologie und Infrastruktur für ihre Cloud-Produkte. Dies ist ein Beweis für ihr Vertrauen in die T Cloud Public und unsere großartige Partnerschaft."
    };
}
