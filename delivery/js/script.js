'use ctrict';

let url =
  'http://geodb-free-service.wirefreethought.com/v1/geo/cities?offset=0&languageCode=ru&sort=name';

fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/countries/UA/regions', {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    'x-rapidapi-key': '34a2e0d47fmsh2b8571b491c2fe0p1d31e2jsn7749fbdddc80',
  },
})
  .then(response => {
    console.log(response.json());
  })
  .catch(err => {
    console.error(err);
  });
