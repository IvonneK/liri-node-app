// Coder: Ivonne Komis
// Purpose: use LIRI language interpretation and recognition to send 
// requests
// API used: twitter, spotify and IMDB
// use api keys for twitter from keys.js 
// tested able to read keys (./ added)

var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');

var keyList = keys.twitterKey;
for (var key in keyList) {
	console.log(key + ': ' + keyList[key]);
}
var requestEntered = process.argv;
var userInput = requestEntered[2];

var ikomisTweets = [];

// my-tweets
// spotify-this-song
// "move-this"
// "do-what-it-says"
// // node.liri.js my-tweets
// // this should show your last 20 tweets

if (userInput === "my-tweets") {
  console.log('my tweets:' + ikomisTweets) 
}

else if (userInput === "spotify-this-song") {
  console.log('my tweets:' + ikomisTweets) 
}

else if (userInput === "move-this") {
  console.log('my tweets:' + ikomisTweets) 
}

else if (userInput === "do-what-it-says") {
  console.log('my tweets:' + ikomisTweets) 
}

else {
  console.log("Not a recognized command");
}

spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});


