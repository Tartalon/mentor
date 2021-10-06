'use strict';

let url =
  'http://geohelper.info/api/v1/countries?apiKey=JT4TwHR95h6PpzjwXhbfwBPmffpeKSFY&locale%5Blang%5D=uk&locale%5BfallbackLang%5D=ua';

fetch(url)
  .then(response => console.log(response.json()))
  .then(json => console.log(json))
  .catch(err => {
    console.error(err);
  });

// function mapArray(array) {
//   return array.map(element => {
//     return {
//       name: element.name,
//     };
//   });
// }
