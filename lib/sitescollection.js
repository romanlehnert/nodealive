var site = require('./site');

var sitesCollection = function(spec) {
  var that = {};

  that.sites = {};

  that.count = function() {
    return Object.keys(that.sites).length;
  };

  that.findSite = function(id) {
    if (typeof that.sites[id] == "undefined") {
      return false;
    } else { 
      return that.sites[id];
    }
  };

  that.createSite = function(specs) {
    if (that.findSite(specs.id)) {
      return false;
    } else {
      that.sites[specs.id] = site(specs);
    };
  };



  that.findOrCreateById = function(id) {
    if (typeof(that.sites[id]) == "undefined") {
      that.sites[id] = site({id: id});
    }
    return that.sites[id];
  };

  return that;
};

module.exports = sitesCollection;
