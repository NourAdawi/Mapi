const getStartedLocation = (() => {
  navigator.geolocation.getCurrentPosition((xy) => {
    let { latitude, longitude } = xy.coords;
    return latitude, longitude
  });
})(); 
console.log(latitude);


