var screen_name = 'twitterdev';
var params = { screen_name: screen_name };

client.get('friends/list', params, function(error, friends, response) {
    if (!error) {
        console.log(friends);
    }
});

// Retrieving a user's friends (users they are following): You can use the GET friends/list endpoint to retrieve a list of users that a specific user is following. For example, this is an example of how you can retrieve the friends of user with the screen name '@twitterdev' using the endpoint in javascript:

