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
		console.log(snapshot.val().matches);
		cache.put('matches', snapshot.val().matches);
		cache.put('players', snapshot.val().players);
		cache.put('coaches', snapshot.val().coaches);
	});
	res.render('index', { title: 'Fjellhamar Jenter 07'});
};


schedule.scheduleJob({hour: 19, minute: 15}, function(){
	console.log("scheduled job: Announce Matches");
	var matches = cache.get('matches');
	var players = cache.get('players');
	var coaches = cache.get('coaches');
	
	matchNotifications.announceMatches(matches, players, coaches);
});

/**
schedule.scheduleJob({hour: 20, minute: 48}, function(){
	console.log('shedule job: AssignMatchesToPlayers');
	var players = cache.get('players');
	var matches = cache.get('matches');
	console.log("matches " + JSON.stringify(matches, null,2));
	matchNotifications.assignMatchesToPlayers(matches, players);
});
 */