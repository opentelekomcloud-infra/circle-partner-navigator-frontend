import { postRequest, fetchWithPagination } from '@/lib/helpers';

const baseUrl = process.env.BASE_URL

export async function getAllPartners() {
    const url = `${baseUrl}api/partners?populate=overview_media&populate=teaser_media&populate=features.localizations&populate=features.media&populate=tags&populate=quotes.localizations&populate=quotes.profile_picture`
    const sortField = 'overview_headline'
    const data = await fetchWithPagination(url, sortField)
    // console.log(JSON.stringify(data))
    return data
}

export async function getAllPartnerIds() {
    const partners = await getAllPartners()
    return partners.data.map(partner => partner.attributes.partner_id)
}

export async function getAllTags() {
    const url = `${baseUrl}api/tags`
    const data = await postRequest(url)
    // console.log('Tags:', data.data)
    return data.data
}

export async function getAllPartnerPrograms() {
    const url = `${baseUrl}api/partner-programs?populate=media`
    const sortField = 'title'
    const data = await fetchWithPagination(url, sortField)
    // console.log(JSON.stringify(data))
    return data
}