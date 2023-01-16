const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzRkMzZhM2FiZWZmZjI4OTYwYTI1MCIsImVtYWlsIjoicHJlbWl1bXVzZXJ4eXpAZXhhbXBsZS5jb20iLCJpYXQiOjE2NzM4NDM1NjIsImV4cCI6MTY3Mzg0NzE2Mn0.ApRYGi5EbXvUmEiGrvzW9ou1C6TO2xwshU6Qzh6ofHk';

axios.get('http://localhost:4000/users/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});
