 
 /////////////////////
 //Creating elements//
 ////////////////////
 
 //set var for Search for a City label text
//  var searchLabelDiv = "<label class=m-6 style=font-weight:bold>" + "Search for a City" + '</label>';

 //create search input with search icon to append to under label in sidebar
//  var searchInputDiv = $('.search-button-group').append('<input class=form-control type=search id=search>');

//  var searchInputButton = $('.search-button-group').append('<button class=btn btn-primary submit-button type=submit>' + '<span class=fas fa-search-location form-control-feedback>' + '</span>');
 

//  $('.sidebar').append(searchLabelDiv);
//  $('.search-button-group').append(searchInputDiv, searchInputButton);

var cityDetails = $('.city-details');
console.log(cityDetails)
var cityName = $('<h5 class=city-name></h5>');
console.log(cityName);
var cityTemp = $('<div class=temp>');
var cityHumid = $('<div class=humidity>');
var cityWindSpeed = $('<div class=wind-speed>');
var cityUV = $('<div class=uv-index>');

cityDetails.append(cityName, cityTemp, cityHumid, cityWindSpeed, cityUV);
 
 ///////////////////
 ///////API calls////
 ///////////////////
 
 //The below will display by default based on Chicago data
 // This is our API key
    var APIKey = "3ccebe214d7b6f05e838f63e5034dcde";

    // Set url that will query the database. default is chicago
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      "Chicago" + "&units=imperial&appid=" + APIKey;


    //create function that will run ajax call and update city details
    function runQuery () {

    // Here we run our AJAX call to the OpenWeatherMap API (defined by queryURL)
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Transfer content to HTML
        cityName.html("<h1>" + response.name);
        cityWindSpeed.text("Wind Speed: " + response.wind.speed);
        cityHumid.text("Humidity: " + response.main.humidity);
        cityTemp.text("Temperature (F) " + response.main.temp);

        // Converts the temp to Kelvin with the below formula
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (Kelvin) " + tempF);

    });

}

        // cityUV.text("UV Index " + response.)

        //when the Submit Button is clicked, run a query that ***adds the city name searched to the 
        var submitBtn = $(".submit-button");
        submitBtn.on("click", searchCity);

        function searchCity () {
          
            var citySearch = $('#search').val();
            console.log(citySearch);

            queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            citySearch + "&units=imperial&appid=" + APIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
              })
                // We store all of the retrieved data inside of an object called "response"
                .then(function(response) {


            // Transfer content to HTML
            cityName.html("<h1>" + response.name);
            cityWindSpeed.text("Wind Speed: " + response.wind.speed);
            cityHumid.text("Humidity: " + response.main.humidity);
            cityTemp.text("Temperature (F) " + response.main.temp);


            // Converts the temp to Kelvin with the below formula
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".tempF").text("Temperature (Kelvin) " + tempF);
           
            $('.list-group').append('<li class=list-group-item>' + citySearch + '</li>');

        }
    )};

//at start, the run ajax call that will display city details
runQuery ();