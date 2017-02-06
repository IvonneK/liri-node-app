// Coder: Ivonne Komis
// Purpose: use LIRI language interpretation and recognition to send 
// requests
// API used: twitter, spotify and IMDB
// use api keys for twitter from keys.js 
// tested able to read keys (./ added)
// turn if statement into functions

var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var omdb = require('omdb');
var movie = require('fs');
var keys = require('./keys.js');
var moment = require('moment');

var client = new Twitter(keys.twitterKey);

// used to check variables
// for (var key in client) {
// 	console.log(key + ': ' + client[key]);
// }

var params = {
              q: 'IvonneKomis',
              count: 15,
              since_id: 827428476839923712
            };
                
client.get('search/tweets', params, function(error, tweets, response){
  if (error) {
    console.log(error);
  }else{
    var arrayTweets = tweets.statuses.length;
    console.log(arrayTweets);
    for (var i = 0; i < arrayTweets; i++){
      var createdDate = moment(tweets.statuses[i].created_at).format('MMMM Do YYYY, h:mm:ss a');
      var tweetLength = tweets.statuses[i].text.length
      var dotLine = '•';
      for (var j = 0; j < tweetLength; j++) {
        dotLine = dotLine + '•';
      }
      console.log(dotLine);
      console.log(createdDate);
      console.log(tweets.statuses[i].text);
      console.log(dotLine);
      console.log('');
    };
  };
  
});

// var keyListSpotify = keys.spotifyKey;
// for (var key in keyList) {
//   var key = key + ': ' + keyList[key];
// }

// var requestEntered = process.argv;
// var userInput = requestEntered[2];
// var userInput2 = requestEntered[3];

// var ikomisTweets = [];

// movie.readFile('random.txt', 'utf8', function(err, data){
//   var output = data.split(',');
//     var outputLine = output.join('\n');
//     console.log(outputLine);
// });

// my-tweets
// spotify-this-song
// "movie-this"
// "do-what-it-says"
// // node.liri.js my-tweets
// // this should show your last 20 tweets

// if (userInput == "my-tweets") {
//   console.log(userInput);
  // console.log('my tweets:' + ikomisTweets) 
// }
// else if (userInput == "spotify-this-song") {
//   console.log(userInput + ' ' + userInput2);
//   readRandom(userInput, userInput2);
  // console.log(artist + ' ' + songName + ' ' + previewLinkSong 
    // + ' ' + album);
  // if (err) {
  //   console.log('The Sign by Ace of Base');
  // } 
// }
// else if (userInput == "movie-this") {
//   console.log(userInput + ' ' + userInput2);
//   request('http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&r=json', function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  // if (response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
  //   console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  // console.log(JSON.parse(body).Title + JSON.parse(body).Year + JSON.parse(body).Country + JSON.parse(body).Language + JSON.parse(body).Plot + JSON.parse(body).Actors);
    // rotten tomatoes rating,rotten tomatoes url);
//   }
// });




  // if (err) {
  //   console.log ('movie not found. Mr Nobody info and link')
  // }
  // 
// }

// else if (userInput == "do-what-it-says") {
//   console.log(userInput);
// run spotify-this-song will as follows the random.txt  
//   using fs liri takes text inside random.txt 
//   then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
// }
// else {
//   console.log("Not a recognized command");
// }

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


