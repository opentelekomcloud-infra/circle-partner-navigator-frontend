import { Client } from '@opensearch-project/opensearch';
import dotenv from 'dotenv';

dotenv.config();

const authToken = process.env.AUTH_TOKEN;
const baseUrl = process.env.BASE_URL;
const host = process.env.OPENSEARCH_URL;
const username = process.env.OPENSEARCH_USER;
const password = process.env.OPENSEARCH_PASSWORD;
const cpn_index = process.env.OPENSEARCH_CPN_INDEX;

if (!authToken) {
  throw new Error("Missing AUTH_TOKEN environment variable.");
} else if (!baseUrl) {
  throw new Error("Missing BASE_URL environment variable.");
} else if (!host) {
  throw new Error("Missing OPENSEARCH_URL environment variable.");
} else if (!username) {
  throw new Error("Missing OPENSEARCH_USER environment variable.");
} else if (!password) {
  throw new Error("Missing OPENSEARCH_PASSWORD environment variable.");
} else if (!cpn_index) {
  throw new Error("Missing OPENSEARCH_CPN_INDEX environment variable.");
}

/** Fetch all partners with pagination. */
export async function getAllPartners() {
  const url = `${baseUrl}api/partners?populate=overview_media&populate=localizations&populate=teaser_media&populate=features.localizations&populate=features.media&populate=tags&populate=quotes.localizations&populate=quotes.profile_picture`;
  const sortField = 'overview_headline';
  return await fetchWithPagination(url, sortField);
}

/** Authenticated GET returning JSON. */
export async function postRequest(url) {
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch API data from the following URI ${url}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/** Iterate all pages until complete. */
export async function fetchWithPagination(url, sortField) {
  let pageCount = 2;
  let i = 1;
  let data = [];
  let totalCount;
  do {
    const localurl = `${url}&sort[0]=${sortField}&pagination[page]=${i}`;
    const response = await postRequest(localurl);
    pageCount = response.meta.pagination.pageCount;
    data = data.concat(response.data);
    totalCount = response.meta.pagination.total;
    i += 1;
  } while (i <= pageCount);

  if (data.length !== totalCount) {
    console.error(`Total queried count differs from actual count for the following URL: ${url}`);
  }
  return data;
}

/** Transform one entry to target doc. */
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

/** Pick localized field or fallback. */
function pickLocalized(obj, field, targetLocale) {
  const loc = (obj.localizations || []).find(l => l.locale === targetLocale);
  if (loc && loc[field] != null && loc[field] !== '') return loc[field];
  return obj[field];
}

/** Transform one entry with localization. */
function transformEntryLocalized(e, targetLocale = 'de-DE') {
  return {
    id: e.id,
    attributes: {
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      publishedAt: e.publishedAt,
      locale: targetLocale,
      partner_id: e.partner_id,
      overview_headline: pickLocalized(e, 'overview_headline', targetLocale),
      overview_description: pickLocalized(e, 'overview_description', targetLocale),
      teaser_description: pickLocalized(e, 'teaser_description', targetLocale),
      teaser_headline: pickLocalized(e, 'teaser_headline', targetLocale),
      overview_product_type: e.overview_product_type,
      overview_company_name: e.overview_company_name,
      overview_website: e.overview_website,
      features: {
        data: (e.features || []).map(f => ({
          id: f.id,
          attributes: {
            description: pickLocalized(f, 'description', targetLocale),
            headline: pickLocalized(f, 'headline', targetLocale),
            createdAt: f.createdAt,
            updatedAt: f.updatedAt,
            publishedAt: f.publishedAt,
            locale: targetLocale
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
            quotation: pickLocalized(q, 'quotation', targetLocale),
            quotation_footer: pickLocalized(q, 'quotation_footer', targetLocale),
            createdAt: q.createdAt,
            updatedAt: q.updatedAt,
            publishedAt: q.publishedAt,
            locale: targetLocale
          }
        }))
      }
    }
  };
}

/** Transform array with localization. */
export function transformEntriesLocalized(sourceArray, targetLocale = 'de-DE') {
  return sourceArray.map(e => transformEntryLocalized(e, targetLocale));
}

/** Transform array (no localization). */
export function transformEntries(sourceArray) {
  return sourceArray.map(transformEntry);
}

/** Build NDJSON bulk body. */
function buildBulkBody(indexName, docs) {
  return docs.flatMap(doc => [
    { index: { _index: indexName, _id: String(doc.id) } },
    doc
  ]);
}

/** Bulk upload with basic item error checks. */
export async function bulkUploadTransformed(indexName, transformedDocs, { refresh = false } = {}) {
  const body = buildBulkBody(indexName, transformedDocs);
  const resp = await client.bulk({ refresh, body });
  if (resp.errors) {
    const items = resp.items || [];
    const failures = items
      .filter(it => it.index && it.index.error)
      .map(it => ({ id: it.index._id, status: it.index.status, error: it.index.error }));
    console.error(`Bulk errors for index ${indexName}:`, failures);
    throw new Error('Failures during Upload to OpenSearch.');
  }
  return resp;
}

/** Delete index if it exists. */
async function deleteIndexIfExists(indexName, client) {
  const exists = await client.indices.exists({ index: indexName });
  const doesExist = exists.body ?? exists;
  if (doesExist) {
    await client.indices.delete({ index: indexName });
  }
}

/** Create empty index if missing (no explicit mappings/settings). */
async function createIndexIfMissing(indexName, client) {
  const exists = await client.indices.exists({ index: indexName });
  const doesExist = exists.body ?? exists;
  if (!doesExist) {
    await client.indices.create({ index: indexName });
  }
}

/** OpenSearch client. */
const client = new Client({
  node: `https://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}`
});

/** Fetch source data. */
const PartnersData = await getAllPartners();

/** Build EN index: delete, create (empty), bulk, refresh. */
const enIndex = cpn_index.concat('-en');
await deleteIndexIfExists(enIndex, client);
await createIndexIfMissing(enIndex, client);
await bulkUploadTransformed(enIndex, transformEntries(PartnersData), { refresh: false });
await client.indices.refresh({ index: enIndex });

/** Build DE index: delete, create (empty), bulk, refresh. */
const deIndex = cpn_index.concat('-de');
await deleteIndexIfExists(deIndex, client);
await createIndexIfMissing(deIndex, client);
const transformedDe = transformEntriesLocalized(PartnersData, 'de-DE');
await bulkUploadTransformed(deIndex, transformedDe, { refresh: false });
await client.indices.refresh({ index: deIndex });
