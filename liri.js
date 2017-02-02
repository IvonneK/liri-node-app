// Coder: Ivonne Komis
// Purpose: use LIRI language interpretation and recognition to send 
// requests
// API used: twitter, spotify and IMDB
// use api keys for twitter from keys.js 
// tested able to read keys (./ added)
// turn if statement into functions

var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var omdb = require('omdb');
var keys = require('./keys.js');


var keyList = keys.twitterKey;
for (var key in keyList) {
	console.log(key + ': ' + keyList[key]);
}
var requestEntered = process.argv;
var userInput = requestEntered[2];
var userInput2 = requestEntered[3];

var ikomisTweets = [];

// my-tweets
// spotify-this-song
// "movie-this"
// "do-what-it-says"
// // node.liri.js my-tweets
// // this should show your last 20 tweets

if (userInput == "my-tweets") {
  console.log(userInput);
  // console.log('my tweets:' + ikomisTweets) 
}
else if (userInput == "spotify-this-song") {
  console.log(userInput + ' ' + userInput2);
  // console.log(artist + ' ' + songName + ' ' + previewLinkSong 
    // + ' ' + album);
  // if (err) {
  //   console.log('The Sign by Ace of Base');
  // } 
}
else if (userInput == "movie-this") {
  console.log(userInput + ' ' + userInput2);
  // if (err) {
  //   console.log ('movie not found. Mr Nobody info and link')
  // }
  // console.log(title, year, rating country, language, plot, actors, rotten tomatoes rating, rotten tomatoes url);
}

else if (userInput == "do-what-it-says") {
  console.log(userInput);
// run spotify-this-song will as follows the random.txt  
//   using fs liri takes text inside random.txt 
//   then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
}
else {
  console.log("Not a recognized command");
}

// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
    // Do something with 'data' 
// });

// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.


