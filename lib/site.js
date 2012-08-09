var session = require('./session');

var site = function(spec) {

  spec = spec || {};

  var that = {};

  that.sessions    = {};
  that.id          = spec.id || undefined;
  that.callbackUrl = spec.callbackUrl || undefined;

  that.sessionsCount = function() {
    return Object.keys(that.sessions).length;
  };

  that.addSession = function(session) {
    if(typeof(session.id) == "undefined") {
      throw "Argument Error";
    } else {
      that.sessions[session.id] = session;
      return true;
    }
  };

  that.findSession = function(id) {
    return that.sessions[id];
  };

  that.findOrCreateSessionById = function(id) {
    if (typeof(that.sessions[id]) == "undefined") {
      that.sessions[id] = session({id: id, site: that});
    }
    return that.sessions[id];
  };

  return that;
};

module.exports = site;
