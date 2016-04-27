var Firebase = require('firebase');
var firebaseUrl = 'https://teamkom.firebaseio.com';
var notifications = require('./server/Notifications');
var cron = require('node-schedule');
var cache = require('memory-cache');
var _ = require('lodash');
var moment = require('moment');

var rule = new cron.RecurrenceRule();
rule.second = 5;

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

cron.scheduleJob(rule, function() {
	var matches = cache.get('matches');
	var matchesInTwoDays = _.filter(matches, function(match) {
		if (isMatchInTwoDays(match)) {
			return match;
		}
	});
	
	var players = cache.get('players');
	var coaches = cache.get('coaches');
	
	_.forEach(matchesInTwoDays, function(match) {
		//get the players who is going to players
		var playing = _.filter(players, function(player) {
			if (_.includes([match.group1, match.group2], player.group)) {
				return player;
			}
		});
		
		var coaching = _.filter(coaches, function(coach) {
			console.log(match.group  + " " + coach.group);
			if (_.includes([match.group1, match.group2], coach.group)) {
				return coach;
			}
		});
		
		notifications.sendEmail(match, playing, coaching);
	});
});

function isMatchInTwoDays(match) {
	var matchDate = moment(match.date, 'MM/DD/YYYY');
	var now = moment();
	var twoDaysAhead = now.add(2, 'days');
	return moment(now).isSame(matchDate, 'day');
};

/*
fbRef.on('child_added', function(snapshot, prevchildname){
	var matches = snapshot.val();
});
*/