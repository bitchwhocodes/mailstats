var express = require('express');
var router = express.Router();
var url = require('url');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var code = url_parts.query.code;
  console.log("Code: " + code);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write('<p>Received auth code: ' + code + '</p>');
  res.end();
});


module.exports = router;



