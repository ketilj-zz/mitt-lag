var express = require('express');
var router = express.Router();
var controller = require('../server/Controller');


/* GET home page. */

router.get('/', function(req, res) {
  controller.homepage(req, res);
});

module.exports = router;
