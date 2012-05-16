var user = function(spec) {
  var that = {};

  that.id = spec.id

  that.timeout;

  that.site = spec.site;

  that.timeoutTime = 5000;

  that.clear = function() {
    clearTimeout(that.timeout);
    delete(that.timeout);
  };

  that.start = function() {
    that.timeout = setTimeout(function(){ that.fire(); }, that.timeoutTime);
  };

  that.toHash = function() {
    return {userId: that.id, siteId: that.site.id, timeoutTime: that.timeoutTime };
  };

  that.toJson = function() {
    return JSON.stringify( that.toHash() );
  };

  that.fire = function() {
    //action goes here
    console.log("TimeOut Fired for site: " + that.site.id + ', user: ' + that.id + ' at: ' + new Date());
    that.clear();
  };

  that.ping = function() {
    currentTime = new Date();
    fireTime = new Date();  
    fireTime.setMilliseconds(that.timeoutTime);
    console.log("Ping received for site: " + that.site.id + ', user: ' + that.id + ' at: ' + currentTime + ' fire at: ' + fireTime );
    that.clear();
    that.start();
  };

  return that;
};

module.exports = user;
