var app = require('express').createServer();
var sites = require('./lib/sitescollection')();
var retry = require('retry');

var port = process.env.PORT || 5000;

var apiKeys = {}

apiKeys["production"] = process.env.API_KEY_PRODUCTION || "changeme"
apiKeys["staging"]    = process.env.API_KEY_STAGING    || "changeme"
apiKeys["testing"]    = process.env.API_KEY_TESTING    || "testing"
apiKeys["test"]       = process.env.API_KEY_TEST       || "test"
apiKeys["develop"]    = process.env.API_KEY_DEVELOP    || "develop"

sites.addSite({id: "palabea-develop", callbackUrl: "http://localhost:3000/api/durations/:sessionId", api_key: apiKeys.develop});
sites.addSite({id: "palabea-test", callbackUrl: "http://localhost:3001/api/durations/:sessionId", api_key: apiKeys.test});
sites.addSite({id: "palabea-testing", callbackUrl: "http://aebalap:secret!@testing.palabea.com/api/durations/:sessionId", api_key: apiKeys.testing});
sites.addSite({id: "palabea-staging", callbackUrl: "http://staging.palabea.com/api/durations/:sessionId", api_key: apiKeys.staging });
sites.addSite({id: "palabea-production", callbackUrl: "http://palabea.com/api/durations/:sessionId", api_key: apiKeys.production});

app.get('/sites/:siteId/sessions/:sessionId/users/:userId/ping', function(req,res){

  var site = sites.findOrCreateById(req.params.siteId);
  var session = site.findOrCreateSessionById(req.params.sessionId);
  var user = session.observePingForUserbyId(req.params.userId);

  res.header("Access-Control-Allow-Origin", "*");
  res.send(user.toJson());

});

app.listen(port);
