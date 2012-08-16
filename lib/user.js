var user = function(spec) {
  var that = {};

  that.id = spec.id

  that.session = spec.session;

  that.timeoutTime = 20000;

  that.fire = function() {
    console.log("User " + that.id + " timed out at: " + new Date());
    that.clear();
    that.session.observeTimeoutForUserById(that.id);
  };

  that.clear = function() {
    clearTimeout(that.timeout);
    delete(that.timeout);
  };
    
  that.start = function() {
    that.timeout = setTimeout(function(){ that.fire(); }, that.timeoutTime);
  };


  that.toHash = function() {
    return {userId: that.id, siteId: that.session.site.id, sessionId: that.session.id, timeoutTime: that.timeoutTime };
  };

  that.toJson = function() {
    return JSON.stringify( that.toHash() );
  };

  that.ping = function() {
    currentTime = new Date();
    fireTime = new Date();  
    fireTime.setMilliseconds(that.timeoutTime);
    console.log("Ping received for user: " + that.id + ' at: ' + currentTime + ' fire at: ' + fireTime );
    that.clear();
    that.start();
  };

  return that;
};

module.exports = user;
