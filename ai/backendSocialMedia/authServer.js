const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();

app.post('/login', async (req, res) => {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    // Verify the user's password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

// code for generating new access tokens
app.post('/generate-new-access-token', async (req, res) => {
    // check if email and password match a user in the database
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Invalid email or password');

    // compare the plain text password with the hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send('Invalid email or password');

    // create a new access token
    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    // send the new access token to the client
    res.send({ accessToken });
});


// code for generating new access tokens using a refresh token
app.post('/generate-new-access-token-using-refresh-token', async (req, res) => {
    // check if the refresh token is valid
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).send('Please provide a valid refresh token');

    try {
        // verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // check if the user still exists
        const user = await User.findById(decoded._id);
        if (!user) return res.status(401).send('Invalid refresh token');

        // create a new access token
        const newAccessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        // send the new access token to the client
        res.send({ accessToken: newAccessToken });
    } catch (err) {
        // if the refresh token is invalid, send a 401 Unauthorized status
        res.status(401).send('Invalid refresh token');
    }
});




app.listen(process.env.AUTH_PORT, () => {
    console.log(`Auth server running on port ${process.env.AUTH_PORT}`);
});
