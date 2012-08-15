var app = require('express').createServer();
var sites = require('./lib/sitescollection')();

var port = process.env.PORT || 3001;

var palabea = sites.addSite({id: "palabea", callbackUrl: "http://localhost:3000/api/durations/:sessionId", api_key: "bla"});

app.get('/sites/:siteId/sessions/:sessionId/users/:userId/ping', function(req,res){

  var site = sites.findOrCreateById(req.params.siteId);
  var session = site.findOrCreateSessionById(req.params.sessionId);
  var user = session.observePingForUserbyId(req.params.userId);

  res.send(user.toJson());

});

app.listen(port);
