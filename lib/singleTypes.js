import { postRequest } from '@/lib/helpers';

const baseUrl = process.env.BASE_URL

export async function getPartnerProgramData() {
    const url = `${baseUrl}api/partner-program-site?populate=localizations`
    let response = await postRequest(url)
    // console.log(JSON.stringify(response.data))
    return response.data
}