const Twit = require('twit');
const fs = require('fs');

const T = new Twit({
  consumer_key: 'FvmjeR8KTIiCYmb8KwmncOtUL',
  consumer_secret: 'SN6XRFa1Ci5L9GDwmFWXx1BqZKf1hHvNhumB0WfPrPDLh5gfE7',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAALZzlQEAAAAAQepEJcVfHGHRQAlZQb54JSUYCIY%3D7ff6ZkotLMHSnkutKcl5dWUULz5sbHpMHP6y9t1evRNiEMY127',
});

function createUnfollowersDoc(username) {
    // get the list of friends for the given Twitter user
    T.get('friends/list', { screen_name: username }, function(err, data) {
        if(err) {
            console.log("Error getting friends list: " + err);
            return;
        }
        let friends = data.users;
        let friends_ids = friends.map(friend => friend.id);
        // get the list of followers for the given Twitter user
        T.get('followers/list', { screen_name: username }, function(err, data) {
            if(err) {
                console.log("Error getting followers list: " + err);
                return;
            }
            let followers = data.users;
            let followers_ids = followers.map(follower => follower.id);
            // calculate the difference between the friends and followers lists to get the unfollowers
            let unfollowers = friends_ids.filter(friend_id => !followers_ids.includes(friend_id));
            let unfollowers_info = friends.filter(friend => unfollowers.includes(friend.id));
            // create the unfollowers.html file
            let unfollowers_html = '<!DOCTYPE html><html><head><title>Unfollowers</title></head><body><ul>';
            unfollowers_info.forEach(unfollower => {
                unfollowers_html += `<li><a href="https://twitter.com/${unfollower.screen_name}">${unfollower.name}</a></li>`;
            });
             
            unfollowers_html += '</ul></body></html>';
            // write the unfollowers_html to the unfollowers.html file
            fs.writeFileSync('unfollowers.html', unfollowers_html);
            console.log(`Unfollowers of ${username} written to unfollowers.html`);
        });
    });
}
createUnfollowersDoc("@NelzonMamani")