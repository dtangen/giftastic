$(document).ready(function() {

//Declaring the initial array
var topics = ["Michael Jordan", "Tom Brady", "Peyton Manning", "LeBron James", "Derek Jeter"];

//The function to create the initial buttons
function createButtons () {

	$("#buttons").empty();

	for (var i = 0; i < topics.length; i++) {

		var athleteButton = $("<button>");

		athleteButton.addClass("athlete");

		athleteButton.attr("data-athlete", topics[i]);

		athleteButton.text(topics[i]);

		$("#buttons").append(athleteButton);

	}
}

createButtons();

function displayAthletes() {
      var athlete = $(this).attr("data-athlete");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        athlete + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    })
    .done(function(response) {
    	var results = response.data;
    	console.log(response);

    	for (var j = 0; j < results.length; j++) {


    		var gifDiv = $("<div class='athleteName'>");
    		var rating = results[j].rating;
    		var gifRating = $("<p>").text("Rating: " + rating);


    		var athleteImage = $("<img class='gif'>");
    		athleteImage.attr("src", results[j].images.fixed_height_still.url);
    		athleteImage.attr("data-still", results[j].images.fixed_height_still.url);
    		athleteImage.attr("data-animate", results[j].images.fixed_height.url);
    		athleteImage.attr("data-state", "still");


    		gifDiv.prepend(gifRating);
    		gifDiv.prepend(athleteImage);
    		$("#athletes").prepend(gifDiv);
    	}

    });

};

$("#add-athlete").on("click", function(event) {
    event.preventDefault();
    var athleteName = $("#athlete-input").val().trim();
    topics.push(athleteName);
    createButtons();
});

$(document).on("click", ".athlete", displayAthletes);

function animateGIF() {

    var state = $(this).find("img").attr("data-state");
      	if (state === "still") {
        	$(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        	$(this).find("img").attr("data-state", "animate");
      	} 			
      	else {
        	$(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        	$(this).find("img").attr("data-state", "still");
      	}
}

$(document).on("click", ".athleteName", animateGIF);

});
