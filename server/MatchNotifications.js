'use strict';

var _ = require('lodash');
var moment = require('moment');
var email = require('./Email');
var dateUtil = require('./DateUtil');

module.exports.assignMatchesToPlayers = function(matches, players) {
	_.forEach(players, function(player) {
		var matchesForPlayer = findMatches(matches, player);
		_.assign(player, matchesForPlayer);
		console.log('player: ' + player.name + JSON.stringify(player, null, 2));
		email.sendFixtureList(player, matchesForPlayer);
	});
};

/*
module.exports.fixtureListBatch = function(matches, players) {
	
	_.forEach(players, function(player) {
		var matches = findMatches(matches, player);
		email.sendFixtureList(player, matches);
	});
};*/

module.exports.announceMatches = function(matches, players, coaches) {
	var matchesToAnnounce = findMatchesToAnnounce(matches);
	
	_.forEach(matchesToAnnounce, function(match) {
		var playing = findPlayersForMatch(match, players);
		var coaching = findCoachesForMatch(match, coaches);
		email.sendMatchEmail(match, playing, coaching);
	});
};

function findPlayersForMatch(match, players) {
	return _.filter(players, function(player) {
		if (_.includes([match.group1, match.group2], player.group)) {
			return player;
		}
	});
};

function findCoachesForMatch(match, coaches) {
	return _.filter(coaches, function(coach) {
		console.log(match.group  + " " + coach.group);
		if (_.includes([match.group1, match.group2], coach.group)) {
			return coach;
		}
	});
};

function findMatchesForPlayer(matches, player) {
	return _.filter(matches, function(match) {
		if (_.includes([match.group1, match.group2], player.group)) {
			var prettyDate = moment(match.date, 'DD.MM.YYYY');
			console.log("prettyDate " + prettyDate);
			_.assign(match, {prettyDate: prettyDate});
			return match;
		}
	});
};

function findMatchesToAnnounce(matches) {
	return _.filter(matches, function(match) {
		if (dateUtil.isDateInOneDay(match.date)) {
			return match;
		}
	});
};

function findMatches(matches, player) {
	var m = _.filter(matches, function(match) {
		if (_.includes([match.group1, match.group2], player.group)) {
			var prettyDate = dateUtil.format(match.date, "DD.MM.YYYY");
			_.assign(match, {prettyDate: prettyDate});
			return match;
		}
	});
	
	console.log("matches -> ");
	console.log(JSON.stringify(m, null, 2));
	return m;
};

module.exports.findMatches = function (matches, player) {
	return _.filter(matches, function(match) {
		if (_.includes([match.group1, match.group2], player.group)) {
			var prettyDate = dateUtil.format(match.date, "DD.MM.YYYY");
			_.assign(match, {prettyDate: prettyDate});
			return match;
		}
	});
}