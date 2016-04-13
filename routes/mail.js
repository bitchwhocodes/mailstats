var express = require('express');
var router = express.Router();
var url = require('url');
var outlook = require("node-outlook");
var messages = [];

router.get('/', function(request, response, next) {
  var token = getValueFromCookie('node-tutorial-token', request.headers.cookie);
  console.log("Token found in cookie: ", token);
  var email = getValueFromCookie('node-tutorial-email', request.headers.cookie);
  console.log("Email found in cookie: ", email);
  if (token) {  
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<div><h1>Your inbox</h1></div>');
    
    var queryParams = {
      '$select': 'Subject,ReceivedDateTime,From',
      '$orderby': 'ReceivedDateTime desc',
      '$top': 10
    };
    // Set the API endpoint to use the v2.0 endpoint
    outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0');
    // Set the anchor mailbox to the user's SMTP address
    outlook.base.setAnchorMailbox(email);

    outlook.mail.getMessages({token: token, odataParams: queryParams},
      function(error, result){
        if (error) {
          console.log('getMessages returned an error: ' + error);
          response.write("<p>ERROR: " + error + "</p>");
          response.end();
        }
        else if (result) {
          console.log('getMessages returned ' + result.value.length + ' messages.');
          response.write('<table><tr><th>From</th><th>Subject</th><th>Received</th></tr>');
          result.value.forEach(function(message) {
            console.log('  Subject: ' + message.Subject);
            var from = message.From ? message.From.EmailAddress.Name : "NONE";
            response.write('<tr><td>' + from + 
              '</td><td>' + message.Subject +
              '</td><td>' + message.ReceivedDateTime.toString() + '</td></tr>');
          });
          
          response.write('</table>');
          response.end();
        }
      });
  }
  else {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<p> No token found in cookie!</p>');
    response.end();
  }


});

function getValueFromCookie(valueName, cookie) {
  if (cookie.indexOf(valueName) !== -1) {
    var start = cookie.indexOf(valueName) + valueName.length + 1;
    var end = cookie.indexOf(';', start);
    end = end === -1 ? cookie.length : end;
    return cookie.substring(start, end);
  }
}

function getMail(skip){
    
    
    var queryParams = {
      '$select': 'Subject,ReceivedDateTime,From',
      '$orderby': 'ReceivedDateTime desc',
      '$top': 100,
    };
    outlook.base.setAnchorMailbox(email);
    outlook.mail.getMessages({token: token, odataParams: queryParams},
      function(error, result){
        if (error) {
          console.log('getMessages returned an error: ' + error);
          response.write("<p>ERROR: " + error + "</p>");
          response.end();
        }
        else if (result) {
          console.log('getMessages returned ' + result.value.length + ' messages.');
          response.write('<table><tr><th>From</th><th>Subject</th><th>Received</th></tr>');
          result.value.forEach(function(message) {
            console.log('  Subject: ' + message.Subject);
            var from = message.From ? message.From.EmailAddress.Name : "NONE";
            response.write('<tr><td>' + from + 
              '</td><td>' + message.Subject +
              '</td><td>' + message.ReceivedDateTime.toString() + '</td></tr>');
          });
          
          response.write('</table>');
          response.end();
        }
      });
    
}

module.exports = router;



