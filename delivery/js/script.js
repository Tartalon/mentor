"use strict";

const citiesList = document.querySelector(".cities__list");
const citiesInput = document.querySelector(".cities__input");
const dropdownButton = document.querySelector(".dropdown__button");
const citiesListWrapper = document.querySelector(".cities__list-wrapper");
const cargoWidthInp = document.querySelector("#CargoWidth");
const cargoHightInp = document.querySelector("#CargoHight");
const cargoHightRange = document.querySelector(".hight__range");
const cargoWidthRange = document.querySelector(".width__range");

let url =
  "http://geohelper.info/api/v1/countries?apiKey=JT4TwHR95h6PpzjwXhbfwBPmffpeKSFY&locale%5Blang%5D=uk&locale%5BfallbackLang%5D=ua";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let citiesArray = mapArray(data.result);
    getCitiesList(citiesArray);
  })
  .catch((err) => {
    console.error(err);
  });

dropdownButton.addEventListener("click", function () {
  citiesListWrapper.classList.toggle("hidden");
});

function mapArray(array) {
  return array.map((element) => {
    return {
      name: element.name,
    };
  });
}

function getCitiesList(arr) {
  arr.forEach((element) => {
    let li = document.createElement("li");
    li.classList.add("cities__item");
    li.textContent = element.name;

    citiesList.append(li);
  });
}

cargoHightRange.addEventListener("change", function (e) {
  console.log(cargoHightRange);
});

var phoneMask = document.getElementById("PhoneInput");
var maskOptions = {
  mask: "+{38}(000)000-00-00",
};
var mask = IMask(phoneMask, maskOptions);
