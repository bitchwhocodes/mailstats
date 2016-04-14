
var express = require('express');
var router = express.Router();

var auth = require('../auth/authHelper');

router.get('/', function(req, res, next) {
    
  if(checkForCoookie()){
      // we could redirect or put in a template
      res.redirect("/mail");
  }else{
      //TODO Replace this with a jade template
    console.log("Request handler 'home' was called.");
    var data ={};
    data.isAuthorized=false;
    data.redirecturl =  auth.getAuthUrl();
    data.redirectlink = "Please sign in with your Office 365 or Outlook.com account";
    res.render('authorize', data);
  }
  
});

function checkForCoookie(){
    var cookie = ['node-tutorial-token'];
    console.log("looking for cookie"+cookie);
    
    var hasCookie = cookie!=null && cookie.length>1;
    return hasCookie;
    
}



module.exports = router;
