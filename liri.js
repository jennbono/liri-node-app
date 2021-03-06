var keys = require("./keys.js");

var liri = process.argv[2];
var liriData = process.argv[3];

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "3cedff4244b040299c0f2729de487c0e",
  secret: "cf37d454a8c44abba3f36e26643f0ec8"
});
	
function spot (liriData) {
	spotify.search({type: 'track', query: liriData}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		console.log(data.tracks.items[0].artists[0].name);
		console.log(data.tracks.items[0].name);
		console.log(data.tracks.items[0].external_urls.spotify);
		console.log(data.tracks.items[0].album.name); 
	});
};

function twitter (liriData) { 
	var Twitter = require('twitter');
	var client = new Twitter({
	  consumer_key: keys.consumer_key,
	  consumer_secret: keys.consumer_secret,
	  access_token_key: keys.access_token_key,
	  access_token_secret: keys.access_token_secret
	});
	var params = {screen_name: 'jenn_bono24'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < tweets.length; i++){
	  		console.log(tweets[i].text);
	  		console.log(tweets[i].created_at);
	    	
	  	}
	  }
	});
}

function omdb (liriData) {
	var request = require('request');
	var queryUrl = "http://www.omdbapi.com/?t=" + liriData + "&y=&plot=short&apikey=40e9cece";
	request(queryUrl, function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	    console.log(JSON.parse(body).Title);
	    console.log(JSON.parse(body).Year);
	    console.log(JSON.parse(body).imdbRating);
	    console.log(JSON.parse(body).Ratings[1].Value);
	    console.log(JSON.parse(body).Country);
	    console.log(JSON.parse(body).Language);
	    console.log(JSON.parse(body).Plot);
	    console.log(JSON.parse(body).Actors);
	  }
	});
	
}
	
function doWhatItSays (liriData) {	
	var fs = require('fs');
	fs.readFile('random.txt', 'utf8', function (err, data) {
	  if (err) throw err;
	  var tokens = data.split(",");
	  control(tokens[0], tokens[1]);
	});

}

function control (liri, liriData) {
	switch (liri) {
		case 'spotify-this-song':
			if (liriData === "" || liriData === null || liriData === undefined) {
				liriData = "Pardon Me";
			}
			spot(liriData);
			break;
		case 'my-tweets':
			twitter(liriData);
			break;
		case 'movie-this':
			if (liriData === "" || liriData === null || liriData === undefined) {
			liriData = "Mr. Nobody";
			}
			omdb(liriData);
			break;
		case 'do-what-it-says':
			doWhatItSays(liriData);
			break;
		default:
			console.log("You did not choose a valid statement.");
	}
}

control(liri, liriData);