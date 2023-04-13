// cookie functions
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//fetch geolocation data from ipfindAPI
function getLocation() {
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c9012d3527mshd741f158218a534p1f22bejsn8fe9722aeb81',
		'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
	}
};

fetch('https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation?apikey=873dbe322aea47f89dcf729dcc8f60e8', options)
	.then(response => response.json())
	.then(function(response) {
	    console.log(response);
	    
	    //create location search text
	    let geolocation = response.latitude + "," + response.longitude;
	    getWeather(geolocation);
	    
	    return response;
	})
	.catch(err => console.error(err));
}


//fetch weather report from weatherAPI
function getWeather(locationSearch) {
    
      //load API
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c9012d3527mshd741f158218a534p1f22bejsn8fe9722aeb81",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
    }
  };
  
  //set default api location string
  let apiLocation = "https://weatherapi-com.p.rapidapi.com/current.json?q=" + locationSearch;
  
  console.log("API URL: " + apiLocation);

  //get weather data
  fetch(apiLocation, options)
    .then(function(response) {
        return response.json(); //convert to JSON and return
    })
    .then(function(response) {
        console.log(response);
        
        //update page elements with object oproperties
        document.querySelector("#location span").innerHTML = response.location.name;
        document.querySelector("#tempF span").innerHTML = response.current.temp_f;
        document.querySelector("#tempC span").innerHTML = response.current.temp_c;
        document.querySelector("#winDir span").innerHTML = response.current.wind_dir;
        document.querySelector("#winSpeed span").innerHTML = response.current.wind_mph;
        document.querySelector("#cloud span").innerHTML = response.current.cloud;
        document.querySelector("#humidity span").innerHTML = response.current.humidity;
    })
    .catch(err => console.error(err))

}

//wait for DOM
document.addEventListener("DOMContentLoaded", function () {
    
    //check for previously searched location
    let priorPlace = getCookie("place");
    // if no previous search, get location, othervise get previous cookie data
    if (priorPlace == "") {
        getLocation();
    } else {
        getWeather(priorPlace);
    }
   
    let myForm = document.forms[0];
    myForm.addEventListener("submit", function(event) {
        //stop form submission
        event.preventDefault();
        
        //get value of search box input
        let searchText = document.querySelector("#placeSearch").value;
        console.log(searchText);
        
        //send weather search text to getWeather api function 
        getWeather(searchText);
        
        setCookie("place", searchText, 7);
    });
    
});

