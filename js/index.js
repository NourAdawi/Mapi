// Dom.js
const searchQuery = document.querySelector(".value_search");
const searchBtn = document.querySelector(".submit_search");

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
    let lat= data[0].lat;
    let lon= data[0].lon;
    console.log(lat, lon);
    
    
  });
});


