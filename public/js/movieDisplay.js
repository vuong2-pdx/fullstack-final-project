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
      data = { watched: false };
    } else if ($(this).val() === "not-watched") {
      data = { watched: true };
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

//Handle review edit click event
$(document).ready(function () {
  $("#edit-container input:radio").click(function () {
    const oldReview = $("#review-text").text();

    $("#review-container").replaceWith(
      $(`<form id="review-form">
          <div>
            <label for="review-text"> Edit Your Review </label>
            <textarea class="form-control" id="review-text"> ${oldReview}</textarea>
          </div>
          <button class="btn btn-primary mt-3" type="submit id="submit"> Submit</button>
         </form>`)
    );

    $("form").submit(function (event) {
      let url = window.location.href + "/review";
      const textval = $("textarea").val();
      let data = { review: textval };

      $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "json",
        success: (data) => {
          console.log("POST success");
          location.reload();
        },
        error: (error) => {
          console.log("POST ERROR");
          console.log(error);
        },
      });

      event.preventDefault();
    });
  });
});

//Handle Delete Event
$(document).ready(function () {
  $("#delete").click(function () {
    let url = window.location.href + "/delete";
    $.ajax({
      type: "POST",
      url: url,
      success: (data) => {
        console.log("POST success");
        window.location.href = url;
      },
      error: (error) => {
        console.log(error);
      },
    });
  });
});
