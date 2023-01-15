const axios = require('axios');

axios.get('https://example.com/api/data')
  .then(response => {
    // success
    console.log(response.data);
  })
  .catch(error => {
    // failure
    console.log(error);
  });