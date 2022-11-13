const axios = require('axios')

// The search functionality allows the user to search for movies or TV shows, fetch the information from the APIs, display the information and show which streaming services the user can use to watch it

const nameSearchQuery = 'Stranger Things'
const encodedNameSearchQuery = encodeURIComponent(nameSearchQuery)

const OMDB_API_KEY = 'bf001c'

const WATCHMODE_API_KEY = 'Q1rDP0sNPTHwHcnxZVhTyMRuDO7tSw7rRgnMUqC3'

const WATCHMODE_BASE_URL = 'https://api.watchmode.com/v1'

// URL to hit Watchmode's Search API endpoint
const WATCHMODE_SEARCH_URL = `${WATCHMODE_BASE_URL}/search/?apiKey=${WATCHMODE_API_KEY}`
const WATCHMODE_NAME_SEARCH = `${WATCHMODE_SEARCH_URL}&search_field=name&search_value=${encodedNameSearchQuery}`

// URL to hit Watchmode's Title Sources API endpoint
const WATCHMODE_SOURCE_SEARCH_START = `${WATCHMODE_BASE_URL}/title/`
const WATCHMODE_SOURCE_SEARCH_END = `/sources/?apiKey=${WATCHMODE_API_KEY}`

const formatType = ((type) => {
    return (type === 'tv_series')
        ? 'TV series'
        : 'Movie'
})
const formatTitles = (searchResult) => {
    return {
        name: searchResult.name,
        id: searchResult.id,
        type: formatType(searchResult.type),
        sources: getSources(searchResult.id)
    }
}

const formatSources = (source) => {
    return `Watch on ${source.name} at ${source.web_url}`
}

const getSources = async (id) => {
    let sourcesArray = []

    await axios
    .get(`${WATCHMODE_SOURCE_SEARCH_START}${id}${WATCHMODE_SOURCE_SEARCH_END}`)
    .then((response) => response.data)
    .then((response) => {
        return response.map((source) => formatSources(source))
        // mappedSources?.forEach((source) => sourcesArray.push(source))
    })
    .catch((e) => {
        console.log(`Error while getting sources: ${e}`)
    })
    return sourcesArray ? sourcesArray : []
}

const renderResults = async () => {
    let results = []

    await axios
    .get(WATCHMODE_NAME_SEARCH)
    .then((response) => response.data.title_results)
    .then((response) => {
        const mappedTitles = response.map(formatTitles)
        mappedTitles?.forEach((title) => results.push(title))
    })
    .catch((e) => {
        console.log(`Error while rendering search results: ${e}`)
    })
    console.log(results)
    return results
}

module.exports = { renderResults }
