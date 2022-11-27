const result = document.querySelector("#resultText");

const addToWatchList = (title) => {
  console.log("i'm in the event listener")

  let titleSchemaObj = {
    movieID: title.id,
    imdbID: title.imdbId,
    title: title.name,
    type: title.type,
    year: title.year,
    poster: title.poster,
    rating: 0,
    plot: title.plot,
    review: '',
    watched: false,
    sources: []
  }

  title.sources.forEach((source) => titleSchemaObj.sources.push({
    sourceName: source.sourceName,
    sourceUrl: source.sourceUrl
  }))

  axios.post('/WatchList/addToDb', titleSchemaObj, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
  .then(() => {
    result.style.color = "green";
    result.textContent = "Added."
  })
  .catch(error => console.log(error)
  );
}