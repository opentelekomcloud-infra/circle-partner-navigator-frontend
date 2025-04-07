import fetch from 'node-fetch'
import fsExtra from 'fs-extra'
import dotenv from 'dotenv'

const fs = fsExtra;
const node_fetch = fetch;
dotenv.config();

// API base URL
const baseUrl = process.env.BASE_URL;
// Strapi auth token
const authToken = process.env.AUTH_TOKEN;
// repository where the media files will be stored
const destinationDirectory = './public/api/';

// This function uses async/await to fetch data from an API with an Authorization header
async function fetchDataFromAPI(apiUrl, authToken) {
    // fetch data from the API by specifiying an API URL and the Strapi auth token
    try {
        // Configuration object for the Fetch function with the Authorization header
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        // Fetch data and wait for the response
        const response = await fetch(apiUrl, requestOptions);

        // Ensure the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch API data from the following URI ${apiUrl}`);
        }

        // Format the data as JSON and return
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function fetchData(url) {
    let data = await fetchDataFromAPI(url, authToken)
    // console.log(JSON.stringify(data))
    return data
}

// Iterate through all pages of strapi requests
const requestPagination = async (url) => {
    // Some random start page count
    let pageCount = 2
    let i = 1
    let completeData = []
    let totalCount
    do {
        let localurl = `${url}&pagination[page]=${i}&pagination[pageSize]=100`
        let data = await fetchData(localurl)
        pageCount = data.meta.pagination.pageCount
        // Concat to existing data
        completeData = completeData.concat(data.data)
        totalCount = data.meta.pagination.total
        i = i + 1
    } while (i <= pageCount)
    
    // Check whether all pages were queried successfully
    if (completeData.length !== totalCount) {
        console.error(`Total queried count differs from actual count for the following URL: ${url}`)
    }
    return completeData
}

async function fetchPartnerMediaUrls() {
    // collect all URLs for media files for the partner and the partner teaser
    const url = `${baseUrl}api/partners?populate=overview_media&populate=teaser_media`
    let data = await requestPagination(url);
    let mediaFileUrls = [];
    data.map(item => {
        // Check for imageUrl existance
        let partnerMedia = item.overview_media.url
        // partnerMedia = partnerMedia.substring(1);
        if (!mediaFileUrls.includes(partnerMedia)) {
            mediaFileUrls.push(partnerMedia);
        }

        let teaserMedia = item.teaser_media.url
        // teaserMedia = teaserMedia.substring(1);
        if (!mediaFileUrls.includes(teaserMedia)) {
            mediaFileUrls.push(teaserMedia);
        }
    })
    return mediaFileUrls
}

async function fetchFeatureMediaUrls(mediaFileUrls) {
    // collect all URLs of the media files of the feature
    const url = `${baseUrl}api/features?populate=media`
    let data = await requestPagination(url);
    data.map(item => {
        // Check for imageUrl existance
        if (!item.media) {
            throw new Error(`Feature \"${item.headline}\" doesn't have any media! Exiting.`)
        }
        let media = item.media.url
        if (!mediaFileUrls.includes(media)) {
            mediaFileUrls.push(media);
        }
    })
    return mediaFileUrls
}

async function fetchQuotesMediaUrls(mediaFileUrls) {
    // collect all URLs of the media files of the feature
    const url = `${baseUrl}api/quotes?populate=profile_picture`
    let data = await requestPagination(url);
    data.map(item => {
        // Check for imageUrl existance
        let media = item.profile_picture.url
        if (!mediaFileUrls.includes(media)) {
            mediaFileUrls.push(media);
        }
    })
    return mediaFileUrls
}

async function fetchPartnerProgramsMediaUrls(mediaFileUrls) {
    // collect all URLs of the media files of the feature
    const url = `${baseUrl}api/partner-programs?populate=media`
    let data = await requestPagination(url);
    data.map(item => {
        // Check for imageUrl existance
        let media = item.media.url
        if (!mediaFileUrls.includes(media)) {
            mediaFileUrls.push(media);
        }
    })
    return mediaFileUrls
}

async function fetchWebsiteAssetsMediaUrls(mediaFileUrls) {
    // collect all URLs of the media files of the feature
    const url = `${baseUrl}api/website-assets?populate=media`
    let data = await requestPagination(url);
    data.map(item => {
        // Check for imageUrl existance
        let media = item.media.url
        if (!mediaFileUrls.includes(media)) {
            mediaFileUrls.push(media);
        }
    })
    return mediaFileUrls
}

async function deleteExistingFiles(dir) {
    // delete all existing files in a specified directory
    try {
        await fs.emptyDir(dir);
        console.log(`Info: Delete all files of directory: ${dir}`);
    } catch (error) {
        console.error('Error deleting existing files:', error);
    }
}

async function downloadMediaFiles() {
    // main function to download all media files and save them in the 
    // /public folder
    let rawUrls = await fetchPartnerMediaUrls();
    rawUrls = await fetchFeatureMediaUrls(rawUrls);
    rawUrls = await fetchQuotesMediaUrls(rawUrls);
    rawUrls = await fetchPartnerProgramsMediaUrls(rawUrls);
    rawUrls = await fetchWebsiteAssetsMediaUrls(rawUrls);

    // remove first character which is a slash
    const mediaUrls = rawUrls.map(item => item.slice(1))

    try {
        // remove files in public directory
        await deleteExistingFiles(destinationDirectory);
        await fs.ensureDir(destinationDirectory);

        // add new media files to public directory
        let i = 0;
        for (const url of mediaUrls) {
            const response = await node_fetch(`${baseUrl}${url}`);
            const buffer = await response.buffer();
            const filename = url.split('/').pop();
            await fs.writeFile(`${destinationDirectory}/${filename}`, buffer);
            i++;
        }

        console.log(`Info: ${i} Media files downloaded successfully!`);
    } catch (error) {
        console.error('Error downloading images:', error);
    }
}

downloadMediaFiles();