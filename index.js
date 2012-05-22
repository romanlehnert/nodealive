var app = require('express').createServer();
var sites = require('./lib/sitescollection')();
var port = process.env.PORT || 3000;

// Setup some sites:
var palabea = sites.createSite({id: "palabea", callbackUrl: "http://google.com/timeout/:userId"});
var apple   = sites.createSite({id: "apple", callbackUrl: "http://apple.com/timeoutuser/:userId"});


app.get('/sites/:siteId/users/:userId/ping', function(req,res){

  var site = sites.findOrCreateById(req.params.siteId);
  var user = site.findOrCreateUserById(req.params.userId);

  user.ping();

  res.send(user.toJson());

});



app.listen(port);
