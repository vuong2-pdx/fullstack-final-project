const addToWatchList = (title, index) => {
  const result = document.querySelector(`#add-result-${index}`);

  // hit the WatchList endpoint to add to the database
  axios.post('/WatchList/addToDb', title, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(() => {
    result.style.color = 'green'
    result.textContent = 'Added to watch list'
  })
  .catch(error => {
    result.style.color = 'red'
    result.textContent = 'Try again'
    console.log(`Error while adding title ${title.name} to watch list: ${error}`)
  });
}