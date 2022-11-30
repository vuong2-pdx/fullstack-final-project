<<<<<<< HEAD
<<<<<<< HEAD
// Cheng Lin @cchlin

=======
>>>>>>> 060a68c (like/dislike buttons properly renered. Liked page with trailer embed.)
=======
// Cheng Lin @cchlin

>>>>>>> 456b1a4 (about page)
// get the value of the button selected and post it
$('input[name=options]').on('click', function () {
  const value = $('input:checked').val();
  // $('#result').html(value + ' is checked');
  $(this).parent().addClass('active'); // set the active state for the selected button
<<<<<<< HEAD
<<<<<<< HEAD
  $(this).parent().siblings().removeClass('active'); // deactive other buttons so there's only one button remain active
=======
  $(this).parent().siblings().removeClass('active');
>>>>>>> 060a68c (like/dislike buttons properly renered. Liked page with trailer embed.)
=======
  $(this).parent().siblings().removeClass('active'); // deactive other buttons so there's only one button remain active
>>>>>>> 456b1a4 (about page)

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

<<<<<<< HEAD
<<<<<<< HEAD
// handle thumbs down bottuns
$('input[name=yesNo]').on('click', function () {
  const value = $('input:checked').val();
=======
$('input[name=yesNo]').on('click', function () {
  const value = $('input:checked').val();
  console.log(value);
>>>>>>> 060a68c (like/dislike buttons properly renered. Liked page with trailer embed.)
=======
// handle thumbs down bottuns
$('input[name=yesNo]').on('click', function () {
  const value = $('input:checked').val();
>>>>>>> 0920174 (randomize all done)

  let url = `${window.location.href}/${value}`;
  console.log(url);

<<<<<<< HEAD
<<<<<<< HEAD
  // thunbs down. Refresh the page to get another info
=======
>>>>>>> 060a68c (like/dislike buttons properly renered. Liked page with trailer embed.)
=======
  // thunbs down. Refresh the page to get another info
>>>>>>> 0920174 (randomize all done)
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
<<<<<<< HEAD
<<<<<<< HEAD
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
      $('.addToList').prop('disabled', true); // set the property to true to disable the button
      $('.addToList').text('Added'); // modify the text of the button
    },
    error: function (err) {
      console.log('error');
      console.log(eerr);
    },
  });
}
=======
  console.log('button clicked');
  window.history.back();
});
>>>>>>> 060a68c (like/dislike buttons properly renered. Liked page with trailer embed.)
=======
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
      $('.addToList').prop('disabled', true); // set the property to true to disable the button
      $('.addToList').text('Added'); // modify the text of the button
    },
    error: function (err) {
      console.log('error');
      console.log(eerr);
    },
  });
}
>>>>>>> 53d160f (randomize result page done)
