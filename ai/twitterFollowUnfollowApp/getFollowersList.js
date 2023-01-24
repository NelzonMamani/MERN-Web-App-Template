var screen_name = "twitterdev";
var params = { screen_name: screen_name };
client.get("followers/list", params, function (error, followers, response) {
  if (!error) {
    console.log(followers);
  }
});
