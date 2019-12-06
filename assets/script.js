 
 //////////////////////
 //Creating elements//
 /////////////////////

var cityDetails = $('.city-details');
var cityIconDetails = $('.icon-details');

//create variables for primary city display divs and append to 
var cityName = $('<h5 class=city-name></h5>');
var cityTemp = $('<div class=temp>');
var cityHumid = $('<div class=humidity>');
var cityWindSpeed = $('<div class=wind-speed>');
var cityUV = $('<div class=uv-index>');
var cityTime = $('<span class=city-time>');
var cityIcon = $('<img class=city-icon>');

cityDetails.append(cityName, cityTime, cityIcon, cityTemp, cityHumid, cityWindSpeed, cityUV);

//set var for div into which forecast cards and details will be pulled
var fiveDayCityForecast = $('.card-group');

var currentDate = moment().format('MM-DD-YYYY');


 ///////////////////////////////////
 ///Startup API queries and info////
 ///////////////////////////////////

 

 // This is my API key/parameter
 var APIKey = "&appid=3ccebe214d7b6f05e838f63e5034dcde";

 //This variable will contain the user input and starts off as empty
 var citySearch = "";

 console.log(citySearch == "");

//  if (citySearch == "") {


 //////////////////////////////////
 //When Submit Button Is Clicked///
 //////////////////////////////////

  //when the Submit Button is clicked, run a query that ***adds the city name searched to the 
  var submitBtn = $(".submit-button");

  submitBtn.on("click", function (event) {
    //prevent button from triggering default page refresh
    event.preventDefault();

    citySearch = $('#search').val();
    searchCity ();
    $('.list-group').append('<li class=list-group-item>' + '<a href=#>' + citySearch + '</a>' + '</li>');
    addInputArray ();
  });

  // does not work currently - meant to grab the value of the div and pull into the citySearch variable to run the searchCity function
  $('li').on("click", function () {
    citySearch = $(this).val();
    console.log(citySearch);
    searchCity ();
  })
        
  //////////////
 //Functions///
 /////////////

    function searchCity () {

      //clear any existing divs
      fiveDayCityForecast.empty();

      //set value of queryURL 
      queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial" + APIKey;

      queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial" + APIKey;

      queryUV ();
      runQuery ();
      runForecastQuery ();

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

        console.log(response);
        // Transfer content to HTML
        cityName.html("<h1>" + response.name);
        cityWindSpeed.text("Wind Speed: " + response.wind.speed + " MPH");
        cityHumid.text("Humidity: " + response.main.humidity + '%');
        cityTemp.text("Temperature: " + response.main.temp + " " + String.fromCharCode(176) + "F");
        cityTime.text(currentDate);
        cityIcon.attr('src', "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");

      //close .then function (response) for ajax call
      });


      //close runQuery function
    }

    
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
  
      //add latitude and longitude to the query request for the UV index info
        queryUvURL = "https://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;
  
        queryUVValues ();
      
        //close .then function (response) for ajax call
        });
  
        //close queryUV
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

      var fiveDayIcon = $('<img class=five-icon>');

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
        fiveDayIcon.attr('src', "https://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + ".png");

  
        fiveDayCityForecast.append(fiveDayContainer);
        fiveDayContainer.append(fiveDayBody);
        fiveDayBody.append(fiveDayTime, fiveDayTemp, fiveDayIcon, fiveDayHumid);


        }
      }

    //close ajax call
      });
    }


 //////////////////
 ///Local Storage///
 /////////////////

var cityList = [];

console.log(cityList);

//on click, run function which processes through each text area, grabs the value, and pushes it to the array
function addInputArray () {

  if (cityList === null) {
    cityList = [];
  }
  
  //for each value entered in the search,
  $("#search").each( function() {

     var cityNameSearched = $(this).val();

     cityList.push({input: cityNameSearched});

  })

  //run saveToLocal function below
  saveToLocalStorage();

}

//save list of inputs to localStorage
function saveToLocalStorage () {     

  var str = JSON.stringify(cityList);

  localStorage.setItem('cityList', str);
  
}

//pull all items from local storage to display user appointment inputs at startup
function getFromLocal () {

  cityList = JSON.parse(localStorage.getItem('cityList'));


  if (cityList !== "" && cityList !== null) {

    for (var i = 0; i < cityList.length; i++) {

      var cities = cityList;
      console.log(cities);
      
      li = $('<li class=list-group-item>' + '<a href=#>' + cities[i].input + '</a>' + '</li>');
      $(".list-group").append(li);

    }
    
    //get value of last city searched by user in the cityList array, so that it will be displayed on the homepage by default
    var lastCitySearch = cityList[cityList.length - 1];
    citySearch = Object.values(lastCitySearch);
    console.log(citySearch);

    searchCity ();

  }

  else {
    citySearch = "Chicago";

    searchCity ();
  }

}

//at start, the run ajax call that will display city current details and forecast details
getFromLocal ();

