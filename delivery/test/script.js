"use strict";

const out = document.querySelector(".out");

const url =
  "https://gist.githubusercontent.com/alex-oleshkevich/1509c308fabab9e104b5190dab99a77b/raw/b20bd8026deec00205a57d395c0ae1f75cc387bb/ua-cities.json";

(async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  const regions = await data[0].regions;
  const regionsCitiesArray = regions.map((element) => element.cities);
  let citiesArr = [];
  regionsCitiesArray.map((element) => {
    for (let i = 0; i < element.length; i++) {
      citiesArr.push(element[i].name);
    }
  });
  createLi(citiesArr);
})();

function createLi(arr) {
  // for (let i = 0; i < arr.length; i++) {
  //   const li = document.createElement("li");
  //   li.textContent = arr[i];
  //   out.append(li);
  // }

  for (const city of arr) {
    const li = document.createElement("li");
    li.textContent = city;
    out.append(li);
  }
}
