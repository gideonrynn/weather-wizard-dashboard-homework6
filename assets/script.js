 
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
var cityName = $('<h5 class=city-name></h5>');
var cityTemp = $('<div class=temp>');
var cityHumid = $('<div class=humidity>');
var cityWindSpeed = $('<div class=wind-speed>');
var cityUV = $('<div class=uv-index>');
var citySearchUV = "";

cityDetails.append(cityName, cityTemp, cityHumid, cityWindSpeed, cityUV);


var fiveDayCityForecast = $('.card-group');


 
 ///////////////////
 ///////API calls////
 ///////////////////
 
 //The below will display by default based on Chicago data
 // This is our API key
    var APIKey = "&appid=3ccebe214d7b6f05e838f63e5034dcde";

    // Set url that will query the database. default is chicago
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      "Chicago" + "&units=imperial" + APIKey;

    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + "Chicago" + "&units=imperial" + APIKey;

    var queryUvURL = "http://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=37.75&lon=-122.37";


      // cityUV.text("UV Index " + response.)

      var cityLat = "";
      var cityLon = "";

        //when the Submit Button is clicked, run a query that ***adds the city name searched to the 
        var submitBtn = $(".submit-button");

        submitBtn.on("click", searchCity);
        
        // get the latitude and longitude of the city being searched
        function getLatLon () {
          
          $.ajax({
            url: queryURL,
            method: "GET"
          })
          // We store all of the retrieved data inside of an object called "response"
          .then(function(response) {
    
            console.log(response);

            cityLat = response.coord.lat;
            cityLon = response.coord.lon;

            console.log("City Latitude = " + cityLat);
            console.log("City Longitude = " + cityLon);
    
          //close .then function (response) for ajax call
          });
        }

        function searchCity () {

          fiveDayCityForecast.empty();

          //prevent button from triggering default page refresh
          event.preventDefault();
          var citySearch = $('#search').val();
         
          // var citySearchUV = citySearch.text("&lat=" + response.coord.lat + "&lon=" + response.coord.lon);
            

            queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            citySearch + "&units=imperial" + APIKey;

            queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial" + APIKey;

            getLatLon ();

            queryUvURL = "http://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;

            runQuery ();
            runForecastQuery ();

            $('.list-group').append('<li class=list-group-item>' + citySearch + '</li>');


        }

    //create function that will run ajax call and update city details
    function runQuery () {

      // Run AJAX call for current weather for city using OpenWeatherMap API
      $.ajax({
      url: queryURL,
      method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Transfer content to HTML
        cityName.html("<h1>" + response.name);
        cityWindSpeed.text("Wind Speed: " + response.wind.speed + " MPH");
        cityHumid.text("Humidity: " + response.main.humidity + '%');
        cityTemp.text("Temperature: " + response.main.temp + " " + String.fromCharCode(176) + "F");

        // Converts the temp to Kelvin with the below formula
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (Kelvin) " + tempF);

      //close .then function (response) for ajax call
      });

      // Run AJAX call for current UV for city using OpenWeatherMap API
      $.ajax({
        url: queryUvURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        cityUV.html("UV Index: " + response.value);

      //close .then function (response) for ajax call
      });

      //close runQuery function
    }


function runForecastQuery () {

    $.ajax({
      url: queryForecastURL,
      method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(forecast) {

      //works when each of the list items contains an i, along with container and variables - also 
     for (var i = 0; i < 5; i++) {
      var fiveDayContainer = $('<div class=card>');

      var fiveDayBody = $('<div class=card-body id=five-day>'); 

      var fiveDayTime = $('<div class=card-text id=five-date>');

      var fiveDayTemp = $('<div class=card-text id=five-temp>');

      var fiveDayHumid = $('<div class=card-text id=five-humid>');

      // Transfer data pulled from forecast API into div
      fiveDayTime.html(forecast.list[i].dt_txt);
      fiveDayTemp.text("Temperature (F) " + forecast.list[i].main.temp);
      fiveDayHumid.text("Humidity: " + forecast.list[i].main.humidity + "%");

      fiveDayCityForecast.append(fiveDayContainer);
      fiveDayContainer.append(fiveDayBody);
      fiveDayBody.append(fiveDayTime, fiveDayTemp, fiveDayHumid);

      // // Converts the temp to Kelvin with the below formula
      // var tempF = (forecast.list[i].main.temp - 273.15) * 1.80 + 32;
      // $(".tempF").text("Temperature (Kelvin) " + tempF);
    }

    //close ajax call
  });

  //**may eventually add UV to each of the cards**
  //   $.ajax({
  //     url: queryForecastURL,
  //     method: "GET"
  //   })
  //   // We store all of the retrieved data inside of an object called "response"
  //   .then(function(forecast) {

  //     var fiveDayContainer = $('<div class=card>').append('<div class=card-body');

  //  });

}


//at start, the run ajax call that will display city current details and forecast details
runQuery ();
runForecastQuery ();
