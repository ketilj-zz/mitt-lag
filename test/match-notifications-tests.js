var assert = require('chai').assert;
var player = require('../server/MatchNotifications');
var p = {
    player: 'Lina Jegtnes', firstName: 'Lina', group: 'Rosa', email: 'ketilj@gmail.com,pjegtnes@gmail.com'
};
var matches = [
    {
        awayTeam: 'Fjellhamar Hvit',
        date: '4/13/2016',
        day: 'onsdag',
        group1: "Rosa",
        group2: "Blå",
        homeTeam: 'Lillestrøm',
        location: 'Vigernesjordet',
        time: '19:00'
    }
];

describe('Player tests', function() {
    describe('find matches for Lina', function () {
        it('should return a list of matches for Lina who plays in Pink group', function () {
             
            var matchesToPlay = player.findMatches(matches, p);
            console.log("---> " + JSON.stringify(matchesToPlay, null, 2));
            var match1 = matchesToPlay[0];
            assert.equal(match1.day, 'onsdag');
            assert.equal(match1.prettyDate, '13.04.2016');
        });
    });
});