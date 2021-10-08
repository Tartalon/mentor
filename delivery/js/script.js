'use strict';

const citiesList = document.querySelector('.cities__list');
const citiesInput = document.querySelector('.cities__input');
const dropdownButton = document.querySelector('.dropdown__button');
const citiesListWrapper = document.querySelector('.cities__list-wrapper');

let url =
  'http://geohelper.info/api/v1/countries?apiKey=JT4TwHR95h6PpzjwXhbfwBPmffpeKSFY&locale%5Blang%5D=uk&locale%5BfallbackLang%5D=ua';

fetch(url)
  .then(response => response.json())
  .then(data => {
    getCitiesList(mapArray(data.result));
    citiesInput.addEventListener(
      'change',
      arrayFilterByInput(mapArray(data.result))
    );
  })
  .catch(err => {
    console.error(err);
  });

dropdownButton.addEventListener('click', function () {
  citiesListWrapper.classList.toggle('hidden');
});

function mapArray(array) {
  return array.map(element => {
    return {
      name: element.name,
    };
  });
}

function getCitiesList(arr) {
  arr.forEach(element => {
    let li = document.createElement('li');
    li.classList.add('cities__item');
    li.textContent = element.name;

    citiesList.append(li);
  });
}

function arrayFilterByInput(array) {
  let value = citiesInput.value;
  let result = array.filter(city => value + city.slice(value.length));
  return result;
}
