var express = require('express');
var Twit = require('twit');
var config = require('../config');
var router = express.Router();

var T = Twit(config);

// Count of all references to all data gathered throughout the application
const count = 5;

  // q: 'rainbow',
  // screen_name: "shootaaa"
  // count: 2
  // user_id : {982223131}


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(config.consumer_key);
  res.render('index', { title: 'Express'});
});

//Check if !err prior to pushing to array

//Get the list of user id's that follow @tolga_tezel
T.get('friends/ids', { screen_name: 'shootaaa' }, (err, data) => {
  let friendIds = [];
  for(let i = 0; i < count; i++){
    // //if !err push
    friendIds.push((objectMaker(data.ids[i])));
  }
  friendIdGrabber(friendIds);
})

function objectMaker(value){
  return {
    user_id: value
  }
}

function friendIdGrabber(friendIds){
  friendIds.forEach(param => {
    T.get('users/lookup', param, (err, data) => {
        //Log profile image URL
        console.log(data[0].profile_image_url.replace('normal','bigger'));

        //Log real name
        console.log(data[0].name);

        //Log screen name
        console.log(data[0].screen_name);
        console.log("------");
      //Handle 404 err if no look up criteria match
      //Data comes in as incomingMessage and should have property of statusCode
      if(err){
        console.err(err);
      }
    })
  })
}


// T.get('search/tweets', params, (err,data,res) => {
//   console.log(data)
// })

// //  tweet 'hello world!'
//   // Replace 'hello world' with dynamically inserted value that has an onkeyUp listener
//   // with maximum length of 140 characters and the length of which affects the number
//   // appearing within the corresponding pug template
// T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//   console.log(data)
// })

module.exports = router;
