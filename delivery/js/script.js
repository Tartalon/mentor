'use ctrict';

let url =
  'http://geodb-free-service.wirefreethought.com/v1/geo/cities?offset=0&languageCode=ru&sort=name';

fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/countries/UA/regions', {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    'x-rapidapi-key': '',
  },
})
  .then(response => {
    console.log(response.json());
  })
  .catch(err => {
    console.error(err);
  });
