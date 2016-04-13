
var express = require('express');
var router = express.Router();

var auth = require('../auth/authHelper');

router.get('/', function(req, res, next) {
  console.log("Request handler 'home' was called.");
  res.setHeader("Content-Type", "text/html");
  res.write('<p>Please <a href="' + auth.getAuthUrl() + '">sign in</a> with your Office 365 or Outlook.com account.</p>');
  res.end();
});



module.exports = router;
