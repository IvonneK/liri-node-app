// Coder: Ivonne Komis
// Purpose: use LIRI language interpretation and recognition to send 
// requests
// API used: twitter, spotify and IMDB
// use api keys for twitter from keys.js 
// tested able to read keys (./ added)

var request = require('request');
var twitter = require('twitter');
var fs = require('fs');
var keys = require('./keys.js');

var keyList = keys.twitterKey;
for (var key in keyList) {
	console.log(key + ': ' + keyList[key]);
}


// console.log('')
// // "my-tweets"
// // "spotify-this-song"
// // "move-this"
// // "do-what-it-says"

// // node.liri.js my-tweets
// // this should show your last 20 tweets


