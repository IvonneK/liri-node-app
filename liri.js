// Web Developer: Ivonne Komis
// Written in Javascript 
// also used Node.js and installed various node packages.
// 3 API's used: Twitter(social), Spotify(music), omdb(movies)
// Purpose: use LIRI language interpretation and recognition to send 
// requests
// Got Twitter api keys by reading keys.js
// used readFile to read random.txt file for liri 
// used fs.appendFileSync to write to log.txt

var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var omdb = require('omdb');
var fs = require('fs');
var keys = require('./keys.js');
var moment = require('moment');

var client = new Twitter(keys.twitterKey);


// -----  Access Twitter API to display tweets  -----
function twitterAPISearch() {
  var params = {
                q: 'IvonneKomis',
                count: 15,
                since_id: 827428476839923712
              };
                  
  client.get('search/tweets', params, function(error, tweets, response){
    if (error) {
      console.log(error);
    }else{
      var numTweets = tweets.statuses.length;
      for (var i = 0; i < numTweets; i++){
        var createdDate = moment(new Date(tweets.statuses[i].created_at)).format('MMM DD YYYY, HH:mm:ss a');
        var tweetLength = tweets.statuses[i].text.length
        var borderLine = '_';
        for (var j = 0; j < tweetLength; j++) {
          borderLine = borderLine + '_';
        }
        console.log(borderLine + '\n');
        console.log(createdDate);
        console.log(tweets.statuses[i].text);
        console.log(borderLine + '\n');
      };
    }; 
  });
};


// -----  Access Spotify API to display Song Data  -----
function spotifyAPISearch(songName) { 
  spotify.search({ type: 'track', query: songName, limit: 1}, function(err, data) {
      if (err) {
          console.log('Error occurred: ' + err);
          return;
      }
      else{
        var songData = data.tracks.items[0];
        var artist = songData.artists[0].name;
        var song = songData.name
        var album = songData.album.name;
        var preview = songData.preview_url
        var previewLength = songData.preview_url.length
        var borderLine = '_';
        for (var j = 0; j < previewLength; j++) {
          borderLine = borderLine + '_';
        };
        console.log(borderLine + '\n');
        console.log('ARTIST/BAND.. ' + artist + '\n');
        console.log('SONG NAME.... ' + song + '\n')
        console.log('ALBUM NAME... ' + album + '\n');
        console.log('TO PREVIEW SONG copy/paste URL below into your browser(Chrome, Safari, etc):' + '\n' + preview)
        console.log(borderLine+ '\n');
      };
  });
};


// ---- Access omdb API to display Movie Data (2/8 API down)  ----
function omdbAPISearch(var) {
  request('http://www.omdbapi.com/?t=the+wizard+of+oz&y=1939&t=movie&plot=short&r=json', function(err, response, body) {
    console.log(JSON.parse(body).imdbRating);
      If the request is successful (i.e. if the response status code is 200)

      if (!err) {
        console.log(body);
        // Parse the body of the site and recover just the imdbRating
        (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      console.log(JSON.parse(body).Title + JSON.parse(body).Year + JSON.parse(body).Country + JSON.parse(body).Language + JSON.parse(body).Plot + JSON.parse(body).Actors);
        rotten tomatoes rating,rotten tomatoes url);
      } else {
        console.log('---------error:'+ err);
      };
  });
};


// ----------- READ Random.txt File  ------------
function readRandom() {
  fs.readFile('random.txt', 'utf8', function(err, data){
    var output = data.split(',');
    console.log(output[0]);
    console.log(output[1])
    var outputLine = output.join('\n');
    console.log(outputLine);
  });
};


// -----------  WRITE(append) to log.txt file --------- 
function logFile(logText){
  fs.appendFileSync("log.txt", logText, encoding='utf8', function(err) {
      // If an error was experienced we say it.
      if (err) {
          console.log(err);
      } else {
          // We need to console.log that we saved the info
          console.log("SAVED to log.txt File");
      };
  });
};


// var ikomisTweets = [];
// }


var liriCommands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];
var writeToLog = '';

// Instructions for the user at terminal
function Instructions(){
  writeToLog = '\n' + 'Enter one of the following liri commands from your terminal command line:' + '\n';
  writeToLog += 'To Search on Twitter for my tweets enter=>  node liri.js my-tweets' + '\n';
  writeToLog += '   To Search on Spotify for a Song enter=>  node liri.js spotify-this-song +NameOfSong' + '\n';
  writeToLog += '  To Search on omdb for Movie info enter=>  node liri.js movie-this +NameOfMovie' + '\n';
  writeToLog += '              FOR  random searches enter=>  node liri.js do-what-it-says' + '\n';
  console.log(writeToLog);
  // logFile(writeToLog);
};


var userInput = process.argv[2];
console.log(userInput);
var userInput2 = process.argv[3];
console.log(userInput2);
var requestEntered = process.argv;
requestLength = requestEntered.length; 
if (requestLength > 3) {
 userInput2 = requestEntered.slice(3, (requestLength));
 userInput2 = userInput2.toString();
 userInput2 = userInput2.replace(',', '+');
 console.log(userInput2);
}

// Use the switch option to run the functions
switch(userInput) {
  case "my-tweets":
    twitterAPISearch();
  break;
  case "spotify-this-song":
    if (userInput2 != null || undefined) {
      console.log(userInput2);
      spotifyAPISearch(userInput2);
    }
    else {instructions(); };
  break;
  case "movie-this":
    if (userInput2 != null || undefined) {
      console.log(userInput2);
      ombdAPISearch(userInput2);
    }
    else {instructions(); };
  break;
    case "do-what-it-says":
      readRandom();
    }
  break;
}

  // if (err) {
  //   console.log('The Sign by Ace of Base');
  // } 
// }


  // if (err) {
  //   console.log ('movie not found. Mr Nobody info and link')
  // }
  // 
// }

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
// }
// else {
//   console.log("Not a recognized command");
// }