import { Client } from '@opensearch-project/opensearch';
import dotenv from 'dotenv'

dotenv.config();
const baseUrl = process.env.BASE_URL
const authToken = process.env.AUTH_TOKEN

const host = "opensearch.eco.tsi-dev.otc-service.com";
const username = process.env.OPENSEARCH_USER;
const password = process.env.OPENSEARCH_PASSWORD;

if (!username || !password) {
  throw new Error("Missing OPENSEARCH_USER or OPENSEARCH_PASS environment variables.");
}

const client = new Client({
  node: `https://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}`
});


export async function getAllPartners() {
    const url = `${baseUrl}api/partners?populate=overview_media&populate=localizations&populate=teaser_media&populate=features.localizations&populate=features.media&populate=tags&populate=quotes.localizations&populate=quotes.profile_picture`
    const sortField = 'overview_headline'
    const data = await fetchWithPagination(url, sortField)
    // console.log(JSON.stringify(data))
    return data
}

export async function postRequest(url) {
    try {
        // Configuration object for the Fetch function with the Authorization header
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        // Fetch data and wait for the response
        const response = await fetch(url, requestOptions);

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

export async function fetchWithPagination(url, sortField) {
    let pageCount = 2
    let i = 1
    let data = []
    let totalCount
    do {
        let localurl = `${url}&sort[0]=${sortField}&pagination[page]=${i}`
        let response = await postRequest(localurl)
        pageCount = response.meta.pagination.pageCount
        // Concat to existing data
        data = data.concat(response.data)
        totalCount = response.meta.pagination.total
        i = i + 1
    } while (i <= pageCount)
    
    // Check whether all pages were queried successfully
    if (data.length !== totalCount) {
        console.error(`Total queried count differs from actual count for the following URL: ${url}`)
    }
    return data
}

// Transform a single entry into your target structure
function transformEntry(e) {
  return {
    id: e.id,
    attributes: {
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      publishedAt: e.publishedAt,
      locale: e.locale,
      partner_id: e.partner_id,
      overview_headline: e.overview_headline,
      overview_description: e.overview_description,
      teaser_description: e.teaser_description,
      teaser_headline: e.teaser_headline,
      overview_product_type: e.overview_product_type,
      overview_company_name: e.overview_company_name,
      overview_website: e.overview_website,
      features: {
        data: (e.features || []).map(f => ({
          id: f.id,
          attributes: {
            description: f.description,
            headline: f.headline,
            createdAt: f.createdAt,
            updatedAt: f.updatedAt,
            publishedAt: f.publishedAt,
            locale: f.locale
          }
        }))
      },
      tags: {
        data: (e.tags || []).map(t => ({
          id: t.id,
          attributes: {
            name: t.name,
            color: t.color,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt
          }
        }))
      },
      quotes: {
        data: (e.quotes || []).map(q => ({
          id: q.id,
          attributes: {
            quotation: q.quotation,
            quotation_footer: q.quotation_footer,
            createdAt: q.createdAt,
            updatedAt: q.updatedAt,
            publishedAt: q.publishedAt,
            locale: q.locale
          }
        }))
      }
    }
  };
}

// Transform an array of source entries
export function transformEntries(sourceArray) {
  return (sourceArray).map(transformEntry);
}

// Build bulk body with action–document pairs
function buildBulkBody(indexName, docs) {
  return docs.flatMap(doc => [
    { index: { _index: indexName, _id: String(doc.id) } },
    doc
  ]);
}

// Bulk upload transformed docs to OpenSearch
export async function bulkUploadTransformed(indexName, transformedDocs) {
  const body = buildBulkBody(indexName, transformedDocs);
  console.log("test")
  const resp = await client.bulk({ refresh: true, body });
  console.log(resp)

  if (resp.body.errors) {
    throw new Error(`Failures during Upload to OpenSearch.`);
  }
  return resp;
}


const PartnersData = await getAllPartners();
const transformed = transformEntries(PartnersData);
const index = "cpn-partners-test";
const exists = await client.indices.exists({ index });
if (!exists.body) {
  await client.indices.create({ index });
}
await bulkUploadTransformed(index, transformed);
