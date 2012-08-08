var session = require('./session');

var site = function(spec) {
  var that = {};

  that.sessions = {};

  that.id = spec.id;

  that.callbackUrl = spec.callbackUrl || "http://localhost/bla";

  that.sessionsCount == function() {
    return Object.keys(that.sessions).length;
  };

  that.addSession = function(session) {
    that.sessions[session.id] = session;
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
