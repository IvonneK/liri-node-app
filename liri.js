// Web Developer: Ivonne Komis
// PURPOSE OF APP: Liri is a language interpretation and recognition used to send 
// requests and get responses from the terminal command line
// Used: Javascript Node.js and installed npm packages listed (require) 
// API's used: Twitter(social), Spotify(music), omdb(movies)
// processed random.txt this file had random commands 
// recorded console.log to terminal as well as to a local log.txt file
// NOTE: OMDB is randomly down feel free to request any movie

var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var omdb = require('omdb');
var omdbApi = require('omdb-client');
var say = require ('say'); 
var fs = require('fs');
var keys = require('./keys.js');
var moment = require('moment');

var client = new Twitter(keys.twitterKey);

// this instructions function only displays instructions when liri command/syntax is incorrect
function instructions(){
	say.speak('Please reed instructions carefully. Example For Spotify, type song name in quotes. Happy Searching!', 'Alex', 1.2);
	var borderLine = '_';
	for (var j = 0; j < 100; j++) {
	  borderLine = borderLine + '_';
	};
	var writeToLog = borderLine + '\n' + 'PLEASE READ INSTRUCTIONS CAREFULLY WHEN ENTERING liri commands in terminal command line:' + '\n';
	writeToLog += "  Search on TWITTER for my TWEETS enter=>  node liri.js my-tweets" + '\n';
	writeToLog += "     Search on SPOTIFY for a SONG enter=>  node liri.js spotify-this-song 'in quotes name of song'" + '\n';
	writeToLog += "    Search on OMDB for MOVIE info enter=>  node liri.js movie-this 'in quotes movie title'" + '\n';
	writeToLog += "                    RANDOM search enter=>  node liri.js do-what-it-says" + '\n' 
	writeToLog += borderLine + '\n';
	console.log(writeToLog);
	logFile(writeToLog);
	return;
};

// -----  Access Twitter API to display tweets  -----
function twitterAPISearch() {
  	var params = {
                	q: 'IvonneKomis',
                	count: 15,
                	since_id: 827428476839923712
              	 };              
  	client.get('search/tweets', params, function(error, tweets, response){
	    if (error) {
			var writeToLog = 'REPORT ERROR MESSAGE to Web Developer ERROR on response: ' + error;
			console.log(writeToLog);
			logFile(writeToLog);
	    }else{
			var numTweets = tweets.statuses.length;
			for (var i = 0; i < numTweets; i++){
				var createdDate = moment(new Date(tweets.statuses[i].created_at)).format('MMM DD YYYY, HH:mm:ss a');
				var tweetLength = tweets.statuses[i].text.length
				var borderLine = '_';
				for (var j = 0; j < tweetLength; j++) {
				  borderLine = borderLine + '_';
				}
				var writeToLog = borderLine + '\n';
				writeToLog += createdDate + '\n';
				writeToLog += tweets.statuses[i].text + '\n';
				writeToLog += borderLine + '\n';
				console.log(writeToLog);
				logFile(writeToLog);
			};
	    }; 
  	});
};

// -----  Access Spotify API to display Song Data  -----
function spotifyAPISearch(songName) { 
	var querySearch = {type: 'track',
					query: songName,
					limit: 1};
	spotify.search(querySearch, function(err, data) {
		if (err) {
		  var writeToLog = ('Error occurred: ' + err);
		  console.log(writeToLog);
		  logFile(writeToLog);
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
			var writeToLog = borderLine + '\n';
			writeToLog += 'ARTIST/BAND.. ' + artist + '\n';
			writeToLog += 'SONG NAME.... ' + song + '\n';
			writeToLog += 'ALBUM NAME... ' + album + '\n';
			writeToLog += 'TO PREVIEW SONG copy/paste URL below into your browser(Chrome, Safari, etc):' + '\n' + preview + '\n';
			writeToLog += borderLine + '\n';
			console.log(writeToLog);
			logFile(writeToLog);
			return;
		};
  	});
};

