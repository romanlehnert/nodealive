var user = require('./user');

var site = function(spec) {
  var that = {};

  that.users = {};

  that.id = spec.id;

  that.callbackUrl = spec.callbackUrl || "http://localhost/bla";

  that.usersCount = function() {
    return Object.keys(that.users).length;
  };

  that.addUser = function(user) {
    that.users[user.id] = user;
  };

  that.findUser = function(id) {
    return that.users[id];
  };

  that.findOrCreateUserById = function(id) {
    if (typeof(that.users[id]) == "undefined") {
      that.users[id] = user({id: id, site: that});
    }
    return that.users[id];
  };

  return that;
};

module.exports = site;
