var assert = require('chai').assert;
var notifications = require('../server/Email');
var players = [
    {
        player: 'Lina Jegtnes', firstName: 'Lina', group: 'Rosa', email: 'ketilj@gmail.com,pjegtnes@gmail.com'
    },
    {
        player: 'Kaja Nydal', firstName: 'Kaja', group: 'Blå', email: 'test1@gmail.com'    
    }
];
describe('Player tests', function() {
    describe('find parents to send mail to', function () {
        it('should return a list of emails for parents to a player group', function () {
             
            var parentsToNotify = notifications.parentsToNotify(players);
            assert.equal(parentsToNotify, 'ketilj@gmail.com,pjegtnes@gmail.com,test1@gmail.com');
        });
    });
});