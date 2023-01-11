import axios from 'axios';

const data = {
  foo: 'bar'
};

axios.post('/data', data)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });