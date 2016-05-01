var postmark = require("postmark");
var client = new postmark.Client("8e1d7050-2645-4060-971b-fb7631696c37");
var _ = require('lodash');
var moment = require('moment');
var dateUtil = require('./DateUtil');

module.exports.sendMatchEmail = function(match, players, coaches) {
    var opposition = getOppositionTeam(match);
    var meetingInfo = getMeetingInfo(match);
    var date = dateUtil.format(match.date, "DD.MM.YYYY");
    var parents = this.parentsToNotify(players);
    client.sendEmailWithTemplate({
        "From": "ketil@leverage51.no",
        "To": "ketilj@gmail.com",
        "TemplateId": 583784,
        "TemplateModel": {
            "motstander": opposition,
            "dato": date,
            "tid": match.time,
            "sted": match.location,
            "trener": "Ketil",
            "telefon": "97172278",
            "mail": "ketilj@gmail.com",
            "info": meetingInfo,
            "trainer": coaches
        }
    });
};

module.exports.parentsToNotify = function(players) {
    return _.map(players, "email").toString(); 
};

module.exports.sendFixtureList = function(player, playing) { 
    if (player.firstName === "Lina" || player.firstName === 'Helmine' 
        || player.firstName === 'Amanda' || player.firstName === 'Kaja') {
        client.sendEmailWithTemplate({
            "From": "ketil@leverage51.no",
            "To": player.email,
            "TemplateId": 594221,
            "TemplateModel": {
                "player": {
                    "name": player.firstName,
                    "group": player.group
                },
                "match": playing
            }
        }, function(error, success) {
            if(error) {
                console.error("Unable to send via postmark: " + error.message);
                return;
            }
            console.info("Sent to postmark for delivery")
        });
    }
};

function getMeetingInfo(match) {
    if (isHomeMatch(match)) {
       return "Oppmøte 30 min før kampstart";
   } else {
       return "Oppmøte 1 time før ved Fjellhamar kirke. For de som møter direkte er det oppmøte 30 minutter før kampstart.";
   }
};

function getOppositionTeam(match) {
   if (isHomeMatch(match)) {
       return match.awayTeam;
   } else {
       return match.homeTeam;
   }
};

function isHomeMatch(match) {
    return match.homeTeam.startsWith('Fjellhamar');
}