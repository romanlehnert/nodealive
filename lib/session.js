var user = require('./user');
var moment = require('moment');

var session = function(spec) {
  var that = {};

  that.users = {};

  that.id = spec.id;
  
  that.site = spec.site;

  that.timeoutTime = 2000;

  that.parsedCallbackUrl = function() {
    return that.site.callbackUrl.replace(/\:userId/g,that.id).replace(/\:sessionId/g,that.id);
  };

  that.fire = function() {
    console.log("TimeOut Fired for site: " + that.site.id + ', user: ' + that.id + ' at: ' + new Date());
    console.log("Calling " + that.parsedCallbackUrl());

    that.clear();
  };

  that.ping = function() {
    currentTime = new Date();
    fireTime = new Date();  
    fireTime.setMilliseconds(that.timeoutTime);
    console.log("Ping received for site: " + that.site.id + ', session: ' + that.id + ' at: ' + currentTime + ' fire at: ' + fireTime );
    that.clear();
    that.start();
  };

  that.start = function() {
    that.timeout = setTimeout(function(){ that.fire(); }, that.timeoutTime);
  };

  that.usersCount = function() {
    return Object.keys(that.users).length;
  };

  that.clear = function() {
    clearTimeout(that.timeout);
    delete(that.timeout);
  };


  that.addUser = function(user) {
    that.users[user.id] = user;
  };

  that.findUser = function(id) {
    return that.users[id];
  };

  that.findOrCreateUserById = function(id) {
    if (typeof(that.users[id]) == "undefined") {
      that.users[id] = user({id: id, session: that});
    }
    return that.users[id];
  };

  that.removeUserById = function(id) {
    if (typeof(that.users[id]) != "undefined") {
      delete(that.users[id]);
    }
  };

  return that;
};

module.exports = session;
