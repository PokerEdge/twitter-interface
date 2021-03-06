const express = require('express');
const Twit = require('twit');
const config = require('../config');
const moment = require('moment');

const router = express.Router();

const T = Twit(config);
let friendIds = [];
let dateData = [];
let msgTime = [];
let tweetsText = [];
let favCount = [];
let RTCount = [];
let timeOfTweet = [];
// let connections =[];

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

// //Find present time and subtract that parsed time from hours since tweet was made
// function timeSinceTweet(displayTime){
//   let now = moment();
//   T.get()
// }


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

//MODULARIZE INTO A FUNCTION

// Get your 5 most recent tweets
T.get('statuses/user_timeline', screenName, (err, data) => {

  if(err){
    console.log(err);
  }

  for(let k = 0; k < 5; k++){

    RTCount.push(data[k].retweet_count);
    favCount.push(data[k].favorite_count)
    tweetsText.push(data[k].text);

    //Edit format with MOMENT by creating a new moment and finding hours-since
    console.log(data[k].created_at);
    data[k].created_at = moment(data[k].created_at).fromNow();
    timeOfTweet.push(data[k].created_at);
  }
  templateData.RTCount = RTCount;
  templateData.favCount = favCount;
  templateData.tweetsText = tweetsText;
  templateData.timeOfTweet = timeOfTweet;
});

// Get your 5 most recent friends (followers)
  //This method is especially powerful when used in conjunction with GET users / lookup, a method that allows you to convert user IDs into full user objects in bulk.
T.get('followers/ids', screenName, (err,data) => {

  //Friends count
  // console.log(data.ids.length);
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
});


// Get your 5 most recent private messages


T.get('users/lookup', screenName, (err, data) => {

  // -# of retweets:     "retweet_count": 23936,
  console.log(data[0].status.retweet_count);
  templateData.retweetCount = data[0].status.retweet_count;

  // -# of favorites (aka 'likes'):    "favorite_count": 21879,
  console.log(data[0].status.favorite_count);
  templateData.favoriteCount = data[0].status.favorite_count;

  // -date Tweeted
  console.log(data[0].status.created_at);
  templateData.createdAt = data[0].status.created_at;

  // MANIPULATE DATES TO GIVE TIME SINCE TWEET USING MOMENT PACKAGE



  //-profile image
  console.log(data[0].profile_image_url.replace('normal','bigger'));
  templateData.profileImageURL = data[0].profile_image_url.replace('normal','bigger');

  //IS THIS VALID OR NECESSARY? - IT LOGS OUT AS UNDEFINED
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
  msgTime = [];

  for (let j = 0; j < 5; j++){

    //Message body
    // console.log(data[j].text);
    dateData.push(data[j].text);
    data[j].created_at = moment(data[j].created_at).fromNow();
    msgTime.push(data[j].created_at);

    //Message time


    //***** PERFORM CALCULATIONS HERE TO GET TIME SINCE CORRESPONDING EVENT OCCURED ******



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
  templateData.messagesTime = msgTime;
});
//END COMMENT BLOCK FOR MESSAGES


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', templateData);
});

//HOOK UP SOCKET.IO PROPERLY
router.post('/', (req, res, next) => {
  //Form response will go to req.body and that's why we need bodyParser to populate the property
    //because req.body is undefined by default
  //To put the form response into the req.body, we need middleware
  console.log(req.body.tweetText);

  const tweetToSend = { status : req.body.tweetText };

  //Tweet 'req.body.tweetText'
  T.post('statuses/update', tweetToSend, (err, data, res) => {


    // THIS IS GRABBING THE TWEET TEXT
    console.log(tweetToSend.status);

    //Reset status for next tweet
    tweetToSend.status = "";

    //Get new tweet information
    // Get your 5 most recent tweets

  });

  // T.get('statuses/user_timeline', screenName, (err, data) => {
  //   //Reset tweetsText array to accept new tweets
  //   // tweetsText = [];
  //
  //   if(err){
  //     console.log(err);
  //   }
  //
  //   // for(let k = 0; k < 5; k++){
  //     // CONTINUE HERE
  //     tweetsText.pop(data[4].text);
  //     tweetsText.unshift(data[0].text);
  //
  //     console.log(`NEW TWEET: ${data[0].text}`);
  //
  //     console.log(tweetsText);
  //
  //   // }
  //   templateData.tweetsText = tweetsText;
  // });

  //Perhaps 'send' or 'end' the data to home route, instead of rendering it once more
  res.end();
});

//ERROR HANDLING REDIRECTS
//res.redirect(301, 'http://example.com');

// http://expressjs.com/en/api.html#res.status

module.exports = router;
