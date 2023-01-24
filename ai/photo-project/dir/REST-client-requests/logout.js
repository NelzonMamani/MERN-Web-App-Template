const axios = require('axios');

const logout = async () => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M1ZmM4MDI2M2Y5NmM1ZGUzNGU0YzAiLCJpYXQiOjE2NzM5MjM3Mjd9.BcHzTPEPxfJ2mhrQV7SRD24eOa_NKoLhTcpsD6JvuXM'; // Replace this with the actual token you want to use
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await axios.post('http://localhost:4000/users/logout', {}, config);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

logout();
