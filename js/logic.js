// make XML request
const getRequest = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        cb(JSON.parse(xhr.responseText));
      } else {
        tempertureData.textContent = "-";
        weatherDescriptionData.textContent = "-";
        cityName.textContent = "No such location";
        photoText.remove();
        weatherImage.remove();
        main_img_top.src =
          "https://www.easyredir.com/images/blog/error-404-not-found.c106c575e85509b926855247b4b7f50514f0297d2c350ecee9bc93f04914f9d3.jpg";
      }
    }
  };
  xhr.open("GET", url);
  xhr.send();
};

// remove content
function removeChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// get a set of image for the searched location from (unsplash) API
function getImg(query) {
  let url = `https://api.unsplash.com/search/photos?query=${query}&client_id=WC50gXbaEOyoD0ivn2KKie6Zi92i4yqvzKxDJxVgUqs`;
  getRequest(url, (data) => {
    main_img_top.src = data.results[0].urls.regular;
    removeChild(container_imgs);
    for (let i = 1; i < 10; i++) {
      let img = document.createElement("img");
      img.src = data.results[i].urls.regular;
      container_imgs.appendChild(img);
    }
  });
}

// view the searched location on the map
function sendMap(latitude, longitude) {
  frame.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=14&amp&output=embed`;
}

//get weather information for the searched location from (openweathermap) API
function getWeather(x, y) {
  getRequest(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${x}&lon=${y}&units=metric&exclude=minutely,hourly,daily&appid=c43c24139452b883e9e837d96c4f3fe2`,
    (data) => {
      const tmepertureValue = parseInt(data.current.temp);
      const weatherStatus = data.current.weather[0].main;
      tempertureData.textContent = `${tmepertureValue} C`;
      weatherDescriptionData.textContent = `${weatherStatus}`;
      weatherImage.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
      getImg(data.timezone.split("/")[1]);
    }
  );
}

// get  current location and view it as a default location
const getStartedLocation = (() => {
  navigator.geolocation.getCurrentPosition((xy) => {
    let { latitude, longitude } = xy.coords;
    let url = `https://nominatim.openstreetmap.org/search.php?q=${latitude},${longitude}&format=jsonv2`;
    sendMap(latitude, longitude);
    getWeather(latitude, longitude);
    getRequest(url, (data) => {
      const cityAndCountry = data[0].display_name.split(" ");
      cityName.textContent = `${cityAndCountry[0]},${cityAndCountry[1]}`;
      photoText.textContent = `Photos from ${cityAndCountry[0]},${cityAndCountry[1]}`;
    });
  });
})();
