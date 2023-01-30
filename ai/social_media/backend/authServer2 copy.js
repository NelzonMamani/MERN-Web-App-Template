// Import required modules
const express = require('express');
const csrf = require('csurf');
//const bodyParser = require('body-parser');
const config = require('./config/config');
const User = require('./models/User');

// Create the express app
const app = express();

// Use the body parser middleware to parse JSON request bodies
//app.use(bodyParser.json());
app.use(express.json())

// Use the csrf middleware to protect against CSRF attacks
const csrfProtection = csrf({ cookie: true });

// Register new user
app.post('/register', csrfProtection, async (req, res) => {
  try {
    // Extract user information from the request body
    const { email, password } = req.body;

    // Create a new user object
    const user = new User({ email, password });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Start the auth server
app.listen(config.authServerPort, () => {
  console.log(`Auth server listening on port ${config.authServerPort}`);
});


// In this example, we're using the csurf library to provide CSRF protection. The csrf middleware is added to the /register endpoint using the app.use() function. This middleware will automatically check for the presence of a CSRF token in the request body or headers and will reject the request if the token is not present or is invalid. Additionally, the middleware will also set a CSRF token in a cookie, which can be used by the client to include the token in future requests.

// It's important to note that in this example, the CSRF protection middleware is only applied to the /register endpoint. If you want to protect other endpoints, you'll need to add the middleware to those endpoints as well.

// It's also worth noting that CSRF protection is not just about adding a middleware, it's about following a secure development process and being aware of the potential risks of your application. There is a good chance that you need to check for more than just the token, like checking the origin of the request and other things to prevent from a third-party website from making a request that affects your user's data.