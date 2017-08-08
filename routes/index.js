const express = require('express');
const Twit = require('twit');
const config = require('../config');
const router = express.Router();

const T = Twit(config);
let friendIds = [];
let dateData = [];
let tweetsText = [];

//User's Twitter handle for use as parameter in GET requests
const screenName = {screen_name: 'shootaaa'};
const id = {user_id: '1602771427'};

//Populate object from segmented get requests using Twit package
var templateData = { title: 'Twitter Interface', username: '@Shootaaa' };

  // q: 'rainbow',
  // screen_name: "shootaaa"
  // count: 2
  // user_id : {982223131}

// 5 Tweets: message content, number of retweets, number of likes, and date tweeted
  // https://dev.twitter.com/overview/api/tweets



//START COMMENT BLOCK FOR FRIENDS (USING IDS)

//Get list of 5 user id's that follow screenName (for use in other functions)
T.get('friends/ids', screenName, (err, data) => {
  friendIds = [];
  for(let i = 0; i < 5; i++){
    // //if !err push
    friendIds.push(`{user_id: ${data.ids[i]}}`);

    //MIGHT ONLY NEED THE ID NUMBER NOT USER_ID: ID_NUMBER

    //List of 5 most recent follower's (friend's) IDs

    // friendIds.push((objectMaker(data.ids[i])));

    // //Prints {user_id: 885258144443543600} etc. to console

  }

  // // // Logs comma separated list of user_ids
  // console.log(friendIds.join(','));
  console.log(friendIds);
  templateData.friendIds = friendIds;

});

// Get your 5 most recent tweets
T.get('statuses/user_timeline', screenName, (err, data) => {

  if(err){
    console.log(err);
  }

  for(let k = 0; k < 5; k++){

    console.log(`Tweet ${k+1}:`);
    console.log(data[k].text);
    tweetsText.push(data[k].text);

  }
  templateData.tweetsText = tweetsText;
});

// Get your 5 most recent friends (followers)
  //This method is especially powerful when used in conjunction with GET users / lookup, a method that allows you to convert user IDs into full user objects in bulk.
T.get('followers/ids', screenName, (err,data) => {

  //Friends count
  console.log(data.ids.length);
  templateData.followers = data.ids.length;


});


//CALL TWEETS FUNCTION HERE TO MAKE USE OF ID -- ISSUE HERE
T.get('friends/list', screenName, (err,data) => {

    //real name 1
    console.log(data.users[0].name);
    templateData.followerOneName = data.users[0].name;

    //screen name 1
    console.log(data.users[0].screen_name);
    templateData.followerOneScreenName = data.users[0].screen_name;

    //profile image 1
    console.log(data.users[0].profile_image_url);
    templateData.followerOneProfileURL = data.users[0].profile_image_url.replace('normal', 'bigger');

    //real name 2
    console.log(data.users[1].name);
    templateData.followerTwoName = data.users[1].name;

    //screen name 2
    console.log(data.users[1].screen_name);
    templateData.followerTwoScreenName = data.users[1].screen_name;

    //profile image 2
    console.log(data.users[1].profile_image_url);
    templateData.followerTwoProfileURL = data.users[1].profile_image_url.replace('normal', 'bigger');


    //real name 3
    console.log(data.users[2].name);
    templateData.followerThreeName = data.users[2].name;

    //screen name 3
    console.log(data.users[2].screen_name);
    templateData.followerThreeScreenName = data.users[2].screen_name;

    //profile image 3
    console.log(data.users[2].profile_image_url);
    templateData.followerThreeProfileURL = data.users[2].profile_image_url.replace('normal', 'bigger');


    //real name 4
    console.log(data.users[3].name);
    templateData.followerFourName = data.users[3].name;

    //screen name 4
    console.log(data.users[3].screen_name);
    templateData.followerFourScreenName = data.users[3].screen_name;

    //profile image 4
    console.log(data.users[3].profile_image_url);
    templateData.followerFourProfileURL = data.users[3].profile_image_url.replace('normal', 'bigger');


    //real name 5
    console.log(data.users[4].name);
    templateData.followerFiveName = data.users[4].name;

    //screen name 5
    console.log(data.users[4].screen_name);
    templateData.followerFiveScreenName = data.users[4].screen_name;

    //profile image 5
    console.log(data.users[4].profile_image_url);
    templateData.followerFiveProfileURL = data.users[4].profile_image_url.replace('normal', 'bigger');


    // console.log(data.users[2].name);
    // templateData.followerThreeName = data.users[2].name;
    //
    // console.log(data.users[3].name);
    // templateData.followerFourName = data.users[3].name;
    //
    // console.log(data.users[4].name);
    // templateData.followerFiveName = data.users[4].name;
});

// T.get('friends/list', screenName,(err,data) => {
//   for(let i = 0; i < 4; i++)
//   //friend profile image
//
//
//   //friend real name
//   console.log(.data.name + "+++++++++++");
//
//   //friend screenname
//
// });




// Get your 5 most recent private messages


T.get('users/lookup', screenName, (err, data) => {

  // //Get Tweet text (SHOULD BE DONE IN DIFFERENT GET REQ TO LOOP OVER 5 TWEETS)
  // console.log(data[0].status.text);

  // -# of retweets:     "retweet_count": 23936,
  console.log(data[0].status.retweet_count);
  templateData.retweetCount = data[0].status.retweet_count;

  // -# of favorites (aka 'likes'):    "favorite_count": 21879,
  console.log(data[0].status.favorite_count);
  templateData.favoriteCount = data[0].status.favorite_count;

  // -date Tweeted
  console.log(data[0].status.created_at);
  templateData.createdAt = data[0].status.created_at;

  //-profile image
  console.log(data[0].profile_image_url.replace('normal','bigger'));
  templateData.profileImageURL = data[0].profile_image_url.replace('normal','bigger');

  console.log(data[0].profile_background_banner_url + "*********");
  templateData.profileBackgroundImageURL = data[0].profile_banner_url;

  //-real name
  console.log(data[0].name);
  templateData.name = data[0].name;

  //-screenname
  console.log(data[0].screen_name);
  templateData.screenName = data[0].screen_name;

  //unnecessary?
  console.log(data[0].id_str);
  templateData.idString = data[0].id_str;

  //FriendsCount
  console.log(data[0].friends_count);
  templateData.friendsCount = data[0].friends_count;

  //Handle 404 err if no look up criteria match
  //Data comes in as incomingMessage and should have property of statusCode
  if(err){
    console.log(err);
  }
})


//START COMMENT BLOCK FOR MESSAGES

//Get 5 most recent direct message bodies, date the message was sent, and time the message was sent
T.get('direct_messages/sent', {count: 5}, (err, data, res) => {

  dateData = [];

  for (let j = 0; j < 5; j++){

    //Message body
    // console.log(data[j].text);
    dateData.push(data[j].text);

    //Dates are always in "Mon Jun 26 23:54:35 +0000 2017" string format
    // console.log(data[j].created_at);

    // //Date message was sent
    // // console.log(dateData.split(' ', 3).join(' '));
    // dateData.push(dateData.split(' ', 3).join(' '));
    //
    // //Time the message was sent
    // // console.log(dateData.split(' ').slice(3).join(' '));
    // dateData.push(dateData.split(' ').slice(3).join(' '));
  }
  // //Add array of data to templateData object
  templateData.messagesText = dateData;
  // console.log(dateData[1]);
})

//END COMMENT BLOCK FOR MESSAGES

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', templateData);
});


//ERROR HANDLING REDIRECTS
//res.redirect(301, 'http://example.com');

module.exports = router;
