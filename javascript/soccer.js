
//Create Array of players//
var soccerArray = ["Diego Maradona", "Cristiano Ronaldo", "Gareth Bale", "Leo Messi", "George Best", "Eusebio", "Hristo Stoichkov", "Joyan Cruyff"];


//Create buttons for the players by looping through and generating for each soccer player
$(document).ready(function() {
    for (var i = 0; i < soccerArray.length; i++) {
        $("#soccer-buttons").append("<button type='button' onclick='searchGif(\"" + soccerArray[i] + "\")' class='btn btn-primary' value=' " + soccerArray[i] + "'> " + soccerArray[i] + " </button>");
    }
});
//Code for listening to click on soccer player
function soccerButtonClicked() {
    var userInput = $('#soccer-input').val();
    searchGif(userInput);
}

//When user types in a new player add the footballer to the list
function submitButtonClicked() {
    var userInput = $('#player-input').val();

    if (userInput) {
        $('#soccer-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

//API call to server obtain data
function searchGif(soName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + soName + ' &api_key=d1adb50350fa4cd88de665ff7737c72e',
            method: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

//Add the ratings to the gifs pulled keeps height fixed when still or animated//
function displayGif(response) {
    $('#footballer').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:220px; height:220px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#footballer').append(image);
    }
//Create static and animated objects when clicks on players//
    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}