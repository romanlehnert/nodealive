var user = require('./user');
var moment = require('moment');

var session = function(spec) {
  var that = {};

  that.users = {};

  that.id = spec.id;
  
  that.site = spec.site;

  that.timeoutTime = 2000;

  that.minLimit = 2;

  that.parsedCallbackUrl = function() {
    return that.site.callbackUrl.replace(/\:userId/g,that.id).replace(/\:sessionId/g,that.id);
  };

  that.usersCount = function() {
    return Object.keys(that.users).length;
  };

  that.clear = function() {
    clearTimeout(that.timeout);
    delete(that.timeout);
  };


  that.observeTimeoutForUserById = function(id) {
    var oldcount = that.usersCount();
    that.removeUserById(id);
    var newcount = that.usersCount();

    if ((oldcount >= that.minLimit) && (newcount < that.minLimit)) {
      that.notifySessionEnd();
    }
  };

  that.observePingForUserbyId = function(id) {
    var oldcount = that.usersCount();
    var user = that.findOrCreateUserById(id);
    var newcount = that.usersCount();

    user.ping();

    if ((newcount >= that.minLimit) && (oldcount < that.minLimit)) {
      that.notifySessionStart();
    }

    if (newcount >= that.minLimit) {
      //that.ping();
    }
    return that.users[id];
  };

  that.notifySessionStart = function() {
    console.log("Session Started!");
  };

  that.notifySessionEnd = function() {
    console.log("Session Ended");
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
