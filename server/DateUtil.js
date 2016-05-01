var moment = require('moment');

module.exports.format = function(dateString, format) {
    return moment(dateString, 'MM/DD/YYYY').format('DD.MM.YYYY');
};

module.exports.isDateInTwoDays = function(date) {
	var matchDate = moment(date, 'MM/DD/YYYY');
	var now = moment();
	var twoDaysAhead = now.add(2, 'days');
	return moment(now).isSame(matchDate, 'day');
};