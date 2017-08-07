const express = require('express');
const Twit = require('twit');
const config = require('../config');
const router = express.Router();

const T = Twit(config);
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



//START COMMENT BLOCK FOR FRIENDS (USING IDS)

//Get list of 5 user id's that follow screenName (for use in other functions)
T.get('friends/ids', screenName, (err, data) => {
  friendIds = [];
  for(let i = 0; i < 5; i++){
    // //if !err push
    // friendIds.push(`{user_id: ${data.ids[i]}}`);

    console.log(data);

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

// Get your 5 most recent tweets
T.get('statuses/user_timeline', screenName, (err, data) => {

  if(err){
    console.log(err);
  }

  for(let k = 0; k < 5; k++){

    console.log(`Tweet ${k+1}:`);
    console.log(data[k].text);
    // console.log(data[1]);

  }
})

// Get your 5 most recent friends


// Get your 5 most recent private messages


T.get('users/lookup', screenName, (err, data) => {

  // //Get Tweet text (SHOULD BE DONE IN DIFFERENT GET REQ TO LOOP OVER 5 TWEETS)
  // console.log(data[0].status.text);

  // -# of retweets:     "retweet_count": 23936,
  console.log(data[0].status.retweet_count);

  // -# of favorites (aka 'likes'):    "favorite_count": 21879,
  console.log(data[0].status.favorite_count);

  // -date Tweeted
  console.log(data[0].status.created_at);

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

  dateData = [];

  for (let j = 0; j < 5; j++){

    //Message body
    console.log(data[j].text);

    //Dates are always in "Mon Jun 26 23:54:35 +0000 2017" string format
    dateData = data[j].created_at;

    //Date message was sent
    console.log(dateData.split(' ', 3).join(' '));

    //Time the message was sent
    console.log(dateData.split(' ').slice(3).join(' '));

  }
  // //Add array of data to templateData object
  // templateData.data[j].text;
})

//END COMMENT BLOCK FOR MESSAGES

/* GET home page. */
router.get('/', function(req, res, next) {

  //Populate object from segmented get requests using Twit package
  templateData = { title: 'Twitter Interface', username: 'Shootaaa' };

  res.render('index', templateData);
});


//ERROR HANDLING REDIRECTS
//res.redirect(301, 'http://example.com');

module.exports = router;
