// Dom.js
const searchQuery = document.querySelector(".value_search");
const searchBtn = document.querySelector(".submit_search");
const frame = document.querySelector(".iframe");
const cityName= document.querySelector(".info_area-state");
const tempertureData = document.querySelector('.info_area_weather-temperture-data')
const weatherDescriptionData = document.querySelector(".info_area_weather-description-data")
const weatherImage = document.querySelector('.info_area_weather-icon-image')



// map location user firest time

const getStartedLocation = (() => {
  navigator.geolocation.getCurrentPosition((xy) => {
    let { latitude, longitude } = xy.coords;
    let url= `https://nominatim.openstreetmap.org/search.php?q=${latitude},${longitude}&format=jsonv2`;
    sendMap(latitude, longitude);
    getWeather(latitude, longitude);
    getRequest(url, (data)=> {
      const cityAndCountry = data[0].display_name.split(' ');
      cityName.textContent= `${cityAndCountry[0]},${cityAndCountry[1]}`;
      
    })
  });
})();
// logic.js

const getRequest = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      cb(JSON.parse(xhr.responseText));
    }
  };
  xhr.open("GET", url);
  xhr.send();
};

// index

searchBtn.addEventListener("click", () => {
  let query = searchQuery.value;
  let url = `https://nominatim.openstreetmap.org/search.php?q=${query}&format=jsonv2`;
  getRequest(url, (data) => {
    let lat = data[0].lat;
    let lon = data[0].lon;
    lat.toString()
    lon.toString()

    sendMap(lat, lon);
    getWeather(lat, lon);
    const cityAndCountry = data[0].display_name.split(' ');
    if(cityAndCountry.length >= 3){
        cityName.textContent= `${cityAndCountry[0]} ${cityAndCountry[1]} ${cityAndCountry[2]}`;
      }else{
        cityName.textContent= cityAndCountry[0];
      }
  });
});

// to select x,y and send
function sendMap(latitude, longitude) {
  frame.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=14&amp&output=embed`;
}

function getWeather(x, y) {
  getRequest(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${x}&lon=${y}&units=metric&exclude=minutely,hourly,daily&appid=c43c24139452b883e9e837d96c4f3fe2`,
    (data) => {
      const tmepertureValue = parseInt(data.current.temp);
      const weatherStatus = data.current.weather[0].main;
      tempertureData.textContent = `${tmepertureValue} C`;
      weatherDescriptionData.textContent = `${weatherStatus}`;
      weatherImage.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
      
    }
  );
}
