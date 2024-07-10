const apiKey = "863242cfb2b1d357e6093d9a4df19a4b";
let city = document.querySelector(".ipt");
let btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=ede6f945961549df92a12422240807&q= ${city.value}`;
  api(apiUrl);
});

async function api(apiUrl) {
  let response = await fetch(apiUrl);
  if (response.status == 400) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".weather").style.display = "block";

    let data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.current.temp_c
    )}°C`;
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";
    let img = document.querySelector(".img");
    if (
      data.current.condition.text == "Clear" ||
      data.current.condition.text == "Sunny"
    ) {
      img.src = "/images/clear.png";
    } else if (data.current.condition.text == "Partly cloudy") {
      img.src = "/images/clouds.png";
    } else if (data.current.condition.text == "Rain") {
      img.src = "/images/rain.png";
    } else if (
      data.current.condition.text == "Light rain shower" ||
      data.current.condition.text == "Patchy light rain" ||
      data.current.condition.text == "Light rain" ||
      data.current.condition.text == "Patchy rain nearby" ||
      data.current.condition.text == "Patchy light rain with thunder"
    ) {
      img.src = "/images/drizzle.png";
    } else if (data.current.condition.text == "Mist") {
      img.src = "/images/mist.png";
    }
  }
}
