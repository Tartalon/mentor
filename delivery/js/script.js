"use strict";

const citiesList = document.querySelector(".cities__list");
const citiesInput = document.querySelector(".cities__input");
const dropdownButton = document.querySelector(".dropdown__button");
const citiesListWrapper = document.querySelector(".cities__list-wrapper");
const cargoInputs = document.querySelector(".cargo__inputs");
const cargoWidthInp = document.querySelector("#CargoWidth");
const cargoHightInp = document.querySelector("#CargoHight");
const cargoHightRange = document.querySelector(".hight__range");
const cargoWidthRange = document.querySelector(".width__range");
const cargoDrawing = document.querySelector(".cargo__drawing");
const cargoWeight = document.querySelector(".cargo__weight");

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
  for (const city of arr) {
    const li = document.createElement("li");
    li.classList.add("cities__item");
    li.textContent = city;
    citiesList.append(li);
  }
}

// const url =
//   "http://geohelper.info/api/v1/countries?apiKey=JT4TwHR95h6PpzjwXhbfwBPmffpeKSFY&locale%5Blang%5D=uk&locale%5BfallbackLang%5D=ua";

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     let citiesArray = data.result.map((element) => {
//       return {
//         name: element.name,
//       };
//     });
//     getCitiesList(citiesArray);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

dropdownButton.addEventListener("click", function () {
  citiesListWrapper.classList.toggle("hidden");
});

cargoInputs.addEventListener("input", function (e) {
  let target = e.target;
  let inputWidth = cargoWidthInp.value;
  let rangeWidth = cargoWidthRange.value;
  let inputHight = cargoHightInp.value;
  let rangeHight = cargoHightRange.value;
  let height = inputHight * 100 + 20;
  let width = inputWidth * 100 + 20;

  cargoWeight.textContent =
    Math.round((rangeHight * rangeWidth) / 0.0017) + " Kg";

  cargoDrawing.style.minWidth = `${width}px`;
  cargoDrawing.style.minHeight = `${height}px`;

  if (target === cargoWidthRange || target === cargoHightRange) {
    cargoWidthInp.value = rangeWidth;
    cargoHightInp.value = rangeHight;
  } else if (target === cargoWidthInp || target === cargoHightInp) {
    cargoWidthRange.value = inputWidth;
    cargoHightRange.value = inputHight;
  }
});

function getCitiesList(arr) {
  arr.forEach((element) => {
    let li = document.createElement("li");
    li.classList.add("cities__item");
    li.textContent = element.name;

    citiesList.append(li);
  });
}

const phoneMask = document.getElementById("PhoneInput");
const maskOptions = {
  mask: "+{38}(000)000-00-00",
};
const mask = IMask(phoneMask, maskOptions);

(function () {
  let date = new Date();
  document.querySelector("#dateInput").valueAsDate = new Date();
})();
