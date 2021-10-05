'use ctrict';

let url = 'https://jsonplaceholder.typicode.com/photos';
let url2 = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities';
let promise = fetch(url2);

promise
  .then(response => {
    if (response.ok) {
      alert('OK');
    } else {
      alert(response.status);
    }
  })
  .catch(error => console.log(error.message));
