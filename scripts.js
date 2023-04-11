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
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
});
