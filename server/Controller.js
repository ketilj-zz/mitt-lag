var Firebase = require('firebase');
var fbRef = new Firebase('https://teamkom.firebaseio.com/matches');

var api_key = 'key-9813a87e1448c51b12f4e90f3f078ae8';
var domain = 'sandbox00e0ac6a706f4059962d0696a0d2245d.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports.homepage = function(req, res) {
	var matches = fetchMatches();
	console.log(matches);
	res.render('index', { title: 'Fjellhamar Jenter 07', matches: matches });
};


function fetchMatches() {
	var matches = fbRef.once("value", function(snapshot) {
		return snapshot.val();
	});
	console.log("--> "+ JSON.stringify(matches));
	return matches;
};

fbRef.on('child_added', function(snapshot, prevchildname){

    var data = {
	  from: 'Ketil Jensen <postmaster@sandbox00e0ac6a706f4059962d0696a0d2245d.mailgun.org	>',
	  to: 'ketilj@gmail.com',
	  subject: 'Hello',
	  text: 'Testing some Mailgun awesomness!'
	};

	mailgun.messages().send(data, function (error, body) {
	  console.log(body);
	});

});