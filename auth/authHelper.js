var credentials = {
  clientID: process.env.CLIENT_ID,
  clientSecret:process.env.CLIENT_SECRET,
  site: "https://login.microsoftonline.com/common",
  authorizationPath: "/oauth2/v2.0/authorize",
  tokenPath: "/oauth2/v2.0/token"
}
var oauth2 = require("simple-oauth2")(credentials);

var redirectUri = process.env.CALLBACK_URL;

// The scopes the app requires
var scopes = [ "openid",
               "https://outlook.office.com/mail.read" ];

function getAuthUrl() {
  var returnVal = oauth2.authCode.authorizeURL({
    redirect_uri: redirectUri,
    scope: scopes.join(" ")
  });
  console.log("Generated auth url: " + returnVal);
  return returnVal;
}

exports.getAuthUrl = getAuthUrl;