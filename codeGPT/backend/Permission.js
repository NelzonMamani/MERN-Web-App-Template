//$ npm install auth0
const Auth0 = require('auth0')

const checkPermissions = (user, resource) => {
  // Check if the user has the necessary permissions to access the resource 
  // Return boolean value indicating whether or not they have access 
}

module.exports = {
  checkPermissions
}

// truncated 


// const auth0 = require('auth0');
// const auth0Client = new auth0.WebAuth({
//   domain: <AUTH0_DOMAIN>,
//   clientID: <AUTH0_CLIENT_ID>,
//   redirectUri: <REDIRECT_URI>,
//   audience: <AUTH0_AUDIENCE>,
//   responseType: 'token id_token',
//   scope: 'openid profile'
// });

// // Create routes to handle authentication:


// app.get('/login', function(req, res) {
//   auth0Client.authorize();
// });

// app.get('/callback', function(req, res) {
//   auth0Client.handleAuthCallback(req.query.redirectUri, function(err, authResult) {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     // Get user information from Auth0
//     auth0Client.getUserInfo(authResult.accessToken, function(err, user) {
//       // Save user information to database
//     });
//   });
// });