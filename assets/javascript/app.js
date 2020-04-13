var topics = ["banana", "apple", "peach", "pear", "kiwi", "grape", "orange",
              "plantain", "raspberry", "blueberry", "chocolate", "strawberry",
              "french silk pie", "papaya", "white claw", "lacroix", "pizza",
              "sweet potato", "baja blast", "taco bell", "watermelon"]

// Add food buttons to page
for (var i=0; i < topics.length; i++) {
    $("#buttons").append("<button type='button' class='btn btn-info food-button' id='" + topics[i] + "'>" + topics[i] + "</button>");
}

// When a food button is clicked, call the Giphy API and search for gifs using the button id as the search query
$(".food-button").on("click", function() {
    
    // Clear gifs div
    $("#gifs").text("");

    // Create the url to use for the Giphy API call using the button id as the search query
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=scg3lg7S0jY6WEdDMnDymRFBHblIReU8&q=" + this.id + "&limit=10&rating=r";

    // Giphy API call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.data[0].images.fixed_height_still.url);
        console.log(response);

        // Store the array of data from the Giphy API call resposne
        var gifs = response.data;

        // Loop through the array and add the images to the page
        for (var i=0; i < gifs.length; i++) {
            var stillURL = response.data[i].images.fixed_width_still.url;
            var animateURL = response.data[i].images.fixed_width.url;

            // Add images to gifs div
            // Make sure still version, animated version, and state of image are stored as attributes
            $("#gifs").append("<img class='food-pic' src='" + stillURL + "' data-still='" + stillURL + "' data-animate='" + animateURL + "' data-state='still'>");
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
