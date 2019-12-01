 
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
var cityTime = $('<span class=city-time>');

cityDetails.append(cityName, cityTime, cityTemp, cityHumid, cityWindSpeed, cityUV);

var fiveDayCityForecast = $('.card-group');

var currentDate = moment().format('MM-DD-YYYY');

//used a default value (Chicago) in the case that the geolocation does not pull latitude and longitude from the user
var startValue = "&lat=41.88&lon=-87.62";
 
 ///////////////////////////////////
 ///////Default Chicago API calls////
 ///////////////////////////////////
 

 //The below will display by default based on Chicago data

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocationInfo);

}

function displayLocationInfo(position) {
  var lng = position.coords.longitude;
  var lat = position.coords.latitude;

  console.log(' latitude: ' + lat + 'longitude: ' + lng);

  //if latitude and longitude was pulled from the user's location set startValue to their details 
  if (lng !== "" && lat !== "") {
    startValue = "&lat=" + lat + "&lon=" + lng;
  }
}

// This is the API key
var APIKey = "&appid=3ccebe214d7b6f05e838f63e5034dcde";

// Set url that will query the database. default is chicago
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
  startValue + "&units=imperial" + APIKey;

var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + startValue + "&units=imperial" + APIKey;

var queryUvURL = "http://api.openweathermap.org/data/2.5/uvi?" + APIKey + startValue;


 //////////////////////////////////
 //When Submit Button Is Clicked///
 //////////////////////////////////

  //when the Submit Button is clicked, run a query that ***adds the city name searched to the 
  var submitBtn = $(".submit-button");

  submitBtn.on("click", searchCity);
        
  //////////////
 //Functions///
 /////////////

  // get the latitude and longitude of the city being searched
  function queryUV () {
          
  //query 
  $.ajax({
  url: queryURL,
  method: "GET"
  })
  
  //Store retrieved data inside response object
  .then(function(response) {

    //pull latitude and longitude from queryURL response object
    var cityLat = response.coord.lat;
    var cityLon = response.coord.lon;

    //add latitude and longitude to the query request the UV index
      queryUvURL = "http://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;

      queryUVValues ();
    
      //close .then function (response) for ajax call
      });
    }

    function searchCity () {

    //clear any existing divs
      fiveDayCityForecast.empty();

    //prevent button from triggering default page refresh
      event.preventDefault();
      var citySearch = $('#search').val();
         
      // var citySearchUV = citySearch.text("&lat=" + response.coord.lat + "&lon=" + response.coord.lon);
            
      queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial" + APIKey;

      queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial" + APIKey;

      queryUV ();
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
       //Store retrieved data inside response object
      .then(function(response) {

        // Transfer content to HTML
        cityName.html("<h1>" + response.name);
        cityWindSpeed.text("Wind Speed: " + response.wind.speed + " MPH");
        cityHumid.text("Humidity: " + response.main.humidity + '%');
        cityTemp.text("Temperature: " + response.main.temp + " " + String.fromCharCode(176) + "F");
        cityTime.text(currentDate);

        // Converts the temp to Kelvin with the below formula
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (Kelvin) " + tempF);
        

      //close .then function (response) for ajax call
      });


      //close runQuery function
    }

//pull UV Value from UV query
function queryUVValues () {

      // Run AJAX call for current UV for city using OpenWeatherMap API
      $.ajax({
        url: queryUvURL,
        method: "GET"
      })
       //Store retrieved data inside response object
      .then(function(response) {

        cityUV.html("UV Index: " + response.value);

      //close .then function (response) for ajax call
      });

}

function runForecastQuery () {

    $.ajax({
      url: queryForecastURL,
      method: "GET"
    })

     //Store retrieved data inside response object
    .then(function(forecast) {
    
    //works when each of the list items contains an i
     for (var i = 1; i < 40; i++) {

      //defining all of the date elements that will be used to match against the forecast object date

      var fromNowDate = moment().add(1, 'days').format('YYYY-MM-DD');
      var fromNowDateTwo = moment().add(2, 'days').format('YYYY-MM-DD');
      var fromNowDateThree = moment().add(3, 'days').format('YYYY-MM-DD');
      var fromNowDateFour = moment().add(4, 'days').format('YYYY-MM-DD');
      var fromNowDateFive = moment().add(5, 'days').format('YYYY-MM-DD');

      var forecastObj = forecast.list[i].dt_txt;
      var forecastDate = forecastObj.split(' ')[0];

      //defining all of the elements that will be created 

      var fiveDayBody = $('<div class=card-body id=five-day>'); 

      var fiveDayTime = $('<div class=card-text id=five-date>');

      var fiveDayTemp = $('<div class=card-text id=five-temp>');

      var fiveDayHumid = $('<div class=card-text id=five-humid>');

      //if date pulled from the forecast object is equal to the next day and a div with a specific day id does not exist, create the forecast card and fill with data from the forecast list
      if (forecastDate === fromNowDate && $('#Day1').length == 0) {

        var fiveDayContainer = $('<div class=card>').attr('id', 'Day1');

        createForecastCard();
      }

      if (forecastDate === fromNowDateTwo && $('#Day2').length == 0) {
        var fiveDayContainer = $('<div class=card>').attr('id', 'Day2');

        createForecastCard();
      }

      if (forecastDate === fromNowDateThree && $('#Day3').length == 0) {
        var fiveDayContainer = $('<div class=card>').attr('id', 'Day3');

        createForecastCard();
      }

      if (forecastDate === fromNowDateFour && $('#Day4').length == 0) {
        var fiveDayContainer = $('<div class=card>').attr('id', 'Day4');

        createForecastCard();
      }

      if (forecastDate === fromNowDateFive && $('#Day5').length == 0) {
        var fiveDayContainer = $('<div class=card>').attr('id', 'Day5');

        createForecastCard();
      }

      function createForecastCard () {
        
        fiveDayTime.html(forecastDate);
        fiveDayTemp.text("Temp: " + forecast.list[i].main.temp + " " + String.fromCharCode(176) + "F" );
        fiveDayHumid.text("Humidity: " + forecast.list[i].main.humidity + "%");
  
        fiveDayCityForecast.append(fiveDayContainer);
        fiveDayContainer.append(fiveDayBody);
        fiveDayBody.append(fiveDayTime, fiveDayTemp, fiveDayHumid);
      }
      // // Converts the temp to Kelvin with the below formula
      // var tempF = (forecast.list[i].main.temp - 273.15) * 1.80 + 32;
      // $(".tempF").text("Temperature (Kelvin) " + tempF);
    }

    //close ajax call
  });

}

//at start, the run ajax call that will display city current details and forecast details
runQuery ();
runForecastQuery ();
queryUVValues ();