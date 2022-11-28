// Tram Vuong
// The search functionality allows the user to search for movies or TV shows, fetch the information from the APIs, display the information and show which streaming services the user can use to watch it
const axios = require("axios");

const nameSearchQuery = "Abbott Elementary";
const encodedNameSearchQuery = encodeURIComponent(nameSearchQuery);

const OMDB_API_KEY = "bf001c";

const WATCHMODE_API_KEY = "hsf4Ve5UGj32ofw8uwFgpme7mqfTGz23sROAUqOg";

const WATCHMODE_BASE_URL = "https://api.watchmode.com/v1";

// URL to hit Watchmode's Search API endpoint
const WATCHMODE_SEARCH_URL = `${WATCHMODE_BASE_URL}/search/?apiKey=${WATCHMODE_API_KEY}`;
const WATCHMODE_NAME_SEARCH = `${WATCHMODE_SEARCH_URL}&search_field=name&search_value=${encodedNameSearchQuery}`;

// URL to hit Watchmode's Title Sources API endpoint
const WATCHMODE_SOURCE_SEARCH_START = `${WATCHMODE_BASE_URL}/title/`;
const WATCHMODE_SOURCE_SEARCH_END = `/sources/?apiKey=${WATCHMODE_API_KEY}`;

const formatType = (type) => {
  return type === "tv_series" ? "TV series" : "Movie";
};
const formatTitles = (searchResult) => {
  return {
    name: searchResult.name,
    id: searchResult.id,
    type: formatType(searchResult.type),
    sources: [],
  };
};

const formatSources = (source) => {
  return `Watch on ${source.name} at ${source.web_url}`;
};

const getSources = async (title) => {
  let sources = [];
  const response = await axios
    .get(
      `${WATCHMODE_SOURCE_SEARCH_START}${title.id}${WATCHMODE_SOURCE_SEARCH_END}`
    )
    .then((response) => response.data)
    .then((response) => response.map((source) => formatSources(source)))
    .catch((e) => {
      console.log(`Error while getting sources: ${e}`);
    });

  // copy response array to sources array so we can return it
  sources = response.map((x) => x);
  return sources;
};

const renderResults = async () => {
  let results = [];

  const response = await axios
    .get(WATCHMODE_NAME_SEARCH)
    .then((response) => response.data.title_results)
    .then((response) => response.map(formatTitles))
    .catch((e) => {
      console.log(`Error while rendering search results: ${e}`);
    });

  // copy response to results
  results = response.map((x) => x);

  // iterate through results and push it onto the current title's sources array
  for (i = 0; i < results.length; i++) {
    let sourcesResults = [];
    const sourcesResponse = await getSources(results[i]);
    sourcesResults = sourcesResponse.map((x) => x);
    sourcesResults.forEach((source) => results[i].sources.push(source));
  }
  return results;
};

module.exports = { renderResults };
