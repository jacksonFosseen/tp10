//wait for DOM

document.addEventListener("DOMContentLoaded", function () {
  //load API
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c9012d3527mshd741f158218a534p1f22bejsn8fe9722aeb81",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
    }
  };

  fetch("https://weatherapi-com.p.rapidapi.com/current.json?q=99163", options)
    .then(response => response.json())
    .then(function(response) {
        document.querySelector("#location span").innerHTML = response.location.name;
        document.querySelector("#tempF span").innerHTML = response.current.temp_f;
        document.querySelector("#tempC span").innerHTML = response.current.temp_c;
        document.querySelector("#winDir span").innerHTML = response.current.wind_dir;
        document.querySelector("#winSpeed span").innerHTML = response.current.wind_mph;
        document.querySelector("#cloud span").innerHTML = response.current.cloud;
        document.querySelector("#humidity span").innerHTML = response.current.humidity;
        console.log(response);
        return response;
    })
    .catch((err) => console.error(err));
});

