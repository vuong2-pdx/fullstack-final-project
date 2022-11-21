// Tram Vuong
// The search functionality allows the user to search for movies or TV shows, fetch the information from the APIs, display the information and show which streaming services the user can use to watch it
const axios = require("axios");

const OMDB_API_KEY = "bf001c";

const WATCHMODE_API_KEY = "Q1rDP0sNPTHwHcnxZVhTyMRuDO7tSw7rRgnMUqC3";

const WATCHMODE_BASE_URL = "https://api.watchmode.com/v1";

// URL to hit Watchmode's Search API endpoint
const WATCHMODE_SEARCH_URL = `${WATCHMODE_BASE_URL}/search/?apiKey=${WATCHMODE_API_KEY}`;
const WATCHMODE_NAME_SEARCH = `${WATCHMODE_SEARCH_URL}&search_field=name&search_value=`;

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

const createSourceObject = (source) => {
  let sourceObject = {
    sourceName: source.name,
    sourceUrl: source.web_url
  }
  return sourceObject
};

const getSources = async (title) => {
  let sources = [];
  let sourceObjects = [];
  const response = await axios
    .get(
      `${WATCHMODE_SOURCE_SEARCH_START}${title.id}${WATCHMODE_SOURCE_SEARCH_END}`
    )
    .then((response) => response.data)
    .then((response) => response.map((source) => {

      // check if the sources already has the current source's name since ethe response has duplicates
      // if the source's name already exists, we should not add it to the sourceObjects array
      const hasSourceAlready = sourceObjects.some((item) => item.sourceName === source.name)
      if (!hasSourceAlready) {
        sourceObjects.push(createSourceObject(source))
      }
    }))
    .catch((e) => {
      console.log(`Error while getting sources: ${e}`);
    });

  // copy response array to sources array so we can return it
  sources = sourceObjects.map((x) => x);
  return sources;
};

const renderResults = async (title) => {
  let results = [];

  const nameSearchQuery = title;
  const encodedNameSearchQuery = encodeURIComponent(title);

  const response = await axios
    .get(`${WATCHMODE_NAME_SEARCH}${encodedNameSearchQuery}`)
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

    sourcesResults.forEach((source) => results[i].sources.push({
      sourceName: source.sourceName,
      sourceUrl: source.sourceUrl
    }));
  }
  return results;
};

module.exports = {renderResults};
