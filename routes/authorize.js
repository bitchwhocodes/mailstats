var express = require('express');
var router = express.Router();
var url = require('url');
var authHelper = require('../auth/authHelper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var code = url_parts.query.code;
  var token = authHelper.getTokenFromCode(code, tokenReceived, res);
  //console.log("Code: " + code);
  //res.writeHead(200, {"Content-Type": "text/html"});
  //res.write('<p>Received auth code: ' + code + '</p>');
 // res.end();
});


function tokenReceived(response, error, token) {
  if (error) {
    console.log("Access token error: ", error.message);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<p>ERROR: ' + error + '</p>');
    response.end();
  }
  else {
    var cookies = ['node-tutorial-token=' + token.token.access_token + ';Max-Age=3600',
                   'node-tutorial-email=' + authHelper.getEmailFromIdToken(token.token.id_token) + ';Max-Age=3600'];
    response.setHeader('Set-Cookie', cookies);
    response.render('authorize', {isAuthorized:true});
  }
}


module.exports = router;



