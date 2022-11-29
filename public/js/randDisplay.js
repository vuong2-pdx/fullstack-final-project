// get the value of the button selected and post it
$('input[name=options]').on('click', function () {
  const value = $('input:checked').val();
  // $('#result').html(value + ' is checked');
  $(this).parent().addClass('active'); // set the active state for the selected button
  $(this).parent().siblings().removeClass('active');

  let url = `${window.location.href}/${value}`;
  console.log(url);

  $.ajax({
    type: 'POST',
    url: url,
    data: { type: value },
    success: function (res) {
      console.log('POST success');
      location.reload();
    },
    error: function (err) {
      console.log('error');
      console.log(err);
    },
  });
});

// handle thumbs down bottuns
$('input[name=yesNo]').on('click', function () {
  const value = $('input:checked').val();

  let url = `${window.location.href}/${value}`;
  console.log(url);

  // thunbs down. Refresh the page to get another info
  if (value !== 'yes') {
    $.ajax({
      type: 'POST',
      url: url,
      data: { type: value },
      success: function (res) {
        console.log('POST success');
        location.reload();
      },
      error: function (err) {
        console.log('error');
        console.log(err);
      },
    });
  }
});

$('.back').on('click', function () {
  window.history.back();
});

// handle add to watch list
function addToList(item, sources) {
  // get the url
  let url = `${window.location.href}/add`;
  console.log(url);

  // create object that matches the database schema
  let data = {
    movieID: item.id,
    imdbID: item.imdb_id,
    title: item.title,
    type: item.type,
    year: item.year,
    poster: item.poster,
    rating: item.user_rating,
    plot: item.plot_overview,
    review: '',
    watched: false,
    sources: sources,
  };

  $.ajax({
    type: 'POST',
    url: url,
    data: data,
    success: function () {
      console.log('POST success');
      $('.addToList').prop('disabled', true);
      $('.addToList').text('Added');
    },
    error: function (err) {
      console.log('error');
      console.log(eerr);
    },
  });
}
