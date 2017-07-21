var express = require('express');
var Twit = require('twit');
var config = require('../config');
var router = express.Router();

var T = Twit(config);
let friendIds = [];
let dateData = [];

//User's Twitter handle for use as parameter in GET requests
const screenName = {screen_name: 'shootaaa'};
const id = {user_id: '1602771427'};

  // q: 'rainbow',
  // screen_name: "shootaaa"
  // count: 2
  // user_id : {982223131}

// 5 Tweets: message content, number of retweets, number of likes, and date tweeted
  // https://dev.twitter.com/overview/api/tweets


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(config.consumer_key);
  res.render('index', { title: 'Twitter Interface'});
});


//START COMMENT BLOCK FOR FRIENDS (USING IDS)

//Get list of 5 user id's that follow screenName (for use in other functions)
T.get('friends/ids', screenName, (err, data) => {
  friendIds = [];
  for(let i = 0; i < 5; i++){
    // //if !err push
    // friendIds.push(`{user_id: ${data.ids[i]}}`);


    //MIGHT ONLY NEED THE ID NUMBER NOT USER_ID: ID_NUMBER
    friendIds.push(`{user_id: ${data.ids[i]}}`);

    //List of 5 most recent follower's (friend's) IDs

    // friendIds.push((objectMaker(data.ids[i])));

    // //Prints {user_id: 885258144443543600} etc. to console

  }

  // // // Logs comma separated list of user_ids
  // console.log(friendIds.join(','));
  console.log(friendIds);
  //CALL TWEETS FUNCTION HERE TO MAKE USE OF ID

  //NEED TO *MAP* ID TO USER NAME

})


T.get('users/lookup', screenName, (err, data) => {

  console.log('************');

  //Get Tweet text
  console.log(data[0].status.text);

  // -# of retweets:     "retweet_count": 23936,
  console.log(data[0].status.retweet_count);

  // -# of favorites (aka 'likes'):    "favorite_count": 21879,
  console.log(data[0].status.favorite_count);

  // -date Tweeted
  console.log(data[0].status.created_at);

  console.log('************');

  //-profile image
  console.log(data[0].profile_image_url.replace('normal','bigger'));

  //-real name
  console.log(data[0].name);

  //-screenname
  console.log(data[0].screen_name);

  //unnecessary?
  console.log(data[0].id_str);

  //Handle 404 err if no look up criteria match
  //Data comes in as incomingMessage and should have property of statusCode
  if(err){
    console.log(err);
  }
})


//START COMMENT BLOCK FOR MESSAGES

//Get 5 most recent direct message bodies, date the message was sent, and time the message was sent
T.get('direct_messages/sent', {count: 5}, (err, data, res) => {
  // console.log(data[0].text);
  dateData = [];

  for (let j = 0; j < 5; j++){

    // console.log(data[0]);

    //Message body
    console.log(data[j].text);

    //Dates are always in "Mon Jun 26 23:54:35 +0000 2017" string format
    dateData = data[j].created_at;

    //Date message was sent
    console.log(dateData.split(' ', 3).join(' '));

    //Time the message was sent
    console.log(dateData.split(' ').slice(3).join(' '));

    //Separation visual cue
    console.log("------");
  }
})

//END COMMENT BLOCK FOR MESSAGES

module.exports = router;
