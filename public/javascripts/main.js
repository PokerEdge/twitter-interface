// const cheerio = require('cheerio');
// const $ = cheerio.load(`<textarea class="circle--textarea--input" placeholder="What's happening?" id="tweet-textarea"></textarea>`);
// console.log($('tweet-textarea'));

// 'use strict';



//main.js is hooked up in layout.pug so it's in each header of the app
const maxChar = 140;

console.log( $('#tweet-textarea').text().length );



console.log( $('#tweet-char').text() );
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

function countTweet() {
  //alter text length using maxChar
  // const charNum = maxChar - $('#tweet-textarea').val().length;

  console.log( $('#tweet-textarea').val().length );

  // if( parseInt( $('#tweet-char').text() ) > maxChar ){ //If default int of 140 is greater than maxChar
  //
  //   // //add a class to make it red
  //   // $(this).css({ 'color': 'tomato'});
  //   //
  //   // //Add attr to button-primary to disable it
  //   // $('.button-primary').attr('disabled');
  //
  //   console.log('Max length reached');
  //
  // // } else {
  // //   $('.button-primary').attr('enabled');
  // }
}


// $('.button-primary').on('click', () => {
//   //Show text about new tweet being posted until the text of the most
//     //recently stored tweet changes
//     $('#tweet-textarea').hide();
//     $
// });
