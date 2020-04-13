var topics = ["banana", "apple", "peach", "pear", "kiwi", "grape", "orange",
              "plantain", "raspberry", "blueberry", "chocolate", "strawberry",
              "french silk pie", "papaya", "white claw", "lacroix", "pizza",
              "sweet potato", "baja blast", "taco bell", "watermelon"]

// For each string in topics array, call function to create button and add it to buttons div
for (var i=0; i < topics.length; i++) {
    createButton(topics[i]);
}

// When the Submit button is clicked, add the topic in the form field to the array of buttons
$("#submit-button").on("click", function(event) {

    // Prevent page from refreshing upon button click
    event.preventDefault();

    // Call function to create button and add it to buttons div
    createButton($("#topic-search").val());
});

// Add a button to the buttons div
function createButton(topic) {
    $("#buttons").append("<button type='button' class='btn btn-info food-button' id='" + topic + "'>" + topic + "</button>");
}

// When a food button is clicked, call the Giphy API and search for gifs using the button id as the search query
$(document).on("click", ".food-button", function() {

    // Prevent page from refreshing upon button click
    event.preventDefault();
    
    // Clear gifs div
    $("#gifs").text("");

    // Create the url to use for the Giphy API call using the button id as the search query
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=scg3lg7S0jY6WEdDMnDymRFBHblIReU8&q=" + this.id + "&limit=10";

    // Giphy API call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        // Store the array of data from the Giphy API call resposne
        var gifs = response.data;

        // Loop through the array and add the images to the page
        for (var i=0; i < gifs.length; i++) {

            // Grab data from Giphy API call response
            var stillURL = response.data[i].images.fixed_width_still.url;
            var animateURL = response.data[i].images.fixed_width.url;
            var rating = response.data[i].rating;

            // Create div to hold rating + gif
            var gifContainer = $("<div class='gif-container'>");

            // Append gif rating to div
            gifContainer.append("<p class='rating'>Rating: " + rating + "</p>");

            // Append gif to div
            // Make sure still version, animated version, and state of image are stored as attributes
            gifContainer.append("<img class='food-pic' src='" + stillURL + "' data-still='" + stillURL + "' data-animate='" + animateURL + "' data-state='still'>")

            // Add div to gifs div in html
            $("#gifs").append(gifContainer);
        }

        // When an image is clicked, call function to either animate or make still
        $(".food-pic").on("click", function() {
            changeImage(this);
        });

    });
});

// When an image is clicked, display animated version if currently still or still version if currently animated
function changeImage(image) {
    var state = $(image).attr("data-state");

    if (state === "still") {
        $(image).attr("src", $(image).attr("data-animate"));
        $(image).attr("data-state", "animate");
    } else {
        $(image).attr("src", $(image).attr("data-still"));
        $(image).attr("data-state", "still");
    }
};
