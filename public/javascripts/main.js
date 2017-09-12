// const cheerio = require('cheerio');
// const $ = cheerio.load(`<textarea class="circle--textarea--input" placeholder="What's happening?" id="tweet-textarea"></textarea>`);
// console.log($('tweet-textarea'));

// 'use strict';

//app.js runs twitter app on port 7777
const socket = io.connect();
let tweetLength;

//Get variables we need with jQuery


// const $tweetSendForm = $('tweet-textarea');

// socket.on('tweet', function(tweet){
//   e.preventDefault();
//   console.log(tweet);
//   socket.emit('My other event', { my: 'data'});
//
//   $('.button-primary').click(function(e){
//     e.preventDefault();
//     socket.emit('message', 'Here is the payload from client.');
//   });
// });

//

// const socket = io.connect('http://localhost:8080');

// socket.on('message', function(message){
//   console.log('The server has a message for you: ' + message.content + ' Importance level: ' + message.importance);
// });

// $('#sendToServer').click(function(e){
//   e.preventDefault();
//   socket.emit('message', 'Here is the payload from client.');
// });

//Code socket.on('tweet', function(templateData ??? ){})

//Bind keyup event handler to tweet-textarea
$('#tweet-textarea').keyup(function(e){

  //Prevent page from reloading (and display error message (w animation))
  e.preventDefault();

  //Set length on keyup from $('#tweet-textarea').text().length
  tweetLength = $('#tweet-textarea').val().length;

  //Replace tweet length with 140 minus number of characters in tweet-textarea
  $('#tweet-char').text(140 - tweetLength);

  //Color app--tweet--char depending on validity of tweet length
  if (tweetLength > 140){
    $('.app--tweet--char').css("color","#d40d12");
  } else {
    $('.app--tweet--char').css("color","#ccc");
  }

});


//INSIDE SOCKET CONNECTION 'LISTENER' FOR TWEET
$('.button-primary').click(function(e){
  e.preventDefault();

  //Log tweet text
  console.log( $('#tweet-textarea').val() );

  //Prevent tweet from sending if tweet length is too long
  if (tweetLength > 140){

    console.log("Error: Tweet is too long!")


  } else {

    //Sends event data to server
      //Name the event whatever you want with the first argument
      //Write what you're sending with the second argument
        //You can send an object populated with key-value pairs, if you want
    socket.emit('tweet', $('#tweet-textarea').val());
    $('#tweet-textarea').val('');



    //(Get and) Append new tweet to application with appropriate styles and time
      //Create new tweet templateData array element
    socket.on('new tweet', function(data){
      //test if tweet is being passed
      $('.app--section--heading').append(data);
    });

    // //Time is moment with no parameter
    // let tweetTime = moment();


    //Resets for after valid submission
    $('#tweet-textarea').val('');
    $('#tweet-char').text(140);

  }
});

// $(function(){
//
//   const maxChar = 140;
//
//   console.log( $('#tweet-textarea').text().length + " length");
//
//   console.log( $('#tweet-char').text() + " text");
//
//   // countTweet();
// });

// $('select#title').change(function validateJobRoleValue(e){
//
//   checkJobRoleValue();
// });


// //no jQuery on backend
// $('#tweet-textarea').keyup(countTweet);

// $('textarea').keyup(updateCount);
// $('textarea').keydown(updateCount);
//
// function updateCount() {
//     var cs = $(this).val().length;
//     $('#tweet-char').text(cs);
// }

// function countTweet() {
//   //alter text length using maxChar
//   // const charNum = maxChar - $('#tweet-textarea').val().length;
//
//   console.log( $('#tweet-textarea').val().length + " is counted length");
//
//   // if( parseInt( $('#tweet-char').text() ) > maxChar ){ //If default int of 140 is greater than maxChar
//   //
//   //   // //add a class to make it red
//   //   // $(this).css({ 'color': 'tomato'});
//   //   //
//   //   // //Add attr to button-primary to disable it
//   //   // $('.button-primary').attr('disabled');
//   //
//   //   console.log('Max length reached');
//   //
//   // // } else {
//   // //   $('.button-primary').attr('enabled');
//   // }
// }


// $('.button-primary').on('click', () => {
//   //Show text about new tweet being posted until the text of the most
//     //recently stored tweet changes
//     $('#tweet-textarea').hide();
//     $
// });
