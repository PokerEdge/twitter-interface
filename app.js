"use strict";

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

// var Twit = require('twit');

// const cheerio = require('cheerio');
// const $ = cheerio.load(`<textarea class="circle--textarea--input" placeholder="What's happening?" id="tweet-textarea"></textarea>`);

// var app = require('express')();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// io.on('connection', function(){ /* … */ });
// server.listen(3000);



// console.log($);

var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// //Load static assets from public app.use(express.static('public'))
// app.use('/static', (req, res) => {
//
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //Can stylize the error.pug view more to make it user friendly
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Changed from app.listen(3000, ...) to support socket.io
server.listen(process.env.PORT || 7777, () => console.log('Frontend server is running on port 7777'));

//Receive data on the server.io
  //When client connects, the create a connection event with the socket that the
  //user is using to connect. Kind of like jQuery document ready code for socket.io
//Use named socket event from client side to receive data on the client side
io.sockets.on('connection', function(socket){

  //Handler for the data pertaining to socket event on client side for server
  socket.on('tweet', function(data){
    //What do we do with the data? Give it a name of 'new message' and pass it what
    //we want it to send out
    io.sockets.emit('new tweet', data);

    //Now we have to receive the message on the client side...
  });
});


module.exports = app;
