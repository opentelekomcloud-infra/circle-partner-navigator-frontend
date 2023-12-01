const authToken = process.env.AUTH_TOKEN

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