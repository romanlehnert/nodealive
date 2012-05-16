var app = require('express').createServer();
var sites = require('./lib/sitescollection')();



app.get('/sites/:siteId/users/:userId/ping', function(req,res){

  var site = sites.findOrCreateById(req.params.siteId);
  var user = site.findOrCreateUserById(req.params.userId);

  user.ping();

  res.send(user.toJson());

});



app.listen(3000);
