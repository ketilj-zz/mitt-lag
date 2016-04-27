var postmark = require("postmark");
var client = new postmark.Client("8e1d7050-2645-4060-971b-fb7631696c37");
var _ = require('lodash');
var moment = require('moment');

module.exports.sendEmail = function(match, players, coaches) {
    console.log("matches " + JSON.stringify(match, null));
    var to = _.map(players, 'email1');
    console.log("---> " + to);
    
    var opposition = getOppositionTeam(match);
    var meetingInfo = getMeetingInfo(match);
    var date = moment(match.date).format('DD.MM.YYYY');
    console.log("---> " + meetingInfo);
    console.log(JSON.stringify(coaches, null, 2));
    
    /*client.sendEmailWithTemplate({
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
        }*/
    });
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