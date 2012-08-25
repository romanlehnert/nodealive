var user = require('./user');
var moment = require('moment');
var rest = require('restler');
var sys = require('util');
var retry = require('retry');

var session = function(spec) {
  var that = {};

  that.users = {};

  that.id = spec.id;
  
  that.site = spec.site;

  that.timeoutTime = 20000;

  that.minLimit = 2;

  that.parsedCallbackUrl = function(action) {
    return that.site.callbackUrl.replace(/\:sessionId/g,that.id);
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
      that.faultyNotifySessionEnd();
    }
  };

  that.observePingForUserbyId = function(id) {
    var oldcount = that.usersCount();
    var user = that.findOrCreateUserById(id);
    var newcount = that.usersCount();

    user.ping();

    if ((newcount >= that.minLimit) && (oldcount < that.minLimit)) {
      that.faultyNotifySessionStart();
    }

    if (newcount >= that.minLimit) {
      //that.ping();
    }
    return that.users[id];
  };

  that.faultyNotifySessionStart = function() {
    console.log("Session Started! Posting to: " + that.parsedCallbackUrl());
    var operation = retry.operation();

    operation.attempt(function(){

      rest.post( 
          that.parsedCallbackUrl(), 
          { data: {'action_type': 'start', 'api_key': that.site.api_key } }
        )
        .on('complete', function(data) { })
        .on('error', function(err,resp) { 
          console.log("gonna retry... because i could not reach the server and post that the session has started");
          operation.retry(err);
      });

    });

  };

  that.faultyNotifySessionEnd = function() {
    console.log("Session ended! Posting to: " + that.parsedCallbackUrl());
    var operation = retry.operation();

    operation.attempt(function(){

      rest.post( 
          that.parsedCallbackUrl(), 
          { data: {'action_type': 'end', 'api_key': that.site.api_key } }
        )
        .on('complete', function(data) { })
        .on('error', function(err,resp) { 
          console.log("gonna retry... because i could not reach the server and post that the session has ended");
          operation.retry(err);
      });

    });

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
