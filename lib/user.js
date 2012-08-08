var user = function(spec) {
  var that = {};

  that.id = spec.id

  that.session = spec.session;

  that.toHash = function() {
    return {userId: that.id, siteId: that.session.site.id, sessionId: that.session.id, timeoutTime: that.timeoutTime };
  };

  that.toJson = function() {
    return JSON.stringify( that.toHash() );
  };

  that.ping = function() {
    that.session.ping();
  };

  return that;
};

module.exports = user;
