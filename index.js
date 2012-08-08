var app = require('express').createServer();
var sites = require('./lib/sitescollection')();

var port = process.env.PORT || 3000;

// Setup some sites:
var palabea = sites.createSite({id: "palabea", callbackUrl: "http://google.com/timeout/:sessionId/:userId"});



app.get('/sites/:siteId/rooms/:roomId/build', function(req,res){

  var site = sites.findOrCreateById(req.params.siteId);
  var session = site.findOrCreateSessionById(req.params.sessionId);

  console.log(req.query)

});

app.get('/sites/:siteId/sessions/:sessionId/users/:userId/ping', function(req,res){

  var site = sites.findOrCreateById(req.params.siteId);
  var session = site.findOrCreateSessionById(req.params.sessionId);
  var user = session.findOrCreateUserById(req.params.userId);

  user.ping();
  res.send(user.toJson());

});



app.listen(port);
