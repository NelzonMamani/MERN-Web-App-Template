const express = require('express');
const jwt = require('jsonwebtoken');
const { validateUserData } = require('./middlewares/validation');

require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/login', validateUserData, (req, res) => { 
  // authenticate user
  const { email, password } = req.body;
  User.findOne({ email, password }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
    res.json({ accessToken, refreshToken });
  });
});

app.listen(process.env.AUTH_SERVER_PORT, () => {
  console.log(`Auth server started on port ${process.env.AUTH_SERVER_PORT}`);
});
