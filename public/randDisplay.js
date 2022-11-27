// get the value of the button selected and post it
$('input').on('click', function () {
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
    // dataType: 'json',
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