// ---- Access omdb API to display Movie Data (2/8 API down)  ----
function omdbAPISearch(movie) {
	var params = {
		title: movie,
		incTomatoes: true
	};
	omdbApi.get(params,function(err, data) {
		// console.log(data);
		if (!err){
			borderLine = '_';
			for (var i = 0; i < 100; i++) {
			  borderLine += '_';
			};
			var writeToLog = '\n' + borderLine + '\n' + 'Movie Title: ' + data.Title + '\n';
			writeToLog += 'Year: ' + data.Year + '\n';
			writeToLog += 'imdbRating: ' + data.imdbRating + '\n'
			writeToLog += 'Country: ' + data.Country + '\n'
			writeToLog += 'Language: ' + data.Language + '\n'
			writeToLog += 'Plot: ' + data.Plot + '\n'
			writeToLog += 'Actors: ' + data.Actors + '\n'
			writeToLog += 'Rotten Tomatoes Rating: ' + data.tomatoRating + '\n'
			writeToLog += 'Tomatoes URL: ' + data.tomatoURL + '\n' + borderLine + '\n';			
		}
		else {
			var writeToLog = ' INFORM WEB DEVELOPER CRITICAL ERROR on omdb response for ' + err + '\n';
			writeToLog += ' Parameters used Movie title/Tomatoes: ' + params.title + ' ' + params.incTomatoes;
			
		};
		console.log(writeToLog);
		logFile(writeToLog);
		return;
	});
	
};

// ----------- READ Random.txt File  ------------
function readRandom() {
	fs.readFile('random.txt', 'utf8', function(err, data){
	    var output = data.split(',');
	    var input = output[0];
	    var input2 = output[1]; 
	    var writeToLog = 'Your random request was: ' + input + ' ' + input2;
	    console.log(writeToLog);
	    logFile(writeToLog);
	    mainSwitch(input, input2);
	    return;
	});
};

// -----------  WRITE(append) to log.txt file --------- 
function logFile(logText){	
	fs.appendFileSync("log.txt", logText, encoding='utf8', function(err) {
      	// If an error was experienced we say it.
		if (err) {
			console.log('INFORM WEB DEVELOPER CRITICAL ERROR on logFile Function appendFileSync error ' + err);
		} else {
		  console.log("SAVED to log.txt File");
		};
		return;
  	});
};

// -----------convertSpaces to + signs ---------------------
function convertSpaces(userInput2) {
	var chkForSpaces = ' ';
	var isMultiWord = userInput2.indexOf(chkForSpaces);
	if (isMultiWord > -1) {
		userInput2 = userInput2.split(' ').join('+');
	}
};

// -------------------------------------------------------
// test if commands valid then proceed to switch and run functions

var liriCommands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];
var requireMoreInput = ['spotify-this-song', 'movie-this'];
// Was liri command (argv[2]) entered? If not call instructions
if (process.argv.length < 3 ){
	instructions();
	return;
};

//Is liri command valid? If not call instructions
var userInput = process.argv[2];

var validInput = liriCommands.indexOf(userInput);
if (validInput === -1){
	instructions();
	return;
};

// Check userInput2 if spaces call function to convert to +
var userInput2 = process.argv[3];

if (userInput2){convertSpaces(userInput2);};

mainSwitch(userInput, userInput2);


// Use the switch option to test and run command line functions
function mainSwitch(userInput, userInput2) {
	switch(userInput) {
		case "my-tweets":
		    twitterAPISearch();
		break;
	  
		case "spotify-this-song":
			if (userInput2) {
				spotifyAPISearch(userInput2);
			}
			else {
				// Commented code below response was not consult TA
				userInput2 = 'The+Sign'
				spotifyAPISearch(userInput2);
				instructions(); 
			};
		break;
		case "movie-this":
			if (userInput2) {
				omdbAPISearch(userInput2);
			}
			else {
				userInput2 = 'Mr.+Nobody'
				omdbAPISearch(userInput2);
				instructions(); 
				return;
			};
		break;

		case "do-what-it-says":
			readRandom();
		break;
	};
};
