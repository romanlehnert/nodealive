var app = require('express').createServer();
var sites = require('./lib/sitescollection')();

var port = process.env.PORT || 5000;

sites.addSite({id: "palabea-develop", callbackUrl: "http://localhost:3000/api/durations/:sessionId", api_key: "develop"});
sites.addSite({id: "palabea-test", callbackUrl: "http://localhost:3001/api/durations/:sessionId", api_key: "test"});
sites.addSite({id: "palabea-testing", callbackUrl: "http://aebalap:secret!@testing.palabea.com/api/durations/:sessionId", api_key: "testing"});
sites.addSite({id: "palabea-staging", callbackUrl: "http://staging.palabea.com/api/durations/:sessionId", api_key: "staging"});
sites.addSite({id: "palabea-production", callbackUrl: "http://palabea.com/api/durations/:sessionId", api_key: "ssecret thing here"});

app.get('/sites/:siteId/sessions/:sessionId/users/:userId/ping', function(req,res){

  var site = sites.findOrCreateById(req.params.siteId);
  var session = site.findOrCreateSessionById(req.params.sessionId);
  var user = session.observePingForUserbyId(req.params.userId);

  res.header("Access-Control-Allow-Origin", "*");
  res.send(user.toJson());

});

app.listen(port);
