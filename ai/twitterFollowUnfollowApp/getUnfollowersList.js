const Twit = require('twit');
const fs = require('fs');

const T = new Twit({
  bearer_token: 'YOUR_BEARER_TOKEN',
});

async function createUnfollowersDoc(username) {
  try {
    const response = await T.get('friends/ids', { screen_name: username });
    const friends = response.data.ids;
    const response2 = await T.get('followers/ids', { screen_name: username });
    const followers = response2.data.ids;
    const unfollowers = friends.filter(friend => !followers.includes(friend));
    let unfollowersHtml = '';
    for (let i = 0; i < unfollowers.length; i++) {
      const unfollower = unfollowers[i];
      const response3 = await T.get('users/show', { user_id: unfollower });
      const unfollowerName = response3.data.screen_name;
      unfollowersHtml += `<a href="https://twitter.com/${unfollowerName}">${unfollowerName}</a>`;
    }
    fs.writeFileSync('unfollowers.html', unfollowersHtml);
    console.log('unfollowers.html has been created successfully.');
  } catch (error) {
    console.log(error);
  }
}

createUnfollowersDoc("@NelzonMamani")
