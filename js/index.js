// Dom.js
const searchQuery = document.querySelector(".value_search");
const searchBtn = document.querySelector(".submit_search");
const frame = document.querySelector(".iframe");
const cityName = document.querySelector(".info_area-state");

// defult location
const getStartedLocation = (() => {
  navigator.geolocation.getCurrentPosition((xy) => {
    let { latitude, longitude } = xy.coords;
    let url = `https://nominatim.openstreetmap.org/search.php?q=${latitude},${longitude}&format=jsonv2`;
    sendMap(latitude, longitude);
    getWeather(latitude, longitude);
    getRequest(url, (data) => {
      cityName.textContent = data[0].display_name;
    });
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
    sendMap(lat, lon);
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
      return;
    }
  );
}
