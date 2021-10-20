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
const dateInput = document.querySelector("#dateInput");
const timeInput = document.querySelector("#timeInput");
const finalCost = document.querySelector(".finalCost");

let citiesArr = [];

const url =
  "https://gist.githubusercontent.com/alex-oleshkevich/1509c308fabab9e104b5190dab99a77b/raw/b20bd8026deec00205a57d395c0ae1f75cc387bb/ua-cities.json";

(async function getData() {
  try {
    clearInput(citiesInput);
    const response = await fetch(url);
    const data = await response.json();
    const regions = data[0].regions;
    regions.forEach((reg) => {
      const cities = [...reg.cities];
      cities.forEach((city) => {
        citiesArr.push(city.name);
      });
    });
    createLi(citiesArr);
  } catch (err) {
    console.log(err);
  }
})();

dropdownButton.addEventListener("click", function () {
  citiesListWrapper.classList.toggle("hidden");
});

dateInput.setAttribute("min", getDeliveryDate());

citiesInput.addEventListener("input", function (e) {
  citiesListWrapper.classList.remove("hidden");
  const inputValue = citiesInput.value;
  let filteredCities = citiesArr.filter(
    (city) => city.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
  );
  createLi(filteredCities);
});

citiesList.addEventListener("click", choossesCity);

cargoInputs.addEventListener("input", function (e) {
  let target = e.target;
  let inputWidth = cargoWidthInp.value;
  let rangeWidth = cargoWidthRange.value;
  let inputHight = cargoHightInp.value;
  let rangeHight = cargoHightRange.value;
  let height = inputHight * 100 + 20;
  let width = inputWidth * 100 + 20;

  cargoWeight.textContent =
    Math.round((rangeHight * rangeWidth) / 0.02) + " Kg";

  if (target === cargoWidthRange || target === cargoHightRange) {
    cargoWidthInp.value = rangeWidth;
    cargoHightInp.value = rangeHight;
  } else if (target === cargoWidthInp || target === cargoHightInp) {
    cargoWidthRange.value = inputWidth;
    cargoHightRange.value = inputHight;
  }

  cargoDrawing.style.minWidth = `${width}px`;
  cargoDrawing.style.minHeight = `${height}px`;
});

function createLi(arr) {
  let sortedArr = arr.sort();
  if (citiesList.children) {
    let liArray = Array.from(citiesList.children);
    liArray.forEach((element) => element.remove());
  }
  for (const city of sortedArr) {
    const li = document.createElement("li");
    li.classList.add("cities__item");
    li.textContent = city;
    citiesList.append(li);
  }
}

function getCitiesList(arr) {
  arr.forEach((element) => {
    let li = document.createElement("li");
    li.classList.add("cities__item");
    li.textContent = element.name;

    citiesList.append(li);
  });
}

function choossesCity(event) {
  let target = event.target;
  citiesInput.value = target.textContent;
  citiesListWrapper.classList.add("hidden");
}

function clearInput(input) {
  input.textContent = "";
  input.value = "";
}

function filterCities(arr) {
  let inputValue = citiesInput.value;
  let filteredCities = arr.filter(
    (city) => city.slice(0, inputValue.length) == inputValue
  );
  createLi(filteredCities);
  console.log(filteredCities);
}

function getDeliveryDate() {
  const today = new Date();
  dateInput.valueAsDate = today;
  const afterThreeDays = new Date(today.setDate(today.getDate() + 3));
  const deliweryDay = `${afterThreeDays.getFullYear()}-${
    afterThreeDays.getMonth() + 1
  }-${afterThreeDays.getDate()}`;
  return deliweryDay;
}

function getCostOfDelivery(width, hight, weight) {
  const cost = 0;
  const costPerWidt = width > 1 ? (width - 1) * 1000 : 0;
  const costPerHight = hight > 1 ? (hight - 1) * 1200 : 0;
  const costPerWeight = weight > weight / 2 ? 3500 : 0;
  cost = costPerWidt + costPerHight + costPerWeight;
  return cost;
}

const phoneMask = document.getElementById("PhoneInput");
const maskOptions = {
  mask: "+{38}(000)000-00-00",
};
const mask = IMask(phoneMask, maskOptions);

// Каждый дополнительный метр ширины груза: +1000 рублей к стоимости доставки - Каждый дополнительный метр высоты груза: +1200 рублей к стоимости доставки - Если вес больше половинного значения максимально допустимого (например, вы указали максимальный вес 500кг, а пользователь ввел >250): +3500 к стоимости доставки
