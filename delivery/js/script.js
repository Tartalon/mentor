'use strict';

const citiesList = document.querySelector('.cities__list');

let url =
  'http://geohelper.info/api/v1/countries?apiKey=JT4TwHR95h6PpzjwXhbfwBPmffpeKSFY&locale%5Blang%5D=uk&locale%5BfallbackLang%5D=ua';

fetch(url)
  .then(response => response.json())
  .then(data => getCitiesList(mapArray(data.result)))
  .catch(err => {
    console.error(err);
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
