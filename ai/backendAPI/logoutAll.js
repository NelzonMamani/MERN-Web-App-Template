const axios = require('axios');

const YOUR_JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzRkMzZhM2FiZWZmZjI4OTYwYTI1MCIsImVtYWlsIjoicHJlbWl1bXVzZXJ4eXpAZXhhbXBsZS5jb20iLCJpYXQiOjE2NzM4NDM1NjIsImV4cCI6MTY3Mzg0NzE2Mn0.ApRYGi5EbXvUmEiGrvzW9ou1C6TO2xwshU6Qzh6ofHk"
axios({
  method: 'post',
  url: 'http://localhost:4000/users/logoutAll',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.log(error));
