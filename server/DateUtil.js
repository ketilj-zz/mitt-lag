var moment = require('moment');

module.exports.format = function(dateString, format) {
    return moment(dateString, 'MM/DD/YYYY').format('DD.MM.YYYY');
}