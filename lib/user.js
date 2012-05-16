var user = function(spec) {
  var that = {};

  that.id = spec.id

  that.timeout;

  that.site = spec.site;

  that.timeoutTime = 20000;

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

  that.parsedCallbackUrl = function() {
    return that.site.callbackUrl.replace(/\:userId/g,that.id).replace(/\:siteId/g,that.site.id);
  };

  that.fire = function() {
    console.log("TimeOut Fired for site: " + that.site.id + ', user: ' + that.id + ' at: ' + new Date());
    console.log("Calling " + that.parsedCallbackUrl());
    //action goes here

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
