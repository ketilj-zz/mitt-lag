var Firebase = require('firebase');
var firebaseUrl = 'https://teamkom.firebaseio.com';
var schedule = require('node-schedule');
var cache = require('memory-cache');
var _ = require('lodash');
var matchNotifications = require('./MatchNotifications');

module.exports.homepage = function(req, res) {
	var fbRef = new Firebase(firebaseUrl);
	fbRef.once("value", function(snapshot) {
		console.log(snapshot.val().coaches);	
		cache.put('matches', snapshot.val().matches);
		cache.put('players', snapshot.val().players);
		cache.put('coaches', snapshot.val().coaches);
	});
	res.render('index', { title: 'Fjellhamar Jenter 07'});
};

schedule.scheduleJob({hour: 14, minute: 00}, function(){
	console.log("scheduled job: Announce Matches");
	var matches = cache.get('matches');
	var players = cache.get('players');
	var coaches = cache.get('coaches');
	
	matchNotifications.announceMatches(matches, players, coaches);
});

/*
schedule.scheduleJob({hour: 09, minute: 39}, function(){
	console.log('shedule job: AssignMatchesToPlayers');
	var players = cache.get('players');
	var matches = cache.get('matches');
	matchNotifications.assignMatchesToPlayers(matches, players);
});
*/