// Viktoriya Petrova @ViktoriyaPetrova
// Script to handle events for movieDisplay.pug

//Handle star rating click event
$(document).ready(function () {
  $("#rating-container input:radio").click(function () {
    let url = window.location.href + "/rating";
    let data;
    if ($(this).val() === "star1") {
      data = { star: "1" };
    } else if ($(this).val() === "star2") {
      data = { star: "2" };
    } else if ($(this).val() === "star3") {
      data = { star: "3" };
    } else if ($(this).val() === "star4") {
      data = { star: "4" };
    } else if ($(this).val() === "star5") {
      data = { star: "5" };
    }

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: "json",
      success: (data) => {
        $("header").append(
          $(`<div class='alert alert-success' role='alert'>
          Rating updated</div>`)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  });
});

//Handle Watched click event
$(document).ready(function () {
  $("#watched-container button").click(function () {
    let url = window.location.href + "/watched";
    let data;
    if ($(this).val() === "watched") {
      data = { watched: "watched" };
    } else if ($(this).val() === "not-watched") {
      data = { watched: "not watched" };
    }

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: "json",
      success: (data) => {
        $(this).toggleClass("btn-success btn-warning");
        if ($(this).hasClass("btn-success")) {
          $(this).text("Watched");
        } else {
          $(this).text("Not watched");
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  });
});
