var assert = require('chai').assert;
var matchNotifications = require('../server/MatchNotifications');


describe('Player tests', function() {
    describe('find matches for Lina', function () {
        it('should return a list of matches for Lina who plays in Pink group', function () {
             var player = {
            name: 'Lina Jegtnes', firstName: 'Lina', group: 'Rosa', email: 'ketilj@gmail.com,pjegtnes@gmail.com'
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
            var matches = matchNotifications.findMatches(matches, player);
            var match1 = matches[0];
            assert.equal(match1.day, 'onsdag');
            assert.equal(match1.prettyDate, '13.04.2016');
        });
    });
});